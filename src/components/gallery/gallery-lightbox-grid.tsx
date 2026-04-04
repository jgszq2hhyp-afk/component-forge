// @version 1.0.0
// @category gallery
// @name Gallery Lightbox Grid
// @source custom-implementation

"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

interface GalleryLightboxGridProps {
  title?: string;
  subtitle?: string;
  images?: GalleryImage[];
  columns?: 2 | 3 | 4;
  className?: string;
}

const defaultImages: GalleryImage[] = [
  { src: "/placeholder-1.jpg", alt: "Gallery image 1", caption: "Beautiful landscape" },
  { src: "/placeholder-2.jpg", alt: "Gallery image 2", caption: "Urban architecture" },
  { src: "/placeholder-3.jpg", alt: "Gallery image 3", caption: "Nature closeup" },
  { src: "/placeholder-4.jpg", alt: "Gallery image 4", caption: "Portrait photography" },
  { src: "/placeholder-5.jpg", alt: "Gallery image 5", caption: "Street photography" },
  { src: "/placeholder-6.jpg", alt: "Gallery image 6", caption: "Abstract art" },
];

export default function GalleryLightboxGrid({
  title = "Our Work",
  subtitle = "A selection of our recent projects and creative explorations.",
  images = defaultImages,
  columns = 3,
  className,
}: GalleryLightboxGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") setLightboxIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
      if (e.key === "ArrowLeft") setLightboxIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
    },
    [lightboxIndex, images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const colClass = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
  }[columns];

  return (
    <section className={cn("py-16 sm:py-24 bg-[var(--gallery-bg,hsl(0_0%_100%))]", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <div className="text-center max-w-2xl mx-auto mb-12">
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--gallery-title,hsl(0_0%_9%))]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-base text-[var(--gallery-subtitle,hsl(0_0%_40%))]">
                {subtitle}
              </p>
            )}
          </div>
        )}

        {/* Grid */}
        <div className={cn("grid gap-4", colClass)}>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setLightboxIndex(index)}
              className={cn(
                "group relative aspect-[4/3] overflow-hidden rounded-xl transition-shadow duration-300",
                "hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--gallery-ring,hsl(220_90%_56%))] focus:ring-offset-2",
                "motion-reduce:transition-none"
              )}
            >
              <img
                src={image.src}
                alt={image.alt}
                loading="lazy"
                className={cn(
                  "h-full w-full object-cover transition-transform duration-500",
                  "group-hover:scale-110",
                  "motion-reduce:group-hover:scale-100 motion-reduce:transition-none"
                )}
              />
              <div
                className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  "bg-[var(--gallery-overlay,hsl(0_0%_0%/0.4))]",
                  "opacity-0 group-hover:opacity-100",
                  "motion-reduce:transition-none"
                )}
              >
                <svg
                  className="h-10 w-10 text-[var(--gallery-overlay-icon,hsl(0_0%_100%))]"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                </svg>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--gallery-lightbox-bg,hsl(0_0%_0%/0.9))] p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          {/* Close button */}
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-10 p-2 rounded-full text-[var(--gallery-lightbox-control,hsl(0_0%_100%/0.8))] hover:text-[var(--gallery-lightbox-control-hover,hsl(0_0%_100%))] hover:bg-[var(--gallery-lightbox-control-bg,hsl(0_0%_100%/0.1))] transition-colors"
            aria-label="Close lightbox"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex - 1 + images.length) % images.length);
            }}
            className="absolute left-4 z-10 p-2 rounded-full text-[var(--gallery-lightbox-control,hsl(0_0%_100%/0.8))] hover:text-[var(--gallery-lightbox-control-hover,hsl(0_0%_100%))] hover:bg-[var(--gallery-lightbox-control-bg,hsl(0_0%_100%/0.1))] transition-colors"
            aria-label="Previous image"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>

          {/* Image */}
          <div
            className="relative max-h-[85vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].alt}
              className="max-h-[85vh] max-w-[90vw] rounded-lg object-contain"
            />
            {images[lightboxIndex].caption && (
              <p className="mt-3 text-center text-sm text-[var(--gallery-lightbox-caption,hsl(0_0%_100%/0.7))]">
                {images[lightboxIndex].caption}
              </p>
            )}
            <p className="mt-1 text-center text-xs text-[var(--gallery-lightbox-counter,hsl(0_0%_100%/0.4))]">
              {lightboxIndex + 1} / {images.length}
            </p>
          </div>

          {/* Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((lightboxIndex + 1) % images.length);
            }}
            className="absolute right-4 z-10 p-2 rounded-full text-[var(--gallery-lightbox-control,hsl(0_0%_100%/0.8))] hover:text-[var(--gallery-lightbox-control-hover,hsl(0_0%_100%))] hover:bg-[var(--gallery-lightbox-control-bg,hsl(0_0%_100%/0.1))] transition-colors"
            aria-label="Next image"
          >
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
