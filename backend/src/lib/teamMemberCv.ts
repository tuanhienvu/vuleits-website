import type { AboutTeamMember, Prisma, PrismaClient } from '@prisma/client';
import { jsonObjectBody } from '@/lib/jsonBody';
import { type PublicContentLocale, pickLocalized } from '@/lib/i18nContent';
import { sanitizePublicHttpUrl } from '@/lib/publicHttpUrl';
import { slugifyName } from '@/lib/slugify';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const cvInclude = {
  skills: { orderBy: { displayOrder: 'asc' as const } },
  experiences: { orderBy: { displayOrder: 'asc' as const } },
  educations: { orderBy: { displayOrder: 'asc' as const } },
  certifications: { orderBy: { displayOrder: 'asc' as const } },
  languages: { orderBy: { displayOrder: 'asc' as const } },
  socialLinks: { orderBy: { displayOrder: 'asc' as const } },
} satisfies Prisma.AboutTeamMemberCVInclude;

export type AboutTeamMemberCVWithChildren = Prisma.AboutTeamMemberCVGetPayload<{ include: typeof cvInclude }>;

export type CvUpsertSkill = {
  name: string;
  nameVi: string | null;
  description: string;
  descriptionVi: string | null;
  displayOrder: number;
};

export type CvUpsertExperience = {
  company: string;
  companyVi: string | null;
  position: string;
  positionVi: string | null;
  description: string;
  descriptionVi: string | null;
  startDate: Date;
  endDate: Date | null;
  isCurrent: boolean;
  displayOrder: number;
};

export type CvUpsertEducation = {
  school: string;
  schoolVi: string | null;
  degree: string;
  degreeVi: string | null;
  fieldOfStudy: string;
  fieldOfStudyVi: string | null;
  gpa: string | null;
  startDate: Date | null;
  endDate: Date | null;
  displayOrder: number;
};

export type CvUpsertCertification = {
  name: string;
  nameVi: string | null;
  issuer: string | null;
  issuerVi: string | null;
  issuedAt: Date | null;
  credentialUrl: string | null;
  displayOrder: number;
};

export type CvUpsertLanguage = {
  name: string;
  nameVi: string | null;
  proficiency: string | null;
  displayOrder: number;
};

export type CvUpsertSocialLink = {
  label: string;
  labelVi: string | null;
  url: string;
  displayOrder: number;
};

export type CvUpsertData = {
  title: string;
  titleVi: string | null;
  profileSummary: string;
  profileSummaryVi: string | null;
  email: string | null;
  phone: string | null;
  location: string | null;
  locationVi: string | null;
  avatarUrl: string | null;
  cvPdfUrl: string | null;
  isPublished: boolean;
  skills: CvUpsertSkill[];
  experiences: CvUpsertExperience[];
  educations: CvUpsertEducation[];
  certifications: CvUpsertCertification[];
  languages: CvUpsertLanguage[];
  socialLinks: CvUpsertSocialLink[];
};

export type AdminCvSkillDto = {
  id: number;
  name: string;
  nameVi: string;
  description: string;
  descriptionVi: string;
  displayOrder: number;
};

export type AdminCvExperienceDto = {
  id: number;
  company: string;
  companyVi: string;
  position: string;
  positionVi: string;
  description: string;
  descriptionVi: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  displayOrder: number;
};

export type AdminCvEducationDto = {
  id: number;
  school: string;
  schoolVi: string;
  degree: string;
  degreeVi: string;
  fieldOfStudy: string;
  fieldOfStudyVi: string;
  gpa: string | null;
  startDate: string | null;
  endDate: string | null;
  displayOrder: number;
};

export type AdminCvCertificationDto = {
  id: number;
  name: string;
  nameVi: string;
  issuer: string;
  issuerVi: string;
  issuedAt: string | null;
  credentialUrl: string | null;
  displayOrder: number;
};

export type AdminCvLanguageDto = {
  id: number;
  name: string;
  nameVi: string;
  proficiency: string;
  displayOrder: number;
};

export type AdminCvSocialLinkDto = {
  id: number;
  label: string;
  labelVi: string;
  url: string;
  displayOrder: number;
};

