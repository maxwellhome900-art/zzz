import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { navLinks, site } from "../config/site";
import { useBooking } from "../context/BookingContext";
import { useLockBody } from "../hooks/useLockBody";
import { btnPrimary, cn } from "../lib/styles";

export function Navbar() {
  const { openBooking } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useLockBody(menuOpen);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition duration-500",
        scrolled || menuOpen
          ? "border-b border-white/10 bg-ink/80 backdrop-blur-md"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-[1440px] items-center justify-between px-5 md:px-10 lg:px-16">
        <a href="#home" className="leading-none" onClick={() => setMenuOpen(false)}>
          <span className="block font-display text-[1.65rem] tracking-[0.18em] text-paper">{site.monogram}</span>
          <span className="mt-1 block font-grotesk text-[9px] tracking-[0.42em] text-muted">TIMES SQUARE</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-grotesk text-[11px] tracking-[0.22em] text-paper/80 uppercase transition hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            className={cn(btnPrimary, "px-3.5 py-2.5 sm:px-5")}
            onClick={() => {
              setMenuOpen(false);
              openBooking();
            }}
          >
            Book Now
          </button>
          <button
            type="button"
            className="grid size-11 place-items-center text-paper lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            id="mobile-nav"
            aria-label="Mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-[4.5rem] z-[60] bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col px-8 pt-8">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * index }}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-white/10 py-4 font-display text-4xl text-paper"
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
