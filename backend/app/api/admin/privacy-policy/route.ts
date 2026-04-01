import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import {
  PRIVACY_POLICY_SETTING_KEY,
  parseLegalPageJson,
  serializeLegalPagePayload,
  type LegalPagePayload,
} from '@/lib/legalPageSetting';
import { sanitizeAboutIntroBodyHtml } from '@/lib/sanitizeAboutIntroHtml';

export async function GET(req: Request) {
  const auth = await authorize(req, 'aboutTeam.read');
  if (auth.error) return auth.error;

  const row = await prisma.siteSetting.findUnique({ where: { key: PRIVACY_POLICY_SETTING_KEY } });
  const payload = parseLegalPageJson(row?.value ?? null, 'privacy');
  return NextResponse.json(payload);
}

export async function PUT(req: Request) {
  const auth = await authorize(req, 'aboutTeam.update');
  if (auth.error) return auth.error;

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const payload: LegalPagePayload = {
    titleEn: typeof o.titleEn === 'string' ? o.titleEn.slice(0, 300) : '',
    titleVi: typeof o.titleVi === 'string' ? o.titleVi.slice(0, 300) : '',
    bodyEn:
      typeof o.bodyEn === 'string' && o.bodyEn.trim()
        ? sanitizeAboutIntroBodyHtml(o.bodyEn.slice(0, 40000))
        : '',
    bodyVi:
      typeof o.bodyVi === 'string' && o.bodyVi.trim()
        ? sanitizeAboutIntroBodyHtml(o.bodyVi.slice(0, 40000))
        : '',
    updatedAtLabelEn: typeof o.updatedAtLabelEn === 'string' ? o.updatedAtLabelEn.slice(0, 200) : '',
    updatedAtLabelVi: typeof o.updatedAtLabelVi === 'string' ? o.updatedAtLabelVi.slice(0, 200) : '',
  };

  await prisma.siteSetting.upsert({
    where: { key: PRIVACY_POLICY_SETTING_KEY },
    create: { key: PRIVACY_POLICY_SETTING_KEY, value: serializeLegalPagePayload(payload) },
    update: { value: serializeLegalPagePayload(payload) },
  });

  return NextResponse.json({ ok: true, ...payload });
}

