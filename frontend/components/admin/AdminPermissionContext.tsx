'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  makeEmptyAdminMatrix,
  type AdminCrudMatrix,
  type AdminUiFeatureId,
} from '@/lib/adminPermissionModel';

type AdminPermissionContextValue = {
  matrix: AdminCrudMatrix;
  loading: boolean;
  refresh: () => Promise<void>;
  can: (feature: AdminUiFeatureId, action: 'create' | 'read' | 'update' | 'delete') => boolean;
};

const AdminPermissionContext = createContext<AdminPermissionContextValue | null>(null);

// --- Admin permissions: fetch /api/admin/me-permissions, matrix + can() ---

export function AdminPermissionProvider({ children }: { children: ReactNode }) {
  const [matrix, setMatrix] = useState<AdminCrudMatrix>(() => makeEmptyAdminMatrix());
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/me-permissions', { credentials: 'include' });
      if (!res.ok) {
        if (res.status === 401) window.location.href = '/admin/login';
        return;
      }
      const data = (await res.json()) as { features?: AdminCrudMatrix };
      if (data?.features && typeof data.features === 'object') {
        setMatrix(data.features);
      }
    } catch {
      // keep matrix as empty
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const can = useCallback(
    (feature: AdminUiFeatureId, action: 'create' | 'read' | 'update' | 'delete') =>
      Boolean(matrix[feature]?.[action]),
    [matrix],
  );

  const value = useMemo(
    () => ({ matrix, loading, refresh, can }),
    [matrix, loading, refresh, can],
  );

  return <AdminPermissionContext.Provider value={value}>{children}</AdminPermissionContext.Provider>;
}

export function useAdminPermissions(): AdminPermissionContextValue {
  const ctx = useContext(AdminPermissionContext);
  if (!ctx) {
    throw new Error('useAdminPermissions must be used inside AdminPermissionProvider');
  }
  return ctx;
}
