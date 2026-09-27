'use client';

import { useEffect, useState } from 'react';
import AboutTeamCvEditor from '@/components/admin/AboutTeamCvEditor';
import { useLocale } from '@/components/providers/LocaleProvider';
import { apiPath } from '@/lib/apiRoutes';

type Me = {
  id: number;
  email: string;
  displayName: string | null;
  roleId: number;
  role: { name: string } | null;
  aboutTeamMember: { id: number; slug: string | null; name: string } | null;
};

// --- Sections: Load admin/me | Profile summary | Own CV ---

export default function AdminProfilePage() {
  const { locale } = useLocale();
  const isVi = locale === 'vi-VN';
  const [me, setMe] = useState<Me | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(apiPath('admin/me'), { credentials: 'include' });
        if (!res.ok) {
          window.location.href = '/admin/login';
          return;
        }
        const data = (await res.json()) as Me;
        if (!cancelled) setMe(data);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <div className="glass p-6 rounded-2xl text-white">Loading profile...</div>;

  const member = me?.aboutTeamMember ?? null;

  return (
    <div className="space-y-6">
      <section className="glass p-6 rounded-2xl">
        {/* ==================== PROFILE DETAILS ==================== */}
        <h1 className="text-2xl font-bold text-white mb-4">{isVi ? 'Hồ sơ của tôi' : 'My Profile'}</h1>
        <div className="space-y-2 text-white/85">
          <p><span className="text-white/60">Email:</span> {me?.email ?? '-'}</p>
          <p><span className="text-white/60">{isVi ? 'Tên hiển thị' : 'Display name'}:</span> {me?.displayName ?? '-'}</p>
          <p><span className="text-white/60">{isVi ? 'Vai trò' : 'Role'}:</span> {me?.role?.name ?? '-'}</p>
        </div>
      </section>

      <section className="glass p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-white mb-2">{isVi ? 'CV và mạng xã hội' : 'CV and social links'}</h2>
        {member ? (
          <>
            <p className="mb-4 text-sm text-white/65">
              {isVi
                ? `Bạn đang cập nhật hồ sơ công khai của ${member.name}. Liên kết mạng xã hội nằm trong CV.`
                : `You are updating the public profile for ${member.name}. Social links are part of the CV.`}
            </p>
            <AboutTeamCvEditor memberId={member.id} slug={member.slug ?? ''} isVi={isVi} editable />
          </>
        ) : (
          <p className="text-white/70">
            {isVi
              ? 'Tài khoản này chưa được gắn với thành viên nào. Quản trị viên cần chọn tài khoản của bạn trong mục Đội ngũ.'
              : 'This login is not linked to a team member. An administrator needs to assign your account on the About Team page.'}
          </p>
        )}
      </section>
    </div>
  );
}
