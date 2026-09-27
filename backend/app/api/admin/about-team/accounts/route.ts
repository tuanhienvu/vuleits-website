import { NextResponse } from 'next/server';
import { authorizeAny } from '@/lib/adminAuth';
import { prisma } from '@/lib/prisma';

/** Logins that can be assigned as the owner of a team profile. */
export async function GET(req: Request) {
  const auth = await authorizeAny(req, ['aboutTeam.update', 'aboutTeam.create']);
  if (auth.error) return auth.error;

  const users = await prisma.user.findMany({
    where: { isActive: true },
    orderBy: [{ displayName: 'asc' }, { email: 'asc' }],
    select: {
      id: true,
      email: true,
      displayName: true,
      aboutTeamMember: { select: { id: true, name: true } },
    },
  });

  return NextResponse.json(
    users.map((user) => ({
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      teamMemberId: user.aboutTeamMember?.id ?? null,
      teamMemberName: user.aboutTeamMember?.name ?? null,
    })),
  );
}
