import { NextResponse } from 'next/server';
import { prisma } from './prisma';
import { normalizeRoleName } from './adminRoleRank';

export { normalizeRoleName, getRoleRank, type AdminRoleName } from './adminRoleRank';

/** Only these roles may access Users / Permissions admin APIs and UI. */
const USERS_MODULE_ROLES = new Set(['SYSADMIN', 'ADMIN']);

export function canAccessUsersModule(roleName: string | null | undefined): boolean {
  return USERS_MODULE_ROLES.has(normalizeRoleName(roleName));
}

/** Returns 403 NextResponse if the user may not use Users/Permissions module; otherwise null. */
export async function enforceUsersModuleAccess(userId: number): Promise<NextResponse | null> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { role: { select: { name: true } } },
  });

  if (!user?.role) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  if (!canAccessUsersModule(user.role.name)) {
    return NextResponse.json(
      { error: 'Forbidden: Users and Permissions are limited to SYSADMIN and ADMIN roles.' },
      { status: 403 },
    );
  }

  return null;
}

