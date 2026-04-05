// @version 2.0.0
// @category team
// @name About Story Timeline
// @source custom-implementation

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const INTERSECTION_THRESHOLD = 0.2;
const TRANSLATE_OFFSET_REM = 2; // translate-y-8 = 2rem
const DOT_SIZE_PX = 12;
const DOT_WRAPPER_PX = DOT_SIZE_PX + 4;
const IMAGE_MAX_HEIGHT_PX = 192;
const ANIMATION_DURATION_MS = 700;
const SECTION_PY = "py-16 sm:py-24";
const HEADING_CLAMP = "text-[clamp(1.5rem,1rem+1.5vw,2rem)]";
const CARD_RADIUS = "rounded-2xl";
const RING_STYLE = {
  ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
};

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  highlight?: boolean;
  imageSrc?: string;
}

interface AboutStoryTimelineProps {
  events?: TimelineEvent[];
  heading?: string;
  subheading?: string;
  variant?: "vertical" | "alternating";
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Default data                                                      */
/* ------------------------------------------------------------------ */

const defaultEvents: TimelineEvent[] = [
  {
    year: "2019",
    title: "The Idea",
    description: "Two engineers frustrated with enterprise tooling decided to build something better. Late nights, whiteboards, and too much coffee.",
  },
  {
    year: "2020",
    title: "First Customer",
    description: "Launched our MVP and landed our first paying customer within 3 weeks. Product-market fit was immediate.",
    highlight: true,
  },
  {
    year: "2021",
    title: "Seed Round",
    description: "Raised $4M seed round to scale the team from 5 to 25 people. Opened our first office in Berlin.",
  },
  {
    year: "2022",
    title: "1,000 Customers",
    description: "Crossed the 1,000 customer milestone. Expanded into 12 new countries across Europe and North America.",
    highlight: true,
  },
  {
    year: "2023",
    title: "Series A",
    description: "Closed $18M Series A. Team grew to 80+ across 3 offices. Launched enterprise tier and API platform.",
  },
  {
    year: "2024",
    title: "Today",
    description: "Serving 5,000+ companies worldwide. 150+ team members. Building the future of business infrastructure.",
    highlight: true,
  },
];

/* ------------------------------------------------------------------ */
/*  TimelineItem                                                      */
/* ------------------------------------------------------------------ */

function TimelineItem({
  event,
  isVisible,
  prefersReducedMotion,
}: {
  event: TimelineEvent;
  isVisible: boolean;
  side: "left" | "right";
  prefersReducedMotion: boolean;
}) {
  return (
    <article
      className={cn(
        "motion-reduce:!opacity-100 motion-reduce:!translate-y-0 motion-reduce:!transition-none",
        prefersReducedMotion
          ? "opacity-100 translate-y-0"
          : isVisible
            ? "opacity-100 translate-y-0 transition-all"
            : "opacity-0 translate-y-8 transition-all"
      )}
      style={!prefersReducedMotion ? { transitionDuration: `${ANIMATION_DURATION_MS}ms` } : undefined}
    >
      <div
        className={cn(
          CARD_RADIUS,
          "p-6",
          event.highlight
            ? "bg-[var(--timeline-highlight-bg,hsl(220_80%_55%/0.05))] border border-[var(--timeline-highlight-border,hsl(220_80%_55%/0.15))]"
            : "bg-[var(--timeline-card-bg,hsl(0_0%_98%))] border border-[var(--timeline-card-border,hsl(0_0%_0%/0.06))]"
        )}
      >
        <span
          className={cn(
            "inline-block text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full mb-3",
            event.highlight
              ? "bg-[var(--timeline-year-highlight-bg,hsl(220_80%_55%/0.1))] text-[var(--timeline-year-highlight-color,hsl(220_80%_55%))]"
              : "bg-[var(--timeline-year-bg,hsl(0_0%_92%))] text-[var(--timeline-year-color,hsl(0_0%_40%))]"
          )}
          aria-hidden="true"
        >
          {event.year}
        </span>

        <h3 className="text-lg font-semibold text-[var(--timeline-title-color,hsl(0_0%_9%))]">
          <time dateTime={event.year} className="sr-only">{event.year}: </time>
          {event.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--timeline-desc-color,hsl(0_0%_40%))]">
          {event.description}
        </p>

        {event.imageSrc && (
          <img
            src={event.imageSrc}
            alt={`${event.title} – ${event.year}`}
            className="mt-4 rounded-xl w-full object-cover"
            style={{ maxHeight: IMAGE_MAX_HEIGHT_PX }}
            loading="lazy"
          />
        )}
      </div>
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function AboutStoryTimeline({
  events = defaultEvents,
  heading = "Our Story",
  subheading,
  variant = "vertical",
  className,
}: AboutStoryTimelineProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Number(entry.target.getAttribute("data-index"));
        if (!isNaN(index)) {
          setVisibleItems((prev) => new Set(prev).add(index));
        }
      }
    });
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: INTERSECTION_THRESHOLD,
    });
    const items = sectionRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [handleIntersect, prefersReducedMotion]);

  /* ---- Shared header ---- */
  const renderHeader = () => {
    if (!heading && !subheading) return null;
    return (
      <header className="mb-16 text-center">
        {heading && (
          <h2 className={cn("font-bold", HEADING_CLAMP, "text-[var(--timeline-heading-color,hsl(0_0%_9%))]")}>
            {heading}
          </h2>
        )}
        {subheading && (
          <p className="mt-3 text-lg text-[var(--timeline-subheading-color,hsl(0_0%_45%))]">
            {subheading}
          </p>
        )}
      </header>
    );
  };

  /* ---- Alternating variant ---- */
  if (variant === "alternating") {
    return (
      <section
        ref={sectionRef}
        className={cn(SECTION_PY, "bg-[var(--timeline-bg,transparent)]", className)}
        aria-label="Company timeline"
        style={RING_STYLE}
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {renderHeader()}

          <div className="relative">
            {/* Center line */}
            <div
              className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[var(--timeline-line-color,hsl(0_0%_0%/0.1))] hidden md:block"
              aria-hidden="true"
            />

            <ol className="space-y-12 md:space-y-0 list-none p-0 m-0">
              {events.map((event, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <li
                    key={`${event.year}-${event.title}`}
                    data-index={i}
                    className="relative md:flex md:items-start md:gap-8 md:py-8"
                  >
                    {/* Left content */}
                    <div className={cn("md:w-1/2", isLeft ? "md:pr-12" : "md:pr-12 md:order-2")}>
                      {isLeft && (
                        <TimelineItem
                          event={event}
                          isVisible={visibleItems.has(i)}
                          side="left"
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      )}
                    </div>

                    {/* Center dot */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 hidden md:flex items-center justify-center"
                      style={{ width: DOT_WRAPPER_PX, height: DOT_WRAPPER_PX }}
                      aria-hidden="true"
                    >
                      <div
                        className={cn(
                          "rounded-full",
                          event.highlight
                            ? "bg-[var(--timeline-dot-highlight,hsl(220_80%_55%))]"
                            : "bg-[var(--timeline-dot-color,hsl(0_0%_75%))]"
                        )}
                        style={{ width: DOT_SIZE_PX, height: DOT_SIZE_PX }}
                      />
                    </div>

                    {/* Right content */}
                    <div className={cn("md:w-1/2", isLeft ? "md:pl-12 md:order-2" : "md:pl-12")}>
                      {!isLeft && (
                        <TimelineItem
                          event={event}
                          isVisible={visibleItems.has(i)}
                          side="right"
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      )}
                    </div>

                    {/* Mobile-only: always show */}
                    <div className="md:hidden">
                      <TimelineItem
                        event={event}
                        isVisible={visibleItems.has(i)}
                        side="left"
                        prefersReducedMotion={prefersReducedMotion}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>
    );
  }

  /* ---- Vertical variant (default) ---- */
  return (
    <section
      ref={sectionRef}
      className={cn(SECTION_PY, "bg-[var(--timeline-bg,transparent)]", className)}
      aria-label="Company timeline"
      style={RING_STYLE}
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {renderHeader()}

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-[var(--timeline-line-color,hsl(0_0%_0%/0.1))]"
            aria-hidden="true"
          />

          <ol className="space-y-10 list-none p-0 m-0">
            {events.map((event, i) => (
              <li
                key={`${event.year}-${event.title}`}
                data-index={i}
                className="relative pl-12 sm:pl-16"
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-6 -translate-x-1/2 mt-2" aria-hidden="true">
                  <div
                    className={cn(
                      "rounded-full ring-4 ring-[var(--timeline-bg,hsl(0_0%_100%))]",
                      event.highlight
                        ? "bg-[var(--timeline-dot-highlight,hsl(220_80%_55%))]"
                        : "bg-[var(--timeline-dot-color,hsl(0_0%_75%))]"
                    )}
                    style={{ width: DOT_SIZE_PX, height: DOT_SIZE_PX }}
                  />
                </div>

                <TimelineItem
                  event={event}
                  isVisible={visibleItems.has(i)}
                  side="left"
                  prefersReducedMotion={prefersReducedMotion}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
