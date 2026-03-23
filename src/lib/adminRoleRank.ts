/** Shared role ordering (client + server). Lower index = higher privilege. */

export const ROLE_ORDER = ['SYSADMIN', 'ADMIN', 'MANAGER', 'EDITOR', 'WRITER'] as const;

export type AdminRoleName = (typeof ROLE_ORDER)[number];

export function normalizeRoleName(name: string | null | undefined): string {
  return (name || '').toUpperCase();
}

export function getRoleRank(roleName: string | null | undefined): number {
  const n = normalizeRoleName(roleName) as AdminRoleName;
  const idx = ROLE_ORDER.indexOf(n);
  return idx === -1 ? ROLE_ORDER.length : idx;
}
