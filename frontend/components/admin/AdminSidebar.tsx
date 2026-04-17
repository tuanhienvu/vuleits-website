'use client';

import Link from 'next/link';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import BrandingLogo from '@/components/BrandingLogo';
import { useCompanyBranding } from '@/hooks/useCompanyBranding';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import type { AdminUiFeatureId } from '@/lib/adminPermissionModel';
import { useAdminCompanyProfileNav } from '@/hooks/useAdminCompanyProfileNav';
import { apiPath } from '@/lib/apiRoutes';

/** Sidebar section ids (fixed order). */
const GROUP = {
  OVERVIEW: 0,
  CONTENTS: 1,
  PRODUCTS: 2,
  AUTHORITY: 3,
  SETTINGS: 4,
} as const;

/** Nav row ids (unique; integers per request). */
const NAV = {
  TAB_OVERVIEW: 100,
  TAB_NEWS: 101,
  TAB_MEDIA: 102,
  TAB_BANNERS: 103,
  TAB_PRODUCTS: 104,
  TAB_SERVICES: 105,
  TAB_USERS: 106,
  PAGE_PERMISSIONS: 200,
  PAGE_SETTINGS_ABOUT: 201,
  PAGE_SETTINGS_COMPANY: 202,
  PAGE_SETTINGS_SITE: 203,
  PAGE_SETTINGS_SEO: 204,
  PAGE_SETTINGS_LOGS: 205,
} as const;

type MenuTemplateItem =
  | { kind: 'tab'; id: number; featureId: AdminUiFeatureId; labelKey: string; icon: string; path: string }
  | { kind: 'page'; id: number; labelKey: string; icon: string; path: string };

/**
 * Single source of truth for section and row order. Locale only changes translated labels;
 * this array order is never derived from sorting (avoids EN vs vi-VN reordering).
 */
const ADMIN_MENU_TEMPLATE: { groupId: number; labelKey: string; items: MenuTemplateItem[] }[] = [
  {
    groupId: GROUP.OVERVIEW,
    labelKey: 'admin.overview',
    items: [
      {
        kind: 'tab',
        id: NAV.TAB_OVERVIEW,
        featureId: 'overview',
        labelKey: 'admin.overview',
        icon: '📊',
        path: '/admin/dashboard?tab=overview',
      },
    ],
  },
  {
    groupId: GROUP.CONTENTS,
    labelKey: 'admin.contents',
    items: [
      {
        kind: 'tab',
        id: NAV.TAB_NEWS,
        featureId: 'news',
        labelKey: 'admin.news',
        icon: '📰',
        path: '/admin/dashboard?tab=news',
      },
      {
        kind: 'tab',
        id: NAV.TAB_MEDIA,
        featureId: 'media',
        labelKey: 'admin.media',
        icon: '🖼️',
        path: '/admin/dashboard?tab=media',
      },
      {
        kind: 'tab',
        id: NAV.TAB_BANNERS,
        featureId: 'banners',
        labelKey: 'admin.banners',
        icon: '🎬',
        path: '/admin/dashboard?tab=banners',
      },
    ],
  },
  {
    groupId: GROUP.PRODUCTS,
    labelKey: 'admin.productGroup',
    items: [
      {
        kind: 'tab',
        id: NAV.TAB_SERVICES,
        featureId: 'services',
        labelKey: 'admin.services',
        icon: '🧩',
        path: '/admin/dashboard?tab=services',
      },
      {
        kind: 'tab',
        id: NAV.TAB_PRODUCTS,
        featureId: 'products',
        labelKey: 'admin.products',
        icon: '📦',
        path: '/admin/dashboard?tab=products',
      },
    ],
  },
  {
    groupId: GROUP.AUTHORITY,
    labelKey: 'admin.permissionGroup',
    items: [
      {
        kind: 'tab',
        id: NAV.TAB_USERS,
        featureId: 'users',
        labelKey: 'admin.users',
        icon: '👥',
        path: '/admin/dashboard?tab=users',
      },
      {
        kind: 'page',
        id: NAV.PAGE_PERMISSIONS,
        labelKey: 'admin.permissions',
        icon: '🔐',
        path: '/admin/permissions',
      },
    ],
  },
  {
    groupId: GROUP.SETTINGS,
    labelKey: 'admin.settings',
    items: [
      {
        kind: 'page',
        id: NAV.PAGE_SETTINGS_ABOUT,
        labelKey: 'admin.settingsNavAbout',
        icon: '🎯',
        path: '/admin/settings/about',
      },
      {
        kind: 'page',
        id: NAV.PAGE_SETTINGS_COMPANY,
        labelKey: 'admin.settingsNavCompany',
        icon: '🏢',
        path: '/admin/settings/company',
      },
      {
        kind: 'page',
        id: NAV.PAGE_SETTINGS_SITE,
        labelKey: 'admin.settingsNavSite',
        icon: '🌐',
        path: '/admin/settings/site',
      },
      {
        kind: 'page',
        id: NAV.PAGE_SETTINGS_SEO,
        labelKey: 'admin.seoMarketing',
        icon: '📈',
        path: '/admin/settings/seo-marketing',
      },
      {
        kind: 'page',
        id: NAV.PAGE_SETTINGS_LOGS,
        labelKey: 'admin.settingsNavLogs',
        icon: '📋',
        path: '/admin/settings/logs',
      },
    ],
  },
];

