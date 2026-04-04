// @version 2.0.0
// @category team
// @name Team Carousel
// @source custom-implementation

"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Scroll threshold in px to determine edge state */
const SCROLL_EDGE_THRESHOLD = 5;

/** Auto-play scroll distance in px */
const AUTO_SCROLL_DISTANCE = 300;

/** Manual scroll distance in px */
const MANUAL_SCROLL_DISTANCE = 320;

/** Navigation button size */
const NAV_BUTTON_SIZE = "h-10 w-10";

/** Navigation icon size */
const NAV_ICON_SIZE = "h-4 w-4";

/** Focus ring class for all interactive elements */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--team-carousel-ring,hsl(220_90%_56%))]";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TeamMember {
  name: string;
  role: string;
  imageSrc: string;
  bio?: string;
}

interface TeamCarouselProps {
  members?: TeamMember[];
  heading?: string;
  subheading?: string;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const defaultMembers: TeamMember[] = [
  { name: "Anna Schmidt", role: "CEO & Co-Founder", imageSrc: "/team/anna.jpg", bio: "Visionary leader with 15 years in SaaS." },
  { name: "Max Weber", role: "CTO", imageSrc: "/team/max.jpg", bio: "Architecture and scalability expert." },
  { name: "Lena Müller", role: "Head of Design", imageSrc: "/team/lena.jpg", bio: "User experience advocate." },
  { name: "Tom Fischer", role: "Head of Engineering", imageSrc: "/team/tom.jpg", bio: "Full-stack performance specialist." },
  { name: "Sarah Klein", role: "Head of Marketing", imageSrc: "/team/sarah.jpg", bio: "Growth strategist and brand builder." },
  { name: "Jan Becker", role: "Head of Sales", imageSrc: "/team/jan.jpg", bio: "Enterprise sales veteran." },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TeamCarousel({
  members = defaultMembers,
  heading = "The People Behind the Product",
  subheading,
  autoPlay = false,
  autoPlayInterval = 4000,
  className,
}: TeamCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const updateScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > SCROLL_EDGE_THRESHOLD);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - SCROLL_EDGE_THRESHOLD);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  useEffect(() => {
    if (!autoPlay || prefersReducedMotion || !scrollRef.current) return;

    const interval = setInterval(() => {
      if (!scrollRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      if (scrollLeft >= scrollWidth - clientWidth - SCROLL_EDGE_THRESHOLD) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: AUTO_SCROLL_DISTANCE, behavior: "smooth" });
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, prefersReducedMotion]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -MANUAL_SCROLL_DISTANCE : MANUAL_SCROLL_DISTANCE,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      className={cn("py-16 sm:py-24 bg-[var(--team-carousel-bg,transparent)]", className)}
      aria-label="Team members carousel"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="flex items-end justify-between mb-10">
          <div>
            {heading && (
              <h2
                className="font-bold text-[var(--team-carousel-heading-color,hsl(0_0%_9%))]"
                style={{ fontSize: "clamp(1.5rem, 2.5vw + 0.5rem, 1.875rem)" }}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-2 text-base text-[var(--team-carousel-subheading-color,hsl(0_0%_45%))]">
                {subheading}
              </p>
            )}
          </div>

          <nav className="hidden sm:flex gap-2" aria-label="Carousel navigation">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                `flex ${NAV_BUTTON_SIZE} items-center justify-center rounded-full border`,
                "transition-colors motion-reduce:transition-none",
                "border-[var(--team-carousel-btn-border,hsl(0_0%_0%/0.12))]",
                FOCUS_RING,
                canScrollLeft
                  ? "text-[var(--team-carousel-btn-color,hsl(0_0%_9%))] hover:bg-[var(--team-carousel-btn-hover-bg,hsl(0_0%_95%))]"
                  : "text-[var(--team-carousel-btn-disabled,hsl(0_0%_75%))] cursor-not-allowed"
              )}
              aria-label="Previous team members"
            >
              <svg className={NAV_ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                `flex ${NAV_BUTTON_SIZE} items-center justify-center rounded-full border`,
                "transition-colors motion-reduce:transition-none",
                "border-[var(--team-carousel-btn-border,hsl(0_0%_0%/0.12))]",
                FOCUS_RING,
                canScrollRight
                  ? "text-[var(--team-carousel-btn-color,hsl(0_0%_9%))] hover:bg-[var(--team-carousel-btn-hover-bg,hsl(0_0%_95%))]"
                  : "text-[var(--team-carousel-btn-disabled,hsl(0_0%_75%))] cursor-not-allowed"
              )}
              aria-label="Next team members"
            >
              <svg className={NAV_ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </nav>
        </header>

        <div
          ref={scrollRef}
          className={cn(
            "flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory",
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            prefersReducedMotion ? "scroll-auto" : "scroll-smooth",
          )}
          role="list"
        >
          {members.map((member) => (
            <article
              key={member.name}
              className="flex-shrink-0 w-[260px] sm:w-[280px] snap-start"
              role="listitem"
            >
              <figure className="aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--team-carousel-img-bg,hsl(0_0%_95%))] m-0">
                <img
                  src={member.imageSrc}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </figure>
              <div className="mt-4">
                <p className="text-base font-semibold text-[var(--team-carousel-name-color,hsl(0_0%_9%))]">
                  {member.name}
                </p>
                <p className="text-sm text-[var(--team-carousel-role-color,hsl(0_0%_45%))]">
                  {member.role}
                </p>
                {member.bio && (
                  <p className="mt-2 text-sm text-[var(--team-carousel-bio-color,hsl(0_0%_55%))]">
                    {member.bio}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
