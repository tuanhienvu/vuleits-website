/**
 * Pure helpers for picking the next related product per slot without
 * duplicating another visible slot's product in the same row.
 */

export type RelatedProductListItem = {
  id: number;
  productName: string;
  slug: string;
  shortDescription: string;
  mainImage: string | null;
  category: { name: string; slug: string };
};

/** Unique pool by id (stable order: first occurrence wins). */
export function dedupeRelatedPool(pool: RelatedProductListItem[]): RelatedProductListItem[] {
  const seen = new Set<number>();
  const out: RelatedProductListItem[] = [];
  for (const p of pool) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    out.push(p);
  }
  return out;
}

/**
 * Pick the next product for `slotIndex` given current row state.
 * Must not match any other slot's id. Prefers a different id than current at this slot when possible.
 */
export function pickNextForSlot(
  visible: RelatedProductListItem[],
  slotIndex: number,
  pool: RelatedProductListItem[],
): RelatedProductListItem {
  const current = visible[slotIndex];
  const otherIds = new Set(
    visible.map((p, i) => (i !== slotIndex && p ? p.id : null)).filter((x): x is number => x != null),
  );

  const candidates = pool.filter((p) => !otherIds.has(p.id));
  if (candidates.length === 0) {
    return current ?? pool[0]!;
  }

  const different = candidates.find((p) => p.id !== current?.id);
  if (different) return different;

  return candidates[0]!;
}

/** Initial row: first up to `count` unique products from pool. */
export function initialVisibleRow(pool: RelatedProductListItem[], count: number): RelatedProductListItem[] {
  const d = dedupeRelatedPool(pool);
  return d.slice(0, Math.min(count, d.length));
}

/**
 * Cyclic row: `count` consecutive items from pool starting at index `base` (mod pool length).
 * Ensures each slot can change on every rotation when `pool.length` ≥ 2 (no “stuck” same id).
 */
export function rowForRotationBase(
  pool: RelatedProductListItem[],
  base: number,
  count: number,
): RelatedProductListItem[] {
  const n = pool.length;
  if (n === 0) return [];
  const c = Math.min(count, n);
  const b = ((base % n) + n) % n;
  return Array.from({ length: c }, (_, i) => pool[(b + i) % n]!);
}
