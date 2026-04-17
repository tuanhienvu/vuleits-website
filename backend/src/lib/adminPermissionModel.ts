/** Client-safe permission model (no Prisma). Keep in sync with effectivePermissions server helpers. */
export const UI_FEATURES = [
  'overview',
  'services',
  'products',
  'news',
  'media',
  'banners',
  'homeFeatures',
  'uiTexts',
  'contacts',
  'aboutTeam',
  'aboutStats',
  'users',
  'userPassword',
  'permissions',
  'auditLogs',
] as const;

export type AdminUiFeatureId = (typeof UI_FEATURES)[number];

export type AdminCrudMatrix = Record<
  AdminUiFeatureId,
  { create: boolean; read: boolean; update: boolean; delete: boolean }
>;

export function makeEmptyAdminMatrix(): AdminCrudMatrix {
  const out = {} as AdminCrudMatrix;
  for (const f of UI_FEATURES) {
    out[f] = { create: false, read: false, update: false, delete: false };
  }
  return out;
}

