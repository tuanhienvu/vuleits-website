'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/providers/ToastProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import BrandingLogo from '@/components/BrandingLogo';
import { useCompanyBranding } from '@/hooks/useCompanyBranding';

// --- Sections: Redirect if already authed | Branding header | Login form ---

export default function AdminLogin() {
  const toast = useToast();
  const { t } = useLocale();
  const { logoSrc, companyName } = useCompanyBranding();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/admin/me', { credentials: 'include' });
        if (res.ok) window.location.href = '/admin/dashboard';
      } catch {
        // ignore
      }
    };
    void checkAuth();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
        credentials: 'include',
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || 'Login failed');
        setLoading(false);
        return;
      }
      window.location.href = '/admin/dashboard';
    } catch {
      toast.error('Server error');
      setLoading(false);
    }
  };

  return (
    <div className="public-shell min-h-screen theme-page-gradient flex items-center justify-center px-4">
      <div className="glass p-8 md:p-12 rounded-3xl w-full max-w-md relative z-10">
        {/* ==================== BRAND & TITLE ==================== */}
        <div className="text-center mb-8">
          <Link
            href="/"
            className="block w-20 h-20 mx-auto mb-4 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--text-primary)]/25"
            aria-label={t('nav.home')}
          >
            <BrandingLogo
              src={logoSrc}
              alt={`${companyName} logo`}
              sizes="80px"
              className="w-20 h-20"
              imgClassName="object-contain rounded-full"
              priority
            />
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            <span className="font-zcool tracking-wide">{companyName}</span> Admin
          </h1>
          <p className="text-white/70">Content Management System</p>
        </div>

        {/* ==================== CREDENTIALS FORM ==================== */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-white font-medium block mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vuleits.com"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white font-medium block mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading} className="w-full public-cta-button py-3 font-semibold text-center mt-6 disabled:opacity-50">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-white/60 text-sm text-center mt-6">For trial: user: demo@vuleits.com | password: demo</p>
      </div>
    </div>
  );
}
