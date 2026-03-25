import { prisma } from '@/lib/prisma';
import { sanitizeNewsContentHtml } from '@/lib/news/sanitizeNewsContentHtml';
import { NEWS_CATEGORIES } from '@/lib/news/newsCategories';
import NewsCarouselRow from '@/components/news/NewsCarouselRow';

const PRIMARY_CATEGORIES = ['Politics', 'Economy', 'Technology', 'Entertainment'] as const;

export const metadata = {
  title: 'News - VULE ITS',
  description: 'Latest news and updates',
};

type PageProps = {
  searchParams: Record<string, string | string[] | undefined>;
};

function toDateMaybe(v: string | undefined) {
  const s = (v ?? '').trim();
  if (!s) return null;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

export default async function NewsListPage({ searchParams }: PageProps) {
  const q = String(searchParams.q ?? '').trim();
  const category = String(searchParams.category ?? '').trim();
  const fromDate = toDateMaybe(String(searchParams.from ?? '').trim());
  const toDate = toDateMaybe(String(searchParams.to ?? '').trim());

  const now = new Date();

  const candidates = await prisma.news.findMany({
    where: { status: 'Active' },
    orderBy: { publishedAt: 'desc' },
    take: 200,
    include: { author: { select: { displayName: true } }, image: { select: { url: true, filename: true } } },
  });

  const items = candidates
    .map((n) => {
      const effectiveDate = n.publishedAt ?? n.startDate ?? n.createdAt;
      const isPublished =
        n.publishedAt != null ? effectiveDate <= now : n.startDate != null ? effectiveDate <= now : true;

      return {
        id: n.id,
        title: n.title,
        slug: n.slug,
        description: n.description,
        category: n.category,
        publishedAt: effectiveDate,
        authorName: n.author?.displayName ?? '',
        thumbnailSrc: n.image?.url ?? null,
        thumbnailAlt: n.image?.filename ?? null,
        contentPreviewHtml: sanitizeNewsContentHtml(n.content).slice(0, 600),
        isPublished,
      };
    })
    .filter((x) => x.isPublished)
    .filter((x) => {
      if (fromDate && x.publishedAt < fromDate) return false;
      if (toDate && x.publishedAt > toDate) return false;

      if (q) {
        const qq = q.toLowerCase();
        if (!x.title.toLowerCase().includes(qq) && !x.description.toLowerCase().includes(qq)) return false;
      }

      if (category) {
        if (x.category !== category) return false;
      }
      return true;
    });

  const byCategory: Record<string, typeof items> = {};
  for (const c of PRIMARY_CATEGORIES) byCategory[c] = [];
  byCategory.Other = [];

  for (const item of items) {
    const primary = PRIMARY_CATEGORIES.find((c) => item.category === c);
    if (primary) byCategory[primary].push(item);
    else byCategory.Other.push(item);
  }

  const allCategories = NEWS_CATEGORIES.filter((c) => c !== 'Other');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a]">
      <div className="container mx-auto px-4 py-8">
        <section className="glass p-8 md:p-12 rounded-3xl mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">Latest News</h1>
          <p className="text-white/80 text-lg">Search, filter, and read full articles.</p>
        </section>

        <section className="glass p-6 rounded-2xl mb-8">
          <form method="get" className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <label>
              <span className="text-white/70 text-sm block mb-2">Keyword</span>
              <input
                name="q"
                defaultValue={q}
                placeholder="Search by keyword..."
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              />
            </label>

            <label>
              <span className="text-white/70 text-sm block mb-2">Category</span>
              <select
                name="category"
                defaultValue={category}
                className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white focus:outline-none focus:border-white/50"
              >
                <option value="">All</option>
                {allCategories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span className="text-white/70 text-sm block mb-2">From</span>
              <input type="date" name="from" defaultValue={String(searchParams.from ?? '')} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white" />
            </label>

            <label>
              <span className="text-white/70 text-sm block mb-2">To</span>
              <input type="date" name="to" defaultValue={String(searchParams.to ?? '')} className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white" />
            </label>

            <div className="md:col-span-4 flex justify-end">
              <button type="submit" className="cta-button px-6 py-2">
                Search
              </button>
            </div>
          </form>
        </section>

        {PRIMARY_CATEGORIES.map((c) => (
          <section key={c} className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-4">{c}</h2>
            {byCategory[c].length ? (
              <NewsCarouselRow
                items={byCategory[c].map((a) => ({
                  id: a.id,
                  slug: a.slug,
                  title: a.title,
                  description: a.description,
                  authorName: a.authorName,
                  publishedAt: a.publishedAt,
                  thumbnailSrc: a.thumbnailSrc,
                  thumbnailAlt: a.thumbnailAlt,
                }))}
              />
            ) : (
              <div className="glass p-6 rounded-2xl text-white/70">No articles found.</div>
            )}
          </section>
        ))}

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-4">Other</h2>
          {byCategory.Other.length ? (
            <NewsCarouselRow
              items={byCategory.Other.map((a) => ({
                id: a.id,
                slug: a.slug,
                title: a.title,
                description: a.description,
                authorName: a.authorName,
                publishedAt: a.publishedAt,
                thumbnailSrc: a.thumbnailSrc,
                thumbnailAlt: a.thumbnailAlt,
              }))}
            />
          ) : (
            <div className="glass p-6 rounded-2xl text-white/70">No articles found.</div>
          )}
        </section>
      </div>
    </div>
  );
}

