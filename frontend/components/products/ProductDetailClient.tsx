'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import DetailBackButton from '@/components/navigation/DetailBackButton';
import { PRODUCT_HERO_LAYOUT_ID } from '@/components/products/interactive/types';
import {
  clearProductTransition,
  readProductTransition,
  type StoredProductTransition,
} from '@/components/products/interactive/productTransitionStorage';
import type { PublicProductDetail } from '@/lib/products/types';
import { youtubeEmbedFromUrl } from '@/lib/products/videoEmbed';

const RelatedProductsRow = dynamic(() => import('@/components/products/related/RelatedProductsRow'), {
  ssr: false,
});

/** Expand: snappier so the detail shell reaches full screen sooner. */
const SHELL_ENTER_SPRING = { type: 'spring' as const, stiffness: 380, damping: 36, mass: 0.72 };
/** Collapse back to card: ~30% longer than prior exit (~stiffness 72, mass 1.22). */
const SHELL_EXIT_SPRING = { type: 'spring' as const, stiffness: 55, damping: 36, mass: 1.59 };

/**
 * `transform-origin` for fullscreen shell: card hero center as % of the panel.
 * Uses viewport size from when the card was measured (`viewportW/H`) so ratios match `getBoundingClientRect()`.
 */
function cardImageCenterOriginPercent(b: StoredProductTransition): string {
  if (typeof window === 'undefined') return '50% 50%';
  const vw = b.viewportW ?? (window.innerWidth || 1);
  const vh = b.viewportH ?? (window.innerHeight || 1);
  const cx = b.left + b.width / 2;
  const cy = b.top + b.height / 2;
  return `${(cx / vw) * 100}% ${(cy / vh) * 100}%`;
}

// --- Sections: Back + breadcrumb | Header | Media & body | Demo / related ---

