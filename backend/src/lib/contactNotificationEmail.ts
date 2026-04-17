import nodemailer from 'nodemailer';
import { prisma } from '@/lib/prisma';
import { COMPANY_PROFILE_SETTING_KEY, parseCompanyProfileJson } from '@/lib/companyProfileTypes';
import { log } from '@/lib/logger';

export type ContactFormPayload = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function smtpConfigured(): boolean {
  const host = process.env.SMTP_HOST?.trim();
  const from = process.env.SMTP_FROM?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !from) return false;
  // Most providers (including Gmail) require auth when a user is set.
  if (user && !pass) return false;
  return true;
}

export async function resolveContactNotificationTo(): Promise<string | null> {
  const envTo = process.env.CONTACT_NOTIFICATION_TO?.trim();
  if (envTo) return envTo;

  const row = await prisma.siteSetting.findUnique({ where: { key: COMPANY_PROFILE_SETTING_KEY } });
  const profile = parseCompanyProfileJson(row?.value ?? null);
  const primary = profile.email.trim();
  if (primary) return primary;
  const secondary = profile.email2.trim();
  return secondary || null;
}

function isGmailHost(host: string): boolean {
  return host.toLowerCase().includes('gmail.com');
}

function buildTransport() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT || '587') || 587;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const secure = process.env.SMTP_SECURE === '1' || process.env.SMTP_SECURE === 'true';

  if (!host) return null;

  const auth = user && pass ? { user, pass } : undefined;
  const base = { host, port, secure, auth } as const;

  // Gmail on 587: STARTTLS (not "secure" socket); requireTLS avoids silent/plain issues.
  if (isGmailHost(host) && !secure && port === 587) {
    return nodemailer.createTransport({
      ...base,
      requireTLS: true,
    });
  }

  return nodemailer.createTransport(base);
}

/**
 * Sends a plain-text notification to site staff. If SMTP is not configured, returns without throwing.
 */
export async function sendContactFormNotification(
  to: string,
  payload: ContactFormPayload,
): Promise<{ ok: boolean; skipped?: boolean; error?: string }> {
  if (!smtpConfigured()) {
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASS?.trim();
    const host = process.env.SMTP_HOST?.trim();
    const from = process.env.SMTP_FROM?.trim();
    if (host && from && user && !pass) {
      return {
        ok: false,
        skipped: true,
        error:
          'SMTP_PASS is missing. If it contains # use double quotes in .env (e.g. SMTP_PASS="pass#here"). Gmail requires a 16-character App password with 2-Step Verification.',
      };
    }
    return { ok: false, skipped: true, error: 'SMTP not configured' };
  }

  const from = process.env.SMTP_FROM!.trim();
  const transport = buildTransport();
  if (!transport) {
    return { ok: false, skipped: true, error: 'SMTP transport unavailable' };
  }

  const subjectLine = payload.subject
    ? `[Website contact] ${payload.subject}`
    : '[Website contact] New message';

  const text = [
    'A visitor submitted the contact form on the website.',
    '',
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.subject ? `Subject: ${payload.subject}` : 'Subject: (none)',
    '',
    'Message:',
    payload.message,
    '',
    '—',
    'This is an automated message from the VULE ITS web portal.',
  ].join('\n');

  const ccRaw = process.env.CONTACT_NOTIFICATION_CC?.trim();
  const cc = ccRaw || undefined;

  try {
    await transport.sendMail({
      from,
      to,
      cc,
      replyTo: payload.email,
      subject: subjectLine,
      text,
    });
    return { ok: true };
  } catch (e) {
    const err = e as Error & { response?: string; responseCode?: number };
    const parts = [err.message, err.responseCode != null ? `code ${err.responseCode}` : '', err.response?.trim()].filter(Boolean);
    const msg = parts.length ? parts.join(' — ') : 'send failed';
    log.exception('email.contact_notification_failed', e, {
      event: { category: 'email', action: 'send', outcome: 'failure' },
      smtp: err.responseCode != null ? { response_code: err.responseCode } : undefined,
    });
    return { ok: false, error: msg };
  }
}
