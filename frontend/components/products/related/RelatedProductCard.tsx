'use client';

import { memo, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { richTextAsPlain } from '@/lib/richTextAdmin';
import type { RelatedProductListItem } from '@/components/products/related/relatedProductRotation';

export type RelatedProductCardProps = {
  product: RelatedProductListItem;
  slotIndex: number;
  /** Parent sets true only for the slot that is mid-sequence so initial paint does not advance the queue. */
  reportEnterComplete?: boolean;
  /** Fires after this slot’s enter animation duration when `reportEnterComplete` is true. */
  onEnterComplete?: (slotIndex: number) => void;
  onNavigate?: () => void;
};

const SLIDE_PX = 48;

/**
 * Single related product card: image, name, short description, category tag.
 * Slide-up: outgoing moves up; incoming rises from below (no flip).
 *
 * `motion.article` is the direct child of `AnimatePresence` (required for reliable exit/enter).
 * Sequencing uses a timer aligned to transition duration so later slots still advance even when
 * `onAnimationComplete` / presence hooks misbehave with nested wrappers.
 */
function RelatedProductCardInner({
  product,
  slotIndex,
  reportEnterComplete = false,
  onEnterComplete,
  onNavigate,
}: RelatedProductCardProps) {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0.1875 : 0.475;
  const ease = [0.22, 1, 0.36, 1] as const;

  const tags = [product.category.name].filter(Boolean);

  useEffect(() => {
    if (!reportEnterComplete) return;
    const ms = Math.max(80, duration * 1000 + 60);
    const id = window.setTimeout(() => {
      onEnterComplete?.(slotIndex);
    }, ms);
    return () => window.clearTimeout(id);
  }, [product.id, reportEnterComplete, duration, slotIndex, onEnterComplete]);

  return (
    <div className="min-w-0 flex-1 overflow-hidden">
      <AnimatePresence mode="wait" initial={false}>
        <motion.article
          key={product.id}
          layout={false}
          role="listitem"
          className="h-full"
          initial={reduceMotion ? { opacity: 0 } : { y: SLIDE_PX, opacity: 0 }}
          animate={reduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduceMotion ? { opacity: 0 } : { y: -SLIDE_PX, opacity: 0 }}
          transition={{ duration, ease }}
        >
          <Link
            href={`/products/${encodeURIComponent(product.slug)}`}
            onClick={onNavigate}
            className="group public-card flex h-full min-h-[220px] flex-col overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60"
            aria-label={`${product.productName}, related product`}
          >
            <div className="aspect-4/3 max-h-36 shrink-0 overflow-hidden bg-[color:var(--pub-card-image-well-bg)]">
              {product.mainImage ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={product.mainImage}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-4xl" aria-hidden>
                  📦
                </div>
              )}
            </div>
            <div className="flex min-h-0 flex-1 flex-col p-4">
              <div className="flex flex-wrap gap-1.5" aria-label="Tags">
                {tags.map((label) => (
                  <span key={label} className="public-tag-emerald">
                    {label}
                  </span>
                ))}
              </div>
              <h3 className="mt-2 line-clamp-2 text-base font-semibold text-fg group-hover:text-emerald-800 dark:group-hover:text-emerald-100">
                {product.productName}
              </h3>
              <p className="mt-2 line-clamp-2 text-sm text-fg-muted">{richTextAsPlain(product.shortDescription)}</p>
            </div>
          </Link>
        </motion.article>
      </AnimatePresence>
    </div>
  );
}

export const RelatedProductCard = memo(RelatedProductCardInner);
