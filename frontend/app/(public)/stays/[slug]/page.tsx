import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import RoomDetailView from '@/components/stays/RoomDetailView';
import { joinApiOrigin } from '@/lib/apiRoutes';
import { publicApiBaseUrl } from '@/lib/publicApiBaseUrl';

type RoomApi = {
  id: number;
  name: string;
  slug: string;
  type: string;
  shortDesc: string;
  details: string;
  nightPriceUsd: number;
  maxGuests: number;
  availableUnits: number;
  totalUnits: number;
  coverImageUrl: string | null;
  galleryImageUrls?: string[];
};

async function loadRooms(): Promise<RoomApi[] | null> {
  try {
    const base = publicApiBaseUrl();
    const res = await fetch(joinApiOrigin(base, 'hospitality/rooms'), { next: { revalidate: 30 } });
    if (!res.ok) return null;
    const data = (await res.json()) as RoomApi[];
    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const list = await loadRooms();
  const room = list?.find((r) => r.slug === slug);
  return {
    title: room ? `${room.name} | Stays` : 'Room | VULE ITS',
    description: room?.shortDesc ?? 'Room details and booking',
  };
}

export default async function StaysDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const list = await loadRooms();
  if (!list) notFound();
  const room = list.find((r) => r.slug === slug);
  if (!room) notFound();
  return <RoomDetailView room={room} />;
}
