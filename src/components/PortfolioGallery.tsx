import { useMemo, useState } from "react";
import { aspectClassName, categories, galleryImages } from "../config/portfolio";
import type { GalleryCategory } from "../types";
import { GalleryLightbox } from "./GalleryLightbox";
import { Photo } from "./ui/Photo";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function PortfolioGallery() {
  const [category, setCategory] = useState<GalleryCategory | "all">("all");
  const [activeId, setActiveId] = useState<string | null>(null);

  const filtered = useMemo(
    () => (category === "all" ? galleryImages : galleryImages.filter((image) => image.category === category)),
    [category],
  );
  const activeIndex = filtered.findIndex((image) => image.id === activeId);

  return (
    <section id="portfolio" className="scroll-mt-24 bg-ink-soft">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <Reveal>
          <SectionHeading
            index="02"
            eyebrow="Portfolio"
            title="Selected work"
            description="Portraits, night frames, and the streets around Times Square."
          />
        </Reveal>

        <div className="mt-10 flex gap-6 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((item) => {
            const active = category === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={active}
                onClick={() => setCategory(item.id)}
                className={`shrink-0 pb-1 font-grotesk text-[11px] tracking-[0.22em] uppercase transition ${
                  active ? "border-b border-neon text-paper" : "text-muted hover:text-paper"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-muted">No photographs in this series yet.</p>
        ) : (
          <div className="mt-8 columns-1 gap-4 sm:columns-2 lg:columns-3">
            {filtered.map((image) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveId(image.id)}
                className="group mb-4 block w-full break-inside-avoid text-left"
              >
                <span className={`relative block overflow-hidden ${aspectClassName(image.aspect)}`}>
                  <Photo
                    photoId={image.photoId}
                    alt={image.alt}
                    className="h-full w-full"
                    imgClassName="transition duration-700 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-80 transition group-hover:opacity-100" />
                  <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 transition duration-500 group-hover:translate-y-0">
                    <span className="block font-grotesk text-[10px] tracking-[0.24em] text-cyan uppercase">
                      {categories.find((item) => item.id === image.category)?.label}
                    </span>
                    <span className="mt-1 block font-display text-2xl text-paper">{image.title}</span>
                  </span>
                </span>
              </button>
            ))}
          </div>
        )}
      </div>

      {activeIndex >= 0 ? (
        <GalleryLightbox
          images={filtered}
          index={activeIndex}
          onClose={() => setActiveId(null)}
          onIndex={(index) => setActiveId(filtered[index]?.id ?? null)}
        />
      ) : null}
    </section>
  );
}
