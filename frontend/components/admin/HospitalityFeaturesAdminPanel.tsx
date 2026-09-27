'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useToast } from '@/components/providers/ToastProvider';
import { apiPath } from '@/lib/apiRoutes';
import {
  defaultHospitalityFeatures,
  type HospitalityFeaturesConfig,
} from '@/lib/hospitality/features';

export default function HospitalityFeaturesAdminPanel() {
  const toast = useToast();
  const { can } = useAdminPermissions();
  const canRead = can('uiTexts', 'read');
  const canSave = can('uiTexts', 'update');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [form, setForm] = useState<HospitalityFeaturesConfig>(defaultHospitalityFeatures);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(apiPath('admin/hospitality-features'), { credentials: 'include' });
      if (!res.ok) throw new Error('load-failed');
      const json = (await res.json()) as HospitalityFeaturesConfig;
      setForm({ ...defaultHospitalityFeatures, ...json });
    } catch {
      toast.error('Failed to load hospitality feature toggles.');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!canRead) return;
    void load();
  }, [canRead, load]);

  const onSave = async () => {
    if (!canSave) return;
    setSaving(true);
    try {
      const res = await fetch(apiPath('admin/hospitality-features'), {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error('save-failed');
      toast.success('Hospitality feature toggles saved.');
    } catch {
      toast.error('Failed to save hospitality feature toggles.');
    } finally {
      setSaving(false);
    }
  };

  const onGenerateSampleData = async () => {
    if (!canSave) return;
    setGenerating(true);
    try {
      const res = await fetch(apiPath('admin/hospitality-sample-data'), {
        method: 'POST',
        credentials: 'include',
      });
      const body = (await res.json().catch(() => ({}))) as { summary?: { rooms: number; bookings: number; payments: number } };
      if (!res.ok) throw new Error('generate-failed');
      const summary = body.summary;
      toast.success(
        summary
          ? `Sample data generated: ${summary.rooms} rooms, ${summary.bookings} bookings, ${summary.payments} payments.`
          : 'Sample hospitality data generated.',
      );
    } catch {
      toast.error('Failed to generate hospitality sample data.');
    } finally {
      setGenerating(false);
    }
  };

  if (!canRead) {
    return <div className="glass p-6 rounded-2xl text-white/80">You do not have permission to view this module.</div>;
  }
  if (loading) {
    return <div className="glass p-6 rounded-2xl text-white/70">Loading hospitality feature toggles...</div>;
  }

  return (
    <section className="glass p-6 rounded-2xl space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-xl font-semibold text-white">Hospitality Modules</h3>
          <p className="text-white/65 text-sm mt-1">
            Enable or disable Chatbox, Booking, and Payment features in the public portal.
          </p>
        </div>
        <button
          type="button"
          className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10 disabled:opacity-60"
          disabled={!canSave || saving}
          onClick={onSave}
        >
          {saving ? 'Saving...' : 'Save changes'}
        </button>
        <button
          type="button"
          className="rounded-lg border border-emerald-300/40 bg-emerald-500/20 px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-500/30 disabled:opacity-60"
          disabled={!canSave || generating}
          onClick={onGenerateSampleData}
        >
          {generating ? 'Generating...' : 'Generate sample data'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToggleCard
          title="Chatbox integration"
          description="Show floating chat support and concierge entry point."
          checked={form.chatboxEnabled}
          onChange={(next) => setForm((s) => ({ ...s, chatboxEnabled: next }))}
          disabled={!canSave}
        />
        <ToggleCard
          title="Online booking system"
          description="Expose booking calendar and reservation workflows."
          checked={form.bookingEnabled}
          onChange={(next) => setForm((s) => ({ ...s, bookingEnabled: next }))}
          disabled={!canSave}
        />
        <ToggleCard
          title="Online payment gateway"
          description="Enable secure payment block and checkout methods."
          checked={form.paymentEnabled}
          onChange={(next) => setForm((s) => ({ ...s, paymentEnabled: next }))}
          disabled={!canSave}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToggleCard
          title="Navigation: Stays"
          description="Show/hide the Stays nav item on the public site."
          checked={form.navStaysEnabled}
          onChange={(next) => setForm((s) => ({ ...s, navStaysEnabled: next }))}
          disabled={!canSave}
        />
        <ToggleCard
          title="Navigation: Book"
          description="Show/hide the Book nav item on the public site."
          checked={form.navBookEnabled}
          onChange={(next) => setForm((s) => ({ ...s, navBookEnabled: next }))}
          disabled={!canSave}
        />
        <ToggleCard
          title="Navigation: Services"
          description="Show/hide the Services nav item on the public site."
          checked={form.navServicesEnabled}
          onChange={(next) => setForm((s) => ({ ...s, navServicesEnabled: next }))}
          disabled={!canSave}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ToggleCard
          title="Booking Calendar module"
          description="Enable the calendar-focused booking module."
          checked={form.bookingCalendarEnabled}
          onChange={(next) => setForm((s) => ({ ...s, bookingCalendarEnabled: next }))}
          disabled={!canSave}
        />
        <ToggleCard
          title="Guest Stories module"
          description="Enable the testimonial and guest stories block."
          checked={form.guestStoriesEnabled}
          onChange={(next) => setForm((s) => ({ ...s, guestStoriesEnabled: next }))}
          disabled={!canSave}
        />
        <ToggleCard
          title="Customer Dashboard module"
          description="Allow guests to view/modify/cancel reservations."
          checked={form.customerDashboardEnabled}
          onChange={(next) => setForm((s) => ({ ...s, customerDashboardEnabled: next }))}
          disabled={!canSave}
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
        <h4 className="text-white font-medium">Chatbot configuration</h4>
        <label className="text-sm text-white/80 block">
          Automated response script
          <textarea
            value={form.chatbotAutoReplyScript}
            onChange={(e) => setForm((s) => ({ ...s, chatbotAutoReplyScript: e.target.value }))}
            className="mt-1 min-h-24 w-full rounded-lg border border-white/20 bg-black/20 p-3 text-white"
            disabled={!canSave}
          />
        </label>
        <label className="text-sm text-white/80 block">
          Escalation email (human support)
          <input
            type="email"
            value={form.chatbotEscalationEmail}
            onChange={(e) => setForm((s) => ({ ...s, chatbotEscalationEmail: e.target.value }))}
            className="mt-1 w-full rounded-lg border border-white/20 bg-black/20 p-3 text-white"
            disabled={!canSave}
          />
        </label>
      </div>

      <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3">
        <h4 className="text-white font-medium">Payment providers</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ToggleCard
            title="Stripe"
            description="Enable Stripe checkout."
            checked={form.paymentProviders.stripe}
            onChange={(next) =>
              setForm((s) => ({ ...s, paymentProviders: { ...s.paymentProviders, stripe: next } }))
            }
            disabled={!canSave}
          />
          <ToggleCard
            title="PayPal"
            description="Enable PayPal checkout."
            checked={form.paymentProviders.paypal}
            onChange={(next) =>
              setForm((s) => ({ ...s, paymentProviders: { ...s.paymentProviders, paypal: next } }))
            }
            disabled={!canSave}
          />
          <ToggleCard
            title="Local Gateway"
            description="Enable local payment gateway option."
            checked={form.paymentProviders.localGateway}
            onChange={(next) =>
              setForm((s) => ({ ...s, paymentProviders: { ...s.paymentProviders, localGateway: next } }))
            }
            disabled={!canSave}
          />
        </div>
      </div>
    </section>
  );
}

function ToggleCard({
  title,
  description,
  checked,
  onChange,
  disabled,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-3 block">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-white font-medium">{title}</p>
          <p className="text-white/65 text-sm mt-1">{description}</p>
        </div>
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-1 h-4 w-4"
        />
      </div>
      <p className={`text-xs ${checked ? 'text-emerald-300' : 'text-white/50'}`}>{checked ? 'Enabled' : 'Disabled'}</p>
    </label>
  );
}
