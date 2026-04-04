// @version 1.1.0
// @category gallery
// @name Gallery Masonry
// @source custom-implementation

"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: string;
}

interface GalleryMasonryProps {
  images: GalleryImage[];
  columns?: 1 | 2 | 3 | 4;
  gap?: number;
  className?: string;
  onImageClick?: (image: GalleryImage, index: number) => void;
}

/**
 * Distributes images across columns by shortest-column-first.
 * Returns column arrays and a map from image reference to global index.
 */
function distributeImages(images: GalleryImage[], columnCount: number) {
  const cols: GalleryImage[][] = Array.from({ length: columnCount }, () => []);
  const heights = new Array<number>(columnCount).fill(0);
  const indexMap = new Map<GalleryImage, number>();

  images.forEach((image, globalIndex) => {
    let shortestCol = 0;
    let minHeight = heights[0];
    for (let i = 1; i < columnCount; i++) {
      if (heights[i] < minHeight) {
        minHeight = heights[i];
        shortestCol = i;
      }
    }
    cols[shortestCol].push(image);
    heights[shortestCol] += image.height / image.width;
    indexMap.set(image, globalIndex);
  });

  return { cols, indexMap };
}

const responsiveGridClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export default function GalleryMasonry({
  images,
  columns = 3,
  gap = 4,
  className,
  onImageClick,
}: GalleryMasonryProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const { cols, indexMap } = useMemo(
    () => distributeImages(images, columns),
    [images, columns],
  );

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  if (!images.length) {
    return null;
  }

  const gapPx = `${gap * 4}px`;

  return (
    <section
      className={cn(
        "py-16 sm:py-24",
        "bg-[var(--gallery-bg,hsl(0_0%_100%))]",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn("grid", responsiveGridClasses[columns])}
          style={{ gap: gapPx }}
        >
          {cols.map((colImages, colIndex) => (
            <div
              key={colIndex}
              className="flex flex-col"
              style={{ gap: gapPx }}
            >
              {colImages.map((image, imgIndex) => {
                const globalIndex = indexMap.get(image) ?? -1;
                const isLoaded = loadedImages.has(globalIndex);

                return (
                  <button
                    key={`${colIndex}-${imgIndex}`}
                    type="button"
                    onClick={() => onImageClick?.(image, globalIndex)}
                    className={cn(
                      "group relative overflow-hidden rounded-xl",
                      "transition-shadow duration-300",
                      "motion-safe:hover:shadow-xl",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gallery-ring,hsl(220_90%_56%))] focus-visible:ring-offset-2",
                      "motion-reduce:transition-none",
                    )}
                    style={{ aspectRatio: `${image.width}/${image.height}` }}
                  >
                    {/* Skeleton placeholder */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-[var(--gallery-placeholder,hsl(0_0%_92%))]",
                        "transition-opacity duration-500",
                        "motion-reduce:transition-none",
                        isLoaded ? "opacity-0" : "opacity-100",
                      )}
                    />

                    {/* Image */}
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={image.width}
                      height={image.height}
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onLoad={() => handleImageLoad(globalIndex)}
                      className={cn(
                        "h-full w-full object-cover",
                        "motion-safe:transition-transform motion-safe:duration-500",
                        "motion-safe:group-hover:scale-105",
                        "motion-reduce:transform-none motion-reduce:transition-none",
                      )}
                    />

                    {/* Hover overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 flex items-end p-4",
                        "bg-gradient-to-t from-[var(--gallery-overlay,hsl(0_0%_0%/0.6))] to-transparent",
                        "opacity-0",
                        "motion-safe:transition-opacity motion-safe:duration-300",
                        "motion-safe:group-hover:opacity-100",
                        "motion-reduce:transition-none motion-reduce:group-hover:opacity-100",
                      )}
                    >
                      <div>
                        <p className="text-sm font-medium text-[var(--gallery-overlay-text,hsl(0_0%_100%))]">
                          {image.alt}
                        </p>
                        {image.category && (
                          <p className="mt-0.5 text-xs text-[var(--gallery-overlay-muted,hsl(0_0%_100%/0.7))]">
                            {image.category}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
