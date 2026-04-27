import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { jsonObjectBody } from '@/lib/jsonBody';

type AboutStatRow = { id: number; number: string; label: string; labelVi: string | null; order: number; isActive: number | boolean };

export async function GET(req: Request) {
  const auth = await authorize(req, 'aboutStats.read');
  if (auth.error) return auth.error;

  const rows = await prisma.$queryRaw<AboutStatRow[]>`
    SELECT id, number, label, label_vi as labelVi, \`order\` as \`order\`, isActive
    FROM AboutStat
    ORDER BY \`order\` ASC, id ASC
  `;

  return NextResponse.json(
    rows.map((r: AboutStatRow) => ({
      id: Number(r.id),
      number: r.number,
      label: r.label,
      labelVi: r.labelVi,
      order: Number(r.order),
      isActive: Boolean(r.isActive),
    })),
  );
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

  await prisma.$executeRaw`
    INSERT INTO AboutStat (number, label, label_vi, \`order\`, isActive, createdAt, updatedAt)
    VALUES (${number}, ${label}, ${labelVi}, ${order}, ${isActive}, NOW(), NOW())
  `;

  const created = await prisma.$queryRaw<AboutStatRow[]>`
    SELECT id, number, label, label_vi as labelVi, \`order\` as \`order\`, isActive
    FROM AboutStat
    ORDER BY id DESC
    LIMIT 1
  `;

  const stat = created[0];
  return NextResponse.json({
    ok: true,
    stat: stat
      ? {
          id: Number(stat.id),
          number: stat.number,
          label: stat.label,
          labelVi: stat.labelVi,
          order: Number(stat.order),
          isActive: Boolean(stat.isActive),
        }
      : null,
  });
}