type SidebarNavItem =
  | { kind: 'tab'; id: number; featureId: AdminUiFeatureId; label: string; icon: string; path: string }
  | { kind: 'page'; id: number; label: string; icon: string; path: string };

function templateItemToSidebarItem(t: (key: string) => string, item: MenuTemplateItem): SidebarNavItem {
  if (item.kind === 'tab') {
    return {
      kind: 'tab',
      id: item.id,
      featureId: item.featureId,
      label: t(item.labelKey),
      icon: item.icon,
      path: item.path,
    };
  }
  return {
    kind: 'page',
    id: item.id,
    label: t(item.labelKey),
    icon: item.icon,
    path: item.path,
  };
}

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

function itemAllowed(
  item: MenuTemplateItem | SidebarNavItem,
  allowTab: (id: AdminUiFeatureId) => boolean,
  showCompanyProfileNav: boolean,
): boolean {
  if (item.kind === 'tab') return allowTab(item.featureId);
  switch (item.id) {
    case NAV.PAGE_PERMISSIONS:
      return allowTab('permissions');
    case NAV.PAGE_SETTINGS_ABOUT:
      return allowTab('aboutTeam') || allowTab('aboutStats');
    case NAV.PAGE_SETTINGS_COMPANY:
      return showCompanyProfileNav || allowTab('contacts');
    case NAV.PAGE_SETTINGS_SITE:
      return allowTab('aboutTeam') || allowTab('uiTexts');
    case NAV.PAGE_SETTINGS_SEO:
      return allowTab('uiTexts');
    case NAV.PAGE_SETTINGS_LOGS:
      return allowTab('auditLogs');
    default:
      return false;
  }
}

// --- Sections: Desktop sidebar (brand, nav, collapse) | Mobile drawer | Shared nav groups ---