export default function ProductDetailClient({ initial }: { initial: PublicProductDetail }) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const skipMotion = reduceMotion === true;
  /** Bounds for shared-element shell; state (not ref) so render stays valid for React Compiler / eslint. */
  const [shellBounds, setShellBounds] = useState<StoredProductTransition | null>(null);
  const exitHandledRef = useRef(false);
  const [shellFromListing, setShellFromListing] = useState(false);
  const [exiting, setExiting] = useState(false);
  const viewTrackedRef = useRef(false);

  useEffect(() => {
    if (viewTrackedRef.current) return;
    viewTrackedRef.current = true;
    void fetch('/api/products/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: initial.slug, action: 'view' }),
    });
  }, [initial.slug]);

  /* Sync shared-element bounds from sessionStorage before first paint (cannot be derived during SSR render). */
  /* eslint-disable react-hooks/set-state-in-effect -- intentional layout sync; deferring would flash wrong shell */
  useLayoutEffect(() => {
    if (skipMotion) {
      const stale = readProductTransition();
      if (stale?.slug === initial.slug) clearProductTransition();
      setShellBounds(null);
      return;
    }
    const data = readProductTransition();
    if (!data) {
      setShellFromListing(false);
      setShellBounds(null);
      return;
    }
    if (data.slug !== initial.slug) {
      clearProductTransition();
      setShellFromListing(false);
      setShellBounds(null);
      return;
    }
    setShellBounds(data);
    setShellFromListing(true);
  }, [initial.slug, skipMotion]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const finishExitAndNavigate = useCallback(() => {
    clearProductTransition();
    setShellBounds(null);
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/products');
    }
  }, [router]);

  const handleBack = useCallback(() => {
    if (!shellBounds || skipMotion || !shellFromListing) {
      clearProductTransition();
      if (typeof window !== 'undefined' && window.history.length > 1) {
        router.back();
      } else {
        router.push('/products');
      }
      return;
    }
    exitHandledRef.current = false;
    setExiting(true);
  }, [shellFromListing, skipMotion, router, shellBounds]);

  const onShellAnimationComplete = useCallback(() => {
    if (!exiting) return;
    if (exitHandledRef.current) return;
    exitHandledRef.current = true;
    finishExitAndNavigate();
  }, [exiting, finishExitAndNavigate]);

  const mainImage = initial.imageUrls[0] ?? null;
  const useShell = shellFromListing && shellBounds != null && !skipMotion;
  const b = shellBounds;

  const productsCrumb =
    useShell && !skipMotion ? (
      <button
        type="button"
        onClick={handleBack}
        className="hover:text-fg transition-colors text-sm text-fg-muted"
      >
        Products
      </button>
    ) : (
      <Link href="/products" className="text-fg-muted hover:text-fg transition-colors">
        Products
      </Link>
    );

  const heroLayoutId =
    useShell || skipMotion ? undefined : `${PRODUCT_HERO_LAYOUT_ID}${initial.slug}`;

  const mainInner = (
    <>
      <DetailBackButton fallbackHref="/products" onCustomNavigate={handleBack} />
      <nav className="text-sm text-fg-muted mb-6" aria-label="Breadcrumb">
        {productsCrumb}
        <span className="mx-2">/</span>
        <span className="text-fg">{initial.productName}</span>
      </nav>

      <motion.header
        className="mb-10"
        initial={skipMotion ? false : useShell ? { opacity: 0, y: 10 } : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={
          skipMotion
            ? { duration: 0 }
            : useShell
              ? { type: 'spring', bounce: 0.06, stiffness: 360, damping: 34 }
              : { type: 'spring', bounce: 0.1, stiffness: 260, damping: 32 }
        }
      >
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide bg-white/10 text-emerald-900 dark:text-emerald-200 border border-emerald-400/30">
            {initial.category.name}
          </span>
          {initial.isFeatured ? (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-900 dark:text-amber-100 border border-amber-400/40">
              Featured
            </span>
          ) : null}
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-fg mb-4">{initial.productName}</h1>
        <p className="text-lg text-fg-muted max-w-3xl">{initial.shortDescription}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <p className="text-sm text-fg-subtle">
            {initial.authorName ? `By ${initial.authorName} · ` : null}
            {initial.viewsCount} views · {initial.demoClickCount} demo opens
          </p>
          <button
            type="button"
            className="rounded-lg border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-fg-muted transition hover:bg-white/10"
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
      </motion.header>

      {mainImage ? (
        <motion.div
          layoutId={heroLayoutId}
          className="mb-10 overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl"
          initial={
            skipMotion
              ? false
              : useShell
                ? { opacity: 0.55, scale: 0.985, filter: 'blur(3px)' }
                : { opacity: 0, scale: 0.94 }
          }
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          transition={
            skipMotion
              ? { duration: 0 }
              : useShell
                ? { delay: 0, duration: 0.48, ease: [0.22, 0.62, 0.32, 1] }
                : { type: 'spring', bounce: 0.16, duration: 1 }
          }
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={mainImage}
            alt=""
            className="w-full max-h-[min(70vh,560px)] object-cover transition duration-500 hover:scale-[1.02]"
            loading="eager"
          />
        </motion.div>
      ) : null}

      {initial.imageUrls.length > 1 ? (
        <section className="mb-12" aria-label="Gallery">
          <h2 className="text-xl font-semibold text-fg mb-4">Gallery</h2>
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
          <h2 className="text-xl font-semibold text-fg mb-4">Videos</h2>
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
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <a href={url} target="_blank" rel="noopener noreferrer" className="flex h-full items-center justify-center text-emerald-700 dark:text-emerald-300 hover:underline p-6">
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
                loading="lazy"
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
                className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/12 px-5 py-3 font-medium text-fg shadow-lg shadow-black/20 transition hover:border-white/45 hover:bg-white/20 scroll-mt-28"
              >
                Landing page
              </a>
            ) : null}
          </div>
        </section>
      ) : null}

      {initial.technologies.length > 0 ? (
        <section className="mb-12" aria-labelledby="tech-heading">
          <h2 id="tech-heading" className="text-xl font-semibold text-fg mb-4">
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
                  <span className="text-sm text-fg-muted">{t.name}</span>
                  {t.description ? (
                    <span className="public-popover-surface pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-lg border border-white/10 px-3 py-2 text-xs text-fg-muted opacity-0 shadow-xl transition group-hover:opacity-100">
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
        <h2 id="overview-heading" className="text-xl font-semibold text-fg mb-4">
          Overview
        </h2>
        <div
          className="public-prose-rich max-w-none rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 text-fg-muted [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:text-(--text-primary) [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-(--text-primary) [&_h3]:text-xl [&_h3]:text-(--text-primary) [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-(--link-color) [&_a]:underline [&_a]:hover:text-(--link-hover)"
          dangerouslySetInnerHTML={{ __html: initial.fullDescriptionHtml }}
        />
      </section>

      {initial.related.length > 0 ? (
        <section className="border-t border-white/10 pt-12" aria-labelledby="related-heading">
          <h2 id="related-heading" className="mb-6 text-2xl font-bold text-fg">
            Related products
          </h2>
          <RelatedProductsRow
            related={initial.related}
            listLabelId="related-heading"
            onNavigate={() => clearProductTransition()}
          />
        </section>
      ) : null}
    </>
  );

  if (useShell && b) {
    return (
      <motion.div
        className={`fixed overflow-x-hidden bg-linear-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a] shadow-2xl will-change-transform ${
          exiting ? 'overflow-hidden' : 'overflow-y-auto'
        }`}
        style={{ zIndex: 25 }}
        initial={{
          top: b.top,
          left: b.left,
          width: b.width,
          height: b.height,
          borderRadius: 16,
          scale: 1,
          opacity: 1,
          transformOrigin: '50% 50%',
        }}
        animate={
          exiting
            ? {
                top: b.top,
                left: b.left,
                width: b.width,
                height: b.height,
                borderRadius: 16,
                scale: 0.82,
                opacity: 0.88,
                transformOrigin: '50% 50%',
              }
            : {
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                borderRadius: 0,
                scale: 1,
                opacity: 1,
                transformOrigin: cardImageCenterOriginPercent(b),
              }
        }
        transition={exiting ? SHELL_EXIT_SPRING : SHELL_ENTER_SPRING}
        onAnimationComplete={onShellAnimationComplete}
      >
        <div className="container mx-auto px-4 py-8 pb-16 min-h-full">{mainInner}</div>
      </motion.div>
    );
  }

  return <div className="container mx-auto px-4 py-8 pb-16">{mainInner}</div>;
}

// --- DemoButton: external demo link + analytics ---

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
      className="inline-flex items-center gap-2 rounded-xl border border-emerald-300/70 bg-emerald-400 px-5 py-3 font-medium text-emerald-950 shadow-lg shadow-emerald-900/30 transition hover:border-emerald-200 hover:bg-emerald-300"
    >
      {label}
    </a>
  );
}
