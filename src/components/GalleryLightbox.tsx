import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { categoryLabel } from "../config/portfolio";
import { useFocusTrap } from "../hooks/useFocusTrap";
import { useLockBody } from "../hooks/useLockBody";
import type { GalleryImage } from "../types";
import { Photo } from "./ui/Photo";

export function GalleryLightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: GalleryImage[];
  index: number;
  onClose: () => void;
  onIndex: (index: number) => void;
}) {
  const image = images[index];
  const panelRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);
  useLockBody(true);
  useFocusTrap(true, panelRef, onClose);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (event.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, index, onIndex]);

  if (!image || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[80] bg-black/92"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        role="presentation"
        onClick={onClose}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={image.title}
          className="flex h-full flex-col"
          onClick={(event) => event.stopPropagation()}
          onTouchStart={(event) => {
            touchX.current = event.changedTouches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchX.current == null) return;
            const end = event.changedTouches[0]?.clientX ?? touchX.current;
            const delta = end - touchX.current;
            if (delta > 48) onIndex((index - 1 + images.length) % images.length);
            if (delta < -48) onIndex((index + 1) % images.length);
            touchX.current = null;
          }}
        >
          <div className="flex items-center justify-between px-4 py-4 sm:px-6">
            <p className="font-grotesk text-[11px] tracking-[0.28em] text-paper/70">
              {String(index + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="grid size-11 place-items-center text-paper"
              aria-label="Close photograph"
            >
              <X size={22} />
            </button>
          </div>

          <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16">
            <button
              type="button"
              className="absolute left-2 z-10 grid size-11 place-items-center border border-white/15 bg-black/40 text-paper sm:left-5"
              aria-label="Previous photograph"
              onClick={() => onIndex((index - 1 + images.length) % images.length)}
            >
              <ChevronLeft size={20} />
            </button>
            <Photo
              photoId={image.photoId}
              alt={image.alt}
              priority
              className="h-[70vh] w-full"
              fit="contain"
              sizes="100vw"
              widths={[900, 1400, 2000]}
            />
            <button
              type="button"
              className="absolute right-2 z-10 grid size-11 place-items-center border border-white/15 bg-black/40 text-paper sm:right-5"
              aria-label="Next photograph"
              onClick={() => onIndex((index + 1) % images.length)}
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <figcaption className="px-5 py-6 text-center sm:px-10">
            <p className="font-grotesk text-[10px] tracking-[0.32em] text-neon uppercase">
              {categoryLabel(image.category)}
            </p>
            <p className="mt-2 font-display text-3xl text-paper">{image.title}</p>
            <p className="mt-2 text-sm text-muted">{image.caption}</p>
          </figcaption>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
