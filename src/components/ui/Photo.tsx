import { useState } from "react";
import { photoSrc, photoSrcSet } from "../../config/portfolio";
import { cn } from "../../lib/styles";

type PhotoProps = {
  photoId: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  sizes?: string;
  widths?: number[];
  fit?: "cover" | "contain";
};

const DEFAULT_WIDTHS = [480, 800, 1200, 1800];

export function Photo({
  photoId,
  alt,
  className,
  imgClassName,
  priority = false,
  sizes = "100vw",
  widths = DEFAULT_WIDTHS,
  fit = "cover",
}: PhotoProps) {
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const largest = widths[widths.length - 1] ?? 1200;

  return (
    <div className={cn("relative overflow-hidden bg-white/[0.04]", className)}>
      {!priority && !ready && !failed ? <div className="absolute inset-0 animate-pulse bg-white/[0.05]" /> : null}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center px-4 text-center font-grotesk text-[10px] tracking-[0.28em] text-paper/45">
          Photograph unavailable
        </div>
      ) : (
        <img
          src={photoSrc(photoId, largest)}
          srcSet={photoSrcSet(photoId, widths)}
          sizes={sizes}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : "auto"}
          onLoad={() => setReady(true)}
          onError={() => setFailed(true)}
          className={cn(
            "h-full w-full transition duration-700",
            fit === "contain" ? "object-contain" : "object-cover",
            priority || ready ? "opacity-100" : "opacity-0",
            imgClassName,
          )}
        />
      )}
    </div>
  );
}
