/**
 * Mock availability.
 * The calendar and time list only talk to `availabilityProvider`.
 * Replace those two methods with fetches to your booking API later.
 * Keep the DayAvailability shape the same and the UI will not need to change.
 */

export type TimeSlot = {
  time: string;
  available: boolean;
};

export type DayReason = "open" | "past" | "closed" | "holiday" | "full" | "beyond";

export type DayAvailability = {
  date: string;
  open: boolean;
  reason: DayReason;
  slots: TimeSlot[];
};

const SLOT_DEFS = [
  { time: "10:00 AM", minutes: 10 * 60 },
  { time: "12:00 PM", minutes: 12 * 60 },
  { time: "2:00 PM", minutes: 14 * 60 },
  { time: "4:30 PM", minutes: 16 * 60 + 30 },
  { time: "6:30 PM", minutes: 18 * 60 + 30 },
  { time: "8:00 PM", minutes: 20 * 60 },
] as const;

const HOLIDAYS = new Set(["2026-11-26", "2026-12-24", "2026-12-25", "2027-01-01"]);

const HORIZON_DAYS = 120;
const LEAD_MINUTES = 120;

export function toISODate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year || 1970, (month || 1) - 1, day || 1);
}

export function formatLongDate(iso: string): string {
  return parseISODate(iso).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function isHeld(iso: string, index: number): boolean {
  let hash = 0;
  const key = `${iso}#${index}`;
  for (let i = 0; i < key.length; i += 1) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return hash % 5 === 0;
}

function closedDay(date: string, reason: DayReason): DayAvailability {
  return {
    date,
    open: false,
    reason,
    slots: SLOT_DEFS.map((slot) => ({ time: slot.time, available: false })),
  };
}

export function getDayAvailability(date: Date, now = new Date()): DayAvailability {
  const iso = toISODate(date);
  const day = startOfDay(date);
  const today = startOfDay(now);
  const latest = startOfDay(now);
  latest.setDate(latest.getDate() + HORIZON_DAYS);

  if (day < today) return closedDay(iso, "past");
  if (day > latest) return closedDay(iso, "beyond");
  if (date.getDay() === 1) return closedDay(iso, "closed");
  if (HOLIDAYS.has(iso)) return closedDay(iso, "holiday");

  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const isToday = iso === toISODate(now);
  const slots = SLOT_DEFS.map((slot, index) => {
    const past = isToday && slot.minutes <= nowMinutes + LEAD_MINUTES;
    return { time: slot.time, available: !past && !isHeld(iso, index) };
  });
  const open = slots.some((slot) => slot.available);
  return { date: iso, open, reason: open ? "open" : "full", slots };
}

export const availabilityProvider = {
  getMonth(year: number, monthIndex: number): Promise<DayAvailability[]> {
    const count = new Date(year, monthIndex + 1, 0).getDate();
    const days = Array.from({ length: count }, (_, index) =>
      getDayAvailability(new Date(year, monthIndex, index + 1)),
    );
    return Promise.resolve(days);
  },
  getDay(iso: string): Promise<DayAvailability> {
    return Promise.resolve(getDayAvailability(parseISODate(iso)));
  },
};

export const dayReasonLabel: Record<DayReason, string> = {
  open: "available",
  past: "in the past",
  closed: "studio closed",
  holiday: "unavailable",
  full: "fully booked",
  beyond: "not open for booking yet",
};
