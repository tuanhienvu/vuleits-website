import { NextResponse } from 'next/server';
import { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signJWT } from '@/lib/jwt';
import { normalizeAdminEmail } from '@/lib/adminEmail';
import { checkRateLimit, getClientIp } from '@/lib/rateLimit';
import { createRequestLogger } from '@/lib/logger';
import { persistAdminLog } from '@/lib/adminLogPersistence';
import { authCookieSecure } from '@/lib/authCookieSecure';

export async function POST(request: Request) {
  const reqLog = createRequestLogger(request);
  const traceId = request.headers.get('x-request-id')?.trim() ?? undefined;
  const ip = getClientIp(request);
  const rate = await checkRateLimit(`admin-login:${ip}`, 10, 15 * 60 * 1000);
  if (!rate.allowed) {
    reqLog.warn('authentication.rate_limited', {
      event: { category: 'authentication', action: 'admin.login', outcome: 'denied', reason: 'rate_limit' },
      client: { ip },
    });
    void persistAdminLog({
      level: 'warn',
      category: 'authentication',
      message: 'admin.login.rate_limited',
      metadata: { client: { ip } },
      traceId,
    });
    return NextResponse.json(
      { error: 'Too many login attempts. Please try again later.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rate.retryAfterSeconds) },
      },
    );
  }

  try {
    let body: { email?: unknown; password?: unknown };
    try {
      body = (await request.json()) as { email?: unknown; password?: unknown };
    } catch {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }
    const emailNorm = normalizeAdminEmail(body?.email);
    const passwordStr = body?.password == null ? '' : String(body.password);
    if (!emailNorm || !passwordStr) return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });

    let user = await prisma.user.findUnique({ where: { email: emailNorm } });
    if (!user && typeof body?.email === 'string') {
      const raw = body.email.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
      if (raw && raw !== emailNorm) user = await prisma.user.findUnique({ where: { email: raw } });
    }
    if (!user) {
      reqLog.info('authentication.login', {
        event: { category: 'authentication', action: 'admin.login', outcome: 'failure' },
        client: { ip },
      });
      void persistAdminLog({
        level: 'info',
        category: 'authentication',
        message: 'admin.login.failure',
        metadata: { client: { ip }, reason: 'invalid_credentials' },
        traceId,
      });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const match = await bcrypt.compare(passwordStr, user.password);
    if (!match) {
      reqLog.info('authentication.login', {
        event: { category: 'authentication', action: 'admin.login', outcome: 'failure' },
        client: { ip },
        user: { id: user.id },
      });
      void persistAdminLog({
        level: 'info',
        category: 'authentication',
        message: 'admin.login.failure',
        metadata: { client: { ip }, user_id: user.id, reason: 'invalid_credentials' },
        traceId,
      });
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    if (!user.isActive) {
      reqLog.info('authentication.login', {
        event: { category: 'authentication', action: 'admin.login', outcome: 'denied', reason: 'inactive_account' },
        client: { ip },
        user: { id: user.id },
      });
      void persistAdminLog({
        level: 'info',
        category: 'authentication',
        message: 'admin.login.inactive_account',
        metadata: { user_id: user.id },
        traceId,
      });
      return NextResponse.json({ error: 'Account is inactive. An administrator must activate it before you can sign in.' }, { status: 403 });
    }

    if (!process.env.JWT_SECRET?.trim()) {
      reqLog.error('authentication.jwt_secret_missing', {
        event: { category: 'authentication', action: 'admin.login', outcome: 'failure', reason: 'misconfiguration' },
        client: { ip },
      });
      return NextResponse.json(
        {
          error:
            'Sign-in is unavailable: JWT_SECRET is not set on the server. Set it in the backend container environment (e.g. docker-compose .env).',
        },
        { status: 503 },
      );
    }

    const token = signJWT({ email: user.email, userId: user.id, roleId: user.roleId });
    const response = NextResponse.json({ ok: true, email: user.email, roleId: user.roleId });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: authCookieSecure(),
      sameSite: 'strict',
      maxAge: 24 * 60 * 60,
      path: '/',
    });
    reqLog.info('authentication.login', {
      event: { category: 'authentication', action: 'admin.login', outcome: 'success' },
      client: { ip },
      user: { id: user.id, role_id: user.roleId },
    });
    void persistAdminLog({
      level: 'info',
      category: 'authentication',
      message: 'admin.login.success',
      metadata: { user_id: user.id, role_id: user.roleId, client: { ip } },
      traceId,
    });
    return response;
  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      reqLog.warn('database.query_error', {
        event: { category: 'database', action: 'query', outcome: 'failure' },
        error: { code: e.code, message: e.message },
      });
      return NextResponse.json(
        {
          error:
            'Database error (schema or connection). On Docker, check backend logs: ensure MySQL is healthy, DATABASE_URL matches MYSQL_PASSWORD, and prisma db push / seed completed.',
        },
        { status: 503 },
      );
    }
    const name = e && typeof e === 'object' && 'name' in e ? String((e as { name: string }).name) : '';
    if (name === 'PrismaClientInitializationError') {
      reqLog.warn('database.unavailable', {
        event: { category: 'database', action: 'connect', outcome: 'failure' },
        error: { type: 'PrismaClientInitializationError' },
      });
      return NextResponse.json({ error: 'Database unavailable. Check MySQL is running and DATABASE_URL in .env.' }, { status: 503 });
    }
    if (e instanceof Error && e.message.includes('Missing JWT_SECRET')) {
      reqLog.error('authentication.jwt_secret_missing', {
        event: { category: 'authentication', action: 'admin.login', outcome: 'failure' },
        client: { ip },
      });
      return NextResponse.json(
        { error: 'Sign-in unavailable: JWT_SECRET must be set in the backend environment.' },
        { status: 503 },
      );
    }
    reqLog.exception('admin.login.unhandled_error', e, {
      event: { category: 'authentication', action: 'admin.login', outcome: 'failure' },
      client: { ip },
    });
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
