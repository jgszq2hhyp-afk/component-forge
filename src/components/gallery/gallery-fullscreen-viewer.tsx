// @version 1.0.0
// @category gallery
// @name gallery-fullscreen-viewer
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const THUMB_SIZE = 64;

interface GalleryImage {
  src: string;
  alt?: string;
}

interface GalleryFullscreenViewerProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export default function GalleryFullscreenViewer({
  images,
  columns = 3,
  className,
}: GalleryFullscreenViewerProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);
  const prev = useCallback(() => setActiveIndex((i) => i !== null ? (i - 1 + images.length) % images.length : null), [images.length]);
  const next = useCallback(() => setActiveIndex((i) => i !== null ? (i + 1) % images.length : null), [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [activeIndex, close, prev, next]);

  const colClass = columns === 2 ? "sm:grid-cols-2" : columns === 4 ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-6xl">
        <div className={cn("grid gap-3", colClass)}>
          {images.map((img, i) => (
            <button
              key={`thumb-${i}`}
              type="button"
              onClick={() => setActiveIndex(i)}
              className="group relative aspect-square overflow-hidden rounded-xl border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ borderColor: "var(--border)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
            >
              <img src={img.src} alt={img.alt ?? ""} className="size-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-105" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-label="Image viewer">
          <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, var(--background) 90%, transparent)" }} onClick={close} aria-hidden="true" />
          <div className="relative flex max-h-[90vh] max-w-[90vw] flex-col items-center">
            <img src={images[activeIndex].src} alt={images[activeIndex].alt ?? ""} className="max-h-[75vh] rounded-lg object-contain" />

            {/* Controls */}
            <button type="button" onClick={prev} className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full p-2 focus-visible:outline-none focus-visible:ring-2" style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }} aria-label="Previous image">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
            </button>
            <button type="button" onClick={next} className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-2 focus-visible:outline-none focus-visible:ring-2" style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }} aria-label="Next image">
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
            </button>
            <button type="button" onClick={close} className="absolute -top-2 -right-2 rounded-full p-1.5 focus-visible:outline-none focus-visible:ring-2" style={{ backgroundColor: "var(--card)", color: "var(--foreground)" }} aria-label="Close">
              <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>

            {/* Thumbnails */}
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {images.map((img, i) => (
                <button key={`lb-${i}`} type="button" onClick={() => setActiveIndex(i)} className={cn("shrink-0 overflow-hidden rounded border-2", "focus-visible:outline-none focus-visible:ring-2")} style={{ width: THUMB_SIZE, height: THUMB_SIZE, borderColor: i === activeIndex ? "var(--primary)" : "var(--border)", opacity: i === activeIndex ? 1 : 0.6 }}>
                  <img src={img.src} alt="" className="size-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
