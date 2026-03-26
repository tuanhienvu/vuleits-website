'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import NewsAdminPanel from '@/components/admin/NewsAdminPanel';
import ServicesAdminPanel from '@/components/admin/ServicesAdminPanel';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';

const SUPPORTED_TABS = new Set([
  'overview',
  'news',
  'media',
  'banners',
  'services',
  'products',
  'users',
  'permissions',
  'homeFeatures',
  'contacts',
  'aboutTeam',
  'aboutStats',
]);

export default function DashboardClient() {
  const searchParams = useSearchParams();
  const { can } = useAdminPermissions();
  const tab = searchParams.get('tab') || 'overview';
  const activeTab = SUPPORTED_TABS.has(tab) ? tab : 'overview';

  const title = useMemo(() => {
    if (activeTab === 'overview') return 'Overview';
    if (activeTab === 'news') return 'News Management';
    if (activeTab === 'services') return 'Services Management';
    return `Module: ${activeTab}`;
  }, [activeTab]);

  if (activeTab === 'news') {
    if (!can('news', 'read')) {
      return <div className="glass p-6 rounded-2xl text-white/80">You do not have permission to view this section.</div>;
    }
    return <NewsAdminPanel />;
  }

  if (activeTab === 'services') {
    if (!can('services', 'read')) {
      return <div className="glass p-6 rounded-2xl text-white/80">You do not have permission to view this section.</div>;
    }
    return <ServicesAdminPanel />;
  }

  return (
    <section className="glass p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold text-white mb-3">{title}</h2>
      <p className="text-white/75">
        This section is available and connected to the admin shell. Select <span className="font-semibold">News</span> in sidebar to manage content.
      </p>
    </section>
  );
}
