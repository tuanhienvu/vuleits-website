'use client';

import Link from 'next/link';
import { useState } from 'react';
import WooxLightbox from '@/components/woox/WooxLightbox';
import { normalizePublicAssetUrlForBrowser } from '@/lib/normalizePublicAssetUrl';

export type RoomDetail = {
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

export default function RoomDetailView({ room }: { room: RoomDetail }) {
  const [lightbox, setLightbox] = useState(false);
  const gallery = (room.galleryImageUrls || [])
    .map((x) => (typeof x === 'string' ? normalizePublicAssetUrlForBrowser(x) : null))
    .filter((x): x is string => Boolean(x));
  const img =
    room.coverImageUrl ? normalizePublicAssetUrlForBrowser(room.coverImageUrl) : gallery[0] || null;

  return (
    <article className="woox-container py-10 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/stays" className="text-amber-700 hover:underline">
              Stays
            </Link>
          </li>
          <li aria-hidden>/</li>
          <li className="text-slate-800">{room.name}</li>
        </ol>
      </nav>

      <div className="mt-6 grid gap-8 lg:grid-cols-2">
        <div>
          {img ? (
            <button
              type="button"
              onClick={() => setLightbox(true)}
              className="relative block w-full overflow-hidden rounded-2xl border border-slate-200 shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              aria-label={`Open large photo of ${room.name}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img} alt={room.name} className="aspect-[4/3] w-full object-cover" />
            </button>
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 text-slate-400">
              No cover image
            </div>
          )}
          <WooxLightbox open={lightbox} src={img} alt={room.name} onClose={() => setLightbox(false)} />
          {gallery.length > 1 ? (
            <div className="mt-3 grid grid-cols-5 gap-2">
              {gallery.slice(0, 5).map((g, idx) => (
                <button
                  key={`${g}-${idx}`}
                  type="button"
                  onClick={() => setLightbox(true)}
                  className="overflow-hidden rounded-lg border border-slate-200"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g} alt={`${room.name} gallery ${idx + 1}`} className="aspect-square w-full object-cover" />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{room.type}</p>
          <h1 className="woox-brand-title mt-2 text-4xl font-semibold text-slate-900">{room.name}</h1>
          <p className="mt-3 text-lg text-slate-600">{room.shortDesc}</p>
          <p className="mt-6 text-3xl font-bold text-slate-900">
            ${room.nightPriceUsd}
            <span className="text-base font-normal text-slate-500"> / night</span>
          </p>
          <ul className="mt-4 space-y-1 text-sm text-slate-600">
            <li>Max guests: {room.maxGuests}</li>
            <li>
              Availability snapshot: {room.availableUnits} / {room.totalUnits} units
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={`/book#hospitality-booking`} className="woox-btn-primary">
              Book this room
            </Link>
            <Link href="/stays" className="woox-btn-secondary">
              Back to search
            </Link>
          </div>
        </div>
      </div>

      {room.details ? (
        <section className="prose prose-slate mt-12 max-w-none" aria-labelledby="details-heading">
          <h2 id="details-heading" className="woox-section-title text-2xl">
            Details
          </h2>
          <div className="mt-4 whitespace-pre-wrap text-slate-700">{room.details}</div>
        </section>
      ) : null}
    </article>
  );
}
