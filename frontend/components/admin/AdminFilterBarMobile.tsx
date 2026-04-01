'use client';

/**
 * Mobile (< md): collapsed filter UI — only a search icon until opened.
 * Desktop (md+): filter panel is always visible; toggle is hidden.
 */
export function adminFilterPanelClass(mobileOpen: boolean) {
  return mobileOpen ? 'block' : 'hidden md:block';
}

type AdminFilterSearchIconButtonProps = {
  open: boolean;
  onToggle: () => void;
  labelOpen: string;
  labelClose: string;
};

export function AdminFilterSearchIconButton({ open, onToggle, labelOpen, labelClose }: AdminFilterSearchIconButtonProps) {
  return (
    <div className="shrink-0 md:hidden">
      <button
        type="button"
        className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/30"
        onClick={onToggle}
        aria-expanded={open}
        aria-label={open ? labelClose : labelOpen}
      >
        {open ? (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
