/** Card → detail → card fullscreen transition (viewport-relative bounds). */
export const PRODUCT_TRANSITION_STORAGE_KEY = 'vuleits_product_transition_v1';

export type StoredProductTransition = {
  v: 1;
  slug: string;
  top: number;
  left: number;
  width: number;
  height: number;
  scrollY: number;
  scrollX: number;
  /** `innerWidth` / `innerHeight` when bounds were captured (stable `transform-origin` vs resize). */
  viewportW?: number;
  viewportH?: number;
};

export function writeProductTransition(slug: string, measureEl: HTMLElement | null): void {
  if (typeof window === 'undefined' || !measureEl) return;
  try {
    const r = measureEl.getBoundingClientRect();
    const payload: StoredProductTransition = {
      v: 1,
      slug,
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
      scrollY: window.scrollY,
      scrollX: window.scrollX,
      viewportW: window.innerWidth,
      viewportH: window.innerHeight,
    };
    sessionStorage.setItem(PRODUCT_TRANSITION_STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* ignore quota / private mode */
  }
}

export function readProductTransition(): StoredProductTransition | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = sessionStorage.getItem(PRODUCT_TRANSITION_STORAGE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as StoredProductTransition;
    if (data?.v !== 1 || typeof data.slug !== 'string') return null;
    if (
      typeof data.top !== 'number' ||
      typeof data.left !== 'number' ||
      typeof data.width !== 'number' ||
      typeof data.height !== 'number'
    ) {
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

export function clearProductTransition(): void {
  try {
    sessionStorage.removeItem(PRODUCT_TRANSITION_STORAGE_KEY);
  } catch {
    /* ignore */
  }
}
