'use client';

import { Fragment, type ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import AdminTrashIcon from '@/components/admin/AdminTrashIcon';
import AdminEditIcon from '@/components/admin/AdminEditIcon';
import AdminSwipeRow from '@/components/admin/AdminSwipeRow';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useToast } from '@/components/providers/ToastProvider';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import {
  getModalOriginFromElement,
  type ModalOriginPoint,
  useAnimatedOriginModal,
} from '@/components/admin/useAnimatedOriginModal';
import { useEscapeToClose } from '@/components/admin/useEscapeToClose';
import { useLocale } from '@/components/providers/LocaleProvider';
import AdminTinyMceEditor from '@/components/admin/AdminTinyMceEditor';
import { AdminFilterSearchIconButton, adminFilterPanelClass } from '@/components/admin/AdminFilterBarMobile';
import { richTextAsPlain } from '@/lib/richTextAdmin';
import { apiPath } from '@/lib/apiRoutes';

// --- Sections (UI): Toolbar & table | Edit modal | Image library picker | Delete confirm ---
// --- Sections (logic): List/meta state | Form & image modes | Save/delete | Media picker ---

type AdminProduct = {
  id: number;
  productName: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  imageUrls: string[];
  videoUrls: string[];
  demoLink: string | null;
  landingPageLink: string | null;
  embedDemoUrl: string | null;
  categoryId: number;
  category: { id: number; name: string; slug: string };
  isFeatured: boolean;
  status: string;
  seoTitle: string | null;
  seoDescription: string | null;
  seoKeywords: string | null;
  technologyIds: number[];
  updatedAt: string;
};

type Meta = {
  categories: Array<{ id: number; name: string; slug: string }>;
  technologies: Array<{ id: number; techName: string }>;
};

function linesToUrls(s: string): string[] {
  return s
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean);
}

type MediaRow = { id: number; url: string; filename: string; mimeType: string };

type ProductImageSourceMode = 'upload' | 'library' | 'url';

