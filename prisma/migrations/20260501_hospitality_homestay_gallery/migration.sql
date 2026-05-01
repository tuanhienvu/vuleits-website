-- Add HOMESTAY enum value to hospitality room types
ALTER TYPE "HospitalityRoomType" ADD VALUE IF NOT EXISTS 'HOMESTAY';

-- Store multiple images per hospitality room/gallery
ALTER TABLE "hospitality_rooms"
ADD COLUMN IF NOT EXISTS "gallery_image_urls" JSONB NOT NULL DEFAULT '[]'::jsonb;
