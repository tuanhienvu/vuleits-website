export function isAllowedGoogleMapsEmbedUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const u = new URL(trimmed);
    if (u.protocol !== 'https:') return false;
    const host = u.hostname.toLowerCase();
    if (host === 'google.com' || host === 'www.google.com') {
      return u.pathname.startsWith('/maps/embed') || (u.pathname.startsWith('/maps') && u.search.includes('output=embed'));
    }
    if (host === 'maps.google.com') return u.pathname.startsWith('/maps');
    return false;
  } catch {
    return false;
  }
}

export function resolvePublicMapEmbedSrc(mapEmbedUrl: string, address: string): string | null {
  const custom = mapEmbedUrl.trim();
  if (custom && isAllowedGoogleMapsEmbedUrl(custom)) return custom;
  const addr = address.trim();
  if (!addr) return null;
  return `https://maps.google.com/maps?q=${encodeURIComponent(addr)}&hl=en&z=15&output=embed`;
}
