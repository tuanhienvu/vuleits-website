# Local development and Docker (external PostgreSQL + API + frontend)

## Run locally (recommended)

1. **Database** — external PostgreSQL. Set `DATABASE_URL` (or `DB_*`) in `backend/.env`, then run migrations / `prisma db push` / `npm run seed` as needed.

2. **Backend** — from repo root:
   ```bash
   cd backend && npm run dev
   ```
   Default API port is **5001** (see `backend/.env` → `PORT`).

3. **Frontend** — copy `frontend/.env.example` to `frontend/.env.local`, set **`BACKEND_PORT=5001`** to match the backend, and **do not set** `NEXT_PUBLIC_API_BASE_URL` unless you need a custom API URL. Then:
   ```bash
   cd frontend && npm run dev
   ```
   The app resolves the API base as **`http://127.0.0.1:${BACKEND_PORT}`** (see `frontend/lib/resolveBackendApiBase.ts`). Next.js **rewrites** in `frontend/next.config.ts` proxy `/api/*` and `/uploads/*` to that host during `next dev` / `next start`.

4. **Seed demo data** — from the repo root, run:
   ```bash
   npm run seed
   ```
   Local seeded sign-in accounts:
   `vuleitsolution@gmail.com` / `VULEITS@2025#` for full sysadmin access
   `demo@vuleits.com` / `demo` for limited manager/demo access

5. **Uploads** — files are stored under the repo-root `uploads/` directory in development (when the backend runs from `backend/` inside this monorepo). In Docker, the same layout is `/app/uploads` (`UPLOADS_ROOT`). URLs stay `/uploads/...` in the browser; the backend serves them from disk.

## Docker: frontend + backend only (external PostgreSQL)

PostgreSQL is **not** started by Compose. Point `DATABASE_URL` at your existing server DB.

From the **repository root**:

1. Copy `.env.docker.example` → `.env` and set at least:
   - `JWT_SECRET`
   - `DATABASE_URL=postgresql://...` (reachable from containers)
   - public URL / CORS vars for your domain
2. Ensure images exist (`IMAGE_TAG`) or build/push them.
3. Start:
   ```bash
   docker compose pull
   docker compose up -d
   ```

- API is exposed on **`5001`** (`BACKEND_PORT`).
- Frontend is exposed on **`3001`** (`FRONTEND_PORT`).
- Seed is skipped by default (`SKIP_DB_SEED=1`). Set `SKIP_DB_SEED=0` only when you intentionally want seed on start.

On container start the backend entrypoint runs `prisma generate`, then `migrate deploy` (falls back to `db push` if migrate cannot baseline an existing DB).

## Production build

From the repo root, `npm run build` runs **`next build`** for the frontend and backend. Serve the frontend with `npm run start:frontend` (or `cd frontend && npm run start`) after setting `BACKEND_PORT` as needed.
