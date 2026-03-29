'use client';

import { useEffect, useRef } from 'react';

/**
 * Registers document keydown: Escape calls onClose while `active` is true.
 * Use a single hook per component; for stacked overlays, use one hook with a handler that closes the top layer first.
 */
export function useEscapeToClose(active: boolean, onClose: () => void | Promise<void>) {
  const onCloseRef = useRef(onClose);

  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!active) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      void Promise.resolve(onCloseRef.current());
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [active]);
}
