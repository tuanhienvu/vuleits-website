import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { parseLocaleQuery, pickLocalized } from '@/lib/i18nContent';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = parseLocaleQuery(searchParams);

  const rows = await prisma.aboutTeamMember.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { id: 'asc' }],
  });

  return NextResponse.json(
    rows.map((r) => ({
      id: r.id,
      emoji: r.emoji,
      name: pickLocalized(r.name, r.nameVi, locale),
      role: pickLocalized(r.role, r.roleVi, locale),
      bio: pickLocalized(r.bio, r.bioVi, locale),
    })),
  );
}
