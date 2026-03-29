'use client';

import Link from 'next/link';
import DetailBackButton from '@/components/navigation/DetailBackButton';
import RelatedItemsFlipRow from '@/components/related/RelatedItemsFlipRow';
import type { ServiceDetailResponse } from '@/lib/services/types';

// --- Sections: Back + breadcrumb | Header | Description | Features | Related ---

export default function ServiceDetailClient({ initial }: { initial: ServiceDetailResponse }) {
  const { service, related } = initial;

  return (
    <div className="container mx-auto px-4 py-8 pb-16">
      {/* ==================== BACK & BREADCRUMB ==================== */}
      <DetailBackButton fallbackHref="/services" />
      <nav className="text-sm text-white/60 mb-6" aria-label="Breadcrumb">
        <Link href="/services" className="hover:text-white transition-colors">
          Services
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/90">{service.title}</span>
      </nav>

      {/* ==================== SERVICE HEADER ==================== */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{service.icon || '🧩'}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{service.title}</h1>
        </div>
      </header>

      {/* ==================== DESCRIPTION (HTML) ==================== */}
      <section className="glass rounded-2xl border border-white/10 p-6 md:p-8 mb-10">
        <div
          className="text-white/85 leading-relaxed [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />
      </section>

      {/* ==================== FEATURE LIST ==================== */}
      {service.features.length > 0 ? (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-4">Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {service.features.map((f, idx) => (
              <li key={idx} className="glass rounded-xl p-4 text-white/80 flex gap-2">
                <span className="text-emerald-300 mt-0.5">✓</span>
                <span dangerouslySetInnerHTML={{ __html: f }} />
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* ==================== RELATED SERVICES ==================== */}
      {related.length > 0 ? (
        <section className="border-t border-white/10 pt-10">
          <h2 className="mb-6 text-2xl font-bold text-white">Related services</h2>
          <RelatedItemsFlipRow
            items={related}
            renderItem={(r) => (
              <Link
                href={`/services/${r.id}`}
                className="glass flex h-full min-h-[160px] flex-col rounded-2xl border border-white/10 p-4 transition hover:border-white/25 sm:min-h-[180px] sm:p-5"
              >
                <div className="mb-2 flex items-start gap-2 sm:gap-3">
                  <span className="shrink-0 text-2xl sm:text-3xl">{r.icon || '🧩'}</span>
                  <h3 className="line-clamp-2 text-base font-semibold text-white sm:text-lg">{r.title}</h3>
                </div>
                <div
                  className="line-clamp-3 text-xs text-white/70 sm:text-sm [&_p]:inline"
                  dangerouslySetInnerHTML={{ __html: r.description }}
                />
              </Link>
            )}
          />
        </section>
      ) : null}
    </div>
  );
}
