/**
 * `Secure` flag for auth cookies.
 * - Set `AUTH_COOKIE_SECURE` explicitly when TLS terminates in front of Node and public URLs in env are still `http://`.
 * - If unset, infer from `FRONTEND_ORIGIN` or `NEXT_PUBLIC_SITE_URL` scheme (`http://` → false, `https://` → true).
 * - Otherwise in production default to secure cookies.
 */
function inferredSecureFromPublicUrl(): boolean | null {
  const u = process.env.FRONTEND_ORIGIN?.trim() || process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!u) return null;
  if (u.startsWith('https://')) return true;
  if (u.startsWith('http://')) return false;
  return null;
}

export function authCookieSecure(): boolean {
  const v = (process.env.AUTH_COOKIE_SECURE?.trim() ?? '').toLowerCase();
  if (v === '0' || v === 'false' || v === 'no') return false;
  if (v === '1' || v === 'true' || v === 'yes') return true;
  const inferred = inferredSecureFromPublicUrl();
  if (inferred !== null) return inferred;
  return process.env.NODE_ENV === 'production';
}
