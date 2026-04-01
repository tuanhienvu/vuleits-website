'use client';

import { useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export type RelatedFlipItem = { id: string | number };

type ViewportSnap = { perPage: number; isClient: boolean };

/** Stable reference for SSR + client hydration (must match first paint). */
const SERVER_VIEWPORT_SNAP: ViewportSnap = { perPage: 3, isClient: false };

let clientViewportSnapCache: ViewportSnap | null = null;
let clientViewportWidthCache = -1;

function subscribeViewport(onStoreChange: () => void) {
  if (typeof window === 'undefined') return () => {};
  window.addEventListener('resize', onStoreChange);
  return () => window.removeEventListener('resize', onStoreChange);
}

function getPerPageForWidth(w: number): number {
  if (w >= 1024) return 3;
  if (w >= 640) return 2;
  return 1;
}

function getServerViewportSnap(): ViewportSnap {
  return SERVER_VIEWPORT_SNAP;
}

/**
 * Must return the same object reference when width (and thus perPage) is unchanged —
 * useSyncExternalStore compares snapshots with Object.is.
 */
function getClientViewportSnap(): ViewportSnap {
  if (typeof window === 'undefined') return SERVER_VIEWPORT_SNAP;
  const w = window.innerWidth;
  if (clientViewportWidthCache === w && clientViewportSnapCache) {
    return clientViewportSnapCache;
  }
  clientViewportWidthCache = w;
  clientViewportSnapCache = {
    perPage: getPerPageForWidth(w),
    isClient: true,
  };
  return clientViewportSnapCache;
}

/** SSR-safe: placeholder until client; then live columns from viewport width. */
function useFlipViewport() {
  const snap = useSyncExternalStore(subscribeViewport, getClientViewportSnap, getServerViewportSnap);
  return { mounted: snap.isClient, perPage: snap.perPage };
}

function durationForSlot(slot: number, durationFirst: number, durationRest: number) {
  return slot === 0 ? durationFirst : durationRest;
}

/** With `mode="wait"`, each card runs exit then enter (~2× duration). Next card starts after that. */
function flipStartDelaySec(slot: number, durationFirst: number, durationRest: number) {
  let total = 0;
  for (let k = 0; k < slot; k++) {
    const d = durationForSlot(k, durationFirst, durationRest);
    total += 2 * d;
  }
  return total;
}

function totalRoundAnimationSec(visibleSlots: number, durationFirst: number, durationRest: number) {
  let sec = 0;
  for (let s = 0; s < visibleSlots; s++) {
    sec += 2 * durationForSlot(s, durationFirst, durationRest);
  }
  return sec;
}

type RelatedItemsFlipRowProps<T extends RelatedFlipItem> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
  /**
   * Idle time (ms) after the last card finishes its flip, before the next round starts.
   * The interval between rounds also includes the full sequential flip chain.
   */
  autoFlipIntervalMs?: number;
};

/**
 * One horizontal row of cards. Circular window: card `j` shows `items[(tick + j) % N]`.
 * On each round, flips are chained: card 1 finishes (exit + enter) before card 2 starts, etc.
 */
export default function RelatedItemsFlipRow<T extends RelatedFlipItem>({
  items,
  renderItem,
  autoFlipIntervalMs = 4800,
}: RelatedItemsFlipRowProps<T>) {
  const reduceMotion = useReducedMotion();
  const { mounted, perPage } = useFlipViewport();
  const itemIdsKey = useMemo(() => items.map((i) => i.id).join(','), [items]);

  const n = items.length;
  const visibleSlots = useMemo(() => Math.min(perPage, Math.max(0, n)), [perPage, n]);

  const durationFirst = reduceMotion ? 0.12 : 0.45;
  const durationRest = reduceMotion ? 0.12 : 0.24;

  const roundIntervalMs = useMemo(() => {
    const animMs = Math.ceil(totalRoundAnimationSec(visibleSlots, durationFirst, durationRest) * 1000);
    return animMs + autoFlipIntervalMs;
  }, [visibleSlots, durationFirst, durationRest, autoFlipIntervalMs]);

  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = requestAnimationFrame(() => setTick(0));
    return () => cancelAnimationFrame(id);
  }, [itemIdsKey, perPage]);

  useEffect(() => {
    if (!mounted || n <= 1) return;

    const id = window.setInterval(() => {
      setTick((t) => (t + 1) % n);
    }, roundIntervalMs);

    return () => window.clearInterval(id);
  }, [mounted, n, roundIntervalMs, itemIdsKey]);

  if (n === 0) return null;

  if (!mounted) {
    return (
      <div
        className="min-h-[140px] rounded-2xl bg-[color:var(--pub-card-skeleton-bg)] motion-safe:animate-pulse"
        aria-hidden
      />
    );
  }

  return (
    <div className="flex flex-row gap-3 sm:gap-4">
      {Array.from({ length: visibleSlots }).map((_, slot) => {
        const current = items[(tick + slot) % n]!;
        const duration = durationForSlot(slot, durationFirst, durationRest);
        const delay = flipStartDelaySec(slot, durationFirst, durationRest);

        const ease = [0.4, 0, 0.2, 1] as const;

        return (
          <div key={slot} className="min-w-0 flex-1 perspective-[1400px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                className="transform-3d"
                initial={reduceMotion ? { opacity: 0 } : { rotateY: -90, opacity: 0 }}
                animate={reduceMotion ? { opacity: 1 } : { rotateY: 0, opacity: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 0, transition: { duration, delay, ease } }
                    : { rotateY: 90, opacity: 0, transition: { duration, delay, ease } }
                }
                transition={{ duration, ease }}
              >
                {renderItem(current)}
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
