import ServicesListingExperience from '@/components/services/ServicesListingExperience';
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
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="glass p-8 md:p-12 rounded-3xl mb-8 border border-white/10">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Services</h1>
        <p className="text-white/80 text-lg max-w-2xl">
          Browse service offerings, search by needs, and open service detail pages for full scope and related services.
        </p>
      </section>
      {/* ==================== LISTING ==================== */}
      <ServicesListingExperience initialData={initialData} />
    </div>
  );
}
