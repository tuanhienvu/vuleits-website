import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseLocaleQuery, pickLocalized } from '@/lib/i18nContent';

export async function GET(req: Request) {
  const url = new URL(req.url);
  const locale = parseLocaleQuery(url.searchParams);
  const rows = await prisma.aboutStat.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
  });
  return NextResponse.json(
    rows.map((r) => ({
      id: r.id,
      number: r.number,
      label: pickLocalized(r.label, r.labelVi, locale),
    })),
  );
}
