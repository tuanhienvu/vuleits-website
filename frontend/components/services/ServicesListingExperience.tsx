'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import type { ServiceCard, ServicesListResponse } from '@/lib/services/types';
import { apiPath } from '@/lib/apiRoutes';
import { useLocale } from '@/components/providers/LocaleProvider';

// --- Sections: Search filter | Spotlight | Service cards grid ---
const SERVICES_CACHE_TTL_MS = 60_000;
const servicesCache = new Map<string, { ts: number; data: ServicesListResponse }>();

export default function ServicesListingExperience({
  initialData = null,
}: {
  initialData?: ServicesListResponse | null;
}) {
  const { locale, t } = useLocale();
  const [data, setData] = useState<ServicesListResponse | null>(initialData);
  const [loading, setLoading] = useState(initialData == null);
  const [q, setQ] = useState('');
  const [debouncedQ, setDebouncedQ] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (initialData) {
      const p = new URLSearchParams();
      p.set('locale', 'en-US');
      servicesCache.set(p.toString(), { ts: Date.now(), data: initialData });
    }
  }, [initialData]);

  useEffect(() => {
    const id = window.setTimeout(() => setDebouncedQ(q), 300);
    return () => window.clearTimeout(id);
  }, [q]);

  const fetchList = useCallback(async () => {
    setLoading((prev) => prev || data == null);
    try {
      const params = new URLSearchParams();
      params.set('locale', locale);
      if (debouncedQ.trim()) params.set('q', debouncedQ.trim());
      if (category.trim()) params.set('category', category.trim());
      const key = params.toString();
      const now = Date.now();
      const hit = servicesCache.get(key);
      if (hit && now - hit.ts < SERVICES_CACHE_TTL_MS) {
        setData(hit.data);
        setLoading(false);
        return;
      }
      const res = await fetch(`${apiPath('services')}?${key}`);
      if (!res.ok) throw new Error('fetch failed');
      const json = (await res.json()) as ServicesListResponse;
      servicesCache.set(key, { ts: now, data: json });
      setData(json);
    } catch {
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [category, debouncedQ, data, locale]);

  useEffect(() => {
    void fetchList();
  }, [fetchList]);

  const items = useMemo(() => data?.items ?? [], [data]);
  const spotlight = useMemo(() => data?.spotlight ?? [], [data]);

  return (
    <>
      {/* ==================== SEARCH ==================== */}
      <section className="glass p-6 rounded-2xl mb-8 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-fg-muted text-sm block mb-2">{t('services.searchServices')}</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('services.searchPlaceholder')}
              className="w-full px-4 py-3 bg-white/15 border border-white/25 rounded-xl text-fg placeholder:text-fg-subtle focus:outline-none focus:border-emerald-400/50"
            />
          </label>
          <label className="block">
            <span className="text-fg-muted text-sm block mb-2">{t('products.category')}</span>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-white/15 border border-white/25 rounded-xl text-fg focus:outline-none focus:border-emerald-400/50"
            >
              <option value="">{t('services.allCategories')}</option>
              {(data?.categories ?? []).map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      </section>

      {loading ? (
        <p className="text-fg-muted mb-12">{t('services.loading')}</p>
      ) : !data ? (
        <p className="text-fg-muted mb-12">{t('services.loadError')}</p>
      ) : (
        <>
          {/* ==================== SPOTLIGHT (EMPTY SEARCH) ==================== */}
          {spotlight.length > 0 && !q.trim() ? (
            <section className="mb-12" aria-labelledby="spotlight-title">
              <h2 id="spotlight-title" className="text-2xl font-bold text-fg mb-4">
                {t('services.spotlightServices')}
              </h2>
              <div className="services-hover-group grid grid-cols-1 md:grid-cols-3 gap-5">
                {spotlight.map((s) => (
                  <ServiceCardView key={`spot-${s.id}`} service={s} highlight />
                ))}
              </div>
            </section>
          ) : null}

          {/* ==================== ALL / MATCHING SERVICES ==================== */}
          <section aria-labelledby="all-services-title">
            <h2 id="all-services-title" className="text-2xl font-bold text-fg mb-4">
              {q.trim() ? t('services.matchingServices') : t('services.allServices')}
            </h2>
            {items.length === 0 ? (
              <div className="glass rounded-2xl p-12 text-center text-fg-muted">{t('services.noServicesMatch')}</div>
            ) : (
              <div className="services-hover-group grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
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

// --- ServiceCardView: summary card + link to detail ---

function ServiceCardView({ service, highlight = false }: { service: ServiceCard; highlight?: boolean }) {
  const { t } = useLocale();
  return (
    <article className={`public-card services-hover-card group overflow-hidden ${highlight ? 'public-card-featured' : ''}`}>
      <div className="p-5 flex-1">
        <div className="flex items-center gap-3 mb-3">
          <div className="text-4xl">{service.icon || '🧩'}</div>
          <h3 className="font-semibold text-fg text-xl">{service.title}</h3>
        </div>
        <div className="text-fg-muted text-sm line-clamp-4" dangerouslySetInnerHTML={{ __html: service.description }} />
        <ul className="mt-4 space-y-1.5">
          {service.features.slice(0, 4).map((f, idx) => (
            <li key={idx} className="text-fg-muted text-sm flex items-start gap-2">
              <span className="text-emerald-700 dark:text-emerald-300 mt-0.5">✓</span>
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
          {t('common.viewDetails')}
        </Link>
      </div>
    </article>
  );
}
