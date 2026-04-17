import ProductsLayoutGroup from './ProductsLayoutGroup';

// --- Product routes: motion group for card → detail hero (nav/footer from parent `(public)` layout) ---

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <ProductsLayoutGroup>{children}</ProductsLayoutGroup>;
}
