import { instagramPosts, site } from "../config/site";
import { btnSecondary } from "../lib/styles";
import { InstagramIcon } from "./ui/InstagramIcon";
import { Photo } from "./ui/Photo";
import { Reveal } from "./ui/Reveal";
import { SectionHeading } from "./ui/SectionHeading";

export function InstagramGallery() {
  return (
    <section className="bg-ink-soft" aria-labelledby="instagram-title">
      <div className="mx-auto max-w-[1440px] px-5 py-24 md:px-10 lg:px-16 lg:py-32">
        <Reveal>
          <SectionHeading
            index="06"
            eyebrow="Instagram"
            title="Follow the journey"
            titleId="instagram-title"
            description={`Night walks, portraits, and the square after dark. ${site.instagramHandle}`}
            action={
              <a className={btnSecondary} href={site.instagramUrl} target="_blank" rel="noreferrer">
                <InstagramIcon className="size-4" />
                Follow on Instagram
              </a>
            }
          />
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {instagramPosts.map((post) => (
            <li key={post.photoId}>
              <a
                href={site.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="group relative block"
                aria-label={`View ${site.instagramHandle} on Instagram`}
              >
                <Photo
                  photoId={post.photoId}
                  alt={post.alt}
                  className="aspect-square w-full"
                  imgClassName="transition duration-700 group-hover:scale-105"
                  sizes="(min-width: 640px) 30vw, 50vw"
                />
                <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition duration-500 group-hover:bg-ink/40 group-hover:opacity-100">
                  <InstagramIcon className="size-6 text-paper" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
