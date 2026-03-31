'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import {
  type Locale,
  defaultMessagesByLocale,
  UI_LOCALES,
} from '@/lib/locale/defaultMessages';

export type { Locale };

type Messages = Record<string, string>;

type Overrides = Partial<Record<Locale, Partial<Messages>>>;

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string>) => string;
  /** Reload overrides from API (e.g. after admin saves translations). */
  refreshUiMessages: () => Promise<void>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = 'app_locale';

function parseOverridesPayload(data: unknown): Overrides {
  if (data === null || typeof data !== 'object' || Array.isArray(data)) return {};
  const root = data as Record<string, unknown>;
  const out: Overrides = {};
  for (const loc of UI_LOCALES) {
    const block = root[loc];
    if (block !== null && typeof block === 'object' && !Array.isArray(block)) {
      out[loc] = { ...(block as Record<string, string>) };
    }
  }
  return out;
}

function resolveString(
  locale: Locale,
  key: string,
  defaults: Record<Locale, Messages>,
  overrides: Overrides | null,
): string {
  const o = overrides?.[locale]?.[key];
  if (o !== undefined && o !== null && String(o).trim() !== '') return String(o);
  return defaults[locale][key] ?? defaults['en-US'][key] ?? key;
}

// --- LocaleProvider: localStorage + document.lang + t() + DB overrides ---

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en-US');
  const [overrides, setOverrides] = useState<Overrides | null>(null);

  const refreshUiMessages = useCallback(async () => {
    try {
      const res = await fetch('/api/ui-messages', { cache: 'no-store' });
      if (!res.ok) return;
      const data = (await res.json()) as unknown;
      setOverrides(parseOverridesPayload(data));
    } catch {
      // keep built-in defaults
    }
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => {
      void refreshUiMessages();
    });
    return () => cancelAnimationFrame(id);
  }, [refreshUiMessages]);

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (saved === 'en-US' || saved === 'vi-VN') {
      setLocaleState(saved);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') window.localStorage.setItem(STORAGE_KEY, locale);
    if (typeof document !== 'undefined') document.documentElement.lang = locale;
  }, [locale]);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale: (next) => setLocaleState(next),
      refreshUiMessages,
      t: (key, vars) => {
        let s = resolveString(locale, key, defaultMessagesByLocale, overrides);
        if (vars) {
          for (const [k, v] of Object.entries(vars)) {
            s = s.split(`{{${k}}}`).join(v);
          }
        }
        return s;
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refreshUiMessages is useCallback([]) stable
    [locale, overrides],
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used inside LocaleProvider');
  }
  return ctx;
}
