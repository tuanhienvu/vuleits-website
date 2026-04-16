'use client';

import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import {
  type Locale,
  defaultMessagesByLocale,
  UI_LOCALES,
} from '@/lib/locale/defaultMessages';
import { apiPath } from '@/lib/apiRoutes';

export type { Locale };

type Messages = Record<string, string>;

type Overrides = Partial<Record<Locale, Partial<Messages>>>;
type CachedOverridesPayload = { ts: number; data: Overrides };

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string>) => string;
  /** Reload overrides from API (e.g. after admin saves translations). */
  refreshUiMessages: () => Promise<void>;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

const STORAGE_KEY = 'app_locale';
const OVERRIDES_CACHE_KEY = 'vuleits:ui-messages-cache:v1';
const OVERRIDES_TTL_MS = 5 * 60 * 1000;

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
  const [hydrated, setHydrated] = useState(false);
  const [overrides, setOverrides] = useState<Overrides | null>(null);

  const refreshUiMessages = useCallback(async () => {
    try {
      const res = await fetch(apiPath('ui-messages'));
      if (!res.ok) return;
      const data = (await res.json()) as unknown;
      const parsed = parseOverridesPayload(data);
      setOverrides(parsed);
      try {
        const payload: CachedOverridesPayload = { ts: Date.now(), data: parsed };
        window.localStorage.setItem(OVERRIDES_CACHE_KEY, JSON.stringify(payload));
      } catch {
        // ignore storage errors
      }
    } catch {
      // keep built-in defaults
    }
  }, []);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(OVERRIDES_CACHE_KEY);
      if (raw) {
        const cached = JSON.parse(raw) as CachedOverridesPayload;
        if (Date.now() - cached.ts < OVERRIDES_TTL_MS && cached.data) {
          setOverrides(cached.data);
        }
      }
    } catch {
      // ignore cache parse/storage errors
    }
    const id = requestAnimationFrame(() => {
      void refreshUiMessages();
    });
    return () => cancelAnimationFrame(id);
  }, [refreshUiMessages]);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'vi-VN' || saved === 'en-US') {
        setLocaleState(saved);
      }
    } catch {
      // ignore storage read errors
    } finally {
      setHydrated(true);
    }
  }, []);

  const effectiveLocale: Locale = hydrated ? locale : 'en-US';

  useEffect(() => {
    if (typeof document !== 'undefined') document.documentElement.lang = effectiveLocale;
  }, [effectiveLocale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
    if (typeof document !== 'undefined') {
      document.documentElement.lang = next;
    }
  }, []);

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale: effectiveLocale,
      setLocale,
      refreshUiMessages,
      t: (key, vars) => {
        let s = resolveString(effectiveLocale, key, defaultMessagesByLocale, overrides);
        if (vars) {
          for (const [k, v] of Object.entries(vars)) {
            s = s.split(`{{${k}}}`).join(v);
          }
        }
        return s;
      },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refreshUiMessages is useCallback([]) stable
    [effectiveLocale, overrides, setLocale],
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
