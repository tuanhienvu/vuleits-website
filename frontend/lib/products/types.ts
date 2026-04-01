export type PublicProductDetail = {
  id: number;
  productName: string;
  slug: string;
  shortDescription: string;
  fullDescriptionHtml: string;
  imageUrls: string[];
  videoUrls: string[];
  demoLink: string | null;
  landingPageLink: string | null;
  embedDemoUrl: string | null;
  category: { id: number; name: string; slug: string };
  viewsCount: number;
  demoClickCount: number;
  isFeatured: boolean;
  authorName: string;
  technologies: { id: number; name: string; logo: string | null; description: string | null }[];
  seoTitle: string | null;
  seoDescription: string | null;
  related: {
    id: number;
    productName: string;
    slug: string;
    shortDescription: string;
    mainImage: string | null;
    category: { name: string; slug: string };
  }[];
};
