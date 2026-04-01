import type { Metadata } from 'next';
import ServiceDetailClient from '@/components/services/ServiceDetailClient';
import type { ServiceDetailResponse } from '@/lib/services/types';
import { generateStaticParamsForServices, staticExportAwareFetchOptions } from '@/lib/staticExportPaths';
import { publicApiBaseUrl } from '@/lib/publicApiBaseUrl';

type Props = { params: Promise<{ id: string }> };

// --- Service detail: SSR fetch + ServiceDetailClient ---

export async function generateStaticParams() {
  return generateStaticParamsForServices();
}

function backendBaseUrl() {
  return publicApiBaseUrl();
}

async function fetchService(id: string): Promise<ServiceDetailResponse | null> {
  const res = await fetch(
    `${backendBaseUrl()}/api/services/${encodeURIComponent(id)}`,
    staticExportAwareFetchOptions(),
  );
  if (!res.ok) return null;
  return (await res.json()) as ServiceDetailResponse;
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
