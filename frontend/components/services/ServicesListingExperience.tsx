'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { ServiceCard, ServicesListResponse } from '@/lib/services/types';

export default function ServicesListingExperience() {
  const [data, setData] = useState<ServicesListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState('');

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (q.trim()) params.set('q', q.trim());
      const res = await fetch(`/api/services?${params.toString()}`);
      if (!res.ok) throw new Error('fetch failed');
      const json = (await res.json()) as ServicesListResponse;
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [q]);

  useEffect(() => {
    void fetchList();
  }, [fetchList]);

  const items = useMemo(() => data?.items ?? [], [data]);
  const spotlight = useMemo(() => data?.spotlight ?? [], [data]);

  return (
    <>
      <section className="glass p-6 rounded-2xl mb-8 border border-white/10">
        <label className="block">
          <span className="text-white/70 text-sm block mb-2">Search services</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Name, description, feature..."
            className="w-full px-4 py-3 bg-white/15 border border-white/25 rounded-xl text-white placeholder-white/45 focus:outline-none focus:border-emerald-400/50"
          />
        </label>
      </section>

      {loading ? (
        <p className="text-white/70 mb-12">Loading services...</p>
      ) : !data ? (
        <p className="text-white/70 mb-12">Could not load services.</p>
      ) : (
        <>
          {spotlight.length > 0 && !q.trim() ? (
            <section className="mb-12" aria-labelledby="spotlight-title">
              <h2 id="spotlight-title" className="text-2xl font-bold text-white mb-4">
                Spotlight Services
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {spotlight.map((s) => (
                  <ServiceCardView key={`spot-${s.id}`} service={s} highlight />
                ))}
              </div>
            </section>
          ) : null}

          <section aria-labelledby="all-services-title">
            <h2 id="all-services-title" className="text-2xl font-bold text-white mb-4">
              {q.trim() ? 'Matching services' : 'All services'}
            </h2>
            {items.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center text-white/70">No services match your search.</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {items.map((s) => (
                  <ServiceCardView key={s.id} service={s} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </>
  );
}

function ServiceCardView({ service, highlight = false }: { service: ServiceCard; highlight?: boolean }) {
  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-2xl border transition duration-300 ${
        highlight
          ? 'border-emerald-400/40 bg-linear-to-br from-white/8 to-emerald-500/10 shadow-[0_0_40px_-10px_rgba(52,211,153,0.45)]'
          : 'border-white/10 bg-white/5 hover:border-white/25'
      } hover:-translate-y-1 hover:shadow-xl`}
    >
      <div className="p-5 flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-4xl">{service.icon || '🧩'}</div>
          <h3 className="font-semibold text-white text-xl">{service.title}</h3>
        </div>
        <div className="text-white/80 text-sm line-clamp-4" dangerouslySetInnerHTML={{ __html: service.description }} />
        <ul className="mt-4 space-y-1.5">
          {service.features.slice(0, 4).map((f, idx) => (
            <li key={idx} className="text-white/70 text-sm flex items-start gap-2">
              <span className="text-emerald-300 mt-0.5">✓</span>
              <span dangerouslySetInnerHTML={{ __html: f }} />
            </li>
          ))}
        </ul>
      </div>
      <div className="px-5 pb-5">
        <Link
          href={`/services/${service.id}`}
          className="inline-flex rounded-lg bg-emerald-500/90 px-4 py-2 text-sm font-medium text-emerald-950 transition group-hover:bg-emerald-400"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
