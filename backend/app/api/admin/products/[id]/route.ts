import { NextRequest, NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { asStringArray } from '@/lib/products/jsonArrays';

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 190);
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'products.read');
  if (auth.error) return auth.error;

  const { id: raw } = await params;
  const id = Number(raw);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const p = await prisma.product.findUnique({
    where: { id },
    include: {
      category: { select: { id: true, name: true, slug: true } },
      technologies: { include: { technology: { select: { id: true, techName: true } } } },
    },
  });
  if (!p) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  return NextResponse.json({
    id: p.id,
    productName: p.productName,
    slug: p.slug,
    shortDescription: p.shortDescription,
    fullDescription: p.fullDescription,
    imageUrls: asStringArray(p.imageUrls as unknown),
    videoUrls: asStringArray(p.videoUrls as unknown),
    demoLink: p.demoLink,
    landingPageLink: p.landingPageLink,
    embedDemoUrl: p.embedDemoUrl,
    categoryId: p.categoryId,
    category: p.category,
    viewsCount: p.viewsCount,
    demoClickCount: p.demoClickCount,
    isFeatured: p.isFeatured,
    status: p.status,
    authorId: p.authorId,
    seoTitle: p.seoTitle,
    seoDescription: p.seoDescription,
    seoKeywords: p.seoKeywords,
    technologyIds: p.technologies.map((t) => t.technologyId),
    updatedAt: p.updatedAt.toISOString(),
  });
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'products.update');
  if (auth.error) return auth.error;

  const { id: raw } = await params;
  const id = Number(raw);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;

  const data: Prisma.ProductUpdateInput = {};

  if (typeof body.productName === 'string') data.productName = body.productName.trim();
  if (typeof body.shortDescription === 'string') data.shortDescription = body.shortDescription.trim();
  if (typeof body.fullDescription === 'string') data.fullDescription = body.fullDescription.trim();
  if (typeof body.slug === 'string' && body.slug.trim()) {
    const s = slugify(body.slug);
    if (s) {
      const clash = await prisma.product.findFirst({ where: { slug: s, NOT: { id } } });
      data.slug = clash ? `${s}-${id}` : s;
    }
  }
  if (typeof body.categoryId === 'number' || (typeof body.categoryId === 'string' && body.categoryId.trim())) {
    const cid = Number(body.categoryId);
    if (Number.isFinite(cid)) {
      const cat = await prisma.productCategory.findUnique({ where: { id: cid } });
      if (!cat) return NextResponse.json({ error: 'Invalid category' }, { status: 400 });
      data.category = { connect: { id: cid } };
    }
  }
  if (Array.isArray(body.imageUrls))
    data.imageUrls = body.imageUrls.filter((x): x is string => typeof x === 'string') as Prisma.InputJsonValue;
  if (Array.isArray(body.videoUrls))
    data.videoUrls = body.videoUrls.filter((x): x is string => typeof x === 'string') as Prisma.InputJsonValue;
  if (body.demoLink !== undefined) data.demoLink = body.demoLink == null || body.demoLink === '' ? null : String(body.demoLink).trim();
  if (body.landingPageLink !== undefined)
    data.landingPageLink = body.landingPageLink == null || body.landingPageLink === '' ? null : String(body.landingPageLink).trim();
  if (body.embedDemoUrl !== undefined)
    data.embedDemoUrl = body.embedDemoUrl == null || body.embedDemoUrl === '' ? null : String(body.embedDemoUrl).trim();
  if (typeof body.isFeatured === 'boolean') data.isFeatured = body.isFeatured;
  if (typeof body.status === 'string' && body.status.trim()) data.status = body.status.trim();
  if (body.seoTitle !== undefined) data.seoTitle = body.seoTitle == null ? null : String(body.seoTitle).trim().slice(0, 200) || null;
  if (body.seoDescription !== undefined)
    data.seoDescription = body.seoDescription == null ? null : String(body.seoDescription).trim().slice(0, 500) || null;
  if (body.seoKeywords !== undefined)
    data.seoKeywords = body.seoKeywords == null ? null : String(body.seoKeywords).trim().slice(0, 500) || null;

  const techIds =
    body.technologyIds !== undefined && Array.isArray(body.technologyIds)
      ? [...new Set(body.technologyIds.map((x) => Number(x)).filter((n) => Number.isFinite(n) && n > 0))]
      : null;

  await prisma.$transaction(async (tx) => {
    await tx.product.update({ where: { id }, data });
    if (techIds !== null) {
      await tx.productTechnology.deleteMany({ where: { productId: id } });
      if (techIds.length) {
        await tx.productTechnology.createMany({
          data: techIds.map((technologyId) => ({ productId: id, technologyId })),
          skipDuplicates: true,
        });
      }
    }
  });

  const p = await prisma.product.findUnique({
    where: { id },
    include: { category: true, technologies: { include: { technology: true } } },
  });
  return NextResponse.json({ ok: true, product: p });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'products.delete');
  if (auth.error) return auth.error;

  const { id: raw } = await params;
  const id = Number(raw);
  if (!Number.isFinite(id)) return NextResponse.json({ error: 'Invalid id' }, { status: 400 });

  await prisma.product.delete({ where: { id } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
