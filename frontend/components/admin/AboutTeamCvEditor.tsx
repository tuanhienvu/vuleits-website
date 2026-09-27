'use client';

import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog';
import { useAdminPermissions } from '@/components/admin/AdminPermissionContext';
import { useToast } from '@/components/providers/ToastProvider';
import { apiPath } from '@/lib/apiRoutes';

type CvItem = Record<string, string | number | boolean | null>;

type CvForm = {
  title: string;
  titleVi: string;
  profileSummary: string;
  profileSummaryVi: string;
  email: string;
  phone: string;
  location: string;
  locationVi: string;
  avatarUrl: string;
  cvPdfUrl: string;
  isPublished: boolean;
  skills: CvItem[];
  experiences: CvItem[];
  educations: CvItem[];
  certifications: CvItem[];
  languages: CvItem[];
  socialLinks: CvItem[];
};

type CollectionKey = 'skills' | 'experiences' | 'educations' | 'certifications' | 'languages' | 'socialLinks';

type Field = {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'date' | 'url' | 'checkbox';
  wide?: boolean;
};

const emptyForm = (): CvForm => ({
  title: '',
  titleVi: '',
  profileSummary: '',
  profileSummaryVi: '',
  email: '',
  phone: '',
  location: '',
  locationVi: '',
  avatarUrl: '',
  cvPdfUrl: '',
  isPublished: true,
  skills: [],
  experiences: [],
  educations: [],
  certifications: [],
  languages: [],
  socialLinks: [],
});

const dateValue = (value: unknown) => (typeof value === 'string' && value ? value.slice(0, 10) : '');

const normalizeCv = (raw: unknown): CvForm => {
  if (!raw || typeof raw !== 'object') return emptyForm();
  const cv = raw as Record<string, unknown>;
  const text = (key: string) => (typeof cv[key] === 'string' ? (cv[key] as string) : '');
  const collection = (key: CollectionKey) =>
    Array.isArray(cv[key])
      ? (cv[key] as CvItem[]).map((item, index) => {
          const normalized: CvItem = { ...item, displayOrder: index };
          for (const field of ['startDate', 'endDate', 'issuedAt']) {
            if (field in normalized) normalized[field] = dateValue(normalized[field]);
          }
          return normalized;
        })
      : [];
  return {
    title: text('title'),
    titleVi: text('titleVi'),
    profileSummary: text('profileSummary'),
    profileSummaryVi: text('profileSummaryVi'),
    email: text('email'),
    phone: text('phone'),
    location: text('location'),
    locationVi: text('locationVi'),
    avatarUrl: text('avatarUrl'),
    cvPdfUrl: text('cvPdfUrl'),
    isPublished: cv.isPublished !== false,
    skills: collection('skills'),
    experiences: collection('experiences'),
    educations: collection('educations'),
    certifications: collection('certifications'),
    languages: collection('languages'),
    socialLinks: collection('socialLinks'),
  };
};

