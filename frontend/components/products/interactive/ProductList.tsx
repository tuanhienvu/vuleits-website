'use client';

import { memo } from 'react';
import { ProductCard, type ProductCardVariant } from './ProductCard';
import type { InteractiveProduct } from './types';

type ProductListProps = {
  items: InteractiveProduct[];
  variant: ProductCardVariant;
  className?: string;
};

function ProductListInner({ items, variant, className }: ProductListProps) {
  return (
    <div
      className={
        className ?? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12'
      }
    >
      {items.map((p) => (
        <ProductCard key={p.id} product={p} variant={variant} />
      ))}
    </div>
  );
}

export const ProductList = memo(ProductListInner);
