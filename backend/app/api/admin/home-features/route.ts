import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorizeAny } from '@/lib/adminAuth';
import { jsonObjectBody } from '@/lib/jsonBody';
import { parseLocaleQuery } from '@/lib/i18nContent';
import {
  getCategoryAssignments,
  getManagedCategories,
  setCategoryAssignment,
} from '@/lib/contentCategoryAssignments';

export async function GET(req: Request) {
  const auth = await authorizeAny(req, ['homeFeatures.read', 'banners.read']);
  if ('error' in auth) return auth.error;
  const { searchParams } = new URL(req.url);
  const locale = parseLocaleQuery(searchParams);

  const list = await prisma.homeFeature.findMany({
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
  });
  const [categories, assignments] = await Promise.all([
    getManagedCategories('banners', locale),
    getCategoryAssignments('banners'),
  ]);

  return NextResponse.json(
    list.map((item) => {
      const categorySlug = assignments[String(item.id)] ?? null;
      const categoryName = categorySlug ? categories.find((c) => c.slug === categorySlug)?.name ?? null : null;
      return { ...item, categorySlug, categoryName };
    }),
  );
}

export async function POST(req: Request) {
  const auth = await authorizeAny(req, ['homeFeatures.create', 'banners.create']);
  if ('error' in auth) return auth.error;

  const body = jsonObjectBody(await req.json());
  const icon = String(body.icon ?? '').trim();
  const title = String(body.title ?? '').trim();
  const titleVi = typeof body.titleVi === 'string' ? body.titleVi.trim() : '';
  const description = String(body.description ?? '').trim();
  const descriptionVi = typeof body.descriptionVi === 'string' ? body.descriptionVi.trim() : '';
  const order = body.order === undefined || body.order === null ? 0 : Number(body.order);
  const isActive = body.isActive === undefined ? true : Boolean(body.isActive);
  const categorySlug = typeof body.categorySlug === 'string' ? body.categorySlug.trim() : '';

  if (!icon || !title || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }
  if (!Number.isFinite(order)) {
    return NextResponse.json({ error: 'Invalid order' }, { status: 400 });
  }

  const created = await prisma.homeFeature.create({
    data: {
      icon,
      title,
      titleVi: titleVi || null,
      description,
      descriptionVi: descriptionVi || null,
      order,
      isActive,
    },
  });
  await setCategoryAssignment('banners', created.id, categorySlug || null);
  const categories = await getManagedCategories('banners');
  const categoryName = categories.find((c) => c.slug === categorySlug)?.name ?? null;

  return NextResponse.json({
    ok: true,
    feature: { ...created, categorySlug: categorySlug || null, categoryName },
  });
}

