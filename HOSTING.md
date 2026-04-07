# Hosting guide: static frontend + Node backend

This repo splits into a **static site** (HTML/CSS/JS in `frontend/out/` when using static export) or an **SSR Next.js frontend**, plus a **Next.js API server** (backend with `output: 'standalone'`).

CORS and security headers for `/api/*` are applied in **`backend/proxy.ts`** (Next.js 16 `proxy` convention; not `middleware.ts`).

---

## Deploy workflow: upload source → install → build → start

Use this when you **upload the project source** to the server (FTP, Git pull, Plesk “Git”, zip upload, etc.), then run commands over **SSH** or the host’s **Node.js / Run script** UI.

### 1. What to upload

- Upload the **whole monorepo** so the server has the **repository root** `package.json` plus `frontend/`, `backend/`, `prisma/`, and `package-lock.json`.
- **Recommended:** do **not** upload local `node_modules`, `frontend/.next`, or `backend/.next` (smaller upload; they are recreated on the server). If you upload them by mistake, delete those folders on the server before install/build to avoid stale or wrong-architecture binaries.
- Keep **`package-lock.json`** in the repo so you can run **`npm ci`** for repeatable installs.

### 2. Where files should live on the server

- The **application root** for commands below is the folder that contains the root **`package.json`** (the workspace root), for example `/var/www/vuleits-website` or `httpdocs/vuleits-website`.
- All `npm` commands in this guide assume **`cd` to that root** first.

### 3. Environment files (do this before or right after upload)

| File | Purpose |
|------|--------|
| **`backend/.env`** | Copy from `backend/.env.example`. Set at least **`DATABASE_URL`** (or `DB_*` pieces), **`JWT_SECRET`**, **`CORS_ORIGINS`**, **`FRONTEND_ORIGIN`**. Set a unique **`PORT`** if the panel does not inject it. |
| **`frontend/.env.local`** (optional) | Needed for **build** if you must override public URLs (e.g. `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_API_BASE_URL`). Production SSR build bakes `NEXT_PUBLIC_*` into the client bundle. |

`postinstall` runs **`prisma generate`** using `backend/.env` / root `.env` when present. **`prisma generate`** does not need the database to be reachable; **`npm run db:push`** does.

### 4. Install dependencies

SSH into the server (or use the host’s terminal), then:

```bash
cd /path/to/your/repo-root
node -v    # should be a current Node LTS

npm ci
# If you have no package-lock.json on the server, use:
# npm install
```

Always run install from the **monorepo root**, not from `frontend/` or `backend/` alone.

### 5. Database schema (first deploy or after schema changes)

```bash
npm run db:push
# Optional: npm run seed
```

Ensure **`backend/.env`** has a correct **`DATABASE_URL`** (or `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER`, `DB_PASSWORD`) before this step.

### 6. Production build

```bash
export NODE_ENV=production   # Linux/macOS; optional if your host sets it
npm run build
```

This runs **`build:frontend`** then **`build:backend`**. To build only one app: **`npm run build:frontend`** or **`npm run build:backend`**.

For **static export** of the frontend (upload `frontend/out/` to a static host), use **`npm run build:frontend:static`** (or **`:static:local`**) instead of the normal frontend build; see **Build commands** later in this file.

### 7. Backend standalone: copy assets after each backend build

The API uses Next **`output: 'standalone'`**. A **`postbuild`** script in **`backend/package.json`** copies **`backend/.next/static`** and **`backend/public`** into **`backend/.next/standalone/backend/`** automatically when you run **`npm run build`** from **`backend/`** or **`npm run build:backend`** from the repo root.

If you ever build without that hook, copy manually:

```bash
# Run from repo root (Linux/macOS)
cp -r backend/.next/static backend/.next/standalone/backend/.next/static
cp -r backend/public backend/.next/standalone/backend/public
```

On **Windows (PowerShell)** from repo root:

```powershell
Copy-Item -Recurse -Force backend\.next\static backend\.next\standalone\backend\.next\static
Copy-Item -Recurse -Force backend\public backend\.next\standalone\backend\public
```

If **`public`** is empty or unused, you can skip the `public` copy. Repeat these copies **every time** you rebuild the backend.

### 8. Start the app(s)

