import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';

const uiFeatures = [
  'overview',
  'services',
  'products',
  'news',
  'media',
  'banners',
  'homeFeatures',
  'contacts',
  'aboutTeam',
  'aboutStats',
  'users',
  'permissions',
] as const;

type UiFeatureId = (typeof uiFeatures)[number];

const featureToPermissionPrefix: Record<UiFeatureId, string> = {
  overview: 'site',
  services: 'services',
  products: 'products',
  news: 'news',
  media: 'media',
  banners: 'banners',
  homeFeatures: 'homeFeatures',
  contacts: 'contacts',
  aboutTeam: 'aboutTeam',
  aboutStats: 'aboutStats',
  users: 'users',
  permissions: 'permissions',
};

const actions = ['create', 'read', 'update', 'delete'] as const;
type CrudAction = (typeof actions)[number];

const roleOrder = ['SYSADMIN', 'ADMIN', 'MANAGER', 'EDITOR', 'WRITER'] as const;
type RoleName = (typeof roleOrder)[number];

function getRank(roleName: string | null | undefined): number {
  const idx = roleOrder.indexOf((roleName || '').toUpperCase() as RoleName);
  return idx === -1 ? roleOrder.length : idx;
}

function buildPermissionName(prefix: string, action: CrudAction): string {
  return `${prefix}.${action}`;
}

type CrudMatrix = Record<
  UiFeatureId,
  { create: boolean; read: boolean; update: boolean; delete: boolean }
>;

function makeEmptyMatrix(): CrudMatrix {
  const out = {} as CrudMatrix;
  for (const f of uiFeatures) {
    out[f] = { create: false, read: false, update: false, delete: false };
  }
  return out;
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const auth = await authorize(req, 'permissions.read');
  if (auth.error) return auth.error;

  const { userId } = await params;
  const targetUserId = Number(userId);
  if (!Number.isFinite(targetUserId)) return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });

  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, email: true, roleId: true, isProtected: true },
  });
  if (!targetUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  const permissionNames: string[] = [];
  for (const f of uiFeatures) {
    const prefix = featureToPermissionPrefix[f];
    for (const a of actions) permissionNames.push(buildPermissionName(prefix, a));
  }

  const permissions = await prisma.permission.findMany({
    where: { name: { in: permissionNames } },
    select: { id: true, name: true },
  });
  const nameToId = new Map<string, number>(permissions.map((p) => [p.name, p.id]));
  const ids = permissions.map((p) => p.id);

  const userPerms = await prisma.userPermission.findMany({
    where: { userId: targetUser.id, permissionId: { in: ids } },
    select: { permissionId: true },
  });
  const rolePerms = await prisma.rolePermission.findMany({
    where: { roleId: targetUser.roleId, permissionId: { in: ids } },
    select: { permissionId: true },
  });

  const userSet = new Set(userPerms.map((p) => p.permissionId));
  const roleSet = new Set(rolePerms.map((p) => p.permissionId));

  const matrix = makeEmptyMatrix();
  for (const f of uiFeatures) {
    const prefix = featureToPermissionPrefix[f];
    matrix[f] = {
      create: (() => {
        const name = buildPermissionName(prefix, 'create');
        const id = nameToId.get(name);
        if (!id) return false;
        return userSet.has(id) || roleSet.has(id);
      })(),
      read: (() => {
        const name = buildPermissionName(prefix, 'read');
        const id = nameToId.get(name);
        if (!id) return false;
        return userSet.has(id) || roleSet.has(id);
      })(),
      update: (() => {
        const name = buildPermissionName(prefix, 'update');
        const id = nameToId.get(name);
        if (!id) return false;
        return userSet.has(id) || roleSet.has(id);
      })(),
      delete: (() => {
        const name = buildPermissionName(prefix, 'delete');
        const id = nameToId.get(name);
        if (!id) return false;
        return userSet.has(id) || roleSet.has(id);
      })(),
    };
  }

  return NextResponse.json({
    user: targetUser,
    features: matrix,
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ userId: string }> }) {
  const auth = await authorize(req, 'permissions.update');
  if (auth.error) return auth.error;

  const { userId } = await params;
  const targetUserId = Number(userId);
  if (!Number.isFinite(targetUserId)) return NextResponse.json({ error: 'Invalid userId' }, { status: 400 });

  const targetUser = await prisma.user.findUnique({
    where: { id: targetUserId },
    select: { id: true, email: true, roleId: true, isProtected: true },
  });
  if (!targetUser) return NextResponse.json({ error: 'User not found' }, { status: 404 });

  // SYSADMIN / protected users cannot have permissions edited
  const targetRole = await prisma.role.findUnique({ where: { id: targetUser.roleId }, select: { name: true } });
  const operatorUser = auth.user;
  const operatorRole = await prisma.role.findUnique({ where: { id: operatorUser.roleId }, select: { name: true } });

  if (targetUser.isProtected || targetRole?.name?.toUpperCase() === 'SYSADMIN') {
    return NextResponse.json({ error: 'Cannot edit protected (SYSADMIN) user permissions' }, { status: 403 });
  }

  // Lower role cannot update higher role
  const operatorRank = getRank(operatorRole?.name);
  const targetRank = getRank(targetRole?.name);
  if (operatorRank > targetRank) {
    return NextResponse.json({ error: 'Forbidden: cannot edit permissions for a higher role' }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const features = body?.features || {};

  const permissionNames: string[] = [];
  for (const f of uiFeatures) {
    const prefix = featureToPermissionPrefix[f];
    for (const a of actions) permissionNames.push(buildPermissionName(prefix, a));
  }

  const permissions = await prisma.permission.findMany({
    where: { name: { in: permissionNames } },
    select: { id: true, name: true },
  });
  const nameToId = new Map<string, number>(permissions.map((p) => [p.name, p.id]));

  // Apply by toggling UserPermission rows. (RolePermission acts as default.)
  for (const f of uiFeatures) {
    const prefix = featureToPermissionPrefix[f];
    for (const a of actions) {
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

  // Return updated effective matrix
  return GET(req, { params });
}

