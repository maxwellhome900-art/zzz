import { Check } from "lucide-react";
import { useBooking } from "../context/BookingContext";
import { formatPrice } from "../lib/pricing";
import { btnPrimary, cn } from "../lib/styles";
import type { PhotoPackage } from "../types";

export function PackageCard({ photoPackage }: { photoPackage: PhotoPackage }) {
  const { openBooking } = useBooking();
  const popular = Boolean(photoPackage.popular);

  return (
    <article
      className={cn(
        "relative flex h-full flex-col border bg-white/[0.03] p-6 transition duration-500 sm:p-7",
        popular
          ? "border-neon/70 shadow-[0_0_50px_rgba(255,61,138,0.14)] lg:-translate-y-3"
          : "border-white/10 hover:-translate-y-1 hover:border-white/30",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-grotesk text-[11px] tracking-[0.32em] text-muted">{photoPackage.index}</p>
        {popular ? (
          <span className="bg-neon px-2.5 py-1 font-grotesk text-[10px] tracking-[0.18em] text-ink uppercase">
            Most popular
          </span>
        ) : null}
      </div>
      <h3 className="mt-8 font-display text-3xl text-paper uppercase">{photoPackage.name}</h3>
      <p className="mt-4 font-display text-5xl text-paper">{formatPrice(photoPackage.price)}</p>
      <p className="mt-3 font-grotesk text-[11px] tracking-[0.18em] text-cyan uppercase">
        {photoPackage.duration} · {photoPackage.photoCount} edited photos
      </p>
      <p className="mt-5 text-sm leading-relaxed text-muted">{photoPackage.description}</p>
      <ul className="mt-6 space-y-3">
        {photoPackage.includes.map((item) => (
          <li key={item} className="flex gap-3 text-sm leading-snug text-paper/90">
            <Check className="mt-0.5 size-4 shrink-0 text-neon" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className={cn(btnPrimary, "mt-8 w-full")}
        onClick={() => openBooking(photoPackage.id)}
      >
        {photoPackage.cta}
      </button>
    </article>
  );
}
