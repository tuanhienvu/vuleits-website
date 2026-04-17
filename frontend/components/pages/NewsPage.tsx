'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { NEWS_CATEGORIES } from '@/lib/news/newsCategories';
import NewsCarouselRow from '@/components/news/NewsCarouselRow';
import { apiPath } from '@/lib/apiRoutes';

interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  publishedAt: string;
  authorName: string;
  thumbnailSrc: string | null;
  thumbnailAlt: string | null;
}

// --- Sections: Data + filters | Hero | Search/filters | List + carousel rows (see JSX) ---
const NEWS_CACHE_TTL_MS = 60_000;
const newsCache = new Map<string, { ts: number; items: NewsArticle[] }>();

export default function NewsPage({ initialArticles = [] }: { initialArticles?: NewsArticle[] }) {
  const [articles, setArticles] = useState<NewsArticle[]>(initialArticles);
  const [loading, setLoading] = useState(initialArticles.length === 0);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    if (initialArticles.length > 0) {
      newsCache.set('limit=100', { ts: Date.now(), items: initialArticles });
    }
  }, [initialArticles]);

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedSearch(search), 300);
    return () => window.clearTimeout(id);
  }, [search]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading((prev) => prev || articles.length === 0);
      try {
        const params = new URLSearchParams();
        if (debouncedSearch.trim()) params.set('q', debouncedSearch.trim());
        if (category.trim()) params.set('category', category.trim());
        if (fromDate.trim()) params.set('from', fromDate.trim());
        if (toDate.trim()) params.set('to', toDate.trim());
        // Fetch enough rows so each category section can exceed 3 cards
        // (required for the carousel + auto-slide).
        params.set('limit', '100');
        const key = params.toString();
        const now = Date.now();
        const hit = newsCache.get(key);
        if (hit && now - hit.ts < NEWS_CACHE_TTL_MS) {
          if (!cancelled) {
            setArticles(hit.items);
            setLoading(false);
          }
          return;
        }

        const res = await fetch(`${apiPath('news')}?${key}`);
        if (!res.ok) return;
        const data = (await res.json()) as { items?: NewsArticle[] };
        const nextItems = Array.isArray(data.items) ? data.items : [];
        newsCache.set(key, { ts: now, items: nextItems });
        if (!cancelled) setArticles(nextItems);
      } catch {
        if (!cancelled) setArticles([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [debouncedSearch, category, fromDate, toDate, articles.length]);

  const byCategory = useMemo(() => {
    const primary = ['Politics', 'Economy', 'Technology', 'Entertainment'] as const;
    const primarySet = new Set<string>(primary as unknown as string[]);
    const out: Record<string, NewsArticle[]> = {
      Politics: [],
      Economy: [],
      Technology: [],
      Entertainment: [],
      Other: [],
    };

    for (const a of articles) {
      if (primarySet.has(a.category)) out[a.category]?.push(a);
      else out.Other.push(a);
    }
    return out;
  }, [articles]);

  const categories = NEWS_CATEGORIES.filter((c) => c !== 'Other');
  const primaryCategories = ['Politics', 'Economy', 'Technology', 'Entertainment'] as const;

  const categoryFilter = category.trim();
  const showAllCategories = !categoryFilter;

  const clearCategoryFilter = useCallback(() => {
    setCategory('');
  }, []);

  const mapToCarouselItems = (list: NewsArticle[]) =>
    list.map((a) => ({
      id: a.id,
      slug: a.slug,
      title: a.title,
      description: a.description,
      authorName: a.authorName,
      publishedAt: a.publishedAt,
      thumbnailSrc: a.thumbnailSrc,
      thumbnailAlt: a.thumbnailAlt,
    }));

  return (
    <div className="container mx-auto px-4">
      {/* ==================== HERO SECTION ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-fg mb-4">Latest News & Updates</h1>
        <p className="text-fg-muted text-lg">Stay informed with our latest articles and announcements</p>
      </section>

      {/* ==================== SEARCH & FILTER AREA ==================== */}
      <section className="glass p-6 rounded-2xl mb-8" aria-labelledby="news-search-heading">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <label>
            <span className="text-fg-muted text-sm block mb-2">Keyword</span>
            <input
              type="text"
              placeholder="Search by keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-fg placeholder:text-fg-subtle focus:outline-none focus:border-white/50"
            />
          </label>

          <div className="grid grid-cols-3 gap-2 md:contents">
            <label className="min-w-0">
              <span className="flex items-center justify-between gap-1 mb-2">
                <span className="text-fg-muted text-sm">Category</span>
                {categoryFilter ? (
                  <button
                    type="button"
                    onClick={clearCategoryFilter}
                    className="text-[11px] text-red-400 hover:text-red-300 underline underline-offset-2 whitespace-nowrap"
                  >
                    Clear
                  </button>
                ) : null}
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-2 py-3 md:px-4 bg-white/20 border border-white/30 rounded-lg text-fg focus:outline-none focus:border-white/50"
              >
                <option value="">All</option>
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="min-w-0">
              <span className="text-fg-muted text-sm block mb-2">From</span>
              <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} className="w-full px-2 py-3 md:px-4 bg-white/20 border border-white/30 rounded-lg text-fg" />
            </label>

            <label className="min-w-0">
              <span className="text-fg-muted text-sm block mb-2">To</span>
              <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} className="w-full px-2 py-3 md:px-4 bg-white/20 border border-white/30 rounded-lg text-fg" />
            </label>
          </div>
        </div>
      </section>

      {/* ==================== ARTICLES LIST SECTION ==================== */}
      {loading ? (
        <div className="text-fg-muted mb-12">Loading news...</div>
      ) : showAllCategories ? (
        <section className="space-y-10 mb-12" aria-label="Articles list">
          {primaryCategories.map((cat, idx) => (
            <div key={`${cat}-row`} className="news-category-row">
              <h2 className="text-2xl font-bold text-fg mb-4">{cat}</h2>
              {byCategory[cat].length ? (
                <NewsCarouselRow autoStartDelayMs={idx * 750} items={mapToCarouselItems(byCategory[cat])} />
              ) : (
                <div className="glass p-6 rounded-2xl text-fg-muted">No articles found.</div>
              )}
            </div>
          ))}

          <div>
            <h2 className="text-2xl font-bold text-fg mb-4">Other</h2>
            {byCategory.Other.length ? (
              <NewsCarouselRow
                autoStartDelayMs={primaryCategories.length * 750}
                items={mapToCarouselItems(byCategory.Other)}
              />
            ) : (
              <div className="glass p-6 rounded-2xl text-fg-muted">No articles found.</div>
            )}
          </div>
        </section>
      ) : (
        <section className="space-y-10 mb-12" aria-label="Filtered articles">
          <div className="news-category-row">
            <h2 className="text-2xl font-bold text-fg mb-4">{categoryFilter}</h2>
            {articles.length ? (
              <NewsCarouselRow autoStartDelayMs={0} items={mapToCarouselItems(articles)} />
            ) : (
              <div className="glass p-6 rounded-2xl text-fg-muted">No articles found.</div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
