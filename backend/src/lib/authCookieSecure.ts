/**
 * `Secure` flag for auth cookies. In production, defaults to true (HTTPS only).
 * Set AUTH_COOKIE_SECURE=0 in Docker/.env when the site is served over plain HTTP
 * (e.g. IP:80) so the browser will store the session cookie.
 */
export function authCookieSecure(): boolean {
  const v = process.env.AUTH_COOKIE_SECURE?.trim().toLowerCase();
  if (v === '0' || v === 'false' || v === 'no') return false;
  if (v === '1' || v === 'true' || v === 'yes') return true;
  return process.env.NODE_ENV === 'production';
}
