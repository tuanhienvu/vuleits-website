# Team Member CV Feature — Design Spec

**Date:** 2026-09-17  
**Status:** Approved in chat (bilingual + slug on member); awaiting spec file review  
**Scope:** Additive CV management for existing About team members

## Goals

- Add bilingual CV data for `AboutTeamMember` without breaking existing About / admin behavior.
- Public page at `/team/[slug]/cv` inspired by `tuanhienvu_cv/`.
- Extend `AboutTeamAdminPanel` with a “CV Information” section.
- Link the About page brief/resume icon to the CV when available.

## Non-goals

- Do not replace or remove existing team card fields (emoji, name, role, bio).
- Do not change other About icons or layout beyond the CV link behavior.
- Do not introduce a separate permissions feature; reuse `aboutTeam.*`.
- Do not migrate Docker MySQL (already on PostgreSQL).

## Decisions

| Topic | Decision |
|-------|----------|
| Locale | Bilingual (EN + `*Vi` fields) for user-facing CV text |
| Slug | Unique optional `slug` on `AboutTeamMember`; auto-generate from name if missing |
| Relation | `AboutTeamMember` 1 — 0..1 `AboutTeamMemberCV` |
| Data shape | Normalized child tables (not JSON blobs) for skills/experience/education/etc. |
| API style | REST under existing backend App Router (`/api/admin/about-team/...`, `/api/about/team/...`) |
| Uploads | Reuse existing uploads/media patterns; store URLs on CV (`avatarUrl`, `cvPdfUrl`) |
| Admin UI | Keep current CRUD; add CV tab/section inside edit flow |
| Missing CV | Disable brief icon + tooltip “CV not available” |

## Data model

### Relationship diagram

```
AboutTeamMember (existing)
  ├── slug String? @unique          // NEW
  └── cv   AboutTeamMemberCV?       // NEW 1:0..1

AboutTeamMemberCV
  ├── teamMemberId @unique FK → AboutTeamMember (onDelete: Cascade)
  ├── title / titleVi
  ├── profileSummary / profileSummaryVi
  ├── email, phone, location
  ├── avatarUrl, cvPdfUrl
  ├── isPublished Boolean @default(true)
  ├── skills          AboutTeamMemberCvSkill[]
  ├── experiences     AboutTeamMemberCvExperience[]
  ├── educations      AboutTeamMemberCvEducation[]
  ├── certifications  AboutTeamMemberCvCertification[]
  ├── languages       AboutTeamMemberCvLanguage[]
  └── socialLinks     AboutTeamMemberCvSocialLink[]
```

### Tables (summary)

**AboutTeamMemberCvSkill** — `name`, `nameVi?`, `description`, `descriptionVi?`, `displayOrder`  
**AboutTeamMemberCvExperience** — `company`, `companyVi?`, `position`, `positionVi?`, `description`, `descriptionVi?`, `startDate`, `endDate?`, `isCurrent`, `displayOrder`  
**AboutTeamMemberCvEducation** — `school`, `schoolVi?`, `degree`, `degreeVi?`, `fieldOfStudy`, `fieldOfStudyVi?`, `gpa?`, `startDate?`, `endDate?`, `displayOrder`  
**AboutTeamMemberCvCertification** — `name`, `nameVi?`, `issuer?`, `issuerVi?`, `issuedAt?`, `credentialUrl?`, `displayOrder`  
**AboutTeamMemberCvLanguage** — `name`, `nameVi?`, `proficiency?`, `displayOrder`  
**AboutTeamMemberCvSocialLink** — `label`, `labelVi?`, `url`, `displayOrder`

Indexes: FK columns, `displayOrder`, `AboutTeamMember.slug` unique, `AboutTeamMemberCV.teamMemberId` unique.

### Migration safety

