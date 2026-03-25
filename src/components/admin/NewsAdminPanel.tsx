'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import AdminTinyMceEditor from '@/components/admin/AdminTinyMceEditor';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useToast } from '@/components/providers/ToastProvider';
import { NEWS_CATEGORIES } from '@/lib/news/newsCategories';
import { slugify } from '@/lib/news/slugify';

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
  const toast = useToast();

  const [news, setNews] = useState<AdminNewsRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const [query, setQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const pageSizeOptions = useMemo(() => [10, 20, 50], []);

  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
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

  const openCreate = useCallback(() => {
    if (!can('news', 'create')) return;
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
    setModalOpen(true);
  }, [can]);

  const openEdit = useCallback(
    (row: AdminNewsRow) => {
      if (!can('news', 'update')) return;
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
      setModalOpen(true);
    },
    [can],
  );

  const deleteRow = useCallback(
    async (id: number) => {
      if (!can('news', 'delete')) return;
      const ok = window.confirm('Delete this news article?');
      if (!ok) return;

      try {
        const res = await fetch(`/api/admin/news/${id}`, { method: 'DELETE', credentials: 'include' });
        if (!res.ok) throw new Error('Delete failed');
        toast.success('Deleted');
        await refreshNews();
      } catch {
        toast.error('Delete failed');
      }
    },
    [can, refreshNews, toast],
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

      setModalOpen(false);
      toast.success('Saved');
      await refreshNews();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : 'Save failed';
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  }, [can, form, refreshNews, toast]);

  const thumbnailPreview = useMemo(() => {
    if (!form.imageId || !form.imageUrl) return null;
    return { url: form.imageUrl, filename: form.imageFilename ?? '' };
  }, [form.imageId, form.imageUrl, form.imageFilename]);

  if (!can('news', 'read')) {
    return <div className="text-white/70">No permission to read news.</div>;
  }

  return (
    <>
      <div className="top-0 z-20 w-full backdrop-blur bg-[#0a0a0a]/60 border-b border-white/10 p-4 rounded-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">News Management</h2>
          {can('news', 'create') ? (
            <button className="cta-button px-6 py-2" onClick={openCreate}>
              + Add News
            </button>
          ) : null}
        </div>

        <div className="glass w-full p-4 rounded-2xl border border-white/10 bg-white/5">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <label className="block">
              <span className="text-white/70 text-sm block mb-2">Search</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Title/description..."
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </label>

            <label className="block">
              <span className="text-white/70 text-sm block mb-2">Category</span>
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
              <span className="text-white/70 text-sm block mb-2">Status</span>
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
              <span className="text-white/70 text-sm block mb-2">Page size</span>
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

      <div className="pt-4">
        {loading ? (
          <div className="text-white/80">Loading…</div>
        ) : news.length === 0 ? (
          <div className="glass p-6 rounded-2xl text-white/70">No news articles yet.</div>
        ) : (
          <div className="space-y-3">
            {news.map((n) => (
              <div
                key={n.id}
                className="w-full bg-white/5 p-4 rounded-xl border border-white/10 flex flex-col md:flex-row md:justify-between md:items-start gap-3 hover:bg-white/10 transition-colors"
              >
                <div className="flex gap-4 items-start flex-1 min-w-0">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-white/5">
                    {n.image?.url ? (
                      <Image src={n.image.url} alt={n.image.filename} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">📰</div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold wrap-break-word">{n.title}</p>
                    <p className="text-white/50 text-sm mt-1">
                      Category: {n.category} • Status: {n.status}
                    </p>
                    <p className="text-white/70 text-sm mt-1">{n.description}</p>
                  </div>
                </div>

                <div className="flex gap-1 md:justify-end shrink-0">
                  {can('news', 'update') ? (
                    <button
                      type="button"
                      onClick={() => openEdit(n)}
                      aria-label={`Edit ${n.title}`}
                      className="bg-transparent border border-white/30 text-white px-3 py-2 rounded hover:bg-white/10 hover:text-white/90 inline-flex items-center justify-center transition-colors transform-gpu"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.animation = '';
                      }}
                    >
                      <span aria-hidden>✏️</span>
                    </button>
                  ) : null}
                  {can('news', 'delete') ? (
                    <button
                      type="button"
                      onClick={() => deleteRow(n.id)}
                      aria-label={`Delete ${n.title}`}
                      className="bg-transparent border border-red-400/35 text-red-300 px-3 py-2 rounded hover:bg-red-400/15 hover:border-red-400/55 hover:text-red-400/95 inline-flex items-center justify-center transition-colors"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.animation = 'zoom-in-zoom-out-120 1s ease infinite';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.animation = '';
                      }}
                    >
                      <span aria-hidden>🗑️</span>
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
              <span className="text-white/80 font-medium">{Math.max(1, Math.ceil(total / pageSize))}</span> (total{' '}
              <span className="text-white/80 font-medium">{total}</span>)
            </p>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                className="bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-xl disabled:opacity-40 disabled:pointer-events-none transition-colors"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>
              <button
                type="button"
                className="bg-white/5 hover:bg-white/10 text-white px-3 py-2 rounded-xl disabled:opacity-40 disabled:pointer-events-none transition-colors"
                disabled={page >= Math.ceil(total / pageSize)}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => setModalOpen(false)} />
          <div className="relative w-full max-w-3xl glass p-6 rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold text-white">{form.id ? 'Edit News' : 'Add News'}</h3>
                <p className="text-white/60 text-sm mt-1">
                  content supports rich HTML and code snippets (stored in DB).
                </p>
              </div>
              <button onClick={() => setModalOpen(false)} className="text-white/70 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded" aria-label="Close">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

                <label className="block">
                  <span className="text-white/80 text-sm">Slug</span>
                  <input
                    value={form.slug}
                    onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="auto-slug"
                    readOnly={form.id == null}
                  />
                </label>

                <label className="block">
                  <span className="text-white/80 text-sm">Category</span>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="General">General</option>
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="block md:col-span-2">
                  <span className="text-white/80 text-sm">Meta description</span>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="Short meta description"
                  />
                </label>

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
                        className="bg-white/10 text-white px-3 py-2 rounded-lg text-sm hover:bg-white/20"
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

                <label className="block">
                  <span className="text-white/80 text-sm">Status</span>
                  <select
                    value={form.status}
                    onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  >
                    <option value="Active">Active</option>
                    <option value="Expired">Expired</option>
                  </select>
                </label>

                <label className="block">
                  <span className="text-white/80 text-sm">Published date</span>
                  <input
                    type="date"
                    value={form.publishedAt}
                    onChange={(e) => setForm((prev) => ({ ...prev, publishedAt: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </label>

                <label className="block">
                  <span className="text-white/80 text-sm">Start date</span>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) => setForm((prev) => ({ ...prev, startDate: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </label>

                <label className="block">
                  <span className="text-white/80 text-sm">End date</span>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) => setForm((prev) => ({ ...prev, endDate: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                  />
                </label>

                <label className="block md:col-span-2">
                  <span className="text-white/80 text-sm">Content (HTML + code snippets)</span>
                  <div className="mt-1 rounded-lg border border-white/20 overflow-hidden bg-[#1e1e1e]">
                    <AdminTinyMceEditor
                      id="news-content"
                      value={form.content}
                      onChange={(html) => setForm((prev) => ({ ...prev, content: html }))}
                      disabled={!can('news', form.id == null ? 'create' : 'update')}
                    />
                  </div>
                </label>

                <label className="block md:col-span-2">
                  <span className="text-white/80 text-sm">Tags (comma-separated, optional)</span>
                  <input
                    value={form.tags}
                    onChange={(e) => setForm((prev) => ({ ...prev, tags: e.target.value }))}
                    className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                    placeholder="e.g. Updates, Product"
                  />
                </label>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:col-span-2">
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
                  <label className="block md:col-span-2">
                    <span className="text-white/80 text-sm">SEO description</span>
                    <textarea
                      value={form.seoDescription}
                      onChange={(e) => setForm((prev) => ({ ...prev, seoDescription: e.target.value }))}
                      rows={3}
                      className="mt-1 w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
                      placeholder="Optional"
                    />
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setModalOpen(false)} className="bg-white/10 text-white px-4 py-2 rounded hover:bg-white/20" disabled={saving}>
                  Cancel
                </button>
                <button onClick={() => void submit()} className="cta-button px-6 py-2" disabled={saving}>
                  {saving ? 'Saving…' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

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
    </>
  );
}

