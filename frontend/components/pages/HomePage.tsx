'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { safeArray } from '@/lib/safe-array';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useCompanyBranding } from '@/hooks/useCompanyBranding';
import { defaultAboutIntroPayload, toPublicIntro } from '@/lib/aboutIntroSetting';
import { apiPath } from '@/lib/apiRoutes';
import Link from 'next/link';

type HomeFeature = { icon: string; title: string; description: string };

// --- Sections: Branding & features fetch | Hero | Features grid (see JSX markers) ---

function normalizeHomeFeatures(raw: unknown): HomeFeature[] {
  const source =
    raw && typeof raw === 'object' && !Array.isArray(raw)
      ? (raw as { items?: unknown }).items
      : raw;
  return safeArray<unknown>(source).map((item) => {
    const f = item as Record<string, unknown>;
    return {
      icon: String(f.icon ?? ''),
      title: String(f.title ?? ''),
      description: String(f.description ?? ''),
    };
  });
}

export default function HomePage() {
  const { t, locale } = useLocale();
  const { companyName } = useCompanyBranding();
  const tagline = t('nav.tagline');

  const introHeroFallback = useMemo(
    () => toPublicIntro(defaultAboutIntroPayload(), locale),
    [locale],
  );
  /** When `locale` matches, fields are from GET `about/intro` (see `apiPath`); otherwise render uses `introHeroFallback` until the new fetch completes. */
  const [heroFromApi, setHeroFromApi] = useState<{
    locale: string;
    url: string | null;
    alt: string;
  } | null>(null);

  const heroImageUrl =
    heroFromApi && heroFromApi.locale === locale ? heroFromApi.url : introHeroFallback.heroImageUrl;
  const heroImageAlt =
    heroFromApi && heroFromApi.locale === locale ? heroFromApi.alt : introHeroFallback.heroImageAlt;

  const fallbackFeatures = useMemo(
    () => [
      {
        icon: '✨',
        title: t('home.featureModernDesignTitle'),
        description: t('home.featureModernDesignDesc'),
      },
      {
        icon: '⚡',
        title: t('home.featureFastPerformanceTitle'),
        description: t('home.featureFastPerformanceDesc'),
      },
      {
        icon: '📱',
        title: t('home.featureResponsiveTitle'),
        description: t('home.featureResponsiveDesc'),
      },
      {
        icon: '🎨',
        title: t('home.featureInteractiveUiTitle'),
        description: t('home.featureInteractiveUiDesc'),
      },
      {
        icon: '🔒',
        title: t('home.featureSecureSafeTitle'),
        description: t('home.featureSecureSafeDesc'),
      },
      {
        icon: '🚀',
        title: t('home.featureEasyIntegrationTitle'),
        description: t('home.featureEasyIntegrationDesc'),
      },
    ],
    [t],
  );
  const [features, setFeatures] = useState<HomeFeature[] | null>(null);
  const [featuresLoading, setFeaturesLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    // Reset to locale-specific fallback immediately so the language switch is visible
    // even before the localized API payload returns.
    setFeatures(null);
    setFeaturesLoading(true);
    (async () => {
      try {
        const res = await fetch(`${apiPath('home/features')}?locale=${encodeURIComponent(locale)}`);
        if (!res.ok) return;
        const data = await res.json();
        const normalized = normalizeHomeFeatures(data);
        if (!cancelled) {
          setFeatures(normalized.length > 0 ? normalized : null);
        }
      } catch {
        // keep fallback
      } finally {
        if (!cancelled) setFeaturesLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${apiPath('about/intro')}?locale=${encodeURIComponent(locale)}`);
        if (!res.ok) return;
        const j = (await res.json()) as Record<string, unknown>;
        const url =
          j.heroImageUrl != null && String(j.heroImageUrl).trim() ? String(j.heroImageUrl).trim() : null;
        const alt = typeof j.heroImageAlt === 'string' ? j.heroImageAlt : '';
        if (!cancelled) setHeroFromApi({ locale, url, alt });
      } catch {
        // keep derived fallback from `introHeroFallback` while `heroFromApi` is stale or null
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <div className="container mx-auto px-4">
      {/* ==================== HERO SECTION ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-12 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1">
          <h1 className="text-5xl md:text-6xl font-bold text-fg mb-2 leading-tight font-zcool tracking-wide">
            {companyName}
          </h1>
          <p className="text-2xl md:text-3xl text-(--brand-accent) mb-6 font-zcool tracking-wide">
            {tagline}
          </p>
          <p className="text-fg-muted text-lg mb-6">{t('home.heroIntro')}</p>
          <Link href="/about" prefetch={false} className="public-cta-button inline-block text-center">
            {t('about.learnMore')}
          </Link>
        </div>
        
        {/* Hero Image Area — image from About intro (admin); placeholder if unset */}
        <div className="relative w-full md:flex-1 aspect-4/3 sm:aspect-video min-h-56 md:min-h-64 rounded-2xl overflow-hidden flex items-center justify-center bg-(--hero-media-bg) border border-(--hero-media-border)">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={
                heroImageAlt || t('home.heroImageAlt')
              }
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              unoptimized={/^https?:\/\//i.test(heroImageUrl)}
              priority
            />
          ) : (
            <div className="text-6xl">🎨</div>
          )}
        </div>
      </section>

      {/* ==================== FEATURES GRID SECTION ==================== */}
      <section className="mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuresLoading
            ? Array.from({ length: 6 }).map((_, index) => (
                <div key={`feature-skeleton-${index}`} className="glass p-6 rounded-2xl animate-pulse">
                  <div className="h-9 w-9 rounded-md bg-white/15 mb-4" />
                  <div className="h-6 w-2/3 rounded bg-white/15 mb-3" />
                  <div className="space-y-2">
                    <div className="h-3.5 w-full rounded bg-white/10" />
                    <div className="h-3.5 w-5/6 rounded bg-white/10" />
                    <div className="h-3.5 w-4/6 rounded bg-white/10" />
                  </div>
                </div>
              ))
            : (features ?? fallbackFeatures).map((feature, index) => (
                <div key={index} className="glass p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
                  <div className="text-4xl mb-3">{feature.icon}</div>
                  <h3 className="text-fg font-semibold text-xl mb-2">{feature.title}</h3>
                  <div
                    className="text-fg-muted"
                    // Allow embedded HTML/CSS/JS snippets pasted from the admin textarea.
                    dangerouslySetInnerHTML={{ __html: feature.description || '' }}
                  />
                </div>
              ))}
        </div>
      </section>
    </div>
  );
}
