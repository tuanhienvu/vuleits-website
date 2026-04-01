'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

export type ThemeMode = 'light' | 'dark';

const STORAGE_KEY = 'vuleits-theme';

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (mode: ThemeMode) => void;
  toggleTheme: () => void;
  mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function applyThemeClass(mode: ThemeMode) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.classList.remove('light', 'dark');
  root.classList.add(mode);
  root.style.colorScheme = mode;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>('dark');
  const [mounted, setMounted] = useState(false);

  const setTheme = useCallback((mode: ThemeMode) => {
    // Force dark mode only. (Light-mode UI was causing readability regressions.)
    void mode;
    setThemeState('dark');
    applyThemeClass('dark');
    try {
      localStorage.setItem(STORAGE_KEY, 'dark');
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    setMounted(true);
    try {
      // Always apply dark mode (ignore persisted preference).
      setThemeState('dark');
      applyThemeClass('dark');
    } catch {
      applyThemeClass('dark');
    }
  }, []);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      // Ignore storage events so light mode can't re-activate.
      if (e.key !== STORAGE_KEY) return;
      void e;
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleTheme = useCallback(() => {
    // Light mode toggle is disabled; keep dark.
    setTheme('dark');
  }, [theme, setTheme]);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
      mounted,
    }),
    [theme, setTheme, toggleTheme, mounted],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }
  return ctx;
}
