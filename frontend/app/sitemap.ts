import type { MetadataRoute } from 'next';
import { publicApiBaseUrl } from '@/lib/publicApiBaseUrl';
import { joinApiOrigin } from '@/lib/apiRoutes';

export const dynamic = 'force-static';
const SITE_URL = 'https://vuleits.com';

type ProductListResponse = {
  items?: Array<{ slug?: string | null }>;
};

type NewsListResponse = {
  items?: Array<{ slug?: string | null; publishedAt?: string | null }>;
};

type ServicesListResponse = {
  items?: Array<{ id?: number | null }>;
};

function getSiteUrl(): string {
  return SITE_URL;
}

function getApiBaseUrl(): string {
  return publicApiBaseUrl();
}

async function fetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: 900 },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const apiBaseUrl = getApiBaseUrl();
  const now = new Date();

  const [productsData, newsData, servicesData] = await Promise.all([
    fetchJson<ProductListResponse>(joinApiOrigin(apiBaseUrl, 'products?take=120')),
    fetchJson<NewsListResponse>(joinApiOrigin(apiBaseUrl, 'news?limit=100')),
    fetchJson<ServicesListResponse>(joinApiOrigin(apiBaseUrl, 'services?take=120')),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, changeFrequency: 'weekly', priority: 1 },
    { url: `${siteUrl}/about`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/contact`, changeFrequency: 'monthly', priority: 0.85 },
    { url: `${siteUrl}/privacy`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${siteUrl}/terms`, changeFrequency: 'yearly', priority: 0.5 },
    { url: `${siteUrl}/products`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/news`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${siteUrl}/services`, changeFrequency: 'weekly', priority: 0.8 },
  ];

  const productRoutes = (productsData?.items || [])
    .map((p) => (p?.slug || '').trim())
    .filter(Boolean)
    .map((slug) => ({
      url: `${siteUrl}/products/${encodeURIComponent(slug)}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  const newsRoutes = (newsData?.items || []).flatMap((n) => {
    const slug = (n?.slug || '').trim();
    if (!slug) return [];
    return [
      {
        url: `${siteUrl}/news/${encodeURIComponent(slug)}`,
        lastModified: n?.publishedAt ? new Date(n.publishedAt) : now,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      },
    ];
  });

  const serviceRoutes = (servicesData?.items || [])
    .map((s) => (typeof s?.id === 'number' && Number.isFinite(s.id) ? s.id : null))
    .filter((id): id is number => id != null)
    .map((id) => ({
      url: `${siteUrl}/services/${id}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }));

  return [...staticRoutes, ...productRoutes, ...newsRoutes, ...serviceRoutes];
}

