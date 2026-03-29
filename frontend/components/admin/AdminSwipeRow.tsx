'use client';

import { useCallback, useRef, useState, type ReactNode } from 'react';
import AdminEditIcon from '@/components/admin/AdminEditIcon';
import AdminTrashIcon from '@/components/admin/AdminTrashIcon';

const ACTION_PX = 72;

export type AdminSwipeRowProps = {
  children: ReactNode;
  className?: string;
  /** Shown from md breakpoint; row actions (edit/delete icons). Hidden on small screens—use swipe instead. */
  actionsDesktop?: ReactNode;
  canEdit?: boolean;
  canDelete?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
  editLabel?: string;
  deleteLabel?: string;
};

export default function AdminSwipeRow({
  children,
  className = '',
  actionsDesktop,
  canEdit = false,
  canDelete = false,
  onEdit,
  onDelete,
  editLabel = 'Edit',
  deleteLabel = 'Delete',
}: AdminSwipeRowProps) {
  const [tx, setTx] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const startTx = useRef(0);

  const clamp = useCallback(
    (v: number) => {
      const max = canEdit ? ACTION_PX : 0;
      const min = canDelete ? -ACTION_PX : 0;
      return Math.max(min, Math.min(max, v));
    },
    [canEdit, canDelete],
  );

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length !== 1) return;
    setDragging(true);
    startX.current = e.touches[0].clientX;
    startTx.current = tx;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!dragging || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - startX.current;
    setTx(clamp(startTx.current + dx));
  };

  const endTouch = () => {
    if (!dragging) return;
    setDragging(false);
    setTx((t) => {
      if (t > ACTION_PX / 2) return canEdit ? ACTION_PX : 0;
      if (t < -ACTION_PX / 2) return canDelete ? -ACTION_PX : 0;
      return 0;
    });
  };

  const showSwipe = canEdit || canDelete;

  return (
    <div className={`flex w-full min-w-0 flex-col md:flex-row md:items-stretch ${className}`.trim()}>
      <div className={`relative min-w-0 flex-1 ${showSwipe ? 'max-md:overflow-hidden' : ''}`}>
        {canEdit ? (
          <button
            type="button"
            className="absolute left-0 top-0 z-0 flex h-full w-[72px] items-center justify-center bg-emerald-600/95 text-white md:hidden"
            aria-label={editLabel}
            onClick={() => {
              setTx(0);
              onEdit?.();
            }}
          >
            <span className="scale-110">
              <AdminEditIcon />
            </span>
          </button>
        ) : null}
        {canDelete ? (
          <button
            type="button"
            className="absolute right-0 top-0 z-0 flex h-full w-[72px] items-center justify-center bg-red-600/95 text-white md:hidden"
            aria-label={deleteLabel}
            onClick={() => {
              setTx(0);
              onDelete?.();
            }}
          >
            <span className="scale-110">
              <AdminTrashIcon />
            </span>
          </button>
        ) : null}
        <div
          className="relative z-10 bg-[#12121a] md:bg-transparent"
          style={
            showSwipe
              ? {
                  transform: `translateX(${tx}px)`,
                  transition: dragging ? 'none' : 'transform 0.22s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }
              : undefined
          }
          onTouchStart={showSwipe ? onTouchStart : undefined}
          onTouchMove={showSwipe ? onTouchMove : undefined}
          onTouchEnd={showSwipe ? endTouch : undefined}
          onTouchCancel={showSwipe ? endTouch : undefined}
        >
          <div className="flex min-w-0 flex-col md:flex-row md:items-stretch">
            <div className="min-w-0 flex-1">{children}</div>
            {actionsDesktop ? (
              <div className="hidden shrink-0 flex-row items-start gap-1 border-t border-white/10 p-3 md:flex md:border-t-0 md:border-l md:border-white/10 md:pl-3">
                {actionsDesktop}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
