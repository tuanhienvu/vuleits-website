import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { jsonObjectBody } from '@/lib/jsonBody';

function serializeStat(r: {
  id: number;
  number: string;
  label: string;
  labelVi: string | null;
  order: number;
  isActive: boolean;
}) {
  return {
    id: r.id,
    number: r.number,
    label: r.label,
    labelVi: r.labelVi,
    order: r.order,
    isActive: r.isActive,
  };
}

export async function GET(req: Request) {
  const auth = await authorize(req, 'aboutStats.read');
  if (auth.error) return auth.error;

  const rows = await prisma.aboutStat.findMany({
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
  });

  return NextResponse.json(rows.map(serializeStat));
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'aboutStats.create');
  if (auth.error) return auth.error;

  const body = jsonObjectBody(await req.json());
  const number = String(body.number ?? '').trim();
  const label = String(body.label ?? '').trim();
  const labelVi = String(body.labelVi ?? '').trim() || null;
  const order = body.order === undefined || body.order === null ? 0 : Number(body.order);
  const isActive = body.isActive === undefined ? true : Boolean(body.isActive);

  if (!number || !label) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  if (!Number.isFinite(order)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  const stat = await prisma.aboutStat.create({
    data: { number, label, labelVi, order, isActive },
  });

  return NextResponse.json({ ok: true, stat: serializeStat(stat) });
}
