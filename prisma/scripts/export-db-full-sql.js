#!/usr/bin/env node
/* eslint-disable no-console */
const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const dotenv = require('dotenv');

function loadEnvFiles() {
  const candidates = [
    path.resolve(process.cwd(), '.env'),
    path.resolve(process.cwd(), '.env.local'),
    path.resolve(process.cwd(), 'backend/.env'),
    path.resolve(process.cwd(), 'backend/.env.local'),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) dotenv.config({ path: p, override: false });
  }
}

function parseDatabaseName(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.pathname.replace(/^\//, '') || null;
  } catch {
    return null;
  }
}

async function run() {
  loadEnvFiles();

  const outputFile = path.resolve(process.cwd(), process.env.DB_FULL_TRANSFER_OUT || 'docker/mysql-transfer/full.sql');
  const containerName = process.env.DB_FULL_TRANSFER_CONTAINER || 'mysql_db';
  const dbName = process.env.DB_NAME || process.env.MYSQL_DATABASE || parseDatabaseName(process.env.DATABASE_URL) || 'vuleits_db';
  const dbUser = process.env.DB_USER || process.env.MYSQL_USER || 'vuleits';
  const dbPassword = process.env.DB_PASSWORD || process.env.MYSQL_PASSWORD;

  if (!dbPassword) {
    throw new Error('Missing DB password. Set DB_PASSWORD or MYSQL_PASSWORD before exporting full SQL.');
  }

  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  const out = fs.createWriteStream(outputFile, { encoding: 'utf8' });

  const args = [
    'exec',
    '-e',
    `MYSQL_PWD=${dbPassword}`,
    containerName,
    'mysqldump',
    '--single-transaction',
    '--routines',
    '--triggers',
    '--events',
    '--set-gtid-purged=OFF',
    '--databases',
    dbName,
    '-u',
    dbUser,
  ];

  console.log(`Exporting full SQL from container "${containerName}" (${dbName})...`);
  await new Promise((resolve, reject) => {
    const child = spawn('docker', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    child.stdout.pipe(out);
    child.stderr.on('data', (chunk) => process.stderr.write(chunk));
    child.on('error', reject);
    child.on('close', (code) => {
      out.end();
      if (code === 0) resolve();
      else reject(new Error(`docker mysqldump failed with exit code ${code}`));
    });
  });

  const size = fs.statSync(outputFile).size;
  if (!size) {
    throw new Error(`Export completed but output file is empty: ${outputFile}`);
  }

  console.log(`Full SQL export saved: ${outputFile} (${size} bytes)`);
  console.log('Copy this file to server with your compose stack, then set DB_TRANSFER_MODE=full.');
}

run().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
