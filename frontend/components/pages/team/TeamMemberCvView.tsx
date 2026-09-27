'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import DetailBackButton from '@/components/navigation/DetailBackButton';
import { apiPath } from '@/lib/apiRoutes';
import { normalizePublicAssetUrlForBrowser } from '@/lib/normalizePublicAssetUrl';
import { useLocale, type Locale } from '@/components/providers/LocaleProvider';

export type TeamMemberCv = {
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
  skills: Array<{ name: string; description: string; displayOrder: number }>;
  experiences: Array<{
    company: string;
    position: string;
    description: string;
    startDate: string;
    endDate: string | null;
    isCurrent: boolean;
    displayOrder: number;
  }>;
  educations: Array<{
    school: string;
    degree: string;
    fieldOfStudy: string;
    gpa: string | null;
    startDate: string | null;
    endDate: string | null;
    displayOrder: number;
  }>;
  certifications: Array<{
    name: string;
    issuer: string;
    issuedAt: string | null;
    credentialUrl: string | null;
    displayOrder: number;
  }>;
  languages: Array<{ name: string; proficiency: string; displayOrder: number }>;
  socialLinks: Array<{ label: string; url: string; displayOrder: number }>;
};

type Props = {
  initial: TeamMemberCv;
  initialLocale: Locale;
};

function byDisplayOrder<T extends { displayOrder: number }>(items: T[]): T[] {
  return [...items].sort((a, b) => a.displayOrder - b.displayOrder);
}

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="cv-section border-t border-white/15 py-8 first:border-t-0" aria-labelledby={id}>
      <div className="grid gap-5 md:grid-cols-[11rem_1fr] md:gap-10">
        <h2 id={id} className="text-xl font-semibold tracking-wide text-(--brand-accent)">
          {title}
        </h2>
        <div>{children}</div>
      </div>
    </section>
  );
}

function formatMonth(value: string | null, locale: Locale): string {
  if (!value) return '';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' }).format(date);
}

function dateRange(
  start: string | null,
  end: string | null,
  isCurrent: boolean,
  locale: Locale,
  presentLabel: string,
): string {
  const from = formatMonth(start, locale);
  const to = isCurrent ? presentLabel : formatMonth(end, locale);
  return [from, to].filter(Boolean).join(' — ');
}

