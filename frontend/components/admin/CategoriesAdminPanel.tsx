'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import AdminEditIcon from '@/components/admin/AdminEditIcon';
import AdminTrashIcon from '@/components/admin/AdminTrashIcon';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import {
  getModalOriginFromElement,
  type ModalOriginPoint,
  useAnimatedOriginModal,
} from '@/components/admin/useAnimatedOriginModal';
import { useLocale } from '@/components/providers/LocaleProvider';
import { useToast } from '@/components/providers/ToastProvider';
import { apiPath } from '@/lib/apiRoutes';

type CategoryEntity = 'products' | 'services' | 'news' | 'medias' | 'banners';
type FeaturePermission = 'products' | 'services' | 'news' | 'media' | 'banners';

type CategoryRow = {
  id: number;
  name: string;
  nameVi?: string | null;
  slug: string;
  sortOrder: number;
  isActive: boolean;
};

const ENTITY_OPTIONS: Array<{ id: CategoryEntity; feature: FeaturePermission; labelEn: string; labelVi: string }> = [
  { id: 'products', feature: 'products', labelEn: 'Products', labelVi: 'Sản phẩm' },
  { id: 'services', feature: 'services', labelEn: 'Services', labelVi: 'Dịch vụ' },
  { id: 'news', feature: 'news', labelEn: 'News', labelVi: 'Tin tức' },
  { id: 'medias', feature: 'media', labelEn: 'Medias', labelVi: 'Thư viện' },
  { id: 'banners', feature: 'banners', labelEn: 'Banners', labelVi: 'Banner' },
];

