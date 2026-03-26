# VULE ITS Website - IEEE 830 SRS Implementation

A modern, responsive website portal built with Next.js, React, and Tailwind CSS following IEEE 830 Software Requirements Specification. Features glass morphism design with comprehensive CMS functionality.

## 📋 Project Overview

**VULE ITS Website** is a full-featured web portal with:
- **Public Portal**: Homepage, Products, News, About, Services, Contact, Legal Pages
- **Admin CMS**: Content management for products, news, media, banners, users
- **Glass Morphism UI**: Modern frosted glass design pattern
- **Role-Based Access Control**: SuperAdmin, Admin, Editor roles
- **SEO Optimized**: Meta tags, structured data support

## 🏗️ Project Structure

```
frontend/
├── app/            # Next.js routes/pages
├── components/     # Shared UI components
├── hooks/          # Frontend hooks
├── lib/            # Frontend utilities/types
└── public/         # Static assets
backend/
├── app/api/        # Backend API routes
├── src/lib/        # Backend business/data modules
└── public/uploads/ # Uploaded assets
prisma/
└── schema.prisma       # Database models
```

## 📄 Public Portal Pages

- **Home**: Hero, features, navigation
- **Products**: Listing with search & filters
- **News**: Articles with tag filtering
- **About**: Company info, team, stats
- **Services**: 6 service offerings
- **Contact**: Form with validation
- **Legal**: Privacy Policy, Terms of Service

## 🔐 Admin Dashboard

Modules for managing:
- Products (CRUD)
- News (CRUD)
- Users (RBAC)
- Media uploads
- Banner sliders
- Contact submissions

## 🎨 Glass Morphism Design

- Frosted glass effects
- Backdrop blur
- Smooth transitions
- Responsive layout
- Modern animations

## 📊 Database (Prisma)

Models: User, Role, Product, News, BannerSlider, Media, Contact, AboutSection, PrivacyPolicy, TermsOfService, SiteSetting

## 🚀 Quick Start

```bash
# Install
npm install

# Setup env files
# backend/.env (copy from backend/.env.example)
# frontend/.env.local
#   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# Generate Prisma client
npm run db:generate

# Sync schema
npm run db:push

# Run (in separate terminals)
npm run dev:backend
npm run dev:frontend
```

## 📝 Tech Stack

- Next.js 14+, React 18+, TypeScript
- Tailwind CSS 3+
- Prisma ORM, MySQL
- Glass Morphism UI

## Version: 1.0 | Status: In Development | Updated: Dec 13, 2025

---

## Monorepo Split (Frontend + Backend)

The repository now supports two deployable Next.js apps:

- `frontend` -> deploy to `https://vuleits.com`
- `backend` -> deploy to `https://portal.vuleits.com`

### Local Development

1. Install dependencies at repo root:

```bash
npm install
```

2. Configure env files:

- `frontend/.env.local`
  - `NEXT_PUBLIC_API_BASE_URL=http://localhost:5000`
- `backend/.env.local`
  - Copy from `backend/.env.example`

3. Start backend:

```bash
npm run dev:backend
```

4. Start frontend (new terminal):

```bash
npm run dev:frontend
```

### Build/Run Separately

```bash
npm run build:backend
npm run start:backend

npm run build:frontend
npm run start:frontend
```

### Integration Notes

- Frontend rewrites `/api/*` to `NEXT_PUBLIC_API_BASE_URL/api/*`.
- Backend owns API routes under `backend/app/api/**` with a fallback dispatcher only for unknown paths.
- CORS/security headers are set in backend dispatcher for cross-subdomain requests.
- Backend now has localized core server modules under `backend/src/lib` (`prisma`, `jwt`, `adminAuth`, `adminEmail`) and locally migrated APIs for:
  - `/api/products`
  - `/api/products/[slug]`
  - `/api/products/analytics`
  - `/api/admin/login`
  - `/api/admin/logout`
