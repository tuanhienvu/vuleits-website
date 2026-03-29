'use client';

import { useCallback, useState } from 'react';
import type { ModalOriginPoint } from '@/components/admin/useAnimatedOriginModal';
import { useEscapeToClose } from '@/components/admin/useEscapeToClose';

type AdminConfirmDialogProps = {
  open: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  confirming?: boolean;
  origin?: ModalOriginPoint | null;
  onCancel: () => void;
  onConfirm: () => void;
};

// --- Sections (UI): Backdrop | Modal panel (title, message, actions) ---

export default function AdminConfirmDialog({
  open,
  title,
  message,
  confirmText = 'Delete',
  cancelText = 'Cancel',
  confirming = false,
  origin = null,
  onCancel,
  onConfirm,
}: AdminConfirmDialogProps) {
  const ANIM_MS = 600;
  const [closing, setClosing] = useState(false);

  const cancelWithAnim = useCallback(() => {
    if (confirming || closing) return;
    setClosing(true);
    window.setTimeout(() => {
      onCancel();
      setClosing(false);
    }, ANIM_MS);
  }, [confirming, closing, onCancel]);

  useEscapeToClose(Boolean(open && !confirming && !closing), cancelWithAnim);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-70 flex items-center justify-center p-4">
      {/* ==================== BACKDROP ==================== */}
      <div className="absolute inset-0 bg-black/60" onClick={cancelWithAnim} />
      {/* ==================== CONFIRM PANEL ==================== */}
      <div
        className="relative glass w-full max-w-md rounded-2xl border border-white/15 p-5 space-y-4 shadow-xl"
        style={{
          transformOrigin: origin ? `${origin.x}px ${origin.y}px` : undefined,
          animation: closing
            ? `modal-zoom-out ${ANIM_MS}ms cubic-bezier(0.22, 0.61, 0.36, 1) forwards`
            : `modal-zoom-in ${ANIM_MS}ms cubic-bezier(0.16, 1, 0.3, 1) forwards`,
        }}
      >
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/75 leading-relaxed">{message}</p>
        <div className="flex justify-end gap-2 pt-1">
          <button type="button" className="btn-admin-secondary" onClick={cancelWithAnim} disabled={confirming || closing}>
            {cancelText}
          </button>
          <button type="button" className="btn-admin-danger" onClick={onConfirm} disabled={confirming}>
            {confirming ? 'Deleting…' : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

