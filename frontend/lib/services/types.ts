export type ServiceCard = {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  order: number;
  categorySlug: string | null;
  categoryName: string | null;
};

export type ServicesListResponse = {
  items: ServiceCard[];
  spotlight: ServiceCard[];
  categories?: Array<{ slug: string; name: string }>;
};

export type ServiceDetailResponse = {
  service: ServiceCard;
  related: Array<{
    id: number;
    icon: string;
    title: string;
    description: string;
    order: number;
    categorySlug?: string | null;
    categoryName?: string | null;
  }>;
};
