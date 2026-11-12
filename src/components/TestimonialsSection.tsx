import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useState } from "react";
import { testimonials } from "../config/testimonials";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function TestimonialsSection() {
  const [index, setIndex] = useState(0);
  const current = testimonials[index] ?? testimonials[0];

  const go = (direction: number) => {
    setIndex((value) => (value + direction + testimonials.length) % testimonials.length);
  };

  if (!current) return null;

  return (
    <section className="scroll-mt-24 bg-ink" aria-labelledby="reviews-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <Reveal>
          <SectionHeading
            index="05"
            eyebrow="Testimonials"
            title="What clients say"
            titleId="reviews-title"
            action={
              <span className="inline-flex w-fit border border-white/15 px-3 py-1 font-grotesk text-[10px] tracking-[0.24em] text-muted uppercase">
                Sample reviews
              </span>
            }
          />
          <p className="mt-4 max-w-xl text-sm text-muted">
            Sample reviews for the layout. Replace them with genuine client testimonials before publishing.
          </p>
        </Reveal>

        <div className="mt-14 border-y border-white/10 py-12">
          <AnimatePresence mode="wait">
            <motion.figure
              key={current.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <div className="flex items-center gap-3">
                <div className="flex gap-1" aria-label={`${current.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }, (_, star) => (
                    <Star
                      key={star}
                      size={16}
                      className={star < current.rating ? "fill-gold text-gold" : "text-white/20"}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <span className="font-grotesk text-[10px] tracking-[0.22em] text-neon uppercase">Sample review</span>
              </div>
              <blockquote className="mt-8 max-w-4xl font-display text-3xl leading-tight text-paper italic md:text-5xl">
                “{current.quote}”
              </blockquote>
              <figcaption className="mt-8 font-grotesk text-[12px] tracking-[0.22em] text-muted uppercase">
                {current.name} · {current.origin}
              </figcaption>
            </motion.figure>
          </AnimatePresence>

          <div className="mt-10 flex items-center gap-3">
            <button
              type="button"
              className="grid size-11 place-items-center border border-white/15 text-paper transition hover:border-paper"
              aria-label="Previous review"
              onClick={() => go(-1)}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              className="grid size-11 place-items-center border border-white/15 text-paper transition hover:border-paper"
              aria-label="Next review"
              onClick={() => go(1)}
            >
              <ChevronRight size={18} />
            </button>
            <div className="ml-3 flex gap-2" role="tablist" aria-label="Choose a review">
              {testimonials.map((item, itemIndex) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={itemIndex === index}
                  aria-label={`Show review from ${item.name}`}
                  onClick={() => setIndex(itemIndex)}
                  className={`h-1.5 transition ${itemIndex === index ? "w-8 bg-neon" : "w-4 bg-white/25"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
