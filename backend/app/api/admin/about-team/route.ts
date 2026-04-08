import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { jsonObjectBody } from '@/lib/jsonBody';

type AboutTeamRow = {
  id: number;
  emoji: string;
  name: string;
  role: string;
  bio: string;
  order: number;
  isActive: number | boolean;
};

export async function GET(req: Request) {
  const auth = await authorize(req, 'aboutTeam.read');
  if (auth.error) return auth.error;

  const rows = await prisma.$queryRaw<AboutTeamRow[]>`
    SELECT id, emoji, name, role, bio, \`order\` as \`order\`, isActive
    FROM AboutTeamMember
    ORDER BY \`order\` ASC, id ASC
  `;

  return NextResponse.json(
    rows.map((r: AboutTeamRow) => ({
      id: Number(r.id),
      emoji: r.emoji,
      name: r.name,
      role: r.role,
      bio: r.bio,
      order: Number(r.order),
      isActive: Boolean(r.isActive),
    })),
  );
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'aboutTeam.create');
  if (auth.error) return auth.error;

  const body = jsonObjectBody(await req.json());
  const emoji = String(body.emoji ?? '').trim();
  const name = String(body.name ?? '').trim();
  const role = String(body.role ?? '').trim();
  const bio = String(body.bio ?? '').trim();
  const order = body.order === undefined || body.order === null ? 0 : Number(body.order);
  const isActive = body.isActive === undefined ? true : Boolean(body.isActive);

  if (!emoji || !name || !role || !bio) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  if (!Number.isFinite(order)) return NextResponse.json({ error: 'Invalid order' }, { status: 400 });

  await prisma.$executeRaw`
    INSERT INTO AboutTeamMember (emoji, name, role, bio, \`order\`, isActive, createdAt, updatedAt)
    VALUES (${emoji}, ${name}, ${role}, ${bio}, ${order}, ${isActive}, NOW(), NOW())
  `;

  const created = await prisma.$queryRaw<AboutTeamRow[]>`
    SELECT id, emoji, name, role, bio, \`order\` as \`order\`, isActive
    FROM AboutTeamMember
    ORDER BY id DESC
    LIMIT 1
  `;

  const member = created[0];
  return NextResponse.json({
    ok: true,
    member: member
      ? {
          id: Number(member.id),
          emoji: member.emoji,
          name: member.name,
          role: member.role,
          bio: member.bio,
          order: Number(member.order),
          isActive: Boolean(member.isActive),
        }
      : null,
  });
}