export default function TeamMemberCvView({ initial, initialLocale }: Props) {
  const { locale, t } = useLocale();
  const [cv, setCv] = useState(initial);
  const [loadedLocale, setLoadedLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    if (locale === loadedLocale) return;
    const controller = new AbortController();
    void fetch(
      `${apiPath(`about/team/${encodeURIComponent(initial.slug)}/cv`)}?locale=${encodeURIComponent(locale)}`,
      { signal: controller.signal },
    )
      .then((response) => (response.ok ? (response.json() as Promise<TeamMemberCv>) : null))
      .then((data) => {
        if (data) setCv(data);
        setLoadedLocale(locale);
      })
      .catch(() => {
        if (!controller.signal.aborted) setLoadedLocale(locale);
      });
    return () => controller.abort();
  }, [initial.slug, loadedLocale, locale]);

  const avatarUrl = useMemo(
    () => (cv.avatarUrl ? normalizePublicAssetUrlForBrowser(cv.avatarUrl) : null),
    [cv.avatarUrl],
  );
  const pdfUrl = cv.cvPdfUrl ? normalizePublicAssetUrlForBrowser(cv.cvPdfUrl) : null;
  const skills = byDisplayOrder(cv.skills);
  const experiences = byDisplayOrder(cv.experiences);
  const educations = byDisplayOrder(cv.educations);
  const certifications = byDisplayOrder(cv.certifications);
  const languages = byDisplayOrder(cv.languages);
  const socialLinks = byDisplayOrder(cv.socialLinks);

  return (
    <>
      <article className="cv-document container mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:py-16">
        <div className="print:hidden">
          <DetailBackButton fallbackHref="/about" label={t('cv.backToTeam')} />
        </div>
        <div className="glass cv-paper overflow-hidden p-6 sm:p-10 lg:p-14">
          <header className="grid gap-8 pb-9 md:grid-cols-[1fr_auto] md:items-start">
            <div className="flex min-w-0 items-center gap-5">
              <div className="relative flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 text-5xl shadow-lg">
                {avatarUrl ? (
                  <Image src={avatarUrl} alt="" fill sizes="96px" className="object-cover" priority />
                ) : (
                  <span aria-hidden="true">{cv.emoji || '👤'}</span>
                )}
              </div>
              <div className="min-w-0">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-(--brand-accent)">
                  {cv.role}
                </p>
                <h1 className="text-4xl font-bold tracking-tight text-fg sm:text-5xl">{cv.name}</h1>
                <p className="mt-2 text-lg text-fg-muted">{cv.title}</p>
              </div>
            </div>

            <div className="flex flex-col items-start gap-2 text-sm md:items-end">
              {pdfUrl ? (
                <a
                  href={pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="public-cta-button cv-download mb-2 inline-flex items-center px-5 py-2.5 text-sm"
                >
                  {t('cv.downloadPdf')}
                </a>
              ) : null}
              {cv.email ? (
                <a className="text-fg-muted hover:text-fg" href={`mailto:${cv.email}`}>
                  <span className="sr-only">{t('cv.email')}: </span>
                  {cv.email}
                </a>
              ) : null}
              {cv.phone ? (
                <a className="text-fg-muted hover:text-fg" href={`tel:${cv.phone.replace(/[^\d+]/g, '')}`}>
                  <span className="sr-only">{t('cv.phone')}: </span>
                  {cv.phone}
                </a>
              ) : null}
              {cv.location ? <p className="text-fg-subtle">{cv.location}</p> : null}
            </div>
          </header>

          {cv.profileSummary ? (
            <Section id="cv-profile" title={t('cv.profile')}>
              <p className="max-w-3xl whitespace-pre-line text-lg leading-8 text-fg-muted">
                {cv.profileSummary}
              </p>
            </Section>
          ) : null}

          {skills.length ? (
            <Section id="cv-skills" title={t('cv.skills')}>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {skills.map((skill) => (
                  <div key={`${skill.displayOrder}-${skill.name}`} className="rounded-xl border border-white/15 bg-white/5 p-4">
                    <h3 className="font-semibold text-fg">{skill.name}</h3>
                    {skill.description ? (
                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-fg-muted">{skill.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {experiences.length ? (
            <Section id="cv-experience" title={t('cv.experience')}>
              <div className="relative space-y-8 border-l border-white/20 pl-6">
                {experiences.map((item) => (
                  <div key={`${item.displayOrder}-${item.company}`} className="relative">
                    <span className="absolute -left-[1.82rem] top-1.5 h-3 w-3 rounded-full bg-(--brand-accent) ring-4 ring-[color:var(--glass-bg)]" />
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-fg">{item.company}</h3>
                        <p className="font-medium text-(--brand-accent)">{item.position}</p>
                      </div>
                      <p className="shrink-0 text-sm text-fg-subtle">
                        {dateRange(item.startDate, item.endDate, item.isCurrent, locale, t('cv.present'))}
                      </p>
                    </div>
                    {item.description ? (
                      <p className="mt-3 whitespace-pre-line leading-7 text-fg-muted">{item.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {educations.length ? (
            <Section id="cv-education" title={t('cv.education')}>
              <div className="space-y-6">
                {educations.map((item) => (
                  <div key={`${item.displayOrder}-${item.school}`} className="break-inside-avoid">
                    <div className="flex flex-col gap-1 sm:flex-row sm:justify-between sm:gap-4">
                      <div>
                        <h3 className="text-lg font-semibold text-fg">{item.school}</h3>
                        <p className="text-fg-muted">
                          {[item.degree, item.fieldOfStudy].filter(Boolean).join(' · ')}
                        </p>
                        {item.gpa ? <p className="mt-1 text-sm text-fg-subtle">GPA: {item.gpa}</p> : null}
                      </div>
                      <p className="shrink-0 text-sm text-fg-subtle">
                        {dateRange(item.startDate, item.endDate, false, locale, t('cv.present'))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          ) : null}

          {certifications.length ? (
            <Section id="cv-certifications" title={t('cv.certifications')}>
              <ul className="grid gap-4 sm:grid-cols-2">
                {certifications.map((item) => (
                  <li key={`${item.displayOrder}-${item.name}`} className="break-inside-avoid rounded-xl border border-white/15 bg-white/5 p-4">
                    <h3 className="font-semibold text-fg">{item.name}</h3>
                    <p className="mt-1 text-sm text-fg-muted">
                      {[item.issuer, formatMonth(item.issuedAt, locale)].filter(Boolean).join(' · ')}
                    </p>
                    {item.credentialUrl ? (
                      <a
                        className="mt-2 inline-block text-sm text-(--brand-accent) underline underline-offset-4"
                        href={item.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t('cv.viewCredential')}
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {languages.length ? (
            <Section id="cv-languages" title={t('cv.languages')}>
              <ul className="flex flex-wrap gap-3">
                {languages.map((item) => (
                  <li key={`${item.displayOrder}-${item.name}`} className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm text-fg">
                    {item.name}
                    {item.proficiency ? <span className="text-fg-muted"> · {item.proficiency}</span> : null}
                  </li>
                ))}
              </ul>
            </Section>
          ) : null}

          {socialLinks.length ? (
            <Section id="cv-connect" title={t('cv.connect')}>
              <nav aria-label={t('cv.socialLinks')} className="flex flex-wrap gap-x-6 gap-y-3">
                {socialLinks.map((item) => (
                  <a
                    key={`${item.displayOrder}-${item.label}`}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-(--brand-accent) underline decoration-transparent underline-offset-4 transition hover:decoration-current"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </Section>
          ) : null}
        </div>
      </article>

      <style jsx global>{`
        @media print {
          html,
          body {
            background: #fff !important;
          }
          .public-shell > nav,
          .public-shell > footer,
          .public-shell > div:first-child,
          .cv-download {
            display: none !important;
          }
          .cv-document {
            max-width: none !important;
            padding: 0 !important;
          }
          .cv-paper {
            border: 0 !important;
            border-radius: 0 !important;
            background: #fff !important;
            box-shadow: none !important;
            padding: 0 !important;
          }
          .cv-paper,
          .cv-paper * {
            color: #222 !important;
            text-shadow: none !important;
          }
          .cv-section {
            break-inside: avoid;
            border-color: #d1d5db !important;
          }
          a {
            text-decoration: none !important;
          }
        }
      `}</style>
    </>
  );
}
