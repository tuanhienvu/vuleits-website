import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'aboutTeam.read');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const member = await prisma.aboutTeamMember.findUnique({ where: { id } });
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    id: member.id,
    emoji: member.emoji,
    name: member.name,
    nameVi: member.nameVi ?? '',
    role: member.role,
    roleVi: member.roleVi ?? '',
    bio: member.bio,
    bioVi: member.bioVi ?? '',
    order: member.order,
    isActive: member.isActive,
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'aboutTeam.update');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const current = await prisma.aboutTeamMember.findUnique({ where: { id } });
  if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const nextEmoji = body.emoji !== undefined ? String(body.emoji ?? '').trim() : current.emoji;
  const nextName = body.name !== undefined ? String(body.name ?? '').trim() : current.name;
  const nextNameVi = body.nameVi !== undefined ? String(body.nameVi ?? '').trim() : (current.nameVi ?? '');
  const nextRole = body.role !== undefined ? String(body.role ?? '').trim() : current.role;
  const nextRoleVi = body.roleVi !== undefined ? String(body.roleVi ?? '').trim() : (current.roleVi ?? '');
  const nextBio = body.bio !== undefined ? String(body.bio ?? '').trim() : current.bio;
  const nextBioVi = body.bioVi !== undefined ? String(body.bioVi ?? '').trim() : (current.bioVi ?? '');
  const nextOrder = body.order !== undefined ? Number(body.order) : current.order;
  const nextIsActive = body.isActive !== undefined ? Boolean(body.isActive) : current.isActive;

  if (!nextEmoji) return NextResponse.json({ error: 'Emoji is required' }, { status: 400 });
  if (!nextName) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  if (!nextRole) return NextResponse.json({ error: 'Role is required' }, { status: 400 });
  if (!nextBio) return NextResponse.json({ error: 'Bio is required' }, { status: 400 });
  if (!Number.isFinite(nextOrder)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  const updated = await prisma.aboutTeamMember.update({
    where: { id },
    data: {
      emoji: nextEmoji,
      name: nextName,
      nameVi: nextNameVi || null,
      role: nextRole,
      roleVi: nextRoleVi || null,
      bio: nextBio,
      bioVi: nextBioVi || null,
      order: nextOrder,
      isActive: nextIsActive,
    },
  });

  return NextResponse.json({
    ok: true,
    member: {
      id: updated.id,
      emoji: updated.emoji,
      name: updated.name,
      nameVi: updated.nameVi ?? '',
      role: updated.role,
      roleVi: updated.roleVi ?? '',
      bio: updated.bio,
      bioVi: updated.bioVi ?? '',
      order: updated.order,
      isActive: updated.isActive,
    },
  });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'aboutTeam.delete');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  await prisma.aboutTeamMember.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
