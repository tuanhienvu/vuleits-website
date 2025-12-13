'use client';

import { useState } from 'react';
import Image from 'next/image';

interface NavigationProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

export default function Navigation({ currentPage, setCurrentPage }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

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
        <nav className="glass flex items-center justify-between p-4 my-4 rounded-2xl relative">
          {/* ==================== LOGO & BRANDING AREA ==================== */}
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => { setCurrentPage('home'); setMobileOpen(false); }}>
            <div className="w-12 h-12 relative">
              <Image
                src="/Logo.jpg"
                alt="VULE ITS Logo"
                fill
                className="object-contain rounded-full"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <h2 className="text-white font-semibold text-lg leading-tight font-zcool">
                VULE ITS
              </h2>
              <p className="text-white/70 text-xs font-zcool">
                Bring Your Success
              </p>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              className="p-2 rounded-md bg-white/10 text-white"
            >
              {mobileOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* ==================== NAVIGATION MENU AREA ==================== */}
          <div className="hidden sm:flex gap-4 md:gap-6 items-center">
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

          {/* ==================== MOBILE MENU PANEL ==================== */}
          {mobileOpen && (
            <div className="sm:hidden absolute left-4 right-4 top-full mt-2 bg-[#071024]/80 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item.id + '-m'}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(item.id);
                      setMobileOpen(false);
                    }}
                    className={`text-white font-medium transition-all duration-200 py-2 px-3 rounded ${
                      currentPage === item.id ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-2 border-t border-white/5">
                  <button onClick={() => { setMobileOpen(false); setCurrentPage('admin'); }} className="w-full cta-button py-2">
                    Admin
                  </button>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
