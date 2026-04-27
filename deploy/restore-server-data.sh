#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PACKAGE_DIR="${ROOT}/deploy/package"
DB_DUMP="${PACKAGE_DIR}/db.sql"

if [ ! -f "${DB_DUMP}" ]; then
  echo "Missing ${DB_DUMP}. Upload deploy/package first."
  exit 1
fi

cd "${ROOT}"
echo "Restoring database dump into mysql_db ..."
docker compose -f docker-compose.yaml exec -T mysql sh -c \
  'mysql -uroot -p"$MYSQL_ROOT_PASSWORD" vuleits_db' < "${DB_DUMP}"

if [ -d "${PACKAGE_DIR}/public/frontend" ]; then
  echo "Syncing frontend/public ..."
  mkdir -p "${ROOT}/frontend/public"
  rsync -a --delete "${PACKAGE_DIR}/public/frontend/" "${ROOT}/frontend/public/"
fi

if [ -d "${PACKAGE_DIR}/public/backend" ]; then
  echo "Syncing backend/public ..."
  mkdir -p "${ROOT}/backend/public"
  rsync -a --delete "${PACKAGE_DIR}/public/backend/" "${ROOT}/backend/public/"
fi

echo "Data restore completed."