Production **`start`** scripts use **`PORT`** from the environment (see the section **Production: `npm run start` and `PORT`** below).

| What you want | Typical command | Working directory |
|---------------|-----------------|-------------------|
| **Frontend only** (SSR `next start`) | `npm run start` | **Repo root** (recommended) or `frontend/` with the same `node_modules` layout |
| **Backend only** (standalone API) | `npm run start:backend` **or** `cd backend && npm run start` | For `cd backend && npm run start`, cwd must be **`backend/`** |
| **Both on one VPS** | Run **two** processes (two Node apps in Plesk, **pm2**, **systemd**, etc.) with **different `PORT`** values | Same repo on disk; two start commands |

**Important for the backend:** the script `node .next/standalone/backend/server.js` is relative to **`backend/`**. Using **`npm run start:backend`** from the repo root runs that workspace script with the correct package context; if your panel only allows a single “startup file”, set the app root to **`backend`** and startup command **`npm run start`** (after install/build from the monorepo root, `node_modules` is usually hoisted to the repo root—keep the full tree).

Set **`NODE_ENV=production`** in the panel or `.env` when running **`start`**.

### 9. Hosting panel checklist

- **Node version:** LTS, matching what you use locally if possible.
- **Install command:** `npm ci` (or `npm install`) in **repo root**.
- **Build command:** `npm run build` (or split builds if you only deploy one app).
- **Run command:** `npm run start` (frontend) and/or `npm run start:backend` (API), with **`PORT`** assigned per app.
- **Do not** use `next dev` for production.
- If the panel asks for a single `.js` startup file, see **`server_guide.ini`** and **Plesk / Passenger note** at the end of this file; this repo’s default is **`npm run start`**.

### 10. After deploy

- Hit your public URL and API health/list routes; see **Quick verification after deploy** at the end of this file.
- Configure nginx / reverse proxy so the browser talks to the right **`PORT`** (or TLS termination in front of Node).

---

## Pre-built deploy: build elsewhere, run **start** only on hosting

Use this when **install + build on Plesk is slow or fails** (e.g. `EAGAIN`), and you are okay producing a **Linux-built** artifact on CI or another machine, then uploading it and only running **`npm run start:backend`** (or equivalent).

### Rules

1. **Build and `npm ci` on the same OS family as production** — typically **Linux x64** for shared hosting. Do **not** zip `node_modules` from **Windows/macOS** and expect Prisma/native addons to run on Linux.
2. **Any code or dependency change** requires a **new** artifact (re-run `npm ci` + `npm run build:backend` on Linux, re-upload).
3. Keep the **monorepo layout**: root **`package.json`** + **`package-lock.json`** + hoisted **`node_modules`** (workspaces). The backend start script assumes this.

### On your build machine (Linux or CI)

```bash
cd /path/to/repo
export NODE_ENV=production
npm ci
npm run build:backend
# If the build host is also resource-limited:
# NEXT_BUILD_LOW_PARALLEL=1 npm run build:backend
# or: npm run build:backend:hosting
```

Confirm these exist:

- `backend/.next/standalone/backend/server.js`
- `backend/.next/standalone/backend/.next/static` (from **`postbuild`**)
- `backend/.next/standalone/backend/public` (if you use `backend/public`)

### What to put in the upload archive (backend API focus)

Include **from the repo root**:

| Path | Include? |
|------|----------|
| `package.json`, `package-lock.json` | Yes |
| `node_modules/` | Yes — from **`npm ci` on Linux** |
| `backend/` | Yes — including **`backend/.next/`** (full build + standalone) |
| `backend/.env` | **No** in the zip — create/edit **`backend/.env` only on the server** (secrets) |
| `frontend/` | Yes — at least **`frontend/package.json`** (workspace); you may omit **`frontend/.next/`** if this host never runs the frontend |
| `prisma/` | Recommended — for **`npm run db:push`** / emergencies (optional if DB is already migrated) |

Exclude to save size: **`.git`**, **`frontend/.next`**, local **`*.log`**, **`backend/.env`** (set on server).

### On the server after upload

1. Extract so the **monorepo root** (folder with root `package.json`) matches your Plesk **application root**.
2. Add **`backend/.env`** (database, `JWT_SECRET`, `PORT`, CORS, etc.).
3. **First deploy / schema changes:** run **`npm run db:push`** once (needs network access to MySQL from that host).
4. **Start only** (no install, no build):

   ```bash
   export NODE_ENV=production
   npm run start:backend
   ```

   Or Plesk: startup command **`npm run start:backend`**, cwd = **monorepo root**.

