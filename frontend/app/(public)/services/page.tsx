import ServicesPage from '@/components/pages/ServicesPage';
import type { ServicesListResponse } from '@/lib/services/types';
import { joinApiOrigin } from '@/lib/apiRoutes';
import { publicApiBaseUrl } from '@/lib/publicApiBaseUrl';

// --- /services route: intro + listing client ---

export const metadata = {
  title: 'Services - VULE ITS',
  description: 'Explore our service portfolio, capabilities, and detailed offerings.',
};

async function fetchServicesInitialData(): Promise<ServicesListResponse | null> {
  try {
    const base = publicApiBaseUrl();
    const res = await fetch(joinApiOrigin(base, 'services'), { next: { revalidate: 60 } });
    if (!res.ok) return null;
    return (await res.json()) as ServicesListResponse;
  } catch {
    return null;
  }
}

export default async function ServicesRoutePage() {
  const initialData = await fetchServicesInitialData();
  return <ServicesPage initialData={initialData} />;
}
