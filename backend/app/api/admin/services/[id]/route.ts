import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { jsonObjectBody } from '@/lib/jsonBody';
import {
  deleteCategoryAssignment,
  getCategoryAssignments,
  getManagedCategories,
  setCategoryAssignment,
} from '@/lib/contentCategoryAssignments';

function normalizeFeatures(input: unknown): string | null {
  if (input === undefined || input === null) return null;
  if (Array.isArray(input)) return JSON.stringify(input.map((x) => String(x).trim()).filter(Boolean));
  if (typeof input === 'string') {
    const s = input.trim();
    if (!s) return JSON.stringify([]);
    try {
      const parsed = JSON.parse(s);
      if (Array.isArray(parsed)) return JSON.stringify(parsed.map((x) => String(x).trim()).filter(Boolean));
      if (parsed && typeof parsed === 'object') {
        const p = parsed as Record<string, unknown>;
        const en = Array.isArray(p.en) ? p.en.map((x) => String(x).trim()).filter(Boolean) : [];
        const vi = Array.isArray(p.vi) ? p.vi.map((x) => String(x).trim()).filter(Boolean) : [];
        return JSON.stringify({ en, vi });
      }
    } catch {
      // fallthrough
    }
    const lines = s
      .split(/\r?\n/)
      .map((x) => x.trim())
      .filter(Boolean);
    return JSON.stringify(lines);
  }
  if (typeof input === 'object') {
    const p = input as Record<string, unknown>;
    const en = Array.isArray(p.en) ? p.en.map((x) => String(x).trim()).filter(Boolean) : [];
    const vi = Array.isArray(p.vi) ? p.vi.map((x) => String(x).trim()).filter(Boolean) : [];
    return JSON.stringify({ en, vi });
  }
  return JSON.stringify(input);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'services.read');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const service = await prisma.serviceItem.findUnique({ where: { id } });
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const [categories, assignments] = await Promise.all([
    getManagedCategories('services'),
    getCategoryAssignments('services'),
  ]);
  const categorySlug = assignments[String(id)] ?? null;
  const categoryName = categorySlug ? categories.find((c) => c.slug === categorySlug)?.name ?? null : null;

  return NextResponse.json({
    id: service.id,
    icon: service.icon,
    title: service.title,
    titleVi: service.titleVi ?? '',
    description: service.description,
    descriptionVi: service.descriptionVi ?? '',
    features: service.features,
    order: service.order,
    isActive: service.isActive,
    categorySlug,
    categoryName,
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'services.update');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const body = jsonObjectBody(await req.json());
  const current = await prisma.serviceItem.findUnique({ where: { id } });
  if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const nextIcon = body.icon !== undefined ? String(body.icon ?? '').trim() : current.icon;
  const nextTitle = body.title !== undefined ? String(body.title ?? '').trim() : current.title;
  const nextTitleVi = body.titleVi !== undefined ? String(body.titleVi ?? '').trim() : (current.titleVi ?? '');
  const nextDescription = body.description !== undefined ? String(body.description ?? '').trim() : current.description;
  const nextDescriptionVi =
    body.descriptionVi !== undefined ? String(body.descriptionVi ?? '').trim() : (current.descriptionVi ?? '');
  const nextFeatures = body.features !== undefined ? normalizeFeatures(body.features) : current.features;
  const nextOrder = body.order !== undefined ? Number(body.order) : current.order;
  const nextIsActive = body.isActive !== undefined ? Boolean(body.isActive) : current.isActive;

  if (!nextIcon) return NextResponse.json({ error: 'Icon is required' }, { status: 400 });
  if (!nextTitle) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  if (!nextDescription) return NextResponse.json({ error: 'Description is required' }, { status: 400 });
  if (!Number.isFinite(nextOrder)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  const updated = await prisma.serviceItem.update({
    where: { id },
    data: {
      icon: nextIcon,
      title: nextTitle,
      titleVi: nextTitleVi || null,
      description: nextDescription,
      descriptionVi: nextDescriptionVi || null,
      features: nextFeatures,
      order: nextOrder,
      isActive: nextIsActive,
    },
  });

  if (body.categorySlug !== undefined) {
    await setCategoryAssignment('services', id, body.categorySlug == null ? null : String(body.categorySlug).trim() || null);
  }
  const [categories, assignments] = await Promise.all([
    getManagedCategories('services'),
    getCategoryAssignments('services'),
  ]);
  const categorySlug = assignments[String(id)] ?? null;
  const categoryName = categorySlug ? categories.find((c) => c.slug === categorySlug)?.name ?? null : null;

  return NextResponse.json({
    ok: true,
    service: {
      id: updated.id,
      icon: updated.icon,
      title: updated.title,
      titleVi: updated.titleVi ?? '',
      description: updated.description,
      descriptionVi: updated.descriptionVi ?? '',
      features: updated.features,
      order: updated.order,
      isActive: updated.isActive,
      categorySlug,
      categoryName,
    },
  });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'services.delete');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  await prisma.serviceItem.delete({ where: { id } }).catch(() => null);
  await deleteCategoryAssignment('services', id);
  return NextResponse.json({ ok: true });
}
