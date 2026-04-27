import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeAboutIntroBodyHtml } from '@/lib/sanitizeAboutIntroHtml';
import { getCategoryAssignments, getManagedCategories } from '@/lib/contentCategoryAssignments';
import { parseLocaleQuery, pickLocalized } from '@/lib/i18nContent';

type ServiceCard = {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  order: number;
  categorySlug: string | null;
  categoryName: string | null;
};

function parseFeatures(features: string | null): string[] {
  if (!features) return [];
  try {
    const parsed = JSON.parse(features);
    if (Array.isArray(parsed)) return parsed.map((x) => String(x));
  } catch {
    // ignore
  }
  return [];
}

function toCard(
  s: {
    id: number;
    icon: string;
    title: string;
    titleVi: string | null;
    description: string;
    descriptionVi: string | null;
    features: string | null;
    order: number;
  },
  categorySlug: string | null,
  categoryName: string | null,
  locale: ReturnType<typeof parseLocaleQuery>,
): ServiceCard {
  const title = pickLocalized(s.title, s.titleVi, locale);
  const rawDesc = pickLocalized(s.description, s.descriptionVi, locale);
  return {
    id: s.id,
    icon: s.icon,
    title,
    description: sanitizeAboutIntroBodyHtml(rawDesc ?? ''),
    features: parseFeatures(s.features).map((x) => sanitizeAboutIntroBodyHtml(x)),
    order: s.order,
    categorySlug,
    categoryName,
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = String(searchParams.get('q') ?? '').trim().toLowerCase();
  const category = String(searchParams.get('category') ?? '').trim().toLowerCase();
  const take = Math.min(Math.max(Number(searchParams.get('take') ?? 60) || 60, 1), 120);
  const locale = parseLocaleQuery(searchParams);

  const rows = await prisma.serviceItem.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
    take,
    select: {
      id: true,
      icon: true,
      title: true,
      titleVi: true,
      description: true,
      descriptionVi: true,
      features: true,
      order: true,
    },
  });

  const [categories, assignments] = await Promise.all([
    getManagedCategories('services', locale),
    getCategoryAssignments('services'),
  ]);
  const categoryBySlug = new Map(categories.map((c) => [c.slug, c.name]));
  const cards = rows.map((r) => {
    const categorySlug = assignments[String(r.id)] ?? null;
    const categoryName = categorySlug ? categoryBySlug.get(categorySlug) ?? null : null;
    return toCard(r, categorySlug, categoryName, locale);
  });
  const filtered = q
    ? cards.filter((s) => {
        const hay = `${s.title} ${s.description} ${s.features.join(' ')}`.toLowerCase();
        return hay.includes(q);
      })
    : cards;
  const categoryFiltered = category ? filtered.filter((s) => (s.categorySlug ?? '').toLowerCase() === category) : filtered;

  return NextResponse.json({
    items: categoryFiltered,
    spotlight: categoryFiltered.slice(0, 3),
    categories: categories.filter((c) => c.isActive).map((c) => ({ slug: c.slug, name: c.name })),
  });
}
