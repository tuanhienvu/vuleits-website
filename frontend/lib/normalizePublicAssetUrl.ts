/**
 * When the API returns absolute URLs to this stack (e.g. `http://127.0.0.1:5001/uploads/...`),
 * the browser should load `/uploads/...` from the Next app origin instead so rewrites proxy to the API.
 * Keeps remote CDN URLs unchanged.
 */
function isLikelyInternalHostname(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (!h) return false;
  if (h === 'localhost' || h === '127.0.0.1' || h === '[::1]' || h.endsWith('.local')) return true;
  // Docker/internal service names often use single-label hosts (e.g. "backend", "mysql_db").
  if (!h.includes('.')) return true;
  if (h.endsWith('.internal') || h.endsWith('.docker') || h.endsWith('.localdomain')) return true;
  if (h.startsWith('10.') || h.startsWith('192.168.')) return true;
  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(h)) return true;
  return false;
}

export function normalizePublicAssetUrlForBrowser(url: string): string {
  const u = (url || '').trim();
  if (!u) return u;
  if (u.startsWith('/')) return u;
  try {
    const parsed = new URL(u);
    const sameHost = typeof window !== 'undefined' && parsed.hostname === window.location.hostname;
    const isLocal = isLikelyInternalHostname(parsed.hostname);
    if (
      (isLocal || sameHost) &&
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
