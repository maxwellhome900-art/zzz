import { Mail, MapPin } from "lucide-react";
import { navLinks, site } from "../config/site";
import { useBooking } from "../context/BookingContext";
import { InstagramIcon } from "./ui/InstagramIcon";
import { WhatsAppIcon } from "./ui/WhatsAppIcon";

export function Footer() {
  const { openBooking } = useBooking();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black">
      <div className="relative z-10 mx-auto grid max-w-[1440px] gap-12 px-5 py-16 md:px-10 lg:grid-cols-4 lg:px-16">
        <div>
          <p className="font-display text-3xl tracking-[0.16em] text-paper">{site.monogram}</p>
          <p className="mt-2 font-grotesk text-[11px] tracking-[0.22em] text-muted uppercase">{site.photographerName}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.footerDescription}</p>
        </div>
        <div>
          <p className="font-grotesk text-[11px] tracking-[0.28em] text-paper uppercase">Navigate</p>
          <ul className="mt-4 space-y-2">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a className="text-sm text-muted transition hover:text-paper" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-grotesk text-[11px] tracking-[0.28em] text-paper uppercase">Visit</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li className="flex items-start gap-2">
              <MapPin size={15} className="mt-0.5 shrink-0" aria-hidden="true" />
              {site.location}
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-paper" href={`mailto:${site.email}`}>
                <Mail size={15} aria-hidden="true" />
                {site.email}
              </a>
            </li>
            <li>
              <a className="hover:text-paper" href={site.phoneHref}>
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              <a className="hover:text-paper" href="#portfolio">
                Portfolio
              </a>
            </li>
            <li>
              <button type="button" className="hover:text-paper" onClick={() => openBooking()}>
                Booking
              </button>
            </li>
          </ul>
        </div>
        <div>
          <p className="font-grotesk text-[11px] tracking-[0.28em] text-paper uppercase">Connect</p>
          <ul className="mt-4 space-y-3 text-sm text-muted">
            <li>
              <a className="inline-flex items-center gap-2 hover:text-paper" href={site.instagramUrl} target="_blank" rel="noreferrer">
                <InstagramIcon className="size-4" />
                {site.instagramHandle}
              </a>
            </li>
            <li>
              <a className="inline-flex items-center gap-2 hover:text-paper" href={site.whatsappUrl} target="_blank" rel="noreferrer">
                <WhatsAppIcon className="size-4" />
                WhatsApp
              </a>
            </li>
            <li>{site.locationShort}</li>
          </ul>
        </div>
      </div>
      <div className="relative z-10 border-t border-white/10 px-5 py-5 md:px-10 lg:px-16">
        <p className="text-xs tracking-wide text-muted">
          © {year} {site.photographerName}. All rights reserved.
        </p>
      </div>
      <p
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-6 left-5 font-display text-[22vw] leading-none text-transparent [-webkit-text-stroke:1px_rgba(246,243,238,0.08)] select-none md:left-10"
      >
        {site.monogram}
      </p>
    </footer>
  );
}
