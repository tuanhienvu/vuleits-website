#!/bin/sh
set -e
cd /app

echo "[vuleits-website-backend] prisma generate..."
npx prisma generate --schema=prisma/schema.prisma

echo "[vuleits-website-backend] applying schema (migrate deploy when migrations exist, else db push)..."
i=1
while [ "$i" -le 60 ]; do
  if [ -d "prisma/migrations" ] && [ "$(ls -A prisma/migrations 2>/dev/null)" ]; then
    if npx prisma migrate deploy --schema=prisma/schema.prisma; then
      echo "[vuleits-website-backend] migrate deploy succeeded."
      break
    fi
  else
    if npx prisma db push --schema=prisma/schema.prisma --skip-generate; then
      echo "[vuleits-website-backend] db push succeeded."
      break
    fi
  fi

  if [ "$i" -eq 60 ]; then
    echo "[vuleits-website-backend] FATAL: schema apply failed after 60 attempts"
    exit 1
  fi
  echo "[vuleits-website-backend] schema apply attempt $i failed, retry in 2s..."
  i=$((i + 1))
  sleep 2
done

if [ "${SKIP_DB_SEED:-0}" = "1" ]; then
  echo "[vuleits-website-backend] SKIP_DB_SEED=1, skipping seed."
else
  # Seed can take a long time on first boot; running it before the HTTP server starts
  # makes Docker healthchecks fail (Compose treats the service as unhealthy).
  echo "[vuleits-website-backend] Scheduling database seed (npm run seed) in background..."
  nohup sh -c 'npm run seed' >/tmp/vuleits-seed.log 2>&1 &
fi

echo "[vuleits-website-backend] Starting Next.js server..."
exec node .next/standalone/backend/server.js
