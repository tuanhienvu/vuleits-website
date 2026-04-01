/**
 * Base URL for public API calls in server components and static export.
 * For `npm run build:frontend:static`, the root script sets `NEXT_PUBLIC_API_BASE_URL`
 * so list + detail fetches use the same host (see `package.json` and HOSTING.md).
 */
export function publicApiBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, '');
  return 'http://127.0.0.1:5000';
}
