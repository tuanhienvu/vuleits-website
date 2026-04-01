import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import {
  UI_FEATURES,
  featureToPermissionPrefix,
  buildPermissionName,
  PERMISSION_ACTIONS,
  getRoleFeatureMatrix,
} from '@/lib/effectivePermissions';
import { enforceUsersModuleAccess, getRoleRank, normalizeRoleName } from '@/lib/adminUsersModule';
import { applyRoleDefaultRolePermissions } from '@/lib/roleDefaultUserPermissions';

async function getRoleOr404(roleId: number) {
  return prisma.role.findUnique({
    where: { id: roleId },
    select: { id: true, name: true },
  });
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ roleId: string }> }) {
  const auth = await authorize(req, 'permissions.read');
  if (auth.error) return auth.error;
  const gate = await enforceUsersModuleAccess(auth.user.id);
  if (gate) return gate;

  const { roleId: raw } = await params;
  const roleId = Number(raw);
  if (!Number.isFinite(roleId)) return NextResponse.json({ error: 'Invalid roleId' }, { status: 400 });

  const role = await getRoleOr404(roleId);
  if (!role) return NextResponse.json({ error: 'Role not found' }, { status: 404 });

  const matrix = await getRoleFeatureMatrix(roleId);
  const editable = normalizeRoleName(role.name) !== 'SYSADMIN';

  return NextResponse.json({
    role,
    features: matrix,
    editable,
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ roleId: string }> }) {
  const auth = await authorize(req, 'permissions.update');
  if (auth.error) return auth.error;
  const gate = await enforceUsersModuleAccess(auth.user.id);
  if (gate) return gate;

  const { roleId: raw } = await params;
  const roleId = Number(raw);
  if (!Number.isFinite(roleId)) return NextResponse.json({ error: 'Invalid roleId' }, { status: 400 });

  const targetRole = await getRoleOr404(roleId);
  if (!targetRole) return NextResponse.json({ error: 'Role not found' }, { status: 404 });

  if (normalizeRoleName(targetRole.name) === 'SYSADMIN') {
    return NextResponse.json({ error: 'Cannot edit SYSADMIN role permissions' }, { status: 403 });
  }

  const operatorRole = await prisma.role.findUnique({
    where: { id: auth.user.roleId },
    select: { name: true },
  });
  const operatorRank = getRoleRank(operatorRole?.name);
  const targetRank = getRoleRank(targetRole.name);
  if (operatorRank > targetRank) {
    return NextResponse.json({ error: 'Forbidden: cannot edit permissions for a higher role' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const features = (body as { features?: Record<string, Record<string, boolean>> })?.features || {};

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
        await prisma.rolePermission.upsert({
          where: { roleId_permissionId: { roleId, permissionId } },
          update: {},
          create: { roleId, permissionId },
        });
      } else {
        await prisma.rolePermission.deleteMany({
          where: { roleId, permissionId },
        });
      }
    }
  }

  return GET(req, { params });
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ roleId: string }> }) {
  const auth = await authorize(req, 'permissions.update');
  if (auth.error) return auth.error;
  const gate = await enforceUsersModuleAccess(auth.user.id);
  if (gate) return gate;

  const { roleId: raw } = await params;
  const roleId = Number(raw);
  if (!Number.isFinite(roleId)) return NextResponse.json({ error: 'Invalid roleId' }, { status: 400 });

  const targetRole = await getRoleOr404(roleId);
  if (!targetRole) return NextResponse.json({ error: 'Role not found' }, { status: 404 });

  if (normalizeRoleName(targetRole.name) === 'SYSADMIN') {
    return NextResponse.json({ error: 'Cannot reset SYSADMIN role permissions' }, { status: 403 });
  }

  const operatorRole = await prisma.role.findUnique({
    where: { id: auth.user.roleId },
    select: { name: true },
  });
  const operatorRank = getRoleRank(operatorRole?.name);
  const targetRank = getRoleRank(targetRole.name);
  if (operatorRank > targetRank) {
    return NextResponse.json({ error: 'Forbidden: cannot edit permissions for a higher role' }, { status: 403 });
  }

  await applyRoleDefaultRolePermissions(roleId, targetRole.name);
  return GET(req, { params });
}