export type AdminCvDto = {
  id: number;
  teamMemberId: number;
  title: string;
  titleVi: string;
  profileSummary: string;
  profileSummaryVi: string;
  email: string | null;
  phone: string | null;
  location: string;
  locationVi: string;
  avatarUrl: string | null;
  cvPdfUrl: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
  skills: AdminCvSkillDto[];
  experiences: AdminCvExperienceDto[];
  educations: AdminCvEducationDto[];
  certifications: AdminCvCertificationDto[];
  languages: AdminCvLanguageDto[];
  socialLinks: AdminCvSocialLinkDto[];
};

export type PublicCvSkillDto = {
  name: string;
  description: string;
  displayOrder: number;
};

export type PublicCvExperienceDto = {
  company: string;
  position: string;
  description: string;
  startDate: string;
  endDate: string | null;
  isCurrent: boolean;
  displayOrder: number;
};

export type PublicCvEducationDto = {
  school: string;
  degree: string;
  fieldOfStudy: string;
  gpa: string | null;
  startDate: string | null;
  endDate: string | null;
  displayOrder: number;
};

export type PublicCvCertificationDto = {
  name: string;
  issuer: string;
  issuedAt: string | null;
  credentialUrl: string | null;
  displayOrder: number;
};

export type PublicCvLanguageDto = {
  name: string;
  proficiency: string;
  displayOrder: number;
};

export type PublicCvSocialLinkDto = {
  label: string;
  url: string;
  displayOrder: number;
};

export type PublicCvDto = {
  slug: string;
  emoji: string;
  name: string;
  role: string;
  title: string;
  profileSummary: string;
  email: string | null;
  phone: string | null;
  location: string;
  avatarUrl: string | null;
  cvPdfUrl: string | null;
  skills: PublicCvSkillDto[];
  experiences: PublicCvExperienceDto[];
  educations: PublicCvEducationDto[];
  certifications: PublicCvCertificationDto[];
  languages: PublicCvLanguageDto[];
  socialLinks: PublicCvSocialLinkDto[];
};

type ParseFail = { ok: false; error: string };
type ParseOk = { ok: true; data: CvUpsertData };

function clampStr(s: string, max: number): string {
  return s.length <= max ? s : s.slice(0, max);
}

function optionalVi(raw: unknown, max: number): string | null {
  if (typeof raw !== 'string') return null;
  const t = raw.trim();
  if (!t) return null;
  return clampStr(t, max);
}

function requiredStr(raw: unknown, field: string, max: number): string | ParseFail {
  const s = typeof raw === 'string' ? raw.trim() : '';
  if (!s) return { ok: false, error: `${field} is required` };
  return clampStr(s, max);
}

function parseDisplayOrder(raw: unknown, index: number): number {
  if (typeof raw === 'number' && Number.isFinite(raw)) return Math.floor(raw);
  if (typeof raw === 'string' && raw.trim() !== '') {
    const n = Number(raw);
    if (Number.isFinite(n)) return Math.floor(n);
  }
  return index;
}

function parseRequiredDate(raw: unknown, field: string): Date | ParseFail {
  if (typeof raw !== 'string' || !raw.trim()) {
    return { ok: false, error: `${field} is required` };
  }
  const d = new Date(raw.trim());
  if (Number.isNaN(d.getTime())) {
    return { ok: false, error: `${field} is invalid` };
  }
  return d;
}

function parseOptionalDate(raw: unknown, field: string): Date | null | ParseFail {
  if (raw === null || raw === undefined || raw === '') return null;
  if (typeof raw !== 'string') {
    return { ok: false, error: `${field} is invalid` };
  }
  const s = raw.trim();
  if (!s) return null;
  const d = new Date(s);
  if (Number.isNaN(d.getTime())) {
    return { ok: false, error: `${field} is invalid` };
  }
  return d;
}

function parseAllowedUrl(raw: unknown, field: string, required: boolean): string | null | ParseFail {
  const s = typeof raw === 'string' ? raw.trim() : '';
  if (!s) {
    if (required) return { ok: false, error: `${field} is required` };
    return null;
  }
  if (s.startsWith('/uploads/')) {
    if (s.length > 2000) return { ok: false, error: `${field} is too long` };
    return s;
  }
  const http = sanitizePublicHttpUrl(s);
  if (!http) return { ok: false, error: `${field} must be http(s) or /uploads/` };
  return http;
}

