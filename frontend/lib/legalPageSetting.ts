export type LegalPageKind = 'privacy' | 'terms';

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

export function defaultLegalPagePayload(kind: LegalPageKind): LegalPagePayload {
  if (kind === 'privacy') {
    return {
      titleEn: 'Privacy',
      titleVi: 'Chinh sach bao mat',
      bodyEn:
        '<h2>1. Introduction</h2><p>Welcome to VULE ITS Website. We are committed to protecting your privacy and ensuring a safe experience on our website.</p>',
      bodyVi:
        '<h2>1. Gioi thieu</h2><p>VULE ITS cam ket bao ve quyen rieng tu va mang den trai nghiem an toan cho nguoi dung.</p>',
      updatedAtLabelEn: 'Last updated: December 13, 2025',
      updatedAtLabelVi: 'Cap nhat lan cuoi: 13/12/2025',
    };
  }
  return {
    titleEn: 'Terms',
    titleVi: 'Dieu khoan su dung',
    bodyEn:
      '<h2>1. Agreement to Terms</h2><p>By accessing this website, you agree to these terms and applicable laws.</p>',
    bodyVi:
      '<h2>1. Dong y dieu khoan</h2><p>Khi truy cap website, ban dong y voi cac dieu khoan va quy dinh phap luat lien quan.</p>',
    updatedAtLabelEn: 'Last updated: December 13, 2025',
    updatedAtLabelVi: 'Cap nhat lan cuoi: 13/12/2025',
  };
}

