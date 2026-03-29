/** Shape compatible with list API card rows for interactive product UI. */
export type InteractiveProduct = {
  id: number;
  productName: string;
  slug: string;
  shortDescription: string;
  mainImage: string | null;
  category: { name: string; slug: string };
  isFeatured: boolean;
  viewsCount: number;
  demoClickCount: number;
  technologies: { id: number; name: string; logo: string | null }[];
};

export const PRODUCT_HERO_LAYOUT_ID = 'product-hero-';
