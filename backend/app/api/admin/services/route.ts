import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { jsonObjectBody } from '@/lib/jsonBody';
import { parseLocaleQuery } from '@/lib/i18nContent';
import {
  getCategoryAssignments,
  getManagedCategories,
  setCategoryAssignment,
} from '@/lib/contentCategoryAssignments';

export async function GET(req: Request) {
  const auth = await authorize(req, 'services.read');
  if (auth.error) return auth.error;
  const { searchParams } = new URL(req.url);
  const locale = parseLocaleQuery(searchParams);

  const rows = await prisma.serviceItem.findMany({
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
  });
  const [categories, assignments] = await Promise.all([
    getManagedCategories('services', locale),
    getCategoryAssignments('services'),
  ]);
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

  return NextResponse.json(
    rows.map((r) => ({
      id: r.id,
      icon: r.icon,
      title: r.title,
      titleVi: r.titleVi ?? '',
      description: r.description,
      descriptionVi: r.descriptionVi ?? '',
      features: r.features,
      order: r.order,
      isActive: r.isActive,
      categorySlug: assignments[String(r.id)] ?? null,
      categoryName: (() => {
        const slug = assignments[String(r.id)];
        if (!slug) return null;
        return categoryBySlug.get(slug)?.name ?? null;
      })(),
    })),
  );
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'services.create');
  if (auth.error) return auth.error;

  const body = jsonObjectBody(await req.json());
  const icon = String(body.icon ?? '').trim();
  const title = String(body.title ?? '').trim();
  const titleVi = typeof body.titleVi === 'string' ? body.titleVi.trim() : '';
  const description = String(body.description ?? '').trim();
  const descriptionVi = typeof body.descriptionVi === 'string' ? body.descriptionVi.trim() : '';
  const order = body.order === undefined || body.order === null ? 0 : Number(body.order);
  const isActive = body.isActive === undefined ? true : Boolean(body.isActive);
  const categorySlug = typeof body.categorySlug === 'string' ? body.categorySlug.trim() : '';

  let features: string | null = null;
  const rawFeatures = body.features;
  if (rawFeatures !== undefined && rawFeatures !== null) {
    if (Array.isArray(rawFeatures)) {
      features = JSON.stringify(rawFeatures.map((x) => String(x)));
    } else if (typeof rawFeatures === 'string') {
      features = String(rawFeatures);
    } else {
      features = JSON.stringify(rawFeatures);
    }
  }

  if (!icon || !title || !description) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  if (!Number.isFinite(order)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  const created = await prisma.serviceItem.create({
    data: {
      icon,
      title,
      titleVi: titleVi || null,
      description,
      descriptionVi: descriptionVi || null,
      features,
      order,
      isActive,
    },
  });

  await setCategoryAssignment('services', created.id, categorySlug || null);
  const categories = await getManagedCategories('services');
  const categoryName = categories.find((c) => c.slug === categorySlug)?.name ?? null;
  return NextResponse.json({
    ok: true,
    service: {
      id: created.id,
      icon: created.icon,
      title: created.title,
      titleVi: created.titleVi ?? '',
      description: created.description,
      descriptionVi: created.descriptionVi ?? '',
      features: created.features,
      order: created.order,
      isActive: created.isActive,
      categorySlug: categorySlug || null,
      categoryName,
    },
  });
}