### Frontend (SSR) on the same pattern

If this host also runs the public Next site, build on Linux with **`npm run build`** (or **`npm run build:frontend`** only), include **`frontend/.next`**, and use **`npm run start`** / **`npm run start:frontend`** from the repo root with a **different `PORT`** than the API (or deploy frontend on another vhost).

### CI tip

In GitHub Actions / GitLab CI, use **`runs-on: ubuntu-latest`**, run **`npm ci`** + **`npm run build:backend`**, then **`actions/upload-artifact`** or rsync the tree above to the server. On Plesk, replace files and **Restart App**.

---

## Cloud Node.js hosting (cPanel / Plesk / “Application URL” panels)

Use this when the provider gives you **Node version**, **Application root**, **Startup file**, and **npm install / build** fields.

### What to upload

| Upload | Notes |
|--------|--------|
| **Recommended:** whole **monorepo** | Root `package.json`, `package-lock.json`, `frontend/`, `backend/`, `prisma/` |
| **Do not upload** | `node_modules/`, `backend/.next/`, `frontend/.next/` (rebuild on server; avoids wrong OS binaries) |
| **Create on server** | `backend/.env` from `backend/.env.example` (database, `JWT_SECRET`, `PORT`, `CORS_ORIGINS`, etc.) |

### Document root vs application root

| Concept | Typical use |
|---------|-------------|
| **Document root** (web root) | Often for **static** HTML or PHP. For a **pure API** subdomain (`portalapi.example.com`), the panel may still show a document root; your **Node app** is separate. Point the domain’s **reverse proxy** (or “Node app URL”) at the **PORT** your API listens on—not at a folder of HTML. |
| **Application root** (for npm) | The directory where **the repo’s root `package.json`** lives. All **`npm ci` / `npm run build:backend`** commands run with **`cd` = this folder**. |

If the panel only lets you set **one** “application directory”, use the **monorepo root** (parent of `backend/`), not only `backend/`, so **`npm ci`** installs **workspaces** correctly.

### Install → build → start (backend API only)

Run over **SSH** or use the panel’s **deployment / build** UI with the same commands.

1. **Install** (from **monorepo root**):

   ```bash
   cd /path/to/repo-root
   npm ci
   ```

2. **Database** (first time or after schema changes):

   ```bash
   npm run db:push
   ```

3. **Build backend** (from **monorepo root**):

   ```bash
   export NODE_ENV=production
   npm run build:backend
   ```

   On **Plesk / shared hosting**, if you see **`spawn … EAGAIN`** during the build, use **`npm run build:backend:hosting`** instead.

   This runs **`prebuild`** (cleans `backend/.next`), **`next build`**, then **`postbuild`**, which copies **`backend/.next/static`** and **`backend/public`** into **`backend/.next/standalone/backend/`** so standalone does not 404 on `/_next/static`.

4. **Start** — pick **one** approach:

   | Approach | Application root (cwd) | Start command / “Application startup” |
   |----------|-------------------------|----------------------------------------|
   **A (recommended)** | Monorepo root | **`npm run start:backend`** |
   **B** | `backend/` | **`npm run start`** |

   Set **`NODE_ENV=production`**. Set **`PORT`** in the panel or in **`backend/.env`** (must match what nginx / the proxy forwards to).

   **Do not** use **`next dev`** in production.

### If the panel requires a “startup file” (path to one `.js` file)

This repo is meant to start via **`npm run start`** so Next runs in **production** (see `server_guide.ini`: pointing some panels at `node_modules/next/...` can accidentally behave like dev).

- Prefer fields named **“Application startup command”** / **“Run script”** and enter: **`npm run start:backend`** with cwd = **repo root**, or **`npm run start`** with cwd = **`backend/`**.
- If the panel **only** accepts a `.js` path, set **application root** to **`backend`** and use:

  **`node scripts/run-next-port.js start`**

  (That loads **`backend/.env`**, respects **`PORT`**, and runs **standalone `server.js`** with `dotenv`.)

  Avoid a random **`server.js`** in `httpdocs` that calls `next({ dev: true })` unless you know the panel forces production via **`NODE_ENV`**.

