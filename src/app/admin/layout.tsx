'use client';

import { useState, useEffect, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import { AdminPermissionProvider } from '@/components/admin/AdminPermissionContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isLoginPage = pathname === '/admin/login';
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1080) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // If login page, render without layout
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <AdminPermissionProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a]">
        {/* Sidebar */}
        <Suspense fallback={null}>
          <AdminSidebar
            isOpen={sidebarOpen}
            onToggle={() => setSidebarOpen(!sidebarOpen)}
            mobileOpen={mobileMenuOpen}
            onMobileToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </Suspense>

        {/* Main Content Area */}
        <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-24'}`}>
          <AdminHeader onMenuClick={() => setMobileMenuOpen(!mobileMenuOpen)} />

          <main className="p-4 lg:p-6">{children}</main>
        </div>

        {mobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </div>
    </AdminPermissionProvider>
  );
}

