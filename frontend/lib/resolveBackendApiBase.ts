/**
 * Base URL for server-side API calls and Next rewrites when using local monorepo defaults.
 *
 * Precedence: `NEXT_PUBLIC_API_BASE_URL` → `BACKEND_INTERNAL_URL` → `BACKEND_PORT` (from env) → `5001`.
 *
 * Set **`BACKEND_PORT`** in **`frontend/.env`** or **`frontend/.env.local`** only (single source for the
 * frontend). Next.js loads those into `process.env` at build/runtime; `scripts/run-next-port.js`
 * also loads them before `next dev` / `next start`. Match this to the API server’s **`PORT`**
 * (see **`backend/.env`**). Rebuild the frontend after changing `BACKEND_PORT` if you use `next start`.
 */
export function resolveLocalBackendApiBaseUrl(): string {
  const fromPublic = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (fromPublic) return fromPublic.replace(/\/+$/, '');
  const internal = process.env.BACKEND_INTERNAL_URL?.trim();
  if (internal) return internal.replace(/\/+$/, '');
  const envBack = process.env.BACKEND_PORT?.trim();
  const port = envBack || '5001';
  return `http://127.0.0.1:${port}`;
}
