# VULE ITS Website - Implementation Notes

## Scope

This document tracks the current implementation state of the monorepo:

- `frontend` (public site + admin UI)
- `backend` (API service)
- `prisma` (schema and seed)

## Architecture

### Frontend

- Next.js App Router UI app
- Public routes:
  - `/`
  - `/news`, `/news/[slug]`
  - `/products`, `/products/[slug]`
  - `/services`, `/services/[id]`
- Admin routes:
  - `/admin/login`
  - `/admin/dashboard`
  - `/admin/company-profile`
  - `/admin/profile`
  - `/admin/permissions`
  - `/admin/about-us`

### Backend

- Next.js App Router API app under `backend/app/api`
- Public APIs for:
  - products, services, news
  - company branding/contact
  - about intro/team/stats
  - home features
- Admin APIs for:
  - authentication + profile
  - permissions and roles
  - users
  - products/services/news/media
  - company profile
  - about/home content modules

### Database

- Prisma + MySQL
- Schema in `prisma/schema.prisma`
- Seed script in `prisma/seed.js`

## Admin UI Modules

Implemented manager panels in `frontend/components/admin`:

- `ContactsAdminPanel`
- `AboutIntroAdminPanel`
- `AboutTeamAdminPanel`
- `AboutStatsAdminPanel`
- `HomeFeaturesAdminPanel`
- `ServicesAdminPanel`
- `ProductsAdminPanel`
- `NewsAdminPanel`
- `UsersAdminPanel`
- `MediaAdminPanel`
- `PermissionsAdminPanel`

Shared admin components include:

- `AdminConfirmDialog`
- `AdminEditIcon`
- `AdminTrashIcon`
- `useAnimatedOriginModal` (shared modal appear/disappear behavior)

## Internationalization

- Locale provider: `frontend/components/providers/LocaleProvider.tsx`
- Supported locales: `en-US`, `vi-VN`
- Locale switching integrated across public navigation/pages and major admin panels

## Recent Cleanup (This Session)

- Removed generated build output folders:
  - `frontend/.next`
  - `backend/.next`
- Removed orphan root artifacts not referenced by source:
  - `output.txt`
  - `extract_docs.ps1`
- Updated core project documentation (`README.md`, `IMPLEMENTATION.md`)

## Build Status Snapshot

- `frontend` production build: successful
- `backend` production build: currently blocked by a TypeScript narrowing issue in:
  - `backend/app/api/admin/home-features/[id]/route.ts`

## Operational Commands

From repository root:

```bash
npm install
npm run db:generate
npm run db:push
npm run seed
npm run dev:backend
npm run dev:frontend
npm run build
```

## Next Recommended Actions

1. Fix backend auth-return type narrowing in `home-features/[id]` route.
2. Re-run `npm run build` to verify full green build.
3. Optionally centralize remaining inline localized strings into `LocaleProvider` keys for consistency.
