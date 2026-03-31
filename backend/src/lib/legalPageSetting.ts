export const PRIVACY_POLICY_SETTING_KEY = 'legal_privacy_policy_page';
export const TERMS_OF_SERVICE_SETTING_KEY = 'legal_terms_of_service_page';

export type LegalPagePayload = {
  titleEn: string;
  titleVi: string;
  bodyEn: string;
  bodyVi: string;
  updatedAtLabelEn: string;
  updatedAtLabelVi: string;
};

export type LegalPagePublic = {
  title: string;
  bodyHtml: string;
  updatedAtLabel: string;
};

function buildDefaultPayload(kind: 'privacy' | 'terms'): LegalPagePayload {
  if (kind === 'privacy') {
    return {
      titleEn: 'Privacy',
      titleVi: 'Chinh sach bao mat',
      bodyEn:
        '<h2>1. Introduction</h2><p>Welcome to VULE ITS Website. We are committed to protecting your privacy and ensuring a safe experience on our website.</p><h2>2. Information We Collect</h2><p>We may collect contact information, usage data, and technical data required to provide and improve our services.</p><h2>3. How We Use Information</h2><p>We use collected information to operate services, provide support, and improve product quality.</p><h2>4. Contact</h2><p>For privacy-related requests, please contact us through the Contact section.</p>',
      bodyVi:
        '<h2>1. Gioi thieu</h2><p>VULE ITS cam ket bao ve quyen rieng tu va mang den trai nghiem an toan cho nguoi dung.</p><h2>2. Du lieu thu thap</h2><p>Chung toi co the thu thap thong tin lien he, du lieu su dung va thong tin ky thuat can thiet de van hanh dich vu.</p><h2>3. Muc dich su dung</h2><p>Du lieu duoc su dung de cung cap dich vu, ho tro khach hang va nang cao chat luong san pham.</p><h2>4. Lien he</h2><p>Vui long lien he qua muc Lien he neu ban co yeu cau lien quan den bao mat.</p>',
      updatedAtLabelEn: 'Last updated: December 13, 2025',
      updatedAtLabelVi: 'Cap nhat lan cuoi: 13/12/2025',
    };
  }

  return {
    titleEn: 'Terms',
    titleVi: 'Dieu khoan su dung',
    bodyEn:
      '<h2>1. Agreement to Terms</h2><p>By accessing this website, you agree to these terms and applicable laws.</p><h2>2. Use License</h2><p>Website materials are provided for lawful use only. You may not misuse, reverse engineer, or redistribute protected content without permission.</p><h2>3. Disclaimer</h2><p>Materials are provided "as is" without warranties to the fullest extent permitted by law.</p><h2>4. Contact</h2><p>For legal questions, please contact us via the Contact section.</p>',
    bodyVi:
      '<h2>1. Dong y dieu khoan</h2><p>Khi truy cap website, ban dong y voi cac dieu khoan va quy dinh phap luat lien quan.</p><h2>2. Quyen su dung</h2><p>Noi dung tren website chi duoc su dung dung muc dich hop phap. Khong duoc sao chep, dao nguoc hoac phan phoi trai phep.</p><h2>3. Tuyen bo mien tru</h2><p>Noi dung duoc cung cap theo hien trang va khong bao gom cac bao hanh ngoai quy dinh phap luat.</p><h2>4. Lien he</h2><p>Vui long lien he qua muc Lien he neu ban co cau hoi phap ly.</p>',
    updatedAtLabelEn: 'Last updated: December 13, 2025',
    updatedAtLabelVi: 'Cap nhat lan cuoi: 13/12/2025',
  };
}

export function defaultPrivacyPolicyPayload(): LegalPagePayload {
  return buildDefaultPayload('privacy');
}

export function defaultTermsOfServicePayload(): LegalPagePayload {
  return buildDefaultPayload('terms');
}

export function parseLegalPageJson(
  raw: string | null | undefined,
  kind: 'privacy' | 'terms',
): LegalPagePayload {
  const base = buildDefaultPayload(kind);
  if (!raw?.trim()) return base;
  try {
    const o = JSON.parse(raw) as Record<string, unknown>;
    return {
      titleEn: typeof o.titleEn === 'string' ? o.titleEn.slice(0, 300) : base.titleEn,
      titleVi: typeof o.titleVi === 'string' ? o.titleVi.slice(0, 300) : base.titleVi,
      bodyEn: typeof o.bodyEn === 'string' ? o.bodyEn.slice(0, 40000) : base.bodyEn,
      bodyVi: typeof o.bodyVi === 'string' ? o.bodyVi.slice(0, 40000) : base.bodyVi,
      updatedAtLabelEn:
        typeof o.updatedAtLabelEn === 'string' ? o.updatedAtLabelEn.slice(0, 200) : base.updatedAtLabelEn,
      updatedAtLabelVi:
        typeof o.updatedAtLabelVi === 'string' ? o.updatedAtLabelVi.slice(0, 200) : base.updatedAtLabelVi,
    };
  } catch {
    return base;
  }
}

export function serializeLegalPagePayload(p: LegalPagePayload): string {
  return JSON.stringify({
    titleEn: p.titleEn.trim(),
    titleVi: p.titleVi.trim(),
    bodyEn: p.bodyEn.trim(),
    bodyVi: p.bodyVi.trim(),
    updatedAtLabelEn: p.updatedAtLabelEn.trim(),
    updatedAtLabelVi: p.updatedAtLabelVi.trim(),
  });
}

export function toPublicLegalPage(payload: LegalPagePayload, locale: string): LegalPagePublic {
  const vi = locale === 'vi-VN';
  return {
    title: (vi ? payload.titleVi : payload.titleEn).trim(),
    bodyHtml: (vi ? payload.bodyVi : payload.bodyEn).trim(),
    updatedAtLabel: (vi ? payload.updatedAtLabelVi : payload.updatedAtLabelEn).trim(),
  };
}

