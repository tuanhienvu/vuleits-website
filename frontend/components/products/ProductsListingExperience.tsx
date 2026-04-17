'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

type Category = { id: number; name: string; slug: string };
type Tech = { id: number; techName: string; techLogo: string | null };
type CardItem = {
  id: number;
  productName: string;
  slug: string;
  shortDescription: string;
  mainImage: string | null;
  category: Category;
  isFeatured: boolean;
  viewsCount: number;
  demoClickCount: number;
  technologies: { id: number; name: string; logo: string | null }[];
};

export type ProductsApiResponse = {
  items: CardItem[];
  trending: CardItem[];
  popular: CardItem[];
  technologies: Tech[];
  categories: Category[];
};

import { ProductList } from '@/components/products/interactive/ProductList';
import { apiPath } from '@/lib/apiRoutes';

// --- Sections: Filters | Trending / popular / featured | Interactive card grid → /products/[slug] ---
const PRODUCTS_CACHE_TTL_MS = 60_000;
const productsCache = new Map<string, { ts: number; data: ProductsApiResponse }>();

export default function ProductsListingExperience({
  initialData = null,
}: {
  initialData?: ProductsApiResponse | null;
}) {
  const [data, setData] = useState<ProductsApiResponse | null>(initialData);
  const [loading, setLoading] = useState(initialData == null);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [techIds, setTechIds] = useState<number[]>([]);
  const [debouncedQ, setDebouncedQ] = useState('');

  useEffect(() => {
    if (initialData) {
      productsCache.set('', { ts: Date.now(), data: initialData });
    }
  }, [initialData]);

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedQ(q), 300);
    return () => window.clearTimeout(id);
  }, [q]);

  const fetchList = useCallback(async () => {
    setLoading((prev) => prev || data == null);
    try {
      const params = new URLSearchParams();
      if (debouncedQ.trim()) params.set('q', debouncedQ.trim());
      if (category.trim()) params.set('category', category.trim());
      if (techIds.length) params.set('tech', techIds.join(','));
      const key = params.toString();
      const now = Date.now();
      const hit = productsCache.get(key);
      if (hit && now - hit.ts < PRODUCTS_CACHE_TTL_MS) {
        setData(hit.data);
        setLoading(false);
        return;
      }
      const res = await fetch(`${apiPath('products')}?${key}`);
      if (!res.ok) throw new Error('fetch failed');
      const json = (await res.json()) as ProductsApiResponse;
      productsCache.set(key, { ts: now, data: json });
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [debouncedQ, category, techIds, data]);

  useEffect(() => {
    void fetchList();
  }, [fetchList]);

  const toggleTech = (id: number) => {
    setTechIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const clearFilters = () => {
    setQ('');
    setCategory('');
    setTechIds([]);
  };

  const hasFilters = Boolean(q.trim() || category || techIds.length);

  const items = useMemo(() => data?.items ?? [], [data]);

  const featuredOnPage = useMemo(() => items.filter((p) => p.isFeatured || p.category.slug === 'featured'), [items]);

  return (
    <>
      {/* ==================== FILTERS (SEARCH, CATEGORY, TECH) ==================== */}
      <section className="glass p-6 rounded-2xl mb-8 border border-white/10">
        <div className="flex flex-wrap items-end gap-4 mb-6">
          <label className="min-w-[200px] flex-1">
            <span className="text-fg-muted text-sm block mb-2">Search</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Name or description..."
              className="w-full px-4 py-3 bg-white/15 border border-white/25 rounded-xl text-fg placeholder:text-fg-subtle focus:outline-none focus:border-emerald-400/50"
            />
          </label>
          <label className="min-w-[180px]">
            <span className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-white/70 text-sm">Category</span>
              {category ? (
                <button
                  type="button"
                  onClick={() => setCategory('')}
                  className="text-sm text-red-400 hover:text-red-300 underline underline-offset-2"
                >
                  Clear
                </button>
              ) : null}
            </span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-white/15 border border-white/25 rounded-xl text-fg focus:outline-none focus:border-emerald-400/50"
            >
              <option value="">All types</option>
              {(data?.categories ?? []).map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
          {hasFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm text-red-400 hover:text-red-300 underline underline-offset-2 px-2 py-3"
            >
              Clear all filters
            </button>
          ) : null}
        </div>

        <div>
          <span className="text-fg-muted text-sm block mb-2">Technologies</span>
          <div className="flex flex-wrap gap-2">
            {(data?.technologies ?? []).map((t) => {
              const on = techIds.includes(t.id);
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => toggleTech(t.id)}
                  className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition ${
                    on
                      ? 'border-emerald-400/60 bg-emerald-500/20 text-emerald-950 dark:text-emerald-100'
                      : 'border-white/15 bg-white/5 text-fg-muted hover:border-white/30'
                  }`}
                >
                  {t.techLogo ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={t.techLogo} alt="" className="h-5 w-5 object-contain" />
                  ) : null}
                  {t.techName}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {loading ? (
        <p className="text-white/70 mb-12">Loading products…</p>
      ) : !data ? (
        <p className="text-white/70 mb-12">Could not load products.</p>
      ) : (
        <>
          {/* ==================== TRENDING (NO ACTIVE FILTERS) ==================== */}
          {data.trending.length > 0 && !hasFilters ? (
            <section className="mb-12" aria-labelledby="trending-title">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 id="trending-title" className="text-2xl font-bold text-fg">
                  Trending now
                </h2>
                <span className="text-xs uppercase tracking-widest text-emerald-800 dark:text-emerald-300/90">Analytics-driven</span>
              </div>
              <ProductList
                items={data.trending.slice(0, 3)}
                variant="trending"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-0"
              />
            </section>
          ) : null}

          {/* ==================== MOST POPULAR ==================== */}
          {data.popular.length > 0 && !hasFilters ? (
            <section className="mb-12" aria-labelledby="popular-title">
              <h2 id="popular-title" className="text-2xl font-bold text-fg mb-4">
                Most popular
              </h2>
              <ProductList
                items={data.popular.slice(0, 4)}
                variant="default"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-0"
              />
            </section>
          ) : null}

          {/* ==================== FEATURED ROW ==================== */}
          {featuredOnPage.length > 0 && !hasFilters ? (
            <section className="mb-10" aria-labelledby="featured-title">
              <h2 id="featured-title" className="text-2xl font-bold text-white mb-4">
                Featured
              </h2>
              <ProductList
                items={featuredOnPage}
                variant="featured"
                className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-0"
              />
            </section>
          ) : null}

          {/* ==================== ALL / FILTERED PRODUCT GRID ==================== */}
          <section aria-labelledby="all-title">
            <h2 id="all-title" className="text-2xl font-bold text-fg mb-4">
              {hasFilters ? 'Matching products' : 'All products'}
            </h2>
            {items.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center text-fg-muted">No products match your filters.</div>
            ) : (
              <ProductList items={items} variant="default" />
            )}
          </section>
        </>
      )}
    </>
  );
}
