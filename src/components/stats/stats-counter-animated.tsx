// @version 1.0.0
// @category stats
// @name Stats Counter Animated
// @source custom-implementation

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

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

const defaultStats: Stat[] = [
  { value: 1200, suffix: "+", label: "Customers" },
  { value: 98, suffix: "%", label: "Satisfaction" },
  { value: 15, suffix: "M+", prefix: "$", label: "Revenue Generated" },
  { value: 24, suffix: "/7", label: "Support" },
];

function useCountUp(
  target: number,
  duration: number,
  shouldStart: boolean,
  prefersReducedMotion: boolean
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
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
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
    <div className="text-center">
      <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[var(--stats-value-color,hsl(0_0%_9%))]">
        {stat.prefix}
        {count.toLocaleString()}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm sm:text-base font-medium text-[var(--stats-label-color,hsl(0_0%_45%))]">
        {stat.label}
      </p>
    </div>
  );
}

export default function StatsCounterAnimated({
  stats = defaultStats,
  heading,
  subheading,
  duration = 2000,
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
      threshold: 0.2,
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
        "py-16 sm:py-24 bg-[var(--stats-bg,transparent)]",
        className
      )}
      aria-label="Key statistics"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(heading || subheading) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--stats-heading-color,hsl(0_0%_9%))]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-3 text-base text-[var(--stats-subheading-color,hsl(0_0%_45%))]">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-8 sm:gap-12 lg:grid-cols-4">
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
