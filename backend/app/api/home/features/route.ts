import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeAboutIntroBodyHtml } from '@/lib/sanitizeAboutIntroHtml';
import { getCategoryAssignments, getManagedCategories } from '@/lib/contentCategoryAssignments';
import { parseLocaleQuery, pickLocalized } from '@/lib/i18nContent';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = String(searchParams.get('category') ?? '').trim().toLowerCase();
  const locale = parseLocaleQuery(searchParams);
  const list = await prisma.homeFeature.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
    select: { id: true, icon: true, title: true, titleVi: true, description: true, descriptionVi: true },
  });
  const [categories, assignments] = await Promise.all([
    getManagedCategories('banners', locale),
    getCategoryAssignments('banners'),
  ]);

  const mapped = (Array.isArray(list) ? list : []).map((item) => {
    const categorySlug = assignments[String(item.id)] ?? null;
    const categoryName = categorySlug ? categories.find((c) => c.slug === categorySlug)?.name ?? null : null;
    const title = pickLocalized(item.title, item.titleVi, locale);
    const rawDesc = pickLocalized(item.description, item.descriptionVi, locale);
    return {
      id: item.id,
      icon: item.icon,
      title,
      description: sanitizeAboutIntroBodyHtml(rawDesc ?? ''),
      categorySlug,
      categoryName,
    };
  });
  const filtered = category ? mapped.filter((item) => (item.categorySlug ?? '').toLowerCase() === category) : mapped;

  return NextResponse.json({
    items: filtered,
    categories: categories.filter((c) => c.isActive).map((c) => ({ slug: c.slug, name: c.name })),
  });
}

