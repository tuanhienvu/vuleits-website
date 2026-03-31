'use client';
import ProductsListingExperience from '@/components/products/ProductsListingExperience';

// --- Sections: Intro hero | ProductsListingExperience (filters + grid) ---

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4">
      {/* ==================== PRODUCTS PAGE INTRO ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-8 border border-white/10">
        <h1 className="text-4xl md:text-5xl font-bold text-fg mb-4">Our Products</h1>
        <p className="text-fg-muted text-lg max-w-2xl">
          Filter by launch type and stack, explore trending picks, and open live demos—all in one place.
        </p>
      </section>
      {/* ==================== PRODUCT LISTING (CLIENT) ==================== */}
      <ProductsListingExperience />
    </div>
  );
}
