'use client';

import ServicesListingExperience from '@/components/services/ServicesListingExperience';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { ServicesListResponse } from '@/lib/services/types';

// --- Sections: Hero | ServicesListingExperience ---

export default function ServicesPage({ initialData = null }: { initialData?: ServicesListResponse | null }) {
  const { t } = useLocale();
  return (
    <div className="container mx-auto px-4">
      {/* ==================== SERVICES HERO ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-fg mb-4">{t('services.ourServices')}</h1>
        <p className="text-fg-muted text-lg">
          {t('services.heroSubtitle')}
        </p>
      </section>
      {/* ==================== SERVICES LISTING ==================== */}
      <ServicesListingExperience initialData={initialData} />
    </div>
  );
}