function isParseFail<T>(v: T | ParseFail): v is ParseFail {
  return typeof v === 'object' && v !== null && 'ok' in v && (v as ParseFail).ok === false;
}

function rejectEndBeforeStart(
  startDate: Date,
  endDate: Date | null,
  endField: string,
): ParseFail | null {
  if (endDate !== null && endDate.getTime() < startDate.getTime()) {
    return { ok: false, error: `${endField} must not be before startDate` };
  }
  return null;
}

export async function ensureUniqueMemberSlug(
  prisma: PrismaClient,
  name: string,
  excludeId?: number,
): Promise<string> {
  const base = slugifyName(name);
  let candidate = base;
  let suffix = 2;

  for (;;) {
    const existing = await prisma.aboutTeamMember.findFirst({
      where: {
        slug: candidate,
        ...(excludeId != null ? { id: { not: excludeId } } : {}),
      },
      select: { id: true },
    });
    if (!existing) return candidate.slice(0, 160);
    const suffixStr = `-${suffix}`;
    candidate = `${base.slice(0, Math.max(1, 160 - suffixStr.length))}${suffixStr}`;
    suffix += 1;
  }
}

function parseSkills(raw: unknown): CvUpsertSkill[] | ParseFail {
  const arr = Array.isArray(raw) ? raw : [];
  const out: CvUpsertSkill[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      return { ok: false, error: `skills[${i}] is invalid` };
    }
    const o = item as Record<string, unknown>;
    const name = requiredStr(o.name, `skills[${i}].name`, 150);
    if (isParseFail(name)) return name;
    const description = requiredStr(o.description, `skills[${i}].description`, 50_000);
    if (isParseFail(description)) return description;
    out.push({
      name,
      nameVi: optionalVi(o.nameVi, 150),
      description,
      descriptionVi: optionalVi(o.descriptionVi, 50_000),
      displayOrder: parseDisplayOrder(o.displayOrder, i),
    });
  }
  return out;
}

function parseExperiences(raw: unknown): CvUpsertExperience[] | ParseFail {
  const arr = Array.isArray(raw) ? raw : [];
  const out: CvUpsertExperience[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      return { ok: false, error: `experiences[${i}] is invalid` };
    }
    const o = item as Record<string, unknown>;
    const company = requiredStr(o.company, `experiences[${i}].company`, 190);
    if (isParseFail(company)) return company;
    const position = requiredStr(o.position, `experiences[${i}].position`, 190);
    if (isParseFail(position)) return position;
    const description = requiredStr(o.description, `experiences[${i}].description`, 50_000);
    if (isParseFail(description)) return description;
    const startDate = parseRequiredDate(o.startDate, `experiences[${i}].startDate`);
    if (isParseFail(startDate)) return startDate;
    const isCurrent = Boolean(o.isCurrent);
    let endDate: Date | null = null;
    if (!isCurrent) {
      const end = parseOptionalDate(o.endDate, `experiences[${i}].endDate`);
      if (isParseFail(end)) return end;
      endDate = end;
      if (endDate !== null) {
        const range = rejectEndBeforeStart(startDate, endDate, `experiences[${i}].endDate`);
        if (range) return range;
      }
    }
    out.push({
      company,
      companyVi: optionalVi(o.companyVi, 190),
      position,
      positionVi: optionalVi(o.positionVi, 190),
      description,
      descriptionVi: optionalVi(o.descriptionVi, 50_000),
      startDate,
      endDate,
      isCurrent,
      displayOrder: parseDisplayOrder(o.displayOrder, i),
    });
  }
  return out;
}

