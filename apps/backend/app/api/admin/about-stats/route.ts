import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

type AboutStatRow = { id: number; number: string; label: string; order: number; isActive: number | boolean };

export async function GET(req: Request) {
  const auth = await authorize(req, 'aboutStats.read');
  if (auth.error) return auth.error;

  const rows = await prisma.$queryRaw<AboutStatRow[]>`
    SELECT id, number, label, \`order\` as \`order\`, isActive
    FROM AboutStat
    ORDER BY \`order\` ASC, id ASC
  `;

  return NextResponse.json(
    rows.map((r) => ({
      id: Number(r.id),
      number: r.number,
      label: r.label,
      order: Number(r.order),
      isActive: Boolean(r.isActive),
    })),
  );
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'aboutStats.create');
  if (auth.error) return auth.error;

  const body = await req.json();
  const number = String((body as any).number || '').trim();
  const label = String((body as any).label || '').trim();
  const order = (body as any).order === undefined || (body as any).order === null ? 0 : Number((body as any).order);
  const isActive = (body as any).isActive === undefined ? true : Boolean((body as any).isActive);

  if (!number || !label) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  if (!Number.isFinite(order)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  await prisma.$executeRaw`
    INSERT INTO AboutStat (number, label, \`order\`, isActive, createdAt, updatedAt)
    VALUES (${number}, ${label}, ${order}, ${isActive}, NOW(), NOW())
  `;

  const created = await prisma.$queryRaw<AboutStatRow[]>`
    SELECT id, number, label, \`order\` as \`order\`, isActive
    FROM AboutStat
    ORDER BY id DESC
    LIMIT 1
  `;

  const stat = created[0];
  return NextResponse.json({
    ok: true,
    stat: stat
      ? { id: Number(stat.id), number: stat.number, label: stat.label, order: Number(stat.order), isActive: Boolean(stat.isActive) }
      : null,
  });
}

