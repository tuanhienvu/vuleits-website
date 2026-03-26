'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

function navPageFromPath(pathname: string | null): string {
  if (!pathname || pathname === '/') return 'home';
  if (pathname.startsWith('/products')) return 'products';
  if (pathname.startsWith('/news')) return 'news';
  return 'home';
}

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentPage, setCurrentPage] = useState(() => navPageFromPath(pathname));

  useEffect(() => {
    setCurrentPage(navPageFromPath(pathname));
  }, [pathname]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a]">
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="relative z-10">{children}</main>
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
