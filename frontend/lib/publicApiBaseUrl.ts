import { resolveLocalBackendApiBaseUrl } from './resolveBackendApiBase';

/**
 * Base URL for public API calls in server components and static export.
 * For `npm run build:frontend:static`, the root script sets `NEXT_PUBLIC_API_BASE_URL`
 * so list + detail fetches use the same host (see `package.json` and hosting.md).
 */
export function publicApiBaseUrl(): string {
  return resolveLocalBackendApiBaseUrl();
}
