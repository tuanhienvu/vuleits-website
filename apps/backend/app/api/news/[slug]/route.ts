import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sanitizeNewsContentHtml } from '@/lib/news/sanitizeNewsContentHtml';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
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

  return NextResponse.json({
    article: {
      id: article.id,
      title: article.title,
      slug: article.slug,
      description: article.description,
      category: article.category,
      publishedAt: effectiveDate.toISOString(),
      authorName: article.author?.displayName ?? '',
      thumbnailSrc: article.image?.url ?? null,
      thumbnailAlt: article.image?.filename ?? null,
      contentHtml: sanitizeNewsContentHtml(article.content),
      seoTitle: article.seoTitle ?? null,
      seoDescription: article.seoDescription ?? null,
      seoKeywords: article.seoKeywords ?? null,
    },
    related: relatedCandidates
      .filter((x) => x.id !== article.id)
      .slice(0, 4)
      .map((x) => ({
        id: x.id,
        title: x.title,
        slug: x.slug,
        description: x.description,
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
        { label: article.title },
      ],
    },
  });
}
