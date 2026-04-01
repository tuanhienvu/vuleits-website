import { NextResponse } from 'next/server';
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

export async function GET(req: Request) {
  const auth = await authorize(req, 'products.read');
  if (auth.error) return auth.error;

  const { searchParams } = new URL(req.url);
  const take = Math.min(Math.max(Number(searchParams.get('take') ?? 80) || 80, 1), 200);

  const rows = await prisma.product.findMany({
    take,
    orderBy: [{ updatedAt: 'desc' }],
    include: {
      category: { select: { id: true, name: true, slug: true } },
      technologies: { include: { technology: { select: { id: true, techName: true } } } },
    },
  });

  return NextResponse.json(
    rows.map((p) => ({
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
    })),
  );
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'products.create');
  if (auth.error) return auth.error;

  const body = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const productName = typeof body.productName === 'string' ? body.productName.trim() : '';
  const shortDescription = typeof body.shortDescription === 'string' ? body.shortDescription.trim() : '';
  const fullDescription = typeof body.fullDescription === 'string' ? body.fullDescription.trim() : '';
  const categoryId = Number(body.categoryId);
  let slug = typeof body.slug === 'string' && body.slug.trim() ? slugify(body.slug) : slugify(productName);
  if (!productName || !shortDescription || !fullDescription || !Number.isFinite(categoryId)) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const cat = await prisma.productCategory.findUnique({ where: { id: categoryId } });
  if (!cat) return NextResponse.json({ error: 'Invalid category' }, { status: 400 });

  const existing = await prisma.product.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const imageUrls = Array.isArray(body.imageUrls) ? body.imageUrls.filter((x): x is string => typeof x === 'string') : [];
  const videoUrls = Array.isArray(body.videoUrls) ? body.videoUrls.filter((x): x is string => typeof x === 'string') : [];
  const techIds = Array.isArray(body.technologyIds)
    ? [...new Set(body.technologyIds.map((x) => Number(x)).filter((n) => Number.isFinite(n) && n > 0))]
    : [];

  const data: Prisma.ProductCreateInput = {
    productName,
    slug,
    shortDescription,
    fullDescription,
    imageUrls: imageUrls as Prisma.InputJsonValue,
    videoUrls: videoUrls as Prisma.InputJsonValue,
    demoLink: typeof body.demoLink === 'string' && body.demoLink.trim() ? body.demoLink.trim() : null,
    landingPageLink: typeof body.landingPageLink === 'string' && body.landingPageLink.trim() ? body.landingPageLink.trim() : null,
    embedDemoUrl: typeof body.embedDemoUrl === 'string' && body.embedDemoUrl.trim() ? body.embedDemoUrl.trim() : null,
    category: { connect: { id: categoryId } },
    author: { connect: { id: auth.user.id } },
    isFeatured: typeof body.isFeatured === 'boolean' ? body.isFeatured : false,
    status: typeof body.status === 'string' && body.status.trim() ? body.status.trim() : 'Active',
    seoTitle: typeof body.seoTitle === 'string' ? body.seoTitle.trim().slice(0, 200) || null : null,
    seoDescription: typeof body.seoDescription === 'string' ? body.seoDescription.trim().slice(0, 500) || null : null,
    seoKeywords: typeof body.seoKeywords === 'string' ? body.seoKeywords.trim().slice(0, 500) || null : null,
  };

  if (techIds.length) {
    data.technologies = {
      create: techIds.map((technologyId) => ({ technology: { connect: { id: technologyId } } })),
    };
  }

  const created = await prisma.product.create({ data, include: { category: true } });
  return NextResponse.json({ ok: true, product: created });
}
