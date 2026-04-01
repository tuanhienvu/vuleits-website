'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { defaultAboutIntroPayload, sanitizeHeroImageSrc, type AboutIntroPayload } from '@/lib/aboutIntroSetting';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useToast } from '@/components/providers/ToastProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import AdminTinyMceEditor from '@/components/admin/AdminTinyMceEditor';

// --- Sections (UI): Sticky header | Titles | Intro (TinyMCE) | Hero image & preview ---

export default function AboutIntroAdminPanel() {
  const { t } = useLocale();
  const { can } = useAdminPermissions();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<AboutIntroPayload>(() => defaultAboutIntroPayload());
  const [baseline, setBaseline] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/about-intro', { credentials: 'include' });
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      if (!res.ok) throw new Error('Load failed');
      const data = (await res.json()) as AboutIntroPayload;
      const merged = { ...defaultAboutIntroPayload(), ...data };
      setForm(merged);
      setBaseline(JSON.stringify(merged));
    } catch {
      toast.error('Failed to load About intro');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!can('aboutTeam', 'read')) return;
    void load();
  }, [can, load]);

  const save = async () => {
    if (!can('aboutTeam', 'update')) return;
    setSaving(true);
    try {
      const res = await fetch('/api/admin/about-intro', {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || 'Save failed');
      }
      const json = (await res.json()) as AboutIntroPayload & { ok?: boolean };
      const { ok: _discard, ...data } = json;
      void _discard;
      const next = { ...defaultAboutIntroPayload(), ...data };
      setForm(next);
      setBaseline(JSON.stringify(next));
      toast.success(t('admin.aboutUsSaved'));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = baseline !== '' && baseline !== JSON.stringify(form);
  const heroPreviewSrc = useMemo(() => sanitizeHeroImageSrc(form.heroImageUrl), [form.heroImageUrl]);

  if (!can('aboutTeam', 'read')) {
    return <div className="text-white/70">{t('admin.aboutUsNoPermission')}</div>;
  }

  const inputClass =
    'mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400/50';

  return (
    <div className="space-y-6 w-full">
      {/* ==================== STICKY HEADER & SAVE ==================== */}
      <div className="glass rounded-2xl p-4 border border-white/10 sticky top-3 z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white">{t('admin.aboutUs')}</h2>
            <p className="text-white/65 text-sm mt-1">{t('admin.aboutUsPageSubtitle')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {hasChanges ? (
              <span className="text-amber-200 text-xs px-2 py-1 rounded-md bg-amber-500/10 border border-amber-400/30">Unsaved changes</span>
            ) : null}
            <button type="button" className="btn-admin-secondary" disabled={loading || saving} onClick={() => void load()}>
              Reload
            </button>
            {can('aboutTeam', 'update') ? (
              <button
                type="button"
                className="btn-admin-primary shrink-0"
                disabled={loading || saving || !hasChanges}
                onClick={() => void save()}
              >
                {saving ? t('admin.saving') : t('admin.saveChanges')}
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-white/70">{t('admin.aboutUsLoading')}</p>
      ) : (
        <div className="space-y-4">
          {/* ==================== PAGE TITLES (EN / VI) ==================== */}
          <section className="glass rounded-2xl p-5 border border-white/10 space-y-4">
            <h3 className="text-white text-lg font-semibold">Titles</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-white/70 text-sm">{t('admin.aboutUsTitleEn')}</span>
                <input
                  className={inputClass}
                  value={form.titleEn}
                  onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))}
                  disabled={!can('aboutTeam', 'update')}
                />
              </label>
              <label className="block">
                <span className="text-white/70 text-sm">{t('admin.aboutUsTitleVi')}</span>
                <input
                  className={inputClass}
                  value={form.titleVi}
                  onChange={(e) => setForm((f) => ({ ...f, titleVi: e.target.value }))}
                  disabled={!can('aboutTeam', 'update')}
                />
              </label>
            </div>
          </section>

          {/* ==================== INTRO BODY (RICH TEXT) ==================== */}
          <section className="glass rounded-2xl p-5 border border-white/10 space-y-4">
            <h3 className="text-white text-lg font-semibold">Intro content</h3>
            <label className="block">
              <span className="text-white/70 text-sm">{t('admin.aboutUsBodyEn')}</span>
              <div className="mt-1">
                <AdminTinyMceEditor
                  id="about-us-body-en"
                  value={form.bodyEn}
                  onChange={(html) => setForm((f) => ({ ...f, bodyEn: html }))}
                  disabled={!can('aboutTeam', 'update')}
                />
              </div>
            </label>

            <label className="block">
              <span className="text-white/70 text-sm">{t('admin.aboutUsBodyVi')}</span>
              <div className="mt-1">
                <AdminTinyMceEditor
                  id="about-us-body-vi"
                  value={form.bodyVi}
                  onChange={(html) => setForm((f) => ({ ...f, bodyVi: html }))}
                  disabled={!can('aboutTeam', 'update')}
                />
              </div>
            </label>
          </section>

          {/* ==================== HERO IMAGE & PREVIEW ==================== */}
          <section className="glass rounded-2xl p-5 border border-white/10 space-y-4">
            <h3 className="text-white text-lg font-semibold">Hero image</h3>
            <div className="grid lg:grid-cols-[1fr_240px] gap-4">
              <div className="space-y-3">
                <label className="block">
                  <span className="text-white/70 text-sm">{t('admin.aboutUsHeroUrl')}</span>
                  <input
                    className={`${inputClass} font-mono text-xs`}
                    value={form.heroImageUrl}
                    onChange={(e) => setForm((f) => ({ ...f, heroImageUrl: e.target.value }))}
                    disabled={!can('aboutTeam', 'update')}
                    placeholder="https://… or /uploads/…"
                  />
                </label>
                <div className="grid md:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-white/70 text-sm">{t('admin.aboutUsHeroAltEn')}</span>
                    <input
                      className={inputClass}
                      value={form.heroImageAltEn}
                      onChange={(e) => setForm((f) => ({ ...f, heroImageAltEn: e.target.value }))}
                      disabled={!can('aboutTeam', 'update')}
                    />
                  </label>
                  <label className="block">
                    <span className="text-white/70 text-sm">{t('admin.aboutUsHeroAltVi')}</span>
                    <input
                      className={inputClass}
                      value={form.heroImageAltVi}
                      onChange={(e) => setForm((f) => ({ ...f, heroImageAltVi: e.target.value }))}
                      disabled={!can('aboutTeam', 'update')}
                    />
                  </label>
                </div>
              </div>

              <div>
                <p className="text-white/70 text-sm mb-1">Preview</p>
                <div className="rounded-xl border border-white/15 bg-black/30 overflow-hidden aspect-4/3 min-h-[150px]">
                  {heroPreviewSrc ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={heroPreviewSrc} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="h-full flex items-center justify-center px-4 text-white/40 text-xs text-center">
                      Enter a valid image URL to preview.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
