'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useToast } from '@/components/providers/ToastProvider';

type ServiceRow = {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string | null;
  order: number;
  isActive: boolean;
};

const PAGE_SIZES = [10, 20, 50];
const MODAL_ANIM_MS = 260;

function parseFeatures(v: string | null): string[] {
  if (!v) return [];
  try {
    const parsed = JSON.parse(v);
    if (Array.isArray(parsed)) return parsed.map((x) => String(x));
  } catch {
    // ignore
  }
  return v
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
}

export default function ServicesAdminPanel() {
  const { can } = useAdminPermissions();
  const toast = useToast();

  const [rows, setRows] = useState<ServiceRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [status, setStatus] = useState<'all' | 'active' | 'inactive'>('all');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalClosing, setModalClosing] = useState(false);
  const [modalOrigin, setModalOrigin] = useState({ x: 0, y: 0 });
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    id: null as number | null,
    icon: '🧩',
    title: '',
    description: '',
    featuresText: '',
    order: 0,
    isActive: true,
  });

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteClosing, setDeleteClosing] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{ id: number; title: string } | null>(null);
  const [deleteModalOrigin, setDeleteModalOrigin] = useState({ x: 0, y: 0 });
  const [deleting, setDeleting] = useState(false);

  const setModalOriginFromElement = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    const r = el.getBoundingClientRect();
    setModalOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  }, []);

  const setDeleteModalOriginFromElement = useCallback((el: HTMLElement | null) => {
    if (!el) return;
    const r = el.getBoundingClientRect();
    setDeleteModalOrigin({ x: r.left + r.width / 2, y: r.top + r.height / 2 });
  }, []);

  const closeModalAnimated = useCallback(async () => {
    if (!modalOpen || modalClosing) return;
    setModalClosing(true);
    await new Promise((resolve) => window.setTimeout(resolve, MODAL_ANIM_MS));
    setModalOpen(false);
    setModalClosing(false);
  }, [modalOpen, modalClosing]);

  const closeDeleteAnimated = useCallback(async () => {
    if (!deleteOpen || deleteClosing) return;
    setDeleteClosing(true);
    await new Promise((resolve) => window.setTimeout(resolve, MODAL_ANIM_MS));
    setDeleteOpen(false);
    setDeleteClosing(false);
    setDeleteTarget(null);
  }, [deleteOpen, deleteClosing]);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/services', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        throw new Error('Load failed');
      }
      const data = (await res.json()) as ServiceRow[];
      setRows(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load services');
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!can('services', 'read')) return;
    void refresh();
  }, [can, refresh]);

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase();
    return rows.filter((r) => {
      if (status === 'active' && !r.isActive) return false;
      if (status === 'inactive' && r.isActive) return false;
      if (!qq) return true;
      const hay = `${r.title} ${r.description} ${parseFeatures(r.features).join(' ')}`.toLowerCase();
      return hay.includes(qq);
    });
  }, [rows, q, status]);

  const total = filtered.length;
  const maxPage = Math.max(1, Math.ceil(total / pageSize));
  const paged = useMemo(() => filtered.slice((page - 1) * pageSize, page * pageSize), [filtered, page, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [q, status, pageSize]);

  useEffect(() => {
    if (page > maxPage) setPage(maxPage);
  }, [page, maxPage]);

  const openCreate = (triggerEl?: HTMLElement | null) => {
    setModalClosing(false);
    if (triggerEl) {
      setModalOriginFromElement(triggerEl);
    } else {
      setModalOrigin({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    }
    setForm({ id: null, icon: '🧩', title: '', description: '', featuresText: '', order: rows.length, isActive: true });
    setModalOpen(true);
  };

  const openEdit = (r: ServiceRow, triggerEl?: HTMLElement | null) => {
    setModalClosing(false);
    if (triggerEl) setModalOriginFromElement(triggerEl);
    setForm({
      id: r.id,
      icon: r.icon,
      title: r.title,
      description: r.description,
      featuresText: parseFeatures(r.features).join('\n'),
      order: r.order,
      isActive: r.isActive,
    });
    setModalOpen(true);
  };

  const submit = async () => {
    if (!can('services', form.id == null ? 'create' : 'update')) return;
    setSaving(true);
    try {
      const payload = {
        icon: form.icon.trim(),
        title: form.title.trim(),
        description: form.description.trim(),
        features: form.featuresText
          .split(/\r?\n/)
          .map((x) => x.trim())
          .filter(Boolean),
        order: Number(form.order),
        isActive: form.isActive,
      };
      const isEdit = form.id != null;
      const res = await fetch(isEdit ? `/api/admin/services/${form.id}` : '/api/admin/services', {
        method: isEdit ? 'PUT' : 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || 'Save failed');
      }
      await closeModalAnimated();
      toast.success('Saved');
      await refresh();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (r: ServiceRow, triggerEl?: HTMLElement | null) => {
    setDeleteClosing(false);
    if (triggerEl) setDeleteModalOriginFromElement(triggerEl);
    setDeleteTarget({ id: r.id, title: r.title });
    setDeleteOpen(true);
  };

  const remove = async () => {
    if (!deleteTarget || !can('services', 'delete')) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/services/${deleteTarget.id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Delete failed');
      await closeDeleteAnimated();
      toast.success('Deleted');
      await refresh();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  if (!can('services', 'read')) {
    return <div className="text-white/70">No permission to read services.</div>;
  }

  return (
    <>
      <div className="top-0 z-20 w-full backdrop-blur bg-[#0a0a0a]/60 border-b border-white/10 p-4 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Services Management</h2>
          {can('services', 'create') ? (
            <button className="btn-admin-primary" onClick={(e) => openCreate(e.currentTarget)}>
              + Add Service
            </button>
          ) : null}
        </div>
        <div className="glass w-full p-4 rounded-2xl border border-white/10 bg-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <label>
              <span className="text-white/70 text-sm block mb-2">Search</span>
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Title/description/features..."
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </label>
            <label>
              <span className="text-white/70 text-sm block mb-2">Status</span>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as 'all' | 'active' | 'inactive')}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </label>
            <label>
              <span className="text-white/70 text-sm block mb-2">Page size</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                {PAGE_SIZES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <div className="pt-4">
        {loading ? (
          <div className="text-white/80">Loading...</div>
        ) : paged.length === 0 ? (
          <div className="glass p-6 rounded-2xl text-white/70">No services found.</div>
        ) : (
          <div className="space-y-3">
            {paged.map((r) => (
              <div key={r.id} className="w-full bg-white/5 p-4 rounded-xl border border-white/10 flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-white font-semibold flex items-center gap-2">
                    <span className="text-2xl">{r.icon || '🧩'}</span>
                    {r.title}
                  </p>
                  <p className="text-white/50 text-sm mt-1">
                    Order: {r.order} • Status: {r.isActive ? 'Active' : 'Inactive'}
                  </p>
                  <p className="text-white/70 text-sm mt-1">{r.description}</p>
                </div>
                <div className="flex gap-1">
                  {can('services', 'update') ? (
                    <button
                      type="button"
                      onClick={(e) => openEdit(r, e.currentTarget)}
                      aria-label={`Edit ${r.title}`}
                      className="btn-admin-icon"
                    >
                      ✏️
                    </button>
                  ) : null}
                  {can('services', 'delete') ? (
                    <button
                      type="button"
                      onClick={(e) => confirmDelete(r, e.currentTarget)}
                      aria-label={`Delete ${r.title}`}
                      className="btn-admin-icon-danger"
                    >
                      🗑️
                    </button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && total > 0 ? (
          <div className="w-full flex items-center justify-between mt-6 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <p className="text-white/60 text-sm">
              Page <span className="text-white/80 font-medium">{page}</span> of{' '}
              <span className="text-white/80 font-medium">{maxPage}</span> (total{' '}
              <span className="text-white/80 font-medium">{total}</span>)
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                className="btn-admin-pager"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>
              <button
                type="button"
                className="btn-admin-pager"
                disabled={page >= maxPage}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => void closeModalAnimated()} />
          <div
            className="relative w-full max-w-3xl max-h-[90vh] glass rounded-2xl border border-white/10 overflow-hidden"
            style={{
              transformOrigin: `${modalOrigin.x}px ${modalOrigin.y}px`,
              animation: modalClosing
                ? `news-edit-modal-zoom-out ${MODAL_ANIM_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
                : `news-edit-modal-zoom-in ${MODAL_ANIM_MS}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >
            <div className="px-5 py-4 border-b border-white/10 bg-white/5">
              <h3 className="text-xl font-bold text-white">{form.id ? 'Edit Service' : 'Add Service'}</h3>
            </div>
            <div className="overflow-y-auto max-h-[calc(90vh-140px)] px-5 py-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <label className="block">
                  <span className="text-white/80 text-sm">Icon</span>
                  <input
                    value={form.icon}
                    onChange={(e) => setForm((p) => ({ ...p, icon: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white"
                    placeholder="🧩"
                  />
                </label>
                <label className="block md:col-span-2">
                  <span className="text-white/80 text-sm">Title</span>
                  <input
                    value={form.title}
                    onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white"
                    placeholder="Service title"
                  />
                </label>
              </div>
              <label className="block">
                <span className="text-white/80 text-sm">Description (supports HTML)</span>
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) => setForm((p) => ({ ...p, description: e.target.value }))}
                  className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white"
                />
              </label>
              <label className="block">
                <span className="text-white/80 text-sm">Features (one line per item)</span>
                <textarea
                  rows={6}
                  value={form.featuresText}
                  onChange={(e) => setForm((p) => ({ ...p, featuresText: e.target.value }))}
                  className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white"
                />
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-white/80 text-sm">Order</span>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm((p) => ({ ...p, order: Number(e.target.value) }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white"
                  />
                </label>
                <label className="block">
                  <span className="text-white/80 text-sm">Status</span>
                  <select
                    value={form.isActive ? 'active' : 'inactive'}
                    onChange={(e) => setForm((p) => ({ ...p, isActive: e.target.value === 'active' }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="sticky bottom-0 left-0 right-0 flex justify-end gap-2 px-5 py-3 border-t border-white/10 bg-[#14141c]/95 backdrop-blur">
              <button onClick={() => void closeModalAnimated()} className="btn-admin-secondary" disabled={saving}>
                Cancel
              </button>
              <button onClick={() => void submit()} className="btn-admin-primary" disabled={saving}>
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deleteOpen ? (
        <div className="fixed inset-0 z-60 flex items-center justify-center px-3 sm:px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => void closeDeleteAnimated()} />
          <div
            className="relative w-full max-w-md rounded-2xl border border-red-400/30 bg-[#181320] shadow-2xl overflow-hidden"
            style={{
              transformOrigin: `${deleteModalOrigin.x}px ${deleteModalOrigin.y}px`,
              animation: deleteClosing
                ? `news-edit-modal-zoom-out ${MODAL_ANIM_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
                : `news-edit-modal-zoom-in ${MODAL_ANIM_MS}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >
            <div className="px-5 py-4 border-b border-white/10 bg-red-500/10">
              <h3 className="text-lg font-bold text-white">Confirm delete</h3>
              <p className="text-red-200/90 text-sm mt-1">This action cannot be undone.</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-white/80 text-sm">
                Delete service: <span className="text-white font-medium">{deleteTarget?.title ?? ''}</span>?
              </p>
            </div>
            <div className="flex justify-end gap-2 px-5 py-3 border-t border-white/10 bg-[#14141c]/95 backdrop-blur">
              <button
                type="button"
                onClick={() => void closeDeleteAnimated()}
                className="btn-admin-secondary"
                disabled={deleting}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => void remove()}
                className="btn-admin-danger"
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
