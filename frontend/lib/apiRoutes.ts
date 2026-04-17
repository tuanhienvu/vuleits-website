/**
 * Central API path helpers. Routes must match `backend/app/api/**` and Next.js rewrites in `next.config.ts`.
 */

export const API_PREFIX = '/api' as const;

/**
 * Browser-relative path under this Next app (proxied to the backend via rewrites).
 * @param path - Segment after `/api/`, e.g. `company/branding` or `admin/news?take=1`
 */
export function apiPath(path: string): string {
  const p = path.replace(/^\/+/, '');
  return `${API_PREFIX}/${p}`;
}

/**
 * Absolute URL to an API route on another origin (SSR, sitemap, etc.).
 */
export function joinApiOrigin(baseUrl: string, pathAfterApi: string): string {
  const b = baseUrl.replace(/\/+$/, '');
  return `${b}${apiPath(pathAfterApi)}`;
}
