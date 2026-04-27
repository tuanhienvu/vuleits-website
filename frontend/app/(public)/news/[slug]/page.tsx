import type { Metadata } from 'next';
import NewsDetailExperience from '@/components/news/NewsDetailExperience';
import { publicApiBaseUrl } from '@/lib/publicApiBaseUrl';
import { joinApiOrigin } from '@/lib/apiRoutes';
import type { NewsDetailPayload } from '@/lib/newsDetailPayload';

const SITE_URL = 'https://vuleits.com';

type Props = {
  params: Promise<{ slug: string }>;
};

function publicSiteUrl() {
  return SITE_URL;
}

function backendBaseUrl() {
  return publicApiBaseUrl();
}

async function fetchNewsDetail(slug: string): Promise<NewsDetailPayload | null> {
  try {
    const res = await fetch(joinApiOrigin(backendBaseUrl(), `news/${encodeURIComponent(slug)}`), {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as NewsDetailPayload;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await fetchNewsDetail(slug);
  if (!data?.article) return {};
  const a = data.article;
  const canonical = `${publicSiteUrl()}/news/${a.slug}`;
  const title = (a.seoTitle ?? a.title).trim();
  const description = (a.seoDescription ?? a.description).trim();

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      url: canonical,
      title,
      description,
      images: a.thumbnailSrc ? [{ url: a.thumbnailSrc }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'article:published_time': new Date(a.publishedAt).toISOString(),
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await fetchNewsDetail(slug);
  if (!data?.article) {
    return (
      <div className="container mx-auto px-4 py-12 text-white">
        Article not found.
      </div>
    );
  }
  return <NewsDetailExperience slug={slug} initial={data} />;
}
