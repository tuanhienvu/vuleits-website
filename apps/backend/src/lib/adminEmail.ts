export function normalizeAdminEmail(email: unknown): string {
  if (email == null) return '';
  return String(email)
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .trim()
    .toLowerCase();
}
