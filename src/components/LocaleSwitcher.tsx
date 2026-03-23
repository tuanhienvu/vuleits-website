'use client';

import Image from 'next/image';
import { useLocale, type Locale } from '@/components/providers/LocaleProvider';

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
    'rounded-lg border border-white/30 bg-white/10 px-2 py-1.5 text-sm text-white hover:bg-white/15';
  const fullWidth = Boolean(className?.includes('w-full'));

  const flagWrapBase = alignWithProfileAvatar
    ? 'relative h-10 shrink-0 overflow-hidden rounded-lg ring-1 aspect-[3/2]'
    : 'relative h-5 w-7 shrink-0 overflow-hidden rounded-sm ring-1';
  const flagWrapTrigger = `${flagWrapBase} shadow-sm ring-black/20`;
  const imgW = alignWithProfileAvatar ? 60 : 28;
  const imgH = alignWithProfileAvatar ? 40 : 20;

  const nextLocale: Locale = locale === 'en-US' ? 'vi-VN' : 'en-US';

  function toggle() {
    setLocale(nextLocale);
  }

  const ariaLabel =
    locale === 'en-US' ? t('lang.toggleToVietnamese') : t('lang.toggleToEnglish');

  return (
    <div className={fullWidth ? 'relative block w-full' : 'relative inline-block'}>
      <button
        type="button"
        className={`flex items-center justify-center text-sm text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 ${fullWidth ? 'w-full' : ''} ${triggerClass}`}
        onClick={toggle}
        aria-label={ariaLabel}
        title={ariaLabel}
      >
        <span className={flagWrapTrigger}>
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
