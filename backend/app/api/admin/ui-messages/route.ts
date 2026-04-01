import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { jsonObjectBody } from '@/lib/jsonBody';

const LOCALES = new Set(['en-US', 'vi-VN']);
const KEY_RE = /^[a-z][a-z0-9._-]*$/i;
const MAX_KEY_LEN = 180;

/** Admin: list overrides (same shape as public GET). */
export async function GET(req: Request) {
  const auth = await authorize(req, 'uiTexts.read');
  if (auth.error) return auth.error;

  const rows = await prisma.uiMessage.findMany({
    select: { locale: true, messageKey: true, value: true },
    orderBy: [{ locale: 'asc' }, { messageKey: 'asc' }],
  });

  const out: Record<string, Record<string, string>> = { 'en-US': {}, 'vi-VN': {} };
  for (const r of rows) {
    if (!LOCALES.has(r.locale)) continue;
    out[r.locale]![r.messageKey] = r.value;
  }

  return NextResponse.json(out);
}

type Entry = { locale?: unknown; key?: unknown; value?: unknown };

/** Admin: upsert or delete overrides. Empty string value removes row (revert to default). */
export async function PUT(req: Request) {
  const auth = await authorize(req, 'uiTexts.update');
  if (auth.error) return auth.error;

  const body = jsonObjectBody(await req.json());
  const raw = body.entries;
  if (!Array.isArray(raw)) {
    return NextResponse.json({ error: 'entries must be an array' }, { status: 400 });
  }

  const items = raw as Entry[];
  try {
    await prisma.$transaction(
      async (tx) => {
        for (const item of items) {
          const locale = typeof item.locale === 'string' ? item.locale : '';
          const messageKey = typeof item.key === 'string' ? item.key.trim() : '';
          const value = item.value === undefined || item.value === null ? '' : String(item.value);

          if (!LOCALES.has(locale)) {
            throw new Error(`INVALID_LOCALE:${locale}`);
          }
          if (!messageKey || messageKey.length > MAX_KEY_LEN || !KEY_RE.test(messageKey)) {
            throw new Error(`INVALID_KEY:${messageKey}`);
          }

          if (value.trim() === '') {
            await tx.uiMessage.deleteMany({ where: { locale, messageKey } });
          } else {
            await tx.uiMessage.upsert({
              where: { locale_messageKey: { locale, messageKey } },
              create: { locale, messageKey, value },
              update: { value },
            });
          }
        }
      },
      { timeout: 120_000 },
    );
  } catch (e) {
    const msg = e instanceof Error ? e.message : '';
    if (msg.startsWith('INVALID_LOCALE:')) {
      return NextResponse.json({ error: `Invalid locale: ${msg.slice('INVALID_LOCALE:'.length)}` }, { status: 400 });
    }
    if (msg.startsWith('INVALID_KEY:')) {
      return NextResponse.json({ error: `Invalid key: ${msg.slice('INVALID_KEY:'.length)}` }, { status: 400 });
    }
    throw e;
  }

  return NextResponse.json({ ok: true });
}
