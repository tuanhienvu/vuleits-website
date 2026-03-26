'use client';

import Link from 'next/link';
import ProductsListingExperience from '@/components/products/ProductsListingExperience';

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4">
      <section className="glass p-8 md:p-12 rounded-3xl mb-8 border border-white/10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Products</h1>
        <p className="text-white/80 text-lg max-w-2xl">
          Filter by launch type and stack, explore trending picks, and open live demos—all in one place.
        </p>
        <p className="mt-4 text-sm text-white/55">
          Tip: open any product for full media, embedded demo, technologies, and related picks. Direct URL:{' '}
          <Link href="/products" className="text-emerald-300/90 underline underline-offset-2 hover:text-emerald-200">
            /products
          </Link>
        </p>
      </section>
      <ProductsListingExperience />
    </div>
  );
}
