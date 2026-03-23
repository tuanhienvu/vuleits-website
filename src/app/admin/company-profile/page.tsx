'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useToast } from '@/components/providers/ToastProvider';
import {
  SOCIAL_PLATFORM_IDS,
  defaultCompanyProfile,
  type CompanyProfileData,
  type SocialPlatformId,
} from '@/lib/companyProfileTypes';

function socialIcon(type: SocialPlatformId): string {
  const m: Record<SocialPlatformId, string> = {
    facebook: 'f',
    youtube: '▶',
    instagram: '📷',
    tiktok: '♪',
    twitter: '𝕏',
    linkedin: 'in',
    telegram: '✈',
    github: '⌘',
    website: '🔗',
    other: '·',
  };
  return m[type] || '·';
}

type MediaRow = { id: number; url: string; filename: string; mimeType: string };

export default function CompanyProfilePage() {
  const { t } = useLocale();
  const toast = useToast();
  const router = useRouter();
  const [profile, setProfile] = useState<CompanyProfileData>(() => defaultCompanyProfile());
  const [logoDisplayUrl, setLogoDisplayUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [libraryOpen, setLibraryOpen] = useState(false);
  const [library, setLibrary] = useState<MediaRow[]>([]);
  const [libraryLoading, setLibraryLoading] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/company-profile', { credentials: 'include' });
      if (res.status === 403 || res.status === 401) {
        router.replace('/admin/dashboard?tab=overview');
        return;
      }
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        throw new Error((d as { error?: string }).error || t('admin.companyLoadError'));
      }
      const data = (await res.json()) as { profile: CompanyProfileData; logoDisplayUrl: string };
      setProfile(data.profile);
      setLogoDisplayUrl(data.logoDisplayUrl || '');
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : t('admin.companyLoadError'));
    } finally {
      setLoading(false);
    }
  }, [router, t, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const openLibrary = async () => {
    setLibraryOpen(true);
    setLibraryLoading(true);
    try {
      const res = await fetch('/api/admin/media?take=100', { credentials: 'include' });
      if (!res.ok) {
        setLibrary([]);
        return;
      }
      const list = (await res.json()) as MediaRow[];
      setLibrary(Array.isArray(list) ? list : []);
    } catch {
      setLibrary([]);
    } finally {
      setLibraryLoading(false);
    }
  };

  async function save() {
    setSaving(true);
    try {
      const res = await fetch('/api/admin/company-profile', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((d as { error?: string }).error || t('admin.companySaveError'));
      }
      setProfile((d as { profile: CompanyProfileData }).profile);
      setLogoDisplayUrl((d as { logoDisplayUrl?: string }).logoDisplayUrl || '');
      toast.success(t('admin.companySaved'));
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : t('admin.companySaveError'));
    } finally {
      setSaving(false);
    }
  }

  async function onUploadFile(f: File | null) {
    if (!f) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.set('file', f);
      const res = await fetch('/api/admin/company-profile/logo', {
        method: 'POST',
        credentials: 'include',
        body: fd,
      });
      const d = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error((d as { error?: string }).error || 'Upload failed');
      }
      const url = (d as { url?: string }).url;
      const mediaId = (d as { mediaId?: number }).mediaId;
      if (url && mediaId != null) {
        setProfile((p) => ({ ...p, logoUrl: '', logoMediaId: mediaId }));
        setLogoDisplayUrl(url);
        toast.success(t('admin.logoUploadSuccess'));
      }
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }

  function pickFromLibrary(row: MediaRow) {
    setProfile((p) => ({ ...p, logoUrl: '', logoMediaId: row.id }));
    setLogoDisplayUrl(row.url);
    setLibraryOpen(false);
  }

  function addSocial() {
    setProfile((p) => ({
      ...p,
      socialLinks: [...p.socialLinks, { type: 'facebook', url: '' }],
    }));
  }

  if (loading) {
    return <div className="text-white/80 py-8">{t('admin.profileLoading')}</div>;
  }

  return (
    <div >
      <h1 className="text-2xl font-bold text-white mb-1">{t('admin.companyProfile')}</h1>
      <p className="text-white/60 text-sm mb-6">{t('admin.companyProfileDesc')}</p>

      <div className="space-y-6 bg-white/10 border border-white/15 rounded-xl p-6">
        <label className="block">
          <span className="text-white/80 text-sm font-medium">{t('admin.companyName')}</span>
          <input
            value={profile.companyName}
            onChange={(e) => setProfile((p) => ({ ...p, companyName: e.target.value }))}
            className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </label>

        <label className="block">
          <span className="text-white/80 text-sm font-medium">{t('admin.companyFullNameVi')}</span>
          <input
            value={profile.fullNameVi}
            onChange={(e) => setProfile((p) => ({ ...p, fullNameVi: e.target.value }))}
            className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </label>

        <label className="block">
          <span className="text-white/80 text-sm font-medium">{t('admin.companyFullNameEn')}</span>
          <input
            value={profile.fullNameEn}
            onChange={(e) => setProfile((p) => ({ ...p, fullNameEn: e.target.value }))}
            className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </label>

        <label className="block">
          <span className="text-white/80 text-sm font-medium">{t('admin.companySlogan')}</span>
          <input
            value={profile.slogan}
            onChange={(e) => setProfile((p) => ({ ...p, slogan: e.target.value }))}
            className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </label>

        <label className="block">
          <span className="text-white/80 text-sm font-medium">{t('admin.companyAddress')}</span>
          <textarea
            value={profile.address}
            onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
            rows={3}
            className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
        </label>

        <div>
          <span className="text-white/80 text-sm font-medium block mb-2">{t('admin.companyLogo')}</span>
          <div className="flex flex-wrap items-start gap-4">
            <div className="relative w-24 h-24 rounded-lg border border-white/20 bg-white/5 overflow-hidden shrink-0">
              {logoDisplayUrl ? (
                <Image src={logoDisplayUrl} alt="" fill className="object-contain" sizes="96px" unoptimized />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/40 text-xs">—</div>
              )}
            </div>
            <div className="flex-1 min-w-[12rem] space-y-3">
              <label className="block">
                <span className="text-white/60 text-xs">{t('admin.logoUrlHint')}</span>
                <input
                  value={profile.logoUrl}
                  onChange={(e) => {
                    const v = e.target.value;
                    setProfile((p) => ({ ...p, logoUrl: v, logoMediaId: null }));
                    setLogoDisplayUrl(v.trim());
                  }}
                  className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="https://…"
                />
              </label>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void openLibrary()}
                  className="bg-white/15 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/25"
                >
                  {t('admin.logoFromLibrary')}
                </button>
                <label className="inline-flex items-center gap-2 bg-white/15 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/25 cursor-pointer">
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) => void onUploadFile(e.target.files?.[0] ?? null)}
                  />
                  {uploading ? t('admin.uploading') : t('admin.logoUploadFile')}
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <label className="block sm:col-span-1">
            <span className="text-white/80 text-sm font-medium">{t('admin.contactEmail')}</span>
            <input
              type="email"
              value={profile.email}
              onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
              className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="text-white/80 text-sm font-medium">{t('admin.contactPhone')}</span>
            <input
              value={profile.phone}
              onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
              className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </label>
          <label className="block sm:col-span-1">
            <span className="text-white/80 text-sm font-medium">{t('admin.contactHotline')}</span>
            <input
              value={profile.hotline}
              onChange={(e) => setProfile((p) => ({ ...p, hotline: e.target.value }))}
              className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-white/80 text-sm font-medium">{t('admin.mapEmbedUrl')}</span>
          <p className="text-white/50 text-xs mt-0.5 mb-1">{t('admin.mapEmbedHint')}</p>
          <textarea
            value={profile.mapEmbedUrl}
            onChange={(e) => setProfile((p) => ({ ...p, mapEmbedUrl: e.target.value }))}
            rows={2}
            placeholder="https://www.google.com/maps/embed?pb=…"
            className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-white/30 font-mono"
          />
        </label>

        <div>
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-white/80 text-sm font-medium">{t('admin.socialLinks')}</span>
            <button
              type="button"
              onClick={addSocial}
              className="text-sm bg-white/15 text-white px-3 py-1.5 rounded-lg hover:bg-white/25"
            >
              {t('admin.socialAdd')}
            </button>
          </div>
          <div className="space-y-3">
            {profile.socialLinks.map((row, i) => (
              <div key={i} className="flex flex-wrap items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/15 text-white text-sm font-bold"
                  title={row.type}
                >
                  {socialIcon(row.type)}
                </span>
                <select
                  value={row.type}
                  onChange={(e) => {
                    const type = e.target.value as SocialPlatformId;
                    setProfile((p) => ({
                      ...p,
                      socialLinks: p.socialLinks.map((s, j) => (j === i ? { ...s, type } : s)),
                    }));
                  }}
                  className="bg-white/15 border border-white/25 text-white text-sm rounded-lg px-2 py-2"
                  aria-label={t('admin.socialType')}
                >
                  {SOCIAL_PLATFORM_IDS.map((id) => (
                    <option key={id} value={id} className="bg-gray-900 text-white">
                      {id}
                    </option>
                  ))}
                </select>
                <input
                  value={row.url}
                  onChange={(e) => {
                    const url = e.target.value;
                    setProfile((p) => ({
                      ...p,
                      socialLinks: p.socialLinks.map((s, j) => (j === i ? { ...s, url } : s)),
                    }));
                  }}
                  placeholder="https://"
                  className="flex-1 min-w-[10rem] bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm"
                  aria-label={t('admin.socialUrl')}
                />
                <button
                  type="button"
                  onClick={() =>
                    setProfile((p) => ({
                      ...p,
                      socialLinks: p.socialLinks.filter((_, j) => j !== i),
                    }))
                  }
                  className="text-red-300 text-sm px-2 py-1 hover:bg-red-500/20 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => void save()}
          disabled={saving}
          className="cta-button px-6 py-2 disabled:opacity-50"
        >
          {saving ? t('admin.saving') : t('admin.saveCompanyProfile')}
        </button>
      </div>

      {libraryOpen && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-8">
          <div className="absolute inset-0 bg-black/70" aria-hidden onClick={() => setLibraryOpen(false)} />
          <div className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl border border-white/15 bg-[#12121a] shadow-2xl">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h2 className="text-lg font-semibold text-white">{t('admin.pickLogoTitle')}</h2>
              <button
                type="button"
                onClick={() => setLibraryOpen(false)}
                className="text-white/70 hover:text-white px-2 py-1 rounded"
              >
                {t('admin.close')}
              </button>
            </div>
            <div className="overflow-y-auto p-4">
              {libraryLoading ? (
                <p className="text-white/60 text-sm">{t('admin.profileLoading')}</p>
              ) : library.length === 0 ? (
                <p className="text-white/60 text-sm">{t('admin.noImagesInLibrary')}</p>
              ) : (
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {library.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => pickFromLibrary(m)}
                      className="relative aspect-square rounded-lg border border-white/20 overflow-hidden hover:ring-2 hover:ring-white/40"
                    >
                      <Image src={m.url} alt="" fill className="object-cover" sizes="120px" unoptimized />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
