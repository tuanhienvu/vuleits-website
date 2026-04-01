'use client';

import { Suspense, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminSettingsTabs from '@/components/admin/AdminSettingsTabs';
import AboutIntroAdminPanel from '@/components/admin/AboutIntroAdminPanel';
import AboutTeamAdminPanel from '@/components/admin/AboutTeamAdminPanel';
import AboutStatsAdminPanel from '@/components/admin/AboutStatsAdminPanel';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useLocale } from '@/components/providers/LocaleProvider';

function AboutSettingsContent() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { can } = useAdminPermissions();

  const canAboutContent = can('aboutTeam', 'read');
  const canStats = can('aboutStats', 'read');

  const tabs = useMemo(() => {
    const out: { id: string; label: string }[] = [];
    if (canAboutContent) {
      out.push({ id: 'intro', label: t('admin.aboutUs') });
      out.push({ id: 'team', label: t('admin.aboutTeam') });
    }
    if (canStats) out.push({ id: 'stats', label: t('admin.aboutStats') });
    return out;
  }, [canAboutContent, canStats, t]);

  const rawTab = searchParams.get('tab') || '';
  const activeTab = tabs.some((x) => x.id === rawTab) ? rawTab : (tabs[0]?.id ?? 'intro');

  useEffect(() => {
    if (tabs.length === 0) return;
    if (!tabs.some((x) => x.id === rawTab)) {
      router.replace(`/admin/settings/about?tab=${encodeURIComponent(tabs[0].id)}`);
    }
  }, [tabs, rawTab, router]);

  if (tabs.length === 0) {
    return <div className="glass p-6 rounded-2xl text-white/80">{t('admin.aboutUsNoPermission')}</div>;
  }

  return (
    <div className="space-y-2 w-full">
      <h2 className="text-2xl font-semibold text-white mb-2">{t('admin.settingsNavAbout')}</h2>
      <AdminSettingsTabs basePath="/admin/settings/about" tabs={tabs} activeId={activeTab} />
      {activeTab === 'intro' ? <AboutIntroAdminPanel /> : null}
      {activeTab === 'team' ? <AboutTeamAdminPanel /> : null}
      {activeTab === 'stats' ? <AboutStatsAdminPanel /> : null}
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

export default function AdminSettingsAboutPage() {
  return (
    <Suspense fallback={<Fallback />}>
      <AboutSettingsContent />
    </Suspense>
  );
}
