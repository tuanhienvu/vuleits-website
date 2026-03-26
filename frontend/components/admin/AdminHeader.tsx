'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useToast } from '@/components/providers/ToastProvider';
import LocaleSwitcher from '@/components/LocaleSwitcher';

interface AdminHeaderProps {
  onMenuClick: () => void;
}

type Me = {
  id: number;
  email: string;
  displayName: string | null;
  roleId: number;
  role: { name: string } | null;
};

function avatarInitials(displayName: string | null, email: string): string {
  const d = (displayName ?? '').trim();
  if (d) {
    const parts = d.split(/\s+/).filter(Boolean);
    // Return exactly 1 character to fit the circular avatar.
    return (parts[0]?.charAt(0) || d.charAt(0) || '?').toUpperCase();
  }
  const local = email.split('@')[0] || email;
  return (local.charAt(0) || '?').toUpperCase();
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
  const router = useRouter();
  const { t } = useLocale();
  const toast = useToast();
  const [me, setMe] = useState<Me | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [passwordOpen, setPasswordOpen] = useState(false);
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [passwordSaving, setPasswordSaving] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/admin/me', { credentials: 'include' });
        if (res.ok) {
          const data = (await res.json()) as Me;
          if (data?.email) setMe(data);
        }
      } catch {
        // ignore
      }
    };
    void fetchUser();
  }, []);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [menuOpen]);

  useEffect(() => {
    if (!passwordOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPasswordOpen(false);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [passwordOpen]);

  const handleLogout = async () => {
    setMenuOpen(false);
    try {
      const res = await fetch('/api/admin/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (res.ok) {
        router.push('/admin/login');
      }
    } catch {
      router.push('/admin/login');
    }
  };

  function openPasswordModal() {
    setMenuOpen(false);
    setCurrentPw('');
    setNewPw('');
    setConfirmPw('');
    setPasswordOpen(true);
  }

  async function submitPasswordChange() {
    if (newPw !== confirmPw) {
      toast.error(t('admin.passwordMismatch'));
      return;
    }
    setPasswordSaving(true);
    try {
      const res = await fetch('/api/admin/me/password', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        toast.error((data as { error?: string }).error || t('admin.passwordChangeError'));
        return;
      }
      toast.success(t('admin.passwordChanged'));
      setCurrentPw('');
      setNewPw('');
      setConfirmPw('');
      setPasswordOpen(false);
    } catch {
      toast.error(t('admin.passwordChangeError'));
    } finally {
      setPasswordSaving(false);
    }
  }

  const label = me ? avatarInitials(me.displayName, me.email) : '?';
  const subtitle = me?.displayName?.trim() || me?.email || '';

  return (
    <header className="sticky top-0 z-30 bg-[#0a0a0a]/80 backdrop-blur-lg border-b border-white/10">
      <div className="flex items-center justify-between px-4 lg:px-6 py-4">
        <div className="flex items-center gap-4 min-w-0">
          <button
            type="button"
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-white/70 hover:bg-white/10 hover:text-white transition-colors shrink-0"
            aria-label={t('nav.toggleMenu')}
          >
            <span className="text-2xl">☰</span>
          </button>
          <div className="min-w-0">
            <h1 className="text-xl lg:text-2xl font-bold text-white truncate">{t('admin.dashboardTitle')}</h1>
            <p className="text-white/60 text-sm hidden sm:block truncate">{t('admin.dashboardWelcome')}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              className="flex items-center gap-2 rounded-xl px-3 sm:px-1 py-1 hover:bg-white/15 transition-colors"
              aria-expanded={menuOpen}
              aria-haspopup="menu"
              aria-label={t('admin.openUserMenu')}
            >
              <span className="hidden sm:flex flex-col items-end gap-0.5 max-w-40 lg:max-w-56 text-right min-w-0">
                <span className="text-white text-sm font-medium truncate max-w-full">{subtitle}</span>
                {me?.role?.name ? (
                  <span className="text-white/50 text-xs truncate max-w-full">{me.role.name}</span>
                ) : null}
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-[#a0616a] to-[#4a3f55] text-base leading-none font-bold text-white shadow-inner select-none">
                {label}
              </span>
              <span className="text-white/60 text-xs hidden sm:inline shrink-0 pr-1">{menuOpen ? '▴' : '▾'}</span>
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-xl border border-white/15 bg-[#14141c]/95 backdrop-blur-lg shadow-xl py-1 z-50"
                role="menu"
              >
                <Link
                  href="/admin/profile"
                  role="menuitem"
                  className="block px-4 py-2.5 text-sm text-white/90 hover:bg-white/10"
                  onClick={() => setMenuOpen(false)}
                >
                  {t('admin.userProfile')}
                </Link>
                <button
                  type="button"
                  role="menuitem"
                  className="w-full text-left px-4 py-2.5 text-sm text-white/90 hover:bg-white/10"
                  onClick={openPasswordModal}
                >
                  {t('admin.changePassword')}
                </button>
                <div className="my-1 border-t border-white/10" />
                <button
                  type="button"
                  role="menuitem"
                  className="w-full text-left px-4 py-2.5 text-sm text-red-200 hover:bg-red-500/20"
                  onClick={() => void handleLogout()}
                >
                  {t('admin.logout')}
                </button>
              </div>
            )}
          </div>

          <LocaleSwitcher className="flex items-center text-white bg-transparent border-0 px-2 py-1.5 rounded-lg text-sm hover:bg-white/10" />
        </div>
      </div>

      {passwordOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center px-2 sm:px-4">
          <div
            className="absolute inset-0 bg-black/65"
            aria-hidden
            onClick={() => !passwordSaving && setPasswordOpen(false)}
          />
          <div
            className="relative w-full max-w-md max-h-[92vh] rounded-2xl border border-white/15 bg-[#16161f] shadow-2xl overflow-hidden"
            role="dialog"
            aria-labelledby="pwd-dialog-title"
          >
            <div className="px-4 sm:px-6 py-4 border-b border-white/10 bg-white/5">
              <h2 id="pwd-dialog-title" className="text-lg font-bold text-white">
                {t('admin.changePasswordTitle')}
              </h2>
            </div>
            <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-3 overflow-y-auto max-h-[calc(92vh-124px)] pb-24 sm:pb-6">
              <label className="block">
                <span className="text-white/70 text-sm">{t('admin.currentPassword')}</span>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={currentPw}
                  onChange={(e) => setCurrentPw(e.target.value)}
                  className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </label>
              <label className="block">
                <span className="text-white/70 text-sm">{t('admin.newPassword')}</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={newPw}
                  onChange={(e) => setNewPw(e.target.value)}
                  className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </label>
              <label className="block">
                <span className="text-white/70 text-sm">{t('admin.confirmPassword')}</span>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={confirmPw}
                  onChange={(e) => setConfirmPw(e.target.value)}
                  className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                />
              </label>
            </div>
            <div className="sticky bottom-0 left-0 right-0 flex justify-end gap-2 px-4 sm:px-6 py-3 border-t border-white/10 bg-[#14141c]/95 backdrop-blur">
              <button
                type="button"
                className="btn-admin-secondary"
                disabled={passwordSaving}
                onClick={() => setPasswordOpen(false)}
              >
                {t('admin.cancel')}
              </button>
              <button
                type="button"
                className="btn-admin-primary"
                disabled={passwordSaving}
                onClick={() => void submitPasswordChange()}
              >
                {passwordSaving ? '…' : t('admin.updatePassword')}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
