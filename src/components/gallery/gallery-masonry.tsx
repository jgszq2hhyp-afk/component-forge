// @version 1.0.0
// @category gallery
// @name Gallery Masonry
// @source custom-implementation

"use client";

import { useState, useMemo } from "react";
import { cn } from "@/lib/utils";

interface GalleryImage {
  src: string;
  alt: string;
  width: number;
  height: number;
  category?: string;
}

interface GalleryMasonryProps {
  images?: GalleryImage[];
  columns?: number;
  gap?: number;
  className?: string;
  onImageClick?: (image: GalleryImage, index: number) => void;
}

const defaultImages: GalleryImage[] = [
  { src: "/placeholder-1.jpg", alt: "Project 1", width: 800, height: 600, category: "Web" },
  { src: "/placeholder-2.jpg", alt: "Project 2", width: 600, height: 900, category: "Brand" },
  { src: "/placeholder-3.jpg", alt: "Project 3", width: 800, height: 500, category: "Web" },
  { src: "/placeholder-4.jpg", alt: "Project 4", width: 600, height: 800, category: "Print" },
  { src: "/placeholder-5.jpg", alt: "Project 5", width: 800, height: 600, category: "Brand" },
  { src: "/placeholder-6.jpg", alt: "Project 6", width: 600, height: 700, category: "Web" },
  { src: "/placeholder-7.jpg", alt: "Project 7", width: 800, height: 500, category: "Print" },
  { src: "/placeholder-8.jpg", alt: "Project 8", width: 600, height: 900, category: "Brand" },
];

export default function GalleryMasonry({
  images = defaultImages,
  columns = 3,
  gap = 4,
  className,
  onImageClick,
}: GalleryMasonryProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());

  const columnArrays = useMemo(() => {
    const cols: GalleryImage[][] = Array.from({ length: columns }, () => []);
    const heights = new Array(columns).fill(0);

    images.forEach((image) => {
      const shortestCol = heights.indexOf(Math.min(...heights));
      cols[shortestCol].push(image);
      heights[shortestCol] += image.height / image.width;
    });

    return cols;
  }, [images, columns]);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set(prev).add(index));
  };

  return (
    <section className={cn("py-16 sm:py-24 bg-[var(--gallery-bg,hsl(0_0%_100%))]", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: `${gap * 4}px`,
          }}
        >
          {columnArrays.map((colImages, colIndex) => (
            <div key={colIndex} className="flex flex-col" style={{ gap: `${gap * 4}px` }}>
              {colImages.map((image, imgIndex) => {
                const globalIndex = images.indexOf(image);
                const isLoaded = loadedImages.has(globalIndex);

                return (
                  <button
                    key={`${colIndex}-${imgIndex}`}
                    onClick={() => onImageClick?.(image, globalIndex)}
                    className={cn(
                      "group relative overflow-hidden rounded-xl transition-shadow duration-300",
                      "hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--gallery-ring,hsl(220_90%_56%))] focus:ring-offset-2",
                      "motion-reduce:transition-none"
                    )}
                    style={{ aspectRatio: `${image.width}/${image.height}` }}
                  >
                    {/* Placeholder */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-[var(--gallery-placeholder,hsl(0_0%_92%))] transition-opacity duration-500",
                        isLoaded ? "opacity-0" : "opacity-100"
                      )}
                    />

                    {/* Image */}
                    <img
                      src={image.src}
                      alt={image.alt}
                      loading="lazy"
                      onLoad={() => handleImageLoad(globalIndex)}
                      className={cn(
                        "h-full w-full object-cover transition-transform duration-500",
                        "group-hover:scale-105",
                        "motion-reduce:group-hover:scale-100 motion-reduce:transition-none"
                      )}
                    />

                    {/* Overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 flex items-end p-4 transition-opacity duration-300",
                        "bg-gradient-to-t from-[var(--gallery-overlay,hsl(0_0%_0%/0.6))] to-transparent",
                        "opacity-0 group-hover:opacity-100",
                        "motion-reduce:transition-none"
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
