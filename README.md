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
src/
├── app/
│   ├── page.tsx                 # Main portal with page routing
│   ├── globals.css              # Global styles & animations
│   └── admin/
│       ├── login/page.tsx       # Admin login
│       └── dashboard/page.tsx   # Admin dashboard
├── components/
│   ├── Navigation.tsx           # Navigation bar
│   ├── Footer.tsx               # Footer
│   └── pages/
│       ├── HomePage.tsx
│       ├── AboutPage.tsx
│       ├── ProductsPage.tsx
│       ├── NewsPage.tsx
│       ├── ServicesPage.tsx
│       ├── ContactPage.tsx
│       ├── PrivacyPolicyPage.tsx
│       └── TermsOfServicePage.tsx
prisma/
└── schema.prisma               # Database models
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

# Setup .env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=vuleits
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password

# Generate Prisma client
npm run db:generate

# Sync schema
npm run db:push

# Run
npm run dev
```

## 📝 Tech Stack

- Next.js 14+, React 18+, TypeScript
- Tailwind CSS 3+
- Prisma ORM, MySQL
- Glass Morphism UI

## Version: 1.0 | Status: In Development | Updated: Dec 13, 2025
