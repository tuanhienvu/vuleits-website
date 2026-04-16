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
    'rounded-lg border border-[color:var(--locale-switch-border)] bg-[color:var(--locale-switch-bg)] px-2 py-1.5 text-sm text-(--text-primary) hover:bg-[color:var(--locale-switch-bg-hover)]';
  const fullWidth = Boolean(className?.includes('w-full'));

  const flagWrapBase = alignWithProfileAvatar
    ? 'relative h-10 shrink-0 overflow-hidden rounded-lg ring-1 aspect-[3/2]'
    : 'relative h-5 w-7 shrink-0 overflow-hidden rounded-sm ring-1';
  const flagWrapTrigger = `${flagWrapBase} shadow-sm ring-black/20`;
  const imgW = alignWithProfileAvatar ? 60 : 28;
  const imgH = alignWithProfileAvatar ? 40 : 20;

  const nextLocale: Locale = locale === 'en-US' ? 'vi-VN' : 'en-US';
  const currentLabel = locale === 'en-US' ? 'EN' : 'VI';

  function toggle() {
    setLocale(nextLocale);
  }

  const ariaLabel =
    locale === 'en-US' ? t('lang.toggleToVietnamese') : t('lang.toggleToEnglish');

  return (
    <div className={fullWidth ? 'relative block w-full' : 'relative inline-block'}>
      <button
        type="button"
        className={`flex items-center justify-center text-sm text-(--text-primary) transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-(--text-primary)/25 ${fullWidth ? 'w-full' : ''} ${triggerClass}`}
        onClick={toggle}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <span className={`${flagWrapTrigger} ${fullWidth ? 'mr-2' : 'mr-1.5'}`}>
          <Image
            src={FLAG[locale].src}
            alt=""
            width={imgW}
            height={imgH}
            className="h-full w-full object-cover object-center"
          />
        </span>
        <span className={`${alignWithProfileAvatar ? 'text-sm font-medium' : 'text-xs font-semibold'} tracking-wide`}>
          {currentLabel}
        </span>
      </button>
    </div>
  );
}
