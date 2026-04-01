/** Used at build time to list paths for `/news/[slug]`, `/products/[slug]`, `/services/[id]`. See HOSTING.md. */

import { publicApiBaseUrl } from '@/lib/publicApiBaseUrl';

/** Static export cannot use dynamic fetches; SSR uses fresh data via no-store. */
export function staticExportAwareFetchOptions(): {
  cache?: RequestCache;
  next?: { revalidate?: number };
} {
  const isExport =
    process.env.NEXT_PUBLIC_STATIC_EXPORT === '1' ||
    process.env.NEXT_PUBLIC_STATIC_EXPORT === 'true';
  if (isExport) {
    return { next: { revalidate: 3600 } };
  }
  return { cache: 'no-store' };
}

function apiBase(): string {
  return publicApiBaseUrl();
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    // No cache/no-store flags: Next uses this during static path collection; no-store can prevent params from being collected.
    const res = await fetch(url);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export async function generateStaticParamsForNews(): Promise<Array<{ slug: string }>> {
  const data = await fetchJson<{ items?: Array<{ slug?: string | null }> }>(
    `${apiBase()}/api/news?limit=100`,
  );
  const slugs = (data?.items || [])
    .map((n) => (n?.slug || '').trim())
    .filter(Boolean);
  return slugs.map((slug) => ({ slug }));
}

export async function generateStaticParamsForProducts(): Promise<Array<{ slug: string }>> {
  const data = await fetchJson<{ items?: Array<{ slug?: string | null }> }>(
    `${apiBase()}/api/products?take=200`,
  );
  const slugs = (data?.items || [])
    .map((p) => (p?.slug || '').trim())
    .filter(Boolean);
  return slugs.map((slug) => ({ slug }));
}

export async function generateStaticParamsForServices(): Promise<Array<{ id: string }>> {
  const data = await fetchJson<{ items?: Array<{ id?: number | null }> }>(
    `${apiBase()}/api/services?take=200`,
  );
  const ids = (data?.items || [])
    .map((s) => (typeof s?.id === 'number' && Number.isFinite(s.id) ? String(s.id) : ''))
    .filter(Boolean);
  return ids.map((id) => ({ id }));
}
