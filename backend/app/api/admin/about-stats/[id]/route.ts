import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

type AboutStatRow = { id: number; number: string; label: string; order: number; isActive: number | boolean };

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'aboutStats.read');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const rows = await prisma.$queryRaw<AboutStatRow[]>`
    SELECT id, number, label, \`order\` as \`order\`, isActive
    FROM AboutStat
    WHERE id = ${id}
    LIMIT 1
  `;

  const stat = rows[0];
  if (!stat) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    id: Number(stat.id),
    number: stat.number,
    label: stat.label,
    order: Number(stat.order),
    isActive: Boolean(stat.isActive),
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'aboutStats.update');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const body = await req.json();
  const data: { number?: string; label?: string; order?: number; isActive?: boolean } = {};

  if ((body as any).number !== undefined) data.number = String((body as any).number || '').trim();
  if ((body as any).label !== undefined) data.label = String((body as any).label || '').trim();
  if ((body as any).order !== undefined) data.order = Number((body as any).order);
  if ((body as any).isActive !== undefined) data.isActive = Boolean((body as any).isActive);

  if (data.number !== undefined && !data.number) return NextResponse.json({ error: 'Number is required' }, { status: 400 });
  if (data.label !== undefined && !data.label) return NextResponse.json({ error: 'Label is required' }, { status: 400 });
  if (data.order !== undefined && !Number.isFinite(data.order)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  const currentRows = await prisma.$queryRaw<AboutStatRow[]>`
    SELECT id, number, label, \`order\` as \`order\`, isActive
    FROM AboutStat
    WHERE id = ${id}
    LIMIT 1
  `;
  const current = currentRows[0];
  if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const nextNumber = data.number ?? current.number;
  const nextLabel = data.label ?? current.label;
  const nextOrder = data.order ?? current.order;
  const nextIsActive = data.isActive ?? Boolean(current.isActive);

  await prisma.$executeRaw`
    UPDATE AboutStat
    SET number = ${nextNumber}, label = ${nextLabel}, \`order\` = ${nextOrder}, isActive = ${nextIsActive}, updatedAt = NOW()
    WHERE id = ${id}
  `;

  const updatedRows = await prisma.$queryRaw<AboutStatRow[]>`
    SELECT id, number, label, \`order\` as \`order\`, isActive
    FROM AboutStat
    WHERE id = ${id}
    LIMIT 1
  `;
  const updated = updatedRows[0];

  return NextResponse.json({
    ok: true,
    stat: updated
      ? { id: Number(updated.id), number: updated.number, label: updated.label, order: Number(updated.order), isActive: Boolean(updated.isActive) }
      : null,
  });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'aboutStats.delete');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  await prisma.$executeRaw`DELETE FROM AboutStat WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}

