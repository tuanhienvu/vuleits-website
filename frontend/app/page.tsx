'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect, useRef, startTransition } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  PUBLIC_SECTION_STORAGE_KEY,
  isPublicSectionId,
} from '@/lib/navigation/publicSectionStorage';

function PublicSectionFallback() {
  return (
    <div className="min-h-[45vh] flex items-center justify-center px-4" role="status" aria-busy>
      <span className="sr-only">Loading section</span>
      <div className="h-28 w-full max-w-lg rounded-2xl bg-white/5 motion-safe:animate-pulse" />
    </div>
  );
}

/* Turbopack production build requires an object literal as `dynamic()` options (not a shared const). */
const HomePage = dynamic<{ setCurrentPage: (page: string) => void }>(
  () => import('@/components/pages/HomePage'),
  { loading: () => <PublicSectionFallback /> },
);
const AboutPage = dynamic(() => import('@/components/pages/AboutPage'), {
  loading: () => <PublicSectionFallback />,
});
const ServicesPage = dynamic(() => import('@/components/pages/ServicesPage'), {
  loading: () => <PublicSectionFallback />,
});
const ContactPage = dynamic(() => import('@/components/pages/ContactPage'), {
  loading: () => <PublicSectionFallback />,
});
const ProductsPage = dynamic(() => import('@/components/pages/ProductsPage'), {
  loading: () => <PublicSectionFallback />,
});
const NewsPage = dynamic(() => import('@/components/pages/NewsPage'), {
  loading: () => <PublicSectionFallback />,
});
const PrivacyPolicyPage = dynamic(() => import('@/components/pages/PrivacyPolicyPage'), {
  loading: () => <PublicSectionFallback />,
});
const TermsOfServicePage = dynamic(() => import('@/components/pages/TermsOfServicePage'), {
  loading: () => <PublicSectionFallback />,
});

// --- Sections: Session restore | Meta/SEO per section | Shell (bg, skip link, nav, main, footer) ---

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const skipInitialPersist = useRef(true);

  /** Restore SPA section when returning from /products, /news, etc. via browser back. */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(PUBLIC_SECTION_STORAGE_KEY);
      if (raw && isPublicSectionId(raw) && raw !== 'home') {
        startTransition(() => {
          setCurrentPage(raw);
        });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (skipInitialPersist.current) {
      skipInitialPersist.current = false;
      return;
    }
    try {
      sessionStorage.setItem(PUBLIC_SECTION_STORAGE_KEY, currentPage);
    } catch {
      // ignore
    }
  }, [currentPage]);

  useEffect(() => {
    const meta = (name: string) => document.querySelector(`meta[name="${name}"]`);
    const setMeta = (name: string, content: string) => {
      let el = meta(name) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.name = name;
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const setOG = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute('property', property);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    const pageMeta: Record<string, { title: string; description: string }> = {
      home: { title: 'VULE ITS - Bring Your Success', description: 'Bring Your Success' },
      about: { title: 'About - VULE ITS', description: 'About VULE ITS and our mission' },
      services: { title: 'Services - VULE ITS', description: 'Our services to help you succeed' },
      products: { title: 'Products - VULE ITS', description: 'Explore our products' },
      news: { title: 'News - VULE ITS', description: 'Latest news and updates' },
      contact: { title: 'Contact - VULE ITS', description: 'Get in touch with VULE ITS' },
      privacy: { title: 'Privacy - VULE ITS', description: 'Privacy policy and practices' },
      terms: { title: 'Terms - VULE ITS', description: 'Terms and conditions' },
    };

    const data = pageMeta[currentPage] || pageMeta.home;
    document.title = data.title;
    setMeta('description', data.description);
    setMeta('og:site_name', 'VULE ITS');
    setOG('og:title', data.title);
    setOG('og:description', data.description);
    setOG('og:type', 'website');
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', data.title);
    setMeta('twitter:description', data.description);
  }, [currentPage]);

  return (
    <div className="min-h-screen bg-linear-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a]">
      {/* ==================== DECORATIVE BACKGROUND SHAPES ==================== */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="absolute bg-white/10 shadow-lg"
            style={{
              width: ['120px', '90px', '100px', '80px', '110px', '95px'][i - 1],
              height: ['80px', '140px', '60px', '120px', '70px', '95px'][i - 1],
              borderRadius: ['15px', '12px', '10px', '8px', '14px', '20px'][i - 1],
              top: ['20%', '60%', 'auto', '10%', 'auto', '40%'][i - 1],
              bottom: ['auto', 'auto', '20%', 'auto', '40%', 'auto'][i - 1],
              left: ['10%', 'auto', '20%', 'auto', 'auto', '5%'][i - 1],
              right: ['auto', '15%', 'auto', '30%', '20%', 'auto'][i - 1],
              transform: ['rotate(15deg)', 'rotate(-20deg)', 'rotate(25deg)', 'rotate(-10deg)', 'rotate(30deg)', 'rotate(0)'][i - 1],
              animation: `float 6s ease-in-out infinite`,
              animationDelay: [`0s`, '2s', '4s', '1s', '3s', '5s'][i - 1],
            }}
          />
        ))}
      </div>

      {/* ==================== SKIP LINK (ACCESSIBILITY) ==================== */}
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white/10 focus:text-white focus:px-3 focus:py-2 rounded">Skip to content</a>

      {/* ==================== PRIMARY NAVIGATION ==================== */}
      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* ==================== SECTION ROUTER (HOME, ABOUT, …) ==================== */}
      <main id="main-content" className="relative z-10">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'news' && <NewsPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'privacy' && <PrivacyPolicyPage />}
        {currentPage === 'terms' && <TermsOfServicePage />}
      </main>

      {/* ==================== FOOTER ==================== */}
      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
