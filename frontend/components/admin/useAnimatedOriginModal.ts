'use client';

import { useCallback, useState } from 'react';

export type ModalOriginPoint = { x: number; y: number };

/** Center of an element in viewport coordinates, for modal `transformOrigin`. */
export function getModalOriginFromElement(el: HTMLElement | null | undefined): ModalOriginPoint {
  if (!el) {
    return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  }
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

export function useAnimatedOriginModal(durationMs = 600, onAfterClose?: () => void) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [origin, setOrigin] = useState<ModalOriginPoint>({ x: 0, y: 0 });

  const openFromElement = useCallback((el?: HTMLElement | null) => {
    setClosing(false);
    setOrigin(getModalOriginFromElement(el));
    setOpen(true);
  }, []);

  const openCentered = useCallback(() => {
    openFromElement(null);
  }, [openFromElement]);

  const closeAnimated = useCallback(async () => {
    if (!open || closing) return;
    setClosing(true);
    await new Promise((resolve) => window.setTimeout(resolve, durationMs));
    setOpen(false);
    setClosing(false);
    onAfterClose?.();
  }, [open, closing, durationMs, onAfterClose]);

  return {
    open,
    closing,
    origin,
    durationMs,
    setOpen,
    openFromElement,
    openCentered,
    closeAnimated,
  };
}
