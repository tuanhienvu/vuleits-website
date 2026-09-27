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
  const rows = await prisma.hospitalityRatePeriod.findMany({
    orderBy: [{ startDate: 'desc' }],
    include: { room: { select: { id: true, name: true, type: true } } },
    take: 400,
  });
  return NextResponse.json({
    items: rows.map((r) => ({
      id: r.id,
      roomId: r.roomId,
      room: r.room,
      startDate: r.startDate.toISOString(),
      endDate: r.endDate.toISOString(),
      nightlyUsd: Number(r.nightlyUsd),
      note: r.note,
      isActive: r.isActive,
    })),
  });
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'maintenance.update');
  if (auth.error) return auth.error;
  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const roomId = Number(body.roomId);
  const startDate = toDate(body.startDate);
  const endDate = toDate(body.endDate);
  const nightlyUsd = Number(body.nightlyUsd);
  const note = String(body.note || '').slice(0, 250) || null;
  if (!Number.isFinite(roomId) || !startDate || !endDate || endDate < startDate || !(nightlyUsd > 0)) {
    return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
  }
  const created = await prisma.hospitalityRatePeriod.create({
    data: { roomId, startDate, endDate, nightlyUsd, note, isActive: true },
  });
  return NextResponse.json({ ok: true, id: created.id });
}
