'use client';

import Image from 'next/image';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'news', label: 'News' },
    { id: 'services', label: 'Services' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <nav className="glass flex items-center justify-between p-4 my-4 rounded-2xl">
          {/* ==================== LOGO & BRANDING AREA ==================== */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentPage('home')}>
            <div className="w-12 h-12 relative">
              <Image
                src="/Logos.png"
                alt="VULE ITS Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span className="text-white font-semibold text-lg hidden sm:inline">VULE ITS</span>
          </div>

          {/* ==================== NAVIGATION MENU AREA ==================== */}
          <div className="flex gap-4 md:gap-6 items-center">
            {/* Navigation Links */}
            {navItems.map((item) => (
              <a
                key={item.id}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(item.id);
                }}
                className={`text-white font-medium transition-all duration-300 pb-2 text-sm md:text-base ${
                  currentPage === item.id
                    ? 'border-b-2 border-white'
                    : 'hover:border-b-2 hover:border-white/50'
                }`}
              >
                {item.label}
              </a>
            ))}

            {/* Admin Login Button */}
            <button className="cta-button text-sm px-3 py-2">Admin</button>
          </div>
        </nav>
      </div>
    </header>
  );
}
