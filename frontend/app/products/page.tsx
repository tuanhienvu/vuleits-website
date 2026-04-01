import ProductsListingExperience from '@/components/products/ProductsListingExperience';

// --- /products route: intro + listing client ---

export const metadata = {
  title: 'Products - VULE ITS',
  description: 'Explore our products, live demos, and technology stack.',
};

export default function ProductsRoutePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="glass p-8 md:p-12 rounded-3xl mb-8 border border-white/10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Products</h1>
        <p className="text-white/80 text-lg max-w-2xl">
          Filter by launch type and stack, explore trending picks, and open live demos—all in one place.
        </p>
      </section>
      {/* ==================== LISTING ==================== */}
      <ProductsListingExperience />
    </div>
  );
}
