'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/providers/ToastProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import BrandingLogo from '@/components/BrandingLogo';
import { useCompanyBranding } from '@/hooks/useCompanyBranding';
import { apiPath } from '@/lib/apiRoutes';

// --- Sections: Redirect if already authed | Branding header | Login form ---

export default function AdminLogin() {
  const router = useRouter();
  const toast = useToast();
  const { t, locale } = useLocale();
  const { logoSrc, companyName } = useCompanyBranding();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(apiPath('admin/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim(), password }),
        credentials: 'include',
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) {
        toast.error(data.error || (locale === 'vi-VN' ? 'Đăng nhập thất bại' : 'Login failed'));
        setLoading(false);
        return;
      }
      router.replace('/admin/dashboard');
    } catch {
      toast.error(locale === 'vi-VN' ? 'Lỗi máy chủ' : 'Server error');
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
            className="block w-20 h-20 mx-auto mb-4 rounded-full outline-none focus-visible:ring-2 focus-visible:ring-(--text-primary)/25"
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
            <span className="font-zcool tracking-wide">{companyName}</span>{' '}
            {locale === 'vi-VN' ? 'Quản trị' : 'Admin'}
          </h1>
          <p className="text-white/70">
            {locale === 'vi-VN' ? 'Hệ thống quản trị nội dung' : 'Content Management System'}
          </p>
        </div>

        {/* ==================== CREDENTIALS FORM ==================== */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-white font-medium block mb-2">
              {locale === 'vi-VN' ? 'Địa chỉ email' : 'Email Address'}
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@vuleits.com"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              autoComplete="username"
              disabled={loading}
            />
          </div>
          <div>
            <label htmlFor="password" className="text-white font-medium block mb-2">
              {locale === 'vi-VN' ? 'Mật khẩu' : 'Password'}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50"
              autoComplete="current-password"
              disabled={loading}
            />
          </div>
          <button type="submit" disabled={loading} className="w-full public-cta-button py-3 font-semibold text-center mt-6 disabled:opacity-50">
            {loading
              ? locale === 'vi-VN'
                ? 'Đang đăng nhập...'
                : 'Signing in...'
              : locale === 'vi-VN'
                ? 'Đăng nhập'
                : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
