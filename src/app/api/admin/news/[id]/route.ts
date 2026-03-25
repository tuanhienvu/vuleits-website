import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { slugify } from '@/lib/news/slugify';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'news.read');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const n = await prisma.news.findUnique({
    where: { id },
    include: { author: { select: { displayName: true } }, image: { select: { id: true, url: true, filename: true } } },
  });

  if (!n) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    id: n.id,
    title: n.title,
    slug: n.slug,
    description: n.description,
    content: n.content,
    category: n.category,
    tags: n.tags,
    status: n.status,
    startDate: n.startDate,
    endDate: n.endDate,
    publishedAt: n.publishedAt,
    seoTitle: n.seoTitle,
    seoDescription: n.seoDescription,
    seoKeywords: n.seoKeywords,
    authorName: n.author?.displayName ?? '',
    image: n.image ? { id: n.image.id, url: n.image.url, filename: n.image.filename } : null,
    imageId: n.imageId,
    authorId: n.authorId,
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'news.update');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const current = await prisma.news.findUnique({ where: { id } });
  if (!current) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const o = body as Record<string, unknown>;
  const title = (typeof o.title === 'string' ? o.title : current.title).trim();
  const description = (typeof o.description === 'string' ? o.description : current.description).trim();
  const content = (typeof o.content === 'string' ? o.content : current.content).trim();
  const category =
    (typeof o.category === 'string' && o.category.trim() ? o.category : current.category).trim() || 'General';
  const status = typeof o.status === 'string' && o.status.trim() ? o.status.trim() : current.status;

  if (!title || !description || !content) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  let slug = typeof o.slug === 'string' ? o.slug.trim() : current.slug;
  slug = slug ? slugify(slug) : slugify(title);

  if (slug !== current.slug) {
    const existing = await prisma.news.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;
  }

  const imageIdRaw = o.imageId;
  const imageId =
    imageIdRaw == null
      ? null
      : typeof imageIdRaw === 'number'
        ? imageIdRaw
        : typeof imageIdRaw === 'string' && imageIdRaw.trim()
          ? Number(imageIdRaw)
          : null;

  const tags = (() => {
    const t = o.tags;
    if (t === undefined) return current.tags;
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

  const publishedAt =
    typeof publishedAtRaw === 'string' && publishedAtRaw.trim() ? new Date(publishedAtRaw) : null;
  const startDate = typeof startDateRaw === 'string' && startDateRaw.trim() ? new Date(startDateRaw) : null;
  const endDate = typeof endDateRaw === 'string' && endDateRaw.trim() ? new Date(endDateRaw) : null;

  const updated = await prisma.news.update({
    where: { id },
    data: {
      title,
      slug,
      description,
      content,
      category,
      imageId,
      tags,
      status,
      publishedAt: publishedAt && !Number.isNaN(publishedAt.getTime()) ? publishedAt : null,
      startDate: startDate && !Number.isNaN(startDate.getTime()) ? startDate : null,
      endDate: endDate && !Number.isNaN(endDate.getTime()) ? endDate : null,
      seoTitle: typeof o.seoTitle === 'string' ? o.seoTitle : null,
      seoDescription: typeof o.seoDescription === 'string' ? o.seoDescription : null,
      seoKeywords: typeof o.seoKeywords === 'string' ? o.seoKeywords : null,
      // Keep current authorId (edit by admin doesn't reassign author by default)
    },
  });

  return NextResponse.json({ ok: true, news: updated });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'news.delete');
  if (auth.error) return auth.error;

  const { id: idParam } = await params;
  const id = Number(idParam);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  await prisma.news.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

