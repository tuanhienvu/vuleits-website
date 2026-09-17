'use client';

import Link from 'next/link';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function TeamMemberCvNotFound() {
  const { t } = useLocale();

  return (
    <div className="container mx-auto flex max-w-3xl flex-1 items-center px-4 py-16">
      <section className="glass w-full p-8 text-center sm:p-12" aria-labelledby="cv-not-found-title">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-(--brand-accent)">404</p>
        <h1 id="cv-not-found-title" className="text-3xl font-bold text-fg sm:text-4xl">
          {t('cv.notFound')}
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-fg-muted">{t('cv.notFoundDescription')}</p>
        <Link href="/about" className="public-cta-button mt-8 px-6 py-2.5 text-sm">
          {t('cv.backToTeam')}
        </Link>
      </section>
    </div>
  );
}
