# Local development and Docker (MySQL + API)

## Run locally (recommended)

1. **Database** — configure `backend/.env` with `DATABASE_URL` (and run migrations / `prisma` as needed).

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

## Docker: MySQL + API only

From the **repository root**:

```bash
docker compose up -d --build
```

- MySQL is exposed on **`3306`** (override with `MYSQL_HOST_PORT`).
- API is exposed on **`5001`** (override with `API_HOST_PORT`). Point `frontend/.env.local` **`BACKEND_PORT`** at this port when testing the UI against Docker.
- After the API is up, run `npm run seed` from the repo root if you want the sample users/content in the local database.

Set `DATABASE_URL`, `JWT_SECRET`, etc. in a root `.env` file or export them before `docker compose` if you override defaults.

## Production build

From the repo root, `npm run build` runs **`next build`** for the frontend and backend. Serve the frontend with `npm run start:frontend` (or `cd frontend && npm run start`) after setting `BACKEND_PORT` as needed.
