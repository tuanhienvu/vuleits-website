'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import type { PublicProductDetail } from '@/lib/products/publicProductDetail';
import { youtubeEmbedFromUrl } from '@/lib/products/videoEmbed';

export default function ProductDetailClient({ initial }: { initial: PublicProductDetail }) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    void fetch('/api/products/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: initial.slug, action: 'view' }),
    });
  }, [initial.slug]);

  const mainImage = initial.imageUrls[0] ?? null;

  return (
    <div className="container mx-auto px-4 py-8 pb-16">
      <nav className="text-sm text-white/60 mb-6" aria-label="Breadcrumb">
        <Link href="/products" className="hover:text-white transition-colors">
          Products
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/90">{initial.productName}</span>
      </nav>

      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide bg-white/10 text-emerald-200 border border-emerald-400/30">
            {initial.category.name}
          </span>
          {initial.isFeatured ? (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-100 border border-amber-400/40">
              Featured
            </span>
          ) : null}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{initial.productName}</h1>
        <p className="text-lg text-white/80 max-w-3xl">{initial.shortDescription}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-sm text-white/50">
            {initial.authorName ? `By ${initial.authorName} · ` : null}
            {initial.viewsCount} views · {initial.demoClickCount} demo opens
          </p>
          <button
            type="button"
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white/85 transition hover:bg-white/10"
            onClick={() => {
              void fetch('/api/products/analytics', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug: initial.slug, action: 'share' }),
              });
              const url = typeof window !== 'undefined' ? window.location.href : '';
              if (navigator.share) {
                void navigator.share({ title: initial.productName, text: initial.shortDescription, url }).catch(() => {
                  void navigator.clipboard.writeText(url);
                });
              } else if (url) {
                void navigator.clipboard.writeText(url);
              }
            }}
          >
            Share
          </button>
        </div>
      </header>

      {mainImage ? (
        <div className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainImage}
            alt=""
            className="w-full max-h-[min(70vh,560px)] object-cover transition duration-500 hover:scale-[1.02]"
            loading="eager"
          />
        </div>
      ) : null}

      {initial.imageUrls.length > 1 ? (
        <section className="mb-12" aria-label="Gallery">
          <h2 className="text-xl font-semibold text-white mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {initial.imageUrls.slice(1).map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 aspect-video"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {initial.videoUrls.length > 0 ? (
        <section className="mb-12" aria-label="Videos">
          <h2 className="text-xl font-semibold text-white mb-4">Videos</h2>
          <div className="space-y-6">
            {initial.videoUrls.map((url, i) => {
              const embed = youtubeEmbedFromUrl(url);
              return (
                <div key={`${url}-${i}`} className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 aspect-video">
                  {embed ? (
                    <iframe
                      title={`Video ${i + 1}`}
                      src={embed}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="flex h-full items-center justify-center text-emerald-300 hover:underline p-6">
                      Open video
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ) : null}

      {initial.embedDemoUrl || initial.demoLink || initial.landingPageLink ? (
        <section id="demo" className="mb-12 scroll-mt-28 space-y-8" aria-label="Demo and links">
          {initial.embedDemoUrl ? (
            <div className="overflow-hidden rounded-2xl border border-emerald-400/20 shadow-[0_0_40px_-12px_rgba(52,211,153,0.35)]">
              <iframe
                title="Product demo"
                src={initial.embedDemoUrl}
                className="h-[min(70vh,560px)] w-full bg-white"
                sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
              />
            </div>
          ) : null}
          <div className="flex flex-wrap gap-3">
            {initial.demoLink ? (
              <DemoButton href={initial.demoLink} label="Open demo" slug={initial.slug} />
            ) : null}
            {initial.landingPageLink ? (
              <a
                id="landing"
                href={initial.landingPageLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-white transition hover:bg-white/15 hover:border-white/40 scroll-mt-28"
              >
                Landing page
              </a>
            ) : null}
          </div>
        </section>
      ) : null}

      {initial.technologies.length > 0 ? (
        <section className="mb-12" aria-labelledby="tech-heading">
          <h2 id="tech-heading" className="text-xl font-semibold text-white mb-4">
            Technologies used
          </h2>
          <ul className="flex flex-wrap gap-3">
            {initial.technologies.map((t) => (
              <li key={t.id}>
                <span
                  className="group relative inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-3 py-2 transition hover:border-emerald-400/40 hover:bg-white/10"
                  title={t.description ?? t.name}
                >
                  {t.logo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={t.logo} alt="" className="h-8 w-8 object-contain" />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/10 text-lg">⚙</span>
                  )}
                  <span className="text-sm text-white/90">{t.name}</span>
                  {t.description ? (
                    <span className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-lg border border-white/10 bg-[#0a1020] px-3 py-2 text-xs text-white/90 opacity-0 shadow-xl transition group-hover:opacity-100">
                      {t.description}
                    </span>
                  ) : null}
                </span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <section className="mb-8" aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="text-xl font-semibold text-white mb-4">
          Overview
        </h2>
        <div
          className="max-w-none rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 text-white/85 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h3]:text-xl [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-emerald-300 [&_a]:underline"
          dangerouslySetInnerHTML={{ __html: initial.fullDescriptionHtml }}
        />
      </section>

      {initial.related.length > 0 ? (
        <section className="border-t border-white/10 pt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="text-2xl font-bold text-white mb-6">
            Related products
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {initial.related.map((r) => (
              <Link
                key={r.id}
                href={`/products/${encodeURIComponent(r.slug)}`}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-white/25 hover:shadow-lg"
              >
                <div className="aspect-video overflow-hidden bg-white/5">
                  {r.mainImage ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={r.mainImage} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" loading="lazy" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-4xl">📦</div>
                  )}
                </div>
                <div className="p-4">
                  <p className="text-xs uppercase tracking-wide text-emerald-200/90">{r.category.name}</p>
                  <h3 className="mt-1 font-semibold text-white group-hover:text-emerald-100">{r.productName}</h3>
                  <p className="mt-2 line-clamp-2 text-sm text-white/65">{r.shortDescription}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

function DemoButton({ href, label, slug }: { href: string; label: string; slug: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        void fetch('/api/products/analytics', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ slug, action: 'click_demo' }),
        });
      }}
      className="inline-flex items-center gap-2 rounded-xl bg-emerald-500/90 px-5 py-3 font-medium text-emerald-950 shadow-lg shadow-emerald-900/30 transition hover:bg-emerald-400"
    >
      {label}
    </a>
  );
}
