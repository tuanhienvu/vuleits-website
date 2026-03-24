'use client';

import { useState } from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
  status: 'Active' | 'Expired';
}

export default function ProductsPage() {
  const [products] = useState<Product[]>([
    { id: '1', title: 'Product 1', description: 'High-quality product with premium features', status: 'Active' },
    { id: '2', title: 'Product 2', description: 'Innovative solution for modern needs', status: 'Active' },
    { id: '3', title: 'Product 3', description: 'Reliable and scalable platform', status: 'Active' },
  ]);

  const [search, setSearch] = useState('');

  const filteredProducts = products.filter((p) => {
    const active = p.status.trim().toLowerCase() === 'active';
    return active && p.title.toLowerCase().includes(search.toLowerCase());
  });

  return (
    <div className="container mx-auto px-4">
      {/* ==================== HERO SECTION ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Products</h1>
        <p className="text-white/80 text-lg">Discover our innovative solutions designed for your success</p>
      </section>

      {/* ==================== SEARCH ==================== */}
      <section className="glass p-6 rounded-2xl mb-8">
        <div>
          <label className="text-white font-medium block mb-2">Search Products</label>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
          />
        </div>
      </section>

      {/* ==================== PRODUCTS GRID SECTION ==================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product.id} className="glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105">
              {/* Product Image */}
              <div className="h-40 bg-white/10 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-4xl">📦</div>
              </div>

              {/* Product Info */}
              <h3 className="text-white font-semibold text-xl mb-2">{product.title}</h3>
              <p className="text-white/70 mb-3">{product.description}</p>

              <div className="flex justify-end">
                <button type="button" className="cta-button text-sm px-4 py-2">
                  Learn More
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="glass p-12 rounded-2xl col-span-full text-center">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-white/70">No products found. Try a different search.</p>
          </div>
        )}
      </section>
    </div>
  );
}
