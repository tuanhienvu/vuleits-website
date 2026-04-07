import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type AboutTeamRow = { id: number; emoji: string; name: string; role: string; bio: string; order: number; isActive: number | boolean };

export async function GET() {
  const rows = await prisma.$queryRaw<AboutTeamRow[]>`
    SELECT id, emoji, name, role, bio, \`order\` as \`order\`, isActive
    FROM AboutTeamMember
    WHERE isActive = true
    ORDER BY \`order\` ASC, id ASC
  `;
  const list = Array.isArray(rows) ? rows : [];
  return NextResponse.json(
    list.map((r: AboutTeamRow) => ({ id: Number(r.id), emoji: r.emoji, name: r.name, role: r.role, bio: r.bio })),
  );
}
