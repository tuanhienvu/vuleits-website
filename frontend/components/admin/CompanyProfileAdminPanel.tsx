'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  defaultCompanyProfile,
  SOCIAL_PLATFORM_IDS,
  type CompanyProfileData,
  type SocialPlatformId,
} from '@/lib/companyProfileTypes';
import { resolveMapPreviewSrc } from '@/lib/googleMapsEmbed';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useEscapeToClose } from '@/components/admin/useEscapeToClose';
import { useToast } from '@/components/providers/ToastProvider';

// --- Sections (UI): Sticky header | Identity & map | Logo & social | Media library picker ---
// --- Sections (logic): Load/save profile | Logo modes | Map preview | Social rows ---

type MediaRow = { id: number; url: string; filename: string; mimeType: string };

type LogoSourceMode = 'upload' | 'library' | 'url';

function logoModeFromProfile(p: CompanyProfileData): LogoSourceMode {
  if (p.logoUrl.trim()) return 'url';
  if (p.logoMediaId != null) return 'library';
  return 'upload';
}

export default function CompanyProfileAdminPanel() {
  const { can } = useAdminPermissions();
  const toast = useToast();
  const canUpdate = can('contacts', 'update');
  const canMediaRead = can('media', 'read');
  const [loading, setLoading] = useState(true);
  const [forbidden, setForbidden] = useState(false);
  const [logoDisplayUrl, setLogoDisplayUrl] = useState<string | null>(null);
  const [form, setForm] = useState<CompanyProfileData>(() => defaultCompanyProfile());
  const [baseline, setBaseline] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [mediaPickerOpen, setMediaPickerOpen] = useState(false);
  const [mediaList, setMediaList] = useState<MediaRow[]>([]);
  const [mediaLoading, setMediaLoading] = useState(false);
  const [logoMode, setLogoMode] = useState<LogoSourceMode>('upload');
  const logoFileInputRef = useRef<HTMLInputElement>(null);

  useEscapeToClose(mediaPickerOpen, () => setMediaPickerOpen(false));

  const logoPreviewSrc = useMemo(() => {
    const u = form.logoUrl.trim();
    if (u) return u;
    if (logoDisplayUrl) return logoDisplayUrl;
    return null;
  }, [form.logoUrl, logoDisplayUrl]);

  const mapPreviewSrc = useMemo(() => resolveMapPreviewSrc(form.mapEmbedUrl, form.address), [form.mapEmbedUrl, form.address]);

  const load = useCallback(async () => {
    setLoading(true);
    setForbidden(false);
    try {
      const res = await fetch('/api/admin/company-profile', { credentials: 'include' });
      if (res.status === 403) {
        setForbidden(true);
        return;
      }
      if (!res.ok) {
        if (res.status === 401) window.location.href = '/admin/login';
        throw new Error('Load failed');
      }
      const data = (await res.json()) as { profile?: CompanyProfileData; logoDisplayUrl?: string | null };
      // API returns { profile, logoDisplayUrl }; merge so all fields show even if partial.
      const profile = data.profile && typeof data.profile === 'object' ? data.profile : null;
      const merged = { ...defaultCompanyProfile(), ...(profile ?? {}) };
      setForm(merged);
      setBaseline(JSON.stringify(merged));
      setLogoDisplayUrl(data.logoDisplayUrl ?? null);
      setLogoMode(logoModeFromProfile(merged));
    } catch {
      toast.error('Failed to load company profile');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!can('contacts', 'read')) return;
    void load();
  }, [can, load]);

  const save = async () => {
    if (!can('contacts', 'update')) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/company-profile', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || 'Save failed');
      }
      const data = (await res.json()) as { profile?: CompanyProfileData; logoDisplayUrl?: string | null };
      toast.success('Saved');
      if (data.profile) {
        const merged = { ...defaultCompanyProfile(), ...data.profile };
        setForm(merged);
        setBaseline(JSON.stringify(merged));
        setLogoMode(logoModeFromProfile(merged));
      }
      setLogoDisplayUrl(data.logoDisplayUrl ?? null);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const setSocial = (index: number, patch: Partial<{ type: SocialPlatformId; url: string }>) => {
    setForm((f) => {
      const socialLinks = [...f.socialLinks];
      const cur = socialLinks[index] ?? { type: 'other' as SocialPlatformId, url: '' };
      socialLinks[index] = { ...cur, ...patch };
      return { ...f, socialLinks };
    });
  };

  const addSocial = () => {
    setForm((f) => ({ ...f, socialLinks: [...f.socialLinks, { type: 'other', url: '' }] }));
  };

  const removeSocial = (index: number) => {
    setForm((f) => ({ ...f, socialLinks: f.socialLinks.filter((_, i) => i !== index) }));
  };

  const uploadCompanyLogo = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canUpdate) return;
    setLogoUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/company-profile/logo', { method: 'POST', credentials: 'include', body: fd });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || 'Upload failed');
      }
      const j = (await res.json()) as { mediaId?: number; url?: string };
      if (j.mediaId != null && j.url) {
        setForm((f) => ({ ...f, logoMediaId: j.mediaId!, logoUrl: '' }));
        setLogoDisplayUrl(j.url);
        setLogoMode('library');
        toast.success('Logo uploaded. Save changes to persist.');
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setLogoUploading(false);
      e.target.value = '';
    }
  };

  const openMediaPicker = async () => {
    if (!canMediaRead) {
      toast.error('You need Media → View permission to pick from the library.');
      return;
    }
    setMediaPickerOpen(true);
    setMediaLoading(true);
    try {
      const res = await fetch('/api/admin/media?take=200&imagesOnly=1', { credentials: 'include' });
      if (!res.ok) throw new Error('Failed');
      const list = (await res.json()) as MediaRow[];
      setMediaList(Array.isArray(list) ? list : []);
    } catch {
      toast.error('Failed to load media library');
      setMediaList([]);
    } finally {
      setMediaLoading(false);
    }
  };

  const selectMediaLogo = (row: MediaRow) => {
    setForm((f) => ({ ...f, logoMediaId: row.id, logoUrl: '' }));
    setLogoDisplayUrl(row.url);
    setLogoMode('library');
    setMediaPickerOpen(false);
    toast.success('Logo selected from library. Save changes to persist.');
  };

  const clearLogo = () => {
    setForm((f) => ({ ...f, logoUrl: '', logoMediaId: null }));
    setLogoDisplayUrl(null);
    setLogoMode('upload');
  };

  const hasChanges = baseline !== '' && baseline !== JSON.stringify(form);

  if (!can('contacts', 'read')) {
    return <div className="text-white/70">No permission.</div>;
  }

  if (forbidden) {
    return (
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">Contacts &amp; company profile</h2>
        <p className="text-white/75 max-w-xl">
          Company profile is restricted to Administrator accounts. Sign in as an ADMIN or SYSADMIN user to edit contact details and branding.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ==================== STICKY HEADER & SAVE ACTIONS ==================== */}
      <div className="glass rounded-2xl p-4 border border-white/10 sticky top-3 z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white">Company Profile Manager</h2>
            <p className="text-white/65 text-sm mt-1">Manage branding, company information, contact channels, and social links.</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {hasChanges ? <span className="text-amber-200 text-xs px-2 py-1 rounded-md bg-amber-500/10 border border-amber-400/30">Unsaved changes</span> : null}
            <button type="button" className="btn-admin-secondary" disabled={loading || saving} onClick={() => void load()}>
              Reload
            </button>
            {canUpdate ? (
              <button
                type="button"
                className="btn-admin-primary"
                disabled={saving || loading || !hasChanges}
                onClick={() => void save()}
              >
                {saving ? 'Saving…' : 'Save changes'}
              </button>
            ) : null}
          </div>
        </div>
      </div>
      {loading ? <p className="text-white/70">Loading…</p> : null}
      {!loading ? (
        <div className="grid xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            {/* ==================== COMPANY IDENTITY & CONTACT ==================== */}
            <section className="glass rounded-2xl p-5 border border-white/10 space-y-4">
              <h3 className="text-white text-lg font-semibold">Identity</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-white/70 text-sm">Company name</span>
                  <input
                    placeholder="VULEITS"
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35"
                    value={form.companyName}
                    onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
                    disabled={!canUpdate}
                  />
                </label>
                <label className="block">
                  <span className="text-white/70 text-sm">Slogan</span>
                  <input
                    placeholder="Innovation …"
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35"
                    value={form.slogan}
                    onChange={(e) => setForm((f) => ({ ...f, slogan: e.target.value }))}
                    disabled={!canUpdate}
                  />
                </label>
                <label className="block">
                  <span className="text-white/70 text-sm">Full name (VI)</span>
                  <input
                    placeholder="Công ty …"
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35"
                    value={form.fullNameVi}
                    onChange={(e) => setForm((f) => ({ ...f, fullNameVi: e.target.value }))}
                    disabled={!canUpdate}
                  />
                </label>
                <label className="block">
                  <span className="text-white/70 text-sm">Full name (EN)</span>
                  <input
                    placeholder="… Joint Stock Company"
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35"
                    value={form.fullNameEn}
                    onChange={(e) => setForm((f) => ({ ...f, fullNameEn: e.target.value }))}
                    disabled={!canUpdate}
                  />
                </label>
                <label className="block">
                  <span className="text-white/70 text-sm">Email</span>
                  <input
                    type="email"
                    placeholder="contact@company.com"
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35"
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    disabled={!canUpdate}
                  />
                </label>
                <label className="block">
                  <span className="text-white/70 text-sm">Email (secondary)</span>
                  <input
                    type="email"
                    placeholder="support@company.com"
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35"
                    value={form.email2}
                    onChange={(e) => setForm((f) => ({ ...f, email2: e.target.value }))}
                    disabled={!canUpdate}
                  />
                </label>
                <label className="block">
                  <span className="text-white/70 text-sm">Phone</span>
                  <input
                    placeholder="+84 …"
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    disabled={!canUpdate}
                  />
                </label>
                <label className="block">
                  <span className="text-white/70 text-sm">Hotline</span>
                  <input
                    placeholder="1900 …"
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35"
                    value={form.hotline}
                    onChange={(e) => setForm((f) => ({ ...f, hotline: e.target.value }))}
                    disabled={!canUpdate}
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-white/70 text-sm">Address</span>
                  <textarea
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white min-h-[72px] placeholder:text-white/35"
                    value={form.address}
                    placeholder="Office address..."
                    onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                    disabled={!canUpdate}
                  />
                </label>
              </div>
            </section>

            {/* ==================== MAP EMBED & PREVIEW ==================== */}
            <section className="glass rounded-2xl p-5 border border-white/10 space-y-4">
              <h3 className="text-white text-lg font-semibold">Map</h3>
              <label className="block">
                <span className="text-white/70 text-sm">Map embed URL</span>
                <input
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-xs placeholder:text-white/35"
                  value={form.mapEmbedUrl}
                  placeholder="https://www.google.com/maps/embed?..."
                  onChange={(e) => setForm((f) => ({ ...f, mapEmbedUrl: e.target.value }))}
                  disabled={!canUpdate}
                />
                <p className="text-white/45 text-xs mt-1">
                  Use Google Maps &quot;Share&quot; → &quot;Embed a map&quot; (HTTPS). If empty, preview uses Address above.
                </p>
              </label>
              <div>
                <p className="text-white/70 text-sm mb-2">Preview</p>
                <div className="rounded-xl overflow-hidden border border-white/15 bg-black/30 aspect-video min-h-[200px]">
                  {mapPreviewSrc ? (
                    <iframe
                      title="Map preview"
                      src={mapPreviewSrc}
                      className="w-full h-full min-h-[200px]"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  ) : (
                    <div className="h-full min-h-[200px] flex items-center justify-center p-4 text-white/45 text-sm text-center">
                      Add a valid embed URL or fill Address to preview the map.
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            {/* ==================== LOGO & BRANDING ==================== */}
            <section className="glass rounded-2xl p-5 border border-white/10 space-y-4">
              <h3 className="text-white text-lg font-semibold">Logo &amp; branding</h3>
              <div className="flex flex-col gap-4 max-w-2xl mx-auto w-full">
                <div className="flex flex-col items-center text-center">
                  <div className="size-[4.55rem] rounded-full border border-white/20 bg-white/10 flex items-center justify-center overflow-hidden shrink-0">
                    {logoPreviewSrc ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img src={logoPreviewSrc} alt="Logo preview" className="max-w-full max-h-full object-contain" />
                    ) : (
                      <span className="text-white/35 text-[10px] text-center px-1 leading-tight">No logo</span>
                    )}
                  </div>
                </div>

                <input
                  ref={logoFileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={uploadCompanyLogo}
                  disabled={!canUpdate || logoUploading}
                />

                <div>
                  <div className="min-w-0 w-full">
                    <select
                      id="logo-source-select"
                      className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35 disabled:opacity-50"
                      value={logoMode}
                      onChange={(e) => setLogoMode(e.target.value as LogoSourceMode)}
                      disabled={!canUpdate}
                      aria-label="How to set the company logo"
                    >
                      <option value="upload" className="bg-slate-900 text-white">
                        Upload new image
                      </option>
                      <option value="library" className="bg-slate-900 text-white">
                        Choose from library
                      </option>
                      <option value="url" className="bg-slate-900 text-white">
                        External image URL
                      </option>
                    </select>
                  </div>

                  <div className="mt-2 w-full min-w-0">
                    {logoMode === 'upload' ? (
                      <button
                        type="button"
                        onClick={() => logoFileInputRef.current?.click()}
                        disabled={!canUpdate || logoUploading}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm hover:bg-white/15 disabled:opacity-50"
                      >
                        {logoUploading ? 'Uploading…' : 'Choose file…'}
                      </button>
                    ) : null}

                    {logoMode === 'library' ? (
                      <button
                        type="button"
                        onClick={() => void openMediaPicker()}
                        disabled={!canUpdate || logoUploading}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm hover:bg-white/15 disabled:opacity-50"
                      >
                        Browse library…
                      </button>
                    ) : null}

                    {logoMode === 'url' ? (
                      <input
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35"
                        value={form.logoUrl}
                        placeholder="https://…"
                        onChange={(e) => {
                          const v = e.target.value;
                          setForm((f) => ({
                            ...f,
                            logoUrl: v,
                            logoMediaId: v.trim() ? null : f.logoMediaId,
                          }));
                          if (v.trim()) setLogoMode('url');
                        }}
                        disabled={!canUpdate}
                        aria-label="External image URL"
                      />
                    ) : null}
                  </div>

                  {logoMode === 'upload' ? (
                    <p className="text-white/45 text-xs mt-1">JPEG, PNG, WebP, or GIF · up to 5&nbsp;MB</p>
                  ) : null}
                  {logoMode === 'library' ? (
                    <p className="text-white/45 text-xs mt-1">
                      {!canMediaRead
                        ? 'Requires Media → View permission.'
                        : 'Select an existing image from your uploads.'}
                    </p>
                  ) : null}
                  {logoMode === 'url' ? (
                    <p className="text-white/45 text-xs mt-1">
                      Saved as the logo URL. Overrides library media when not empty.
                    </p>
                  ) : null}
                </div>

                <p className="text-white/45 text-xs">Save changes at the top to publish your logo.</p>

                {(form.logoMediaId != null || form.logoUrl.trim() || logoDisplayUrl) && (
                  <div className="flex justify-center sm:justify-start">
                    <button
                      type="button"
                      onClick={clearLogo}
                      disabled={!canUpdate}
                      className="p-0 bg-transparent border-0 text-sm text-red-400 hover:text-red-300 underline underline-offset-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:no-underline"
                    >
                      Remove logo
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* ==================== SOCIAL LINKS ==================== */}
            <section className="glass rounded-2xl p-5 border border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Social links</h3>
                {canUpdate ? (
                  <button type="button" className="btn-admin-secondary text-sm py-1 px-2" onClick={addSocial}>
                    Add link
                  </button>
                ) : null}
              </div>
              {form.socialLinks.map((link, i) => (
                <div key={i} className="space-y-2 rounded-lg border border-white/10 p-3 bg-white/5">
                  <div className="flex flex-wrap gap-2 items-end">
                    <label className="flex-1 min-w-[120px]">
                      <span className="text-white/60 text-xs">Platform</span>
                      <select
                        className="mt-1 w-full px-2 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
                        value={link.type}
                        onChange={(e) => setSocial(i, { type: e.target.value as SocialPlatformId })}
                        disabled={!canUpdate}
                      >
                        {SOCIAL_PLATFORM_IDS.map((id) => (
                          <option key={id} value={id}>
                            {id}
                          </option>
                        ))}
                      </select>
                    </label>
                    <button
                      type="button"
                      className="btn-admin-icon-danger text-sm"
                      onClick={() => removeSocial(i)}
                      disabled={!canUpdate}
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                  <label className="block">
                    <span className="text-white/60 text-xs">URL</span>
                    <input
                      className="mt-1 w-full px-2 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/35"
                      value={link.url}
                      onChange={(e) => setSocial(i, { url: e.target.value })}
                      disabled={!canUpdate}
                      placeholder="https://..."
                    />
                  </label>
                </div>
              ))}
              {form.socialLinks.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/20 p-4 text-white/45 text-sm">No social links. Add one to start.</div>
              ) : null}
            </section>
          </div>
        </div>
      ) : null}

      {/* ==================== LOGO MEDIA LIBRARY PICKER ==================== */}
      {mediaPickerOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="media-picker-title"
        >
          <div className="glass rounded-2xl border border-white/15 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-xl">
            <div className="flex items-center justify-between gap-2 p-4 border-b border-white/10">
              <h3 id="media-picker-title" className="text-lg font-semibold text-white">
                Choose logo from library
              </h3>
              <button
                type="button"
                className="text-white/70 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10"
                onClick={() => setMediaPickerOpen(false)}
              >
                Close
              </button>
            </div>
            <div className="overflow-y-auto p-4 min-h-[120px]">
              {mediaLoading ? (
                <p className="text-white/60 text-sm">Loading…</p>
              ) : mediaList.length === 0 ? (
                <p className="text-white/50 text-sm">No images in the library yet.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {mediaList.map((row) => (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => selectMediaLogo(row)}
                      className="rounded-xl border border-white/15 overflow-hidden bg-white/5 hover:border-cyan-400/50 hover:bg-white/10 transition text-left"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={row.url} alt="" className="w-full aspect-square object-cover" />
                      <span className="block px-2 py-1.5 text-white/80 text-xs truncate" title={row.filename}>
                        {row.filename}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
