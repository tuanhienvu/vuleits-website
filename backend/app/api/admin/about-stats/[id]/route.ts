import { NextRequest, NextResponse } from 'next/server';
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

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'aboutStats.read');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const stat = await prisma.aboutStat.findUnique({ where: { id } });
  if (!stat) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json(serializeStat(stat));
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'aboutStats.update');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const body = jsonObjectBody(await req.json());
  const data: { number?: string; label?: string; labelVi?: string | null; order?: number; isActive?: boolean } = {};

  if (body.number !== undefined) data.number = String(body.number ?? '').trim();
  if (body.label !== undefined) data.label = String(body.label ?? '').trim();
  if (body.labelVi !== undefined) data.labelVi = String(body.labelVi ?? '').trim() || null;
  if (body.order !== undefined) data.order = Number(body.order);
  if (body.isActive !== undefined) data.isActive = Boolean(body.isActive);

  if (data.number !== undefined && !data.number) return NextResponse.json({ error: 'Number is required' }, { status: 400 });
  if (data.label !== undefined && !data.label) return NextResponse.json({ error: 'Label is required' }, { status: 400 });
  if (data.order !== undefined && !Number.isFinite(data.order)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  const current = await prisma.aboutStat.findUnique({ where: { id } });
  if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const updated = await prisma.aboutStat.update({
    where: { id },
    data: {
      number: data.number ?? current.number,
      label: data.label ?? current.label,
      labelVi: data.labelVi === undefined ? current.labelVi : data.labelVi,
      order: data.order ?? current.order,
      isActive: data.isActive ?? current.isActive,
    },
  });

  return NextResponse.json({ ok: true, stat: serializeStat(updated) });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'aboutStats.delete');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  await prisma.aboutStat.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
