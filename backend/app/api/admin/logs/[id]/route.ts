import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { userIsSysadmin } from '@/lib/adminLogsRole';
import { persistAdminLog } from '@/lib/adminLogPersistence';

function clampStr(s: string, max: number): string {
  const t = s.trim();
  return t.length <= max ? t : t.slice(0, max);
}

export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = await authorize(request, 'auditLogs.update');
  if (auth.error) return auth.error;
  if (!(await userIsSysadmin(auth.user.id))) {
    return NextResponse.json({ error: 'Only SYSADMIN can update audit log entries' }, { status: 403 });
  }

  const { id: idStr } = await ctx.params;
  const id = Number(idStr);
  if (!Number.isFinite(id) || id < 1) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const note = typeof (body as { note?: unknown })?.note === 'string' ? (body as { note: string }).note : '';
  const traceId = request.headers.get('x-request-id')?.trim() ?? undefined;

  const existing = await prisma.adminLogEntry.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const updated = await prisma.adminLogEntry.update({
    where: { id },
    data: { note: note.length ? clampStr(note, 8000) : null },
    select: {
      id: true,
      level: true,
      category: true,
      message: true,
      metadata: true,
      traceId: true,
      note: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  void persistAdminLog({
    level: 'info',
    category: 'audit_log',
    message: 'admin.audit_log.note_updated',
    metadata: { entry_id: id },
    traceId,
  });

  return NextResponse.json({ ok: true, item: updated });
}

export async function DELETE(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const auth = await authorize(request, 'auditLogs.delete');
  if (auth.error) return auth.error;
  if (!(await userIsSysadmin(auth.user.id))) {
    return NextResponse.json({ error: 'Only SYSADMIN can delete audit log entries' }, { status: 403 });
  }

  const { id: idStr } = await ctx.params;
  const id = Number(idStr);
  if (!Number.isFinite(id) || id < 1) {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 });
  }

  const traceId = request.headers.get('x-request-id')?.trim() ?? undefined;

  const existing = await prisma.adminLogEntry.findFirst({
    where: { id, deletedAt: null },
  });
  if (!existing) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  await prisma.adminLogEntry.update({
    where: { id },
    data: { deletedAt: new Date() },
  });

  void persistAdminLog({
    level: 'info',
    category: 'audit_log',
    message: 'admin.audit_log.entry_deleted',
    metadata: { entry_id: id },
    traceId,
  });

  return NextResponse.json({ ok: true });
}
