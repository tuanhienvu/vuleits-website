'use client';

import HospitalityFeaturesAdminPanel from '@/components/admin/HospitalityFeaturesAdminPanel';
import HospitalityRevenueOpsPanel from '@/components/admin/HospitalityRevenueOpsPanel';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function AdminPortalSettingsPage() {
  const { t } = useLocale();
  const { can } = useAdminPermissions();

  if (!can('uiTexts', 'read')) {
    return <div className="glass p-6 rounded-2xl text-white/80">{t('admin.aboutUsNoPermission')}</div>;
  }

  return (
    <div className="space-y-2 w-full">
      <h2 className="text-2xl font-semibold text-white mb-2">{t('admin.portalSettings')}</h2>
      <HospitalityFeaturesAdminPanel />
      <HospitalityRevenueOpsPanel />
    </div>
  );
}
