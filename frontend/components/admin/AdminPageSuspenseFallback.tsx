'use client';

import { useLocale } from '@/components/providers/LocaleProvider';

/** Localized loading shell for admin routes wrapped in `Suspense`. */
export default function AdminPageSuspenseFallback() {
  const { t } = useLocale();
  return (
    <div className="glass p-8 rounded-2xl text-white/70" role="status">
      {t('admin.pageLoading')}
    </div>
  );
}
