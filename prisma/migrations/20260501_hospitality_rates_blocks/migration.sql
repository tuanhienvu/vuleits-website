CREATE TABLE "hospitality_rate_periods" (
    "id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "nightly_usd" DECIMAL(10,2) NOT NULL,
    "note" VARCHAR(250),
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "hospitality_rate_periods_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "hospitality_blocked_dates" (
    "id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "blocked_date" TIMESTAMP(3) NOT NULL,
    "reason" VARCHAR(250),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "hospitality_blocked_dates_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "hospitality_blocked_dates_room_id_blocked_date_key" ON "hospitality_blocked_dates"("room_id", "blocked_date");
CREATE INDEX "hospitality_rate_periods_room_id_start_date_end_date_is_active_idx" ON "hospitality_rate_periods"("room_id", "start_date", "end_date", "is_active");
CREATE INDEX "hospitality_blocked_dates_room_id_blocked_date_idx" ON "hospitality_blocked_dates"("room_id", "blocked_date");

ALTER TABLE "hospitality_rate_periods"
ADD CONSTRAINT "hospitality_rate_periods_room_id_fkey"
FOREIGN KEY ("room_id") REFERENCES "hospitality_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "hospitality_blocked_dates"
ADD CONSTRAINT "hospitality_blocked_dates_room_id_fkey"
FOREIGN KEY ("room_id") REFERENCES "hospitality_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
