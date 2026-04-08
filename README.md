# VULE ITS Website

Monorepo for the VULE ITS web platform with separate frontend and backend Next.js apps.

## Overview

- `frontend`: Public website and admin UI
- `backend`: API server (App Router API routes)
- `prisma`: Database schema and seed scripts
- Shared root scripts for development, build, and database tasks

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

See [hosting.md](hosting.md) for static export, standalone API, `npm run start`, `PORT` per app, nginx, and env variables.

## Notes

- Frontend calls backend through `NEXT_PUBLIC_API_BASE_URL`.
- `.next` build output is generated and should be treated as temporary build artifacts.
- If build fails in backend TypeScript checks, resolve API typing issues before deployment.
