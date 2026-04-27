import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeNewsContentHtml } from '@/lib/news/sanitizeNewsContentHtml';
import { NEWS_CATEGORIES } from '@/lib/news/newsCategories';
import { parseLocaleQuery, pickLocalized } from '@/lib/i18nContent';

type ListItem = {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  publishedAt: string | null;
  authorName: string;
  thumbnailSrc: string | null;
  thumbnailAlt: string | null;
  contentPreviewHtml: string;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = parseLocaleQuery(searchParams);
  const q = String(searchParams.get('q') ?? '').trim();
  const allowedCats = new Set<string>(NEWS_CATEGORIES as readonly string[]);
  const categoryRaw = String(searchParams.get('category') ?? '').trim();
  const category = categoryRaw && allowedCats.has(categoryRaw) ? categoryRaw : '';
  const from = String(searchParams.get('from') ?? '').trim();
  const to = String(searchParams.get('to') ?? '').trim();
  const limit = Math.min(Math.max(Number(searchParams.get('limit') ?? 20) || 20, 1), 100);

  const fromDate = from ? new Date(from) : null;
  const toDate = to ? new Date(to) : null;
  const now = new Date();

  const candidates = await prisma.news.findMany({
    where: { status: 'Active' },
    orderBy: { publishedAt: 'desc' },
    take: limit * 10,
    include: { author: { select: { displayName: true } }, image: { select: { url: true, filename: true } } },
  });

  const items = candidates
    .map((n) => {
      const effectiveDate = n.publishedAt ?? n.startDate ?? n.createdAt;
      const includeByPublishWindow = n.publishedAt != null ? effectiveDate <= now : n.startDate != null ? effectiveDate <= now : true;
      const title = pickLocalized(n.title, n.titleVi, locale);
      const description = pickLocalized(n.description, n.descriptionVi, locale);
      const contentForPreview = pickLocalized(n.content, n.contentVi, locale);
      const item: ListItem = {
        id: n.id,
        title,
        slug: n.slug,
        description,
        category: n.category,
        publishedAt: effectiveDate ? effectiveDate.toISOString() : null,
        authorName: n.author?.displayName ?? '',
        thumbnailSrc: n.image?.url ?? null,
        thumbnailAlt: n.image?.filename ?? null,
        contentPreviewHtml: sanitizeNewsContentHtml(contentForPreview).slice(0, 2000),
      };
      return { item, effectiveDate, includeByPublishWindow, raw: n };
    })
    .filter((x) => x.includeByPublishWindow)
    .filter((x) => {
      if (fromDate && x.effectiveDate < fromDate) return false;
      if (toDate && x.effectiveDate > toDate) return false;
      if (q) {
        const qq = q.toLowerCase();
        const n = x.raw;
        const titleMatch =
          n.title.toLowerCase().includes(qq) ||
          (n.titleVi ?? '').toLowerCase().includes(qq);
        const descMatch =
          n.description.toLowerCase().includes(qq) ||
          (n.descriptionVi ?? '').toLowerCase().includes(qq);
        if (!titleMatch && !descMatch) return false;
      }
      if (category && x.item.category !== category) return false;
      return true;
    })
    .slice(0, limit)
    .map((x) => x.item);

  return NextResponse.json({ items });
}
