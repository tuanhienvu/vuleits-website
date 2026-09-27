'use client';

/**
 * Full-screen modal preview for media library items.
 *
 * - Images: large `object-contain` preview (lightbox-style).
 * - Videos: `MediaVideoPlayer` (Plyr) with standard controls.
 * - PDF: open in new tab (iframe embedding is often blocked by CSP / X-Frame-Options).
 * - Unsupported: message + link to open URL.
 *
 * Accessibility: `role="dialog"`, `aria-modal`, labelled close control, Escape via `useEscapeToClose`.
 */

import { useEffect, useId, useRef, useState } from 'react';
import { useEscapeToClose } from '@/components/admin/useEscapeToClose';
import { normalizePublicAssetUrlForBrowser } from '@/lib/normalizePublicAssetUrl';
import MediaVideoPlayer from '@/components/admin/media/MediaVideoPlayer';
import { isImageMime, isPdfMime, isVideoMime } from '@/components/admin/media/mediaKinds';

export type MediaPreviewItem = {
  id: number;
  url: string;
  filename: string;
  mimeType: string;
};

type Props = {
  item: MediaPreviewItem;
  onClose: () => void;
  /** i18n helper from `useLocale().t` */
  t: (key: string, vars?: Record<string, string>) => string;
};

/** Mount only when `item` is non-null (parent) so Plyr chunk loads on first open. */
export default function MediaPreviewModal({ item, onClose, t }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const [imageFailed, setImageFailed] = useState(false);
  useEscapeToClose(true, onClose);

  useEffect(() => {
    setImageFailed(false);
  }, [item.id]);

  useEffect(() => {
    const id = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => window.clearTimeout(id);
  }, [item.id]);

  const url = normalizePublicAssetUrlForBrowser(item.url);
  const showImage = isImageMime(item.mimeType);
  const showVideo = isVideoMime(item.mimeType);
  const showPdf = isPdfMime(item.mimeType);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-white/15 bg-zinc-950 shadow-2xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
          <h2 id={titleId} className="min-w-0 flex-1 truncate text-sm font-medium text-white sm:text-base">
            {item.filename}
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="shrink-0 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-sm text-white hover:bg-white/20 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-emerald-400"
            onClick={onClose}
            aria-label={t('admin.mediaClosePreview')}
          >
            {t('admin.mediaClosePreview')}
          </button>
        </div>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-auto p-4">
          {showImage && !imageFailed ? (
            <div className="flex max-h-[min(85vh,1200px)] w-full items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={url}
                alt={item.filename}
                className="max-h-[min(85vh,1200px)] w-auto max-w-full object-contain"
                loading="eager"
                decoding="async"
                onError={() => setImageFailed(true)}
              />
            </div>
          ) : null}

          {showImage && imageFailed ? (
            <p className="text-center text-sm text-amber-200/90" role="alert">
              {t('admin.mediaPreviewError')}
            </p>
          ) : null}

          {showVideo ? (
            <MediaVideoPlayer src={url} mimeType={item.mimeType} title={item.filename} />
          ) : null}

          {showPdf ? (
            <div className="max-w-lg space-y-4 px-4 text-center text-white/90">
              <p className="text-sm">{t('admin.mediaPdfHint')}</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-lg border border-emerald-400/40 bg-emerald-500/20 px-4 py-2 text-sm text-emerald-100 hover:bg-emerald-500/30 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-emerald-400"
              >
                {t('admin.mediaOpenPdfNewTab')}
              </a>
            </div>
          ) : null}

          {!showImage && !showVideo && !showPdf ? (
            <div className="max-w-md space-y-3 px-4 text-center">
              <p className="text-sm text-amber-200/90">{t('admin.mediaUnsupportedPreview')}</p>
              <p className="break-all text-xs text-white/50">{item.mimeType}</p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-emerald-300 underline hover:text-emerald-200 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-emerald-400"
              >
                {t('admin.mediaOpenInNewTab')}
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
