export type ServiceCard = {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  order: number;
};

export type ServicesListResponse = {
  items: ServiceCard[];
  spotlight: ServiceCard[];
};

export type ServiceDetailResponse = {
  service: ServiceCard;
  related: Array<{
    id: number;
    icon: string;
    title: string;
    description: string;
    order: number;
  }>;
};
