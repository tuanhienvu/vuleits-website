import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

export async function GET(request: Request) {
  const auth = await authorize(request, 'auditLogs.read');
  if (auth.error) return auth.error;

  const { searchParams } = new URL(request.url);
  const take = Math.min(100, Math.max(1, Number(searchParams.get('take')) || 50));
  const beforeIdRaw = searchParams.get('beforeId');
  const level = searchParams.get('level')?.trim();

  const where = {
    deletedAt: null as null,
    ...(level ? { level } : {}),
    ...(beforeIdRaw && /^\d+$/.test(beforeIdRaw) ? { id: { lt: Number(beforeIdRaw) } } : {}),
  };

  const rows = await prisma.adminLogEntry.findMany({
    where,
    orderBy: { id: 'desc' },
    take: take + 1,
    select: {
      id: true,
      level: true,
      category: true,
      message: true,
      metadata: true,
      traceId: true,
      note: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  const hasMore = rows.length > take;
  const items = hasMore ? rows.slice(0, take) : rows;
  const nextBeforeId = hasMore ? items[items.length - 1]?.id : null;

  return NextResponse.json({
    items,
    nextBeforeId,
  });
}
