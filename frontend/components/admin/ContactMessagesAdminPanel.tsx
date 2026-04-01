'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useToast } from '@/components/providers/ToastProvider';

type ContactRow = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  phone: string | null;
  message: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const STATUSES = ['New', 'Read', 'Replied', 'Archived'] as const;

export default function ContactMessagesAdminPanel() {
  const { can } = useAdminPermissions();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState<ContactRow[]>([]);
  const [total, setTotal] = useState(0);
  const [qInput, setQInput] = useState('');
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [skip, setSkip] = useState(0);
  const take = 25;
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setQ(qInput.trim());
      setSkip(0);
    }, 400);
    return () => window.clearTimeout(t);
  }, [qInput]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const sp = new URLSearchParams();
      sp.set('take', String(take));
      sp.set('skip', String(skip));
      if (q.trim()) sp.set('q', q.trim());
      if (statusFilter) sp.set('status', statusFilter);
      const res = await fetch(`/api/admin/contact-submissions?${sp.toString()}`, { credentials: 'include' });
      if (res.status === 401) {
        window.location.href = '/admin/login';
        return;
      }
      if (!res.ok) throw new Error('Load failed');
      const data = (await res.json()) as { items?: ContactRow[]; total?: number };
      setItems(Array.isArray(data.items) ? data.items : []);
      setTotal(Number(data.total) || 0);
    } catch {
      toast.error('Could not load contact messages.');
    } finally {
      setLoading(false);
    }
  }, [q, skip, statusFilter, toast]);

  useEffect(() => {
    if (!can('contacts', 'read')) return;
    void load();
  }, [can, load]);

  useEffect(() => {
    const onRefresh = () => void load();
    window.addEventListener('vuleits-contact-inbox-refresh', onRefresh);
    return () => window.removeEventListener('vuleits-contact-inbox-refresh', onRefresh);
  }, [load]);

  const setStatus = async (id: number, status: string) => {
    if (!can('contacts', 'update')) return;
    try {
      const res = await fetch(`/api/admin/contact-submissions/${id}`, {
        method: 'PATCH',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error('Update failed');
      toast.success('Status updated');
      void load();
      window.dispatchEvent(new Event('vuleits-contact-new-count-refresh'));
    } catch {
      toast.error('Could not update status.');
    }
  };

  const remove = async (id: number) => {
    if (!can('contacts', 'delete')) return;
    if (!window.confirm('Delete this message permanently?')) return;
    try {
      const res = await fetch(`/api/admin/contact-submissions/${id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Deleted');
      setExpandedId((cur) => (cur === id ? null : cur));
      void load();
      window.dispatchEvent(new Event('vuleits-contact-new-count-refresh'));
    } catch {
      toast.error('Could not delete.');
    }
  };

  if (!can('contacts', 'read')) {
    return <div className="text-white/70">You do not have permission to view contact messages.</div>;
  }

  return (
    <div className="space-y-6 w-full">
      <div className="glass rounded-2xl p-4 border border-white/10 sticky top-3 z-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-white">Contact messages</h2>
            <p className="text-white/65 text-sm mt-1">
              Submissions from the public contact form. New items are highlighted until marked read.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn-admin-secondary text-sm" disabled={loading} onClick={() => void load()}>
              Refresh
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 mt-4">
          <label className="flex flex-col gap-1 text-sm text-white/80">
            <span className="text-xs text-white/55">Search</span>
            <input
              value={qInput}
              onChange={(e) => setQInput(e.target.value)}
              className="px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-sm w-full"
              placeholder="Name, email, subject…"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm text-white/80">
            <span className="text-xs text-white/55">Status</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setSkip(0);
              }}
              className="px-3 py-2 rounded-lg bg-black/40 border border-white/15 text-white text-sm w-full"
            >
              <option value="">All</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {loading ? (
        <p className="text-white/70">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-white/60">No messages yet.</p>
      ) : (
        <div className="space-y-2">
          {items.map((row) => {
            const open = expandedId === row.id;
            return (
              <div
                key={row.id}
                className={`glass rounded-xl border overflow-hidden ${
                  row.status === 'New' ? 'border-amber-400/40 bg-amber-500/5' : 'border-white/10'
                }`}
              >
                <button
                  type="button"
                  className="w-full text-left px-4 py-3 flex flex-wrap items-center justify-between gap-2 hover:bg-white/5"
                  onClick={() => setExpandedId(open ? null : row.id)}
                >
                  <div className="min-w-0">
                    <p className="text-white font-medium truncate">
                      {row.name}{' '}
                      <span className="text-white/50 font-normal text-sm">&lt;{row.email}&gt;</span>
                    </p>
                    <p className="text-white/55 text-sm truncate">{row.subject || '(no subject)'}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full border ${
                        row.status === 'New'
                          ? 'border-amber-400/50 text-amber-200'
                          : 'border-white/20 text-white/70'
                      }`}
                    >
                      {row.status}
                    </span>
                    <span className="text-white/45 text-xs whitespace-nowrap">
                      {new Date(row.createdAt).toLocaleString()}
                    </span>
                  </div>
                </button>
                {open ? (
                  <div className="px-4 pb-4 pt-0 border-t border-white/10 space-y-3">
                    <div className="flex flex-wrap gap-2 pt-3">
                      {can('contacts', 'update')
                        ? STATUSES.map((s) => (
                            <button
                              key={s}
                              type="button"
                              className={`text-xs px-2 py-1 rounded-lg border ${
                                row.status === s
                                  ? 'bg-white/15 border-white/30 text-white'
                                  : 'border-white/15 text-white/75 hover:bg-white/10'
                              }`}
                              onClick={() => void setStatus(row.id, s)}
                            >
                              {s}
                            </button>
                          ))
                        : null}
                      {can('contacts', 'delete') ? (
                        <button
                          type="button"
                          className="text-xs px-2 py-1 rounded-lg border border-red-400/40 text-red-200 hover:bg-red-500/15 ml-auto"
                          onClick={() => void remove(row.id)}
                        >
                          Delete
                        </button>
                      ) : null}
                    </div>
                    {row.phone ? (
                      <p className="text-white/70 text-sm">
                        Phone: <span className="text-white">{row.phone}</span>
                      </p>
                    ) : null}
                    <pre className="whitespace-pre-wrap text-sm text-white/85 bg-black/30 rounded-lg p-3 border border-white/10 max-h-72 overflow-y-auto font-sans">
                      {row.message}
                    </pre>
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      )}

      {total > take ? (
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="btn-admin-pager"
            disabled={skip === 0 || loading}
            onClick={() => setSkip((s) => Math.max(0, s - take))}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn-admin-pager"
            disabled={skip + take >= total || loading}
            onClick={() => setSkip((s) => s + take)}
          >
            Next
          </button>
          <span className="text-white/55 text-sm">
            {skip + 1}–{Math.min(skip + take, total)} of {total}
          </span>
        </div>
      ) : null}
    </div>
  );
}
