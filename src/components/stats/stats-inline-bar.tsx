// @version 2.0.0
// @category stats
// @name Stats Inline Bar
// @source custom-implementation

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SECTION_PADDING_Y = "py-16 sm:py-24";
const MAX_WIDTH = "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8";
const BAR_HEIGHT = "h-2.5";
const INTERSECTION_THRESHOLD = 0.3;
const DEFAULT_ANIMATION_DURATION_MS = 1200;
const DEFAULT_MAX_VALUE = 100;
const PERCENTAGE_CAP = 100;
const HEADING_CLAMP = "text-[clamp(1.5rem,1rem+1.5vw,1.875rem)]";
const HEADER_MARGIN_BOTTOM = "mb-12";
const BAR_SPACING = "space-y-8";
const LABEL_MARGIN_BOTTOM = "mb-2";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BarStat {
  label: string;
  value: number;
  maxValue?: number;
  displayValue?: string;
  color?: string;
}

interface StatsInlineBarProps {
  stats?: BarStat[];
  heading?: string;
  subheading?: string;
  animationDuration?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const defaultStats: BarStat[] = [
  { label: "Customer Satisfaction", value: 97, displayValue: "97%" },
  { label: "On-Time Delivery", value: 94, displayValue: "94%" },
  { label: "Revenue Growth", value: 82, displayValue: "82%" },
  { label: "Employee Retention", value: 91, displayValue: "91%" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function StatsInlineBar({
  stats = defaultStats,
  heading,
  subheading,
  animationDuration = DEFAULT_ANIMATION_DURATION_MS,
  className,
}: StatsInlineBarProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    },
    [],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: INTERSECTION_THRESHOLD,
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <section
      ref={sectionRef}
      className={cn(
        SECTION_PADDING_Y,
        "bg-[var(--stats-bar-bg,transparent)]",
        className,
      )}
      aria-label="Performance statistics"
    >
      <div className={MAX_WIDTH}>
        {(heading || subheading) && (
          <header className={cn(HEADER_MARGIN_BOTTOM, "text-center")}>
            {heading && (
              <h2
                className={cn(
                  "font-bold",
                  HEADING_CLAMP,
                  "text-[var(--stats-bar-heading-color,hsl(0_0%_9%))]",
                )}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-3 text-base text-[var(--stats-bar-subheading-color,hsl(0_0%_45%))]">
                {subheading}
              </p>
            )}
          </header>
        )}

        <ol className={BAR_SPACING} aria-label="Statistics bars">
          {stats.map((stat) => {
            const maxVal = stat.maxValue ?? DEFAULT_MAX_VALUE;
            const percentage = Math.min(
              (stat.value / maxVal) * PERCENTAGE_CAP,
              PERCENTAGE_CAP,
            );
            const showFilled = isVisible || prefersReducedMotion;

            return (
              <li key={stat.label}>
                <div className={cn(LABEL_MARGIN_BOTTOM, "flex items-center justify-between")}>
                  <span className="text-sm font-medium text-[var(--stats-bar-label-color,hsl(0_0%_20%))]">
                    {stat.label}
                  </span>
                  <span className="text-sm font-bold text-[var(--stats-bar-value-color,hsl(0_0%_9%))]">
                    {stat.displayValue ?? `${stat.value}`}
                  </span>
                </div>
                <div
                  className={cn(
                    BAR_HEIGHT,
                    "w-full overflow-hidden rounded-full",
                    "bg-[var(--stats-bar-track-bg,hsl(0_0%_92%))]",
                  )}
                  role="progressbar"
                  aria-valuenow={stat.value}
                  aria-valuemin={0}
                  aria-valuemax={maxVal}
                  aria-label={`${stat.label}: ${stat.displayValue ?? stat.value}`}
                >
                  <div
                    className={cn(
                      "h-full rounded-full",
                      "motion-reduce:!transition-none",
                    )}
                    style={{
                      width: showFilled ? `${percentage}%` : "0%",
                      backgroundColor:
                        stat.color ??
                        "var(--stats-bar-fill-color, hsl(220 80% 55%))",
                      transition: prefersReducedMotion
                        ? "none"
                        : `width ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                    }}
                  />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
