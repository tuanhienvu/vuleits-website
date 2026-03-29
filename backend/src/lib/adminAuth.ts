import { NextResponse } from 'next/server';
import { prisma } from './prisma';
import { verifyJWT } from './jwt';
import { normalizeAdminEmail } from './adminEmail';

export async function authorize(request: Request, requiredPermission?: string) {
  const cookies = request.headers.get('cookie') || '';
  const tokenMatch = cookies.match(/auth_token=([^;]+)/);
  const token = tokenMatch?.[1];

  if (!token) {
    return { error: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  const payload = verifyJWT(token);
  if (!payload) {
    return { error: NextResponse.json({ error: 'Invalid or expired token' }, { status: 401 }) };
  }

  let user = await prisma.user.findUnique({ where: { email: payload.email } });
  if (!user) {
    const n = normalizeAdminEmail(payload.email);
    if (n) user = await prisma.user.findUnique({ where: { email: n } });
  }
  if (!user) {
    return { error: NextResponse.json({ error: 'User not found' }, { status: 403 }) };
  }

  if (!user.isActive) {
    return { error: NextResponse.json({ error: 'Account inactive' }, { status: 403 }) };
  }

  if (!requiredPermission) return { user };

  const perm = await prisma.permission.findUnique({ where: { name: requiredPermission } });
  if (!perm) {
    return { error: NextResponse.json({ error: 'Permission not found' }, { status: 403 }) };
  }

  const up = await prisma.userPermission.findUnique({
    where: { userId_permissionId: { userId: user.id, permissionId: perm.id } },
  });
  if (up) return { user };

  const rp = await prisma.rolePermission.findUnique({
    where: { roleId_permissionId: { roleId: user.roleId, permissionId: perm.id } },
  });
  if (rp) return { user };

  return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
}

/** Authenticated user must have at least one of the given permissions. */
export async function authorizeAny(request: Request, requiredPermissions: string[]) {
  const base = await authorize(request);
  if (base.error) return base;
  const user = base.user;
  for (const p of requiredPermissions) {
    if (await userHasPermission(user.id, p)) return { user };
  }
  return { error: NextResponse.json({ error: 'Forbidden' }, { status: 403 }) };
}

export async function userHasPermission(userId: number, permissionName: string): Promise<boolean> {
  const perm = await prisma.permission.findUnique({ where: { name: permissionName } });
  if (!perm) return false;

  const up = await prisma.userPermission.findUnique({
    where: { userId_permissionId: { userId, permissionId: perm.id } },
  });
  if (up) return true;

  const user = await prisma.user.findUnique({ where: { id: userId }, select: { roleId: true } });
  if (!user) return false;

  const rp = await prisma.rolePermission.findUnique({
    where: { roleId_permissionId: { roleId: user.roleId, permissionId: perm.id } },
  });
  return !!rp;
}