export default function CategoriesAdminPanel() {
  const { can } = useAdminPermissions();
  const { locale } = useLocale();
  const toast = useToast();
  const isVi = locale === 'vi-VN';

  const allowedOptions = useMemo(() => ENTITY_OPTIONS.filter((x) => can(x.feature, 'read')), [can]);
  const [entity, setEntity] = useState<CategoryEntity>('products');
  const activeFeature = ENTITY_OPTIONS.find((x) => x.id === entity)?.feature ?? 'products';

  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CategoryRow | null>(null);
  const [deleteDialogOrigin, setDeleteDialogOrigin] = useState<ModalOriginPoint | null>(null);
  const [form, setForm] = useState({ name: '', nameVi: '', slug: '', sortOrder: 0, isActive: true });
  const editModal = useAnimatedOriginModal(600);

  useEffect(() => {
    if (!allowedOptions.length) return;
    if (!allowedOptions.some((x) => x.id === entity)) setEntity(allowedOptions[0].id);
  }, [allowedOptions, entity]);

  const refresh = useCallback(async () => {
    if (!can(activeFeature, 'read')) {
      setRows([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${apiPath(`admin/categories/${entity}`)}?locale=${encodeURIComponent(locale)}`, {
        credentials: 'include',
      });
      if (!res.ok) throw new Error('Load failed');
      const list = (await res.json()) as CategoryRow[];
      setRows(Array.isArray(list) ? list : []);
    } catch {
      setRows([]);
      toast.error(isVi ? 'Không tải được danh mục' : 'Failed to load categories');
    } finally {
      setLoading(false);
    }
  }, [activeFeature, can, entity, isVi, locale, toast]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const resetForm = () => {
    setEditingId(null);
    setForm({ name: '', nameVi: '', slug: '', sortOrder: 0, isActive: true });
  };

  const submit = async () => {
    if (!can(activeFeature, editingId == null ? 'create' : 'update')) return;
    const payload = {
      name: form.name.trim(),
      nameVi: form.nameVi.trim() || undefined,
      slug: form.slug.trim() || undefined,
      sortOrder: Number(form.sortOrder),
      isActive: form.isActive,
    };
    if (!payload.name) {
      toast.error(isVi ? 'Tên danh mục là bắt buộc' : 'Category name is required');
      return;
    }
    setSaving(true);
    try {
      const isEdit = editingId != null;
      const res = await fetch(apiPath(isEdit ? `admin/categories/${entity}/${editingId}` : `admin/categories/${entity}`), {
        method: isEdit ? 'PUT' : 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || 'Save failed');
      toast.success(isVi ? 'Đã lưu danh mục' : 'Category saved');
      await editModal.closeAnimated();
      resetForm();
      await refresh();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const startCreate = (triggerEl?: HTMLElement | null) => {
    resetForm();
    editModal.openFromElement(triggerEl);
  };

  const startEdit = (row: CategoryRow, triggerEl?: HTMLElement | null) => {
    setEditingId(row.id);
    setForm({
      name: row.name,
      nameVi: row.nameVi ?? '',
      slug: row.slug,
      sortOrder: row.sortOrder,
      isActive: row.isActive,
    });
    editModal.openFromElement(triggerEl);
  };

  const remove = async () => {
    if (!deleteTarget || !can(activeFeature, 'delete')) return;
    setDeleting(true);
    try {
      const res = await fetch(apiPath(`admin/categories/${entity}/${deleteTarget.id}`), {
        method: 'DELETE',
        credentials: 'include',
      });
      const body = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(body.error || 'Delete failed');
      toast.success(isVi ? 'Đã xóa' : 'Deleted');
      if (editingId === deleteTarget.id) resetForm();
      setDeleteTarget(null);
      setDeleteDialogOrigin(null);
      await refresh();
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  const filteredRows = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => {
      const viName = String(row.nameVi ?? '').toLowerCase();
      return (
        row.name.toLowerCase().includes(q) ||
        viName.includes(q) ||
        row.slug.toLowerCase().includes(q)
      );
    });
  }, [rows, searchQuery]);

  if (!allowedOptions.length) {
    return <div className="glass p-6 rounded-2xl text-white/80">{isVi ? 'Không có quyền truy cập.' : 'No permission.'}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-white">{isVi ? 'Quản lý danh mục' : 'Category Management'}</h2>
          <p className="text-white/60 text-sm">
            {isVi ? 'CRUD danh mục cho Products, Services, News, Medias và Banners.' : 'Manage category CRUD for products, services, news, medias, and banners.'}
          </p>
        </div>
        {can(activeFeature, 'create') ? (
          <button type="button" className="btn-admin-primary w-full md:w-auto" onClick={(e) => startCreate(e.currentTarget)}>
            {isVi ? 'Thêm danh mục' : 'Add category'}
          </button>
        ) : null}
      </div>

      <div className="glass w-full p-4 rounded-2xl border border-white/10 bg-white/5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <label className="block">
            <span className="text-white/70 text-sm block mb-2">{isVi ? 'Tìm kiếm' : 'Search'}</span>
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isVi ? 'Tên EN, tên VI, slug…' : 'Name EN, name VI, slug...'}
              className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
            />
          </label>
          <label className="block">
            <span className="text-white/70 text-sm block mb-2">{isVi ? 'Loại nội dung' : 'Content type'}</span>
            <select
              value={entity}
              onChange={(e) => {
                setEntity(e.target.value as CategoryEntity);
                resetForm();
              }}
              className="w-full px-3 py-2 bg-white/5 border border-white/15 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              {allowedOptions.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {isVi ? opt.labelVi : opt.labelEn}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/10">
        {loading ? <p className="p-4 text-white/70">{isVi ? 'Đang tải…' : 'Loading…'}</p> : null}
        <table className="w-full text-sm text-white/90 min-w-[760px]">
          <thead className="bg-white/5 text-white/70">
            <tr>
              <th className="px-3 py-2 text-left">{isVi ? 'Tên (EN)' : 'Name (EN)'}</th>
              <th className="px-3 py-2 text-left">{isVi ? 'Tên (VI)' : 'Name (VI)'}</th>
              <th className="px-3 py-2 text-left">Slug</th>
              <th className="px-3 py-2 text-left">{isVi ? 'Thứ tự' : 'Order'}</th>
              <th className="px-3 py-2 text-left">{isVi ? 'Trạng thái' : 'Status'}</th>
              <th className="px-3 py-2 text-right">{isVi ? 'Thao tác' : 'Actions'}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.id} className="border-t border-white/10">
                <td className="px-3 py-2">{row.name}</td>
                <td className="px-3 py-2">{row.nameVi || '—'}</td>
                <td className="px-3 py-2 font-mono text-xs">{row.slug}</td>
                <td className="px-3 py-2">{row.sortOrder}</td>
                <td className="px-3 py-2">{row.isActive ? (isVi ? 'Bật' : 'Active') : isVi ? 'Tắt' : 'Inactive'}</td>
                <td className="px-3 py-2 text-right space-x-1">
                  {can(activeFeature, 'update') ? (
                    <button
                      type="button"
                      className="btn-admin-icon"
                      aria-label={isVi ? 'Sửa danh mục' : 'Edit category'}
                      title={isVi ? 'Sửa' : 'Edit'}
                      onClick={(e) => startEdit(row, e.currentTarget)}
                    >
                      <AdminEditIcon />
                    </button>
                  ) : null}
                  {can(activeFeature, 'delete') ? (
                    <button
                      type="button"
                      className="btn-admin-icon-danger"
                      aria-label={isVi ? 'Xóa danh mục' : 'Delete category'}
                      title={isVi ? 'Xóa' : 'Delete'}
                      onClick={(e) => {
                        setDeleteDialogOrigin(getModalOriginFromElement(e.currentTarget));
                        setDeleteTarget(row);
                      }}
                    >
                      <AdminTrashIcon />
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!loading && rows.length === 0 ? (
          <p className="p-4 text-white/60">{isVi ? 'Chưa có danh mục.' : 'No categories yet.'}</p>
        ) : null}
        {!loading && rows.length > 0 && filteredRows.length === 0 ? (
          <p className="p-4 text-white/60">{isVi ? 'Không có kết quả khớp tìm kiếm.' : 'No categories match your search.'}</p>
        ) : null}
      </div>
      <AdminConfirmDialog
        open={deleteTarget != null}
        origin={deleteDialogOrigin}
        title={isVi ? 'Xóa danh mục' : 'Delete category'}
        message={
          deleteTarget ? (isVi ? `Xóa danh mục "${deleteTarget.name}"?` : `Delete category "${deleteTarget.name}"?`) : ''
        }
        confirmText={isVi ? 'Xóa' : 'Delete'}
        confirming={deleting}
        onCancel={() => (!deleting ? (setDeleteTarget(null), setDeleteDialogOrigin(null)) : undefined)}
        onConfirm={() => void remove()}
      />

      {editModal.open ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-3 sm:px-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => void editModal.closeAnimated()} />
          <div
            className="relative w-full max-w-2xl glass rounded-2xl border border-white/10 overflow-hidden"
            style={{
              transformOrigin: `${editModal.origin.x}px ${editModal.origin.y}px`,
              animation: editModal.closing
                ? `modal-zoom-out ${editModal.durationMs}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
                : `modal-zoom-in ${editModal.durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >
            <div className="px-5 py-4 border-b border-white/10 bg-white/5">
              <h3 className="text-xl font-bold text-white">
                {editingId == null ? (isVi ? 'Thêm danh mục' : 'Add category') : isVi ? 'Sửa danh mục' : 'Edit category'}
              </h3>
            </div>
            <div className="px-5 py-4 space-y-3">
              <section className="space-y-3 rounded-xl border border-white/10 p-3 bg-white/[0.03]">
                <h4 className="text-white text-sm font-semibold">{isVi ? 'Tiêu đề danh mục' : 'Category titles'}</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <label className="block">
                    <span className="text-white/70 text-sm">{isVi ? 'Tên (EN)' : 'Name (EN)'}</span>
                    <input
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    />
                  </label>
                  <label className="block">
                    <span className="text-white/70 text-sm">{isVi ? 'Tên (VI)' : 'Name (VI)'}</span>
                    <input
                      className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                      value={form.nameVi}
                      onChange={(e) => setForm((f) => ({ ...f, nameVi: e.target.value }))}
                    />
                  </label>
                </div>
              </section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-white/70 text-sm">Slug ({isVi ? 'để trống để tự sinh' : 'optional'})</span>
                  <input
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                    value={form.slug}
                    onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value }))}
                  />
                </label>
                <label className="block">
                  <span className="text-white/70 text-sm">{isVi ? 'Thứ tự' : 'Sort order'}</span>
                  <input
                    type="number"
                    className="mt-1 w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                    value={form.sortOrder}
                    onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) || 0 }))}
                  />
                </label>
                <label className="flex items-center gap-2 text-white/85 pt-7">
                  <input
                    type="checkbox"
                    checked={form.isActive}
                    onChange={(e) => setForm((f) => ({ ...f, isActive: e.target.checked }))}
                    disabled={entity === 'products'}
                  />
                  {isVi ? 'Kích hoạt' : 'Active'}
                </label>
              </div>
            </div>
            <div className="flex justify-end gap-2 px-5 py-3 border-t border-white/10 bg-[#14141c]/95 backdrop-blur">
              <button
                type="button"
                className="btn-admin-secondary"
                onClick={() => void editModal.closeAnimated()}
                disabled={saving}
              >
                {isVi ? 'Hủy' : 'Cancel'}
              </button>
              <button
                type="button"
                className="btn-admin-primary"
                onClick={() => void submit()}
                disabled={saving || !can(activeFeature, editingId == null ? 'create' : 'update')}
              >
                {saving ? (isVi ? 'Đang lưu…' : 'Saving…') : isVi ? 'Lưu' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
