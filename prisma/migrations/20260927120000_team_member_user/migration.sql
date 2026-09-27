-- Link each team profile to at most one login so that person can edit their own CV.
ALTER TABLE "AboutTeamMember" ADD COLUMN IF NOT EXISTS "user_id" INTEGER;

CREATE UNIQUE INDEX IF NOT EXISTS "AboutTeamMember_user_id_key" ON "AboutTeamMember"("user_id");

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'AboutTeamMember_user_id_fkey'
  ) THEN
    ALTER TABLE "AboutTeamMember"
      ADD CONSTRAINT "AboutTeamMember_user_id_fkey"
      FOREIGN KEY ("user_id") REFERENCES "User"("id")
      ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- Match an existing CV email to a single user account when the link is unambiguous.
WITH matches AS (
  SELECT m.id AS member_id, u.id AS user_id
  FROM "AboutTeamMember" m
  JOIN "about_team_member_cvs" cv ON cv.team_member_id = m.id
  JOIN "User" u ON lower(u.email) = lower(cv.email)
  WHERE cv.email IS NOT NULL AND btrim(cv.email) <> ''
),
unique_matches AS (
  SELECT member_id, MIN(user_id) AS user_id
  FROM matches
  GROUP BY member_id
  HAVING COUNT(DISTINCT user_id) = 1
),
unique_users AS (
  SELECT user_id, MIN(member_id) AS member_id
  FROM unique_matches
  GROUP BY user_id
  HAVING COUNT(*) = 1
)
UPDATE "AboutTeamMember" m
SET "user_id" = uu.user_id
FROM unique_users uu
WHERE m.id = uu.member_id
  AND m."user_id" IS NULL;
