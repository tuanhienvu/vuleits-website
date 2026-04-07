import { prisma } from '@/lib/prisma';
import { asStringArray } from '@/lib/products/jsonArrays';
import { sanitizeProductBodyHtml } from '@/lib/products/sanitizeProductHtml';

export type PublicProductDetail = {
  id: number;
  productName: string;
  slug: string;
  shortDescription: string;
  fullDescriptionHtml: string;
  imageUrls: string[];
  videoUrls: string[];
  demoLink: string | null;
  landingPageLink: string | null;
  embedDemoUrl: string | null;
  category: { id: number; name: string; slug: string };
  viewsCount: number;
  demoClickCount: number;
  isFeatured: boolean;
  authorName: string;
  technologies: { id: number; name: string; logo: string | null; description: string | null }[];
  seoTitle: string | null;
  seoDescription: string | null;
  related: {
    id: number;
    productName: string;
    slug: string;
    shortDescription: string;
    mainImage: string | null;
    category: { name: string; slug: string };
  }[];
};

export async function getPublicProductBySlug(slug: string): Promise<PublicProductDetail | null> {
  const clean = decodeURIComponent(String(slug ?? '').trim());
  if (!clean) return null;

  const product = await prisma.product.findFirst({
    where: { slug: clean, status: 'Active' },
    include: {
      category: true,
      technologies: { include: { technology: true } },
      author: { select: { displayName: true } },
    },
  });

  if (!product) return null;

  const techIds = product.technologies.map((t: { technologyId: number }) => t.technologyId);

  const relatedRows = await prisma.product.findMany({
    where: {
      status: 'Active',
      id: { not: product.id },
      OR: [
        { categoryId: product.categoryId },
        ...(techIds.length ? [{ technologies: { some: { technologyId: { in: techIds } } } }] : []),
      ],
    },
    take: 8,
    include: {
      category: { select: { name: true, slug: true } },
      technologies: { include: { technology: { select: { id: true, techName: true, techLogo: true } } } },
    },
  });

  const scored = relatedRows
    .map((p: (typeof relatedRows)[number]) => {
      const overlap = p.technologies.filter((t: { technologyId: number }) =>
        techIds.includes(t.technologyId),
      ).length;
      return { p, score: overlap * 10 + (p.categoryId === product.categoryId ? 5 : 0) };
    })
    .sort(
      (a: { score: number }, b: { score: number }) => b.score - a.score,
    )
    .slice(0, 4)
    .map((x: { p: (typeof relatedRows)[number] }) => x.p);

  const images = asStringArray(product.imageUrls);
  const videos = asStringArray(product.videoUrls);

  return {
    id: product.id,
    productName: product.productName,
    slug: product.slug,
    shortDescription: product.shortDescription,
    fullDescriptionHtml: sanitizeProductBodyHtml(product.fullDescription),
    imageUrls: images,
    videoUrls: videos,
    demoLink: product.demoLink,
    landingPageLink: product.landingPageLink,
    embedDemoUrl: product.embedDemoUrl,
    category: product.category,
    viewsCount: product.viewsCount,
    demoClickCount: product.demoClickCount,
    isFeatured: product.isFeatured,
    authorName: product.author.displayName ?? '',
    technologies: product.technologies.map(
      (t: {
        technology: {
          id: number;
          techName: string;
          techLogo: string | null;
          description: string | null;
        };
      }) => ({
        id: t.technology.id,
        name: t.technology.techName,
        logo: t.technology.techLogo,
        description: t.technology.description,
      }),
    ),
    seoTitle: product.seoTitle,
    seoDescription: product.seoDescription,
    related: scored.map((p: (typeof relatedRows)[number]) => ({
      id: p.id,
      productName: p.productName,
      slug: p.slug,
      shortDescription: p.shortDescription,
      mainImage: asStringArray(p.imageUrls)[0] ?? null,
      category: p.category,
    })),
  };
}
