import { NextResponse } from 'next/server';
import { authorize } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'maintenance.update');
  if (auth.error) return auth.error;
  const { id } = await ctx.params;
  const n = Number(id);
  if (!Number.isFinite(n)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  await prisma.hospitalityBlockedDate.delete({ where: { id: n } });
  return NextResponse.json({ ok: true });
}