function parseEducations(raw: unknown): CvUpsertEducation[] | ParseFail {
  const arr = Array.isArray(raw) ? raw : [];
  const out: CvUpsertEducation[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      return { ok: false, error: `educations[${i}] is invalid` };
    }
    const o = item as Record<string, unknown>;
    const school = requiredStr(o.school, `educations[${i}].school`, 190);
    if (isParseFail(school)) return school;
    const degree = requiredStr(o.degree, `educations[${i}].degree`, 190);
    if (isParseFail(degree)) return degree;
    const fieldOfStudy = requiredStr(o.fieldOfStudy, `educations[${i}].fieldOfStudy`, 190);
    if (isParseFail(fieldOfStudy)) return fieldOfStudy;
    const startDate = parseOptionalDate(o.startDate, `educations[${i}].startDate`);
    if (isParseFail(startDate)) return startDate;
    const endDate = parseOptionalDate(o.endDate, `educations[${i}].endDate`);
    if (isParseFail(endDate)) return endDate;
    if (startDate !== null && endDate !== null) {
      const range = rejectEndBeforeStart(startDate, endDate, `educations[${i}].endDate`);
      if (range) return range;
    }
    const gpaRaw = typeof o.gpa === 'string' ? o.gpa.trim() : '';
    out.push({
      school,
      schoolVi: optionalVi(o.schoolVi, 190),
      degree,
      degreeVi: optionalVi(o.degreeVi, 190),
      fieldOfStudy,
      fieldOfStudyVi: optionalVi(o.fieldOfStudyVi, 190),
      gpa: gpaRaw ? clampStr(gpaRaw, 32) : null,
      startDate,
      endDate,
      displayOrder: parseDisplayOrder(o.displayOrder, i),
    });
  }
  return out;
}

function parseCertifications(raw: unknown): CvUpsertCertification[] | ParseFail {
  const arr = Array.isArray(raw) ? raw : [];
  const out: CvUpsertCertification[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      return { ok: false, error: `certifications[${i}] is invalid` };
    }
    const o = item as Record<string, unknown>;
    const name = requiredStr(o.name, `certifications[${i}].name`, 190);
    if (isParseFail(name)) return name;
    const issuedAt = parseOptionalDate(o.issuedAt, `certifications[${i}].issuedAt`);
    if (isParseFail(issuedAt)) return issuedAt;
    const credentialUrl = parseAllowedUrl(o.credentialUrl, `certifications[${i}].credentialUrl`, false);
    if (isParseFail(credentialUrl)) return credentialUrl;
    const issuerRaw = typeof o.issuer === 'string' ? o.issuer.trim() : '';
    out.push({
      name,
      nameVi: optionalVi(o.nameVi, 190),
      issuer: issuerRaw ? clampStr(issuerRaw, 190) : null,
      issuerVi: optionalVi(o.issuerVi, 190),
      issuedAt,
      credentialUrl,
      displayOrder: parseDisplayOrder(o.displayOrder, i),
    });
  }
  return out;
}

function parseLanguages(raw: unknown): CvUpsertLanguage[] | ParseFail {
  const arr = Array.isArray(raw) ? raw : [];
  const out: CvUpsertLanguage[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      return { ok: false, error: `languages[${i}] is invalid` };
    }
    const o = item as Record<string, unknown>;
    const name = requiredStr(o.name, `languages[${i}].name`, 120);
    if (isParseFail(name)) return name;
    const proficiencyRaw = typeof o.proficiency === 'string' ? o.proficiency.trim() : '';
    out.push({
      name,
      nameVi: optionalVi(o.nameVi, 120),
      proficiency: proficiencyRaw ? clampStr(proficiencyRaw, 80) : null,
      displayOrder: parseDisplayOrder(o.displayOrder, i),
    });
  }
  return out;
}

function parseSocialLinks(raw: unknown): CvUpsertSocialLink[] | ParseFail {
  const arr = Array.isArray(raw) ? raw : [];
  const out: CvUpsertSocialLink[] = [];
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (!item || typeof item !== 'object' || Array.isArray(item)) {
      return { ok: false, error: `socialLinks[${i}] is invalid` };
    }
    const o = item as Record<string, unknown>;
    const label = requiredStr(o.label, `socialLinks[${i}].label`, 120);
    if (isParseFail(label)) return label;
    const urlParsed = parseAllowedUrl(o.url, `socialLinks[${i}].url`, true);
    if (isParseFail(urlParsed)) return urlParsed;
    if (urlParsed === null) {
      return { ok: false, error: `socialLinks[${i}].url is required` };
    }
    out.push({
      label,
      labelVi: optionalVi(o.labelVi, 120),
      url: urlParsed,
      displayOrder: parseDisplayOrder(o.displayOrder, i),
    });
  }
  return out;
}

