/**
 * Ensures `DATABASE_URL` is set for Prisma CLI (local `.env` or discrete DB_* vars).
 */
const fs = require('fs');
const path = require('path');

function loadDatabaseEnv() {
  if (process.env.DATABASE_URL) return;

  const backendEnv = path.join(__dirname, '..', '.env');
  if (fs.existsSync(backendEnv)) {
    require('dotenv').config({ path: backendEnv });
  }

  if (process.env.DATABASE_URL) return;

  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
  if (DB_HOST && DB_PORT && DB_NAME && DB_USER && DB_PASSWORD) {
    const user = encodeURIComponent(DB_USER);
    const password = encodeURIComponent(DB_PASSWORD);
    process.env.DATABASE_URL = `mysql://${user}:${password}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
    return;
  }

  throw new Error(
    'DATABASE_URL is not set. Add it to backend/.env, root .env, or set DATABASE_URL / DB_* variables.',
  );
}

module.exports = { loadDatabaseEnv };
