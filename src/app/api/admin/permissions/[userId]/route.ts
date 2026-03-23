import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import {
  UI_FEATURES,
  featureToPermissionPrefix,
  buildPermissionName,
  PERMISSION_ACTIONS,
  getEffectiveFeatureMatrix,
} from '@/lib/effectivePermissions';
import { enforceUsersModuleAccess, getRoleRank, normalizeRoleName } from '@/lib/adminUsersModule';
import { applyRoleDefaultUserPermissions } from '@/lib/roleDefaultUserPermissions';

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const auth = await authorize(req, 'permissions.read');
  if (auth.error) return auth.error;
  const gate = await enforceUsersModuleAccess(auth.user.id);
  if (gate) return gate;

  const { userId } = await params;
  const targetUserId = Number(userId);
  if (!Number.isFinite(targetUserId)) return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });

  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, email: true, roleId: true, isProtected: true, isActive: true },
  });
  if (!targetUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  if (!targetUser.isActive) {
    return NextResponse.json({ error: 'Cannot view permissions for an inactive user' }, { status: 403 });
  }

  const matrix = await getEffectiveFeatureMatrix(targetUserId);

  return NextResponse.json({
    user: targetUser,
    features: matrix,
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const auth = await authorize(req, 'permissions.update');
  if (auth.error) return auth.error;
  const gate = await enforceUsersModuleAccess(auth.user.id);
  if (gate) return gate;

  const { userId } = await params;
  const targetUserId = Number(userId);
  if (!Number.isFinite(targetUserId)) return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });

  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, email: true, roleId: true, isProtected: true, isActive: true },
  });
  if (!targetUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  if (!targetUser.isActive) {
    return NextResponse.json({ error: 'Cannot edit permissions for an inactive user' }, { status: 403 });
  }

  const targetRole = await prisma.role.findUnique({ where: { id: targetUser.roleId }, select: { name: true } });
  const operatorUser = auth.user;
  const operatorRole = await prisma.role.findUnique({ where: { id: operatorUser.roleId }, select: { name: true } });

  if (targetUser.isProtected || normalizeRoleName(targetRole?.name) === 'SYSADMIN') {
    return NextResponse.json({ error: 'Cannot edit protected (SYSADMIN) user permissions' }, { status: 403 });
  }

  const operatorRank = getRoleRank(operatorRole?.name);
  const targetRank = getRoleRank(targetRole?.name);
  if (operatorRank > targetRank) {
    return NextResponse.json({ error: 'Forbidden: cannot edit permissions for a higher role' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const features = body?.features || {};

  const permissionNames: string[] = [];
  for (const f of UI_FEATURES) {
    const prefix = featureToPermissionPrefix[f];
    for (const a of PERMISSION_ACTIONS) permissionNames.push(buildPermissionName(prefix, a));
  }

  const permissions = await prisma.permission.findMany({
    where: { name: { in: permissionNames } },
    select: { id: true, name: true },
  });
  const nameToId = new Map<string, number>(permissions.map((p) => [p.name, p.id]));

  for (const f of UI_FEATURES) {
    const prefix = featureToPermissionPrefix[f];
    for (const a of PERMISSION_ACTIONS) {
      const permissionName = buildPermissionName(prefix, a);
      const permissionId = nameToId.get(permissionName);
      if (!permissionId) continue;

      const desired = Boolean(features?.[f]?.[a]);

      if (desired) {
        await prisma.userPermission.upsert({
          where: { userId_permissionId: { userId: targetUser.id, permissionId } },
          update: {},
          create: { userId: targetUser.id, permissionId },
        });
      } else {
        await prisma.userPermission.deleteMany({
          where: { userId: targetUser.id, permissionId },
        });
      }
    }
  }

  return GET(req, { params });
}

/** Reset UserPermission rows to the template for the user's current role (same as on user create / role change). */
export async function POST(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const auth = await authorize(req, 'permissions.update');
  if (auth.error) return auth.error;
  const gate = await enforceUsersModuleAccess(auth.user.id);
  if (gate) return gate;

  const { userId } = await params;
  const targetUserId = Number(userId);
  if (!Number.isFinite(targetUserId)) return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });

  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, email: true, roleId: true, isProtected: true, isActive: true },
  });
  if (!targetUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });
  if (!targetUser.isActive) {
    return NextResponse.json({ error: 'Cannot edit permissions for an inactive user' }, { status: 403 });
  }

  const targetRole = await prisma.role.findUnique({ where: { id: targetUser.roleId }, select: { name: true } });
  const operatorUser = auth.user;
  const operatorRole = await prisma.role.findUnique({ where: { id: operatorUser.roleId }, select: { name: true } });

  if (targetUser.isProtected || normalizeRoleName(targetRole?.name) === 'SYSADMIN') {
    return NextResponse.json({ error: 'Cannot edit protected (SYSADMIN) user permissions' }, { status: 403 });
  }

  const operatorRank = getRoleRank(operatorRole?.name);
  const targetRank = getRoleRank(targetRole?.name);
  if (operatorRank > targetRank) {
    return NextResponse.json({ error: 'Forbidden: cannot edit permissions for a higher role' }, { status: 403 });
  }

  if (!targetRole?.name) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  await applyRoleDefaultUserPermissions(targetUserId, targetRole.name);
  return GET(req, { params });
}
