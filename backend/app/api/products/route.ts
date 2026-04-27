import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { asStringArray } from '@/lib/products/jsonArrays';
import { sanitizeAboutIntroBodyHtml } from '@/lib/sanitizeAboutIntroHtml';
import { parseLocaleQuery, pickLocalized } from '@/lib/i18nContent';

const PRODUCT_CATEGORY_VI_KEY = 'admin.categories.products.nameViMap';

async function readProductCategoryNameViMap(): Promise<Record<string, string>> {
  const setting = await prisma.siteSetting.findUnique({ where: { key: PRODUCT_CATEGORY_VI_KEY } });
  if (!setting?.value) return {};
  try {
    const parsed = JSON.parse(setting.value) as unknown;
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return {};
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      const key = String(k || '').trim();
      const value = typeof v === 'string' ? v.trim() : '';
      if (key && value) out[key] = value;
    }
    return out;
  } catch {
    return {};
  }
}
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = parseLocaleQuery(searchParams);
  const q = String(searchParams.get('q') ?? '').trim();
  const categorySlug = String(searchParams.get('category') ?? '').trim();
  const techParam = String(searchParams.get('tech') ?? '').trim();
  const techIds = techParam
    .split(',')
    .map((s) => Number.parseInt(s.trim(), 10))
    .filter((n) => Number.isFinite(n) && n > 0);
  const take = Math.min(Math.max(Number(searchParams.get('take') ?? 60) || 60, 1), 120);

  const where: {
    status: 'Active';
    category?: { slug: string };
    technologies?: { some: { technologyId: { in: number[] } } };
  } = { status: 'Active' };
  if (categorySlug) where.category = { slug: categorySlug };
  if (techIds.length) where.technologies = { some: { technologyId: { in: techIds } } };

  const [items, viMap, categoriesRaw] = await Promise.all([
    prisma.product.findMany({
    where,
    take,
    orderBy: [{ isFeatured: 'desc' }, { updatedAt: 'desc' }],
    include: {
      category: { select: { id: true, name: true, slug: true } },
      technologies: { include: { technology: { select: { id: true, techName: true, techLogo: true } } } },
    },
    }),
    readProductCategoryNameViMap(),
    prisma.productCategory.findMany({ orderBy: { sortOrder: 'asc' }, select: { id: true, name: true, slug: true } }),
  ]);

  const filtered = q
    ? items.filter((p) => {
        const qq = q.toLowerCase();
        const name = pickLocalized(p.productName, p.productNameVi, locale);
        const short = pickLocalized(p.shortDescription, p.shortDescriptionVi, locale);
        return name.toLowerCase().includes(qq) || short.toLowerCase().includes(qq) || p.slug.toLowerCase().includes(qq);
      })
    : items;

  const popular = [...filtered].sort((a, b) => b.viewsCount + b.demoClickCount * 2 - (a.viewsCount + a.demoClickCount * 2));
  const trendingHighlight = popular.filter((p) => p.category.slug === 'trending').slice(0, 6);
  const trendingTop = trendingHighlight.length >= 3 ? trendingHighlight : popular.slice(0, Math.min(6, popular.length));

  const mapCard = (p: (typeof filtered)[number]) => ({
    id: p.id,
    productName: pickLocalized(p.productName, p.productNameVi, locale),
    slug: p.slug,
    shortDescription: sanitizeAboutIntroBodyHtml(
      pickLocalized(p.shortDescription, p.shortDescriptionVi, locale) ?? '',
    ),
    mainImage: asStringArray(p.imageUrls)[0] ?? null,
    category: {
      ...p.category,
      name: locale === 'vi-VN' ? viMap[p.category.slug] || p.category.name : p.category.name,
    },
    isFeatured: p.isFeatured,
    viewsCount: p.viewsCount,
    demoClickCount: p.demoClickCount,
    technologies: p.technologies.map((t) => ({ id: t.technology.id, name: t.technology.techName, logo: t.technology.techLogo })),
  });

  return NextResponse.json({
    items: filtered.map(mapCard),
    trending: trendingTop.map(mapCard),
    popular: popular.slice(0, 8).map(mapCard),
    technologies: await prisma.technology.findMany({ orderBy: { techName: 'asc' }, select: { id: true, techName: true, techLogo: true } }),
    categories: categoriesRaw.map((c) => ({
      ...c,
      name: locale === 'vi-VN' ? viMap[c.slug] || c.name : c.name,
    })),
  });
}
