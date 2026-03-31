'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import AdminSwipeRow from '@/components/admin/AdminSwipeRow';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import AdminTinyMceEditor from '@/components/admin/AdminTinyMceEditor';
import { richTextAsPlain } from '@/lib/richTextAdmin';
import AdminTrashIcon from '@/components/admin/AdminTrashIcon';
import AdminEditIcon from '@/components/admin/AdminEditIcon';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useAnimatedOriginModal } from '@/components/admin/useAnimatedOriginModal';
import { useEscapeToClose } from '@/components/admin/useEscapeToClose';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useToast } from '@/components/providers/ToastProvider';
import { NEWS_CATEGORIES } from '@/lib/news/newsCategories';
import { slugify } from '@/lib/news/slugify';
import { AdminFilterSearchIconButton, adminFilterPanelClass } from '@/components/admin/AdminFilterBarMobile';

// --- Sections (UI): Header & filters | Article list & pagination | Edit/create modal | Thumbnail picker | Delete confirm ---
// --- Sections (logic): State & loaders | Handlers | Submit & media helpers | Thumbnail preview ---

type MediaLibraryRow = {
  id: number;
  url: string;
  filename: string;
  mimeType: string;
  folder: string;
  createdAt: string;
};

type AdminNewsRow = {
  id: number;
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string | null;
  status: string;
  publishedAt: string | null;
  startDate: string | null;
  endDate: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  authorName: string;
  image: { id: number; url: string; filename: string } | null;
  imageId: number | null;
  content: string;
};

const CATEGORY_OPTIONS = NEWS_CATEGORIES.filter((c) => c !== 'Other');

function toDateInputValue(d: string | null | undefined) {
  if (!d) return '';
  const iso = new Date(d).toISOString();
  return iso.slice(0, 10);
}

