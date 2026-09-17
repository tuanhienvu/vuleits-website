-- AlterTable
ALTER TABLE "AboutTeamMember" ADD COLUMN IF NOT EXISTS "slug" VARCHAR(160);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "AboutTeamMember_slug_key" ON "AboutTeamMember"("slug");

-- CreateTable
CREATE TABLE IF NOT EXISTS "about_team_member_cvs" (
    "id" SERIAL NOT NULL,
    "team_member_id" INTEGER NOT NULL,
    "title" VARCHAR(150) NOT NULL,
    "title_vi" VARCHAR(150),
    "profile_summary" TEXT NOT NULL,
    "profile_summary_vi" TEXT,
    "email" VARCHAR(190),
    "phone" VARCHAR(60),
    "location" VARCHAR(190),
    "location_vi" VARCHAR(190),
    "avatar_url" VARCHAR(2000),
    "cv_pdf_url" VARCHAR(2000),
    "is_published" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "about_team_member_cvs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "about_team_member_cv_skills" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "name" VARCHAR(150) NOT NULL,
    "name_vi" VARCHAR(150),
    "description" TEXT NOT NULL,
    "description_vi" TEXT,
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "about_team_member_cv_skills_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "about_team_member_cv_experiences" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "company" VARCHAR(190) NOT NULL,
    "company_vi" VARCHAR(190),
    "position" VARCHAR(190) NOT NULL,
    "position_vi" VARCHAR(190),
    "description" TEXT NOT NULL,
    "description_vi" TEXT,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3),
    "is_current" BOOLEAN NOT NULL DEFAULT false,
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "about_team_member_cv_experiences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "about_team_member_cv_educations" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "school" VARCHAR(190) NOT NULL,
    "school_vi" VARCHAR(190),
    "degree" VARCHAR(190) NOT NULL,
    "degree_vi" VARCHAR(190),
    "field_of_study" VARCHAR(190) NOT NULL,
    "field_of_study_vi" VARCHAR(190),
    "gpa" VARCHAR(32),
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "about_team_member_cv_educations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "about_team_member_cv_certifications" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "name" VARCHAR(190) NOT NULL,
    "name_vi" VARCHAR(190),
    "issuer" VARCHAR(190),
    "issuer_vi" VARCHAR(190),
    "issued_at" TIMESTAMP(3),
    "credential_url" VARCHAR(2000),
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "about_team_member_cv_certifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "about_team_member_cv_languages" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "name" VARCHAR(120) NOT NULL,
    "name_vi" VARCHAR(120),
    "proficiency" VARCHAR(80),
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "about_team_member_cv_languages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE IF NOT EXISTS "about_team_member_cv_social_links" (
    "id" SERIAL NOT NULL,
    "cv_id" INTEGER NOT NULL,
    "label" VARCHAR(120) NOT NULL,
    "label_vi" VARCHAR(120),
    "url" VARCHAR(2000) NOT NULL,
    "display_order" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "about_team_member_cv_social_links_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "about_team_member_cvs_team_member_id_key" ON "about_team_member_cvs"("team_member_id");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "about_team_member_cv_skills_cv_id_display_order_idx" ON "about_team_member_cv_skills"("cv_id", "display_order");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "about_team_member_cv_experiences_cv_id_display_order_idx" ON "about_team_member_cv_experiences"("cv_id", "display_order");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "about_team_member_cv_educations_cv_id_display_order_idx" ON "about_team_member_cv_educations"("cv_id", "display_order");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "about_team_member_cv_certifications_cv_id_display_order_idx" ON "about_team_member_cv_certifications"("cv_id", "display_order");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "about_team_member_cv_languages_cv_id_display_order_idx" ON "about_team_member_cv_languages"("cv_id", "display_order");

-- CreateIndex
CREATE INDEX IF NOT EXISTS "about_team_member_cv_social_links_cv_id_display_order_idx" ON "about_team_member_cv_social_links"("cv_id", "display_order");

-- AddForeignKey
DO $$ BEGIN
    ALTER TABLE "about_team_member_cvs" ADD CONSTRAINT "about_team_member_cvs_team_member_id_fkey" FOREIGN KEY ("team_member_id") REFERENCES "AboutTeamMember"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- AddForeignKey
DO $$ BEGIN
    ALTER TABLE "about_team_member_cv_skills" ADD CONSTRAINT "about_team_member_cv_skills_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "about_team_member_cvs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- AddForeignKey
DO $$ BEGIN
    ALTER TABLE "about_team_member_cv_experiences" ADD CONSTRAINT "about_team_member_cv_experiences_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "about_team_member_cvs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- AddForeignKey
DO $$ BEGIN
    ALTER TABLE "about_team_member_cv_educations" ADD CONSTRAINT "about_team_member_cv_educations_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "about_team_member_cvs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- AddForeignKey
DO $$ BEGIN
    ALTER TABLE "about_team_member_cv_certifications" ADD CONSTRAINT "about_team_member_cv_certifications_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "about_team_member_cvs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- AddForeignKey
DO $$ BEGIN
    ALTER TABLE "about_team_member_cv_languages" ADD CONSTRAINT "about_team_member_cv_languages_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "about_team_member_cvs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- AddForeignKey
DO $$ BEGIN
    ALTER TABLE "about_team_member_cv_social_links" ADD CONSTRAINT "about_team_member_cv_social_links_cv_id_fkey" FOREIGN KEY ("cv_id") REFERENCES "about_team_member_cvs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;
