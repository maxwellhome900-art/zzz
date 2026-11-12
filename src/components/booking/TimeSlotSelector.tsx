import type { TimeSlot } from "../../config/availability";
import { cn } from "../../lib/styles";

export function TimeSlotSelector({
  slots,
  status,
  value,
  onChange,
  onRetry,
}: {
  slots: TimeSlot[] | null;
  status: "idle" | "loading" | "ready" | "error";
  value: string | null;
  onChange: (time: string) => void;
  onRetry: () => void;
}) {
  if (status === "idle") {
    return <p className="text-sm text-muted">Select a date to see open times.</p>;
  }

  if (status === "loading") {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <span key={index} className="h-16 animate-pulse bg-white/[0.05]" />
        ))}
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="border border-white/10 p-4 text-sm text-muted">
        <p>Times could not be loaded.</p>
        <button type="button" className="mt-3 text-neon" onClick={onRetry}>
          Try again
        </button>
      </div>
    );
  }

  if (!slots || slots.every((slot) => !slot.available)) {
    return <p className="text-sm text-muted">That date is fully booked. Please choose another day.</p>;
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Available times">
      {slots.map((slot) => {
        const selected = value === slot.time;
        return (
          <button
            key={slot.time}
            type="button"
            role="radio"
            aria-checked={selected}
            disabled={!slot.available}
            onClick={() => onChange(slot.time)}
            className={cn(
              "border px-3 py-3 text-left transition",
              selected ? "border-neon bg-neon text-ink" : "border-white/15 text-paper",
              !slot.available && "cursor-not-allowed opacity-35",
              slot.available && !selected && "hover:border-paper",
            )}
          >
            <span className="block font-grotesk text-sm tracking-wide">{slot.time}</span>
            <span className="mt-1 block font-grotesk text-[10px] tracking-[0.18em] uppercase">
              {slot.available ? "Open" : "Taken"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