export default function NewsAdminPanel() {
  const { can } = useAdminPermissions();
  const { locale } = useLocale();
  const toast = useToast();
  const isVi = locale === 'vi-VN';

  const [news, setNews] = useState<AdminNewsRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const pageSizeOptions = useMemo(() => [10, 20, 50], []);

  const modal = useAnimatedOriginModal(600);
  const [saving, setSaving] = useState(false);
  const [deletePending, setDeletePending] = useState<{ id: number; title: string } | null>(null);
  const deleteModal = useAnimatedOriginModal(600, () => setDeletePending(null));
  const [deleting, setDeleting] = useState(false);
  const [form, setForm] = useState<{
    id: number | null;
    title: string;
    slug: string;
    category: string;
    description: string;
    content: string;
    tags: string; // comma-separated in UI
    status: string;
    publishedAt: string; // YYYY-MM-DD
    startDate: string;
    endDate: string;
    seoTitle: string;
    seoDescription: string;
    seoKeywords: string;
    imageId: number | null;
    imageUrl: string | null;
    imageFilename: string | null;
  }>({
    id: null,
    title: '',
    slug: '',
    category: 'General',
    description: '',
    content: '',
    tags: '',
    status: 'Active',
    publishedAt: '',
    startDate: '',
    endDate: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    imageId: null,
    imageUrl: null,
    imageFilename: null,
  });

  const [thumbPickerOpen, setThumbPickerOpen] = useState(false);
  const [thumbPickerLoading, setThumbPickerLoading] = useState(false);
  const [thumbList, setThumbList] = useState<MediaLibraryRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const selectAllPageRef = useRef<HTMLInputElement>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const newsQueryInputRef = useRef<HTMLInputElement>(null);

  const canDeleteNews = can('news', 'delete');

  useEscapeToClose((modal.open && !saving) || thumbPickerOpen, () => {
    if (thumbPickerOpen) {
      setThumbPickerOpen(false);
      return;
    }
    if (modal.open && !saving) void modal.closeAnimated();
  });

  useEscapeToClose(deleteModal.open && !deleting, () => void deleteModal.closeAnimated());

  const refreshNews = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('take', String(pageSize));
      params.set('skip', String((page - 1) * pageSize));
      if (query.trim()) params.set('q', query.trim());
      if (categoryFilter.trim()) params.set('category', categoryFilter.trim());
      if (statusFilter.trim()) params.set('status', statusFilter.trim());

      const res = await fetch(`/api/admin/news?${params.toString()}`, { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        return;
      }
      const json = (await res.json()) as unknown;
      const obj = json as { items?: unknown; total?: unknown };
      setNews(Array.isArray(obj.items) ? (obj.items as AdminNewsRow[]) : []);
      setTotal(typeof obj.total === 'number' ? obj.total : 0);
    } catch {
      toast.error('Failed to load news');
    } finally {
      setLoading(false);
    }
  }, [toast, query, categoryFilter, statusFilter, page, pageSize]);

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [query, categoryFilter, statusFilter, pageSize]);

  useEffect(() => {
    if (!can('news', 'read')) return;
    void refreshNews();
  }, [can, refreshNews]);

  useEffect(() => {
    const el = selectAllPageRef.current;
    if (!el || !canDeleteNews) return;
    const n = news.length;
    const sel = news.filter((x) => selectedIds.has(x.id)).length;
    el.checked = n > 0 && sel === n;
    el.indeterminate = sel > 0 && sel < n;
  }, [news, selectedIds, canDeleteNews]);

  const toggleSelectRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAllPage = () => {
    if (news.length === 0) return;
    if (news.every((x) => selectedIds.has(x.id))) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const x of news) next.delete(x.id);
        return next;
      });
    } else {
      setSelectedIds((prev) => new Set([...prev, ...news.map((x) => x.id)]));
    }
  };

  const openCreate = useCallback(() => {
    if (!can('news', 'create')) return;
    modal.openCentered();
    setForm({
      id: null,
      title: '',
      slug: '',
      category: 'General',
      description: '',
      content: '',
      tags: '',
      status: 'Active',
      publishedAt: '',
      startDate: '',
      endDate: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
      imageId: null,
      imageUrl: null,
      imageFilename: null,
    });
  }, [can, modal]);

  const openEdit = useCallback(
    (row: AdminNewsRow, triggerEl?: HTMLElement | null) => {
      if (!can('news', 'update')) return;
      modal.openFromElement(triggerEl);
      let tagsStr = '';
      try {
        if (row.tags) {
          const parsed = JSON.parse(row.tags) as unknown;
          if (Array.isArray(parsed)) tagsStr = parsed.map((x) => String(x)).join(', ');
        }
      } catch {
        // ignore
      }

      setForm({
        id: row.id,
        title: row.title,
        slug: row.slug,
        category: row.category,
        description: row.description,
        content: row.content,
        tags: tagsStr,
        status: row.status,
        publishedAt: toDateInputValue(row.publishedAt),
        startDate: toDateInputValue(row.startDate),
        endDate: toDateInputValue(row.endDate),
        seoTitle: row.seoTitle ?? '',
        seoDescription: row.seoDescription ?? '',
        seoKeywords: row.seoKeywords ?? '',
        imageId: row.imageId ?? null,
        imageUrl: row.image?.url ?? null,
        imageFilename: row.image?.filename ?? null,
      });
    },
    [can, modal],
  );

  const requestDelete = useCallback(
    (id: number, title: string, triggerEl?: HTMLElement | null) => {
      if (!can('news', 'delete')) return;
      deleteModal.openFromElement(triggerEl);
      setDeletePending({ id, title });
    },
    [can, deleteModal],
  );

  const confirmDelete = useCallback(async () => {
    if (!deletePending) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/news/${deletePending.id}`, { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Delete failed');
      await deleteModal.closeAnimated();
      toast.success('Deleted');
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(deletePending.id);
        return next;
      });
      await refreshNews();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  }, [deletePending, deleteModal, refreshNews, toast]);

  const removeManyNews = useCallback(
    async (ids: number[]) => {
      if (!canDeleteNews) return;
      setDeleting(true);
      try {
        for (const id of ids) {
          const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE', credentials: 'include' });
          if (!res.ok) throw new Error('Delete failed');
        }
        toast.success(isVi ? `Đã xóa ${ids.length} bài` : `Deleted ${ids.length} articles`);
        setSelectedIds(new Set());
        setBulkDeleteOpen(false);
        await refreshNews();
      } catch {
        toast.error('Delete failed');
      } finally {
        setDeleting(false);
      }
    },
    [canDeleteNews, isVi, refreshNews, toast],
  );

  const openThumbPicker = useCallback(async () => {
    if (!can('media', 'read')) {
      toast.error('Media read permission is required to select thumbnail');
      return;
    }
    setThumbPickerOpen(true);
    setThumbPickerLoading(true);
    try {
      const res = await fetch('/api/admin/media?take=120&imagesOnly=1', { credentials: 'include' });
      if (!res.ok) throw new Error('Load media failed');
      const data = (await res.json()) as MediaLibraryRow[];
      setThumbList(Array.isArray(data) ? data : []);
    } catch {
      setThumbList([]);
    } finally {
      setThumbPickerLoading(false);
    }
  }, [can, toast]);

  const pickThumb = useCallback(
    (m: MediaLibraryRow) => {
      setForm((prev) => ({ ...prev, imageId: m.id, imageUrl: m.url, imageFilename: m.filename }));
      setThumbPickerOpen(false);
    },
    [],
  );

  const submit = useCallback(async () => {
    if (!can('news', form.id == null ? 'create' : 'update')) return;
    setSaving(true);
    try {
      const payload = {
        title: form.title,
        slug: form.slug,
        category: form.category,
        description: form.description,
        content: form.content,
        tags: form.tags,
        status: form.status,
        publishedAt: form.publishedAt || null,
        startDate: form.startDate || null,
        endDate: form.endDate || null,
        seoTitle: form.seoTitle || null,
        seoDescription: form.seoDescription || null,
        seoKeywords: form.seoKeywords || null,
        imageId: form.imageId,
      };

      const isEdit = form.id != null;
      const url = isEdit ? `/api/admin/news/${form.id}` : '/api/admin/news';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) window.location.href = '/admin/login';
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || 'Save failed');
      }

      await modal.closeAnimated();
      toast.success(isVi ? 'Đã lưu' : 'Saved');
      await refreshNews();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Save failed';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }, [can, isVi, modal, form, refreshNews, toast]);

  const thumbnailPreview = useMemo(() => {
    if (!form.imageId || !form.imageUrl) return null;
    return { url: form.imageUrl, filename: form.imageFilename ?? '' };
  }, [form.imageId, form.imageUrl, form.imageFilename]);

  // --- Render: permission gate, then main shell + modals ---

  if (!can('news', 'read')) {
    return <div className="text-white/70">{isVi ? 'Không có quyền xem tin tức.' : 'No permission to read news.'}</div>;
  }

  return (
    <>
      {/* ==================== HEADER & FILTER BAR ==================== */}
      <div className="top-0 z-20 w-full backdrop-blur bg-[#0a0a0a]/60 border-b border-white/10 p-4 rounded-2xl">
        <div className="mb-4 flex min-w-0 flex-row items-center justify-between gap-2">
          <h2 className="min-w-0 flex-1 truncate pr-1 text-xl font-bold text-white sm:text-2xl">
            {isVi ? 'Quản lý tin tức' : 'News Management'}
          </h2>
          <div className="flex shrink-0 items-center gap-2">
            {can('news', 'create') ? (
              <button className="btn-admin-primary whitespace-nowrap" onClick={openCreate}>
                {isVi ? '+ Thêm tin tức' : '+ Add News'}
              </button>
            ) : null}
            <AdminFilterSearchIconButton
              open={mobileFiltersOpen}
              onToggle={() => {
                setMobileFiltersOpen((v) => {
                  const next = !v;
                  if (next) queueMicrotask(() => newsQueryInputRef.current?.focus());
                  return next;
                });
              }}
              labelOpen={isVi ? 'Mở tìm kiếm và bộ lọc' : 'Open search and filters'}
              labelClose={isVi ? 'Đóng tìm kiếm và bộ lọc' : 'Close search and filters'}
            />
          </div>
        </div>
        <div className={`glass w-full p-4 rounded-2xl border border-white/10 bg-white/5 ${adminFilterPanelClass(mobileFiltersOpen)}`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <label className="block">
              <span className="text-white/70 text-sm block mb-2">{isVi ? 'Tìm kiếm' : 'Search'}</span>
              <input
                ref={newsQueryInputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setMobileFiltersOpen(true)}
                placeholder="Title/description..."
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </label>

            <label className="block">
              <span className="text-white/70 text-sm block mb-2">{isVi ? 'Danh mục' : 'Category'}</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="">All</option>
                {CATEGORY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="text-white/70 text-sm block mb-2">{isVi ? 'Trạng thái' : 'Status'}</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Expired">Expired</option>
              </select>
            </label>

            <label className="block">
              <span className="text-white/70 text-sm block mb-2">{isVi ? 'Kích thước trang' : 'Page size'}</span>
              <select
                value={pageSize}
                onChange={(e) => setPageSize(Number(e.target.value))}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                {pageSizeOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      {/* ==================== ARTICLE LIST & PAGINATION ==================== */}
      <div className="pt-4">
        {canDeleteNews && selectedIds.size > 0 ? (
          <div className="flex flex-wrap items-center gap-2 rounded-xl border border-red-500/35 bg-red-950/35 px-3 py-2 text-sm text-white mb-3">
            <span>{isVi ? `Đã chọn ${selectedIds.size}` : `${selectedIds.size} selected`}</span>
            <button type="button" className="btn-admin-danger text-sm py-1 px-3" onClick={() => setBulkDeleteOpen(true)}>
              {isVi ? 'Xóa đã chọn' : 'Delete selected'}
            </button>
            <button type="button" className="btn-admin-secondary text-sm py-1 px-3" onClick={() => setSelectedIds(new Set())}>
              {isVi ? 'Bỏ chọn' : 'Clear'}
            </button>
          </div>
        ) : null}
        {loading ? (
          <div className="text-white/80">{isVi ? 'Đang tải…' : 'Loading…'}</div>
        ) : news.length === 0 ? (
          <div className="glass p-6 rounded-2xl text-white/70">{isVi ? 'Chưa có bài viết tin tức.' : 'No news articles yet.'}</div>
        ) : (
          <div className="space-y-3">
            {canDeleteNews ? (
              <label className="hidden md:flex items-center gap-2 text-sm text-white/70 px-1">
                <input
                  ref={selectAllPageRef}
                  type="checkbox"
                  className="rounded border-white/30"
                  aria-label={isVi ? 'Chọn tất cả trên trang' : 'Select all on page'}
                  onChange={toggleSelectAllPage}
                />
                {isVi ? 'Chọn tất cả trên trang này' : 'Select all on this page'}
              </label>
            ) : null}
            {news.map((n) => (
              <AdminSwipeRow
                key={n.id}
                className="w-full rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
                canEdit={can('news', 'update')}
                canDelete={canDeleteNews}
                onEdit={() => openEdit(n)}
                onDelete={() => requestDelete(n.id, n.title)}
                actionsDesktop={
                  <>
                    {can('news', 'update') ? (
                      <button
                        type="button"
                        onClick={(e) => openEdit(n, e.currentTarget)}
                        aria-label={`Edit ${n.title}`}
                        className="btn-admin-icon"
                      >
                        <AdminEditIcon />
                      </button>
                    ) : null}
                    {canDeleteNews ? (
                      <button
                        type="button"
                        onClick={(e) => requestDelete(n.id, n.title, e.currentTarget)}
                        aria-label={`Delete ${n.title}`}
                        className="btn-admin-icon-danger"
                      >
                        <AdminTrashIcon />
                      </button>
                    ) : null}
                  </>
                }
              >
                <div className="flex gap-3 items-center p-4 min-h-[52px]">
                  {canDeleteNews ? (
                    <label className="hidden md:flex items-center shrink-0" onTouchStart={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="rounded border-white/30"
                        checked={selectedIds.has(n.id)}
                        onChange={() => toggleSelectRow(n.id)}
                        aria-label={isVi ? 'Chọn dòng' : 'Select row'}
                      />
                    </label>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="text-white font-semibold wrap-break-word">{n.title}</p>
                  </div>
                  {canDeleteNews ? (
                    <label className="flex md:hidden items-center shrink-0 px-1" onTouchStart={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="rounded border-white/30"
                        checked={selectedIds.has(n.id)}
                        onChange={() => toggleSelectRow(n.id)}
                        aria-label={isVi ? 'Chọn dòng' : 'Select row'}
                      />
                    </label>
                  ) : null}
                </div>
              </AdminSwipeRow>
            ))}
          </div>
        )}

        {!loading && total > 0 ? (
          <div className="w-full flex items-center justify-between mt-6 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
            <p className="text-white/60 text-sm">
              Page <span className="text-white/80 font-medium">{page}</span> of{' '}
              <span className="text-white/80 font-medium">{Math.max(1, Math.ceil(total / pageSize))}</span> (total{' '}
              <span className="text-white/80 font-medium">{total}</span>)
            </p>
            <div className="flex gap-2 shrink-0">
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
                disabled={page >= Math.ceil(total / pageSize)}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* ==================== EDIT / CREATE ARTICLE MODAL ==================== */}
      {modal.open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-2 sm:px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => void modal.closeAnimated()} />
          <div
            className="relative w-full max-w-5xl max-h-[96vh] sm:max-h-[90vh] glass rounded-2xl border border-white/10 overflow-hidden"
            style={{
              transformOrigin: `${modal.origin.x}px ${modal.origin.y}px`,
              animation: modal.closing
                ? `modal-zoom-out ${modal.durationMs}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
                : `modal-zoom-in ${modal.durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >
            <div className="flex items-start justify-between gap-4 px-4 sm:px-6 py-4 border-b border-white/10 bg-white/5">
              <div className="min-w-0">
                <h3 className="text-lg sm:text-xl font-bold text-white">{form.id ? (isVi ? 'Sửa tin tức' : 'Edit News') : isVi ? 'Thêm tin tức' : 'Add News'}</h3>
                <p className="text-white/60 text-sm mt-1">Rich content editor supports HTML and embedded code blocks.</p>
              </div>
              <button onClick={() => void modal.closeAnimated()} className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-2 rounded shrink-0 min-h-10 min-w-10" aria-label="Close">
                ✕
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(96vh-156px)] sm:max-h-[calc(90vh-148px)] px-4 sm:px-6 py-4 sm:py-5 pb-28 sm:pb-6">
              <div className="space-y-5">
              <div className="grid grid-cols-1 xl:grid-cols-3 xl:items-stretch gap-5">
                <div className="xl:col-span-2 space-y-4 min-w-0 xl:min-h-0">
                <label className="block md:col-span-2">
                  <span className="text-white/80 text-sm">Title</span>
                  <input
                    value={form.title}
                    onChange={(e) => {
                      const nextTitle = e.target.value;
                      setForm((prev) => ({
                        ...prev,
                        title: nextTitle,
                        slug: prev.id == null ? slugify(nextTitle) : prev.slug,
                      }));
                    }}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="News title"
                    disabled={!can('news', form.id == null ? 'create' : 'update')}
                  />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <label className="block">
                  <span className="text-white/80 text-sm">Slug</span>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="auto-slug"
                    readOnly={form.id == null}
                  />
                </label>

                <label className="block">
                  <span className="text-white/80 text-sm">{isVi ? 'Danh mục' : 'Category'}</span>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="General">General</option>
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>
                </div>

                <div className="block md:col-span-2 min-w-0">
                  <span className="text-white/80 text-sm">
                    {isVi ? 'Mô tả meta (định dạng)' : 'Meta description (rich text)'}
                  </span>
                  <div className="mt-1 w-full min-w-0 rounded-lg border border-white/20 overflow-hidden bg-[#1e1e1e] [&_.tox-tinymce]:max-w-none">
                    <AdminTinyMceEditor
                      id="news-meta-description"
                      value={form.description}
                      onChange={(html) => setForm((prev) => ({ ...prev, description: html }))}
                      disabled={!can('news', form.id == null ? 'create' : 'update')}
                    />
                  </div>
                </div>
                <p className="text-xs text-white/45 -mt-2">
                  {richTextAsPlain(form.description).length}/300 {isVi ? 'ký tự (text thuần) gợi ý' : 'plain-text chars recommended'}
                </p>

                <label className="block md:col-span-2">
                  <span className="text-white/80 text-sm">Thumbnail</span>
                  <div className="mt-1 flex items-start gap-4">
                    <div className="relative w-28 h-20 rounded-lg overflow-hidden bg-white/10">
                      {thumbnailPreview?.url ? (
                        <Image src={thumbnailPreview.url} alt={thumbnailPreview.filename} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-2xl">🖼️</div>
                      )}
                    </div>
                    <div className="flex-1 space-y-2">
                      <button
                        type="button"
                        className="bg-white/15 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/25 disabled:opacity-40 disabled:pointer-events-none"
                        onClick={openThumbPicker}
                        disabled={!can('media', 'read')}
                      >
                        Select from media
                      </button>
                      <button
                        type="button"
                        className="text-sm text-red-400 hover:text-red-300 underline underline-offset-2 disabled:opacity-40 disabled:pointer-events-none bg-transparent p-2 border-0 text-left cursor-pointer"
                        onClick={() =>
                          setForm((prev) => ({ ...prev, imageId: null, imageUrl: null, imageFilename: null }))
                        }
                        disabled={!form.imageId}
                      >
                        Clear
                      </button>
                      <p className="text-white/50 text-xs">Thumbnail is stored as `imageId` in the DB.</p>
                    </div>
                  </div>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <label className="block min-w-0">
                  <span className="text-white/80 text-sm">{isVi ? 'Trạng thái' : 'Status'}</span>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                  </select>
                </label>

                <label className="block min-w-0">
                  <span className="text-white/80 text-sm">Published date</span>
                  <input
                    type="date"
                    value={form.publishedAt}
                    onChange={(e) => setForm((prev) => ({ ...prev, publishedAt: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </label>

                <label className="block min-w-0">
                  <span className="text-white/80 text-sm">Start date</span>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((prev) => ({ ...prev, startDate: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </label>

                <label className="block min-w-0">
                  <span className="text-white/80 text-sm">End date</span>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((prev) => ({ ...prev, endDate: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </label>
                </div>
                </div>

                <div className="space-y-4 rounded-xl border border-white/10 bg-white/5 p-4 h-fit xl:h-full xl:min-h-0 flex flex-col">
                  <h4 className="text-white font-semibold shrink-0">SEO & Taxonomy</h4>
                <label className="block">
                  <span className="text-white/80 text-sm">Tags (comma-separated, optional)</span>
                  <input
                    value={form.tags}
                    onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="e.g. Updates, Product"
                  />
                </label>

                <div className="grid grid-cols-1 gap-4">
                  <label className="block">
                    <span className="text-white/80 text-sm">SEO title</span>
                    <input
                      value={form.seoTitle}
                      onChange={(e) => setForm((prev) => ({ ...prev, seoTitle: e.target.value }))}
                      className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="Optional"
                    />
                  </label>
                  <label className="block">
                    <span className="text-white/80 text-sm">SEO keywords</span>
                    <input
                      value={form.seoKeywords}
                      onChange={(e) => setForm((prev) => ({ ...prev, seoKeywords: e.target.value }))}
                      className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="Optional"
                    />
                  </label>
                  <div className="block min-w-0">
                    <span className="text-white/80 text-sm">
                      {isVi ? 'Mô tả SEO (định dạng)' : 'SEO description (rich text)'}
                    </span>
                    <div className="mt-1 w-full min-w-0 rounded-lg border border-white/20 overflow-hidden bg-[#1e1e1e] [&_.tox-tinymce]:max-w-none">
                      <AdminTinyMceEditor
                        id="news-seo-description"
                        value={form.seoDescription}
                        onChange={(html) => setForm((prev) => ({ ...prev, seoDescription: html }))}
                        disabled={!can('news', form.id == null ? 'create' : 'update')}
                      />
                    </div>
                  </div>
                </div>
                </div>
              </div>

              <label className="block w-full min-w-0">
                <span className="text-white/80 text-sm">Content (HTML + code snippets)</span>
                <div className="mt-1 w-full min-w-0 rounded-lg border border-white/20 overflow-hidden bg-[#1e1e1e] [&_.tox-tinymce]:max-w-none">
                  <AdminTinyMceEditor
                    id="news-content"
                    value={form.content}
                    onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
                    disabled={!can('news', form.id == null ? 'create' : 'update')}
                  />
                </div>
              </label>
              </div>
            </div>

              <div className="sticky bottom-0 left-0 right-0 flex justify-end gap-2 px-4 sm:px-6 py-3 sm:py-4 border-t border-white/10 bg-[#14141c]/95 backdrop-blur">
                <button onClick={() => void modal.closeAnimated()} className="btn-admin-secondary" disabled={saving}>
                  {isVi ? 'Hủy' : 'Cancel'}
                </button>
                <button onClick={() => void submit()} className="btn-admin-primary" disabled={saving}>
                  {saving ? (isVi ? 'Đang lưu…' : 'Saving…') : isVi ? 'Lưu' : 'Save'}
                </button>
              </div>
          </div>
        </div>
      ) : null}

      {/* ==================== THUMBNAIL MEDIA LIBRARY PICKER ==================== */}
      {thumbPickerOpen ? (
        <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setThumbPickerOpen(false)} />
          <div className="relative w-full max-w-4xl glass p-6 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between gap-3 mb-4">
              <h3 className="text-lg font-bold text-white">Select thumbnail</h3>
              <button
                onClick={() => setThumbPickerOpen(false)}
                className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded"
              >
                ✕
              </button>
            </div>
            {thumbPickerLoading ? (
              <div className="text-white/70">Loading images…</div>
            ) : thumbList.length === 0 ? (
              <div className="text-white/70">No images found.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-[60vh] overflow-y-auto pr-1">
                {thumbList.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => pickThumb(m)}
                    className={`relative aspect-square rounded-lg overflow-hidden border ${
                      form.imageId === m.id ? 'border-purple-400/70' : 'border-white/15 hover:border-white/30'
                    } bg-white/5`}
                  >
                    <Image src={m.url} alt={m.filename} fill className="object-cover" unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : null}

      {/* ==================== DELETE CONFIRMATION MODAL ==================== */}
      {deleteModal.open ? (
        <div className="fixed inset-0 z-60 flex items-center justify-center px-3 sm:px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => void deleteModal.closeAnimated()} />
          <div
            className="relative w-full max-w-md rounded-2xl border border-red-400/30 bg-[#181320] shadow-2xl overflow-hidden"
            style={{
              transformOrigin: `${deleteModal.origin.x}px ${deleteModal.origin.y}px`,
              animation: deleteModal.closing
                ? `modal-zoom-out ${deleteModal.durationMs}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
                : `modal-zoom-in ${deleteModal.durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >
            <div className="px-5 py-4 border-b border-white/10 bg-red-500/10">
              <h3 className="text-lg font-bold text-white">{isVi ? 'Xác nhận xóa' : 'Confirm delete'}</h3>
              <p className="text-red-200/90 text-sm mt-1">This action cannot be undone.</p>
            </div>
            <div className="px-5 py-4">
              <p className="text-white/80 text-sm">
                {isVi ? 'Xóa bài viết' : 'Delete article'}: <span className="text-white font-medium">{deletePending?.title ?? ''}</span>?
              </p>
            </div>
            <div className="sticky bottom-0 left-0 right-0 flex justify-end gap-2 px-5 py-3 border-t border-white/10 bg-[#14141c]/95 backdrop-blur">
              <button
                type="button"
                onClick={() => void deleteModal.closeAnimated()}
                className="btn-admin-secondary"
                disabled={deleting}
              >
                {isVi ? 'Hủy' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={() => void confirmDelete()}
                className="btn-admin-danger"
                disabled={deleting}
              >
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <AdminConfirmDialog
        open={bulkDeleteOpen}
        origin={null}
        title={isVi ? 'Xóa nhiều bài viết' : 'Delete multiple articles'}
        message={
          isVi
            ? `Xóa ${selectedIds.size} bài đã chọn? Hành động này không thể hoàn tác.`
            : `Delete ${selectedIds.size} selected articles? This cannot be undone.`
        }
        confirmText={isVi ? 'Xóa' : 'Delete'}
        confirming={deleting}
        onCancel={() => (!deleting ? setBulkDeleteOpen(false) : undefined)}
        onConfirm={() => void removeManyNews(Array.from(selectedIds))}
      />
    </>
  );
}

