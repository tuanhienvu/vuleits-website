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

type ApiResponse = {
  items: CardItem[];
  trending: CardItem[];
  popular: CardItem[];
  technologies: Tech[];
  categories: Category[];
};

import { ProductList } from '@/components/products/interactive/ProductList';

// --- Sections: Filters | Trending / popular / featured | Interactive card grid → /products/[slug] ---

export default function ProductsListingExperience() {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');
  const [techIds, setTechIds] = useState<number[]>([]);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set('q', q.trim());
      if (category.trim()) params.set('category', category.trim());
      if (techIds.length) params.set('tech', techIds.join(','));
      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error('fetch failed');
      const json = (await res.json()) as ApiResponse;
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [q, category, techIds]);

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
            <span className="text-white/70 text-sm block mb-2">Search</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Name or description..."
              className="w-full px-4 py-3 bg-white/15 border border-white/25 rounded-xl text-white placeholder-white/45 focus:outline-none focus:border-emerald-400/50"
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
              className="w-full px-4 py-3 bg-white/15 border border-white/25 rounded-xl text-white focus:outline-none focus:border-emerald-400/50"
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
          <span className="text-white/70 text-sm block mb-2">Technologies</span>
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
                      ? 'border-emerald-400/60 bg-emerald-500/20 text-emerald-100'
                      : 'border-white/15 bg-white/5 text-white/80 hover:border-white/30'
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
                <h2 id="trending-title" className="text-2xl font-bold text-white">
                  Trending now
                </h2>
                <span className="text-xs uppercase tracking-widest text-emerald-300/90">Analytics-driven</span>
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
              <h2 id="popular-title" className="text-2xl font-bold text-white mb-4">
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
            <h2 id="all-title" className="text-2xl font-bold text-white mb-4">
              {hasFilters ? 'Matching products' : 'All products'}
            </h2>
            {items.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center text-white/70">No products match your filters.</div>
            ) : (
              <ProductList items={items} variant="default" />
            )}
          </section>
        </>
      )}
    </>
  );
}
