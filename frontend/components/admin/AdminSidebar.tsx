'use client';

import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import BrandingLogo from '@/components/BrandingLogo';
import { useCompanyBranding } from '@/hooks/useCompanyBranding';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import type { AdminUiFeatureId } from '@/lib/adminPermissionModel';

type SidebarNavItem =
  | { kind: 'tab'; id: AdminUiFeatureId; label: string; icon: string; path: string }
  | {
      kind: 'page';
      id: 'companyProfile' | 'permissionsPage' | 'aboutUs' | 'privacyPolicy' | 'termsOfService';
      label: string;
      icon: string;
      path: string;
    };

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

// --- Sections: Desktop sidebar (brand, nav, collapse) | Mobile drawer | Shared nav groups ---

export default function AdminSidebar({ isOpen, onToggle, mobileOpen, onMobileToggle }: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t, locale } = useLocale();
  const { logoSrc, companyName, slogan } = useCompanyBranding();
  const brandSubtitle = slogan || t('admin.panel');
  const { can, loading: permsLoading } = useAdminPermissions();
  const allowTab = useCallback((id: AdminUiFeatureId) => permsLoading || can(id, 'read'), [permsLoading, can]);
  const [showCompanyProfileNav, setShowCompanyProfileNav] = useState(false);

  /** Only meaningful on `/admin/dashboard`; null elsewhere so tab items are not matched against default `overview`. */
  const activeTab = useMemo(() => {
    if (pathname !== '/admin/dashboard') return null;
    return searchParams.get('tab') || 'overview';
  }, [pathname, searchParams]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/admin/me', { credentials: 'include' });
        if (!res.ok || cancelled) return;
        const d = (await res.json()) as { role?: { name?: string } | null };
        const n = (d.role?.name || '').toUpperCase();
        if (!cancelled) setShowCompanyProfileNav(n === 'ADMIN' || n === 'SYSADMIN');
      } catch {
        if (!cancelled) setShowCompanyProfileNav(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const menuGroups: { id: string; label: string; items: SidebarNavItem[] }[] = useMemo(
    () => [
      {
        id: 'overview',
        label: t('admin.overview'),
        items: [
          { kind: 'tab', id: 'overview', label: t('admin.overview'), icon: '📊', path: '/admin/dashboard?tab=overview' },
        ],
      },
      {
        id: 'contents',
        label: t('admin.contents'),
        items: [
          { kind: 'tab', id: 'news', label: t('admin.news'), icon: '📰', path: '/admin/dashboard?tab=news' },
          { kind: 'tab', id: 'media', label: t('admin.media'), icon: '🖼️', path: '/admin/dashboard?tab=media' },
          { kind: 'tab', id: 'banners', label: t('admin.banners'), icon: '🎬', path: '/admin/dashboard?tab=banners' },
        ],
      },
      {
        id: 'products',
        label: t('admin.productGroup'),
        items: [
          { kind: 'tab', id: 'services', label: t('admin.services'), icon: '🧩', path: '/admin/dashboard?tab=services' },
          { kind: 'tab', id: 'products', label: t('admin.products'), icon: '📦', path: '/admin/dashboard?tab=products' },
        ],
      },
      {
        id: 'authority',
        label: t('admin.permissionGroup'),
        items: [
          { kind: 'tab', id: 'users', label: t('admin.users'), icon: '👥', path: '/admin/dashboard?tab=users' },
          { kind: 'page', id: 'permissionsPage', label: t('admin.permissions'), icon: '🔐', path: '/admin/permissions' },
        ],
      },
      {
        id: 'settings',
        label: t('admin.settings'),
        items: [
          {
            kind: 'page',
            id: 'companyProfile',
            label: t('admin.companyProfile'),
            icon: '🏢',
            path: '/admin/company-profile',
          },
          {
            kind: 'page',
            id: 'aboutUs',
            label: t('admin.aboutUs'),
            icon: '🎯',
            path: '/admin/about-us',
          },
          {
            kind: 'page',
            id: 'privacyPolicy',
            label: t('admin.privacyPolicy'),
            icon: '🛡️',
            path: '/admin/privacy-policy',
          },
          {
            kind: 'page',
            id: 'termsOfService',
            label: t('admin.termsOfService'),
            icon: '📜',
            path: '/admin/terms-of-service',
          },
          {
            kind: 'tab',
            id: 'uiTexts',
            label: t('admin.uiMessages'),
            icon: '🌐',
            path: '/admin/dashboard?tab=uiTexts',
          },
          { kind: 'tab', id: 'aboutTeam', label: t('admin.aboutTeam'), icon: '👤', path: '/admin/dashboard?tab=aboutTeam' },
          { kind: 'tab', id: 'aboutStats', label: t('admin.aboutStats'), icon: '📈', path: '/admin/dashboard?tab=aboutStats' },
        ],
      },
    ],
    [t],
  );

  const visibleGroups = useMemo(() => {
    const collator = new Intl.Collator(locale, { sensitivity: 'base' });
    const filtered = menuGroups
      .map((group) => ({
        ...group,
        items: group.items
          .filter((item) => {
            if (item.kind === 'page' && item.id === 'companyProfile') return showCompanyProfileNav;
            if (item.kind === 'page' && item.id === 'permissionsPage') return allowTab('permissions');
            if (item.kind === 'page' && item.id === 'aboutUs') return allowTab('aboutTeam');
            if (item.kind === 'page' && item.id === 'privacyPolicy') return allowTab('aboutTeam');
            if (item.kind === 'page' && item.id === 'termsOfService') return allowTab('aboutTeam');
            if (item.kind === 'tab') return allowTab(item.id);
            return false;
          })
          .sort((a, b) => collator.compare(a.label, b.label)),
      }))
      .filter((g) => g.items.length > 0);

    const byLabel = [...filtered].sort((a, b) => collator.compare(a.label, b.label));
    const overview = byLabel.find((g) => g.id === 'overview');
    const contents = byLabel.find((g) => g.id === 'contents');
    const authority = byLabel.find((g) => g.id === 'authority');

    const baseOrdered = [...byLabel];
    if (overview && contents) {
      const overviewIdx = baseOrdered.findIndex((g) => g.id === 'overview');
      const contentsIdx = baseOrdered.findIndex((g) => g.id === 'contents');
      if (overviewIdx > contentsIdx && contentsIdx >= 0) {
        baseOrdered.splice(overviewIdx, 1);
        baseOrdered.splice(contentsIdx, 0, overview);
      }
    }

    if (!authority) return baseOrdered;

    const withoutAuthority = baseOrdered.filter((g) => g.id !== 'authority');
    const settingsIdx = withoutAuthority.findIndex((g) => g.id === 'settings');
    if (settingsIdx >= 0) {
      withoutAuthority.splice(settingsIdx, 0, authority);
      return withoutAuthority;
    }
    return [...withoutAuthority, authority];
  }, [menuGroups, showCompanyProfileNav, allowTab, locale]);

  const activeGroupId = useMemo(() => {
    for (const g of visibleGroups) {
      for (const item of g.items) {
        const isActive =
          item.kind === 'page' ? pathname === item.path : activeTab != null && activeTab === item.id;
        if (isActive) return g.id;
      }
    }
    return null;
  }, [visibleGroups, pathname, activeTab]);

  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(activeGroupId);

  useEffect(() => {
    setExpandedGroupId(activeGroupId);
  }, [activeGroupId]);

  const toggleGroupHeader = useCallback(
    (groupId: string) => {
      setExpandedGroupId((cur) => {
        if (cur === groupId) {
          return groupId === activeGroupId ? cur : null;
        }
        return groupId;
      });
    },
    [activeGroupId],
  );

  const handleNavigation = (path: string) => {
    router.push(path);
    onMobileToggle();
  };

  return (
    <>
      {/* ==================== DESKTOP SIDEBAR RAIL ==================== */}
      <aside
        className={`fixed left-0 top-0 h-full backdrop-blur-lg border-r z-50 transition-[width] duration-300 ease-out bg-[color:var(--admin-sidebar-bg)] border-[color:var(--admin-sidebar-border)] ${
          isOpen ? 'w-64' : 'w-24'
        } hidden lg:block`}
      >
        <div className="flex flex-col h-full">
          {/* ==================== BRAND / LOGO (DESKTOP) ==================== */}
          <div className={`border-b border-white/10 h-21 flex items-center ${isOpen ? 'px-4' : 'px-2'}`}>
            <Link
              href="/"
              onClick={() => {
                if (mobileOpen) onMobileToggle();
              }}
              className={`flex items-center w-full h-full rounded-lg outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/30 ${
                isOpen ? 'gap-3 px-1' : 'justify-center'
              }`}
              aria-label={t('nav.home')}
            >
              <BrandingLogo
                src={logoSrc}
                alt={`${companyName} logo`}
                sizes="40px"
                className="w-10 h-10 shrink-0"
                priority
              />
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-bold text-lg font-zcool tracking-wide truncate">{companyName}</h2>
                  <p className="admin-brand-slogan text-white/60 text-xs font-zcool tracking-wide truncate">{brandSubtitle}</p>
                </div>
              )}
            </Link>
          </div>

          {/* ==================== NAVIGATION GROUPS (DESKTOP) ==================== */}
          <nav
            className={`admin-sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden space-y-2 ${isOpen ? 'p-4' : 'px-2 py-3'}`}
          >
            {visibleGroups.map((group) => {
              const expanded = expandedGroupId === group.id;
              return (
                <div key={group.id} className={isOpen ? 'pt-3' : 'pt-0'}>
                  {isOpen ? (
                    <>
                      <button
                        type="button"
                        id={`admin-sidebar-group-${group.id}`}
                        aria-expanded={expanded}
                        aria-controls={`admin-sidebar-panel-${group.id}`}
                        onClick={() => toggleGroupHeader(group.id)}
                        className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left text-xs uppercase tracking-wider text-white/50 font-medium hover:bg-white/10 hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                      >
                        <span className="truncate">{group.label}</span>
                        <svg
                          className={`w-3.5 h-3.5 shrink-0 text-white/45 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      <div
                        id={`admin-sidebar-panel-${group.id}`}
                        role="region"
                        aria-labelledby={`admin-sidebar-group-${group.id}`}
                        className={`grid transition-[grid-template-rows] duration-200 ease-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="space-y-2 pt-1">
                            {group.items.map((item) => {
                              const isActive =
                                item.kind === 'page'
                                  ? pathname === item.path
                                  : activeTab != null && activeTab === item.id;
                              return (
                                <button
                                  key={`${item.kind}-${item.id}`}
                                  type="button"
                                  onClick={() => handleNavigation(item.path)}
                                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                    isActive
                                      ? 'bg-white/20 text-white border-b-2 border-white'
                                      : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'
                                  }`}
                                >
                                  <span className="text-xl shrink-0">{item.icon}</span>
                                  <span className="text-sm font-medium truncate">{item.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="space-y-1.5">
                      {group.items.map((item) => {
                        const isActive =
                          item.kind === 'page'
                            ? pathname === item.path
                            : activeTab != null && activeTab === item.id;
                        return (
                          <button
                            key={`${item.kind}-${item.id}`}
                            type="button"
                            onClick={() => handleNavigation(item.path)}
                            className={`w-full flex items-center justify-center px-1.5 py-2.5 rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'bg-white/20 text-white border-b-2 border-white'
                                : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'
                            }`}
                            title={item.label}
                          >
                            <span className="text-2xl leading-none shrink-0">{item.icon}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* ==================== COLLAPSE / EXPAND RAIL TOGGLE ==================== */}
          <div className={`border-t border-white/10 shrink-0 ${isOpen ? 'p-3' : 'p-2'}`}>
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={isOpen}
              aria-label={isOpen ? t('admin.collapseSidebar') : t('admin.expandSidebar')}
              title={isOpen ? t('admin.collapseSidebar') : t('admin.expandSidebar')}
              className={`group w-full flex items-center rounded-xl border border-white/15 bg-white/5 text-white/80 hover:bg-white/12 hover:text-white hover:border-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] transition-colors min-h-11 ${
                isOpen ? 'justify-start gap-3 px-3 py-2.5' : 'flex-col justify-center gap-0.5 py-2 px-1'
              }`}
            >
              <span className="shrink-0 text-white/90" aria-hidden>
                {isOpen ? (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </span>
              {isOpen ? (
                <span className="text-sm font-medium truncate text-left">{t('admin.collapse')}</span>
              ) : (
                <span className="text-[11px] font-medium leading-snug text-center text-white/70 group-hover:text-white px-0.5 max-w-full wrap-break-word">
                  {t('admin.expand')}
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>

      {/* ==================== MOBILE SIDEBAR DRAWER ==================== */}
      <aside
        className={`fixed left-0 top-0 h-full backdrop-blur-lg border-r z-50 transition-transform duration-300 w-64 bg-[color:var(--admin-sidebar-bg)] border-[color:var(--admin-sidebar-border)] ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* ==================== BRAND / LOGO (MOBILE) ==================== */}
          <div className="h-20 px-4 border-b border-white/10 flex items-center">
            <Link
              href="/"
              onClick={() => {
                if (mobileOpen) onMobileToggle();
              }}
              className="flex items-center gap-3 w-full h-full rounded-lg outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/30"
              aria-label={t('nav.home')}
            >
              <BrandingLogo
                src={logoSrc}
                alt={`${companyName} logo`}
                sizes="40px"
                className="w-10 h-10 shrink-0"
                priority
              />
              <div className="flex-1 min-w-0">
                <h2 className="text-white font-bold text-lg font-zcool tracking-wide truncate">{companyName}</h2>
                <p className="admin-brand-slogan text-white/60 text-xs font-zcool tracking-wide truncate">{brandSubtitle}</p>
              </div>
            </Link>
          </div>

          {/* ==================== NAVIGATION GROUPS (MOBILE) ==================== */}
          <nav className="admin-sidebar-scroll flex-1 overflow-y-auto p-4 space-y-2">
            {visibleGroups.map((group) => {
              const expanded = expandedGroupId === group.id;
              return (
                <div key={group.id} className="pt-3">
                  <button
                    type="button"
                    id={`admin-sidebar-mobile-group-${group.id}`}
                    aria-expanded={expanded}
                    aria-controls={`admin-sidebar-mobile-panel-${group.id}`}
                    onClick={() => toggleGroupHeader(group.id)}
                    className="w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-left text-xs uppercase tracking-wider text-white/50 font-medium hover:bg-white/10 hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
                  >
                    <span className="truncate">{group.label}</span>
                    <svg
                      className={`w-3.5 h-3.5 shrink-0 text-white/45 transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div
                    id={`admin-sidebar-mobile-panel-${group.id}`}
                    role="region"
                    aria-labelledby={`admin-sidebar-mobile-group-${group.id}`}
                    className={`grid transition-[grid-template-rows] duration-200 ease-out ${expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <div className="space-y-2 pt-1">
                        {group.items.map((item) => {
                          const isActive =
                            item.kind === 'page'
                              ? pathname === item.path
                              : activeTab != null && activeTab === item.id;
                          return (
                            <button
                              key={`${item.kind}-${item.id}`}
                              type="button"
                              onClick={() => handleNavigation(item.path)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                isActive
                                  ? 'bg-white/20 text-white border-b-2 border-white'
                                  : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'
                              }`}
                            >
                              <span className="text-xl shrink-0">{item.icon}</span>
                              <span className="text-sm font-medium">{item.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

