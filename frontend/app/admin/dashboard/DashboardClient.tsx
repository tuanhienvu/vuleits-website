'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useLocale } from '@/components/providers/LocaleProvider';

function AdminPanelFallback() {
  return (
    <div className="glass p-8 rounded-2xl space-y-3 motion-safe:animate-pulse" role="status" aria-busy>
      <span className="sr-only">Loading panel</span>
      <div className="h-8 w-44 rounded-lg bg-white/10" />
      <div className="h-4 w-full max-w-md rounded bg-white/5" />
      <div className="h-4 w-full max-w-sm rounded bg-white/5" />
    </div>
  );
}

/* Turbopack production build requires an object literal as `dynamic()` options (not a shared const). */
const NewsAdminPanel = dynamic(() => import('@/components/admin/NewsAdminPanel'), {
  loading: () => <AdminPanelFallback />,
});
const ServicesAdminPanel = dynamic(() => import('@/components/admin/ServicesAdminPanel'), {
  loading: () => <AdminPanelFallback />,
});
const MediaAdminPanel = dynamic(() => import('@/components/admin/MediaAdminPanel'), {
  loading: () => <AdminPanelFallback />,
});
const HomeFeaturesAdminPanel = dynamic<{ heading: string }>(
  () => import('@/components/admin/HomeFeaturesAdminPanel'),
  { loading: () => <AdminPanelFallback /> },
);
const ProductsAdminPanel = dynamic(() => import('@/components/admin/ProductsAdminPanel'), {
  loading: () => <AdminPanelFallback />,
});
const UsersAdminPanel = dynamic(() => import('@/components/admin/UsersAdminPanel'), {
  loading: () => <AdminPanelFallback />,
});
const PermissionsAdminPanel = dynamic(() => import('@/components/admin/PermissionsAdminPanel'), {
  loading: () => <AdminPanelFallback />,
});
const ContactsAdminPanel = dynamic(() => import('@/components/admin/ContactsAdminPanel'), {
  loading: () => <AdminPanelFallback />,
});
const AboutTeamAdminPanel = dynamic(() => import('@/components/admin/AboutTeamAdminPanel'), {
  loading: () => <AdminPanelFallback />,
});
const AboutStatsAdminPanel = dynamic(() => import('@/components/admin/AboutStatsAdminPanel'), {
  loading: () => <AdminPanelFallback />,
});
const TranslationsAdminPanel = dynamic(() => import('@/components/admin/TranslationsAdminPanel'), {
  loading: () => <AdminPanelFallback />,
});

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
  'uiTexts',
  'contacts',
  'aboutTeam',
  'aboutStats',
]);

// --- DashboardClient: tab router (permission gates + panel mount) | OverviewPanel: count cards ---

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

  if (activeTab === 'uiTexts') {
    if (!can('uiTexts', 'read')) {
      return <div className="glass p-6 rounded-2xl text-white/80">You do not have permission to view this section.</div>;
    }
    return <TranslationsAdminPanel />;
  }

  if (!can(activeTab as Parameters<typeof can>[0], 'read')) {
    return <div className="glass p-6 rounded-2xl text-white/80">You do not have permission to view this section.</div>;
  }

  if (activeTab === 'overview') return <OverviewPanel />;
  if (activeTab === 'media') return <MediaAdminPanel />;
  if (activeTab === 'banners') return <HomeFeaturesAdminPanel heading="Banners (home features)" />;
  if (activeTab === 'homeFeatures') return <HomeFeaturesAdminPanel heading="Home features" />;
  if (activeTab === 'products') return <ProductsAdminPanel />;
  if (activeTab === 'users') return <UsersAdminPanel />;
  if (activeTab === 'permissions') return <PermissionsAdminPanel />;
  if (activeTab === 'contacts') return <ContactsAdminPanel />;
  if (activeTab === 'aboutTeam') return <AboutTeamAdminPanel />;
  if (activeTab === 'aboutStats') return <AboutStatsAdminPanel />;

  // --- Fallback placeholder tab (unknown or future tab id) ---
  return (
    <section className="glass p-6 rounded-2xl">
      <h2 className="text-2xl font-semibold text-white mb-3">{title}</h2>
      <p className="text-white/75">
        This section is available and connected to the admin shell. Select <span className="font-semibold">News</span> in sidebar to manage content.
      </p>
    </section>
  );
}

// --- OverviewPanel: aggregate counts from admin/public list endpoints ---

function OverviewPanel() {
  const { t } = useLocale();
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState<Array<{ label: string; value: number }>>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      setLoading(true);
      const tasks: Array<{ label: string; url: string; arrayField?: string }> = [
        { label: 'News', url: '/api/admin/news?take=1' },
        { label: 'Services', url: '/api/admin/services' },
        { label: 'Media', url: '/api/admin/media?take=1&imagesOnly=0' },
        { label: 'Users', url: '/api/admin/users' },
        { label: 'Home Features', url: '/api/admin/home-features' },
        { label: 'Products', url: '/api/products?take=1', arrayField: 'items' },
      ];
      const vals = await Promise.all(
        tasks.map(async (t) => {
          try {
            const r = await fetch(t.url, { credentials: 'include' });
            if (!r.ok) return { label: t.label, value: 0 };
            const j = (await r.json()) as unknown;
            if (t.url.includes('/api/admin/news') && typeof j === 'object' && j && Array.isArray((j as { items?: unknown }).items)) {
              return { label: t.label, value: Number((j as { total?: unknown }).total) || (j as { items: unknown[] }).items.length };
            }
            if (t.arrayField && typeof j === 'object' && j) {
              const arr = (j as Record<string, unknown>)[t.arrayField];
              return { label: t.label, value: Array.isArray(arr) ? arr.length : 0 };
            }
            return { label: t.label, value: Array.isArray(j) ? j.length : 0 };
          } catch {
            return { label: t.label, value: 0 };
          }
        }),
      );
      if (mounted) {
        setCounts(vals);
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="glass p-6 rounded-2xl">
      {/* ==================== OVERVIEW HEADING ==================== */}
      <h2 className="text-2xl font-semibold text-white mb-4">{t('admin.overview')}</h2>
      {/* ==================== COUNT CARDS GRID ==================== */}
      {loading ? (
        <p className="text-white/70">{t('admin.overviewLoadingData')}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {counts.map((c) => (
            <div key={c.label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-white/65 text-sm">{c.label}</p>
              <p className="text-white text-2xl font-semibold mt-1">{c.value}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
