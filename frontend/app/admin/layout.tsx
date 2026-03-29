'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { AdminPermissionProvider } from '@/components/admin/AdminPermissionContext';

// --- Sections: Login (bare children) | App shell: sidebar, header, main, mobile backdrop ---

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1080) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (isLoginPage) return <>{children}</>;

  return (
    <AdminPermissionProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a]">
        {/* ==================== SIDEBAR (DESKTOP + MOBILE, SUSPENSE) ==================== */}
        <Suspense fallback={null}>
          <AdminSidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            mobileOpen={mobileMenuOpen}
            onMobileToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </Suspense>
        {/* ==================== MAIN COLUMN: HEADER + PAGE CONTENT ==================== */}
        <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-24'}`}>
          <AdminHeader onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />
          <main className="p-4 lg:p-6">{children}</main>
        </div>
        {/* ==================== MOBILE SIDEBAR BACKDROP ==================== */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} />
        )}
      </div>
    </AdminPermissionProvider>
  );
}
