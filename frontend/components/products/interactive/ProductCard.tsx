'use client';

import { memo, useCallback, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';
import type { InteractiveProduct } from './types';
import { writeProductTransition } from './productTransitionStorage';

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

/** Flip `rotateY` duration (seconds). Navigation runs on `onAnimationComplete` when this finishes. */
const FLIP_ROTATE_DURATION_SEC = 0.62;

export type ProductCardVariant = 'default' | 'featured' | 'trending' | 'compact';

type ProductCardProps = {
  product: InteractiveProduct;
  variant: ProductCardVariant;
};

function ProductCardInner({ product, variant }: ProductCardProps) {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const [flipped, setFlipped] = useState(false);
  const pendingNavAfterFlip = useRef(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const heroMeasureRef = useRef<HTMLDivElement>(null);
  const techList = Array.isArray(product.technologies) ? product.technologies : [];
  const href = `/products/${encodeURIComponent(product.slug)}`;
  const isFeatured = variant === 'featured';
  const isTrending = variant === 'trending';
  /** Same image strip height as “All products” (`default`) for every variant. */
  const imageHeight = 'h-44';

  const goToProduct = useCallback(() => {
    if (isNavigating) return;
    setIsNavigating(true);
    writeProductTransition(product.slug, heroMeasureRef.current);
    router.push(href);
  }, [href, isNavigating, product.slug, router]);

  const onFlipAnimationComplete = useCallback(() => {
    if (reduceMotion) return;
    if (!pendingNavAfterFlip.current) return;
    pendingNavAfterFlip.current = false;
    goToProduct();
  }, [reduceMotion, goToProduct]);

  const handleCardActivate = useCallback(() => {
    if (isNavigating) return;
    if (reduceMotion) {
      goToProduct();
      return;
    }
    if (flipped) {
      setFlipped(false);
      pendingNavAfterFlip.current = false;
      return;
    }
    pendingNavAfterFlip.current = true;
    setFlipped(true);
  }, [flipped, goToProduct, isNavigating, reduceMotion]);

  const stopBtn = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    pendingNavAfterFlip.current = false;
  };

  const backBlurb = stripHtml(product.shortDescription) || 'Open full view for more details.';

  return (
    <article
      className={`public-card group ${
        isFeatured ? 'public-card-featured md:min-h-[320px]' : isTrending ? 'public-card-trending' : ''
      }`}
    >
      <div
        className="relative perspective-distant"
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div
          className="relative min-h-0 w-full"
          animate={{ rotateY: reduceMotion ? 0 : flipped ? 180 : 0 }}
          transition={{
            duration: reduceMotion ? 0 : FLIP_ROTATE_DURATION_SEC,
            ease: [0.25, 0.46, 0.35, 1],
          }}
          style={{ transformStyle: 'preserve-3d' }}
          onAnimationComplete={onFlipAnimationComplete}
        >
          {/* ==================== FRONT FACE ==================== */}
          <div
            className="backface-hidden flex flex-col overflow-hidden rounded-2xl bg-[color:var(--pub-card-face-bg)]"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
            }}
          >
            <div
              role="button"
              tabIndex={0}
              aria-expanded={flipped}
              aria-label={`${product.productName}. Activate to flip card, then open full product page.`}
              className="cursor-pointer text-left outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[color:var(--pub-card-focus-ring-offset)]"
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardActivate();
                }
              }}
              onClick={handleCardActivate}
            >
              <div
                ref={heroMeasureRef}
                className={`relative isolate min-h-44 overflow-hidden rounded-t-2xl bg-[color:var(--pub-card-image-well-bg)] ${imageHeight}`}
              >
                {product.mainImage ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={product.mainImage}
                    alt=""
                    className="absolute inset-0 z-0 block h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                ) : (
                  <div className="absolute inset-0 z-0 flex h-full items-center justify-center bg-[color:var(--pub-card-image-well-bg)] text-5xl">
                    📦
                  </div>
                )}
                <div className="pointer-events-none absolute inset-0 z-1 bg-linear-to-t from-black/35 via-transparent to-transparent" />
                <span className="card-media-chip absolute left-3 top-3 z-2 rounded-full bg-[color:var(--pub-card-chip-bg)] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide">
                  {product.category.name}
                </span>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3
                  className={`pointer-events-none font-semibold text-fg ${isFeatured ? 'text-xl md:text-2xl' : 'text-lg'}`}
                >
                  {product.productName}
                </h3>
                <p
                  className={`pointer-events-none mt-2 text-fg-muted ${variant === 'compact' ? 'line-clamp-2 text-sm' : 'line-clamp-3 text-sm'}`}
                  dangerouslySetInnerHTML={{ __html: product.shortDescription }}
                />
                <div className="pointer-events-none mt-3 flex flex-wrap gap-1.5">
                  {techList.slice(0, 4).map((t) => (
                    <span
                      key={t.id}
                      className="rounded-md border border-[color:var(--pub-card-border)] bg-[color:var(--pub-card-image-well-bg)] px-2 py-0.5 text-[11px] text-fg-muted"
                      title={t.name}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
                <div className="pointer-events-none mt-4">
                  <span className="text-xs text-fg-subtle">
                    {product.viewsCount} views · {product.demoClickCount} demos
                  </span>
                </div>
              </div>
            </div>

            <div
              className="mt-auto flex gap-2 border-t border-[color:var(--pub-card-footer-border)] p-4 pt-3"
              onClick={stopBtn}
              onPointerDown={stopBtn}
            >
              <Link
                href={`${href}#demo`}
                onClick={() => writeProductTransition(product.slug, heroMeasureRef.current)}
                className="public-card-cta-primary"
              >
                View demo
              </Link>
              <Link
                href={`${href}#landing`}
                onClick={() => writeProductTransition(product.slug, heroMeasureRef.current)}
                className="public-card-cta-secondary"
              >
                Landing
              </Link>
            </div>
          </div>

          {/* ==================== BACK FACE ==================== */}
          <div
            className="absolute inset-0 flex flex-col overflow-hidden rounded-2xl border border-[color:var(--pub-card-border)] bg-[color:var(--pub-card-face-back-bg)] p-5 shadow-inner"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <p className="text-xs font-medium uppercase tracking-wider text-emerald-300/90">Overview</p>
            <h3 className="mt-2 text-lg font-semibold text-fg leading-snug">{product.productName}</h3>
            <p className="mt-3 flex-1 overflow-y-auto text-sm leading-relaxed text-fg-muted">{backBlurb}</p>
            <p className="mt-4 text-xs text-fg-subtle">Opening product page…</p>
          </div>
        </motion.div>
      </div>
    </article>
  );
}

export const ProductCard = memo(ProductCardInner);
