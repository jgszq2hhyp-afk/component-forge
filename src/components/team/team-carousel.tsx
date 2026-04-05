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
const SCROLL_EDGE_THRESHOLD_PX = 5;

/** Auto-play scroll distance in px */
const AUTO_SCROLL_DISTANCE_PX = 300;

/** Manual scroll distance in px */
const MANUAL_SCROLL_DISTANCE_PX = 320;

/** Default auto-play interval in ms */
const DEFAULT_AUTO_PLAY_INTERVAL_MS = 4000;

/** Navigation button size */
const NAV_BUTTON_SIZE = "h-10 w-10";

/** Navigation icon size */
const NAV_ICON_SIZE = "h-4 w-4";

/** Card widths */
const CARD_WIDTH_SM = "w-[260px]";
const CARD_WIDTH_MD = "sm:w-[280px]";

/** Section layout */
const SECTION_PADDING_Y = "py-16 sm:py-24";
const MAX_WIDTH = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const HEADER_MARGIN_BOTTOM = "mb-10";
const CARD_GAP = "gap-6";
const CARD_RADIUS = "rounded-2xl";
const HEADING_CLAMP = "clamp(1.5rem, 2.5vw + 0.5rem, 1.875rem)";
const RING_COLOR_VALUE = "var(--ring, hsl(215 20% 65%))";

/** Focus ring class for all interactive elements */
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

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
  autoPlayInterval = DEFAULT_AUTO_PLAY_INTERVAL_MS,
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
    setCanScrollLeft(scrollLeft > SCROLL_EDGE_THRESHOLD_PX);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - SCROLL_EDGE_THRESHOLD_PX);
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
      if (scrollLeft >= scrollWidth - clientWidth - SCROLL_EDGE_THRESHOLD_PX) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: AUTO_SCROLL_DISTANCE_PX, behavior: "smooth" });
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, prefersReducedMotion]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -MANUAL_SCROLL_DISTANCE_PX : MANUAL_SCROLL_DISTANCE_PX,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      scroll("left");
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      scroll("right");
    }
  };

  return (
    <section
      className={cn(SECTION_PADDING_Y, "bg-[var(--team-carousel-bg,transparent)]", className)}
      aria-label="Team members carousel"
    >
      <div className={MAX_WIDTH}>
        <header className={cn("flex items-end justify-between", HEADER_MARGIN_BOTTOM)}>
          <div>
            {heading && (
              <h2
                className="font-bold text-[var(--team-carousel-heading-color,hsl(0_0%_9%))]"
                style={{ fontSize: HEADING_CLAMP }}
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
              type="button"
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "flex items-center justify-center rounded-full border",
                NAV_BUTTON_SIZE,
                "transition-colors motion-reduce:transition-none",
                "border-[var(--team-carousel-btn-border,hsl(0_0%_0%/0.12))]",
                FOCUS_RING,
                canScrollLeft
                  ? "text-[var(--team-carousel-btn-color,hsl(0_0%_9%))] hover:bg-[var(--team-carousel-btn-hover-bg,hsl(0_0%_95%))]"
                  : "text-[var(--team-carousel-btn-disabled,hsl(0_0%_75%))] cursor-not-allowed",
              )}
              style={{
                ['--tw-ring-color' as string]: RING_COLOR_VALUE,
              }}
              aria-label="Previous team members"
            >
              <svg className={NAV_ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "flex items-center justify-center rounded-full border",
                NAV_BUTTON_SIZE,
                "transition-colors motion-reduce:transition-none",
                "border-[var(--team-carousel-btn-border,hsl(0_0%_0%/0.12))]",
                FOCUS_RING,
                canScrollRight
                  ? "text-[var(--team-carousel-btn-color,hsl(0_0%_9%))] hover:bg-[var(--team-carousel-btn-hover-bg,hsl(0_0%_95%))]"
                  : "text-[var(--team-carousel-btn-disabled,hsl(0_0%_75%))] cursor-not-allowed",
              )}
              style={{
                ['--tw-ring-color' as string]: RING_COLOR_VALUE,
              }}
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
            "flex overflow-x-auto pb-4 snap-x snap-mandatory",
            CARD_GAP,
            "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
            prefersReducedMotion ? "scroll-auto" : "scroll-smooth",
          )}
          role="list"
          tabIndex={0}
          onKeyDown={handleKeyDown}
          aria-label="Team members list, use arrow keys to scroll"
        >
          {members.map((member) => (
            <article
              key={member.name}
              className={cn("flex-shrink-0 snap-start", CARD_WIDTH_SM, CARD_WIDTH_MD)}
              role="listitem"
            >
              <figure className={cn("aspect-[3/4] overflow-hidden bg-[var(--team-carousel-img-bg,hsl(0_0%_95%))] m-0", CARD_RADIUS)}>
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
