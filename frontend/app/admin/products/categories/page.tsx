'use client';

import CategoriesAdminPanel from '@/components/admin/CategoriesAdminPanel';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function AdminProductsCategoriesPage() {
  const { t } = useLocale();

  return (
    <div className="space-y-2 w-full">
      <h2 className="text-2xl font-semibold text-white mb-2">{t('admin.categories')}</h2>
      <CategoriesAdminPanel />
    </div>
  );
}
