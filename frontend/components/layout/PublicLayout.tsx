'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

function navPageFromPath(pathname: string | null): string {
  if (!pathname || pathname === '/') return 'home';
  if (pathname.startsWith('/products')) return 'products';
  if (pathname.startsWith('/news')) return 'news';
  if (pathname.startsWith('/services')) return 'services';
  return 'home';
}

// --- Public route shell: nav synced to path | main | footer ---

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(() => navPageFromPath(pathname));

  useEffect(() => {
    setCurrentPage(navPageFromPath(pathname));
  }, [pathname]);

  return (
    <div className="public-shell flex min-h-screen flex-col theme-page-gradient">
      {/* ==================== PUBLIC NAVIGATION ==================== */}
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {/* ==================== PAGE CONTENT (`flex-1` keeps footer at bottom when main has no in-flow height, e.g. fixed product shell) ==================== */}
      <main className="relative z-10 flex min-h-0 flex-1 flex-col">{children}</main>
      {/* ==================== FOOTER ==================== */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
