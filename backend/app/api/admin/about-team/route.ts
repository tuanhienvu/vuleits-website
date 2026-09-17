import { NextResponse } from 'next/server';
import type { AboutTeamMember, AboutTeamMemberCV } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { ensureUniqueMemberSlug } from '@/lib/teamMemberCv';

const memberCvSelect = { select: { id: true, isPublished: true } } as const;

type MemberWithCv = AboutTeamMember & {
  cv: Pick<AboutTeamMemberCV, 'id' | 'isPublished'> | null;
};

function serializeAdminMember(r: MemberWithCv) {
  return {
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
    slug: r.slug ?? '',
    hasCv: Boolean(r.cv),
  };
}

export async function GET(req: Request) {
  const auth = await authorize(req, 'aboutTeam.read');
  if (auth.error) return auth.error;

  const rows = await prisma.aboutTeamMember.findMany({
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
    include: { cv: memberCvSelect },
  });

  return NextResponse.json(rows.map(serializeAdminMember));
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

  const slugRaw = typeof body.slug === 'string' ? body.slug.trim() : '';
  const slug = slugRaw
    ? await ensureUniqueMemberSlug(prisma, slugRaw)
    : await ensureUniqueMemberSlug(prisma, name);

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
      slug,
    },
    include: { cv: memberCvSelect },
  });

  return NextResponse.json({
    ok: true,
    member: serializeAdminMember(created),
  });
}
