import type { Metadata } from 'next';
import ServiceDetailClient from '@/components/services/ServiceDetailClient';
import type { ServiceDetailResponse } from '@/lib/services/types';
import { publicApiBaseUrl } from '@/lib/publicApiBaseUrl';
import { joinApiOrigin } from '@/lib/apiRoutes';

type Props = { params: Promise<{ id: string }> };

// --- Service detail: SSR fetch + ServiceDetailClient ---

function backendBaseUrl() {
  return publicApiBaseUrl();
}

async function fetchService(id: string): Promise<ServiceDetailResponse | null> {
  try {
    const res = await fetch(joinApiOrigin(backendBaseUrl(), `services/${encodeURIComponent(id)}`), {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return (await res.json()) as ServiceDetailResponse;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const p = await fetchService(id);
  if (!p) return { title: 'Service - VULE ITS' };
  return {
    title: `${p.service.title} - Service - VULE ITS`,
    description: p.service.title,
    openGraph: { title: p.service.title, description: p.service.title },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { id } = await params;
  const initial = await fetchService(id);
  if (!initial) {
    return <div className="container mx-auto px-4 py-12 text-white">Service not found.</div>;
  }
  return <ServiceDetailClient initial={initial} />;
}
