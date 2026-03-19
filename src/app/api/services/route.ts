import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type ServiceRow = { id: number; icon: string; title: string; description: string; features: string | null; order: number; isActive: number | boolean };

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

export async function GET() {
  const rows = await prisma.$queryRaw<ServiceRow[]>`
    SELECT id, icon, title, description, features, \`order\` as \`order\`, isActive
    FROM ServiceItem
    WHERE isActive = true
    ORDER BY \`order\` ASC, id ASC
  `;

  return NextResponse.json(
    rows.map((s) => ({
      id: Number(s.id),
      icon: s.icon,
      title: s.title,
      description: s.description,
      features: parseFeatures(s.features),
    })),
  );
}

