#!/usr/bin/env node
/**
 * Exports content tables from the connected MySQL database into prisma/seed.db.snapshot.json.
 * Run from repo root:  npm run db:export-snapshot
 *
 * Requires DATABASE_URL or DB_* vars (same rules as prisma/seed.js).
 * Auth tables (User, Role, Permission, …) are NOT exported — seed.js creates those.
 */
const fs = require('fs');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env.local') });
require('dotenv').config({ path: path.join(__dirname, '..', '..', 'backend', '.env') });
require('dotenv').config({ path: path.join(__dirname, '..', '..', 'backend', '.env.local') });

if (!process.env.DATABASE_URL) {
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
  if (DB_HOST && DB_PORT && DB_NAME && DB_USER && DB_PASSWORD) {
    const user = encodeURIComponent(DB_USER);
    const password = encodeURIComponent(DB_PASSWORD);
    process.env.DATABASE_URL = `mysql://${user}:${password}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }
}

if (!process.env.DATABASE_URL) {
  console.error('export-db-snapshot: Set DATABASE_URL or DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD');
  process.exit(1);
}

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function stableJson(obj) {
  return JSON.parse(
    JSON.stringify(obj, (_, v) => {
      if (v instanceof Date) return v.toISOString();
      if (typeof v === 'bigint') return Number(v);
      return v;
    }),
  );
}

async function main() {
  console.log('Exporting database snapshot (content tables only)...');

  const snap = {
    productCategories: stableJson(await prisma.productCategory.findMany({ orderBy: { id: 'asc' } })),
    technologies: stableJson(await prisma.technology.findMany({ orderBy: { id: 'asc' } })),
    media: stableJson(await prisma.media.findMany({ orderBy: { id: 'asc' } })),
    aboutSections: stableJson(await prisma.aboutSection.findMany({ orderBy: { id: 'asc' } })),
    aboutStats: stableJson(await prisma.aboutStat.findMany({ orderBy: { id: 'asc' } })),
    aboutTeamMembers: stableJson(await prisma.aboutTeamMember.findMany({ orderBy: { id: 'asc' } })),
    bannerSliders: stableJson(await prisma.bannerSlider.findMany({ orderBy: { id: 'asc' } })),
    bannerItems: stableJson(await prisma.bannerItem.findMany({ orderBy: { id: 'asc' } })),
    homeFeatures: stableJson(await prisma.homeFeature.findMany({ orderBy: { id: 'asc' } })),
    news: stableJson(await prisma.news.findMany({ orderBy: { id: 'asc' } })),
    privacyPolicies: stableJson(await prisma.privacyPolicy.findMany({ orderBy: { id: 'asc' } })),
    termsOfServices: stableJson(await prisma.termsOfService.findMany({ orderBy: { id: 'asc' } })),
    products: stableJson(await prisma.product.findMany({ orderBy: { id: 'asc' } })),
    productTechnologies: stableJson(await prisma.productTechnology.findMany()),
    productAnalytics: stableJson(await prisma.productAnalytics.findMany({ orderBy: { id: 'asc' } })),
    serviceItems: stableJson(await prisma.serviceItem.findMany({ orderBy: { id: 'asc' } })),
    contacts: stableJson(await prisma.contact.findMany({ orderBy: { id: 'asc' } })),
    siteSettings: stableJson(await prisma.siteSetting.findMany({ orderBy: { id: 'asc' } })),
    uiMessages: stableJson(await prisma.uiMessage.findMany({ orderBy: [{ locale: 'asc' }, { messageKey: 'asc' }] })),
  };

  const outPath = path.join(__dirname, '..', 'seed.db.snapshot.json');
  fs.writeFileSync(outPath, `${JSON.stringify(snap, null, 2)}\n`, 'utf8');
  const kb = (fs.statSync(outPath).size / 1024).toFixed(1);
  console.log(`Wrote ${outPath} (${kb} KB)`);
  console.log(
    'Counts:',
    Object.entries(snap)
      .map(([k, v]) => `${k}:${Array.isArray(v) ? v.length : 0}`)
      .join(', '),
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
