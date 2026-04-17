'use client';

import { useEffect, useState } from 'react';
import { useLocale } from '@/components/providers/LocaleProvider';
import {
  defaultLegalPagePayload,
  type LegalPagePublic,
} from '@/lib/legalPageSetting';
import { apiPath } from '@/lib/apiRoutes';

// --- Sections: Terms header | Rich body from admin-managed API ---

export default function TermsOfServicePage() {
  const { locale } = useLocale();
  const fallback = defaultLegalPagePayload('terms');
  const [data, setData] = useState<LegalPagePublic>({
    title: locale === 'vi-VN' ? fallback.titleVi : fallback.titleEn,
    bodyHtml: locale === 'vi-VN' ? fallback.bodyVi : fallback.bodyEn,
    updatedAtLabel: locale === 'vi-VN' ? fallback.updatedAtLabelVi : fallback.updatedAtLabelEn,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${apiPath('terms-of-service')}?locale=${encodeURIComponent(locale)}`);
        if (!res.ok || cancelled) return;
        const payload = (await res.json()) as LegalPagePublic;
        if (!cancelled) setData(payload);
      } catch {
        // keep fallback
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [locale]);

  return (
    <div className="container mx-auto px-4">
      <section className="glass p-8 md:p-12 rounded-3xl mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-fg mb-4">{data.title}</h1>
        <p className="text-fg-muted text-sm">{data.updatedAtLabel}</p>
      </section>

      <section className="glass p-8 md:p-12 rounded-3xl mb-12">
        <div
          className="public-prose-rich max-w-none text-fg-muted [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:text-(--text-primary) [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_h2]:text-(--text-primary) [&_h3]:text-xl [&_h3]:text-(--text-primary) [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-(--link-color) [&_a]:underline [&_a]:hover:text-(--link-hover)"
          dangerouslySetInnerHTML={{ __html: data.bodyHtml }}
        />
      </section>
    </div>
  );
}