const sectionDefinitions: Array<{
  key: CollectionKey;
  title: string;
  titleVi: string;
  fields: Field[];
  create: () => CvItem;
}> = [
  {
    key: 'skills',
    title: 'Skills',
    titleVi: 'Kỹ năng',
    fields: [
      { key: 'name', label: 'Name (EN)' },
      { key: 'nameVi', label: 'Name (VI)' },
      { key: 'description', label: 'Description (EN)', type: 'textarea', wide: true },
      { key: 'descriptionVi', label: 'Description (VI)', type: 'textarea', wide: true },
    ],
    create: () => ({ name: '', nameVi: '', description: '', descriptionVi: '', displayOrder: 0 }),
  },
  {
    key: 'experiences',
    title: 'Experience',
    titleVi: 'Kinh nghiệm',
    fields: [
      { key: 'company', label: 'Company (EN)' },
      { key: 'companyVi', label: 'Company (VI)' },
      { key: 'position', label: 'Position (EN)' },
      { key: 'positionVi', label: 'Position (VI)' },
      { key: 'startDate', label: 'Start date', type: 'date' },
      { key: 'endDate', label: 'End date', type: 'date' },
      { key: 'isCurrent', label: 'Current position', type: 'checkbox' },
      { key: 'description', label: 'Description (EN)', type: 'textarea', wide: true },
      { key: 'descriptionVi', label: 'Description (VI)', type: 'textarea', wide: true },
    ],
    create: () => ({
      company: '', companyVi: '', position: '', positionVi: '', startDate: '', endDate: '',
      isCurrent: false, description: '', descriptionVi: '', displayOrder: 0,
    }),
  },
  {
    key: 'educations',
    title: 'Education',
    titleVi: 'Học vấn',
    fields: [
      { key: 'school', label: 'School (EN)' },
      { key: 'schoolVi', label: 'School (VI)' },
      { key: 'degree', label: 'Degree (EN)' },
      { key: 'degreeVi', label: 'Degree (VI)' },
      { key: 'fieldOfStudy', label: 'Field of study (EN)' },
      { key: 'fieldOfStudyVi', label: 'Field of study (VI)' },
      { key: 'gpa', label: 'GPA' },
      { key: 'startDate', label: 'Start date', type: 'date' },
      { key: 'endDate', label: 'End date', type: 'date' },
    ],
    create: () => ({
      school: '', schoolVi: '', degree: '', degreeVi: '', fieldOfStudy: '', fieldOfStudyVi: '',
      gpa: '', startDate: '', endDate: '', displayOrder: 0,
    }),
  },
  {
    key: 'certifications',
    title: 'Certifications',
    titleVi: 'Chứng chỉ',
    fields: [
      { key: 'name', label: 'Name (EN)' },
      { key: 'nameVi', label: 'Name (VI)' },
      { key: 'issuer', label: 'Issuer (EN)' },
      { key: 'issuerVi', label: 'Issuer (VI)' },
      { key: 'issuedAt', label: 'Issued date', type: 'date' },
      { key: 'credentialUrl', label: 'Credential URL', type: 'url', wide: true },
    ],
    create: () => ({ name: '', nameVi: '', issuer: '', issuerVi: '', issuedAt: '', credentialUrl: '', displayOrder: 0 }),
  },
  {
    key: 'languages',
    title: 'Languages',
    titleVi: 'Ngôn ngữ',
    fields: [
      { key: 'name', label: 'Name (EN)' },
      { key: 'nameVi', label: 'Name (VI)' },
      { key: 'proficiency', label: 'Proficiency' },
    ],
    create: () => ({ name: '', nameVi: '', proficiency: '', displayOrder: 0 }),
  },
  {
    key: 'socialLinks',
    title: 'Social links',
    titleVi: 'Liên kết mạng xã hội',
    fields: [
      { key: 'label', label: 'Label (EN)' },
      { key: 'labelVi', label: 'Label (VI)' },
      { key: 'url', label: 'URL', type: 'url', wide: true },
    ],
    create: () => ({ label: '', labelVi: '', url: '', displayOrder: 0 }),
  },
];

function TextField({
  label,
  value,
  onChange,
  disabled,
  type = 'text',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  type?: 'text' | 'email' | 'tel' | 'url';
}) {
  return (
    <label className="block min-w-0">
      <span className="text-sm text-white/70">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="mt-1 w-full min-w-0 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white disabled:opacity-60"
      />
    </label>
  );
}

