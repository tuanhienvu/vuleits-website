'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

export type ToastVariant = 'success' | 'error' | 'info';

type ToastItem = {
  id: number;
  message: string;
  variant: ToastVariant;
};

type ToastOptions = {
  variant?: ToastVariant;
  /** ms; default 5000. Set 0 to disable auto-dismiss. */
  duration?: number;
};

type ToastContextValue = {
  push: (message: string, opts?: ToastOptions) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  info: (message: string, duration?: number) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION_MS = 5000;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const timersRef = useRef<Map<number, ReturnType<typeof setTimeout>>>(new Map());

  const remove = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) clearTimeout(timer);
    timersRef.current.delete(id);
  }, []);

  const push = useCallback(
    (message: string, opts?: ToastOptions) => {
      const text = (message || '').trim() || '—';
      const id = ++idRef.current;
      const variant = opts?.variant ?? 'info';
      const duration = opts?.duration ?? DEFAULT_DURATION_MS;
      setToasts((prev) => [...prev, { id, message: text, variant }]);
      if (duration > 0) {
        const timer = setTimeout(() => remove(id), duration);
        timersRef.current.set(id, timer);
      }
    },
    [remove],
  );

  useEffect(() => {
    const timers = timersRef.current;
    return () => {
      timers.forEach((t) => clearTimeout(t));
    };
  }, []);

  const value = useMemo<ToastContextValue>(
    () => ({
      push,
      success: (m, d) => push(m, { variant: 'success', duration: d ?? DEFAULT_DURATION_MS }),
      error: (m, d) => push(m, { variant: 'error', duration: d ?? DEFAULT_DURATION_MS }),
      info: (m, d) => push(m, { variant: 'info', duration: d ?? DEFAULT_DURATION_MS }),
    }),
    [push],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="fixed top-4 right-4 z-[10000] flex flex-col gap-2 items-end pointer-events-none max-w-[min(420px,calc(100vw-2rem))]"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`toast-pop pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 shadow-xl backdrop-blur-md text-sm font-medium ${
              t.variant === 'success'
                ? 'bg-emerald-950/92 border-emerald-500/45 text-emerald-50'
                : t.variant === 'error'
                  ? 'bg-red-950/92 border-red-500/45 text-red-50'
                  : 'bg-[#14141c]/95 border-white/20 text-white'
            }`}
          >
            <span className="flex-1 break-words text-left">{t.message}</span>
            <button
              type="button"
              onClick={() => remove(t.id)}
              className="shrink-0 opacity-70 hover:opacity-100 -mr-1 -mt-0.5 px-1 leading-none text-lg"
              aria-label="Dismiss"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error('useToast must be used within ToastProvider');
  }
  return ctx;
}
