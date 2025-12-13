'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ServicesPage from '@/components/pages/ServicesPage';
import ContactPage from '@/components/pages/ContactPage';
import ProductsPage from '@/components/pages/ProductsPage';
import NewsPage from '@/components/pages/NewsPage';
import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/components/pages/TermsOfServicePage';
import Footer from '@/components/Footer';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0c0c] via-[#1a1a2e] to-[#a0616a]">
      {/* Background Shapes */}
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

      <Navigation currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="relative z-10">
        {currentPage === 'home' && <HomePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'services' && <ServicesPage />}
        {currentPage === 'products' && <ProductsPage />}
        {currentPage === 'news' && <NewsPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'privacy' && <PrivacyPolicyPage />}
        {currentPage === 'terms' && <TermsOfServicePage />}
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
