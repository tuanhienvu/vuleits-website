import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import DetailBackButton from '@/components/navigation/DetailBackButton';
import { generateStaticParamsForNews, staticExportAwareFetchOptions } from '@/lib/staticExportPaths';
import { publicApiBaseUrl } from '@/lib/publicApiBaseUrl';

// --- News article: fetch detail + JSON-LD | Breadcrumb, article body, related ---

export async function generateStaticParams() {
  return generateStaticParamsForNews();
}

type Props = {
  params: Promise<{ slug: string }>;
};

type NewsArticleDetail = {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  publishedAt: string;
  authorName: string;
  thumbnailSrc: string | null;
  thumbnailAlt: string | null;
  contentHtml: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
};

type NewsDetailPayload = {
  article: NewsArticleDetail;
  related: Array<{
    id: number;
    title: string;
    slug: string;
    description: string;
    publishedAt: string;
  }>;
};

function publicSiteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vuleits.com';
}

function backendBaseUrl() {
  return publicApiBaseUrl();
}

async function fetchNewsDetail(slug: string): Promise<NewsDetailPayload | null> {
  const res = await fetch(
    `${backendBaseUrl()}/api/news/${encodeURIComponent(slug)}`,
    staticExportAwareFetchOptions(),
  );
  if (!res.ok) return null;
  return (await res.json()) as NewsDetailPayload;
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
  const { article: a, related } = data;
  const pageUrl = `${publicSiteUrl()}/news/${a.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: a.title,
    description: a.seoDescription?.trim() || a.description,
    datePublished: new Date(a.publishedAt).toISOString(),
    author: {
      '@type': 'Person',
      name: a.authorName || 'Unknown',
    },
    mainEntityOfPage: pageUrl,
    image: a.thumbnailSrc ? [a.thumbnailSrc] : undefined,
    keywords: a.seoKeywords?.trim() || a.category,
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a]">
      <div className="container mx-auto px-4 py-8">
        {/* ==================== BACK & BREADCRUMB ==================== */}
        <DetailBackButton fallbackHref="/news" />
        <nav className="text-white/60 text-sm mb-6" aria-label="Breadcrumb">
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link className="underline underline-offset-2" href="/">Home</Link>
            </li>
            <li>›</li>
            <li>
              <Link className="underline underline-offset-2" href="/news">News</Link>
            </li>
            <li>›</li>
            <li>
              <Link
                className="underline underline-offset-2"
                href={`/news?category=${encodeURIComponent(a.category)}`}
              >
                {a.category}
              </Link>
            </li>
            <li>›</li>
            <li className="text-white">{a.title}</li>
          </ol>
        </nav>

        {/* ==================== ARTICLE (META, THUMB, BODY, JSON-LD) ==================== */}
        <article className="glass p-6 md:p-10 rounded-3xl mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{a.title}</h1>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div className="text-white/70">
              <p>{new Date(a.publishedAt).toLocaleDateString()}</p>
              <p>By {a.authorName || 'Unknown'}</p>
            </div>

            {a.thumbnailSrc ? (
              <div className="relative w-full md:w-72 h-56 rounded-xl overflow-hidden bg-white/10">
                <Image
                  src={a.thumbnailSrc}
                  alt={a.thumbnailAlt || a.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  unoptimized={/^https?:\/\//i.test(a.thumbnailSrc)}
                />
              </div>
            ) : null}
          </div>

          <div
            className="text-white/80 leading-relaxed about-intro-rich"
            dangerouslySetInnerHTML={{ __html: a.contentHtml }}
          />

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </article>

        {/* ==================== RELATED ARTICLES ==================== */}
        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-bold text-white">Related articles</h2>
          {related.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="glass flex h-full min-h-[140px] flex-col rounded-2xl p-4 transition-all hover:shadow-xl sm:min-h-[160px] sm:p-5"
                >
                  <p className="line-clamp-2 font-semibold text-fg">{item.title}</p>
                  <p className="line-clamp-3 text-sm text-fg-muted mt-2">{item.description}</p>
                  <p className="mt-auto pt-3 text-xs text-fg-subtle">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-6 text-fg-muted">No related articles found.</div>
          )}
        </section>
      </div>
    </div>
  );
}

