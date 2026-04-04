// @version 1.0.0
// @category team
// @name About Story Timeline
// @source custom-implementation

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

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

function TimelineItem({
  event,
  isVisible,
  side,
  prefersReducedMotion,
}: {
  event: TimelineEvent;
  isVisible: boolean;
  side: "left" | "right";
  prefersReducedMotion: boolean;
}) {
  return (
    <div
      className={cn(
        "transition-all duration-700 motion-reduce:transition-none",
        isVisible || prefersReducedMotion
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      )}
    >
      <div
        className={cn(
          "rounded-2xl p-6",
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
        >
          {event.year}
        </span>

        <h3 className="text-lg font-semibold text-[var(--timeline-title-color,hsl(0_0%_9%))]">
          {event.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-[var(--timeline-desc-color,hsl(0_0%_40%))]">
          {event.description}
        </p>

        {event.imageSrc && (
          <img
            src={event.imageSrc}
            alt={event.title}
            className="mt-4 rounded-xl w-full object-cover max-h-48"
            loading="lazy"
          />
        )}
      </div>
    </div>
  );
}

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
    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.2 });
    const items = sectionRef.current?.querySelectorAll("[data-index]");
    items?.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [handleIntersect, prefersReducedMotion]);

  if (variant === "alternating") {
    return (
      <section
        ref={sectionRef}
        className={cn("py-16 sm:py-24 bg-[var(--timeline-bg,transparent)]", className)}
        aria-label="Company timeline"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {(heading || subheading) && (
            <div className="mb-16 text-center">
              {heading && (
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--timeline-heading-color,hsl(0_0%_9%))]">
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="mt-3 text-lg text-[var(--timeline-subheading-color,hsl(0_0%_45%))]">
                  {subheading}
                </p>
              )}
            </div>
          )}

          <div className="relative">
            {/* Center line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-[var(--timeline-line-color,hsl(0_0%_0%/0.1))] hidden md:block" />

            <div className="space-y-12 md:space-y-0">
              {events.map((event, i) => {
                const isLeft = i % 2 === 0;

                return (
                  <div
                    key={`${event.year}-${event.title}`}
                    data-index={i}
                    className="relative md:flex md:items-start md:gap-8 md:py-8"
                  >
                    {/* Left content */}
                    <div className={cn("md:w-1/2", isLeft ? "md:pr-12" : "md:pr-12 md:order-2")}>
                      {(isLeft || typeof window === "undefined") && (
                        <TimelineItem
                          event={event}
                          isVisible={visibleItems.has(i)}
                          side="left"
                          prefersReducedMotion={prefersReducedMotion}
                        />
                      )}
                    </div>

                    {/* Center dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex h-4 w-4 items-center justify-center">
                      <div
                        className={cn(
                          "h-3 w-3 rounded-full",
                          event.highlight
                            ? "bg-[var(--timeline-dot-highlight,hsl(220_80%_55%))]"
                            : "bg-[var(--timeline-dot-color,hsl(0_0%_75%))]"
                        )}
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
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // vertical variant (default)
  return (
    <section
      ref={sectionRef}
      className={cn("py-16 sm:py-24 bg-[var(--timeline-bg,transparent)]", className)}
      aria-label="Company timeline"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {(heading || subheading) && (
          <div className="mb-16 text-center">
            {heading && (
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--timeline-heading-color,hsl(0_0%_9%))]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-3 text-lg text-[var(--timeline-subheading-color,hsl(0_0%_45%))]">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-px bg-[var(--timeline-line-color,hsl(0_0%_0%/0.1))]" />

          <div className="space-y-10">
            {events.map((event, i) => (
              <div
                key={`${event.year}-${event.title}`}
                data-index={i}
                className="relative pl-12 sm:pl-16"
              >
                {/* Dot */}
                <div className="absolute left-4 sm:left-6 -translate-x-1/2 mt-2">
                  <div
                    className={cn(
                      "h-3 w-3 rounded-full ring-4 ring-[var(--timeline-bg,hsl(0_0%_100%))]",
                      event.highlight
                        ? "bg-[var(--timeline-dot-highlight,hsl(220_80%_55%))]"
                        : "bg-[var(--timeline-dot-color,hsl(0_0%_75%))]"
                    )}
                  />
                </div>

                <TimelineItem
                  event={event}
                  isVisible={visibleItems.has(i)}
                  side="left"
                  prefersReducedMotion={prefersReducedMotion}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
