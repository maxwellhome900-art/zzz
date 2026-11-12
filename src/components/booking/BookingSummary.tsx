import { formatLongDate } from "../../config/availability";
import { getAddOn, getPackage } from "../../config/packages";
import { formatPrice } from "../../lib/pricing";
import type { CustomerInfo, PackageId } from "../../types";

export function BookingSummary({
  packageId,
  addOnIds,
  date,
  time,
  customer,
  total,
  onEdit,
  pending = false,
}: {
  packageId: PackageId | null;
  addOnIds: string[];
  date: string | null;
  time: string | null;
  customer?: CustomerInfo;
  total: number;
  onEdit?: (step: number) => void;
  pending?: boolean;
}) {
  const selected = getPackage(packageId);
  const extras = addOnIds.map((id) => getAddOn(id)).filter((item) => item != null);

  return (
    <div className="space-y-5">
      {pending ? (
        <p className="inline-flex border border-neon/50 px-3 py-1 font-grotesk text-[10px] tracking-[0.22em] text-neon uppercase">
          Request pending — not a confirmed appointment
        </p>
      ) : null}

      <div className="space-y-3 border-b border-white/10 pb-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-grotesk text-[10px] tracking-[0.22em] text-muted uppercase">Package</p>
            <p className="mt-1 text-paper">{selected?.name ?? "No package selected"}</p>
            {selected ? (
              <p className="text-sm text-muted">
                {selected.duration} · {selected.photoCount} edited photos
              </p>
            ) : null}
          </div>
          <div className="text-right">
            <p className="text-paper">{selected ? formatPrice(selected.price) : "—"}</p>
            {onEdit ? (
              <button type="button" className="mt-1 text-xs tracking-[0.16em] text-cyan uppercase" onClick={() => onEdit(0)}>
                Edit
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-grotesk text-[10px] tracking-[0.22em] text-muted uppercase">Extras</p>
            {extras.length === 0 ? <p className="mt-1 text-sm text-muted">None selected</p> : null}
            <ul className="mt-1 space-y-1">
              {extras.map((extra) => (
                <li key={extra.id} className="flex justify-between gap-6 text-sm text-paper">
                  <span>{extra.name}</span>
                  <span>{formatPrice(extra.price)}</span>
                </li>
              ))}
            </ul>
          </div>
          {onEdit ? (
            <button type="button" className="text-xs tracking-[0.16em] text-cyan uppercase" onClick={() => onEdit(1)}>
              Edit
            </button>
          ) : null}
        </div>
      </div>

      <div className="flex items-end justify-between">
        <p className="font-grotesk text-[11px] tracking-[0.22em] text-muted uppercase">Total</p>
        <p className="font-display text-4xl text-paper">{selected ? formatPrice(total) : "—"}</p>
      </div>

      <div className="grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-2">
        <div>
          <p className="font-grotesk text-[10px] tracking-[0.22em] text-muted uppercase">Date</p>
          <p className="mt-1 text-sm text-paper">{date ? formatLongDate(date) : "Not chosen"}</p>
          {onEdit ? (
            <button type="button" className="mt-1 text-xs tracking-[0.16em] text-cyan uppercase" onClick={() => onEdit(2)}>
              Edit
            </button>
          ) : null}
        </div>
        <div>
          <p className="font-grotesk text-[10px] tracking-[0.22em] text-muted uppercase">Time</p>
          <p className="mt-1 text-sm text-paper">{time ?? "Not chosen"}</p>
        </div>
      </div>

      {customer ? (
        <div className="border-t border-white/10 pt-4 text-sm leading-relaxed text-paper/90">
          <div className="flex items-start justify-between gap-4">
            <p className="font-grotesk text-[10px] tracking-[0.22em] text-muted uppercase">Your details</p>
            {onEdit ? (
              <button type="button" className="text-xs tracking-[0.16em] text-cyan uppercase" onClick={() => onEdit(3)}>
                Edit
              </button>
            ) : null}
          </div>
          <p className="mt-2">{customer.fullName}</p>
          <p>{customer.email}</p>
          <p>{customer.phone}</p>
          <p>
            {customer.partySize} {Number(customer.partySize) === 1 ? "person" : "people"} · {customer.location}
          </p>
          {customer.notes.trim() ? <p className="mt-2 text-muted">{customer.notes.trim()}</p> : null}
        </div>
      ) : null}
    </div>
  );
}
