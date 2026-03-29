'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/** Curated presets for team / profile / work UI (single grapheme each). */
const EMOJI_PRESETS = [
  '👤',
  '👥',
  '🤝',
  '🧑‍💻',
  '👩‍💻',
  '🧑‍💼',
  '👩‍💼',
  '🧑‍🎨',
  '👩‍🎨',
  '🧑‍🔬',
  '👩‍🔬',
  '🧑‍🏫',
  '👔',
  '💼',
  '📊',
  '📈',
  '🎯',
  '✅',
  '⚡',
  '🔧',
  '🛠️',
  '💡',
  '🌟',
  '⭐',
  '🚀',
  '🏆',
  '💻',
  '🖥️',
  '📱',
  '🌐',
  '🔒',
  '☁️',
  '⚙️',
  '🧩',
  '✨',
  '🎉',
  '❤️',
  '🔥',
  '📣',
  '🎤',
  '📝',
  '🏢',
  '🌍',
  '💬',
  '🤖',
  '⚖️',
  '📋',
] as const;

// --- Sections: Preset grid (portal) | Trigger + custom input | Position & escape handlers ---

export type AdminEmojiPickerFieldProps = {
  value: string;
  onChange: (next: string) => void;
  disabled?: boolean;
  labels: { field: string; choose: string; custom: string; openPicker: string };
  id?: string;
};

export default function AdminEmojiPickerField({
  value,
  onChange,
  disabled,
  labels,
  id = 'emoji-picker',
}: AdminEmojiPickerFieldProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [panelStyle, setPanelStyle] = useState<{ top: number; left: number; width: number }>({
    top: 0,
    left: 0,
    width: 280,
  });

  const updatePosition = useCallback(() => {
    const el = triggerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const w = Math.max(r.width, 280);
    let left = r.left;
    if (left + w > window.innerWidth - 8) left = Math.max(8, window.innerWidth - w - 8);
    setPanelStyle({ top: r.bottom + 6, left, width: w });
  }, []);

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const onScroll = () => {
      updatePosition();
    };
    const onResize = () => updatePosition();
    window.addEventListener('scroll', onScroll, true);
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('scroll', onScroll, true);
      window.removeEventListener('resize', onResize);
    };
  }, [open, updatePosition]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node;
      if (triggerRef.current?.contains(t) || panelRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopImmediatePropagation();
      setOpen(false);
    };
    document.addEventListener('keydown', onKey, true);
    return () => document.removeEventListener('keydown', onKey, true);
  }, [open]);

  const pick = (emoji: string) => {
    onChange(emoji);
    setOpen(false);
  };

  const panel =
    open && typeof document !== 'undefined' ? (
      <div
        ref={panelRef}
        id={`${id}-panel`}
        role="listbox"
        aria-label={labels.choose}
        className="fixed z-100 rounded-xl border border-white/15 bg-[#1a1a24] shadow-2xl shadow-black/40 p-3 max-h-[min(320px,calc(100vh-120px))] overflow-y-auto"
        style={{ top: panelStyle.top, left: panelStyle.left, width: panelStyle.width }}
      >
        <p className="text-white/50 text-xs mb-2">{labels.choose}</p>
        <div className="grid grid-cols-8 gap-1.5" role="none">
          {EMOJI_PRESETS.map((emoji) => (
            <button
              key={emoji}
              type="button"
              role="option"
              aria-selected={value === emoji}
              className="flex h-9 w-full items-center justify-center rounded-lg text-xl leading-none bg-white/5 hover:bg-white/15 border border-transparent hover:border-white/20 transition"
              onClick={() => pick(emoji)}
            >
              {emoji}
            </button>
          ))}
        </div>
        <label className="block mt-3 pt-3 border-t border-white/10">
          <span className="text-white/50 text-xs block mb-1">{labels.custom}</span>
          <input
            type="text"
            className="w-full px-2 py-1.5 rounded-lg bg-white/10 border border-white/20 text-white text-sm"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="…"
            aria-label={labels.custom}
          />
        </label>
      </div>
    ) : null;

  return (
    <div className="min-w-0">
      {/* ==================== LABEL & TRIGGER ==================== */}
      <span className="text-white/70 text-sm block mb-1" id={`${id}-label`}>
        {labels.field}
      </span>
      <div className="flex gap-2 min-w-0">
        <button
          ref={triggerRef}
          type="button"
          id={id}
          disabled={disabled}
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? `${id}-panel` : undefined}
          aria-labelledby={`${id}-label`}
          onClick={() => {
            if (disabled) return;
            setOpen((o) => !o);
          }}
          className="mt-0 flex min-w-0 flex-1 items-center justify-between gap-2 rounded-lg border border-white/20 bg-white/10 px-3 py-2 text-left text-white hover:bg-white/15 disabled:opacity-50"
          aria-label={labels.openPicker}
        >
          <span className="text-2xl leading-none truncate" title={value || undefined}>
            {value || '—'}
          </span>
          <span className="text-white/50 text-xs shrink-0">{open ? '▲' : '▼'}</span>
        </button>
      </div>
      {/* ==================== PORTAL: PRESET PANEL TO DOCUMENT BODY ==================== */}
      {typeof document !== 'undefined' && createPortal(panel, document.body)}
    </div>
  );
}
