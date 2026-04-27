#!/usr/bin/env node
const { spawnSync } = require('child_process');
const { loadDatabaseEnv } = require('./load-database-env');

try {
  loadDatabaseEnv();
} catch (e) {
  console.error(e?.message || e);
  process.exit(1);
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
