const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', 'backend', '.env') });

if (!process.env.DATABASE_URL) {
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
  if (DB_HOST && DB_PORT && DB_NAME && DB_USER && DB_PASSWORD) {
    const user = encodeURIComponent(DB_USER);
    const password = encodeURIComponent(DB_PASSWORD);
    process.env.DATABASE_URL = `mysql://${user}:${password}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const UI_FEATURES = [
  'overview',
  'services',
  'products',
  'news',
  'media',
  'banners',
  'homeFeatures',
  'uiTexts',
  'contacts',
  'aboutTeam',
  'aboutStats',
  'users',
  'userPassword',
  'permissions',
  'auditLogs',
  'maintenance',
];

const featureToPermissionPrefix = {
  overview: 'site',
  services: 'services',
  products: 'products',
  news: 'news',
  media: 'media',
  banners: 'banners',
  homeFeatures: 'homeFeatures',
  uiTexts: 'uiTexts',
  contacts: 'contacts',
  aboutTeam: 'aboutTeam',
  aboutStats: 'aboutStats',
  users: 'users',
  userPassword: 'userPassword',
  permissions: 'permissions',
  auditLogs: 'auditLogs',
  maintenance: 'maintenance',
};

const actions = ['create', 'read', 'update', 'delete'];

async function main() {
  const permissionNames = [];
  for (const feature of UI_FEATURES) {
    const prefix = featureToPermissionPrefix[feature];
    for (const action of actions) permissionNames.push(`${prefix}.${action}`);
  }

  const permissionIds = [];
  for (const name of permissionNames) {
    const p = await prisma.permission.upsert({
      where: { name },
      update: {},
      create: { name, description: `${name} permission` },
      select: { id: true },
    });
    permissionIds.push(p.id);
  }

  const sysadminRole = await prisma.role.upsert({
    where: { name: 'SYSADMIN' },
    update: {},
    create: { name: 'SYSADMIN', permissions: null },
    select: { id: true },
  });

  for (const permissionId of permissionIds) {
    await prisma.rolePermission.upsert({
      where: {
        roleId_permissionId: {
          roleId: sysadminRole.id,
          permissionId,
        },
      },
      update: {},
      create: { roleId: sysadminRole.id, permissionId },
    });
  }

  console.log('Ensured admin permission catalog and SYSADMIN full permissions.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
