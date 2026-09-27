import { NextResponse } from 'next/server';
import { authorize } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const auth = await authorize(req, 'maintenance.read');
  if (auth.error) return auth.error;
  const url = new URL(req.url);
  const take = Math.min(200, Math.max(1, Number(url.searchParams.get('take')) || 100));
  const rows = await prisma.backupLog.findMany({
    orderBy: { createdAt: 'desc' },
    take,
    select: {
      id: true,
      createdAt: true,
      trigger: true,
      success: true,
      message: true,
      meta: true,
    },
  });
  return NextResponse.json({ logs: rows });
}
