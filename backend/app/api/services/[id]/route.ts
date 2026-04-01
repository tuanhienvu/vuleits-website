import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeAboutIntroBodyHtml } from '@/lib/sanitizeAboutIntroHtml';

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

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id) || id <= 0) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const service = await prisma.serviceItem.findFirst({
    where: { id, isActive: true },
    select: { id: true, icon: true, title: true, description: true, features: true, order: true },
  });
  if (!service) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const relatedRows = await prisma.serviceItem.findMany({
    where: { isActive: true, id: { not: service.id } },
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
    take: 4,
    select: { id: true, icon: true, title: true, description: true, features: true, order: true },
  });

  return NextResponse.json({
    service: {
      id: service.id,
      icon: service.icon,
      title: service.title,
      description: sanitizeAboutIntroBodyHtml(service.description ?? ''),
      features: parseFeatures(service.features).map((x) => sanitizeAboutIntroBodyHtml(x)),
      order: service.order,
    },
    related: relatedRows.map((r) => ({
      id: r.id,
      icon: r.icon,
      title: r.title,
      description: sanitizeAboutIntroBodyHtml(r.description ?? ''),
      order: r.order,
    })),
  });
}
