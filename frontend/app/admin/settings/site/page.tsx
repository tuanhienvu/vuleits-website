'use client';

import { Suspense, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminSettingsTabs from '@/components/admin/AdminSettingsTabs';
import LegalPageAdminPanel from '@/components/admin/LegalPageAdminPanel';
import TranslationsAdminPanel from '@/components/admin/TranslationsAdminPanel';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useLocale } from '@/components/providers/LocaleProvider';

function SiteSettingsContent() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { can } = useAdminPermissions();

  const canLegal = can('aboutTeam', 'read');
  const canUi = can('uiTexts', 'read');

  const tabs = useMemo(() => {
    const out: { id: string; label: string }[] = [];
    if (canLegal) {
      out.push({ id: 'privacy', label: t('admin.privacyPolicy') });
      out.push({ id: 'terms', label: t('admin.termsOfService') });
    }
    if (canUi) out.push({ id: 'ui', label: t('admin.uiMessages') });
    return out;
  }, [canLegal, canUi, t]);

  const rawTab = searchParams.get('tab') || '';
  const activeTab = tabs.some((x) => x.id === rawTab) ? rawTab : (tabs[0]?.id ?? 'privacy');

  useEffect(() => {
    if (tabs.length === 0) return;
    if (rawTab === 'seoMarketing') {
      router.replace('/admin/settings/seo-marketing');
      return;
    }
    if (!tabs.some((x) => x.id === rawTab)) {
      router.replace(`/admin/settings/site?tab=${encodeURIComponent(tabs[0].id)}`);
    }
  }, [tabs, rawTab, router]);

  if (tabs.length === 0) {
    return <div className="glass p-6 rounded-2xl text-white/80">{t('admin.aboutUsNoPermission')}</div>;
  }

  return (
    <div className="space-y-2 w-full">
      <h2 className="text-2xl font-semibold text-white mb-2">{t('admin.settingsNavSite')}</h2>
      <AdminSettingsTabs basePath="/admin/settings/site" tabs={tabs} activeId={activeTab} />
      {activeTab === 'privacy' ? <LegalPageAdminPanel kind="privacy" /> : null}
      {activeTab === 'terms' ? <LegalPageAdminPanel kind="terms" /> : null}
      {activeTab === 'ui' ? <TranslationsAdminPanel /> : null}
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

export default function AdminSettingsSitePage() {
  return (
    <Suspense fallback={<Fallback />}>
      <SiteSettingsContent />
    </Suspense>
  );
}
