import { about, site } from "../config/site";
import { useBooking } from "../context/BookingContext";
import { btnPrimary } from "../lib/styles";
import { Photo } from "./ui/Photo";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function AboutSection() {
  const { openBooking } = useBooking();

  return (
    <section id="about" className="scroll-mt-24 bg-ink">
      <div className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 py-24 md:px-10 lg:grid-cols-12 lg:gap-16 lg:px-16 lg:py-32">
        <Reveal className="lg:col-span-5">
          <figure className="relative">
            <Photo
              photoId={site.portraitPhotoId}
              alt={`Portrait of ${site.photographerName}`}
              className="aspect-[4/5] w-full"
              sizes="(min-width: 1024px) 38vw, 100vw"
              imgClassName="grayscale-[20%]"
            />
            <figcaption className="absolute bottom-4 left-4 bg-ink/80 px-3 py-2 font-grotesk text-[10px] tracking-[0.28em] text-paper uppercase">
              {site.photographerName}
            </figcaption>
            <span className="absolute top-4 right-4 h-10 w-10 border-t border-r border-neon" aria-hidden="true" />
          </figure>
        </Reveal>

        <div className="lg:col-span-7">
          <Reveal>
            <SectionHeading index="01" eyebrow="The photographer" title={about.headline} />
            <blockquote className="mt-8 max-w-2xl font-display text-2xl leading-snug text-paper italic md:text-3xl">
              {about.mission}
            </blockquote>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-8 max-w-2xl space-y-5 text-base leading-relaxed text-muted md:text-lg">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-white/10 py-8 sm:grid-cols-4">
              {about.stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-4xl text-paper">{stat.value}</dt>
                  <dd className="mt-2 font-grotesk text-[11px] tracking-[0.16em] text-muted uppercase">{stat.label}</dd>
                </div>
              ))}
            </dl>
            <button type="button" className={`${btnPrimary} mt-8`} onClick={() => openBooking()}>
              Let's create something special
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
