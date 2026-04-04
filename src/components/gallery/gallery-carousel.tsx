// @version 1.0.0
// @category gallery
// @name Gallery Carousel
// @source custom-implementation

"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

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

const defaultImages: CarouselImage[] = [
  { src: "/placeholder-1.jpg", alt: "Slide 1", title: "Creative Direction", description: "Brand identity for a tech startup" },
  { src: "/placeholder-2.jpg", alt: "Slide 2", title: "Web Design", description: "E-commerce platform redesign" },
  { src: "/placeholder-3.jpg", alt: "Slide 3", title: "Photography", description: "Product photography series" },
  { src: "/placeholder-4.jpg", alt: "Slide 4", title: "UI Design", description: "Mobile app interface" },
  { src: "/placeholder-5.jpg", alt: "Slide 5", title: "Illustration", description: "Editorial illustration set" },
];

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

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);

    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 1;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  }, []);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild
      ? (el.firstElementChild as HTMLElement).offsetWidth + 16
      : 300;
    el.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  }, []);

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
    <section className={cn("py-16 sm:py-24 bg-[var(--gallery-bg,hsl(0_0%_100%))]", className)}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            {title && (
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[var(--gallery-title,hsl(0_0%_9%))]">
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
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                "border-[var(--gallery-control-border,hsl(0_0%_0%/0.12))]",
                "text-[var(--gallery-control,hsl(0_0%_9%))]",
                "hover:bg-[var(--gallery-control-hover,hsl(0_0%_0%/0.05))]",
                "disabled:opacity-30 disabled:cursor-not-allowed"
              )}
              aria-label="Previous slide"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-colors",
                "border-[var(--gallery-control-border,hsl(0_0%_0%/0.12))]",
                "text-[var(--gallery-control,hsl(0_0%_9%))]",
                "hover:bg-[var(--gallery-control-hover,hsl(0_0%_0%/0.05))]",
                "disabled:opacity-30 disabled:cursor-not-allowed"
              )}
              aria-label="Next slide"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={cn(
                "flex-shrink-0 w-[280px] sm:w-[340px] lg:w-[400px] snap-start",
                "group relative overflow-hidden rounded-xl",
                "bg-[var(--gallery-card-bg,hsl(0_0%_96%))]"
              )}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  className={cn(
                    "h-full w-full object-cover transition-transform duration-500",
                    "group-hover:scale-105",
                    "motion-reduce:group-hover:scale-100 motion-reduce:transition-none"
                  )}
                />
              </div>
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
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const el = scrollRef.current;
                if (!el || !el.firstElementChild) return;
                const cardWidth = (el.firstElementChild as HTMLElement).offsetWidth + 16;
                el.scrollTo({ left: cardWidth * index, behavior: "smooth" });
              }}
              className={cn(
                "h-2 rounded-full transition-all duration-300 motion-reduce:transition-none",
                index === activeIndex
                  ? "w-6 bg-[var(--gallery-dot-active,hsl(0_0%_9%))]"
                  : "w-2 bg-[var(--gallery-dot,hsl(0_0%_0%/0.2))]"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
