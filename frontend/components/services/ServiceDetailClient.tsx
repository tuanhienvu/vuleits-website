'use client';

import Link from 'next/link';
import type { ServiceDetailResponse } from '@/lib/services/types';

export default function ServiceDetailClient({ initial }: { initial: ServiceDetailResponse }) {
  const { service, related } = initial;

  return (
    <div className="container mx-auto px-4 py-8 pb-16">
      <nav className="text-sm text-white/60 mb-6" aria-label="Breadcrumb">
        <Link href="/services" className="hover:text-white transition-colors">
          Services
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/90">{service.title}</span>
      </nav>

      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-5xl">{service.icon || '🧩'}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">{service.title}</h1>
        </div>
      </header>

      <section className="glass rounded-2xl border border-white/10 p-6 md:p-8 mb-10">
        <div
          className="text-white/85 leading-relaxed [&_h1]:text-3xl [&_h2]:text-2xl [&_h3]:text-xl [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6"
          dangerouslySetInnerHTML={{ __html: service.description }}
        />
      </section>

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

      {related.length > 0 ? (
        <section className="border-t border-white/10 pt-10">
          <h2 className="text-2xl font-bold text-white mb-6">Related services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((r) => (
              <Link
                key={r.id}
                href={`/services/${r.id}`}
                className="glass rounded-2xl p-5 border border-white/10 hover:border-white/25 transition"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-3xl">{r.icon || '🧩'}</span>
                  <h3 className="text-white font-semibold text-lg">{r.title}</h3>
                </div>
                <div className="text-white/70 text-sm line-clamp-3" dangerouslySetInnerHTML={{ __html: r.description }} />
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
