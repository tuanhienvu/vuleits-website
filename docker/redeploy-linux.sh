#!/usr/bin/env bash
# Run from repo clone on Linux: bash docker/redeploy-linux.sh
# Or: npm run docker:linux:redeploy
#
# Stops the compose stack, removes old vuleits* app images, pulls IMAGE_TAG from .env (default V1.0.0), starts fresh.
# MySQL/Redis named volumes are kept (data preserved).

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"
COMPOSE=(docker compose -f docker-compose.yaml)

echo "==> Stopping stack (containers removed; mysql/redis volumes kept)..."
"${COMPOSE[@]}" down --remove-orphans

echo "==> Removing previous app images (safe to ignore 'No such image')..."
for image in \
  tuanhienvu/vuleits-website-backend:latest \
  tuanhienvu/vuleits-website-frontend:latest \
  tuanhienvu/vuleits-website-backend:V1.0.2 \
  tuanhienvu/vuleits-website-frontend:V1.0.2 \
  tuanhienvu/vuleits-website-backend:V1.0.0 \
  tuanhienvu/vuleits-website-frontend:V1.0.0 \
  tuanhienvu/vuleits-website-backend:V1.0.1 \
  tuanhienvu/vuleits-website-frontend:V1.0.1 \
  tuanhienvu/vuleits-backend:V1.0.1 \
  tuanhienvu/vuleits-frontend:V1.0.1 \
  tuanhienvu/vuleits-backend:V1.0.0 \
  tuanhienvu/vuleits-frontend:V1.0.0 \
  tuanhienvu/vuleits-backend:local \
  tuanhienvu/vuleits-frontend:local \
  tuanhienvu/vuleits-backend:latest \
  tuanhienvu/vuleits-frontend:latest
do
  docker rmi -f "$image" 2>/dev/null || true
done

echo "==> Pulling registry images (IMAGE_TAG from .env)..."
"${COMPOSE[@]}" pull

echo "==> Starting containers..."
"${COMPOSE[@]}" up -d

echo "==> Done. Backend container runs prisma generate + db push; seed is skipped by default (SKIP_DB_SEED=1). Set SKIP_DB_SEED=0 only for intentional seeding."