export function parseCvUpsertBody(body: unknown): ParseOk | ParseFail {
  const o = jsonObjectBody(body);

  const title = requiredStr(o.title, 'title', 150);
  if (isParseFail(title)) return title;
  const profileSummary = requiredStr(o.profileSummary, 'profileSummary', 100_000);
  if (isParseFail(profileSummary)) return profileSummary;

  const emailRaw = typeof o.email === 'string' ? o.email.trim() : '';
  let email: string | null = null;
  if (emailRaw) {
    const e = clampStr(emailRaw, 190);
    if (!EMAIL_RE.test(e)) {
      return { ok: false, error: 'email must be a valid email address' };
    }
    email = e;
  }

  const phoneRaw = typeof o.phone === 'string' ? o.phone.trim() : '';
  const phone = phoneRaw ? clampStr(phoneRaw, 60) : null;

  const locationRaw = typeof o.location === 'string' ? o.location.trim() : '';
  const location = locationRaw ? clampStr(locationRaw, 190) : null;

  const avatarUrl = parseAllowedUrl(o.avatarUrl, 'avatarUrl', false);
  if (isParseFail(avatarUrl)) return avatarUrl;
  const cvPdfUrl = parseAllowedUrl(o.cvPdfUrl, 'cvPdfUrl', false);
  if (isParseFail(cvPdfUrl)) return cvPdfUrl;

  const isPublished = o.isPublished === undefined ? true : Boolean(o.isPublished);

  const skills = parseSkills(o.skills);
  if (isParseFail(skills)) return skills;
  const experiences = parseExperiences(o.experiences);
  if (isParseFail(experiences)) return experiences;
  const educations = parseEducations(o.educations);
  if (isParseFail(educations)) return educations;
  const certifications = parseCertifications(o.certifications);
  if (isParseFail(certifications)) return certifications;
  const languages = parseLanguages(o.languages);
  if (isParseFail(languages)) return languages;
  const socialLinks = parseSocialLinks(o.socialLinks);
  if (isParseFail(socialLinks)) return socialLinks;

  return {
    ok: true,
    data: {
      title,
      titleVi: optionalVi(o.titleVi, 150),
      profileSummary,
      profileSummaryVi: optionalVi(o.profileSummaryVi, 100_000),
      email,
      phone,
      location,
      locationVi: optionalVi(o.locationVi, 190),
      avatarUrl,
      cvPdfUrl,
      isPublished,
      skills,
      experiences,
      educations,
      certifications,
      languages,
      socialLinks,
    },
  };
}

export function serializeAdminCv(cv: AboutTeamMemberCVWithChildren): AdminCvDto {
  return {
    id: cv.id,
    teamMemberId: cv.teamMemberId,
    title: cv.title,
    titleVi: cv.titleVi ?? '',
    profileSummary: cv.profileSummary,
    profileSummaryVi: cv.profileSummaryVi ?? '',
    email: cv.email,
    phone: cv.phone,
    location: cv.location ?? '',
    locationVi: cv.locationVi ?? '',
    avatarUrl: cv.avatarUrl,
    cvPdfUrl: cv.cvPdfUrl,
    isPublished: cv.isPublished,
    createdAt: cv.createdAt.toISOString(),
    updatedAt: cv.updatedAt.toISOString(),
    skills: cv.skills.map((s) => ({
      id: s.id,
      name: s.name,
      nameVi: s.nameVi ?? '',
      description: s.description,
      descriptionVi: s.descriptionVi ?? '',
      displayOrder: s.displayOrder,
    })),
    experiences: cv.experiences.map((e) => ({
      id: e.id,
      company: e.company,
      companyVi: e.companyVi ?? '',
      position: e.position,
      positionVi: e.positionVi ?? '',
      description: e.description,
      descriptionVi: e.descriptionVi ?? '',
      startDate: e.startDate.toISOString(),
      endDate: e.endDate ? e.endDate.toISOString() : null,
      isCurrent: e.isCurrent,
      displayOrder: e.displayOrder,
    })),
    educations: cv.educations.map((ed) => ({
      id: ed.id,
      school: ed.school,
      schoolVi: ed.schoolVi ?? '',
      degree: ed.degree,
      degreeVi: ed.degreeVi ?? '',
      fieldOfStudy: ed.fieldOfStudy,
      fieldOfStudyVi: ed.fieldOfStudyVi ?? '',
      gpa: ed.gpa,
      startDate: ed.startDate ? ed.startDate.toISOString() : null,
      endDate: ed.endDate ? ed.endDate.toISOString() : null,
      displayOrder: ed.displayOrder,
    })),
    certifications: cv.certifications.map((c) => ({
      id: c.id,
      name: c.name,
      nameVi: c.nameVi ?? '',
      issuer: c.issuer ?? '',
      issuerVi: c.issuerVi ?? '',
      issuedAt: c.issuedAt ? c.issuedAt.toISOString() : null,
      credentialUrl: c.credentialUrl,
      displayOrder: c.displayOrder,
    })),
    languages: cv.languages.map((l) => ({
      id: l.id,
      name: l.name,
      nameVi: l.nameVi ?? '',
      proficiency: l.proficiency ?? '',
      displayOrder: l.displayOrder,
    })),
    socialLinks: cv.socialLinks.map((sl) => ({
      id: sl.id,
      label: sl.label,
      labelVi: sl.labelVi ?? '',
      url: sl.url,
      displayOrder: sl.displayOrder,
    })),
  };
}

