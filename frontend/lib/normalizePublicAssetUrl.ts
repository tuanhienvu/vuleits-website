/**
 * When the API returns absolute URLs to this stack (e.g. `http://127.0.0.1:5001/uploads/...`),
 * the browser should load `/uploads/...` from the Next app origin instead so rewrites proxy to the API.
 * Keeps remote CDN URLs unchanged.
 */
export function normalizePublicAssetUrlForBrowser(url: string): string {
  const u = (url || '').trim();
  if (!u) return u;
  if (u.startsWith('/')) return u;
  try {
    const parsed = new URL(u);
    const isLocal =
      parsed.hostname === 'localhost' ||
      parsed.hostname === '127.0.0.1' ||
      parsed.hostname === '[::1]';
    if (
      isLocal &&
      (parsed.pathname.startsWith('/uploads/') ||
        parsed.pathname === '/uploads' ||
        parsed.pathname.startsWith('/api/'))
    ) {
      return `${parsed.pathname}${parsed.search}${parsed.hash}`;
    }
  } catch {
    return u;
  }
  return u;
}
