import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorizeAny } from '@/lib/adminAuth';
import { jsonObjectBody } from '@/lib/jsonBody';
import {
  deleteCategoryAssignment,
  getCategoryAssignments,
  getManagedCategories,
  setCategoryAssignment,
} from '@/lib/contentCategoryAssignments';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorizeAny(req, ['homeFeatures.read', 'banners.read']);
  if ('error' in auth) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const feature = await prisma.homeFeature.findUnique({ where: { id } });
  if (!feature) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const [categories, assignments] = await Promise.all([
    getManagedCategories('banners'),
    getCategoryAssignments('banners'),
  ]);
  const categorySlug = assignments[String(id)] ?? null;
  const categoryName = categorySlug ? categories.find((c) => c.slug === categorySlug)?.name ?? null : null;

  return NextResponse.json({ ...feature, categorySlug, categoryName });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorizeAny(req, ['homeFeatures.update', 'banners.update']);
  if ('error' in auth) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const body = jsonObjectBody(await req.json());
  const data: {
    icon?: string;
    title?: string;
    titleVi?: string | null;
    description?: string;
    descriptionVi?: string | null;
    order?: number;
    isActive?: boolean;
  } = {};
  let categorySlugUpdate: string | null | undefined;

  if (body.icon !== undefined) data.icon = String(body.icon ?? '').trim();
  if (body.title !== undefined) data.title = String(body.title ?? '').trim();
  if (body.titleVi !== undefined) data.titleVi = String(body.titleVi ?? '').trim() || null;
  if (body.description !== undefined) data.description = String(body.description ?? '').trim();
  if (body.descriptionVi !== undefined) data.descriptionVi = String(body.descriptionVi ?? '').trim() || null;
  if (body.order !== undefined) data.order = Number(body.order);
  if (body.isActive !== undefined) data.isActive = Boolean(body.isActive);
  if (body.categorySlug !== undefined) {
    categorySlugUpdate = body.categorySlug == null ? null : String(body.categorySlug).trim();
  }

  if (data.icon !== undefined && !data.icon) return NextResponse.json({ error: 'Icon is required' }, { status: 400 });
  if (data.title !== undefined && !data.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });
  if (data.description !== undefined && !data.description) return NextResponse.json({ error: 'Description is required' }, { status: 400 });
  if (data.order !== undefined && !Number.isFinite(data.order)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  const updated = await prisma.homeFeature.update({ where: { id }, data });
  if (categorySlugUpdate !== undefined) {
    await setCategoryAssignment('banners', id, categorySlugUpdate || null);
  }
  const [categories, assignments] = await Promise.all([
    getManagedCategories('banners'),
    getCategoryAssignments('banners'),
  ]);
  const categorySlug = assignments[String(id)] ?? null;
  const categoryName = categorySlug ? categories.find((c) => c.slug === categorySlug)?.name ?? null : null;
  return NextResponse.json({ ok: true, feature: { ...updated, categorySlug, categoryName } });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorizeAny(req, ['homeFeatures.delete', 'banners.delete']);
  if ('error' in auth) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  await prisma.homeFeature.delete({ where: { id } });
  await deleteCategoryAssignment('banners', id);
  return NextResponse.json({ ok: true });
}

