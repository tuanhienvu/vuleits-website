'use client';

import { useLocale, type Locale } from '@/components/providers/LocaleProvider';

interface LocaleSwitcherProps {
  className?: string;
}

export default function LocaleSwitcher({ className }: LocaleSwitcherProps) {
  const { locale, setLocale, t } = useLocale();

  return (
    <select
      value={locale}
      onChange={(e) => setLocale(e.target.value as Locale)}
      className={className ?? 'bg-white/20 border border-white/30 text-white px-2 py-1 rounded text-sm'}
      aria-label="Language"
    >
      <option value="en-US" className="bg-gray-800 text-white">
        {t('lang.english')}
      </option>
      <option value="vi-VN" className="bg-gray-800 text-white">
        {t('lang.vietnamese')}
      </option>
    </select>
  );
}

