'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useToast } from '@/components/providers/ToastProvider';

type Me = {
  id: number;
  email: string;
  displayName: string | null;
  roleId: number;
  role: { name: string } | null;
};

export default function AdminProfilePage() {
  const { t } = useLocale();
  const toast = useToast();
  const [me, setMe] = useState<Me | null>(null);
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/admin/me', { credentials: 'include' });
        if (!res.ok) {
          if (res.status === 401 || res.status === 403) {
            window.location.href = '/admin/login';
            return;
          }
          throw new Error('Failed to load profile');
        }
        const data = (await res.json()) as Me;
        if (!cancelled) {
          setMe(data);
          setDisplayName(data.displayName ?? '');
        }
      } catch {
        if (!cancelled) toast.error(t('admin.profileLoadError'));
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [t, toast]);

  async function saveDisplayName() {
    if (!me) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/me', {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ displayName: displayName.trim() || null }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((data as { error?: string }).error || 'Save failed');
      }
      const next = data as Me;
      setMe(next);
      setDisplayName(next.displayName ?? '');
      toast.success(t('admin.profileSaved'));
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : t('admin.profileSaveError'));
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="text-white/80">{t('admin.profileLoading')}</div>
    );
  }

  if (!me && !loading) {
    return (
      <div className="text-white/70">
        {t('admin.profileLoadError')}
      </div>
    );
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-white mb-1">{t('admin.profileTitle')}</h1>
      <p className="text-white/60 text-sm mb-6">{t('admin.profileSubtitle')}</p>

      <div className="bg-white/10 border border-white/15 rounded-xl p-6 space-y-5">
        <div>
          <label className="block text-white/70 text-sm font-medium mb-1">{t('admin.profileEmail')}</label>
          <p className="text-white font-medium">{me?.email}</p>
        </div>
        <div>
          <label className="block text-white/70 text-sm font-medium mb-1">{t('admin.profileRole')}</label>
          <p className="text-white font-medium">{me?.role?.name ?? '—'}</p>
        </div>
        <div>
          <label htmlFor="profile-display" className="block text-white/70 text-sm font-medium mb-1">
            {t('admin.profileDisplayName')}
          </label>
          <input
            id="profile-display"
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            maxLength={150}
            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            placeholder={t('admin.profileDisplayNamePlaceholder')}
          />
        </div>
        <button
          type="button"
          onClick={() => void saveDisplayName()}
          disabled={saving}
          className="cta-button px-6 py-2 disabled:opacity-50"
        >
          {saving ? t('admin.saving') : t('admin.saveChanges')}
        </button>
      </div>
    </div>
  );
}
