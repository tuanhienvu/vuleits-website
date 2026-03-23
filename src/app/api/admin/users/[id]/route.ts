import { NextRequest, NextResponse } from 'next/server';
import type { Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authorize, userHasPermission } from '@/lib/adminAuth';
import {
  enforceUsersModuleAccess,
  getRoleRank,
  normalizeRoleName,
} from '@/lib/adminUsersModule';
import { normalizeAdminEmail } from '@/lib/adminEmail';
import { applyRoleDefaultUserPermissions } from '@/lib/roleDefaultUserPermissions';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'users.read');
  if (auth.error) return auth.error;
  const gate = await enforceUsersModuleAccess(auth.user.id);
  if (gate) return gate;

  const { id: idParam } = await params;
  const id = Number(idParam);
  const user = await prisma.user.findUnique({
    where: { id },
    select: { id: true, email: true, displayName: true, roleId: true, isActive: true, isProtected: true },
  });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(user);
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req);
  if (auth.error) return auth.error;
  const gate = await enforceUsersModuleAccess(auth.user.id);
  if (gate) return gate;

  const { id: idParam } = await params;
  const id = Number(idParam);

  const operator = await prisma.user.findUnique({
    where: { id: auth.user.id },
    include: { role: { select: { name: true } } },
  });
  if (!operator?.role) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const target = await prisma.user.findUnique({
    where: { id },
    include: { role: { select: { name: true } } },
  });
  if (!target) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (!target.role) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const opRank = getRoleRank(operator.role.name);
  const targetRank = getRoleRank(target.role.name);
  if (opRank > targetRank) {
    return NextResponse.json({ error: 'Forbidden: cannot modify a higher-privileged user' }, { status: 403 });
  }

  const body = (await req.json()) as {
    password?: string;
    email?: string;
    displayName?: string | null;
    roleId?: number;
    isActive?: boolean;
  };

  const targetIsSysadmin = normalizeRoleName(target.role.name) === 'SYSADMIN';
  const targetLocked = target.isProtected || targetIsSysadmin;
  const opIsSysadmin = normalizeRoleName(operator.role.name) === 'SYSADMIN';

  const displayNorm = (v: unknown): string | null => {
    if (v == null || v === '') return null;
    const s = String(v).trim().slice(0, 150);
    return s || null;
  };

  const passwordPlain = body.password == null ? '' : String(body.password);
  const willChangePassword = passwordPlain.length > 0;
  const emailNext =
    typeof body.email === 'string' ? normalizeAdminEmail(body.email) : undefined;
  const willChangeEmail =
    emailNext !== undefined && emailNext.length > 0 && emailNext !== normalizeAdminEmail(target.email);
  const willChangeDisplay =
    body.displayName !== undefined && displayNorm(body.displayName) !== displayNorm(target.displayName);
  const willChangeActive = typeof body.isActive === 'boolean' && body.isActive !== target.isActive;
  const willChangeRole =
    body.roleId != null && Number(body.roleId) !== target.roleId;

  const anyMutation =
    willChangePassword || willChangeEmail || willChangeDisplay || willChangeActive || willChangeRole;

  if (anyMutation && targetLocked && !opIsSysadmin) {
    return NextResponse.json({ error: 'Forbidden: only SYSADMIN may edit SYSADMIN or protected accounts' }, { status: 403 });
  }

  if (willChangePassword && !(await userHasPermission(auth.user.id, 'userPassword.update'))) {
    return NextResponse.json({ error: 'Forbidden: userPassword.update required' }, { status: 403 });
  }
  if (
    (willChangeEmail || willChangeDisplay || willChangeActive || willChangeRole) &&
    !(await userHasPermission(auth.user.id, 'users.update'))
  ) {
    return NextResponse.json({ error: 'Forbidden: users.update required' }, { status: 403 });
  }

  if (targetLocked && body.roleId != null && body.roleId !== target.roleId) {
    return NextResponse.json(
      { error: 'Forbidden: cannot change role for SYSADMIN or protected user' },
      { status: 403 },
    );
  }

  const targetInactive = !target.isActive;
  const willActivate =
    typeof body.isActive === 'boolean' && body.isActive === true && targetInactive;

  if (targetInactive && willChangeRole && !willActivate) {
    return NextResponse.json(
      { error: 'Cannot change role while account is inactive. Activate the account first.' },
      { status: 403 },
    );
  }
  if (targetInactive && willChangePassword && !willActivate) {
    return NextResponse.json(
      { error: 'Cannot reset password while account is inactive. Activate the account first.' },
      { status: 403 },
    );
  }

  // Non-SYSADMIN: cannot change own active status nor another user at the same role rank
  if (willChangeActive && !opIsSysadmin && opRank === targetRank) {
    return NextResponse.json(
      {
        error:
          'Forbidden: only SYSADMIN may change active status for yourself or for a user at the same role level.',
      },
      { status: 403 },
    );
  }

  const data: Prisma.UserUncheckedUpdateInput = {};

  if (willChangePassword) {
    data.password = await bcrypt.hash(passwordPlain, 10);
  }

  if (willChangeEmail) {
    if (!emailNext) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    const taken = await prisma.user.findFirst({
      where: { email: emailNext, NOT: { id } },
      select: { id: true },
    });
    if (taken) return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
    data.email = emailNext;
  }

  if (willChangeDisplay) {
    data.displayName = displayNorm(body.displayName);
  }

  if (willChangeActive) {
    data.isActive = body.isActive;
  }

  if (willChangeRole) {
    const newRole = await prisma.role.findUnique({ where: { id: body.roleId! }, select: { name: true } });
    if (!newRole) return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    const newRank = getRoleRank(newRole.name);
    if (newRank < opRank) {
      return NextResponse.json({ error: 'Forbidden: cannot assign a role above your own' }, { status: 403 });
    }
    if (normalizeRoleName(newRole.name) === 'SYSADMIN' && !opIsSysadmin) {
      return NextResponse.json({ error: 'Forbidden: only SYSADMIN may assign SYSADMIN role' }, { status: 403 });
    }
    data.roleId = body.roleId;
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ ok: true, user: { id: target.id, email: target.email, displayName: target.displayName } });
  }

  const user = await prisma.user.update({ where: { id }, data });

  if (willChangeRole) {
    const roleRow = await prisma.role.findUnique({ where: { id: user.roleId }, select: { name: true } });
    if (roleRow?.name) await applyRoleDefaultUserPermissions(user.id, roleRow.name);
  }

  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email, displayName: user.displayName } });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorize(req, 'users.delete');
  if (auth.error) return auth.error;
  const gate = await enforceUsersModuleAccess(auth.user.id);
  if (gate) return gate;

  const { id: idParam } = await params;
  const id = Number(idParam);

  const operator = await prisma.user.findUnique({
    where: { id: auth.user.id },
    include: { role: { select: { name: true } } },
  });
  if (!operator?.role) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const user = await prisma.user.findUnique({
    where: { id },
    include: { role: { select: { name: true } } },
  });
  if (!user) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  if (!user.role) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  if (user.isProtected || normalizeRoleName(user.role.name) === 'SYSADMIN') {
    return NextResponse.json({ error: 'Cannot delete SYSADMIN or protected user' }, { status: 403 });
  }

  const opRank = getRoleRank(operator.role.name);
  const targetRank = getRoleRank(user.role.name);
  if (opRank >= targetRank) {
    return NextResponse.json({ error: 'Forbidden: cannot delete this user' }, { status: 403 });
  }

  await prisma.user.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