export default function AdminSidebar({ isOpen, onToggle, mobileOpen, onMobileToggle }: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useLocale();
  const { logoSrc, companyName, slogan } = useCompanyBranding();
  const brandSubtitle = slogan || t('admin.panel');
  const { can, loading: permsLoading } = useAdminPermissions();
  const allowTab = useCallback((id: AdminUiFeatureId) => permsLoading || can(id, 'read'), [permsLoading, can]);
  const showCompanyProfileNav = useAdminCompanyProfileNav();
  const [contactNewCount, setContactNewCount] = useState(0);

  /** Only meaningful on `/admin/dashboard`; null elsewhere so tab items are not matched against default `overview`. */
  const activeTab = useMemo(() => {
    if (pathname !== '/admin/dashboard') return null;
    return searchParams.get('tab') || 'overview';
  }, [pathname, searchParams]);

  useEffect(() => {
    if (permsLoading || !can('contacts', 'read')) return;
    let cancelled = false;
    const fetchNew = async () => {
      try {
        const res = await fetch(apiPath('admin/contact-submissions/new-count'), { credentials: 'include' });
        if (!res.ok || cancelled) return;
        const j = (await res.json()) as { newCount?: unknown };
        if (!cancelled) setContactNewCount(Math.min(999, Math.max(0, Number(j.newCount) || 0)));
      } catch {
        if (!cancelled) setContactNewCount(0);
      }
    };
    void fetchNew();
    const iv = window.setInterval(() => void fetchNew(), 45_000);
    const onRefresh = () => void fetchNew();
    window.addEventListener('vuleits-contact-new-count-refresh', onRefresh);
    return () => {
      cancelled = true;
      window.clearInterval(iv);
      window.removeEventListener('vuleits-contact-new-count-refresh', onRefresh);
    };
  }, [permsLoading, can]);

  const visibleGroups = useMemo(() => {
    const out: { id: number; label: string; items: SidebarNavItem[] }[] = [];
    for (const tpl of ADMIN_MENU_TEMPLATE) {
      const items = tpl.items
        .filter((item) => itemAllowed(item, allowTab, showCompanyProfileNav))
        .sort((a, b) => a.id - b.id)
        .map((item) => templateItemToSidebarItem(t, item));
      if (items.length === 0) continue;
      out.push({
        id: tpl.groupId,
        label: t(tpl.labelKey),
        items,
      });
    }
    return out;
  }, [t, allowTab, showCompanyProfileNav]);

  const activeGroupId = useMemo(() => {
    for (const g of visibleGroups) {
      for (const item of g.items) {
        const isActive =
          item.kind === 'page'
            ? pathname === item.path
            : activeTab != null && activeTab === item.featureId;
        if (isActive) return g.id;
      }
    }
    return null;
  }, [visibleGroups, pathname, activeTab]);

  const [expandedGroupId, setExpandedGroupId] = useState<number | null>(activeGroupId ?? null);

  useEffect(() => {
    setExpandedGroupId(activeGroupId);
  }, [activeGroupId]);

  const toggleGroupHeader = useCallback(
    (groupId: number) => {
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
                                  : activeTab != null && activeTab === item.featureId;
                              return (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() => handleNavigation(item.path)}
                                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                    isActive
                                      ? 'bg-white/20 text-white border-b-2 border-white'
                                      : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'
                                  }`}
                                >
                                  <span className="text-xl shrink-0">{item.icon}</span>
                                  <span className="text-sm font-medium truncate flex-1 min-w-0 text-left">{item.label}</span>
                                  {item.kind === 'page' && item.id === NAV.PAGE_SETTINGS_COMPANY && contactNewCount > 0 ? (
                                    <span className="shrink-0 min-w-[1.35rem] h-6 px-1.5 rounded-full bg-amber-500 text-[11px] font-bold text-slate-900 flex items-center justify-center">
                                      {contactNewCount > 99 ? '99+' : contactNewCount}
                                    </span>
                                  ) : null}
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
                            : activeTab != null && activeTab === item.featureId;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => handleNavigation(item.path)}
                            className={`w-full flex items-center justify-center px-1.5 py-2.5 rounded-lg transition-all duration-200 ${
                              isActive
                                ? 'bg-white/20 text-white border-b-2 border-white'
                                : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'
                            }`}
                            title={
                              item.kind === 'page' && item.id === NAV.PAGE_SETTINGS_COMPANY && contactNewCount > 0
                                ? `${item.label} (${contactNewCount} new)`
                                : item.label
                            }
                          >
                            <span className="text-2xl leading-none shrink-0 relative inline-flex">
                              {item.icon}
                              {item.kind === 'page' && item.id === NAV.PAGE_SETTINGS_COMPANY && contactNewCount > 0 ? (
                                <span
                                  className="absolute -top-0.5 -right-1 w-2 h-2 rounded-full bg-amber-500 ring-2 ring-[color:var(--admin-sidebar-bg)]"
                                  aria-hidden
                                />
                              ) : null}
                            </span>
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
                              : activeTab != null && activeTab === item.featureId;
                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleNavigation(item.path)}
                              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                                isActive
                                  ? 'bg-white/20 text-white border-b-2 border-white'
                                  : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'
                              }`}
                            >
                              <span className="text-xl shrink-0">{item.icon}</span>
                              <span className="text-sm font-medium flex-1 min-w-0 text-left truncate">{item.label}</span>
                              {item.kind === 'page' && item.id === NAV.PAGE_SETTINGS_COMPANY && contactNewCount > 0 ? (
                                <span className="shrink-0 min-w-[1.35rem] h-6 px-1.5 rounded-full bg-amber-500 text-[11px] font-bold text-slate-900 flex items-center justify-center">
                                  {contactNewCount > 99 ? '99+' : contactNewCount}
                                </span>
                              ) : null}
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