### Common errors

| Symptom | Likely cause |
|---------|----------------|
| **`Cannot find module`** / wrong Next version | **`npm install` was run only inside `backend/`** — run **`npm ci` from monorepo root** so workspaces hoist `node_modules`. |
| **`Missing standalone server`** | **`npm run build:backend`** did not finish; run build again from repo root. |
| **`404` on `/_next/static/...`** | Standalone asset copy missing — ensure **`postbuild`** ran (included in **`npm run build`** in **`backend/`**), or copy manually per section **7** below. |
| **`spawn … EAGAIN`** / **`kill EPERM`** during **`next build`** | Shared host process limits — use **`npm run build:backend:hosting`** (see **Plesk: spawn … EAGAIN**). |
| **Prisma errors at runtime** | **`DATABASE_URL`** wrong or DB unreachable; run **`npm run db:push`** after fixing env. |
| **CORS / cookies** | Set **`CORS_ORIGINS`** and **`FRONTEND_ORIGIN`** in **`backend/.env`** to your real frontend URLs. |

---

## Plesk: steps after upload

Follow this after the project files are on the server (FTP, Git, or **Domains → your domain → Files**). Exact button names differ slightly by Plesk version; look for **Node.js** on the domain or subscription.

### A) One Node app — **backend API only** (e.g. `portalapi.example.com`)

1. **Upload layout**  
   The folder that contains the **root** `package.json` (with `"workspaces": ["frontend","backend"]`) is your **monorepo root**. Example: `httpdocs/vuleits-website` or `httpdocs` if you uploaded the repo contents directly there.

2. **Create `backend/.env`**  
   In **Files**, copy from `backend/.env.example`, set **`DATABASE_URL`**, **`JWT_SECRET`**, **`PORT`**, **`CORS_ORIGINS`**, **`FRONTEND_ORIGIN`**, etc. The **`PORT`** must be a free port Plesk allows for Node (often shown in the Node.js UI).

3. **Open Node.js settings**  
   **Domains → your API domain → Node.js** (or **Hosting Settings → Node.js**).

4. **Node.js version**  
   Choose an **LTS** version (20.x or 22.x). Apply.

5. **Application mode**  
   **Production**.

6. **Document root**  
   Usually the same directory as your site’s web root for that domain (often `httpdocs` or your subfolder). This does not replace the need for the app to **listen on `PORT`**; Plesk’s Apache/nginx still proxies to Node.

7. **Application root**  
   Set to the **monorepo root** (the directory that contains the root `package.json`). **Not** `backend/` alone — otherwise `npm ci` will not install workspaces correctly.

8. **Install dependencies**  
   - **Package manager:** npm  
   - **Install command:** `npm ci`  
   (If `package-lock.json` is missing on the server, use `npm install` once.)  
   Click **Run npm install** (or use **SSH** in the same directory: `npm ci`).

9. **Database schema (first time or after Prisma changes)**  
   Use **SSH** ( **Domains → Web Hosting Access → SSH** ):

   ```bash
   cd /path/to/monorepo-root
   npm run db:push
   ```

10. **Build**  
    In SSH:

    ```bash
    cd /path/to/monorepo-root
    export NODE_ENV=production
    npm run build:backend
    ```

    On **shared Plesk**, if that fails with **`spawn … EAGAIN`** or **`kill EPERM`**, use **`npm run build:backend:hosting`** instead (see **Plesk: spawn … EAGAIN** below).

    Or, if your Plesk UI has a **“Build”** / **“Run script”** field, run the same command there with **working directory** = monorepo root.

11. **Application startup**  
    Prefer starting with an **npm script** (production, standalone):

    - **Option 1:** If Plesk has **“Application startup command”** / **custom command**:  
      `npm run start:backend`  
      with **application root** = monorepo root (same as step 7).

    - **Option 2:** If it insists on a **single startup file**, set **application root** temporarily to **`backend`** and use startup file:  
      `scripts/run-next-port.js`  
      with **arguments** / **Node options** if needed: your panel may require calling it as  
      `node scripts/run-next-port.js start`  
      (If the UI only accepts a relative path, use what the panel documents; the important part is **`start`** as the argument to that script.)

    **Do not** point the startup file at `node_modules/next/dist/bin/next` without the correct **`next start`** / production flow (see `server_guide.ini`).

