'use client';

import AuditLogsAdminPanel from '@/components/admin/AuditLogsAdminPanel';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useLocale } from '@/components/providers/LocaleProvider';

export default function AdminAuditLogsSettingsPage() {
  const { t } = useLocale();
  const { can } = useAdminPermissions();

  if (!can('auditLogs', 'read')) {
    return <div className="glass p-6 rounded-2xl text-white/80">{t('admin.aboutUsNoPermission')}</div>;
  }

  return (
    <div className="space-y-2 w-full">
      <h2 className="text-2xl font-semibold text-white mb-2">{t('admin.logsPageTitle')}</h2>
      <AuditLogsAdminPanel />
    </div>
  );
}
