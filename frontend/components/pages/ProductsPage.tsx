'use client';
import ProductsListingExperience from '@/components/products/ProductsListingExperience';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { ProductsApiResponse } from '@/components/products/ProductsListingExperience';

// --- Sections: Intro hero | ProductsListingExperience (filters + grid) ---

export default function ProductsPage({ initialData = null }: { initialData?: ProductsApiResponse | null }) {
  const { t } = useLocale();
  return (
    <div className="container mx-auto px-4">
      {/* ==================== PRODUCTS PAGE INTRO ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-8 border border-white/10">
        <h1 className="text-4xl md:text-5xl font-bold text-fg mb-4">{t('products.ourProducts')}</h1>
        <p className="text-fg-muted text-lg max-w-2xl">
          {t('products.heroSubtitle')}
        </p>
      </section>
      {/* ==================== PRODUCT LISTING (CLIENT) ==================== */}
      <ProductsListingExperience initialData={initialData} />
    </div>
  );
}