12. **Environment variables in Plesk**  
    In the Node.js screen, add at least **`NODE_ENV=production`**. You can also set **`PORT`** here; if unset, **`backend/.env`** is still loaded by **`run-next-port.js`**.

13. **Enable / restart**  
    **Enable Node.js** for the domain, then **Restart App**.

14. **Check**  
    Open `https://your-api-domain/api/news` (or another public route). If you get **502**, confirm the app **listens on the `PORT`** Plesk expects and that the proxy in **Apache & nginx Settings** matches your host’s Node pattern.

### B) **Frontend (SSR)** on Plesk — second Node app

If the public site is **Next.js SSR** (not static `out/`), add **another** domain or subdomain with **its own** Node.js app:

- **Application root:** monorepo root (same clone on disk is fine).  
- **Startup:** `npm run start` or `npm run start:frontend` from **repo root**, with a **different `PORT`** than the backend.  
- Build first: `npm run build:frontend` (or full `npm run build`).

### C) **Frontend as static files**

If you use **`npm run build:frontend:static`**, upload **`frontend/out/`** contents to **`httpdocs`** (or the domain’s document root) as **static** hosting — **no** Node.js needed for that site; the API stays on the Node subdomain.

### Plesk quick reference

| Goal | Where / what |
|------|----------------|
| Monorepo path | Directory containing root **`package.json`** + **`frontend/`** + **`backend/`** + **`prisma/`** |
| Install | **`npm ci`** from that path |
| API build | **`npm run build:backend`** — on **shared** Plesk, if the build fails with **`spawn … EAGAIN`** or **`kill EPERM`**, use **`npm run build:backend:hosting`** instead (limits parallel workers). |
| API start (preferred) | **`npm run start:backend`** (cwd = monorepo root) |
| API start (file-based) | **`backend`**: `node scripts/run-next-port.js start` |
| Secrets | **`backend/.env`** + optional Plesk env vars |

### Plesk: `spawn … EAGAIN` / `kill EPERM` during `next build`

Shared hosting limits how many **child processes** one user may create. Next.js **Turbopack** often spawns many Node workers; the kernel returns **`EAGAIN`** (resource temporarily unavailable) and cleanup then hits **`EPERM`**.

**Fix:** build the backend with low parallelism (already wired in **`backend/next.config.ts`** when an env flag is set):

```bash
cd /path/to/monorepo-root
export NODE_ENV=production
npm run build:backend:hosting
```

Or from **`backend/`**: **`npm run build:hosting`** (runs **`prebuild:hosting`** → **`next build`** → **`postbuild:hosting`**: same clean + standalone asset copy as normal **`build`**).

Optional: cap CPUs further with **`NEXT_BUILD_CPUS=1`** (default under hosting mode is already **1**). Run the build over **SSH** instead of a cramped panel “Run script” sandbox if failures continue.

---

## Prerequisites

- **Node.js** (LTS) on the server.
- Run **`npm ci`** or **`npm install`** from the **repository root** so workspaces (`frontend`, `backend`) and hoisted `node_modules` resolve correctly.
- After schema changes: **`npm run db:generate`** (also runs on `postinstall` via `backend/scripts/prisma-with-db-env.js`).

---

## Build commands

From the repository root:

| Goal | Command |
|------|---------|
| Full production build (frontend + backend) | `npm run build` |
| Frontend only (SSR) | `npm run build:frontend` |
| **Static export** (upload `frontend/out/` to static hosting) | `npm run build:frontend:static` (uses `https://portalapi.vuleits.com` for build-time API) |
| **Static export (local API)** | `npm run build:frontend:static:local` with backend on `http://127.0.0.1:5001` (or set `BACKEND_PORT` in `frontend/.env.local` to match `PORT` in `backend/.env`), or set `NEXT_PUBLIC_API_BASE_URL` in `frontend/.env.local` |
| Backend only | `npm run build:backend` |
| Backend only (shared hosting / low process limit) | `npm run build:backend:hosting` |

**Deploying only the API app** (e.g. panel path `portalapi/`): `backend/tsconfig.json` and `frontend/tsconfig.json` are self-contained and no longer extend a parent `../tsconfig.json`, so `next build` works when that folder is the app root without the rest of the monorepo.

