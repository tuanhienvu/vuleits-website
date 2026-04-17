import { resolveLocalBackendApiBaseUrl } from './resolveBackendApiBase';

/**
 * Base URL for public API calls in server components (SSR, sitemap, etc.).
 * Uses the internal backend base resolved from local server config.
 */
export function publicApiBaseUrl(): string {
  return resolveLocalBackendApiBaseUrl();
}
