# Personal hosting: static frontend + Node backend

This repo splits into a **static site** (HTML/CSS/JS in `frontend/out/`) and a **Next.js API server** (backend with `output: 'standalone'`).

## Build commands

From the repository root:

| Goal | Command |
|------|---------|
| Normal dev / SSR frontend | `npm run build:frontend` |
| **Static export** (upload `frontend/out/` to static hosting) | `npm run build:frontend:static` (uses `https://portalapi.vuleits.com` for build-time API) |
| **Static export (local API)** | `npm run build:frontend:static:local` with backend on `http://127.0.0.1:5000`, or set `NEXT_PUBLIC_API_BASE_URL` in `frontend/.env.local` |
| Backend production bundle | `npm run build:backend` |

**Static export** must fetch listing endpoints to build `/news/[slug]`, `/products/[slug]`, and `/services/[id]`. The `build:frontend:static` script sets **`NEXT_PUBLIC_API_BASE_URL=https://portalapi.vuleits.com`** so list + detail pages use the same API during the build (override if you need a different host). To use a local API instead, set env in `frontend/.env.local` or the shell before building, for example:

```bash
set NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:5000
set NEXT_PUBLIC_SITE_URL=https://your-domain.com
npm run build:frontend:static
```

`NEXT_PUBLIC_STATIC_EXPORT=1` is applied by the script so `output: export` and `generateStaticParams` behave correctly inside the build workers. If the API is down or returns no items for a dynamic segment, the export build can fail: keep at least one news article, product, and service in the database, or use the normal SSR build (`npm run build:frontend`) instead.

On Linux/macOS use `export VAR=value` instead of `set`.

## Deploy the static frontend

1. Run `npm run build:frontend:static`.
2. Upload the contents of `frontend/out/` to your static host (object storage + CDN, nginx `root`, etc.).

The exported site uses **same-origin** URLs such as `/api/...` and `/uploads/...`. Static hosting does not run Next.js rewrites, so you must put a **reverse proxy** in front (see below) or change the app to call a full API URL via `NEXT_PUBLIC_API_BASE_URL` everywhere (not the default for local dev).

## Your domain setup (`vuleits.com` + `portalapi.vuleits.com`)

Current frontend code calls many endpoints with relative URLs (`/api/...`) and uses cookie auth (`credentials: 'include'`).  
For this project, the safest production setup is:

1. Keep frontend on `https://vuleits.com`.
2. Keep backend app on `https://portalapi.vuleits.com`.
3. Configure `vuleits.com` to reverse proxy `/api/*` and `/uploads/*` to `https://portalapi.vuleits.com`.

That preserves same-origin behavior in the browser (`vuleits.com`), so admin login/session cookies keep working without rewriting all fetch calls.

## Production env values (recommended)

### Frontend build env

```bash
NEXT_PUBLIC_SITE_URL=https://vuleits.com
NEXT_PUBLIC_API_BASE_URL=https://portalapi.vuleits.com
```

### Backend runtime env

```bash
FRONTEND_ORIGIN=https://vuleits.com
CORS_ORIGINS=https://vuleits.com,https://www.vuleits.com
NEXT_PUBLIC_SITE_URL=https://vuleits.com
```

## Deploy the backend (standalone Node)

1. On the server, install dependencies and build from the repo root: `npm ci` then `npm run build:backend`. Stop any `next dev` process on the backend first (otherwise Windows may block deleting `backend/.next` during the build).
2. This monorepo places the standalone entry under `backend/.next/standalone/backend/` (see [Next.js standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)). After each production build:

   - Copy `backend/.next/static` → `backend/.next/standalone/backend/.next/static`.
   - Copy `backend/public` → `backend/.next/standalone/backend/public` if you use files from `public/`.

3. From the standalone app directory, start the server (port defaults come from your start command or env):

   ```bash
   cd backend/.next/standalone/backend
   node server.js
   ```

   Set `HOSTNAME` / `PORT` as needed for your host (for example `PORT=5000`).

4. Provide environment variables (database, `JWT_SECRET`, etc.) in `backend/.env` or your process manager.
5. Prisma client lives in `node_modules`; keep the same `node_modules` layout from the install, or run `npm run db:generate` on the server after deploy so `@prisma/client` matches your schema.

Listen on an internal port (e.g. `5000`) and let nginx terminate TLS and proxy to it.

## Nginx example (single domain)

Browser requests go to one host; nginx serves files for `/` and forwards `/api` and `/uploads` to Node.

```nginx
server {
  listen 443 ssl;
  server_name your-domain.com;

  root /var/www/vuleits/out;
  index index.html;
  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /uploads/ {
    proxy_pass http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
  }
}
```

Adjust `root` to your uploaded `out/` path and the upstream port to match your backend.

## Nginx example for your split domains

Use one vhost to serve static frontend + proxy API, and one vhost for backend app.

### 1) `vuleits.com` (frontend static + reverse proxy to backend domain)

```nginx
server {
  listen 443 ssl;
  server_name vuleits.com www.vuleits.com;

  root /var/www/vuleits/out;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  location /api/ {
    proxy_pass https://portalapi.vuleits.com;
    proxy_http_version 1.1;
    proxy_set_header Host portalapi.vuleits.com;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }

  location /uploads/ {
    proxy_pass https://portalapi.vuleits.com;
    proxy_http_version 1.1;
    proxy_set_header Host portalapi.vuleits.com;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
  }
}
```

### 2) `portalapi.vuleits.com` (backend node upstream)

```nginx
server {
  listen 443 ssl;
  server_name portalapi.vuleits.com;

  location / {
    proxy_pass http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```

If your backend stores upload files under `/uploads`, ensure that path is served by the backend process behind `portalapi.vuleits.com`.

## Optional: direct cross-origin frontend calls

Only use this if you decide to remove the reverse proxy and call `https://portalapi.vuleits.com/api/...` directly from browser code.

- Keep backend CORS allowlist accurate (`CORS_ORIGINS`).
- Keep cookies configured for cross-site use (if auth/session cookies are used).
- Update all frontend relative API calls (`/api/...`) to absolute base URL usage.

Current project code is already optimized for same-origin calls via reverse proxy.

## Quick verification after deploy

Run these checks:

- `https://vuleits.com/` loads static site.
- `https://vuleits.com/api/news` returns JSON via proxy.
- `https://portalapi.vuleits.com/api/news` returns JSON directly.
- Admin login from `https://vuleits.com/admin/login` succeeds and remains logged in after refresh.
- One sample page from each dynamic route works: `/news/<slug>`, `/products/<slug>`, `/services/<id>`.

If any of these fail, check DNS, TLS certs, nginx `proxy_pass`, and backend env values first.

## Legacy proxy snippet (location blocks only)

If you already have a `server {}` block and just need locations:

```nginx
location /api/ {
  proxy_pass https://portalapi.vuleits.com;
  proxy_http_version 1.1;
  proxy_set_header Host portalapi.vuleits.com;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  proxy_set_header X-Forwarded-Proto $scheme;
}

location /uploads/ {
  proxy_pass https://portalapi.vuleits.com;
  proxy_http_version 1.1;
  proxy_set_header Host portalapi.vuleits.com;
}
```

## Environment reminders

- `NEXT_PUBLIC_SITE_URL` — canonical public URL (SEO, sitemap, JSON-LD).
- `NEXT_PUBLIC_API_BASE_URL` — during **static export build**, must point at the API that serves listing endpoints; at **runtime** for the static site, same-origin `/api` is usual when using the proxy above.
- Backend CORS: set `CORS_ORIGINS=https://vuleits.com,https://www.vuleits.com` (and add staging origins if used).
