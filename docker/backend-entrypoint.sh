#!/bin/sh
set -e
cd /app

if [ -z "${DATABASE_URL:-}" ]; then
  echo "[vuleits-website-backend] FATAL: DATABASE_URL is not set (expected PostgreSQL connection string)."
  exit 1
fi

case "$DATABASE_URL" in
  postgresql://*|postgres://*) ;;
  *)
    echo "[vuleits-website-backend] FATAL: DATABASE_URL must start with postgresql:// or postgres://"
    exit 1
    ;;
esac

echo "[vuleits-website-backend] prisma generate..."
npx prisma generate --schema=prisma/schema.prisma

echo "[vuleits-website-backend] applying schema (migrate deploy when possible, else db push)..."
i=1
while [ "$i" -le 60 ]; do
  applied=0
  if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations 2>/dev/null)" ]; then
    if npx prisma migrate deploy --schema=prisma/schema.prisma; then
      echo "[vuleits-website-backend] migrate deploy succeeded."
      applied=1
    else
      echo "[vuleits-website-backend] migrate deploy failed; trying db push fallback (common when DB was created with db push)..."
      if npx prisma db push --schema=prisma/schema.prisma --skip-generate; then
        echo "[vuleits-website-backend] db push fallback succeeded."
        applied=1
      fi
    fi
  else
    if npx prisma db push --schema=prisma/schema.prisma --skip-generate; then
      echo "[vuleits-website-backend] db push succeeded."
      applied=1
    fi
  fi

  if [ "$applied" -eq 1 ]; then
    break
  fi

  if [ "$i" -eq 60 ]; then
    echo "[vuleits-website-backend] FATAL: schema apply failed after 60 attempts"
    exit 1
  fi
  echo "[vuleits-website-backend] schema apply attempt $i failed, retry in 2s..."
  i=$((i + 1))
  sleep 2
done

echo "[vuleits-website-backend] ensuring admin permissions (including maintenance.*)..."
npm run db:ensure-admin-permissions

UPLOADS_DIR="${UPLOADS_ROOT:-/app/uploads}"
echo "[vuleits-website-backend] ensuring uploads directory: $UPLOADS_DIR"
mkdir -p "$UPLOADS_DIR"

if [ "${SKIP_DB_SEED:-1}" = "1" ]; then
  echo "[vuleits-website-backend] SKIP_DB_SEED=1 (default), skipping seed."
else
  # Seed can take a long time on first boot; running it before the HTTP server starts
  # makes Docker healthchecks fail (Compose treats the service as unhealthy).
  echo "[vuleits-website-backend] Scheduling database seed (npm run seed) in background..."
  nohup sh -c 'npm run seed' >/tmp/vuleits-seed.log 2>&1 &
fi

echo "[vuleits-website-backend] Starting Next.js server..."
exec node .next/standalone/backend/server.js
