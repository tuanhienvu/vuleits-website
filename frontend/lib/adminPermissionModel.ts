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

/** Merge API/partial matrices into a full matrix so every `UI_FEATURES` row exists (avoids undefined `.read`). */
export function normalizeAdminMatrix(input: Partial<AdminCrudMatrix> | AdminCrudMatrix | null | undefined): AdminCrudMatrix {
  const base = makeEmptyAdminMatrix();
  for (const f of UI_FEATURES) {
    const row = input?.[f];
    if (row && typeof row === 'object') {
      base[f] = {
        create: Boolean((row as { create?: unknown }).create),
        read: Boolean((row as { read?: unknown }).read),
        update: Boolean((row as { update?: unknown }).update),
        delete: Boolean((row as { delete?: unknown }).delete),
      };
    }
  }
  return base;
}
