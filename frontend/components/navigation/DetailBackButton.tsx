'use client';

import { useRouter } from 'next/navigation';

type Props = {
  /** Used when there is no history to go back to (e.g. opened in a new tab). */
  fallbackHref: string;
  label?: string;
  className?: string;
  /** When set, replaces default back / fallback navigation (e.g. run exit animation first). */
  onCustomNavigate?: () => void;
};

// --- Section: history.back() with fallback href ---

export default function DetailBackButton({
  fallbackHref,
  label = 'Back',
  className,
  onCustomNavigate,
}: Props) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => {
        if (onCustomNavigate) {
          onCustomNavigate();
          return;
        }
        if (typeof window !== 'undefined' && window.history.length > 1) {
          router.back();
        } else {
          router.push(fallbackHref);
        }
      }}
      className={
        className ??
        'mb-4 inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-3 py-2 text-sm font-medium text-white/90 transition hover:bg-white/10'
      }
    >
      <span aria-hidden>←</span> {label}
    </button>
  );
}
