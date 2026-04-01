import PublicLayout from '@/components/layout/PublicLayout';
import ProductsLayoutGroup from './ProductsLayoutGroup';

// --- Product routes: shared public nav + footer + motion group for card → detail hero ---

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <PublicLayout>
      <ProductsLayoutGroup>{children}</ProductsLayoutGroup>
    </PublicLayout>
  );
}
