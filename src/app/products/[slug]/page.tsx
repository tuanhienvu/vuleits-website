import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPublicProductBySlug } from '@/lib/products/publicProductDetail';
import ProductDetailClient from '@/components/products/ProductDetailClient';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPublicProductBySlug(slug);
  if (!p) return { title: 'Product - VULE ITS' };
  const title = p.seoTitle ?? `${p.productName} - VULE ITS`;
  const desc = p.seoDescription ?? p.shortDescription;
  return {
    title,
    description: desc,
    openGraph: { title: p.productName, description: desc },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const initial = await getPublicProductBySlug(slug);
  if (!initial) notFound();
  return <ProductDetailClient initial={initial} />;
}