export function serializePublicCv(
  member: Pick<AboutTeamMember, 'emoji' | 'name' | 'nameVi' | 'role' | 'roleVi' | 'slug'>,
  cv: AboutTeamMemberCVWithChildren,
  locale: PublicContentLocale,
): PublicCvDto {
  const slug = member.slug ?? '';
  return {
    slug,
    emoji: member.emoji,
    name: pickLocalized(member.name, member.nameVi, locale),
    role: pickLocalized(member.role, member.roleVi, locale),
    title: pickLocalized(cv.title, cv.titleVi, locale),
    profileSummary: pickLocalized(cv.profileSummary, cv.profileSummaryVi, locale),
    email: cv.email,
    phone: cv.phone,
    location: pickLocalized(cv.location, cv.locationVi, locale),
    avatarUrl: cv.avatarUrl,
    cvPdfUrl: cv.cvPdfUrl,
    skills: cv.skills.map((s) => ({
      name: pickLocalized(s.name, s.nameVi, locale),
      description: pickLocalized(s.description, s.descriptionVi, locale),
      displayOrder: s.displayOrder,
    })),
    experiences: cv.experiences.map((e) => ({
      company: pickLocalized(e.company, e.companyVi, locale),
      position: pickLocalized(e.position, e.positionVi, locale),
      description: pickLocalized(e.description, e.descriptionVi, locale),
      startDate: e.startDate.toISOString(),
      endDate: e.isCurrent || !e.endDate ? null : e.endDate.toISOString(),
      isCurrent: e.isCurrent,
      displayOrder: e.displayOrder,
    })),
    educations: cv.educations.map((ed) => ({
      school: pickLocalized(ed.school, ed.schoolVi, locale),
      degree: pickLocalized(ed.degree, ed.degreeVi, locale),
      fieldOfStudy: pickLocalized(ed.fieldOfStudy, ed.fieldOfStudyVi, locale),
      gpa: ed.gpa,
      startDate: ed.startDate ? ed.startDate.toISOString() : null,
      endDate: ed.endDate ? ed.endDate.toISOString() : null,
      displayOrder: ed.displayOrder,
    })),
    certifications: cv.certifications.map((c) => ({
      name: pickLocalized(c.name, c.nameVi, locale),
      issuer: pickLocalized(c.issuer, c.issuerVi, locale),
      issuedAt: c.issuedAt ? c.issuedAt.toISOString() : null,
      credentialUrl: c.credentialUrl,
      displayOrder: c.displayOrder,
    })),
    languages: cv.languages.map((l) => ({
      name: pickLocalized(l.name, l.nameVi, locale),
      proficiency: l.proficiency ?? '',
      displayOrder: l.displayOrder,
    })),
    socialLinks: cv.socialLinks.map((sl) => ({
      label: pickLocalized(sl.label, sl.labelVi, locale),
      url: sl.url,
      displayOrder: sl.displayOrder,
    })),
  };
}
