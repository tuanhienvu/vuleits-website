import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeAboutIntroBodyHtml } from '@/lib/sanitizeAboutIntroHtml';
import { getCategoryAssignments, getManagedCategories } from '@/lib/contentCategoryAssignments';
import { parseLocaleQuery, pickLocalized } from '@/lib/i18nContent';

function parseFeatures(features: string | null): string[] {
  if (!features) return [];
  try {
    const parsed = JSON.parse(features);
    if (Array.isArray(parsed)) return parsed.map((x) => String(x));
  } catch {
    // ignore invalid JSON
  }
  return [];
}

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const locale = parseLocaleQuery(new URL(req.url).searchParams);
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const service = await prisma.serviceItem.findFirst({
    where: { id, isActive: true },
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
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  const [categories, assignments] = await Promise.all([
    getManagedCategories('services'),
    getCategoryAssignments('services'),
  ]);
  const categorySlug = assignments[String(service.id)] ?? null;
  const categoryName = categorySlug ? categories.find((c) => c.slug === categorySlug)?.name ?? null : null;

  const relatedRows = await prisma.serviceItem.findMany({
    where: { isActive: true, id: { not: service.id } },
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
    take: 4,
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

  const svcTitle = pickLocalized(service.title, service.titleVi, locale);
  const svcDesc = pickLocalized(service.description, service.descriptionVi, locale);

  return NextResponse.json({
    service: {
      id: service.id,
      icon: service.icon,
      title: svcTitle,
      description: sanitizeAboutIntroBodyHtml(svcDesc ?? ''),
      features: parseFeatures(service.features).map((x) => sanitizeAboutIntroBodyHtml(x)),
      order: service.order,
      categorySlug,
      categoryName,
    },
    related: relatedRows.map((r) => ({
      id: r.id,
      icon: r.icon,
      title: pickLocalized(r.title, r.titleVi, locale),
      description: sanitizeAboutIntroBodyHtml(pickLocalized(r.description, r.descriptionVi, locale) ?? ''),
      order: r.order,
    })),
  });
}
