'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { apiPath } from '@/lib/apiRoutes';
import { normalizePublicAssetUrlForBrowser } from '@/lib/normalizePublicAssetUrl';

export type RoomRow = {
  id: number;
  name: string;
  slug: string;
  type: string;
  shortDesc: string;
  nightPriceUsd: number;
  maxGuests: number;
  availableUnits: number;
  totalUnits: number;
  coverImageUrl: string | null;
  galleryImageUrls?: string[];
};

/**
 * Stays search / results: mirrors Woox “Deals” listing — filters call the same `hospitality/rooms` API as the booking form.
 * Keyword / guest filters are client-side on the last fetched result set.
 */
export default function StaysSearchClient() {
  const router = useRouter();
  const sp = useSearchParams();
  const [q, setQ] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState('2');
  const [raw, setRaw] = useState<RoomRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [disabled, setDisabled] = useState(false);

  const fetchRooms = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (checkIn) params.set('checkIn', checkIn);
      if (checkOut) params.set('checkOut', checkOut);
      const res = await fetch(`${apiPath('hospitality/rooms')}?${params.toString()}`);
      if (res.status === 403) {
        setDisabled(true);
        setRaw([]);
        setError('Online booking is not available right now.');
        return;
      }
      if (!res.ok) {
        setError('Could not load availability.');
        setRaw([]);
        return;
      }
      const data = (await res.json()) as RoomRow[];
      setRaw(Array.isArray(data) ? data : []);
    } catch {
      setError('Network error.');
      setRaw([]);
    } finally {
      setLoading(false);
    }
  }, [checkIn, checkOut]);

  useEffect(() => {
    const qi = sp.get('checkIn') ?? '';
    const qo = sp.get('checkOut') ?? '';
    const g = sp.get('guests') ?? '2';
    const dest = sp.get('q') ?? '';
    setCheckIn(qi);
    setCheckOut(qo);
    setGuests(g);
    setQ(dest);
  }, [sp]);

  useEffect(() => {
    void fetchRooms();
  }, [fetchRooms]);

  const rooms = useMemo(() => {
    let list = raw;
    const qq = q.trim().toLowerCase();
    if (qq) {
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(qq) ||
          r.shortDesc.toLowerCase().includes(qq) ||
          r.type.toLowerCase().includes(qq) ||
          r.slug.toLowerCase().includes(qq),
      );
    }
    const g = Number(guests) || 0;
    if (g > 0) {
      list = list.filter((r) => r.maxGuests >= g);
    }
    return list;
  }, [raw, q, guests]);

  function applyFilters(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set('q', q.trim());
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guests) params.set('guests', guests);
    router.replace(`/stays?${params.toString()}`);
    void fetchRooms();
  }

  return (
    <div className="woox-container py-10 sm:py-14">
      <header className="max-w-3xl">
        <h1 className="woox-section-title">Find your stay</h1>
        <p className="woox-section-sub">Filter by dates and guests — availability updates from your booking engine.</p>
      </header>

      <form onSubmit={applyFilters} className="woox-card mt-8 grid gap-3 md:grid-cols-5 md:items-end">
        <div className="md:col-span-2">
          <label className="woox-label" htmlFor="stays-q">
            Keyword
          </label>
          <input id="stays-q" className="woox-input mt-1" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Villa, suite, region…" />
        </div>
        <div>
          <label className="woox-label" htmlFor="stays-in">
            Check-in
          </label>
          <input
            id="stays-in"
            type="date"
            className="woox-input mt-1"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div>
          <label className="woox-label" htmlFor="stays-out">
            Check-out
          </label>
          <input
            id="stays-out"
            type="date"
            className="woox-input mt-1"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="woox-label" htmlFor="stays-g">
              Guests
            </label>
            <input
              id="stays-g"
              type="number"
              min={1}
              className="woox-input mt-1"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
          <button type="submit" className="woox-btn-primary self-end px-5">
            Update
          </button>
        </div>
      </form>

      {loading ? <p className="mt-8 text-slate-600">Loading…</p> : null}
      {error ? (
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="alert">
          {error}
        </p>
      ) : null}

      {!loading && !disabled && rooms.length === 0 ? (
        <p className="mt-8 text-slate-600">No properties match your filters yet. Try different dates or keywords.</p>
      ) : null}

      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <li key={room.id}>
            <article className="woox-card flex h-full flex-col overflow-hidden p-0">
              <Link href={`/stays/${encodeURIComponent(room.slug)}`} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                <div className="relative aspect-[4/3] bg-slate-100">
                  {room.coverImageUrl ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={normalizePublicAssetUrlForBrowser(room.coverImageUrl)}
                      alt={room.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-slate-400">No image</div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2 py-0.5 text-xs font-semibold uppercase text-slate-800">
                    {room.type}
                  </span>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-slate-900">{room.name}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-600">{room.shortDesc}</p>
                  <p className="mt-3 text-base font-semibold text-amber-700">
                    ${room.nightPriceUsd}
                    <span className="text-sm font-normal text-slate-500"> / night</span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    Up to {room.maxGuests} guests · {room.availableUnits} available
                  </p>
                </div>
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </div>
  );
}
