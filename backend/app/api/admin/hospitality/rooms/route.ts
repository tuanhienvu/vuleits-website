import { NextResponse } from 'next/server';
import { authorize } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const auth = await authorize(req, 'maintenance.read');
  if (auth.error) return auth.error;

  const rows = await prisma.hospitalityRoom.findMany({
    where: { isActive: true },
    orderBy: [{ type: 'asc' }, { name: 'asc' }],
    select: { id: true, name: true, slug: true, type: true, nightPriceUsd: true, totalUnits: true },
  });
  return NextResponse.json({
    rooms: rows.map((r) => ({ ...r, nightPriceUsd: Number(r.nightPriceUsd) })),
  });
}
