import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseLocaleQuery, pickLocalized } from '@/lib/i18nContent';

type AboutStatRow = { id: number; number: string; label: string; labelVi: string | null; order: number; isActive: number | boolean };

export async function GET(req: Request) {
  const url = new URL(req.url);
  const locale = parseLocaleQuery(url.searchParams);
  const rows = await prisma.$queryRaw<AboutStatRow[]>`
    SELECT id, number, label, label_vi as labelVi, \`order\` as \`order\`, isActive
    FROM AboutStat
    WHERE isActive = true
    ORDER BY \`order\` ASC, id ASC
  `;
  const list = Array.isArray(rows) ? rows : [];
  return NextResponse.json(
    list.map((r: AboutStatRow) => ({
      id: Number(r.id),
      number: r.number,
      label: pickLocalized(r.label, r.labelVi, locale),
    })),
  );
}
