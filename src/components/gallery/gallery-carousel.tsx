// @version 2.0.0
// @category gallery
// @name Gallery Carousel
// @source custom-implementation

"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants — no magic numbers
// ---------------------------------------------------------------------------

/** Scroll threshold in px to decide if arrow should be enabled */
const SCROLL_EDGE_THRESHOLD = 10;

/** Gap between carousel cards in px */
const CARD_GAP = 16;

/** Fallback card width when no DOM element is available */
const FALLBACK_CARD_WIDTH = 300;

/** Active dot width class */
const DOT_ACTIVE_WIDTH = "w-6";

/** Inactive dot width class */
const DOT_INACTIVE_WIDTH = "w-2";

/** Dot height class */
const DOT_HEIGHT = "h-2";

/** Navigation button size */
const NAV_BUTTON_SIZE = "h-10 w-10";

/** Icon size inside nav buttons */
const NAV_ICON_SIZE = "h-5 w-5";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CarouselImage {
  src: string;
  alt: string;
  title?: string;
  description?: string;
}

interface GalleryCarouselProps {
  title?: string;
  subtitle?: string;
  images?: CarouselImage[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const defaultImages: CarouselImage[] = [
  { src: "/placeholder-1.jpg", alt: "Slide 1", title: "Creative Direction", description: "Brand identity for a tech startup" },
  { src: "/placeholder-2.jpg", alt: "Slide 2", title: "Web Design", description: "E-commerce platform redesign" },
  { src: "/placeholder-3.jpg", alt: "Slide 3", title: "Photography", description: "Product photography series" },
  { src: "/placeholder-4.jpg", alt: "Slide 4", title: "UI Design", description: "Mobile app interface" },
  { src: "/placeholder-5.jpg", alt: "Slide 5", title: "Illustration", description: "Editorial illustration set" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function GalleryCarousel({
  title = "Featured Projects",
  subtitle = "Scroll through our latest creative work.",
  images = defaultImages,
  autoPlay = false,
  autoPlayInterval = 5000,
  className,
}: GalleryCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const getCardWidth = useCallback((el: HTMLElement): number => {
    const firstChild = el.firstElementChild as HTMLElement | null;
    return firstChild ? firstChild.offsetWidth + CARD_GAP : FALLBACK_CARD_WIDTH;
  }, []);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > SCROLL_EDGE_THRESHOLD);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - SCROLL_EDGE_THRESHOLD);

    const cardWidth = getCardWidth(el);
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  }, [getCardWidth]);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = getCardWidth(el);
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }, [getCardWidth]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => el.removeEventListener("scroll", checkScroll);
  }, [checkScroll]);

  useEffect(() => {
    if (!autoPlay) return;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      if (canScrollRight) {
        scroll("right");
      } else {
        scrollRef.current?.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, canScrollRight, scroll]);

  return (
    <section
      className={cn("py-16 sm:py-24 bg-[var(--gallery-bg,hsl(0_0%_100%))]", className)}
      aria-label="Gallery carousel"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            {title && (
              <h2
                className="font-bold tracking-tight text-[var(--gallery-title,hsl(0_0%_9%))]"
                style={{ fontSize: "clamp(1.5rem, 3vw + 0.5rem, 2.25rem)" }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-2 text-base text-[var(--gallery-subtitle,hsl(0_0%_40%))]">
                {subtitle}
              </p>
            )}
          </div>

          {/* Navigation Arrows */}
          <nav className="flex gap-2" aria-label="Carousel navigation">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                `flex ${NAV_BUTTON_SIZE} items-center justify-center rounded-full border`,
                "transition-colors motion-reduce:transition-none",
                "border-[var(--gallery-control-border,hsl(0_0%_0%/0.12))]",
                "text-[var(--gallery-control,hsl(0_0%_9%))]",
                "hover:bg-[var(--gallery-control-hover,hsl(0_0%_0%/0.05))]",
                "disabled:opacity-30 disabled:cursor-not-allowed",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--gallery-ring,hsl(220_90%_56%))]"
              )}
              aria-label="Previous slide"
            >
              <svg className={NAV_ICON_SIZE} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                `flex ${NAV_BUTTON_SIZE} items-center justify-center rounded-full border`,
                "transition-colors motion-reduce:transition-none",
                "border-[var(--gallery-control-border,hsl(0_0%_0%/0.12))]",
                "text-[var(--gallery-control,hsl(0_0%_9%))]",
                "hover:bg-[var(--gallery-control-hover,hsl(0_0%_0%/0.05))]",
                "disabled:opacity-30 disabled:cursor-not-allowed",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--gallery-ring,hsl(220_90%_56%))]"
              )}
              aria-label="Next slide"
            >
              <svg className={NAV_ICON_SIZE} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </nav>
        </header>

        {/* Carousel */}
        <div
          ref={scrollRef}
          role="list"
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden motion-reduce:scroll-auto"
        >
          {images.map((image, index) => (
            <article
              key={index}
              role="listitem"
              className={cn(
                "flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] snap-start",
                "group relative overflow-hidden rounded-xl",
                "bg-[var(--gallery-card-bg,hsl(0_0%_96%))]"
              )}
            >
              <figure className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={cn(
                    "h-full w-full object-cover",
                    "transition-transform duration-500 group-hover:scale-105",
                    "motion-reduce:transform-none motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  )}
                />
              </figure>
              {(image.title || image.description) && (
                <div className="p-4">
                  {image.title && (
                    <h3 className="text-base font-semibold text-[var(--gallery-card-title,hsl(0_0%_9%))]">
                      {image.title}
                    </h3>
                  )}
                  {image.description && (
                    <p className="mt-1 text-sm text-[var(--gallery-card-desc,hsl(0_0%_40%))]">
                      {image.description}
                    </p>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Dots */}
        <nav className="mt-6 flex justify-center gap-2" aria-label="Slide indicators">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const el = scrollRef.current;
                if (!el) return;
                const cardWidth = getCardWidth(el);
                el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
              }}
              className={cn(
                `${DOT_HEIGHT} rounded-full`,
                "transition-all duration-300 motion-reduce:transition-none",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--gallery-ring,hsl(220_90%_56%))]",
                index === activeIndex
                  ? `${DOT_ACTIVE_WIDTH} bg-[var(--gallery-dot-active,hsl(0_0%_9%))]`
                  : `${DOT_INACTIVE_WIDTH} bg-[var(--gallery-dot,hsl(0_0%_0%/0.2))]`
              )}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </nav>
      </div>
    </section>
  );
}
