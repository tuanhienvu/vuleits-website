# VULE ITS Website

Monorepo for the VULE ITS web platform with separate frontend and backend Next.js apps.

## Overview

- `frontend`: Public website and admin UI
- `backend`: API server (App Router API routes)
- `prisma`: Database schema and seed scripts
- Shared root scripts for development, build, and database tasks

The two apps are **independent packages**: you can install and build each from its own directory (`cd frontend` / `cd backend`) or use root workspace scripts. They communicate only over HTTP through the frontend's `/api` rewrites and the backend's local port. The backend does not import the frontend source tree.

## Current Features

### Public frontend

- Home, News, Products, Services pages and detail pages
- Company branding/contact integration from backend APIs
- Locale switching (`en-US`, `vi-VN`)

### Admin frontend

- Dashboard + sidebar navigation
- Company profile management
- About Us intro management
- News, Services, Products, Users, Media managers
- About Team, About Stats, Home Features managers
- Reusable animated modal behavior for edit/delete flows

### Backend APIs

- Public endpoints for products, services, news, company, about, home features
- Admin endpoints for auth, profile, permissions, content CRUD, media, settings
- Prisma ORM + MySQL

## Project Structure

```txt
backend/
  app/api/           API routes
  src/lib/           auth, permissions, helpers
frontend/
  app/               routes/pages
  components/        shared and admin components
  lib/               client helpers/types
prisma/
  schema.prisma
  seed.js
```

## Requirements

- Node.js 20+
- npm 10+
- MySQL database

## Environment

Create:

- `backend/.env.local` (based on `backend/.env.example`)
- `frontend/.env.local` with:

```env
# Optional for local SSR: omit to use PORT from backend/.env (see frontend/.env.example).
# NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:5001
```

## Install

```bash
npm install
```

## Database Setup

```bash
npm run db:generate
npm run db:push
npm run seed
```

Seeded local admin accounts:

- `vuleitsolution@gmail.com` / `VULEITS@2025#` for full sysadmin access
- `demo@vuleits.com` / `demo` for limited demo/manager access

## Run Locally

Terminal 1:

```bash
cd backend
npm run dev
```

Terminal 2:

```bash
cd frontend
npm run dev
```

The public site runs on `http://localhost:3001` by default and proxies `/api/*` to the backend using `BACKEND_PORT` from `frontend/.env.local`.

## Build

```bash
npm run build
```

Or separately:

```bash
npm run build:frontend
npm run build:backend
```

## Hosting

See [hosting.md](hosting.md) for local dev, Docker, `npm run start`, `PORT` per app, and env variables.

## Notes

- Frontend proxies `/api` to the backend via Next rewrites; set **`BACKEND_PORT`** in `frontend/.env.local` to match the backend.
- `.next` build output is generated and should be treated as temporary build artifacts.
- If build fails in backend TypeScript checks, resolve API typing issues before deployment.
