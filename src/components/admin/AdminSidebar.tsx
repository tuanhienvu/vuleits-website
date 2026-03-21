'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useMemo } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

export default function AdminSidebar({ isOpen, onToggle, mobileOpen, onMobileToggle }: AdminSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLocale();

  const menuGroups = [
    {
      id: 'product',
      label: t('admin.productGroup'),
      items: [
        { id: 'services', label: t('admin.services'), icon: '🧩', path: '/admin/dashboard?tab=services' },
        { id: 'products', label: t('admin.products'), icon: '📦', path: '/admin/dashboard?tab=products' },
      ],
    },
    {
      id: 'communication',
      label: t('admin.contents'),
      items: [
        { id: 'news', label: t('admin.news'), icon: '📰', path: '/admin/dashboard?tab=news' },
        { id: 'media', label: t('admin.media'), icon: '🖼️', path: '/admin/dashboard?tab=media' },
        { id: 'banners', label: t('admin.banners'), icon: '🎬', path: '/admin/dashboard?tab=banners' },
      ],
    },
    {
      id: 'settings',
      label: t('admin.settings'),
      items: [
        { id: 'homeFeatures', label: t('admin.homeFeatures'), icon: '🏠', path: '/admin/dashboard?tab=homeFeatures' },
        { id: 'contacts', label: t('admin.contacts'), icon: '💬', path: '/admin/dashboard?tab=contacts' },
        { id: 'aboutTeam', label: t('admin.aboutTeam'), icon: '👤', path: '/admin/dashboard?tab=aboutTeam' },
        { id: 'aboutStats', label: t('admin.aboutStats'), icon: '📈', path: '/admin/dashboard?tab=aboutStats' },
      ],
    },
    {
      id: 'permission',
      label: t('admin.permissionGroup'),
      items: [
        { id: 'users', label: t('admin.users'), icon: '👥', path: '/admin/dashboard?tab=users' },
        { id: 'permissions', label: t('admin.permissions'), icon: '🔐', path: '/admin/dashboard?tab=permissions' },
      ],
    },
  ] as const;

  const handleNavigation = (path: string) => {
    router.push(path);
    onMobileToggle();
  };

  // Get active tab from URL using useMemo
  const activeTab = useMemo(() => {
    return searchParams.get('tab') || 'overview';
  }, [searchParams]);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-full bg-[#0a0a0a]/95 backdrop-blur-lg border-r border-white/10 z-50 transition-all duration-300 ${
          isOpen ? 'w-64' : 'w-20'
        } hidden lg:block`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Brand Section */}
          <div className="p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative shrink-0">
                <Image
                  src="/Logo.jpg"
                  alt="VULE ITS Logo"
                  fill
                  sizes="40px"
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-bold text-lg font-zcool truncate">VULE ITS</h2>
                  <p className="text-white/60 text-xs font-zcool truncate">{t('admin.panel')}</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {/* Overview stays top-level */}
            {(() => {
              const item = { id: 'overview', label: t('admin.overview'), icon: '📊', path: '/admin/dashboard?tab=overview' };
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white border-b-2 border-white'
                      : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'
                  }`}
                  title={!isOpen ? item.label : undefined}
                >
                  <span className="text-xl shrink-0">{item.icon}</span>
                  {isOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
                </button>
              );
            })()}

            {menuGroups.map((group) => (
              <div key={group.id} className="pt-3">
                {isOpen && (
                  <div className="px-3 pb-1 text-xs uppercase tracking-wider text-white/50 font-medium">
                    {group.label}
                  </div>
                )}
                <div className="space-y-2">
                  {group.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'bg-white/20 text-white border-b-2 border-white'
                            : 'text-white/70 hover:bg-white/10 hover:text-white hover:border-b hover:border-white focus:border-b focus:border-white focus:outline-none'
                        }`}
                        title={!isOpen ? item.label : undefined}
                      >
                        <span className="text-xl shrink-0">{item.icon}</span>
                        {isOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Toggle Button */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={onToggle}
              className="w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
              title={isOpen ? t('admin.collapseSidebar') : t('admin.expandSidebar')}
            >
              <span className="text-xl">{isOpen ? '◀' : '▶'}</span>
              {isOpen && <span className="text-sm">{t('admin.collapse')}</span>}
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 relative shrink-0">
                <Image
                  src="/Logo.jpg"
                  alt="VULE ITS Logo"
                  fill
                  sizes="40px"
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-white font-bold text-lg font-zcool truncate">VULE ITS</h2>
                <p className="text-white/60 text-xs font-zcool truncate">{t('admin.panel')}</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {(() => {
              const item = { id: 'overview', label: t('admin.overview'), icon: '📊', path: '/admin/dashboard?tab=overview' };
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
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

            {menuGroups.map((group) => (
              <div key={group.id} className="pt-3">
                <div className="px-3 pb-1 text-xs uppercase tracking-wider text-white/50 font-medium">{group.label}</div>
                <div className="space-y-2">
                  {group.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
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
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}