**Clean rebuild** (optional): delete `frontend/.next` and `backend/.next`, then run `npm run build`. On **Windows**, **`npm run build`** in **`frontend/`** and **`backend/`** runs **`prebuild`**, which deletes that app’s **`.next`** with retries (reduces **`EPERM` / `rmdir`** under OneDrive). You can also run **`npm run clean`** inside **`frontend/`** or **`backend/`** before building.

**Static export** must fetch listing endpoints to build `/news/[slug]`, `/products/[slug]`, and `/services/[id]`. The `build:frontend:static` script sets **`NEXT_PUBLIC_API_BASE_URL=https://portalapi.vuleits.com`** so list + detail pages use the same API during the build (override if you need a different host). To use a local API instead, set env in `frontend/.env.local` or the shell before building, for example:

```bash
set NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:5001
set NEXT_PUBLIC_SITE_URL=https://your-domain.com
npm run build:frontend:static
```

`NEXT_PUBLIC_STATIC_EXPORT=1` is applied by the script so `output: export` and `generateStaticParams` behave correctly inside the build workers. If the API is down or returns no items for a dynamic segment, the export build can fail: keep at least one news article, product, and service in the database, or use the normal SSR build (`npm run build:frontend`) instead.

On Linux/macOS use `export VAR=value` instead of `set`.

---

## Production: `npm run start` and `PORT`

Production start scripts **do not hardcode ports**; they use **`process.env.PORT`** (Next.js default). The backend **`npm run dev`** / **`npm run start`** helpers try **`PORT`** from **`backend/.env`** starting at **5001** by default and use the next free port if that one is taken. The frontend reads **`BACKEND_PORT`** only from **`frontend/.env`** / **`frontend/.env.local`** (not from `backend/.env`). Set **`BACKEND_PORT`** there to match the API **`PORT`** when you do not use **`NEXT_PUBLIC_API_BASE_URL`** or **`BACKEND_INTERNAL_URL`**. Rebuild the frontend after changing **`BACKEND_PORT`** if you use **`next start`** (rewrites are baked at build time).

| Where | Command | Notes |
|-------|---------|--------|
| Repo root | `npm run start` | Starts **frontend** workspace only (`next start`). |
| Repo root | `npm run start:frontend` | Same as above. |
| Repo root | `npm run start:backend` | Starts **backend** standalone server. |

**Typical layout on hosting**

- **Frontend Node app:** set a unique **`PORT`** in the panel (e.g. `3101`). Startup: from repo root, `npm run start` (or `cd frontend && npm run start`), with **`cwd`** at the monorepo root or `frontend/` per your host’s docs.
- **Backend Node app:** set a **different** **`PORT`** (e.g. `5101`). After `npm run build:backend`, run from repo root `npm run start:backend` **or** `cd backend && npm run start`. Working directory for `backend`’s `start` script must be **`backend/`** so `node .next/standalone/backend/server.js` resolves.

If **`PORT` is unset**, Next defaults to **3000** for both `next start` and the standalone server fallback—**assign `PORT` per app** in Plesk/cPanel/systemd or `.env`.

See comments in `frontend/.env.example` and `backend/.env.example`.

**Alternative backend command** (full Next server from source, not standalone): `cd backend && npm run start:next` (also respects **`PORT`**).

---

## Deploy the static frontend

1. Run `npm run build:frontend:static`.
2. Upload the contents of `frontend/out/` to your static host (object storage + CDN, nginx `root`, etc.).

The exported site uses **same-origin** URLs such as `/api/...` and `/uploads/...`. Static hosting does not run Next.js rewrites, so you must put a **reverse proxy** in front (see below) or change the app to call a full API URL via `NEXT_PUBLIC_API_BASE_URL` everywhere (not the default for local dev).

---

## Your domain setup (`vuleits.com` + `portalapi.vuleits.com`)

Current frontend code calls many endpoints with relative URLs (`/api/...`) and uses cookie auth (`credentials: 'include'`).  
For this project, the safest production setup is:

1. Keep frontend on `https://vuleits.com`.
2. Keep backend app on `https://portalapi.vuleits.com`.
3. Configure `vuleits.com` to reverse proxy `/api/*` and `/uploads/*` to `https://portalapi.vuleits.com`.

