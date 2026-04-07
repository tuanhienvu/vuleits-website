import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { slugify } from '@/lib/news/slugify';

type NewsAdminListWhere = {
  OR?: Array<{ title: { contains: string } } | { description: { contains: string } }>;
  category?: string;
  status?: string;
};

export async function GET(req: Request) {
  const auth = await authorize(req, 'news.read');
  if (auth.error) return auth.error;

  const { searchParams } = new URL(req.url);
  const q = String(searchParams.get('q') ?? '').trim();
  const category = String(searchParams.get('category') ?? '').trim();
  const status = String(searchParams.get('status') ?? '').trim();
  const take = Math.min(Math.max(Number(searchParams.get('take') ?? 20) || 20, 1), 100);
  const skip = Math.max(Number(searchParams.get('skip') ?? 0) || 0, 0);

  const where: NewsAdminListWhere = {};
  if (q) where.OR = [{ title: { contains: q } }, { description: { contains: q } }];
  if (category) where.category = category;
  if (status) where.status = status;

  const total = await prisma.news.count({ where });
  const rows = await prisma.news.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    skip,
    take,
    include: { author: { select: { displayName: true } }, image: { select: { id: true, url: true, filename: true } } },
  });

  return NextResponse.json({
    items: rows.map((n: (typeof rows)[number]) => ({
      id: n.id,
      title: n.title,
      slug: n.slug,
      description: n.description,
      content: n.content,
      category: n.category,
      tags: n.tags,
      status: n.status,
      startDate: n.startDate ? n.startDate.toISOString() : null,
      endDate: n.endDate ? n.endDate.toISOString() : null,
      publishedAt: n.publishedAt ? n.publishedAt.toISOString() : null,
      seoTitle: n.seoTitle,
      seoDescription: n.seoDescription,
      seoKeywords: n.seoKeywords,
      authorName: n.author?.displayName ?? '',
      image: n.image ? { id: n.image.id, url: n.image.url, filename: n.image.filename } : null,
      imageId: n.imageId,
      authorId: n.authorId,
    })),
    total,
  });
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'news.create');
  if (auth.error) return auth.error;
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const o = body as Record<string, unknown>;
  const title = typeof o.title === 'string' ? o.title.trim() : '';
  const description = typeof o.description === 'string' ? o.description.trim() : '';
  const content = typeof o.content === 'string' ? o.content.trim() : '';
  const category = typeof o.category === 'string' && o.category.trim() ? o.category.trim() : 'General';
  const status = typeof o.status === 'string' && o.status.trim() ? o.status.trim() : 'Active';
  if (!title || !description || !content) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

  const slugRaw = typeof o.slug === 'string' ? o.slug.trim() : '';
  let slug = slugRaw ? slugify(slugRaw) : slugify(title);
  const existing = await prisma.news.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const imageIdRaw = o.imageId;
  const imageId = imageIdRaw == null ? null : typeof imageIdRaw === 'number' ? imageIdRaw : typeof imageIdRaw === 'string' && imageIdRaw.trim() ? Number(imageIdRaw) : null;
  const tags = (() => {
    const t = o.tags;
    if (t == null) return null;
    if (Array.isArray(t)) return JSON.stringify(t.map((x: unknown) => String(x)));
    if (typeof t === 'string') {
      const s = t.trim();
      if (!s) return null;
      return s.startsWith('[') ? s : JSON.stringify(s.split(',').map((x) => x.trim()).filter(Boolean));
    }
    return JSON.stringify(t);
  })();
  const publishedAtRaw = o.publishedAt;
  const startDateRaw = o.startDate;
  const endDateRaw = o.endDate;
  const publishedAt = typeof publishedAtRaw === 'string' && publishedAtRaw.trim() ? new Date(publishedAtRaw) : null;
  const startDate = typeof startDateRaw === 'string' && startDateRaw.trim() ? new Date(startDateRaw) : null;
  const endDate = typeof endDateRaw === 'string' && endDateRaw.trim() ? new Date(endDateRaw) : null;

  const created = await prisma.news.create({
    data: {
      title,
      slug,
      description,
      content,
      category,
      imageId: imageId != null && Number.isFinite(Number(imageId)) ? Number(imageId) : null,
      tags,
      status,
      publishedAt: publishedAt && !Number.isNaN(publishedAt.getTime()) ? publishedAt : null,
      startDate: startDate && !Number.isNaN(startDate.getTime()) ? startDate : null,
      endDate: endDate && !Number.isNaN(endDate.getTime()) ? endDate : null,
      seoTitle: typeof o.seoTitle === 'string' ? o.seoTitle : null,
      seoDescription: typeof o.seoDescription === 'string' ? o.seoDescription : null,
      seoKeywords: typeof o.seoKeywords === 'string' ? o.seoKeywords : null,
      authorId: auth.user.id,
    },
  });
  return NextResponse.json({ ok: true, news: created });
}
