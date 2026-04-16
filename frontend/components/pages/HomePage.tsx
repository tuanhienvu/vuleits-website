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

const FALLBACK_FEATURES: Record<'en-US' | 'vi-VN', HomeFeature[]> = {
  'en-US': [
    {
      icon: '✨',
      title: 'Modern Design',
      description:
        'Beautiful glass morphism effects with backdrop blur and translucent elements that create depth and visual hierarchy.',
    },
    {
      icon: '⚡',
      title: 'Fast Performance',
      description:
        'Optimized animations and effects that maintain smooth 60fps performance across all modern browsers and devices.',
    },
    {
      icon: '📱',
      title: 'Responsive',
      description:
        'Fully responsive design that adapts beautifully to any screen size, from mobile phones to desktop displays.',
    },
    {
      icon: '🎨',
      title: 'Interactive UI',
      description:
        'Engaging hover effects, smooth transitions, and micro-animations that create delightful user experiences.',
    },
    {
      icon: '🔒',
      title: 'Secure & Safe',
      description:
        'Built with modern security standards and best practices to ensure your data and user privacy are protected.',
    },
    {
      icon: '🚀',
      title: 'Easy Integration',
      description:
        'Simple to implement and customize for any project with clean, well-documented code and flexible components.',
    },
  ],
  'vi-VN': [
    {
      icon: '✨',
      title: 'Thiết kế hiện đại',
      description:
        'Hiệu ứng kính mờ đẹp mắt cùng lớp nền trong suốt tạo chiều sâu và hệ thống phân cấp thị giác rõ ràng.',
    },
    {
      icon: '⚡',
      title: 'Hiệu năng nhanh',
      description:
        'Hoạt ảnh và hiệu ứng được tối ưu để duy trì trải nghiệm mượt mà trên các trình duyệt và thiết bị hiện đại.',
    },
    {
      icon: '📱',
      title: 'Tương thích đa thiết bị',
      description:
        'Thiết kế đáp ứng linh hoạt, hiển thị đẹp từ điện thoại di động đến màn hình máy tính để bàn.',
    },
    {
      icon: '🎨',
      title: 'Giao diện tương tác',
      description:
        'Hiệu ứng hover, chuyển động mượt và vi tương tác giúp trải nghiệm sử dụng trở nên sinh động hơn.',
    },
    {
      icon: '🔒',
      title: 'Bảo mật an toàn',
      description:
        'Xây dựng theo các tiêu chuẩn bảo mật hiện đại để bảo vệ dữ liệu và quyền riêng tư của người dùng.',
    },
    {
      icon: '🚀',
      title: 'Dễ dàng tích hợp',
      description:
        'Dễ triển khai và tùy biến cho nhiều dự án nhờ cấu trúc mã rõ ràng, linh hoạt và có thể mở rộng.',
    },
  ],
};

// --- Sections: Branding & features fetch | Hero | Features grid (see JSX markers) ---

function normalizeHomeFeatures(raw: unknown): HomeFeature[] {
  return safeArray<unknown>(raw).map((item) => {
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
  const { companyName, slogan } = useCompanyBranding();
  const tagline = slogan || t('nav.tagline');

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

  const fallbackFeatures = useMemo(() => FALLBACK_FEATURES[locale], [locale]);
  const [features, setFeatures] = useState<HomeFeature[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(apiPath('home/features'));
        if (!res.ok) return;
        const data = await res.json();
        const normalized = normalizeHomeFeatures(data);
        if (!cancelled && normalized.length > 0) {
          setFeatures(normalized);
        }
      } catch {
        // keep fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

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
            {locale === 'vi-VN' ? 'Tìm hiểu thêm' : 'Learn More'}
          </Link>
        </div>
        
        {/* Hero Image Area — image from About intro (admin); placeholder if unset */}
        <div className="relative w-full md:flex-1 aspect-4/3 sm:aspect-video min-h-56 md:min-h-64 rounded-2xl overflow-hidden flex items-center justify-center bg-(--hero-media-bg) border border-(--hero-media-border)">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={
                heroImageAlt ||
                (locale === 'vi-VN' ? 'Hình minh họa trang chủ' : 'Home page illustration')
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
          {(features ?? fallbackFeatures).map((feature, index) => (
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
