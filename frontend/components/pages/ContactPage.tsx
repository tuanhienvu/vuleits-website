'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useLocale, type Locale } from '@/components/providers/LocaleProvider';
import { useToast } from '@/components/providers/ToastProvider';
import CompanySocialLinks, { type PublicSocialLink } from '@/components/CompanySocialLinks';
import { apiPath } from '@/lib/apiRoutes';

type ContactInfo = {
  companyName: string;
  fullNameVi: string;
  fullNameEn: string;
  address: string;
  email: string;
  email2: string;
  phone: string;
  hotline: string;
  mapEmbedSrc: string | null;
  socialLinks: PublicSocialLink[];
};

function displayCompanyFullName(locale: Locale, info: ContactInfo): string {
  const vi = info.fullNameVi.trim();
  const en = info.fullNameEn.trim();
  const short = info.companyName.trim();
  if (locale === 'vi-VN') return vi || en || short;
  return en || vi || short;
}

// --- Sections: Hero | Form + contact details | Map embed ---

export default function ContactPage() {
  const { t, locale } = useLocale();
  const toast = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [info, setInfo] = useState<ContactInfo | null>(null);
  const [infoLoading, setInfoLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(apiPath('company/contact'));
        const data = (await res.json().catch(() => null)) as Record<string, unknown> | null;
        if (!cancelled && data && typeof data === 'object') {
          const src = data.mapEmbedSrc;
          const rawSocial = data.socialLinks;
          const socialLinks: PublicSocialLink[] = Array.isArray(rawSocial)
            ? rawSocial
                .map((row) => {
                  if (!row || typeof row !== 'object') return null;
                  const r = row as Record<string, unknown>;
                  const url = typeof r.url === 'string' ? r.url.trim() : '';
                  const type = typeof r.type === 'string' ? r.type : 'other';
                  if (!url) return null;
                  return { type, url } as PublicSocialLink;
                })
                .filter((x): x is PublicSocialLink => x != null)
            : [];
          setInfo({
            companyName: typeof data.companyName === 'string' ? data.companyName : '',
            fullNameVi: typeof data.fullNameVi === 'string' ? data.fullNameVi : '',
            fullNameEn: typeof data.fullNameEn === 'string' ? data.fullNameEn : '',
            address: typeof data.address === 'string' ? data.address : '',
            email: typeof data.email === 'string' ? data.email : '',
            email2: typeof data.email2 === 'string' ? data.email2 : '',
            phone: typeof data.phone === 'string' ? data.phone : '',
            hotline: typeof data.hotline === 'string' ? data.hotline : '',
            mapEmbedSrc: typeof src === 'string' && src ? src : null,
            socialLinks,
          });
        }
      } catch {
        if (!cancelled)
          setInfo({
            companyName: '',
            fullNameVi: '',
            fullNameEn: '',
            address: '',
            email: '',
            email2: '',
            phone: '',
            hotline: '',
            mapEmbedSrc: null,
            socialLinks: [],
          });
      } finally {
        if (!cancelled) setInfoLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch(apiPath('contact/submissions'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim(),
          message: formData.message.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.status === 429) {
        toast.error(t('contact.submitRateLimited'));
        return;
      }
      if (!res.ok) {
        toast.error(data.error || t('contact.submitError'));
        return;
      }
      toast.success(t('contact.thanks'));
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      toast.error(t('contact.submitNetworkError'));
    } finally {
      setSubmitting(false);
    }
  };

  const emailLine = info?.email?.trim();
  const email2Line = info?.email2?.trim();
  const phoneLine = info?.phone?.trim();
  const hotlineLine = info?.hotline?.trim();
  const addressLine = info?.address?.trim();
  const showHotline = hotlineLine && hotlineLine !== phoneLine;

  return (
    <div className="container mx-auto px-4">
      {/* ==================== CONTACT HERO ==================== */}
      <section className="glass p-8 md:p-12 rounded-3xl mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-fg mb-4">{t('contact.heroTitle')}</h1>
        <p className="text-fg-muted text-lg">{t('contact.heroSubtitle')}</p>
      </section>

      {/* ==================== MESSAGE FORM & COMPANY INFO ==================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-3xl font-bold text-fg mb-6">{t('contact.sendMessage')}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="text-fg font-medium mb-2 block">
                {t('contact.fullName')}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t('contact.fullName')}
                required
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-fg placeholder:text-fg-subtle focus:outline-none focus:border-white/50"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-fg font-medium mb-2 block">
                {t('contact.yourEmail')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={t('contact.yourEmail')}
                required
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-fg placeholder:text-fg-subtle focus:outline-none focus:border-white/50"
              />
            </div>

            <div>
              <label htmlFor="subject" className="text-fg font-medium mb-2 block">
                {t('contact.subject')}
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder={t('contact.subject')}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-fg placeholder:text-fg-subtle focus:outline-none focus:border-white/50"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-fg font-medium mb-2 block">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t('contact.message')}
                required
                rows={5}
                className="w-full px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-fg placeholder:text-fg-subtle focus:outline-none focus:border-white/50 resize-none"
              />
            </div>

            <button type="submit" disabled={submitting} className="public-cta-button w-full text-center disabled:opacity-50 disabled:pointer-events-none">
              {submitting ? t('contact.sending') : t('contact.send')}
            </button>
          </form>
        </div>

        <div className="glass p-8 rounded-3xl">
          <h2 className="text-3xl font-bold text-fg mb-6">
            {info && !infoLoading ? displayCompanyFullName(locale, info) || t('contact.contactInfo') : t('contact.contactInfo')}
          </h2>
          {infoLoading ? (
            <p className="text-fg-subtle">…</p>
          ) : (
            <div className="space-y-6">
              {addressLine ? (
                <div className="flex gap-4">
                  <div className="text-3xl shrink-0">📍</div>
                  <div className="min-w-0">
                    <h4 className="text-fg font-semibold mb-1">{t('contact.address')}</h4>
                    <p className="text-fg-muted whitespace-pre-line">{addressLine}</p>
                  </div>
                </div>
              ) : null}

              {emailLine || email2Line ? (
                <div className="flex gap-4">
                  <div className="text-3xl shrink-0">📧</div>
                  <div className="min-w-0">
                    <h4 className="text-fg font-semibold mb-1">{t('contact.email')}</h4>
                    <div className="flex flex-col gap-2">
                      {emailLine ? (
                        <a href={`mailto:${emailLine}`} className="text-fg-muted hover:text-fg break-all">
                          {emailLine}
                        </a>
                      ) : null}
                      {email2Line && email2Line !== emailLine ? (
                        <a href={`mailto:${email2Line}`} className="text-fg-muted hover:text-fg break-all">
                          {email2Line}
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              ) : null}

              {phoneLine ? (
                <div className="flex gap-4">
                  <div className="text-3xl shrink-0">📞</div>
                  <div className="min-w-0">
                    <h4 className="text-fg font-semibold mb-1">{t('contact.phone')}</h4>
                    <a href={`tel:${phoneLine.replace(/\s/g, '')}`} className="text-fg-muted hover:text-fg">
                      {phoneLine}
                    </a>
                  </div>
                </div>
              ) : null}

              {showHotline ? (
                <div className="flex gap-4">
                  <div className="text-3xl shrink-0">☎️</div>
                  <div className="min-w-0">
                    <h4 className="text-fg font-semibold mb-1">{t('contact.hotline')}</h4>
                    <a href={`tel:${hotlineLine!.replace(/\s/g, '')}`} className="text-fg-muted hover:text-fg">
                      {hotlineLine}
                    </a>
                  </div>
                </div>
              ) : null}

              {info?.socialLinks?.length ? (
                <CompanySocialLinks links={info.socialLinks} showHeading className="pt-2 border-t border-white/10" />
              ) : null}

              {!emailLine && !email2Line && !phoneLine && !addressLine && !info?.socialLinks?.length ? (
                <p className="text-fg-subtle text-sm">{t('contact.mapPlaceholder')}</p>
              ) : null}
            </div>
          )}
        </div>
      </section>

      {/* ==================== MAP / FIND US ==================== */}
      <section className="mb-12">
        <div className="glass p-8 rounded-3xl">
          <h2 className="text-3xl font-bold text-fg mb-6">{t('contact.findUs')}</h2>
          <div className="rounded-2xl overflow-hidden border border-white/20 bg-black/20 aspect-16/10 min-h-64 md:min-h-96">
            {info?.mapEmbedSrc ? (
              <iframe
                title={t('contact.findUs')}
                src={info.mapEmbedSrc}
                className="w-full h-full min-h-64 md:min-h-96"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="h-full min-h-64 md:min-h-96 flex flex-col items-center justify-center p-6 text-center">
                <div className="text-5xl mb-3">🗺️</div>
                <p className="text-fg-muted max-w-md">{t('contact.mapPlaceholder')}</p>
                {addressLine ? (
                  <p className="text-fg-subtle text-sm mt-3 whitespace-pre-line">{addressLine}</p>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
