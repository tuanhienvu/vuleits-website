import { NextResponse } from 'next/server';
import { authorize } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

function toDate(value: unknown) {
  const d = new Date(String(value || ''));
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function GET(req: Request) {
  const auth = await authorize(req, 'maintenance.read');
  if (auth.error) return auth.error;
  const rows = await prisma.hospitalityBlockedDate.findMany({
    orderBy: [{ blockedDate: 'desc' }],
    include: { room: { select: { id: true, name: true, type: true } } },
    take: 500,
  });
  return NextResponse.json({
    items: rows.map((r) => ({
      id: r.id,
      roomId: r.roomId,
      room: r.room,
      blockedDate: r.blockedDate.toISOString(),
      reason: r.reason,
    })),
  });
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'maintenance.update');
  if (auth.error) return auth.error;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const roomId = Number(body.roomId);
  const blockedDate = toDate(body.blockedDate);
  const reason = String(body.reason || '').slice(0, 250) || null;
  if (!Number.isFinite(roomId) || !blockedDate) {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
  }
  const created = await prisma.hospitalityBlockedDate.upsert({
    where: { roomId_blockedDate: { roomId, blockedDate } },
    create: { roomId, blockedDate, reason },
    update: { reason },
  });
  return NextResponse.json({ ok: true, id: created.id });
}
