import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type AboutStatRow = { id: number; number: string; label: string; order: number; isActive: number | boolean };

export async function GET() {
  const rows = await prisma.$queryRaw<AboutStatRow[]>`
    SELECT id, number, label, \`order\` as \`order\`, isActive
    FROM AboutStat
    WHERE isActive = true
    ORDER BY \`order\` ASC, id ASC
  `;
  const list = Array.isArray(rows) ? rows : [];
  return NextResponse.json(
    list.map((r: AboutStatRow) => ({ id: Number(r.id), number: r.number, label: r.label })),
  );
}
