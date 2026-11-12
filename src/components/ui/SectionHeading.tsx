import type { ReactNode } from "react";

export function SectionHeading({
  index,
  eyebrow,
  title,
  titleId,
  description,
  action,
}: {
  index: string;
  eyebrow: string;
  title: string;
  titleId?: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="font-grotesk text-[11px] tracking-[0.42em] text-neon">
          {index} / {eyebrow}
        </p>
        <h2 id={titleId} className="mt-4 font-display text-[clamp(2.5rem,6vw,5.2rem)] uppercase leading-[0.9] text-paper">
          {title}
        </h2>
        {description ? (
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}
