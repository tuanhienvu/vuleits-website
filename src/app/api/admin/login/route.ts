import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { signJWT } from '@/lib/jwt';
import { normalizeAdminEmail } from '@/lib/adminEmail';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const emailNorm = normalizeAdminEmail(body?.email);
    const passwordStr = body?.password == null ? '' : String(body.password);
    if (!emailNorm || !passwordStr) {
      return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
    }

    let user = await prisma.user.findUnique({ where: { email: emailNorm } });
    if (!user && typeof body?.email === 'string') {
      const raw = body.email.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
      if (raw && raw !== emailNorm) {
        user = await prisma.user.findUnique({ where: { email: raw } });
      }
    }
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const match = await bcrypt.compare(passwordStr, user.password);
    if (!match) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json(
        { error: 'Account is inactive. An administrator must activate it before you can sign in.' },
        { status: 403 },
      );
    }

    // Sign JWT
    const token = signJWT({ email: user.email, userId: user.id, roleId: user.roleId });

    // Set httpOnly cookie
    const response = NextResponse.json({ ok: true, email: user.email, roleId: user.roleId });
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60, // 24h
      path: '/',
    });

    return response;
  } catch (e: unknown) {
    const name = e && typeof e === 'object' && 'name' in e ? String((e as { name: string }).name) : '';
    if (name === 'PrismaClientInitializationError') {
      return NextResponse.json(
        { error: 'Database unavailable. Check MySQL is running and DATABASE_URL in .env.' },
        { status: 503 },
      );
    }
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