export default function ProductsAdminPanel() {
  const { can } = useAdminPermissions();
  const { locale } = useLocale();
  const toast = useToast();
  const isVi = locale === 'vi-VN';
  const canMediaCreate = can('media', 'create');
  const canMediaRead = can('media', 'read');
  const [rows, setRows] = useState<AdminProduct[]>([]);
  const [meta, setMeta] = useState<Meta>({ categories: [], technologies: [] });
  const [loading, setLoading] = useState(false);
  const modal = useAnimatedOriginModal(600);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminProduct | null>(null);
  const [deleteDialogOrigin, setDeleteDialogOrigin] = useState<ModalOriginPoint | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({
    productName: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    imageUrlsText: '',
    videoUrlsText: '',
    demoLink: '',
    landingPageLink: '',
    embedDemoUrl: '',
    categoryId: 0,
    technologyIds: [] as number[],
    isFeatured: false,
    status: 'Active',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  });
  const productImageFileRef = useRef<HTMLInputElement>(null);
  const [imageAddMode, setImageAddMode] = useState<ProductImageSourceMode>('upload');
  const [imageDraftUrl, setImageDraftUrl] = useState('');
  const [imageUploading, setImageUploading] = useState(false);
  const [imagePickerOpen, setImagePickerOpen] = useState(false);
  const [imagePickerLoading, setImagePickerLoading] = useState(false);
  const [imagePickerList, setImagePickerList] = useState<MediaRow[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);
  const selectAllRef = useRef<HTMLInputElement>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [featuredFilter, setFeaturedFilter] = useState('');
  const [techFilter, setTechFilter] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const canDelete = can('products', 'delete');
  const colCount = canDelete ? 7 : 6;

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const tid = techFilter ? Number(techFilter) : NaN;
    return rows.filter((p) => {
      if (categoryFilter && String(p.categoryId) !== categoryFilter) return false;
      if (statusFilter && (p.status || '') !== statusFilter) return false;
      if (featuredFilter === 'yes' && !p.isFeatured) return false;
      if (featuredFilter === 'no' && p.isFeatured) return false;
      if (Number.isFinite(tid) && tid > 0 && !(p.technologyIds || []).includes(tid)) return false;
      if (!q) return true;
      const cat = (p.category?.name ?? '').toLowerCase();
      const shortPlain = richTextAsPlain(p.shortDescription || '').toLowerCase();
      const hay = `${p.productName} ${p.slug} ${cat} ${shortPlain}`.toLowerCase();
      return hay.includes(q);
    });
  }, [rows, searchQuery, categoryFilter, statusFilter, featuredFilter, techFilter]);

  useEffect(() => {
    if (!modal.open) {
      setImagePickerOpen(false);
      setImageDraftUrl('');
    }
  }, [modal.open]);

  useEffect(() => {
    if (!modal.open) return;
    if (!canMediaCreate && !canMediaRead) setImageAddMode('url');
    else if (!canMediaCreate && canMediaRead) setImageAddMode('library');
    else setImageAddMode('upload');
  }, [modal.open, canMediaCreate, canMediaRead]);

  useEscapeToClose((modal.open && !saving) || imagePickerOpen, () => {
    if (imagePickerOpen) {
      setImagePickerOpen(false);
      return;
    }
    if (modal.open && !saving) void modal.closeAnimated();
  });

  const appendProductImageUrl = useCallback(
    (raw: string) => {
      const u = raw.trim();
      if (!u) return;
      setForm((f) => {
        const urls = linesToUrls(f.imageUrlsText);
        if (urls.includes(u)) return f;
        const next = urls.length ? `${f.imageUrlsText.replace(/\s+$/, '')}\n${u}` : u;
        return { ...f, imageUrlsText: next };
      });
    },
    [],
  );

  const removeProductImageAt = (index: number) => {
    setForm((f) => {
      const urls = linesToUrls(f.imageUrlsText);
      urls.splice(index, 1);
      return { ...f, imageUrlsText: urls.join('\n') };
    });
  };

  const uploadProductImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!canMediaCreate || !can('products', editingId == null ? 'create' : 'update')) return;
    const file = e.target.files?.[0];
    if (!file) return;
    setImageUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('folder', 'products');
      const res = await fetch(apiPath('admin/media'), { method: 'POST', credentials: 'include', body: fd });
      if (!res.ok) {
        const j = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(j.error || 'Upload failed');
      }
      const j = (await res.json()) as { media?: { url?: string } };
      const url = j.media?.url;
      if (!url) throw new Error('No URL returned');
      appendProductImageUrl(url);
      toast.success(isVi ? 'Đã thêm ảnh' : 'Image added');
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setImageUploading(false);
      e.target.value = '';
    }
  };

  const openProductImageLibrary = async () => {
    if (!canMediaRead) {
      toast.error(isVi ? 'Cần quyền xem Media.' : 'Media view permission required.');
      return;
    }
    setImagePickerOpen(true);
    setImagePickerLoading(true);
    try {
      const res = await fetch(`${apiPath('admin/media')}?take=200&imagesOnly=1`, { credentials: 'include' });
      if (!res.ok) throw new Error('load failed');
      const list = (await res.json()) as MediaRow[];
      setImagePickerList(Array.isArray(list) ? list : []);
    } catch {
      toast.error(isVi ? 'Không tải được thư viện' : 'Failed to load media library');
      setImagePickerList([]);
    } finally {
      setImagePickerLoading(false);
    }
  };

  const pickProductImageFromLibrary = (row: MediaRow) => {
    appendProductImageUrl(row.url);
    setImagePickerOpen(false);
    toast.success(isVi ? 'Đã thêm ảnh' : 'Image added');
  };

  const addProductImageFromUrlField = () => {
    if (!imageDraftUrl.trim()) {
      toast.error(isVi ? 'Nhập URL ảnh' : 'Enter an image URL');
      return;
    }
    appendProductImageUrl(imageDraftUrl);
    setImageDraftUrl('');
    toast.success(isVi ? 'Đã thêm ảnh' : 'Image added');
  };

  const productImageUrls = useMemo(() => linesToUrls(form.imageUrlsText), [form.imageUrlsText]);

  const loadMeta = useCallback(async () => {
    try {
      const res = await fetch(`${apiPath('products')}?take=1`, { credentials: 'include' });
      if (!res.ok) return;
      const j = (await res.json()) as Meta;
      setMeta({
        categories: Array.isArray(j.categories) ? j.categories : [],
        technologies: Array.isArray(j.technologies) ? j.technologies : [],
      });
      setForm((f) => ({
        ...f,
        categoryId: j.categories?.[0]?.id ?? f.categoryId,
      }));
    } catch {
      /* ignore */
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${apiPath('admin/products')}?take=200`, { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401) window.location.href = '/admin/login';
        throw new Error('Load failed');
      }
      const data = (await res.json()) as AdminProduct[];
      setRows(Array.isArray(data) ? data : []);
    } catch {
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (!can('products', 'read')) return;
    void loadMeta();
    void refresh();
  }, [can, loadMeta, refresh]);

  useEffect(() => {
    const el = selectAllRef.current;
    if (!el || !canDelete) return;
    const n = filteredRows.length;
    const sel = filteredRows.filter((p) => selectedIds.has(p.id)).length;
    el.checked = n > 0 && sel === n;
    el.indeterminate = sel > 0 && sel < n;
  }, [filteredRows, selectedIds, canDelete]);

  const toggleSelectRow = (id: number) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    if (filteredRows.length === 0) return;
    if (filteredRows.every((p) => selectedIds.has(p.id))) {
      setSelectedIds((prev) => {
        const next = new Set(prev);
        for (const p of filteredRows) next.delete(p.id);
        return next;
      });
    } else {
      setSelectedIds((prev) => new Set([...prev, ...filteredRows.map((p) => p.id)]));
    }
  };

  const openCreate = (triggerEl?: HTMLElement | null) => {
    modal.openFromElement(triggerEl);
    setEditingId(null);
    setForm({
      productName: '',
      slug: '',
      shortDescription: '',
      fullDescription: '',
      imageUrlsText: '',
      videoUrlsText: '',
      demoLink: '',
      landingPageLink: '',
      embedDemoUrl: '',
      categoryId: meta.categories[0]?.id ?? 0,
      technologyIds: [],
      isFeatured: false,
      status: 'Active',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: '',
    });
  };

  const openEdit = (p: AdminProduct, triggerEl?: HTMLElement | null) => {
    modal.openFromElement(triggerEl);
    setEditingId(p.id);
    setForm({
      productName: p.productName,
      slug: p.slug,
      shortDescription: p.shortDescription,
      fullDescription: p.fullDescription,
      imageUrlsText: (p.imageUrls || []).join('\n'),
      videoUrlsText: (p.videoUrls || []).join('\n'),
      demoLink: p.demoLink ?? '',
      landingPageLink: p.landingPageLink ?? '',
      embedDemoUrl: p.embedDemoUrl ?? '',
      categoryId: p.categoryId,
      technologyIds: [...(p.technologyIds || [])],
      isFeatured: p.isFeatured,
      status: p.status || 'Active',
      seoTitle: p.seoTitle ?? '',
      seoDescription: p.seoDescription ?? '',
      seoKeywords: p.seoKeywords ?? '',
    });
  };

  const toggleTech = (id: number) => {
    setForm((f) => ({
      ...f,
      technologyIds: f.technologyIds.includes(id) ? f.technologyIds.filter((x) => x !== id) : [...f.technologyIds, id],
    }));
  };

  const submit = async () => {
    if (!can('products', editingId == null ? 'create' : 'update')) return;
    setSaving(true);
    try {
      if (!Number.isFinite(form.categoryId) || form.categoryId <= 0) {
        toast.error('Select a valid category');
        setSaving(false);
        return;
      }
      const imageUrls = linesToUrls(form.imageUrlsText);
      const videoUrls = linesToUrls(form.videoUrlsText);
      const payload: Record<string, unknown> = {
        productName: form.productName.trim(),
        shortDescription: form.shortDescription.trim(),
        fullDescription: form.fullDescription.trim(),
        categoryId: form.categoryId,
        imageUrls,
        videoUrls,
        demoLink: form.demoLink.trim() || null,
        landingPageLink: form.landingPageLink.trim() || null,
        embedDemoUrl: form.embedDemoUrl.trim() || null,
        technologyIds: form.technologyIds,
        isFeatured: form.isFeatured,
        status: form.status.trim() || 'Active',
        seoTitle: form.seoTitle.trim() || null,
        seoDescription: form.seoDescription.trim() || null,
        seoKeywords: form.seoKeywords.trim() || null,
      };
      if (form.slug.trim()) payload.slug = form.slug.trim();

      if (editingId == null) {
        const res = await fetch(apiPath('admin/products'), {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const j = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(j.error || 'Create failed');
        }
        toast.success(isVi ? 'Đã tạo sản phẩm' : 'Product created');
      } else {
        const res = await fetch(apiPath(`admin/products/${editingId}`), {
          method: 'PUT',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const j = (await res.json().catch(() => ({}))) as { error?: string };
          throw new Error(j.error || 'Update failed');
        }
        toast.success(isVi ? 'Đã cập nhật sản phẩm' : 'Product updated');
      }
      await modal.closeAnimated();
      await refresh();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (p: AdminProduct) => {
    if (!can('products', 'delete')) return;
    setDeleting(true);
    try {
      const res = await fetch(apiPath(`admin/products/${p.id}`), { method: 'DELETE', credentials: 'include' });
      if (!res.ok) throw new Error('Delete failed');
      toast.success('Deleted');
      setDeleteTarget(null);
      setSelectedIds((prev) => {
        const next = new Set(prev);
        next.delete(p.id);
        return next;
      });
      await refresh();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  const removeMany = async (ids: number[]) => {
    if (!canDelete) return;
    setDeleting(true);
    try {
      for (const id of ids) {
        const res = await fetch(apiPath(`admin/products/${id}`), { method: 'DELETE', credentials: 'include' });
        if (!res.ok) throw new Error('Delete failed');
      }
      toast.success(isVi ? `Đã xóa ${ids.length} sản phẩm` : `Deleted ${ids.length} products`);
      setSelectedIds(new Set());
      setBulkDeleteOpen(false);
      await refresh();
    } catch {
      toast.error('Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  if (!can('products', 'read')) {
    return <div className="text-white/70">{isVi ? 'Không có quyền truy cập.' : 'No permission.'}</div>;
  }

  return (
    <div className="space-y-4">
      {/* ==================== HEADER & PRODUCT TABLE ==================== */}
      <div className="flex min-w-0 flex-row items-center justify-between gap-2">
        <h2 className="min-w-0 flex-1 truncate pr-1 text-xl font-bold text-white sm:text-2xl">
          {isVi ? 'Sản phẩm' : 'Products'}
        </h2>
        <div className="flex shrink-0 items-center gap-2">
          {can('products', 'create') ? (
            <button type="button" className="btn-admin-primary whitespace-nowrap" onClick={(e) => openCreate(e.currentTarget)}>
              {isVi ? 'Thêm sản phẩm' : 'Add product'}
            </button>
          ) : null}
          <AdminFilterSearchIconButton
            open={mobileFiltersOpen}
            onToggle={() => {
              setMobileFiltersOpen((v) => {
                const next = !v;
                if (next) queueMicrotask(() => searchInputRef.current?.focus());
                return next;
              });
            }}
            labelOpen={isVi ? 'Mở tìm kiếm và bộ lọc' : 'Open search and filters'}
            labelClose={isVi ? 'Đóng tìm kiếm và bộ lọc' : 'Close search and filters'}
          />
        </div>
      </div>
      <div className={`glass w-full p-4 rounded-2xl border border-white/10 bg-white/5 ${adminFilterPanelClass(mobileFiltersOpen)}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          <label className="block sm:col-span-2 lg:col-span-3 xl:col-span-2">
            <span className="text-white/70 text-sm block mb-2">{isVi ? 'Tìm kiếm' : 'Search'}</span>
            <input
              ref={searchInputRef}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setMobileFiltersOpen(true)}
              placeholder={isVi ? 'Tên, slug, danh mục…' : 'Name, slug, category…'}
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
              <option value="">{isVi ? 'Tất cả' : 'All'}</option>
              {meta.categories.map((c) => (
                <option key={c.id} value={String(c.id)}>
                  {c.name}
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
              <option value="">{isVi ? 'Tất cả' : 'All'}</option>
              <option value="Active">Active</option>
              <option value="Expired">Expired</option>
            </select>
          </label>
          <label className="block">
            <span className="text-white/70 text-sm block mb-2">{isVi ? 'Nổi bật' : 'Featured'}</span>
            <select
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
              className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              <option value="">{isVi ? 'Tất cả' : 'All'}</option>
              <option value="yes">{isVi ? 'Có' : 'Yes'}</option>
              <option value="no">{isVi ? 'Không' : 'No'}</option>
            </select>
          </label>
          {meta.technologies.length > 0 ? (
            <label className="block">
              <span className="text-white/70 text-sm block mb-2">{isVi ? 'Công nghệ' : 'Technology'}</span>
              <select
                value={techFilter}
                onChange={(e) => setTechFilter(e.target.value)}
                className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <option value="">{isVi ? 'Tất cả' : 'All'}</option>
                {meta.technologies.map((t) => (
                  <option key={t.id} value={String(t.id)}>
                    {t.techName}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </div>
      </div>

      {loading ? <p className="text-white/70">{isVi ? 'Đang tải…' : 'Loading…'}</p> : null}
      {canDelete && selectedIds.size > 0 ? (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border border-red-500/35 bg-red-950/35 px-3 py-2 text-sm text-white">
          <span>{isVi ? `Đã chọn ${selectedIds.size}` : `${selectedIds.size} selected`}</span>
          <button type="button" className="btn-admin-danger text-sm py-1 px-3" onClick={() => setBulkDeleteOpen(true)}>
            {isVi ? 'Xóa đã chọn' : 'Delete selected'}
          </button>
          <button type="button" className="btn-admin-secondary text-sm py-1 px-3" onClick={() => setSelectedIds(new Set())}>
            {isVi ? 'Bỏ chọn' : 'Clear'}
          </button>
        </div>
      ) : null}
      <div className="overflow-x-auto rounded-xl border border-white/10">
        <table className="w-full text-sm text-left text-white/90 min-w-0 md:min-w-[720px]">
          <thead className="bg-white/5 text-white/70">
            <tr className="max-md:hidden">
              {canDelete ? (
                <th className="w-10 px-2 py-2">
                  <input
                    ref={selectAllRef}
                    type="checkbox"
                    className="rounded border-white/30"
                    aria-label={isVi ? 'Chọn tất cả' : 'Select all'}
                    onChange={toggleSelectAll}
                    disabled={filteredRows.length === 0}
                  />
                </th>
              ) : null}
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Slug</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Featured</th>
              <th className="px-5 py-2 text-right">{isVi ? 'Thao tác' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((p) => (
              <Fragment key={p.id}>
                <tr className="hidden border-t border-white/10 md:table-row">
                  {canDelete ? (
                    <td className="px-2 py-2 align-middle">
                      <input
                        type="checkbox"
                        className="rounded border-white/30"
                        checked={selectedIds.has(p.id)}
                        onChange={() => toggleSelectRow(p.id)}
                        aria-label={isVi ? 'Chọn dòng' : 'Select row'}
                      />
                    </td>
                  ) : null}
                  <td className="px-3 py-2 max-w-[200px] truncate">{p.productName}</td>
                  <td className="px-3 py-2 font-mono text-xs">{p.slug}</td>
                  <td className="px-3 py-2">{p.category?.name ?? '—'}</td>
                  <td className="px-3 py-2">{p.status}</td>
                  <td className="px-3 py-2">{p.isFeatured ? 'Yes' : 'No'}</td>
                  <td className="px-3 py-2 text-right space-x-1">
                    {can('products', 'update') ? (
                      <button type="button" className="btn-admin-icon" onClick={(e) => openEdit(p, e.currentTarget)}>
                        <AdminEditIcon />
                      </button>
                    ) : null}
                    {canDelete ? (
                      <button
                        type="button"
                        className="btn-admin-icon-danger"
                        onClick={(e) => {
                          setDeleteDialogOrigin(getModalOriginFromElement(e.currentTarget));
                          setDeleteTarget(p);
                        }}
                      >
                        <AdminTrashIcon />
                      </button>
                    ) : null}
                  </td>
                </tr>
                <tr className="border-t border-white/10 md:hidden">
                  <td colSpan={colCount} className="p-0 align-top">
                    <AdminSwipeRow
                      canEdit={can('products', 'update')}
                      canDelete={canDelete}
                      onEdit={() => openEdit(p)}
                      onDelete={() => {
                        setDeleteDialogOrigin(null);
                        setDeleteTarget(p);
                      }}
                    >
                      <div className="flex items-center min-h-[4.5rem]">
                        {canDelete ? (
                          <label className="flex items-center px-2 border-r border-white/10 self-stretch" onTouchStart={(e) => e.stopPropagation()}>
                            <input
                              type="checkbox"
                              className="rounded border-white/30"
                              checked={selectedIds.has(p.id)}
                              onChange={() => toggleSelectRow(p.id)}
                              aria-label={isVi ? 'Chọn dòng' : 'Select row'}
                            />
                          </label>
                        ) : null}
                        <div className="min-w-0 flex-1 space-y-1 px-3 py-3">
                          <p className="font-semibold text-white truncate">{p.productName}</p>
                          <p className="font-mono text-xs text-white/60 truncate">{p.slug}</p>
                          <p className="text-sm text-white/70">
                            {p.category?.name ?? '—'} · {p.status}
                            {p.isFeatured ? (isVi ? ' · Nổi bật' : ' · Featured') : ''}
                          </p>
                        </div>
                      </div>
                    </AdminSwipeRow>
                  </td>
                </tr>
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
      {!loading && rows.length === 0 ? <p className="text-white/60">{isVi ? 'Chưa có sản phẩm.' : 'No products.'}</p> : null}
      {!loading && rows.length > 0 && filteredRows.length === 0 ? (
        <p className="text-white/60">{isVi ? 'Không có kết quả khớp bộ lọc.' : 'No products match your filters.'}</p>
      ) : null}

      {/* ==================== EDIT / CREATE PRODUCT MODAL ==================== */}
      {modal.open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4 overflow-y-auto">
          <div className="absolute inset-0 bg-black/60" onClick={() => void modal.closeAnimated()} />
          <div
            className="relative glass max-w-4xl w-full rounded-2xl p-6 space-y-3 my-8 max-h-[95vh] overflow-y-auto min-w-0"
            style={{
              transformOrigin: `${modal.origin.x}px ${modal.origin.y}px`,
              animation: modal.closing
                ? `modal-zoom-out ${modal.durationMs}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
                : `modal-zoom-in ${modal.durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >
            <h3 className="text-lg font-semibold text-white">{editingId == null ? (isVi ? 'Sản phẩm mới' : 'New product') : isVi ? 'Sửa sản phẩm' : 'Edit product'}</h3>
            <div className="grid sm:grid-cols-2 gap-3 min-w-0">
              <label className="block sm:col-span-2">
                <span className="text-white/70 text-sm">Product name</span>
                <input
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  value={form.productName}
                  onChange={(e) => setForm((f) => ({ ...f, productName: e.target.value }))}
                />
              </label>
              <label className="block">
                <span className="text-white/70 text-sm">Slug (optional)</span>
                <input
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  value={form.slug}
                  onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                />
              </label>
              <label className="block">
                <span className="text-white/70 text-sm">Category</span>
                <select
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  value={form.categoryId}
                  onChange={(e) => setForm((f) => ({ ...f, categoryId: Number(e.target.value) }))}
                >
                  {meta.categories.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </label>
              <div className="block sm:col-span-2 min-w-0">
                <span className="text-white/70 text-sm">
                  {isVi ? 'Mô tả ngắn (định dạng)' : 'Short description (rich text)'}
                </span>
                <div className="mt-1 w-full min-w-0 rounded-lg border border-white/20 overflow-hidden bg-[#1e1e1e] [&_.tox-tinymce]:max-w-none">
                  <AdminTinyMceEditor
                    id="product-short-description"
                    value={form.shortDescription}
                    onChange={(html) => setForm((f) => ({ ...f, shortDescription: html }))}
                    disabled={!can('products', editingId == null ? 'create' : 'update')}
                  />
                </div>
              </div>
              <div className="block sm:col-span-2 min-w-0">
                <span className="text-white/70 text-sm">
                  {isVi ? 'Mô tả đầy đủ (HTML)' : 'Full description (rich text)'}
                </span>
                <div className="mt-1 w-full min-w-0 rounded-lg border border-white/20 overflow-hidden bg-[#1e1e1e] [&_.tox-tinymce]:max-w-none">
                  <AdminTinyMceEditor
                    id="product-full-description"
                    value={form.fullDescription}
                    onChange={(html) => setForm((f) => ({ ...f, fullDescription: html }))}
                    disabled={!can('products', editingId == null ? 'create' : 'update')}
                  />
                </div>
              </div>
              <div className="block sm:col-span-2 space-y-3">
                <span className="text-white/70 text-sm block">
                  {isVi ? 'Ảnh sản phẩm' : 'Product images'}
                </span>
                <p className="text-white/45 text-xs -mt-1">
                  {isVi
                    ? 'Thứ tự: ảnh đầu là ảnh chính. Thêm bằng tải lên, thư viện hoặc URL.'
                    : 'Order matters: first image is the main image. Add via upload, library, or URL.'}
                </p>
                {productImageUrls.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {productImageUrls.map((url, idx) => (
                      <div
                        key={`${url}-${idx}`}
                        className="relative w-20 h-20 rounded-lg overflow-hidden border border-white/15 bg-white/5 shrink-0 group/img"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={url} alt="" className="w-full h-full object-cover" />
                        {can('products', editingId == null ? 'create' : 'update') ? (
                          <button
                            type="button"
                            title={isVi ? 'Xóa ảnh' : 'Remove image'}
                            onClick={() => removeProductImageAt(idx)}
                            className="absolute inset-0 flex items-center justify-center bg-black/55 text-white text-xs font-medium opacity-0 group-hover/img:opacity-100 transition-opacity"
                          >
                            {isVi ? 'Xóa' : 'Remove'}
                          </button>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-white/15 px-3 py-6 text-center text-white/40 text-sm">
                    {isVi ? 'Chưa có ảnh' : 'No images yet'}
                  </div>
                )}

                <input
                  ref={productImageFileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => void uploadProductImage(e)}
                  disabled={!canMediaCreate || !can('products', editingId == null ? 'create' : 'update') || imageUploading}
                />

                <div className="rounded-xl border border-white/10 bg-white/5 p-3 space-y-2">
                  <select
                    className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm disabled:opacity-50"
                    value={imageAddMode}
                    onChange={(e) => setImageAddMode(e.target.value as ProductImageSourceMode)}
                    disabled={!can('products', editingId == null ? 'create' : 'update')}
                    aria-label={isVi ? 'Cách thêm ảnh' : 'How to add an image'}
                  >
                    <option value="upload" className="bg-slate-900 text-white" disabled={!canMediaCreate}>
                      {isVi ? 'Tải lên' : 'Upload'}
                    </option>
                    <option value="library" className="bg-slate-900 text-white" disabled={!canMediaRead}>
                      {isVi ? 'Chọn từ thư viện' : 'Choose from media library'}
                    </option>
                    <option value="url" className="bg-slate-900 text-white">
                      {isVi ? 'URL ảnh' : 'Image URL'}
                    </option>
                  </select>

                  {imageAddMode === 'upload' ? (
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => productImageFileRef.current?.click()}
                        disabled={!canMediaCreate || !can('products', editingId == null ? 'create' : 'update') || imageUploading}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm hover:bg-white/15 disabled:opacity-50"
                      >
                        {imageUploading ? (isVi ? 'Đang tải…' : 'Uploading…') : isVi ? 'Chọn tệp…' : 'Choose file…'}
                      </button>
                      <p className="text-white/45 text-xs">
                        {!canMediaCreate
                          ? isVi
                            ? 'Cần quyền Media → Tạo.'
                            : 'Requires Media → Create permission.'
                          : isVi
                            ? 'JPEG, PNG, WebP hoặc GIF.'
                            : 'JPEG, PNG, WebP, or GIF.'}
                      </p>
                    </div>
                  ) : null}

                  {imageAddMode === 'library' ? (
                    <div className="space-y-1">
                      <button
                        type="button"
                        onClick={() => void openProductImageLibrary()}
                        disabled={!canMediaRead || !can('products', editingId == null ? 'create' : 'update')}
                        className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm hover:bg-white/15 disabled:opacity-50"
                      >
                        {isVi ? 'Duyệt thư viện…' : 'Browse library…'}
                      </button>
                      <p className="text-white/45 text-xs">
                        {!canMediaRead
                          ? isVi
                            ? 'Cần quyền Media → Xem.'
                            : 'Requires Media → View permission.'
                          : isVi
                            ? 'Chọn ảnh đã tải lên trước đó.'
                            : 'Pick an image already in your library.'}
                      </p>
                    </div>
                  ) : null}

                  {imageAddMode === 'url' ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        className="flex-1 min-w-0 px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white text-sm placeholder:text-white/35"
                        value={imageDraftUrl}
                        onChange={(e) => setImageDraftUrl(e.target.value)}
                        placeholder="https://…"
                        disabled={!can('products', editingId == null ? 'create' : 'update')}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            addProductImageFromUrlField();
                          }
                        }}
                        aria-label={isVi ? 'URL ảnh' : 'Image URL'}
                      />
                      <button
                        type="button"
                        onClick={addProductImageFromUrlField}
                        disabled={!can('products', editingId == null ? 'create' : 'update')}
                        className="shrink-0 px-4 py-2 rounded-lg bg-white/15 border border-white/20 text-white text-sm hover:bg-white/25 disabled:opacity-50"
                      >
                        {isVi ? 'Thêm' : 'Add'}
                      </button>
                    </div>
                  ) : null}
                </div>

                <details className="text-xs text-white/50">
                  <summary className="cursor-pointer text-white/60 hover:text-white/80">
                    {isVi ? 'Sửa dạng danh sách URL (nâng cao)' : 'Edit as raw URL list (advanced)'}
                  </summary>
                  <textarea
                    className="mt-2 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-xs min-h-[72px]"
                    value={form.imageUrlsText}
                    onChange={(e) => setForm((f) => ({ ...f, imageUrlsText: e.target.value }))}
                    disabled={!can('products', editingId == null ? 'create' : 'update')}
                    spellCheck={false}
                  />
                </details>
              </div>
              <label className="block sm:col-span-2">
                <span className="text-white/70 text-sm">Video URLs (one per line)</span>
                <textarea
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white font-mono text-xs min-h-[56px]"
                  value={form.videoUrlsText}
                  onChange={(e) => setForm((f) => ({ ...f, videoUrlsText: e.target.value }))}
                />
              </label>
              <label className="block">
                <span className="text-white/70 text-sm">Demo link</span>
                <input
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  value={form.demoLink}
                  onChange={(e) => setForm((f) => ({ ...f, demoLink: e.target.value }))}
                />
              </label>
              <label className="block">
                <span className="text-white/70 text-sm">Landing page</span>
                <input
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  value={form.landingPageLink}
                  onChange={(e) => setForm((f) => ({ ...f, landingPageLink: e.target.value }))}
                />
              </label>
              <label className="block sm:col-span-2">
                <span className="text-white/70 text-sm">Embed demo URL</span>
                <input
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  value={form.embedDemoUrl}
                  onChange={(e) => setForm((f) => ({ ...f, embedDemoUrl: e.target.value }))}
                />
              </label>
              <div className="sm:col-span-2">
                <span className="text-white/70 text-sm block mb-1">Technologies</span>
                <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-2 rounded-lg bg-white/5 border border-white/10">
                  {meta.technologies.map((t) => (
                    <label key={t.id} className="flex items-center gap-1 text-white/85 text-xs">
                      <input
                        type="checkbox"
                        checked={form.technologyIds.includes(t.id)}
                        onChange={() => toggleTech(t.id)}
                        className="accent-cyan-400"
                      />
                      {t.techName}
                    </label>
                  ))}
                </div>
              </div>
              <label className="block">
                <span className="text-white/70 text-sm">Status</span>
                <input
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value }))}
                />
              </label>
              <label className="flex items-center gap-2 text-white/90 mt-6">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) => setForm((f) => ({ ...f, isFeatured: e.target.checked }))}
                />
                Featured
              </label>
              <label className="block sm:col-span-2">
                <span className="text-white/70 text-sm">SEO title</span>
                <input
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  value={form.seoTitle}
                  onChange={(e) => setForm((f) => ({ ...f, seoTitle: e.target.value }))}
                />
              </label>
              <div className="block sm:col-span-2 min-w-0">
                <span className="text-white/70 text-sm">
                  {isVi ? 'Mô tả SEO (định dạng)' : 'SEO description (rich text)'}
                </span>
                <div className="mt-1 w-full min-w-0 rounded-lg border border-white/20 overflow-hidden bg-[#1e1e1e] [&_.tox-tinymce]:max-w-none">
                  <AdminTinyMceEditor
                    id="product-seo-description"
                    value={form.seoDescription}
                    onChange={(html) => setForm((f) => ({ ...f, seoDescription: html }))}
                    disabled={!can('products', editingId == null ? 'create' : 'update')}
                  />
                </div>
              </div>
              <label className="block sm:col-span-2">
                <span className="text-white/70 text-sm">SEO keywords</span>
                <input
                  className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                  value={form.seoKeywords}
                  onChange={(e) => setForm((f) => ({ ...f, seoKeywords: e.target.value }))}
                />
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="btn-admin-secondary" onClick={() => void modal.closeAnimated()} disabled={saving}>
                {isVi ? 'Hủy' : 'Cancel'}
              </button>
              <button type="button" className="btn-admin-primary" onClick={() => void submit()} disabled={saving}>
                {saving ? (isVi ? 'Đang lưu…' : 'Saving…') : isVi ? 'Lưu' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* ==================== PRODUCT IMAGE LIBRARY PICKER ==================== */}
      {imagePickerOpen ? (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-labelledby="product-image-picker-title">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setImagePickerOpen(false)} aria-hidden />
          <div className="relative glass rounded-2xl border border-white/15 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-xl">
            <div className="flex items-center justify-between gap-2 p-4 border-b border-white/10">
              <h3 id="product-image-picker-title" className="text-lg font-semibold text-white">
                {isVi ? 'Chọn ảnh từ thư viện' : 'Choose image from library'}
              </h3>
              <button
                type="button"
                className="text-white/70 hover:text-white px-2 py-1 rounded-lg hover:bg-white/10"
                onClick={() => setImagePickerOpen(false)}
              >
                {isVi ? 'Đóng' : 'Close'}
              </button>
            </div>
            <div className="overflow-y-auto p-4 min-h-[120px]">
              {imagePickerLoading ? (
                <p className="text-white/60 text-sm">{isVi ? 'Đang tải…' : 'Loading…'}</p>
              ) : imagePickerList.length === 0 ? (
                <p className="text-white/50 text-sm">{isVi ? 'Thư viện chưa có ảnh.' : 'No images in the library yet.'}</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {imagePickerList.map((row) => (
                    <button
                      key={row.id}
                      type="button"
                      onClick={() => pickProductImageFromLibrary(row)}
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

      {/* ==================== DELETE PRODUCT CONFIRMATION ==================== */}
      <AdminConfirmDialog
        open={deleteTarget != null}
        origin={deleteDialogOrigin}
        title={isVi ? 'Xóa sản phẩm' : 'Delete product'}
        message={deleteTarget ? (isVi ? `Xóa sản phẩm “${deleteTarget.productName}”?` : `Delete product “${deleteTarget.productName}”?`) : ''}
        confirmText={isVi ? 'Xóa' : 'Delete'}
        confirming={deleting}
        onCancel={() => (!deleting ? (setDeleteTarget(null), setDeleteDialogOrigin(null)) : undefined)}
        onConfirm={() => (deleteTarget ? void remove(deleteTarget) : undefined)}
      />
      <AdminConfirmDialog
        open={bulkDeleteOpen}
        origin={null}
        title={isVi ? 'Xóa nhiều sản phẩm' : 'Delete multiple products'}
        message={
          isVi
            ? `Xóa ${selectedIds.size} sản phẩm đã chọn? Hành động này không thể hoàn tác.`
            : `Delete ${selectedIds.size} selected products? This cannot be undone.`
        }
        confirmText={isVi ? 'Xóa' : 'Delete'}
        confirming={deleting}
        onCancel={() => (!deleting ? setBulkDeleteOpen(false) : undefined)}
        onConfirm={() => void removeMany(Array.from(selectedIds))}
      />
    </div>
  );
}
