import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeAboutIntroBodyHtml } from '@/lib/sanitizeAboutIntroHtml';

type ServiceCard = {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  order: number;
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

function toCard(s: {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string | null;
  order: number;
}): ServiceCard {
  return {
    id: s.id,
    icon: s.icon,
    title: s.title,
    description: sanitizeAboutIntroBodyHtml(s.description ?? ''),
    features: parseFeatures(s.features).map((x) => sanitizeAboutIntroBodyHtml(x)),
    order: s.order,
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = String(searchParams.get('q') ?? '').trim().toLowerCase();
  const take = Math.min(Math.max(Number(searchParams.get('take') ?? 60) || 60, 1), 120);

  const rows = await prisma.serviceItem.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
    take,
    select: { id: true, icon: true, title: true, description: true, features: true, order: true },
  });

  const cards = rows.map(toCard);
  const filtered = q
    ? cards.filter((s) => {
        const hay = `${s.title} ${s.description} ${s.features.join(' ')}`.toLowerCase();
        return hay.includes(q);
      })
    : cards;

  return NextResponse.json({
    items: filtered,
    spotlight: filtered.slice(0, 3),
  });
}