That preserves same-origin behavior in the browser (`vuleits.com`), so admin login/session cookies keep working without rewriting all fetch calls.

---

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
# PORT=5101   # unique per app on shared hosting
```

---

## Deploy the backend (standalone Node)

1. On the server, install dependencies and build from the repo root: `npm ci` then `npm run build:backend`. **`npm run build` in `backend/` runs `prebuild`** (cleans `backend/.next`), then **`next build`**, then **`postbuild`** (copies `static` + `public` into the standalone tree). On **Windows**, if you still see **`EPERM` / `rmdir` on `.next\diagnostics`**, stop **`next dev`**, pause **OneDrive** (or move the repo outside OneDrive), and exclude **`backend/.next`** from real-time antivirus scanning; then run `cd backend && npm run clean && npm run build`.
2. This monorepo places the standalone entry under `backend/.next/standalone/` (see [Next.js standalone output](https://nextjs.org/docs/app/api-reference/config/next-config-js/output)). **`postbuild`** already copies **`backend/.next/static`** → **`backend/.next/standalone/backend/.next/static`** and **`backend/public`** → **`backend/.next/standalone/backend/public`** when needed; repeat the manual copy in **§7** only if you disabled lifecycle scripts.

3. Start the server from the **`backend`** directory (so the `start` script path is correct):

   ```bash
   cd backend
   npm run start
   ```

   Or from the repo root: `npm run start:backend`.

   Set **`PORT`** (and optionally **`HOSTNAME`**) for your host. The standalone `server.js` reads **`process.env.PORT`**.

4. Provide environment variables (database, `JWT_SECRET`, etc.) in `backend/.env` or your process manager.
5. Prisma client lives in `node_modules`; keep the same `node_modules` layout from the install at the **repo root**, or run `npm run db:generate` on the server after deploy so `@prisma/client` matches your schema.

Point nginx (or your panel) at **`127.0.0.1:$PORT`** where **`PORT`** matches the backend app’s environment.

---

## Nginx example (single domain)

Browser requests go to one host; nginx serves files for `/` and forwards `/api` and `/uploads` to Node. Replace **`5000`** with the **`PORT`** your backend actually uses.

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

Adjust `root` to your uploaded `out/` path and the upstream port to match your backend **`PORT`**.

---

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

Replace **`5000`** with your backend **`PORT`**.

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

---

## Optional: direct cross-origin frontend calls

Only use this if you decide to remove the reverse proxy and call `https://portalapi.vuleits.com/api/...` directly from browser code.

- Keep backend CORS allowlist accurate (`CORS_ORIGINS`).
- Keep cookies configured for cross-site use (if auth/session cookies are used).
- Update all frontend relative API calls (`/api/...`) to absolute base URL usage.

Current project code is already optimized for same-origin calls via reverse proxy.

---

## Quick verification after deploy

Run these checks:

- `https://vuleits.com/` loads static site.
- `https://vuleits.com/api/news` returns JSON via proxy.
- `https://portalapi.vuleits.com/api/news` returns JSON directly.
- Admin login from `https://vuleits.com/admin/login` succeeds and remains logged in after refresh.
- One sample page from each dynamic route works: `/news/<slug>`, `/products/<slug>`, `/services/<id>`.

If any of these fail, check DNS, TLS certs, nginx `proxy_pass`, and backend env values first.

---

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

---

## Environment reminders

- `NEXT_PUBLIC_SITE_URL` — canonical public URL (SEO, sitemap, JSON-LD).
- `NEXT_PUBLIC_API_BASE_URL` — during **static export build**, must point at the API that serves listing endpoints; at **runtime** for the static site, same-origin `/api` is usual when using the proxy above.
- Backend CORS: set `CORS_ORIGINS=https://vuleits.com,https://www.vuleits.com` (and add staging origins if used).

---

## Plesk / Passenger note

Use **`npm run start`** (production) or the documented **`node`** entry for your app so Next runs in **production** mode, not dev. A custom `server.js` “bootstrap” is only needed if your panel cannot run `npm start` correctly; see `server_guide.ini` for context. Always set a unique **`PORT`** per Node application when multiple sites share one server.

For a full click-path after upload, see **Plesk: steps after upload** above.
