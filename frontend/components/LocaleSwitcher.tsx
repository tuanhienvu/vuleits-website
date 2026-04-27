'use client';

import Image from 'next/image';
import { useLocale, type Locale } from '@/components/providers/LocaleProvider';

// --- Section: EN/VI toggle with flag assets ---

const FLAG: Record<Locale, { src: string }> = {
  'en-US': { src: '/flags/us.svg' },
  'vi-VN': { src: '/flags/vn.svg' },
};

interface LocaleSwitcherProps {
  className?: string;
  /** Match admin header user avatar height (h-10 / 40px); flag width follows ~3:2 aspect. */
  alignWithProfileAvatar?: boolean;
}

export default function LocaleSwitcher({ className, alignWithProfileAvatar }: LocaleSwitcherProps) {
  const { locale, setLocale, t } = useLocale();

  const triggerClass =
    className ??
    'p-0 bg-transparent border-0 text-(--text-primary)';
  const fullWidth = Boolean(className?.includes('w-full'));

  const flagWrapBase = alignWithProfileAvatar
    ? 'relative h-10 shrink-0 overflow-hidden rounded-lg aspect-[3/2]'
    : 'relative h-5 w-7 shrink-0 overflow-hidden rounded-sm';
  const imgW = alignWithProfileAvatar ? 60 : 28;
  const imgH = alignWithProfileAvatar ? 40 : 20;

  const nextLocale: Locale = locale === 'en-US' ? 'vi-VN' : 'en-US';

  function toggle() {
    setLocale(nextLocale);
  }

  const ariaLabel =
    locale === 'en-US' ? t('lang.toggleToVietnamese') : t('lang.toggleToEnglish');

  return (
    <div className={fullWidth ? 'relative block w-full' : 'relative inline-block pt-1'}>
      <button
        type="button"
        className={`inline-flex items-center justify-center text-sm text-(--text-primary) transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-(--text-primary)/25 ${fullWidth ? 'w-full' : ''} ${triggerClass}`}
        onClick={toggle}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <span className={flagWrapBase}>
          <Image
            src={FLAG[locale].src}
            alt=""
            width={imgW}
            height={imgH}
            className="h-full w-full object-cover object-center"
          />
        </span>
      </button>
    </div>
  );
}
