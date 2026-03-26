import { prisma } from './prisma';
import {
  UI_FEATURES,
  type AdminCrudMatrix,
  type AdminUiFeatureId,
  makeEmptyAdminMatrix,
} from './adminPermissionModel';

export {
  UI_FEATURES,
  type AdminCrudMatrix,
  type AdminUiFeatureId,
  makeEmptyAdminMatrix,
} from './adminPermissionModel';

export const featureToPermissionPrefix: Record<AdminUiFeatureId, string> = {
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
  userPassword: 'userPassword',
  permissions: 'permissions',
};

export const PERMISSION_ACTIONS = ['create', 'read', 'update', 'delete'] as const;
type CrudAction = (typeof PERMISSION_ACTIONS)[number];

export function buildPermissionName(prefix: string, action: CrudAction): string {
  return `${prefix}.${action}`;
}

/** Effective CRUD matrix for a user (UserPermission ∪ RolePermission). */
export async function getEffectiveFeatureMatrix(userId: number): Promise<AdminCrudMatrix> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, roleId: true },
  });
  if (!user) return makeEmptyAdminMatrix();

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
  const ids = permissions.map((p) => p.id);

  const userPerms = await prisma.userPermission.findMany({
    where: { userId: user.id, permissionId: { in: ids } },
    select: { permissionId: true },
  });
  const rolePerms = await prisma.rolePermission.findMany({
    where: { roleId: user.roleId, permissionId: { in: ids } },
    select: { permissionId: true },
  });

  const userSet = new Set(userPerms.map((p) => p.permissionId));
  const roleSet = new Set(rolePerms.map((p) => p.permissionId));

  const matrix = makeEmptyAdminMatrix();
  for (const f of UI_FEATURES) {
    const prefix = featureToPermissionPrefix[f];
    matrix[f] = {
      create: (() => {
        const id = nameToId.get(buildPermissionName(prefix, 'create'));
        if (!id) return false;
        return userSet.has(id) || roleSet.has(id);
      })(),
      read: (() => {
        const id = nameToId.get(buildPermissionName(prefix, 'read'));
        if (!id) return false;
        return userSet.has(id) || roleSet.has(id);
      })(),
      update: (() => {
        const id = nameToId.get(buildPermissionName(prefix, 'update'));
        if (!id) return false;
        return userSet.has(id) || roleSet.has(id);
      })(),
      delete: (() => {
        const id = nameToId.get(buildPermissionName(prefix, 'delete'));
        if (!id) return false;
        return userSet.has(id) || roleSet.has(id);
      })(),
    };
  }

  return matrix;
}

