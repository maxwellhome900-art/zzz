import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";
import { site } from "../config/site";
import { useBooking } from "../context/BookingContext";
import { btnPrimary, btnSecondary } from "../lib/styles";
import { Photo } from "./ui/Photo";

const EASE = [0.22, 1, 0.36, 1] as const;

function Rise({ delay, className, children }: { delay: number; className?: string; children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.85, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function HeroSection() {
  const { openBooking } = useBooking();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);

  return (
    <section id="home" ref={ref} className="relative h-[100svh] min-h-[680px] overflow-hidden">
      <motion.div className="absolute inset-0 scale-110" style={reduce ? undefined : { y }}>
        <Photo
          photoId={site.heroPhotoId}
          alt="Times Square at dusk, crowded with pedestrians beneath bright billboards"
          priority
          className="h-full w-full"
          imgClassName="brightness-110 saturate-110"
          sizes="100vw"
          widths={[800, 1400, 2000, 2400]}
        />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,10,0.78)_0%,rgba(8,8,10,0.28)_48%,rgba(8,8,10,0.08)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.55)_0%,rgba(8,8,10,0.05)_34%,rgba(8,8,10,0.25)_62%,rgba(8,8,10,0.88)_100%)]" />

      <p className="absolute top-1/2 right-6 hidden -translate-y-1/2 rotate-90 font-grotesk text-[10px] tracking-[0.48em] text-paper/70 lg:block">
        {site.coordinates}
      </p>

      <div className="relative z-10 mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pt-28 pb-24 md:px-10 lg:px-16">
        <Rise delay={0.15}>
          <p className="font-grotesk text-[11px] tracking-[0.42em] text-cyan uppercase">
            {site.photographerName} · Times Square
          </p>
        </Rise>
        <Rise delay={0.28}>
          <h1 className="mt-5 max-w-5xl font-display text-[clamp(3.15rem,7.4vw,7.3rem)] leading-[0.86] text-paper uppercase [text-shadow:0_10px_40px_rgba(0,0,0,0.45)]">
            <span className="block">Your moment.</span>
            <span className="block italic">Your story.</span>
            <span className="block">New York City.</span>
          </h1>
        </Rise>
        <Rise delay={0.46} className="max-w-xl">
          <p className="mt-6 text-base leading-relaxed text-paper/85 md:text-lg">
            Capturing unforgettable moments in the heart of New York City. Experience Times Square through my lens.
          </p>
        </Rise>
        <Rise delay={0.58} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button type="button" className={btnPrimary} onClick={() => openBooking()}>
            Book your photoshoot
          </button>
          <a className={btnSecondary} href="#portfolio">
            Explore my work
          </a>
        </Rise>
      </div>

      <a
        href="#about"
        className="absolute bottom-7 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 text-paper/80 sm:flex"
      >
        <span className="font-grotesk text-[10px] tracking-[0.4em]">Scroll</span>
        <span className="relative h-12 w-px overflow-hidden bg-white/25">
          <span className="animate-scroll-line absolute inset-x-0 top-0 h-3 bg-paper" />
        </span>
      </a>
    </section>
  );
}
