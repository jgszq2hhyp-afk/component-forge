// @version 2.0.0
// @category stats
// @name Stats Counter Animated
// @source custom-implementation

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** IntersectionObserver visibility threshold (0-1) */
const VISIBILITY_THRESHOLD = 0.2;

/** Default count-up animation duration in ms */
const DEFAULT_DURATION_MS = 2000;

/** Easing exponent for ease-out cubic */
const EASING_EXPONENT = 3;

/** Section layout */
const SECTION_PADDING_Y = "py-16 sm:py-24";
const MAX_WIDTH = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const HEADER_MARGIN_BOTTOM = "mb-12";
const GRID_GAP = "gap-8 sm:gap-12";

/** Typography clamp values */
const VALUE_CLAMP = "clamp(1.875rem, 3vw + 0.5rem, 3rem)";
const HEADING_CLAMP = "clamp(1.5rem, 2.5vw + 0.5rem, 1.875rem)";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Stat {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
}

interface StatsCounterAnimatedProps {
  stats?: Stat[];
  heading?: string;
  subheading?: string;
  duration?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const defaultStats: Stat[] = [
  { value: 1200, suffix: "+", label: "Customers" },
  { value: 98, suffix: "%", label: "Satisfaction" },
  { value: 15, suffix: "M+", prefix: "$", label: "Revenue Generated" },
  { value: 24, suffix: "/7", label: "Support" },
];

// ---------------------------------------------------------------------------
// Hook - animated counter
// ---------------------------------------------------------------------------

function useCountUp(
  target: number,
  duration: number,
  shouldStart: boolean,
  prefersReducedMotion: boolean,
): number {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;
    if (prefersReducedMotion) {
      setCount(target);
      return;
    }

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, EASING_EXPONENT);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    const raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, shouldStart, prefersReducedMotion]);

  return count;
}

// ---------------------------------------------------------------------------
// Sub-component - single stat
// ---------------------------------------------------------------------------

function AnimatedStat({
  stat,
  duration,
  isVisible,
  prefersReducedMotion,
}: {
  stat: Stat;
  duration: number;
  isVisible: boolean;
  prefersReducedMotion: boolean;
}) {
  const count = useCountUp(stat.value, duration, isVisible, prefersReducedMotion);

  return (
    <article className="text-center">
      <p
        className="font-bold tracking-tight text-[var(--stats-value-color,hsl(0_0%_9%))]"
        style={{ fontSize: VALUE_CLAMP }}
      >
        {stat.prefix}
        {count.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm sm:text-base font-medium text-[var(--stats-label-color,hsl(0_0%_45%))]">
        {stat.label}
      </p>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function StatsCounterAnimated({
  stats = defaultStats,
  heading,
  subheading,
  duration = DEFAULT_DURATION_MS,
  className,
}: StatsCounterAnimatedProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0].isIntersecting) {
      setIsVisible(true);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: VISIBILITY_THRESHOLD,
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
        "bg-[var(--stats-bg,transparent)]",
        className,
      )}
      aria-label="Key statistics"
    >
      <div className={MAX_WIDTH}>
        {(heading || subheading) && (
          <header className={cn(HEADER_MARGIN_BOTTOM, "text-center")}>
            {heading && (
              <h2
                className="font-bold text-[var(--stats-heading-color,hsl(0_0%_9%))]"
                style={{ fontSize: HEADING_CLAMP }}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-3 text-base text-[var(--stats-subheading-color,hsl(0_0%_45%))]">
                {subheading}
              </p>
            )}
          </header>
        )}

        <div className={cn("grid grid-cols-2 lg:grid-cols-4", GRID_GAP)}>
          {stats.map((stat) => (
            <AnimatedStat
              key={stat.label}
              stat={stat}
              duration={duration}
              isVisible={isVisible}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
