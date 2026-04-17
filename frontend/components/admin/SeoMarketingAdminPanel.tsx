'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useToast } from '@/components/providers/ToastProvider';
import { useLocale } from '@/components/providers/LocaleProvider';
import type { MarketingConfig } from '@/lib/marketing/config';
import { apiPath } from '@/lib/apiRoutes';

const emptyConfig: MarketingConfig = {
  enabled: false,
  google: { enabled: false, gtagId: '', ga4Id: '', leadConversionLabel: '', purchaseConversionLabel: '' },
  meta: { enabled: false, pixelId: '' },
  tiktok: { enabled: false, pixelId: '' },
  zalo: { enabled: false, pixelId: '', scriptUrl: '' },
};

export default function SeoMarketingAdminPanel() {
  const { t } = useLocale();
  const toast = useToast();
  const { can } = useAdminPermissions();
  const canRead = can('uiTexts', 'read');
  const canSave = can('uiTexts', 'update');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<MarketingConfig>(emptyConfig);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiPath('admin/marketing-config'), { credentials: 'include' });
      if (res.status === 401 || res.status === 403) {
        window.location.href = '/admin/login';
        return;
      }
      if (!res.ok) throw new Error('load');
      const data = (await res.json()) as MarketingConfig;
      setForm({ ...emptyConfig, ...data });
    } catch {
      toast.error(t('admin.seoMarketingLoadError'));
    } finally {
      setLoading(false);
    }
  }, [toast, t]);

  useEffect(() => {
    if (!canRead) return;
    void load();
  }, [load, canRead]);

  const onSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      const res = await fetch(apiPath('admin/marketing-config'), {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('save');
      toast.success(t('admin.seoMarketingSaved'));
      window.dispatchEvent(new CustomEvent('vuleits-marketing-config-updated'));
    } catch {
      toast.error(t('admin.seoMarketingSaveError'));
    } finally {
      setSaving(false);
    }
  };

  if (!canRead) {
    return <div className="glass p-6 rounded-2xl text-white/80">{t('admin.aboutUsNoPermission')}</div>;
  }
  if (loading) {
    return <div className="glass p-6 rounded-2xl text-white/70">{t('admin.aboutUsLoading')}</div>;
  }

  return (
    <section className="glass p-6 rounded-2xl space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">{t('admin.seoMarketing')}</h3>
          <p className="text-white/65 text-sm mt-1">{t('admin.seoMarketingHelp')}</p>
        </div>
        <button
          type="button"
          className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10 disabled:opacity-60"
          disabled={!canSave || saving}
          onClick={onSave}
        >
          {saving ? t('admin.saving') : t('admin.saveChanges')}
        </button>
      </div>

      <label className="flex items-center gap-2 text-white">
        <input
          type="checkbox"
          checked={form.enabled}
          disabled={!canSave}
          onChange={(e) => setForm((s) => ({ ...s, enabled: e.target.checked }))}
        />
        <span>{t('admin.seoMarketingEnableGlobal')}</span>
      </label>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <FieldGroup title="Google">
          <CheckRow
            label={t('admin.seoMarketingEnablePlatform')}
            checked={form.google.enabled}
            disabled={!canSave}
            onChange={(v) => setForm((s) => ({ ...s, google: { ...s.google, enabled: v } }))}
          />
          <InputRow label="GTAG ID (AW-...)" value={form.google.gtagId} disabled={!canSave} onChange={(v) => setForm((s) => ({ ...s, google: { ...s.google, gtagId: v } }))} />
          <InputRow label="GA4 ID (G-...)" value={form.google.ga4Id} disabled={!canSave} onChange={(v) => setForm((s) => ({ ...s, google: { ...s.google, ga4Id: v } }))} />
          <InputRow
            label={t('admin.seoMarketingLeadLabel')}
            value={form.google.leadConversionLabel}
            disabled={!canSave}
            onChange={(v) => setForm((s) => ({ ...s, google: { ...s.google, leadConversionLabel: v } }))}
          />
          <InputRow
            label={t('admin.seoMarketingPurchaseLabel')}
            value={form.google.purchaseConversionLabel}
            disabled={!canSave}
            onChange={(v) => setForm((s) => ({ ...s, google: { ...s.google, purchaseConversionLabel: v } }))}
          />
        </FieldGroup>

        <FieldGroup title="Meta (Facebook / Instagram)">
          <CheckRow
            label={t('admin.seoMarketingEnablePlatform')}
            checked={form.meta.enabled}
            disabled={!canSave}
            onChange={(v) => setForm((s) => ({ ...s, meta: { ...s.meta, enabled: v } }))}
          />
          <InputRow label={t('admin.seoMarketingPixelId')} value={form.meta.pixelId} disabled={!canSave} onChange={(v) => setForm((s) => ({ ...s, meta: { ...s.meta, pixelId: v } }))} />
        </FieldGroup>

        <FieldGroup title="TikTok">
          <CheckRow
            label={t('admin.seoMarketingEnablePlatform')}
            checked={form.tiktok.enabled}
            disabled={!canSave}
            onChange={(v) => setForm((s) => ({ ...s, tiktok: { ...s.tiktok, enabled: v } }))}
          />
          <InputRow label={t('admin.seoMarketingPixelId')} value={form.tiktok.pixelId} disabled={!canSave} onChange={(v) => setForm((s) => ({ ...s, tiktok: { ...s.tiktok, pixelId: v } }))} />
        </FieldGroup>

        <FieldGroup title="Zalo">
          <CheckRow
            label={t('admin.seoMarketingEnablePlatform')}
            checked={form.zalo.enabled}
            disabled={!canSave}
            onChange={(v) => setForm((s) => ({ ...s, zalo: { ...s.zalo, enabled: v } }))}
          />
          <InputRow label={t('admin.seoMarketingPixelId')} value={form.zalo.pixelId} disabled={!canSave} onChange={(v) => setForm((s) => ({ ...s, zalo: { ...s.zalo, pixelId: v } }))} />
          <InputRow
            label={t('admin.seoMarketingZaloScriptUrl')}
            value={form.zalo.scriptUrl}
            disabled={!canSave}
            onChange={(v) => setForm((s) => ({ ...s, zalo: { ...s.zalo, scriptUrl: v } }))}
            placeholder="https://..."
          />
        </FieldGroup>
      </div>
    </section>
  );
}

function FieldGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
      <h4 className="text-white font-semibold">{title}</h4>
      {children}
    </div>
  );
}

function InputRow({
  label,
  value,
  onChange,
  disabled,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  disabled?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="text-xs text-white/70">{label}</span>
      <input
        type="text"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-white/20 bg-black/25 px-3 py-2 text-sm text-white placeholder:text-white/35"
      />
    </label>
  );
}

function CheckRow({
  label,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-white/85">
      <input type="checkbox" checked={checked} disabled={disabled} onChange={(e) => onChange(e.target.checked)} />
      <span>{label}</span>
    </label>
  );
}