- Additive only: new nullable `slug` + new tables.
- Backfill slugs for existing members in migration or seed helper (unique, URL-safe).
- Use Prisma migrate SQL under `prisma/migrations/`.
- Cascade delete: deleting a team member removes CV and children.

## API

### Public

- `GET /api/about/team` — extend response with `id`, `slug`, `hasCv` (keep existing name/role/bio/emoji).
- `GET /api/about/team/[slug]/cv?locale=` — full localized CV payload; 404 if no member or no CV / unpublished.

### Admin (auth: `aboutTeam.read|create|update|delete`)

- `GET /api/admin/about-team/[id]/cv`
- `PUT /api/admin/about-team/[id]/cv` — upsert CV + nested replace/sync of children (validated body)
- `DELETE /api/admin/about-team/[id]/cv`
- Avatar / PDF upload: reuse admin media or dedicated multipart endpoints under the same about-team CV path if media types are constrained; store resulting public URL.

Validation: required title/summary/email patterns; URL checks for avatar/pdf/social; date consistency (`endDate` null if `isCurrent`).

## Frontend

### Public CV page

- `frontend/app/(public)/team/[slug]/cv/page.tsx` — server component fetch.
- Presentational components under `frontend/components/pages/team/` (header, profile, skills grid, experience timeline, education, certifications, social, download CTA).
- Styling: Tailwind, executive resume layout inspired by `tuanhienvu_cv/tuanhienvu-resume2.html` + `resume.css`.
- SEO: `generateMetadata` from name/title/summary.
- Print-friendly CSS; respect existing light/dark tokens (`text-fg`, `glass`, etc.).
- States: loading (Suspense), 404 not-found, empty sections omitted.

### About page

- Extend `TeamRow` with `slug`, `hasCv`.
- Wire brief/resume icon (around line 215) as `Link` or button → `/team/{slug}/cv` when `hasCv`; else disabled + tooltip.
- Do not change email/linkedin/other decorative icons’ current behavior unless they already navigate.

### Admin

- Extend `AboutTeamAdminPanel` edit modal with tab/section **CV Information**.
- Sub-editors for skills / experience / education / certifications / languages / social (add/edit/delete/reorder).
- Preview opens `/team/[slug]/cv` in new tab.
- Toasts via existing `ToastProvider`.

## Seed

- Ensure team members have unique slugs.
- Seed one sample CV (content adapted from `tuanhienvu_cv`) for a designated member if missing; bilingual EN/VI stubs where needed.

## Folder structure (planned)

```
prisma/schema.prisma                          # models
prisma/migrations/<timestamp>_team_member_cv/ # migration SQL
prisma/seed.js                                # slug backfill + sample CV

backend/app/api/about/team/route.ts           # + slug, hasCv
backend/app/api/about/team/[slug]/cv/route.ts # NEW public CV
backend/app/api/admin/about-team/[id]/cv/route.ts # NEW admin CV CRUD
backend/src/lib/teamMemberCv.ts               # validation helpers / mappers (optional)

frontend/app/(public)/team/[slug]/cv/page.tsx
frontend/components/pages/team/TeamMemberCvPage.tsx
frontend/components/pages/AboutPage.tsx       # CV icon link
frontend/components/admin/AboutTeamAdminPanel.tsx
frontend/components/admin/AboutTeamCvEditor.tsx # NEW extracted CV UI
frontend/lib/locale/defaultMessages.ts        # strings EN/VI
```

## Testing / acceptance

1. Existing About team list/create/edit/delete still works without a CV.
2. Public About cards unchanged except CV icon behavior.
3. Creating a CV enables the icon; deleting CV disables it.
4. `/team/[slug]/cv` renders EN and VI via locale.
5. Migration applies cleanly on empty and existing DBs.
6. Invalid payloads return 400; unauthorized admin returns 401/403.

## Out of scope / later

- Full PDF generation from HTML (v1 uses uploaded `cvPdfUrl`).
- Separate RBAC permission key for CV-only.
