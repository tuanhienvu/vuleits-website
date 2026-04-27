import ProductsPage from '@/components/pages/ProductsPage';
import type { ProductsApiResponse } from '@/components/products/ProductsListingExperience';
import { joinApiOrigin } from '@/lib/apiRoutes';
import { publicApiBaseUrl } from '@/lib/publicApiBaseUrl';

// --- /products route: intro + listing client ---

export const metadata = {
  title: 'Products - VULE ITS',
  description: 'Explore our products, live demos, and technology stack.',
};

async function fetchProductsInitialData(): Promise<ProductsApiResponse | null> {
  try {
    const base = publicApiBaseUrl();
    const res = await fetch(joinApiOrigin(base, 'products'), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    const data = (await res.json()) as ProductsApiResponse;
    return data;
  } catch {
    return null;
  }
}

export default async function ProductsRoutePage() {
  const initialData = await fetchProductsInitialData();
  return <ProductsPage initialData={initialData} />;
}
