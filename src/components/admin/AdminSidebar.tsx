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
  | { kind: 'page'; id: 'companyProfile'; label: string; icon: string; path: string };

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

export default function AdminSidebar({ isOpen, onToggle, mobileOpen, onMobileToggle }: AdminSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useLocale();
  const { logoSrc, companyName, slogan } = useCompanyBranding();
  const brandSubtitle = slogan || t('admin.panel');
  const { can, loading: permsLoading } = useAdminPermissions();
  const allowTab = (id: AdminUiFeatureId) => permsLoading || can(id, 'read');
  const [showCompanyProfileNav, setShowCompanyProfileNav] = useState(false);

  const activeTab = useMemo(() => searchParams.get('tab') || 'overview', [searchParams]);

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
      id: 'product',
      label: t('admin.productGroup'),
      items: [
        { kind: 'tab', id: 'services', label: t('admin.services'), icon: '🧩', path: '/admin/dashboard?tab=services' },
        { kind: 'tab', id: 'products', label: t('admin.products'), icon: '📦', path: '/admin/dashboard?tab=products' },
      ],
    },
    {
      id: 'communication',
      label: t('admin.contents'),
      items: [
        { kind: 'tab', id: 'news', label: t('admin.news'), icon: '📰', path: '/admin/dashboard?tab=news' },
        { kind: 'tab', id: 'media', label: t('admin.media'), icon: '🖼️', path: '/admin/dashboard?tab=media' },
        { kind: 'tab', id: 'banners', label: t('admin.banners'), icon: '🎬', path: '/admin/dashboard?tab=banners' },
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
        { kind: 'tab', id: 'homeFeatures', label: t('admin.homeFeatures'), icon: '🏠', path: '/admin/dashboard?tab=homeFeatures' },
        { kind: 'tab', id: 'contacts', label: t('admin.contacts'), icon: '💬', path: '/admin/dashboard?tab=contacts' },
        { kind: 'tab', id: 'aboutTeam', label: t('admin.aboutTeam'), icon: '👤', path: '/admin/dashboard?tab=aboutTeam' },
        { kind: 'tab', id: 'aboutStats', label: t('admin.aboutStats'), icon: '📈', path: '/admin/dashboard?tab=aboutStats' },
      ],
    },
    {
      id: 'permission',
      label: t('admin.permissionGroup'),
      items: [
        { kind: 'tab', id: 'users', label: t('admin.users'), icon: '👥', path: '/admin/dashboard?tab=users' },
        { kind: 'tab', id: 'permissions', label: t('admin.permissions'), icon: '🔐', path: '/admin/dashboard?tab=permissions' },
      ],
    },
    ],
    [t],
  );

  const visibleGroups = useMemo(
    () =>
      menuGroups
        .map((group) => ({
          ...group,
          items: group.items.filter((item) => {
            if (item.kind === 'page' && item.id === 'companyProfile') return showCompanyProfileNav;
            if (item.kind === 'tab') return allowTab(item.id);
            return false;
          }),
        }))
        .filter((g) => g.items.length > 0),
    [menuGroups, showCompanyProfileNav, permsLoading, can],
  );

  const activeGroupId = useMemo(() => {
    for (const g of visibleGroups) {
      for (const item of g.items) {
        const isActive = item.kind === 'page' ? pathname === item.path : activeTab === item.id;
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
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#0a0a0a]/95 backdrop-blur-lg border-r border-white/10 z-50 transition-[width] duration-300 ease-out ${
          isOpen ? 'w-64' : 'w-24'
        } hidden lg:block`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand Section */}
          <div className={`border-b border-white/10 ${isOpen ? 'p-4' : 'px-2 py-3'}`}>
            <Link
              href="/"
              onClick={() => {
                if (mobileOpen) onMobileToggle();
              }}
              className={`flex items-center rounded-lg outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/30 ${isOpen ? 'gap-3 p-1 -m-1' : 'justify-center p-1 -m-1'}`}
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
                  <p className="text-white/60 text-xs font-zcool tracking-wide truncate">{brandSubtitle}</p>
                </div>
              )}
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav
            className={`admin-sidebar-scroll flex-1 overflow-y-auto overflow-x-hidden space-y-2 ${isOpen ? 'p-4' : 'px-2 py-3'}`}
          >
            {allowTab('overview') &&
              (() => {
                const item = { id: 'overview', label: t('admin.overview'), icon: '📊', path: '/admin/dashboard?tab=overview' };
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center py-2.5 rounded-lg transition-all duration-200 ${
                      isOpen ? 'gap-3 px-3' : 'justify-center px-1.5'
                    } ${
                      isActive
                        ? 'bg-white/20 text-white border-b-2 border-white'
                        : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'
                    }`}
                    title={!isOpen ? item.label : undefined}
                  >
                    <span className={`shrink-0 ${isOpen ? 'text-xl' : 'text-2xl leading-none'}`}>{item.icon}</span>
                    {isOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
                  </button>
                );
              })()}

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
                                item.kind === 'page' ? pathname === item.path : activeTab === item.id;
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
                          item.kind === 'page' ? pathname === item.path : activeTab === item.id;
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

          {/* Toggle: collapse (wide rail) / expand (icon rail) */}
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

      {/* Mobile Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#0a0a0a]/95 backdrop-blur-lg border-r border-white/10 z-50 transition-transform duration-300 w-64 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand Section */}
          <div className="p-4 border-b border-white/10">
            <Link
              href="/"
              onClick={() => {
                if (mobileOpen) onMobileToggle();
              }}
              className="flex items-center gap-3 rounded-lg p-1 -m-1 outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-white/30"
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
                <p className="text-white/60 text-xs font-zcool tracking-wide truncate">{brandSubtitle}</p>
              </div>
            </Link>
          </div>

          {/* Navigation Menu */}
          <nav className="admin-sidebar-scroll flex-1 overflow-y-auto p-4 space-y-2">
            {allowTab('overview') &&
              (() => {
                const item = { id: 'overview', label: t('admin.overview'), icon: '📊', path: '/admin/dashboard?tab=overview' };
                const isActive = activeTab === item.id;
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
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })()}

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
                            item.kind === 'page' ? pathname === item.path : activeTab === item.id;
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

