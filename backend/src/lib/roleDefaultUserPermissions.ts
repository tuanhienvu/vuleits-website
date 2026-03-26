/**
 * Default UserPermission rows per role — must match prisma/seed.js roleCrudDefaults.
 * New users need these rows because non-SYSADMIN roles have no RolePermission in DB.
 */
import { prisma } from './prisma';
import {
  UI_FEATURES,
  type AdminCrudMatrix,
  type AdminUiFeatureId,
  makeEmptyAdminMatrix,
} from './adminPermissionModel';
import {
  featureToPermissionPrefix,
  PERMISSION_ACTIONS,
  buildPermissionName,
} from './effectivePermissions';
import { normalizeRoleName } from './adminRoleRank';

const ON = { create: true, read: true, update: true, delete: true };
const OFF = { create: false, read: false, update: false, delete: false };
const CRU_ = { create: true, read: true, update: true, delete: false };
const R___ = { create: false, read: true, update: false, delete: false };
const R_C_ = { create: true, read: true, update: false, delete: false };

export function getRoleDefaultMatrix(roleName: string): AdminCrudMatrix {
  const m = makeEmptyAdminMatrix();
  const R = normalizeRoleName(roleName);

  if (R === 'SYSADMIN' || R === 'ADMIN') {
    for (const f of UI_FEATURES) m[f] = { ...ON };
    return m;
  }

  if (R === 'MANAGER') {
    for (const f of UI_FEATURES) m[f] = { ...OFF };
    const mgr: AdminUiFeatureId[] = [
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
    ];
    for (const f of mgr) m[f] = { ...CRU_ };
    m.users = { ...OFF };
    m.userPassword = { ...OFF };
    m.permissions = { ...OFF };
    return m;
  }

  if (R === 'EDITOR') {
    for (const f of UI_FEATURES) m[f] = { ...OFF };
    const ed: AdminUiFeatureId[] = [
      'overview',
      'news',
      'media',
      'banners',
      'homeFeatures',
      'contacts',
      'aboutTeam',
      'aboutStats',
    ];
    for (const f of ed) m[f] = { ...CRU_ };
    m.services = { ...R___ };
    m.products = { ...R___ };
    m.users = { ...OFF };
    m.userPassword = { ...OFF };
    m.permissions = { ...OFF };
    return m;
  }

  if (R === 'WRITER') {
    for (const f of UI_FEATURES) m[f] = { ...OFF };
    m.overview = { ...R___ };
    m.news = { ...R_C_ };
    m.media = { ...R_C_ };
    m.banners = { ...R___ };
    m.services = { ...R___ };
    m.products = { ...R___ };
    m.homeFeatures = { ...R___ };
    m.contacts = { ...R___ };
    m.aboutTeam = { ...R___ };
    m.aboutStats = { ...R___ };
    m.users = { ...OFF };
    m.userPassword = { ...OFF };
    m.permissions = { ...OFF };
    return m;
  }

  for (const f of UI_FEATURES) m[f] = { ...ON };
  return m;
}

export async function applyRoleDefaultUserPermissions(userId: number, roleName: string): Promise<void> {
  const matrix = getRoleDefaultMatrix(roleName);
  await prisma.userPermission.deleteMany({ where: { userId } });

  const permissionNames: string[] = [];
  for (const f of UI_FEATURES) {
    const prefix = featureToPermissionPrefix[f];
    for (const a of PERMISSION_ACTIONS) {
      permissionNames.push(buildPermissionName(prefix, a));
    }
  }

  const permissions = await prisma.permission.findMany({
    where: { name: { in: permissionNames } },
    select: { id: true, name: true },
  });
  const nameToId = new Map(permissions.map((p) => [p.name, p.id]));

  const rows: { userId: number; permissionId: number }[] = [];
  for (const f of UI_FEATURES) {
    const prefix = featureToPermissionPrefix[f];
    const cell = matrix[f];
    for (const a of PERMISSION_ACTIONS) {
      if (!cell[a]) continue;
      const permissionId = nameToId.get(buildPermissionName(prefix, a));
      if (permissionId != null) rows.push({ userId, permissionId });
    }
  }

  if (rows.length > 0) {
    await prisma.userPermission.createMany({ data: rows });
  }
}

