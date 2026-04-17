import { prisma } from './prisma';
import { log } from './logger';

/** Persists a row for the admin Audit log UI (ADMIN read / SYSADMIN update+delete). Best-effort; never throws. */
export async function persistAdminLog(params: {
  level: string;
  category?: string;
  message: string;
  metadata?: unknown;
  traceId?: string;
}): Promise<void> {
  try {
    let metaJson: object | undefined;
    if (params.metadata !== undefined) {
      metaJson = JSON.parse(JSON.stringify(params.metadata)) as object;
    }
    await prisma.adminLogEntry.create({
      data: {
        level: params.level.slice(0, 20),
        category: params.category ? params.category.slice(0, 120) : null,
        message: params.message.slice(0, 2000),
        metadata: metaJson,
        traceId: params.traceId ? params.traceId.slice(0, 64) : null,
      },
    });
  } catch (e) {
    log.warn('admin_log.persist_failed', {
      event: { category: 'database', action: 'admin_log.insert', outcome: 'failure' },
      error: e instanceof Error ? { message: e.message, type: e.name } : { message: String(e) },
    });
  }
}
