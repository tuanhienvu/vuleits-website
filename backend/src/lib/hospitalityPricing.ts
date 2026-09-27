type RatePeriod = {
  startDate: Date;
  endDate: Date;
  nightlyUsd: number | { toNumber?: () => number; toString: () => string };
  isActive: boolean;
};

type BlockedDate = {
  blockedDate: Date;
};

const DAY_MS = 24 * 60 * 60 * 1000;

function startOfDay(date: Date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function eachNight(checkIn: Date, checkOut: Date): Date[] {
  const out: Date[] = [];
  for (let t = startOfDay(checkIn).getTime(); t < startOfDay(checkOut).getTime(); t += DAY_MS) {
    out.push(new Date(t));
  }
  return out;
}

export function hasBlockedDateInRange(checkIn: Date, checkOut: Date, blocked: BlockedDate[]) {
  const blockedSet = new Set(
    blocked.map((b) => startOfDay(new Date(b.blockedDate)).toISOString().slice(0, 10)),
  );
  for (const night of eachNight(checkIn, checkOut)) {
    if (blockedSet.has(startOfDay(night).toISOString().slice(0, 10))) return true;
  }
  return false;
}

export function computeStayAmountUsd(
  baseNightlyUsd: number,
  checkIn: Date,
  checkOut: Date,
  periods: RatePeriod[],
) {
  const nights = eachNight(checkIn, checkOut);
  const total = nights.reduce((sum, night) => {
    const override = periods.find((p) => {
      if (!p.isActive) return false;
      const s = startOfDay(new Date(p.startDate)).getTime();
      const e = startOfDay(new Date(p.endDate)).getTime();
      const t = startOfDay(night).getTime();
      return t >= s && t <= e;
    });
    return sum + (override ? Number(override.nightlyUsd) : baseNightlyUsd);
  }, 0);
  return {
    nights: Math.max(1, nights.length),
    amountUsd: total,
  };
}