export default function AboutTeamCvEditor({
  memberId,
  slug,
  isVi,
  editable = false,
}: {
  memberId: number;
  slug: string;
  isVi: boolean;
  /** Owner of this profile can edit their CV without the team-admin update permission. */
  editable?: boolean;
}) {
  const { can } = useAdminPermissions();
  const toast = useToast();
  const [form, setForm] = useState<CvForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<'avatarUrl' | 'cvPdfUrl' | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const canUpdate = editable || can('aboutTeam', 'update');
  const canDelete = can('aboutTeam', 'delete');
  const canUpload = canUpdate && can('media', 'create');

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(apiPath(`admin/about-team/${memberId}/cv`), { credentials: 'include' });
      if (!response.ok) throw new Error(isVi ? 'Không tải được CV' : 'Failed to load CV');
      const data = (await response.json()) as { cv?: unknown };
      setForm(normalizeCv(data.cv));
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load CV');
    } finally {
      setLoading(false);
    }
  }, [isVi, memberId, toast]);

  useEffect(() => {
    void load();
  }, [load]);

  const updateCollection = (key: CollectionKey, updater: (items: CvItem[]) => CvItem[]) => {
    setForm((current) => ({
      ...current,
      [key]: updater(current[key]).map((item, index) => ({ ...item, displayOrder: index })),
    }));
  };

  const upload = async (field: 'avatarUrl' | 'cvPdfUrl', event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !canUpload) return;
    setUploading(field);
    try {
      const body = new FormData();
      body.append('file', file);
      body.append('folder', 'team-cv');
      const response = await fetch(apiPath('admin/media'), { method: 'POST', credentials: 'include', body });
      const data = (await response.json().catch(() => ({}))) as { media?: { url?: string }; error?: string };
      if (!response.ok || !data.media?.url) throw new Error(data.error || 'Upload failed');
      setForm((current) => ({ ...current, [field]: data.media?.url ?? '' }));
      toast.success(isVi ? 'Tải tệp lên thành công' : 'File uploaded');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploading(null);
      event.target.value = '';
    }
  };

  const save = async () => {
    if (!canUpdate) return;
    if (!form.title.trim() || !form.profileSummary.trim()) {
      toast.error(isVi ? 'Tiêu đề và tóm tắt (EN) là bắt buộc.' : 'English title and summary are required.');
      return;
    }
    setSaving(true);
    try {
      const response = await fetch(apiPath(`admin/about-team/${memberId}/cv`), {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = (await response.json().catch(() => ({}))) as { cv?: unknown; error?: string };
      if (!response.ok) throw new Error(data.error || 'Save failed');
      setForm(normalizeCv(data.cv));
      toast.success(isVi ? 'Đã lưu CV' : 'CV saved');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!canDelete) return;
    setDeleting(true);
    try {
      const response = await fetch(apiPath(`admin/about-team/${memberId}/cv`), {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Delete failed');
      setForm(emptyForm());
      setDeleteOpen(false);
      toast.success(isVi ? 'Đã xóa CV' : 'CV deleted');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Delete failed');
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return <p className="py-8 text-center text-white/70">{isVi ? 'Đang tải CV…' : 'Loading CV…'}</p>;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3 sm:grid-cols-2">
        <TextField label="Title (EN)" value={form.title} onChange={(title) => setForm((f) => ({ ...f, title }))} disabled={!canUpdate} />
        <TextField label="Title (VI)" value={form.titleVi} onChange={(titleVi) => setForm((f) => ({ ...f, titleVi }))} disabled={!canUpdate} />
        <label className="block min-w-0">
          <span className="text-sm text-white/70">Summary (EN)</span>
          <textarea value={form.profileSummary} onChange={(e) => setForm((f) => ({ ...f, profileSummary: e.target.value }))} disabled={!canUpdate} className="mt-1 min-h-32 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white disabled:opacity-60" />
        </label>
        <label className="block min-w-0">
          <span className="text-sm text-white/70">Summary (VI)</span>
          <textarea value={form.profileSummaryVi} onChange={(e) => setForm((f) => ({ ...f, profileSummaryVi: e.target.value }))} disabled={!canUpdate} className="mt-1 min-h-32 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white disabled:opacity-60" />
        </label>
        <TextField label="Email" type="email" value={form.email} onChange={(email) => setForm((f) => ({ ...f, email }))} disabled={!canUpdate} />
        <TextField label={isVi ? 'Điện thoại' : 'Phone'} type="tel" value={form.phone} onChange={(phone) => setForm((f) => ({ ...f, phone }))} disabled={!canUpdate} />
        <TextField label="Location (EN)" value={form.location} onChange={(location) => setForm((f) => ({ ...f, location }))} disabled={!canUpdate} />
        <TextField label="Location (VI)" value={form.locationVi} onChange={(locationVi) => setForm((f) => ({ ...f, locationVi }))} disabled={!canUpdate} />
        {(['avatarUrl', 'cvPdfUrl'] as const).map((field) => (
          <div key={field} className="min-w-0">
            <TextField
              label={field === 'avatarUrl' ? 'Avatar URL' : 'CV PDF URL'}
              type="url"
              value={form[field]}
              onChange={(value) => setForm((f) => ({ ...f, [field]: value }))}
              disabled={!canUpdate}
            />
            {canUpload ? (
              <label className="mt-2 inline-flex cursor-pointer rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs text-white hover:bg-white/15">
                {uploading === field ? (isVi ? 'Đang tải…' : 'Uploading…') : isVi ? 'Tải tệp lên' : 'Upload file'}
                <input
                  type="file"
                  accept={field === 'avatarUrl' ? 'image/*' : 'application/pdf,.pdf'}
                  className="hidden"
                  disabled={uploading != null}
                  onChange={(event) => void upload(field, event)}
                />
              </label>
            ) : null}
          </div>
        ))}
        <label className="flex items-center gap-2 text-white/90 sm:col-span-2">
          <input type="checkbox" checked={form.isPublished} onChange={(e) => setForm((f) => ({ ...f, isPublished: e.target.checked }))} disabled={!canUpdate} />
          {isVi ? 'Xuất bản CV' : 'Published'}
        </label>
      </div>

      {sectionDefinitions.map((section) => (
        <section key={section.key} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h4 className="font-semibold text-white">{isVi ? section.titleVi : section.title}</h4>
            {canUpdate ? (
              <button type="button" className="btn-admin-secondary px-3 py-1.5 text-sm" onClick={() => updateCollection(section.key, (items) => [...items, section.create()])}>
                + {isVi ? 'Thêm' : 'Add'}
              </button>
            ) : null}
          </div>
          <div className="space-y-3">
            {form[section.key].map((item, index) => (
              <div key={`${section.key}-${index}`} className="rounded-lg border border-white/10 bg-black/10 p-3">
                <div className="mb-3 flex justify-end gap-1">
                  <button type="button" className="btn-admin-secondary px-2 py-1 text-xs" disabled={!canUpdate || index === 0} onClick={() => updateCollection(section.key, (items) => { const next = [...items]; [next[index - 1], next[index]] = [next[index], next[index - 1]]; return next; })}>↑</button>
                  <button type="button" className="btn-admin-secondary px-2 py-1 text-xs" disabled={!canUpdate || index === form[section.key].length - 1} onClick={() => updateCollection(section.key, (items) => { const next = [...items]; [next[index], next[index + 1]] = [next[index + 1], next[index]]; return next; })}>↓</button>
                  <button type="button" className="btn-admin-danger px-2 py-1 text-xs" disabled={!canUpdate} onClick={() => updateCollection(section.key, (items) => items.filter((_, itemIndex) => itemIndex !== index))}>{isVi ? 'Xóa' : 'Delete'}</button>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {section.fields.map((field) => {
                    const value = item[field.key];
                    if (field.type === 'checkbox') {
                      return (
                        <label key={field.key} className="flex items-center gap-2 text-sm text-white/80">
                          <input type="checkbox" checked={Boolean(value)} disabled={!canUpdate} onChange={(e) => updateCollection(section.key, (items) => items.map((entry, itemIndex) => itemIndex === index ? { ...entry, [field.key]: e.target.checked } : entry))} />
                          {field.label}
                        </label>
                      );
                    }
                    const className = `block min-w-0 ${field.wide ? 'sm:col-span-2' : ''}`;
                    return (
                      <label key={field.key} className={className}>
                        <span className="text-xs text-white/70">{field.label}</span>
                        {field.type === 'textarea' ? (
                          <textarea value={String(value ?? '')} disabled={!canUpdate} onChange={(e) => updateCollection(section.key, (items) => items.map((entry, itemIndex) => itemIndex === index ? { ...entry, [field.key]: e.target.value } : entry))} className="mt-1 min-h-24 w-full rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white disabled:opacity-60" />
                        ) : (
                          <input type={field.type ?? 'text'} value={String(value ?? '')} disabled={!canUpdate || (field.key === 'endDate' && Boolean(item.isCurrent))} onChange={(e) => updateCollection(section.key, (items) => items.map((entry, itemIndex) => itemIndex === index ? { ...entry, [field.key]: e.target.value } : entry))} className="mt-1 w-full min-w-0 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-white disabled:opacity-60" />
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>
            ))}
            {form[section.key].length === 0 ? <p className="text-sm text-white/50">{isVi ? 'Chưa có mục nào.' : 'No items yet.'}</p> : null}
          </div>
        </section>
      ))}

      <div className="flex flex-wrap justify-between gap-2 border-t border-white/10 pt-4">
        <div className="flex gap-2">
          {canDelete ? <button type="button" className="btn-admin-danger" onClick={() => setDeleteOpen(true)}>{isVi ? 'Xóa CV' : 'Delete CV'}</button> : null}
          <button type="button" className="btn-admin-secondary" disabled={!slug} onClick={() => slug && window.open(`/team/${slug}/cv`, '_blank', 'noopener,noreferrer')}>{isVi ? 'Xem trước' : 'Preview'}</button>
        </div>
        {canUpdate ? <button type="button" className="btn-admin-primary" disabled={saving || uploading != null} onClick={() => void save()}>{saving ? (isVi ? 'Đang lưu…' : 'Saving…') : isVi ? 'Lưu CV' : 'Save CV'}</button> : null}
      </div>

      <AdminConfirmDialog
        open={deleteOpen}
        origin={null}
        title={isVi ? 'Xóa CV' : 'Delete CV'}
        message={isVi ? 'Xóa toàn bộ thông tin CV? Hành động này không thể hoàn tác.' : 'Delete all CV information? This cannot be undone.'}
        confirmText={isVi ? 'Xóa' : 'Delete'}
        confirming={deleting}
        onCancel={() => !deleting && setDeleteOpen(false)}
        onConfirm={() => void remove()}
      />
    </div>
  );
}
