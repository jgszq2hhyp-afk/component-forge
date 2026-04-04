// @version 1.0.0
// @category team
// @name Team Carousel
// @source custom-implementation

"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

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

const defaultMembers: TeamMember[] = [
  { name: "Anna Schmidt", role: "CEO & Co-Founder", imageSrc: "/team/anna.jpg", bio: "Visionary leader with 15 years in SaaS." },
  { name: "Max Weber", role: "CTO", imageSrc: "/team/max.jpg", bio: "Architecture and scalability expert." },
  { name: "Lena M\u00FCller", role: "Head of Design", imageSrc: "/team/lena.jpg", bio: "User experience advocate." },
  { name: "Tom Fischer", role: "Head of Engineering", imageSrc: "/team/tom.jpg", bio: "Full-stack performance specialist." },
  { name: "Sarah Klein", role: "Head of Marketing", imageSrc: "/team/sarah.jpg", bio: "Growth strategist and brand builder." },
  { name: "Jan Becker", role: "Head of Sales", imageSrc: "/team/jan.jpg", bio: "Enterprise sales veteran." },
];

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
    setCanScrollLeft(scrollLeft > 5);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5);
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
      if (scrollLeft >= scrollWidth - clientWidth - 5) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, prefersReducedMotion]);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollAmount = 320;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section
      className={cn("py-16 sm:py-24 bg-[var(--team-carousel-bg,transparent)]", className)}
      aria-label="Team members"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            {heading && (
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--team-carousel-heading-color,hsl(0_0%_9%))]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-2 text-base text-[var(--team-carousel-subheading-color,hsl(0_0%_45%))]">
                {subheading}
              </p>
            )}
          </div>

          <div className="hidden sm:flex gap-2">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-colors motion-reduce:transition-none",
                "border-[var(--team-carousel-btn-border,hsl(0_0%_0%/0.12))]",
                canScrollLeft
                  ? "text-[var(--team-carousel-btn-color,hsl(0_0%_9%))] hover:bg-[var(--team-carousel-btn-hover-bg,hsl(0_0%_95%))]"
                  : "text-[var(--team-carousel-btn-disabled,hsl(0_0%_75%))] cursor-not-allowed"
              )}
              aria-label="Previous team members"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border transition-colors motion-reduce:transition-none",
                "border-[var(--team-carousel-btn-border,hsl(0_0%_0%/0.12))]",
                canScrollRight
                  ? "text-[var(--team-carousel-btn-color,hsl(0_0%_9%))] hover:bg-[var(--team-carousel-btn-hover-bg,hsl(0_0%_95%))]"
                  : "text-[var(--team-carousel-btn-disabled,hsl(0_0%_75%))] cursor-not-allowed"
              )}
              aria-label="Next team members"
            >
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="list"
        >
          {members.map((member) => (
            <div
              key={member.name}
              className="flex-shrink-0 w-[260px] sm:w-[280px] snap-start"
              role="listitem"
            >
              <div className="aspect-[3/4] overflow-hidden rounded-2xl bg-[var(--team-carousel-img-bg,hsl(0_0%_95%))]">
                <img
                  src={member.imageSrc}
                  alt={member.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
