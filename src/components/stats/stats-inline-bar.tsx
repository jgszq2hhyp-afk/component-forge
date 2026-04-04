// @version 1.0.0
// @category stats
// @name Stats Inline Bar
// @source custom-implementation

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

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

const defaultStats: BarStat[] = [
  { label: "Customer Satisfaction", value: 97, displayValue: "97%" },
  { label: "On-Time Delivery", value: 94, displayValue: "94%" },
  { label: "Revenue Growth", value: 82, displayValue: "82%" },
  { label: "Employee Retention", value: 91, displayValue: "91%" },
];

export default function StatsInlineBar({
  stats = defaultStats,
  heading,
  subheading,
  animationDuration = 1200,
  className,
}: StatsInlineBarProps) {
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
      threshold: 0.3,
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, [handleIntersect]);

  return (
    <section
      ref={sectionRef}
      className={cn("py-16 sm:py-24 bg-[var(--stats-bar-bg,transparent)]", className)}
      aria-label="Performance statistics"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {(heading || subheading) && (
          <div className="mb-12 text-center">
            {heading && (
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--stats-bar-heading-color,hsl(0_0%_9%))]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-3 text-base text-[var(--stats-bar-subheading-color,hsl(0_0%_45%))]">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div className="space-y-8">
          {stats.map((stat) => {
            const maxVal = stat.maxValue ?? 100;
            const percentage = Math.min((stat.value / maxVal) * 100, 100);

            return (
              <div key={stat.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium text-[var(--stats-bar-label-color,hsl(0_0%_20%))]">
                    {stat.label}
                  </span>
                  <span className="text-sm font-bold text-[var(--stats-bar-value-color,hsl(0_0%_9%))]">
                    {stat.displayValue ?? `${stat.value}`}
                  </span>
                </div>
                <div
                  className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--stats-bar-track-bg,hsl(0_0%_92%))]"
                  role="progressbar"
                  aria-valuenow={stat.value}
                  aria-valuemin={0}
                  aria-valuemax={maxVal}
                  aria-label={`${stat.label}: ${stat.displayValue ?? stat.value}`}
                >
                  <div
                    className={cn(
                      "h-full rounded-full",
                      "motion-reduce:transition-none"
                    )}
                    style={{
                      width: isVisible || prefersReducedMotion ? `${percentage}%` : "0%",
                      backgroundColor: stat.color ?? "var(--stats-bar-fill-color, hsl(220 80% 55%))",
                      transition: prefersReducedMotion
                        ? "none"
                        : `width ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
