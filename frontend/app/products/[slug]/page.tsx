import type { Metadata } from 'next';
import { cache } from 'react';
import ProductDetailClient from '@/components/products/ProductDetailClient';
import type { PublicProductDetail } from '@/lib/products/types';
import { generateStaticParamsForProducts } from '@/lib/staticExportPaths';
import { publicApiBaseUrl } from '@/lib/publicApiBaseUrl';

type Props = { params: Promise<{ slug: string }> };

// --- Product detail: SSR fetch + ProductDetailClient ---

export async function generateStaticParams() {
  return generateStaticParamsForProducts();
}

function backendBaseUrl() {
  return publicApiBaseUrl();
}

const fetchProduct = cache(async (slug: string): Promise<PublicProductDetail | null> => {
  const res = await fetch(`${backendBaseUrl()}/api/products/${encodeURIComponent(slug)}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) return null;
  return (await res.json()) as PublicProductDetail;
});

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const p = await fetchProduct(slug);
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
  const initial = await fetchProduct(slug);
  if (!initial) {
    return <div className="container mx-auto px-4 py-12 text-white">Product not found.</div>;
  }
  return <ProductDetailClient initial={initial} />;
}
