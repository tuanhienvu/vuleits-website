import { prisma } from './prisma';
import { normalizeRoleName } from './adminRoleRank';

export async function userIsSysadmin(userId: number): Promise<boolean> {
  const row = await prisma.user.findUnique({
    where: { id: userId },
    select: { role: { select: { name: true } } },
  });
  return normalizeRoleName(row?.role?.name) === 'SYSADMIN';
}
