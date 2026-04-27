import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

export async function GET(req: Request) {
  const auth = await authorize(req, 'aboutTeam.read');
  if (auth.error) return auth.error;

  const rows = await prisma.aboutTeamMember.findMany({
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
  });

  return NextResponse.json(
    rows.map((r) => ({
      id: r.id,
      emoji: r.emoji,
      name: r.name,
      nameVi: r.nameVi ?? '',
      role: r.role,
      roleVi: r.roleVi ?? '',
      bio: r.bio,
      bioVi: r.bioVi ?? '',
      order: r.order,
      isActive: r.isActive,
    })),
  );
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'aboutTeam.create');
  if (auth.error) return auth.error;

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const emoji = String(body.emoji ?? '').trim();
  const name = String(body.name ?? '').trim();
  const nameVi = typeof body.nameVi === 'string' ? body.nameVi.trim() : '';
  const role = String(body.role ?? '').trim();
  const roleVi = typeof body.roleVi === 'string' ? body.roleVi.trim() : '';
  const bio = String(body.bio ?? '').trim();
  const bioVi = typeof body.bioVi === 'string' ? body.bioVi.trim() : '';
  const order = body.order === undefined || body.order === null ? 0 : Number(body.order);
  const isActive = body.isActive === undefined ? true : Boolean(body.isActive);

  if (!emoji || !name || !role || !bio) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  if (!Number.isFinite(order)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  const created = await prisma.aboutTeamMember.create({
    data: {
      emoji,
      name,
      nameVi: nameVi || null,
      role,
      roleVi: roleVi || null,
      bio,
      bioVi: bioVi || null,
      order,
      isActive,
    },
  });

  return NextResponse.json({
    ok: true,
    member: {
      id: created.id,
      emoji: created.emoji,
      name: created.name,
      nameVi: created.nameVi ?? '',
      role: created.role,
      roleVi: created.roleVi ?? '',
      bio: created.bio,
      bioVi: created.bioVi ?? '',
      order: created.order,
      isActive: created.isActive,
    },
  });
}
