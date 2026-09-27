/**
 * Builds DATABASE_URL from discrete DB_* env vars when DATABASE_URL is unset.
 */
function buildDatabaseUrlFromParts() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  const { DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
  if (!DB_HOST || !DB_PORT || !DB_NAME || !DB_USER || !DB_PASSWORD) return null;

  const user = encodeURIComponent(DB_USER);
  const password = encodeURIComponent(DB_PASSWORD);
  return `postgresql://${user}:${password}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;
}

function ensureDatabaseUrlFromParts() {
  const url = buildDatabaseUrlFromParts();
  if (url) {
    process.env.DATABASE_URL = url;
    return url;
  }
  return process.env.DATABASE_URL || null;
}

module.exports = { buildDatabaseUrlFromParts, ensureDatabaseUrlFromParts };
