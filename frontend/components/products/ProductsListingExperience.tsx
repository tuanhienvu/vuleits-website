'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

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
      {/* Filters */}
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
          {/* Trending highlight */}
          {data.trending.length > 0 && !hasFilters ? (
            <section className="mb-12" aria-labelledby="trending-title">
              <div className="flex items-center justify-between gap-4 mb-4">
                <h2 id="trending-title" className="text-2xl font-bold text-white">
                  Trending now
                </h2>
                <span className="text-xs uppercase tracking-widest text-emerald-300/90">Analytics-driven</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.trending.slice(0, 3).map((p) => (
                  <ProductCard key={p.id} product={p} variant="trending" />
                ))}
              </div>
            </section>
          ) : null}

          {/* Most popular */}
          {data.popular.length > 0 && !hasFilters ? (
            <section className="mb-12" aria-labelledby="popular-title">
              <h2 id="popular-title" className="text-2xl font-bold text-white mb-4">
                Most popular
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {data.popular.slice(0, 4).map((p) => (
                  <ProductCard key={`pop-${p.id}`} product={p} variant="compact" />
                ))}
              </div>
            </section>
          ) : null}

          {featuredOnPage.length > 0 && !hasFilters ? (
            <section className="mb-10" aria-labelledby="featured-title">
              <h2 id="featured-title" className="text-2xl font-bold text-white mb-4">
                Featured
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {featuredOnPage.map((p) => (
                  <ProductCard key={`feat-${p.id}`} product={p} variant="featured" />
                ))}
              </div>
            </section>
          ) : null}

          <section aria-labelledby="all-title">
            <h2 id="all-title" className="text-2xl font-bold text-white mb-4">
              {hasFilters ? 'Matching products' : 'All products'}
            </h2>
            {items.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center text-white/70">No products match your filters.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} variant="default" />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}

function ProductCard({
  product,
  variant,
}: {
  product: CardItem;
  variant: 'default' | 'featured' | 'trending' | 'compact';
}) {
  const isFeatured = variant === 'featured';
  const isTrending = variant === 'trending';
  const href = `/products/${encodeURIComponent(product.slug)}`;
  const techList = Array.isArray(product.technologies) ? product.technologies : [];

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition duration-300 ${
        isFeatured
          ? 'border-emerald-400/40 bg-linear-to-br from-white/8 to-emerald-500/10 shadow-[0_0_40px_-10px_rgba(52,211,153,0.45)] md:min-h-[320px]'
          : isTrending
            ? 'border-amber-400/30 bg-white/5 hover:border-amber-400/50'
            : 'border-white/10 bg-white/5 hover:border-white/25'
      } hover:-translate-y-1 hover:shadow-xl`}
    >
      <Link href={href} className="block">
        <div className={`relative overflow-hidden ${isFeatured ? 'h-56 md:h-64' : 'h-44'}`}>
          {product.mainImage ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={product.mainImage}
              alt=""
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-white/5 text-5xl">📦</div>
          )}
          <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-80" />
          <span className="absolute left-3 top-3 rounded-full bg-black/45 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-white/90 backdrop-blur-sm">
            {product.category.name}
          </span>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <Link href={href} className="block">
          <h3 className={`font-semibold text-white ${isFeatured ? 'text-xl md:text-2xl' : 'text-lg'}`}>{product.productName}</h3>
        </Link>
        <p className={`mt-2 text-white/70 ${variant === 'compact' ? 'line-clamp-2 text-sm' : 'line-clamp-3 text-sm'}`}>
          {product.shortDescription}
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {techList.slice(0, 4).map((t) => (
            <span key={t.id} className="rounded-md bg-white/10 px-2 py-0.5 text-[11px] text-white/75" title={t.name}>
              {t.name}
            </span>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs text-white/45">
            {product.viewsCount} views · {product.demoClickCount} demos
          </span>
          <Link
            href={href}
            className="inline-flex rounded-lg bg-emerald-500/90 px-4 py-2 text-sm font-medium text-emerald-950 opacity-0 transition group-hover:opacity-100"
          >
            View details
          </Link>
        </div>

        <div className="mt-3 flex gap-2 opacity-0 transition duration-300 group-hover:opacity-100">
          <Link
            href={`${href}#demo`}
            className="flex-1 text-center text-sm py-2 rounded-lg bg-white/15 text-white hover:bg-white/25 border border-white/20"
          >
            Demo
          </Link>
          <Link
            href={`${href}#landing`}
            className="flex-1 text-center text-sm py-2 rounded-lg bg-white/10 text-white/90 hover:bg-white/20 border border-white/15"
          >
            Landing
          </Link>
        </div>
      </div>
    </article>
  );
}
