import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

type AboutTeamRow = {
  id: number;
  emoji: string;
  name: string;
  role: string;
  bio: string;
  order: number;
  isActive: number | boolean;
};

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'aboutTeam.read');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const rows = await prisma.$queryRaw<AboutTeamRow[]>`
    SELECT id, emoji, name, role, bio, \`order\` as \`order\`, isActive
    FROM AboutTeamMember
    WHERE id = ${id}
    LIMIT 1
  `;
  const member = rows[0];
  if (!member) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    id: Number(member.id),
    emoji: member.emoji,
    name: member.name,
    role: member.role,
    bio: member.bio,
    order: Number(member.order),
    isActive: Boolean(member.isActive),
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'aboutTeam.update');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const body = await req.json();
  const data: { emoji?: string; name?: string; role?: string; bio?: string; order?: number; isActive?: boolean } = {};

  if ((body as any).emoji !== undefined) data.emoji = String((body as any).emoji || '').trim();
  if ((body as any).name !== undefined) data.name = String((body as any).name || '').trim();
  if ((body as any).role !== undefined) data.role = String((body as any).role || '').trim();
  if ((body as any).bio !== undefined) data.bio = String((body as any).bio || '').trim();
  if ((body as any).order !== undefined) data.order = Number((body as any).order);
  if ((body as any).isActive !== undefined) data.isActive = Boolean((body as any).isActive);

  if (data.emoji !== undefined && !data.emoji) return NextResponse.json({ error: 'Emoji is required' }, { status: 400 });
  if (data.name !== undefined && !data.name) return NextResponse.json({ error: 'Name is required' }, { status: 400 });
  if (data.role !== undefined && !data.role) return NextResponse.json({ error: 'Role is required' }, { status: 400 });
  if (data.bio !== undefined && !data.bio) return NextResponse.json({ error: 'Bio is required' }, { status: 400 });
  if (data.order !== undefined && !Number.isFinite(data.order)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  const currentRows = await prisma.$queryRaw<AboutTeamRow[]>`
    SELECT id, emoji, name, role, bio, \`order\` as \`order\`, isActive
    FROM AboutTeamMember
    WHERE id = ${id}
    LIMIT 1
  `;
  const current = currentRows[0];
  if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const nextEmoji = data.emoji ?? current.emoji;
  const nextName = data.name ?? current.name;
  const nextRole = data.role ?? current.role;
  const nextBio = data.bio ?? current.bio;
  const nextOrder = data.order ?? current.order;
  const nextIsActive = data.isActive ?? Boolean(current.isActive);

  await prisma.$executeRaw`
    UPDATE AboutTeamMember
    SET emoji = ${nextEmoji},
        name = ${nextName},
        role = ${nextRole},
        bio = ${nextBio},
        \`order\` = ${nextOrder},
        isActive = ${nextIsActive},
        updatedAt = NOW()
    WHERE id = ${id}
  `;

  const updatedRows = await prisma.$queryRaw<AboutTeamRow[]>`
    SELECT id, emoji, name, role, bio, \`order\` as \`order\`, isActive
    FROM AboutTeamMember
    WHERE id = ${id}
    LIMIT 1
  `;
  const updated = updatedRows[0];

  return NextResponse.json({
    ok: true,
    member: updated
      ? {
          id: Number(updated.id),
          emoji: updated.emoji,
          name: updated.name,
          role: updated.role,
          bio: updated.bio,
          order: Number(updated.order),
          isActive: Boolean(updated.isActive),
        }
      : null,
  });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'aboutTeam.delete');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  await prisma.$executeRaw`DELETE FROM AboutTeamMember WHERE id = ${id}`;
  return NextResponse.json({ ok: true });
}

