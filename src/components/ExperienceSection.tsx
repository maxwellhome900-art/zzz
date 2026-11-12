import { experienceSteps } from "../config/experience";
import { Photo } from "./ui/Photo";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 bg-ink-soft">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <Reveal>
          <SectionHeading
            index="04"
            eyebrow="The session"
            title="Your NYC experience starts here"
            description="From the first choice to the delivered edit, the afternoon is simple, personal, and built around your time in the city."
          />
        </Reveal>
        <ol className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {experienceSteps.map((step, index) => (
            <li key={step.index} className="h-full">
              <Reveal delay={index * 0.06} className="flex h-full flex-col">
                <Photo
                  photoId={step.photoId}
                  alt={step.alt}
                  className="aspect-[4/5] w-full"
                  sizes="(min-width: 1280px) 22vw, (min-width: 768px) 45vw, 100vw"
                />
                <p className="mt-5 font-grotesk text-[11px] tracking-[0.32em] text-neon">{step.index}</p>
                <h3 className="mt-3 font-display text-3xl text-paper uppercase">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
