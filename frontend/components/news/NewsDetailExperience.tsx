'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DetailBackButton from '@/components/navigation/DetailBackButton';
import { useLocale } from '@/components/providers/LocaleProvider';
import { apiPath } from '@/lib/apiRoutes';
import type { NewsDetailPayload } from '@/lib/newsDetailPayload';
import { richTextAsPlain } from '@/lib/richTextAdmin';

const SITE_URL = 'https://vuleits.com';

function publicSiteUrl() {
  return SITE_URL;
}

export default function NewsDetailExperience({ slug, initial }: { slug: string; initial: NewsDetailPayload }) {
  const { locale, t } = useLocale();
  const [data, setData] = useState<NewsDetailPayload>(initial);

  useEffect(() => {
    if (locale === 'en-US') {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- reset to SSR `initial` for default locale (no duplicate fetch)
      setData(initial);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const qs = new URLSearchParams({ locale });
        const res = await fetch(`${apiPath(`news/${encodeURIComponent(slug)}`)}?${qs.toString()}`, { cache: 'no-store' });
        if (!res.ok) return;
        const next = (await res.json()) as NewsDetailPayload;
        if (!cancelled && next?.article) setData(next);
      } catch {
        // keep previous
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [slug, locale, initial]);

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
        <DetailBackButton fallbackHref="/news" />
        <nav className="text-white/60 text-sm mb-6" aria-label={t('common.breadcrumb')}>
          <ol className="flex flex-wrap gap-2">
            <li>
              <Link className="underline underline-offset-2" href="/">{t('nav.home')}</Link>
            </li>
            <li>›</li>
            <li>
              <Link className="underline underline-offset-2" href="/news">{t('nav.news')}</Link>
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
              <p>{new Date(a.publishedAt).toLocaleDateString()}</p>
              <p>{t('news.byAuthor', { author: a.authorName || t('common.unknown') })}</p>
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

        <section className="mb-16">
          <h2 className="mb-4 text-2xl font-bold text-white">{t('news.relatedArticles')}</h2>
          {related.length ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/news/${item.slug}`}
                  className="glass flex h-full min-h-[140px] flex-col rounded-2xl p-4 transition-all hover:shadow-xl sm:min-h-[160px] sm:p-5"
                >
                  <p className="line-clamp-2 font-semibold text-fg">{item.title}</p>
                  <p className="line-clamp-3 text-sm text-fg-muted mt-2">{richTextAsPlain(item.description || '')}</p>
                  <p className="mt-auto pt-3 text-xs text-fg-subtle">
                    {new Date(item.publishedAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="glass rounded-2xl p-6 text-fg-muted">{t('news.noRelatedArticles')}</div>
          )}
        </section>
      </div>
    </div>
  );
}
