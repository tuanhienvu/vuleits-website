import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeNewsContentHtml } from '@/lib/news/sanitizeNewsContentHtml';
import { parseLocaleQuery, pickLocalized } from '@/lib/i18nContent';

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const locale = parseLocaleQuery(new URL(req.url).searchParams);
  const { slug } = await params;
  const article = await prisma.news.findUnique({
    where: { slug },
    include: { author: { select: { displayName: true } }, image: { select: { url: true, filename: true } } },
  });
  if (!article || article.status !== 'Active') return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const effectiveDate = article.publishedAt ?? article.startDate ?? article.createdAt;
  const now = new Date();
  if ((article.publishedAt && effectiveDate > now) || (!article.publishedAt && article.startDate && effectiveDate > now)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const relatedCandidates = await prisma.news.findMany({
    where: { status: 'Active', category: article.category },
    orderBy: { publishedAt: 'desc' },
    take: 12,
    include: { author: { select: { displayName: true } }, image: { select: { url: true, filename: true } } },
  });

  const articleTitle = pickLocalized(article.title, article.titleVi, locale);
  const articleDescription = pickLocalized(article.description, article.descriptionVi, locale);
  const articleContent = pickLocalized(article.content, article.contentVi, locale);

  return NextResponse.json({
    article: {
      id: article.id,
      title: articleTitle,
      slug: article.slug,
      description: articleDescription,
      category: article.category,
      publishedAt: effectiveDate.toISOString(),
      authorName: article.author?.displayName ?? '',
      thumbnailSrc: article.image?.url ?? null,
      thumbnailAlt: article.image?.filename ?? null,
      contentHtml: sanitizeNewsContentHtml(articleContent),
      seoTitle: article.seoTitle ?? null,
      seoDescription: article.seoDescription ?? null,
      seoKeywords: article.seoKeywords ?? null,
    },
    related: relatedCandidates
      .filter((x) => x.id !== article.id)
      .slice(0, 4)
      .map((x) => ({
        id: x.id,
        title: pickLocalized(x.title, x.titleVi, locale),
        slug: x.slug,
        description: pickLocalized(x.description, x.descriptionVi, locale),
        category: x.category,
        publishedAt: (x.publishedAt ?? x.startDate ?? x.createdAt).toISOString(),
        authorName: x.author?.displayName ?? '',
        thumbnailSrc: x.image?.url ?? null,
        thumbnailAlt: x.image?.filename ?? null,
      })),
    breadcrumbs: {
      items: [
        { label: 'Home', href: '/' },
        { label: 'News', href: '/news' },
        { label: article.category, href: `/news?category=${encodeURIComponent(article.category)}` },
        { label: articleTitle },
      ],
    },
  });
}
