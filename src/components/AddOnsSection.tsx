import { addOns } from "../config/packages";
import { useBooking } from "../context/BookingContext";
import { formatPrice } from "../lib/pricing";
import { btnSecondary } from "../lib/styles";
import { Reveal } from "./ui/Reveal";

export function AddOnsSection() {
  const { openBooking } = useBooking();

  return (
    <section className="bg-ink" aria-labelledby="addons-title">
      <div className="mx-auto max-w-[1440px] px-5 pb-24 md:px-10 lg:px-16 lg:pb-32">
        <Reveal>
          <div className="flex flex-col gap-6 border-t border-white/10 pt-14 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-grotesk text-[11px] tracking-[0.42em] text-neon">EXTRAS</p>
              <h2 id="addons-title" className="mt-4 font-display text-4xl text-paper uppercase md:text-6xl">
                Additional services
              </h2>
              <p className="mt-4 max-w-xl text-muted">
                Optional extras can be added while you book. The total updates as soon as you select them.
              </p>
            </div>
            <button type="button" className={btnSecondary} onClick={() => openBooking()}>
              Book a session
            </button>
          </div>
          <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
            {addOns.map((addOn) => (
              <li key={addOn.id} className="grid gap-2 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-8">
                <div>
                  <p className="font-grotesk text-sm tracking-[0.12em] text-paper uppercase">{addOn.name}</p>
                  <p className="mt-1 text-sm text-muted">{addOn.description}</p>
                </div>
                <p className="font-display text-3xl text-paper">{formatPrice(addOn.price)}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
