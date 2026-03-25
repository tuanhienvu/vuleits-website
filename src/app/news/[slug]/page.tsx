import { Metadata } from 'next';
import Image from 'next/image';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { sanitizeNewsContentHtml } from '@/lib/news/sanitizeNewsContentHtml';
import { NEWS_CATEGORIES } from '@/lib/news/newsCategories';

type Props = {
  params: Promise<{ slug: string }>;
};

function getBaseUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL ?? 'https://vuleits.com';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const a = await prisma.news.findUnique({
    where: { slug },
    include: { image: { select: { url: true, filename: true } }, author: { select: { displayName: true } } },
  });

  if (!a || a.status !== 'Active') return {};

  const effectiveDate = a.publishedAt ?? a.startDate ?? a.createdAt;
  const baseUrl = getBaseUrl();
  const canonical = `${baseUrl}/news/${a.slug}`;

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
      images: a.image?.url ? [{ url: a.image.url }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    other: {
      'article:published_time': effectiveDate.toISOString(),
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;

  const a = await prisma.news.findUnique({
    where: { slug },
    include: { image: { select: { url: true, filename: true } }, author: { select: { displayName: true } } },
  });

  if (!a || a.status !== 'Active') {
    return (
      <div className="container mx-auto px-4 py-12 text-white">
        Article not found.
      </div>
    );
  }

  const effectiveDate = a.publishedAt ?? a.startDate ?? a.createdAt;
  const contentHtml = sanitizeNewsContentHtml(a.content);

  // Related by category first; then fallback to other categories if needed.
  const relatedCandidates = await prisma.news.findMany({
    where: { status: 'Active', category: a.category },
    orderBy: { publishedAt: 'desc' },
    take: 10,
    include: { image: { select: { url: true, filename: true } }, author: { select: { displayName: true } } },
  });

  const related = relatedCandidates
    .filter((x) => x.id !== a.id)
    .slice(0, 4)
    .map((x) => ({
      id: x.id,
      title: x.title,
      slug: x.slug,
      description: x.description,
      publishedAt: (x.publishedAt ?? x.startDate ?? x.createdAt).toISOString(),
      authorName: x.author?.displayName ?? '',
      thumbnailSrc: x.image?.url ?? null,
      thumbnailAlt: x.image?.filename ?? null,
    }));

  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/news/${a.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: a.title,
    description: a.seoDescription?.trim() || a.description,
    datePublished: effectiveDate.toISOString(),
    author: {
      '@type': 'Person',
      name: a.author?.displayName || 'Unknown',
    },
    mainEntityOfPage: pageUrl,
    image: a.image?.url ? [a.image.url] : undefined,
    keywords: a.seoKeywords?.trim() || ((NEWS_CATEGORIES as readonly string[]).includes(a.category) ? a.category : ''),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a]">
      <div className="container mx-auto px-4 py-8">
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

        <article className="glass p-6 md:p-10 rounded-3xl mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{a.title}</h1>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
            <div className="text-white/70">
              <p>{effectiveDate.toLocaleDateString()}</p>
              <p>By {a.author?.displayName ?? 'Unknown'}</p>
            </div>

            {a.image?.url ? (
              <div className="relative w-full md:w-72 h-56 rounded-xl overflow-hidden bg-white/10">
                <Image
                  src={a.image.url}
                  alt={a.image.filename || a.title}
                  fill
                  className="object-cover"
                  loading="lazy"
                  unoptimized={/^https?:\/\//i.test(a.image.url)}
                />
              </div>
            ) : null}
          </div>

          <div
            className="text-white/80 leading-relaxed about-intro-rich"
            // Article content is HTML stored in DB; sanitizer blocks scripts/styles.
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />

          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        </article>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">Related articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {related.length ? (
              related.map((r) => (
                <Link
                  key={r.id}
                  href={`/news/${r.slug}`}
                  className="glass p-5 rounded-2xl hover:shadow-xl transition-all"
                >
                  <p className="text-white font-semibold">{r.title}</p>
                  <p className="text-white/70 text-sm mt-2">{r.description}</p>
                  <p className="text-white/50 text-xs mt-3">{new Date(r.publishedAt).toLocaleDateString()}</p>
                </Link>
              ))
            ) : (
              <div className="glass p-6 rounded-2xl text-white/70">No related articles found.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

