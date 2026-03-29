'use client';

import { LayoutGroup } from 'framer-motion';

/** Wraps product routes so listing ↔ detail can share `layoutId` (hero) during navigation. */
export default function ProductsLayoutGroup({ children }: { children: React.ReactNode }) {
  return <LayoutGroup id="products">{children}</LayoutGroup>;
}
