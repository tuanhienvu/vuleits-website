import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authorize } from '@/lib/adminAuth';
import { enforceUsersModuleAccess, getRoleRank, normalizeRoleName } from '@/lib/adminUsersModule';
import { normalizeAdminEmail } from '@/lib/adminEmail';
import { applyRoleDefaultUserPermissions } from '@/lib/roleDefaultUserPermissions';

export async function GET(req: Request) {
  const auth = await authorize(req, 'users.read');
  if (auth.error) return auth.error;
  const gate = await enforceUsersModuleAccess(auth.user.id);
  if (gate) return gate;

  const list = await prisma.user.findMany({
    select: { id: true, email: true, displayName: true, roleId: true, isActive: true, isProtected: true },
  });
  return NextResponse.json(list);
}

export async function POST(req: Request) {
  const auth = await authorize(req, 'users.create');
  if (auth.error) return auth.error;
  const gate = await enforceUsersModuleAccess(auth.user.id);
  if (gate) return gate;

  const operator = await prisma.user.findUnique({
    where: { id: auth.user.id },
    include: { role: { select: { name: true } } },
  });
  if (!operator?.role) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const body = await req.json();
  const { email: rawEmail, password, roleId: bodyRoleId, displayName: bodyDisplayName, isActive: bodyIsActive } =
    body;
  const email = normalizeAdminEmail(rawEmail);
  const passwordStr = password == null ? '' : String(password);
  if (!email || !passwordStr) return NextResponse.json({ error: 'Missing fields' }, { status: 400 });

  const exists = await prisma.user.findUnique({ where: { email } });
  if (exists) return NextResponse.json({ error: 'User exists' }, { status: 409 });

  const defaultAdmin = await prisma.role.findUnique({ where: { name: 'ADMIN' }, select: { id: true } });
  if (!defaultAdmin) return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });

  let roleId = defaultAdmin.id;
  if (bodyRoleId != null && bodyRoleId !== '') {
    const n = typeof bodyRoleId === 'number' ? bodyRoleId : Number(bodyRoleId);
    if (Number.isFinite(n)) roleId = n;
  }
  const newRole = await prisma.role.findUnique({ where: { id: roleId }, select: { name: true } });
  if (!newRole) return NextResponse.json({ error: 'Invalid role' }, { status: 400 });

  const opRank = getRoleRank(operator.role.name);
  const newRank = getRoleRank(newRole.name);
  if (newRank < opRank) {
    return NextResponse.json({ error: 'Forbidden: cannot assign a role above your own' }, { status: 403 });
  }
  if (normalizeRoleName(newRole.name) === 'SYSADMIN' && normalizeRoleName(operator.role.name) !== 'SYSADMIN') {
    return NextResponse.json({ error: 'Forbidden: only SYSADMIN may assign SYSADMIN role' }, { status: 403 });
  }

  const displayName =
    bodyDisplayName == null || bodyDisplayName === ''
      ? null
      : String(bodyDisplayName).trim().slice(0, 150) || null;

  const isActive = typeof bodyIsActive === 'boolean' ? bodyIsActive : true;

  const hash = await bcrypt.hash(passwordStr, 10);
  const user = await prisma.user.create({
    data: { email, displayName, password: hash, roleId, isActive },
  });

  // UserPermission rows for the chosen role (see getRoleDefaultMatrix / seed roleCrudDefaults).
  await applyRoleDefaultUserPermissions(user.id, newRole.name);

  return NextResponse.json({ ok: true, user: { id: user.id, email: user.email } });
}
