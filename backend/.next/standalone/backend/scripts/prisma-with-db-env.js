#!/usr/bin/env node
const { spawnSync } = require('child_process');
const path = require('path');
const dotenv = require('dotenv');

// Prisma and DB scripts use `backend/.env` only (see `backend/.env.example`).
dotenv.config({ path: path.join(__dirname, '..', '.env') });

if (!process.env.DATABASE_URL) {
  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
  if (DB_HOST && DB_PORT && DB_NAME && DB_USER && DB_PASSWORD) {
    const user = encodeURIComponent(DB_USER);
    const password = encodeURIComponent(DB_PASSWORD);
    process.env.DATABASE_URL = `mysql://${user}:${password}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }
}

const args = process.argv.slice(2);
const prismaCmd =
  process.platform === 'win32'
    ? '.\\node_modules\\.bin\\prisma.cmd'
    : './node_modules/.bin/prisma';
const result = spawnSync(prismaCmd, args, {
  stdio: 'inherit',
  env: process.env,
  shell: process.platform === 'win32',
});

if (result.error) {
  console.error(result.error);
  process.exit(1);
}

process.exit(result.status ?? 1);
