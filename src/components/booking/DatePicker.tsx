import { useEffect, useState } from "react";
import {
  availabilityProvider,
  dayReasonLabel,
  parseISODate,
  toISODate,
  type DayAvailability,
} from "../../config/availability";
import { cn } from "../../lib/styles";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function DatePicker({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (iso: string) => void;
}) {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [attempt, setAttempt] = useState(0);
  const [days, setDays] = useState<DayAvailability[] | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");
    availabilityProvider.getMonth(year, month).then(
      (result) => {
        if (cancelled) return;
        setDays(result);
        setStatus("ready");
      },
      () => {
        if (!cancelled) setStatus("error");
      },
    );
    return () => {
      cancelled = true;
    };
  }, [year, month, attempt]);

  const cursor = new Date(year, month, 1);
  const min = new Date(today.getFullYear(), today.getMonth(), 1);
  const max = new Date(today.getFullYear(), today.getMonth() + 4, 1);
  const firstWeekday = cursor.getDay();
  const todayIso = toISODate(today);

  const shift = (delta: number) => {
    const next = new Date(year, month + delta, 1);
    setYear(next.getFullYear());
    setMonth(next.getMonth());
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h4 className="font-display text-2xl text-paper">
          {cursor.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
        </h4>
        <div className="flex gap-2">
          <button
            type="button"
            className="grid size-10 place-items-center border border-white/15 text-paper disabled:opacity-30"
            aria-label="Previous month"
            disabled={cursor <= min}
            onClick={() => shift(-1)}
          >
            ‹
          </button>
          <button
            type="button"
            className="grid size-10 place-items-center border border-white/15 text-paper disabled:opacity-30"
            aria-label="Next month"
            disabled={cursor >= max}
            onClick={() => shift(1)}
          >
            ›
          </button>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1 text-center font-grotesk text-[10px] tracking-[0.16em] text-muted uppercase">
        {WEEKDAYS.map((day) => (
          <span key={day} aria-hidden="true">
            {day.slice(0, 1)}
          </span>
        ))}
      </div>

      {status === "error" ? (
        <div className="mt-6 border border-white/10 p-4 text-sm text-muted">
          <p>Availability could not be loaded.</p>
          <button type="button" className="mt-3 text-neon" onClick={() => setAttempt((value) => value + 1)}>
            Try again
          </button>
        </div>
      ) : (
        <div className="mt-2 grid grid-cols-7 gap-1" role="grid" aria-label="Choose a date">
          {Array.from({ length: firstWeekday }, (_, index) => (
            <span key={`blank-${index}`} />
          ))}
          {status === "loading" || !days
            ? Array.from({ length: 28 }, (_, index) => (
                <span key={`loading-${index}`} className="aspect-square animate-pulse bg-white/[0.04]" />
              ))
            : days.map((day) => {
                const selected = value === day.date;
                const date = parseISODate(day.date);
                const label = `${date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}, ${dayReasonLabel[day.reason]}`;
                return (
                  <button
                    key={day.date}
                    type="button"
                    role="gridcell"
                    disabled={!day.open}
                    aria-pressed={selected}
                    aria-label={label}
                    onClick={() => onChange(day.date)}
                    className={cn(
                      "aspect-square text-sm transition",
                      selected && "bg-neon text-ink",
                      !selected && day.open && "text-paper hover:bg-white/10",
                      !day.open && "cursor-not-allowed text-paper/25",
                      day.date === todayIso && !selected && "ring-1 ring-cyan/70",
                    )}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
        </div>
      )}

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Mondays are closed. Gray dates are unavailable. Times are Eastern Time. Choosing a slot sends a request — it does not hold the appointment.
      </p>
    </div>
  );
}
