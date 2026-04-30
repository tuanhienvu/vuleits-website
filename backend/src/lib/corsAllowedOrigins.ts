/**
 * Origins allowed for CORS on `/api/*` (middleware in `proxy.ts`).
 * Merge local dev defaults with `CORS_ORIGINS`, `FRONTEND_ORIGIN`, and `NEXT_PUBLIC_SITE_URL`.
 */
function trimOrigin(url: string): string | null {
  const t = url.trim();
  return t.length ? t : null;
}

/** Split `CORS_ORIGINS` (comma-separated); tolerate stray spaces. */
function parseCorsOriginsList(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(',')
    .map((s) => trimOrigin(s))
    .filter((s): s is string => s != null);
}

export function buildAllowedOriginSet(): ReadonlySet<string> {
  const out = new Set<string>(['http://localhost:3001', 'http://127.0.0.1:3001']);

  const add = (value: string | undefined) => {
    const t = trimOrigin(value ?? '');
    if (t) out.add(t);
  };

  add(process.env.FRONTEND_ORIGIN);
  add(process.env.NEXT_PUBLIC_SITE_URL);

  for (const o of parseCorsOriginsList(process.env.CORS_ORIGINS)) {
    out.add(o);
  }

  return out;
}
