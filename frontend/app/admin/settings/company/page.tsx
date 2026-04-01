'use client';

import { Suspense, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminSettingsTabs from '@/components/admin/AdminSettingsTabs';
import CompanyProfileAdminPanel from '@/components/admin/CompanyProfileAdminPanel';
import ContactMessagesAdminPanel from '@/components/admin/ContactMessagesAdminPanel';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useAdminCompanyProfileNav } from '@/hooks/useAdminCompanyProfileNav';

function CompanySettingsContent() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { can } = useAdminPermissions();
  const showCompanyProfileTab = useAdminCompanyProfileNav();
  const canInbox = can('contacts', 'read');

  const tabs = useMemo(() => {
    const out: { id: string; label: string }[] = [];
    if (showCompanyProfileTab) out.push({ id: 'profile', label: t('admin.companyProfile') });
    if (canInbox) out.push({ id: 'inbox', label: t('admin.contactInbox') });
    return out;
  }, [showCompanyProfileTab, canInbox, t]);

  const rawTab = searchParams.get('tab') || '';
  const defaultTab = showCompanyProfileTab ? 'profile' : 'inbox';
  const activeTab = tabs.some((x) => x.id === rawTab) ? rawTab : defaultTab;

  useEffect(() => {
    if (tabs.length === 0) return;
    if (!tabs.some((x) => x.id === rawTab)) {
      const first = tabs.some((x) => x.id === defaultTab) ? defaultTab : tabs[0].id;
      router.replace(`/admin/settings/company?tab=${encodeURIComponent(first)}`);
    }
  }, [tabs, rawTab, router, defaultTab]);

  if (tabs.length === 0) {
    return <div className="glass p-6 rounded-2xl text-white/80">{t('admin.aboutUsNoPermission')}</div>;
  }

  return (
    <div className="space-y-2 w-full">
      <h2 className="text-2xl font-semibold text-white mb-2">{t('admin.settingsNavCompany')}</h2>
      <AdminSettingsTabs basePath="/admin/settings/company" tabs={tabs} activeId={activeTab} />
      {activeTab === 'profile' ? <CompanyProfileAdminPanel /> : null}
      {activeTab === 'inbox' ? <ContactMessagesAdminPanel /> : null}
    </div>
  );
}

function Fallback() {
  return (
    <div className="glass p-8 rounded-2xl text-white/70" role="status">
      Loading…
    </div>
  );
}

export default function AdminSettingsCompanyPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <CompanySettingsContent />
    </Suspense>
  );
}
