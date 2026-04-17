'use client';

import dynamic from 'next/dynamic';
import { useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useLocale } from '@/components/providers/LocaleProvider';
import { apiPath } from '@/lib/apiRoutes';

/** Old dashboard ?tab= values → consolidated settings pages. */
const LEGACY_DASHBOARD_TAB_REDIRECTS: Record<string, string> = {
  contacts: '/admin/settings/company?tab=inbox',
  uiTexts: '/admin/settings/site?tab=ui',
  aboutTeam: '/admin/settings/about?tab=team',
  aboutStats: '/admin/settings/about?tab=stats',
};

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
]);

// --- DashboardClient: tab router (permission gates + panel mount) | OverviewPanel: count cards ---

export default function DashboardClient() {
  const { t } = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const { can } = useAdminPermissions();
  const tab = searchParams.get('tab') || 'overview';
  const legacyTarget = LEGACY_DASHBOARD_TAB_REDIRECTS[tab];
  const activeTab = SUPPORTED_TABS.has(tab) ? tab : 'overview';

  useEffect(() => {
    if (legacyTarget) router.replace(legacyTarget);
  }, [legacyTarget, router]);

  if (legacyTarget) {
    return <div className="glass p-6 rounded-2xl text-white/70">{t('admin.redirecting')}</div>;
  }

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
      const tasks: Array<{ label: string; url: string; arrayField?: string; totalField?: string }> = [
        { label: 'News', url: `${apiPath('admin/news')}?take=1` },
        { label: 'Services', url: apiPath('admin/services') },
        { label: 'Media', url: `${apiPath('admin/media')}?take=1&imagesOnly=0` },
        { label: 'Users', url: apiPath('admin/users') },
        { label: 'Home Features', url: apiPath('admin/home-features') },
        { label: 'Products', url: `${apiPath('products')}?take=1`, arrayField: 'items' },
        { label: 'Contact messages', url: `${apiPath('admin/contact-submissions')}?take=1&skip=0`, totalField: 'total' },
      ];
      const vals = await Promise.all(
        tasks.map(async (t) => {
          try {
            const r = await fetch(t.url, { credentials: 'include' });
            if (!r.ok) return { label: t.label, value: 0 };
            const j = (await r.json()) as unknown;
            if (t.url.includes(apiPath('admin/news')) && typeof j === 'object' && j && Array.isArray((j as { items?: unknown }).items)) {
              return { label: t.label, value: Number((j as { total?: unknown }).total) || (j as { items: unknown[] }).items.length };
            }
            if (t.totalField && typeof j === 'object' && j) {
              const raw = (j as Record<string, unknown>)[t.totalField];
              const n = typeof raw === 'number' ? raw : Number(raw);
              return { label: t.label, value: Number.isFinite(n) ? n : 0 };
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
