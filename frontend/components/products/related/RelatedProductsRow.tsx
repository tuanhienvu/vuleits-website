'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RelatedProductCard } from '@/components/products/related/RelatedProductCard';
import {
  dedupeRelatedPool,
  rowForRotationBase,
  type RelatedProductListItem,
} from '@/components/products/related/relatedProductRotation';

const SLOT_COUNT = 3;

/** Idle time after the last card finishes before the next full sequence (ms). */
const DEFAULT_PAUSE_BETWEEN_ROUNDS_MS = 1500;

type RelatedProductsRowProps = {
  related: RelatedProductListItem[];
  onNavigate?: () => void;
  pauseBetweenRoundsMs?: number;
  /** For accessibility: id of the section heading that labels this list */
  listLabelId?: string;
};

function initialRowFromRelated(related: RelatedProductListItem[]): RelatedProductListItem[] {
  const pool = dedupeRelatedPool(related);
  const visibleCount = Math.min(SLOT_COUNT, pool.length);
  return rowForRotationBase(pool, 0, visibleCount);
}

/**
 * Exactly one row of up to 3 related product cards. Rotates with sequential slide-up:
 * slot 0 → slot 1 → slot 2, without duplicates in the row for each pick.
 * Uses cyclic rotation so every slot gets a new product when the pool has at least 2 items.
 */
export default function RelatedProductsRow({
  related,
  onNavigate,
  pauseBetweenRoundsMs = DEFAULT_PAUSE_BETWEEN_ROUNDS_MS,
  listLabelId,
}: RelatedProductsRowProps) {
  const pool = useMemo(() => dedupeRelatedPool(related), [related]);
  const visibleCount = Math.min(SLOT_COUNT, pool.length);

  const [rotationBase, setRotationBase] = useState(0);
  const [slotProducts, setSlotProducts] = useState<RelatedProductListItem[]>(() => initialRowFromRelated(related));

  const rotationBaseRef = useRef(0);
  const pendingRowRef = useRef<RelatedProductListItem[] | null>(null);
  const pendingBaseRef = useRef(0);

  const [pendingReportSlot, setPendingReportSlot] = useState<number | null>(null);
  const pendingReportSlotRef = useRef<number | null>(null);

  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    rotationBaseRef.current = rotationBase;
  }, [rotationBase]);

  useEffect(() => {
    pendingReportSlotRef.current = pendingReportSlot;
  }, [pendingReportSlot]);

  const clearRoundTimer = useCallback(() => {
    if (timeoutRef.current != null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  useEffect(() => {
    for (const p of pool) {
      if (!p.mainImage) continue;
      const img = new Image();
      img.decoding = 'async';
      img.src = p.mainImage;
    }
  }, [pool]);

  /** When the pool changes: reset rotation, row, timers, schedule first round. */
  /* eslint-disable react-hooks/set-state-in-effect -- pool swap must reset row state atomically with new timer */
  useEffect(() => {
    clearRoundTimer();
    setRotationBase(0);
    rotationBaseRef.current = 0;
    setSlotProducts(rowForRotationBase(pool, 0, visibleCount));
    setPendingReportSlot(null);
    pendingRowRef.current = null;

    if (pool.length <= 1 || visibleCount === 0) return;

    const id = window.setTimeout(() => {
      timeoutRef.current = null;
      const n = pool.length;
      const nextB = (rotationBaseRef.current + 1) % n;
      pendingBaseRef.current = nextB;
      pendingRowRef.current = rowForRotationBase(pool, nextB, visibleCount);
      const row = pendingRowRef.current;
      setSlotProducts((prev) => {
        const next = [...prev];
        next[0] = row[0]!;
        return next;
      });
      setPendingReportSlot(0);
    }, pauseBetweenRoundsMs);
    timeoutRef.current = id;

    return () => {
      window.clearTimeout(id);
      timeoutRef.current = null;
    };
  }, [pool, visibleCount, pauseBetweenRoundsMs, clearRoundTimer]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const runNextSlot = useCallback(
    (afterSlot: number) => {
      clearRoundTimer();
      const row = pendingRowRef.current;
      if (!row) return;

      const next = afterSlot + 1;
      if (next < visibleCount) {
        setSlotProducts((prev) => {
          const out = [...prev];
          out[next] = row[next]!;
          return out;
        });
        setPendingReportSlot(next);
      } else {
        setRotationBase(pendingBaseRef.current);
        rotationBaseRef.current = pendingBaseRef.current;
        setPendingReportSlot(null);
        pendingRowRef.current = null;

        const id = window.setTimeout(() => {
          timeoutRef.current = null;
          const n = pool.length;
          if (n <= 1) return;
          const nextB = (rotationBaseRef.current + 1) % n;
          pendingBaseRef.current = nextB;
          pendingRowRef.current = rowForRotationBase(pool, nextB, visibleCount);
          const r = pendingRowRef.current;
          setSlotProducts((prev) => {
            const out = [...prev];
            out[0] = r[0]!;
            return out;
          });
          setPendingReportSlot(0);
        }, pauseBetweenRoundsMs);
        timeoutRef.current = id;
      }
    },
    [clearRoundTimer, visibleCount, pool, pauseBetweenRoundsMs],
  );

  const handleEnterComplete = useCallback(
    (slotIndex: number) => {
      if (pendingReportSlotRef.current !== slotIndex) return;
      runNextSlot(slotIndex);
    },
    [runNextSlot],
  );

  if (visibleCount === 0) return null;

  return (
    <div
      role="list"
      aria-labelledby={listLabelId}
      aria-live="polite"
      aria-atomic="false"
      className="flex flex-row gap-3 sm:gap-4"
    >
      {slotProducts.slice(0, visibleCount).map((product, slotIndex) => (
        <RelatedProductCard
          key={`slot-${slotIndex}`}
          product={product}
          slotIndex={slotIndex}
          reportEnterComplete={pendingReportSlot === slotIndex}
          onEnterComplete={handleEnterComplete}
          onNavigate={onNavigate}
        />
      ))}
    </div>
  );
}
