import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { resolveContactNotificationTo, sendContactFormNotification } from '@/lib/contactNotificationEmail';

function clampStr(s: string, max: number): string {
  return s.length <= max ? s : s.slice(0, max);
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rate = checkRateLimit(`contact-form:${ip}`, 8, 15 * 60 * 1000);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: 'Too many submissions. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rate.retryAfterSeconds) },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const o = body as Record<string, unknown>;
  const name = typeof o.name === 'string' ? clampStr(o.name.trim(), 200) : '';
  const email = typeof o.email === 'string' ? clampStr(o.email.trim(), 254) : '';
  const subject = typeof o.subject === 'string' ? clampStr(o.subject.trim(), 500) : '';
  const message = typeof o.message === 'string' ? clampStr(o.message.trim(), 20000) : '';
  const phoneRaw = typeof o.phone === 'string' ? o.phone.trim() : '';
  const phone = phoneRaw ? clampStr(phoneRaw, 40) : null;

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const row = await prisma.contact.create({
    data: {
      name,
      email,
      subject: subject || null,
      phone,
      message,
      status: 'New',
    },
  });

  let emailSent = false;
  let emailNote: string | undefined;

  const notifyTo = await resolveContactNotificationTo();
  if (notifyTo) {
    const result = await sendContactFormNotification(notifyTo, { name, email, subject, message });
    emailSent = result.ok;
    if (!result.ok && result.error) {
      emailNote = result.skipped ? 'Email delivery is not configured (SMTP).' : result.error;
    }
  } else {
    emailNote = 'No notification recipient configured (set CONTACT_NOTIFICATION_TO or company profile email).';
  }

  return NextResponse.json(
    {
      ok: true,
      id: row.id,
      emailSent,
      emailNote: emailNote ?? null,
    },
    { status: 201 },
  );
}
