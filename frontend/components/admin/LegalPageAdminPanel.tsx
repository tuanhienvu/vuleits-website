'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useToast } from '@/components/providers/ToastProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import AdminTinyMceEditor from '@/components/admin/AdminTinyMceEditor';
import {
  defaultLegalPagePayload,
  type LegalPageKind,
  type LegalPagePayload,
} from '@/lib/legalPageSetting';

type LegalPageAdminPanelProps = {
  kind: LegalPageKind;
};

export default function LegalPageAdminPanel({ kind }: LegalPageAdminPanelProps) {
  const { t } = useLocale();
  const { can } = useAdminPermissions();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<LegalPagePayload>(() => defaultLegalPagePayload(kind));
  const [baseline, setBaseline] = useState('');

  const endpoint = kind === 'privacy' ? '/api/admin/privacy-policy' : '/api/admin/terms-of-service';
  const heading = kind === 'privacy' ? t('admin.privacyPolicy') : t('admin.termsOfService');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(endpoint, { credentials: 'include' });
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      if (!res.ok) throw new Error('Load failed');
      const data = (await res.json()) as LegalPagePayload;
      const merged = { ...defaultLegalPagePayload(kind), ...data };
      setForm(merged);
      setBaseline(JSON.stringify(merged));
    } catch {
      toast.error(t('admin.uiMessagesLoadError'));
    } finally {
      setLoading(false);
    }
  }, [endpoint, kind, t, toast]);

  useEffect(() => {
    if (!can('aboutTeam', 'read')) return;
    void load();
  }, [can, load]);

  const save = async () => {
    if (!can('aboutTeam', 'update')) return;
    setSaving(true);
    try {
      const res = await fetch(endpoint, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || 'Save failed');
      }
      const json = (await res.json()) as LegalPagePayload & { ok?: boolean };
      const { ok: _discard, ...data } = json;
      void _discard;
      const next = { ...defaultLegalPagePayload(kind), ...data };
      setForm(next);
      setBaseline(JSON.stringify(next));
      toast.success(t('admin.uiMessagesSaveDone'));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : t('admin.uiMessagesSaveError'));
    } finally {
      setSaving(false);
    }
  };

  const hasChanges = baseline !== '' && baseline !== JSON.stringify(form);
  const inputClass =
    'mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/35 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-400/50';
  const titleHint = useMemo(
    () => (kind === 'privacy' ? 'Privacy Policy' : 'Terms of Service'),
    [kind],
  );

  if (!can('aboutTeam', 'read')) {
    return <div className="text-white/70">{t('admin.aboutUsNoPermission')}</div>;
  }

  return (
    <div className="space-y-6 w-full">
      <div className="glass rounded-2xl p-4 border border-white/10 sticky top-3 z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white">{heading}</h2>
            <p className="text-white/65 text-sm mt-1">{t('admin.aboutUsPageSubtitle')}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {hasChanges ? (
              <span className="text-amber-200 text-xs px-2 py-1 rounded-md bg-amber-500/10 border border-amber-400/30">
                Unsaved changes
              </span>
            ) : null}
            <button
              type="button"
              className="btn-admin-secondary"
              disabled={loading || saving}
              onClick={() => void load()}
            >
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
          <section className="glass rounded-2xl p-5 border border-white/10 space-y-4">
            <h3 className="text-white text-lg font-semibold">Titles</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-white/70 text-sm">Title (English)</span>
                <input
                  className={inputClass}
                  value={form.titleEn}
                  onChange={(e) => setForm((f) => ({ ...f, titleEn: e.target.value }))}
                  disabled={!can('aboutTeam', 'update')}
                  placeholder={`${titleHint} (EN)`}
                />
              </label>
              <label className="block">
                <span className="text-white/70 text-sm">Title (Vietnamese)</span>
                <input
                  className={inputClass}
                  value={form.titleVi}
                  onChange={(e) => setForm((f) => ({ ...f, titleVi: e.target.value }))}
                  disabled={!can('aboutTeam', 'update')}
                  placeholder={`${titleHint} (VI)`}
                />
              </label>
            </div>
          </section>

          <section className="glass rounded-2xl p-5 border border-white/10 space-y-4">
            <h3 className="text-white text-lg font-semibold">Content</h3>
            <label className="block">
              <span className="text-white/70 text-sm">Body (English)</span>
              <div className="mt-1">
                <AdminTinyMceEditor
                  id={`${kind}-body-en`}
                  value={form.bodyEn}
                  onChange={(html) => setForm((f) => ({ ...f, bodyEn: html }))}
                  disabled={!can('aboutTeam', 'update')}
                />
              </div>
            </label>

            <label className="block">
              <span className="text-white/70 text-sm">Body (Vietnamese)</span>
              <div className="mt-1">
                <AdminTinyMceEditor
                  id={`${kind}-body-vi`}
                  value={form.bodyVi}
                  onChange={(html) => setForm((f) => ({ ...f, bodyVi: html }))}
                  disabled={!can('aboutTeam', 'update')}
                />
              </div>
            </label>
          </section>

          <section className="glass rounded-2xl p-5 border border-white/10 space-y-4">
            <h3 className="text-white text-lg font-semibold">Updated label</h3>
            <div className="grid md:grid-cols-2 gap-3">
              <label className="block">
                <span className="text-white/70 text-sm">Updated label (English)</span>
                <input
                  className={inputClass}
                  value={form.updatedAtLabelEn}
                  onChange={(e) => setForm((f) => ({ ...f, updatedAtLabelEn: e.target.value }))}
                  disabled={!can('aboutTeam', 'update')}
                />
              </label>
              <label className="block">
                <span className="text-white/70 text-sm">Updated label (Vietnamese)</span>
                <input
                  className={inputClass}
                  value={form.updatedAtLabelVi}
                  onChange={(e) => setForm((f) => ({ ...f, updatedAtLabelVi: e.target.value }))}
                  disabled={!can('aboutTeam', 'update')}
                />
              </label>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

