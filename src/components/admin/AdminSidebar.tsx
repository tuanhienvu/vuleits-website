'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { useMemo } from 'react';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}

export default function AdminSidebar({ isOpen, onToggle, mobileOpen, onMobileToggle }: AdminSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: '📊', path: '/admin/dashboard?tab=overview' },
    { id: 'homeFeatures', label: 'Home Features', icon: '🏠', path: '/admin/dashboard?tab=homeFeatures' },
    { id: 'aboutStats', label: 'About Stats', icon: '📈', path: '/admin/dashboard?tab=aboutStats' },
    { id: 'aboutTeam', label: 'About Team', icon: '👤', path: '/admin/dashboard?tab=aboutTeam' },
    { id: 'services', label: 'Services', icon: '🧩', path: '/admin/dashboard?tab=services' },
    { id: 'products', label: 'Products', icon: '📦', path: '/admin/dashboard?tab=products' },
    { id: 'news', label: 'News', icon: '📰', path: '/admin/dashboard?tab=news' },
    { id: 'users', label: 'Users', icon: '👥', path: '/admin/dashboard?tab=users' },
    { id: 'media', label: 'Media', icon: '🖼️', path: '/admin/dashboard?tab=media' },
    { id: 'banners', label: 'Banners', icon: '🎬', path: '/admin/dashboard?tab=banners' },
    { id: 'contacts', label: 'Contacts', icon: '💬', path: '/admin/dashboard?tab=contacts' },
  ];

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
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image
                  src="/Logo.jpg"
                  alt="VULE ITS Logo"
                  fill
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              {isOpen && (
                <div className="flex-1 min-w-0">
                  <h2 className="text-white font-bold text-lg font-zcool truncate">VULE ITS</h2>
                  <p className="text-white/60 text-xs font-zcool truncate">Admin Panel</p>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => {
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
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  {isOpen && <span className="text-sm font-medium truncate">{item.label}</span>}
                </button>
              );
            })}
          </nav>

          {/* Toggle Button */}
          <div className="p-4 border-t border-white/10">
            <button
              onClick={onToggle}
              className="w-full flex items-center justify-center gap-3 px-3 py-2.5 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-all"
              title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
            >
              <span className="text-xl">{isOpen ? '◀' : '▶'}</span>
              {isOpen && <span className="text-sm">Collapse</span>}
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
              <div className="w-10 h-10 relative flex-shrink-0">
                <Image
                  src="/Logo.jpg"
                  alt="VULE ITS Logo"
                  fill
                  className="object-contain rounded-full"
                  priority
                />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-white font-bold text-lg font-zcool truncate">VULE ITS</h2>
                <p className="text-white/60 text-xs font-zcool truncate">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {menuItems.map((item) => {
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
                  <span className="text-xl flex-shrink-0">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>
    </>
  );
}

