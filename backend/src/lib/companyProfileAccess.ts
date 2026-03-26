import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { normalizeRoleName } from '@/lib/adminRoleRank';

export async function requireCompanyProfileAdmin(request: Request) {
  const auth = await authorize(request);
  if (auth.error) return { error: auth.error } as const;

  const row = await prisma.user.findUnique({
    where: { id: auth.user.id },
    include: { role: { select: { name: true } } },
  });
  const n = normalizeRoleName(row?.role?.name);
  if (n !== 'ADMIN' && n !== 'SYSADMIN') {
    return {
      error: NextResponse.json(
        { error: 'Forbidden: Company profile is only available to Administrator roles.' },
        { status: 403 },
      ),
    } as const;
  }
  return { user: auth.user } as const;
}
