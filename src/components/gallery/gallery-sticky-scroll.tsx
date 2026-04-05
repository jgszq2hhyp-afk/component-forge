// @source 21st.dev/r/ui-layouts/sticky-scroll
"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ReactLenis } from "lenis/react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GalleryImage {
  src: string;
  alt: string;
  aspectRatio?: string;
}

interface GalleryStickyScrollProps {
  heroHeading?: string[];
  leftImages?: GalleryImage[];
  centerImages?: GalleryImage[];
  rightImages?: GalleryImage[];
  footerText?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// SVG placeholder generator
// ---------------------------------------------------------------------------

function makePlaceholder(w: number, h: number): string {
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'%3E%3Crect width='${w}' height='${h}' rx='8' fill='oklch(0.25 0.02 265)'/%3E%3C/svg%3E`;
}

// ---------------------------------------------------------------------------
// Default images
// ---------------------------------------------------------------------------

const DEFAULT_LEFT: GalleryImage[] = [
  { src: makePlaceholder(500, 625), alt: "Gallery 1", aspectRatio: "4/5" },
  { src: makePlaceholder(500, 667), alt: "Gallery 2", aspectRatio: "3/4" },
  { src: makePlaceholder(500, 500), alt: "Gallery 3", aspectRatio: "1/1" },
  { src: makePlaceholder(500, 625), alt: "Gallery 4", aspectRatio: "4/5" },
  { src: makePlaceholder(500, 667), alt: "Gallery 5", aspectRatio: "3/4" },
];

const DEFAULT_CENTER: GalleryImage[] = [
  { src: makePlaceholder(500, 667), alt: "Gallery 6", aspectRatio: "3/4" },
  { src: makePlaceholder(500, 625), alt: "Gallery 7", aspectRatio: "4/5" },
  { src: makePlaceholder(500, 500), alt: "Gallery 8", aspectRatio: "1/1" },
];

const DEFAULT_RIGHT: GalleryImage[] = [
  { src: makePlaceholder(500, 500), alt: "Gallery 9", aspectRatio: "1/1" },
  { src: makePlaceholder(500, 625), alt: "Gallery 10", aspectRatio: "4/5" },
  { src: makePlaceholder(500, 667), alt: "Gallery 11", aspectRatio: "3/4" },
  { src: makePlaceholder(500, 625), alt: "Gallery 12", aspectRatio: "4/5" },
  { src: makePlaceholder(500, 500), alt: "Gallery 13", aspectRatio: "1/1" },
];

// ---------------------------------------------------------------------------
// Grid background pattern
// ---------------------------------------------------------------------------

const GridBackground = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("pointer-events-none absolute inset-0 z-0", className)}
    style={{
      backgroundImage: `
        linear-gradient(to right, oklch(0.30 0 0 / 0.18) 1px, transparent 1px),
        linear-gradient(to bottom, oklch(0.30 0 0 / 0.18) 1px, transparent 1px)
      `,
      backgroundSize: "60px 60px",
    }}
    {...props}
  />
));
GridBackground.displayName = "GridBackground";

// ---------------------------------------------------------------------------
// Hero section
// ---------------------------------------------------------------------------

const Hero = React.forwardRef<
  HTMLDivElement,
  { heading?: string[] } & React.HTMLAttributes<HTMLDivElement>
>(({ heading, className, ...props }, ref) => {
  const lines = heading ?? [
    "Create Gallery In a Better Way",
    "Using CSS sticky properties",
  ];

  return (
    <section
      ref={ref}
      className={cn(
        "relative flex h-screen w-full items-center justify-center overflow-hidden",
        className,
      )}
      style={{ background: "oklch(0.13 0.02 265)" }}
      {...props}
    >
      <GridBackground />
      <div className="relative z-10 flex flex-col items-center gap-6 px-6 text-center">
        {lines.map((line, i) => (
          <h1
            key={i}
            className={cn(
              "font-bold leading-tight tracking-tight",
              i === 0
                ? "text-4xl sm:text-5xl md:text-7xl"
                : "text-2xl font-medium sm:text-3xl md:text-4xl",
            )}
            style={{
              color:
                i === 0 ? "oklch(0.95 0 0)" : "oklch(0.95 0 0 / 0.6)",
            }}
          >
            {line}
          </h1>
        ))}
        <p
          className="mt-4 text-xl sm:text-2xl"
          style={{ color: "oklch(0.95 0 0 / 0.5)" }}
        >
          Scroll down!
        </p>
      </div>
    </section>
  );
});
Hero.displayName = "Hero";

// ---------------------------------------------------------------------------
// Gallery column
// ---------------------------------------------------------------------------

interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
  images: GalleryImage[];
  sticky?: boolean;
}

const Column = React.forwardRef<HTMLDivElement, ColumnProps>(
  ({ images, sticky = false, className, ...props }, ref) => {
    if (sticky) {
      return (
        <div
          ref={ref}
          className={cn("sticky top-0 flex h-screen flex-col gap-2", className)}
          {...props}
        >
          {images.map((img, i) => (
            <div
              key={`${img.alt}-${i}`}
              className="min-h-0 flex-1 overflow-hidden rounded-xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex flex-col gap-2", className)}
        {...props}
      >
        {images.map((img, i) => (
          <div
            key={`${img.alt}-${i}`}
            className="overflow-hidden rounded-xl"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img.src}
              alt={img.alt}
              className="h-auto w-full object-cover"
              style={{ aspectRatio: img.aspectRatio ?? "4/5" }}
              loading="lazy"
            />
          </div>
        ))}
      </div>
    );
  },
);
Column.displayName = "Column";

// ---------------------------------------------------------------------------
// Footer section
// ---------------------------------------------------------------------------

const Footer = React.forwardRef<
  HTMLDivElement,
  { text?: string } & React.HTMLAttributes<HTMLDivElement>
>(({ text = "gallery", className, ...props }, ref) => (
  <section
    ref={ref}
    className={cn(
      "relative flex h-screen w-full items-center justify-center overflow-hidden",
      className,
    )}
    style={{ background: "oklch(0.13 0.02 265)" }}
    {...props}
  >
    <GridBackground />
    <h2
      className="relative z-10 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-center text-[12vw] font-black uppercase leading-none tracking-tighter text-transparent"
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {text}
    </h2>
  </section>
));
Footer.displayName = "Footer";

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

const GalleryStickyScroll = React.forwardRef<
  HTMLDivElement,
  GalleryStickyScrollProps
>(
  (
    {
      heroHeading,
      leftImages = DEFAULT_LEFT,
      centerImages = DEFAULT_CENTER,
      rightImages = DEFAULT_RIGHT,
      footerText = "gallery",
      className,
    },
    ref,
  ) => {
    return (
      <ReactLenis root>
        <div
          ref={ref}
          className={cn("w-full", className)}
          style={{ background: "oklch(0.13 0.02 265)" }}
        >
          {/* Hero */}
          <Hero heading={heroHeading} />

          {/* Gallery grid */}
          <section className="relative px-2 py-2 sm:px-4">
            <div className="mx-auto grid max-w-[1400px] grid-cols-3 gap-2">
              {/* Left column - scrolls */}
              <Column images={leftImages} />

              {/* Center column - sticky, fills viewport */}
              <Column images={centerImages} sticky />

              {/* Right column - scrolls */}
              <Column images={rightImages} />
            </div>
          </section>

          {/* Footer */}
          <Footer text={footerText} />
        </div>
      </ReactLenis>
    );
  },
);
GalleryStickyScroll.displayName = "GalleryStickyScroll";

export default GalleryStickyScroll;
