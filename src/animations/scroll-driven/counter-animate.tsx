// @version 2.0.0
// @category animations
// @name counter-animate
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_DURATION_MS = 2000;
const INTERSECTION_THRESHOLD = 0.3;
const EASING_EXPONENT = 3; // cubic ease-out

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface CounterAnimateProps {
  /** Starting value */
  from?: number;
  /** Target value */
  to: number;
  /** Animation duration in ms */
  duration?: number;
  /** Text appended after number (e.g. "%", "+") */
  suffix?: string;
  /** Text prepended before number (e.g. "$", "~") */
  prefix?: string;
  /** Accessible label describing the counter */
  "aria-label"?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Scoped styles                                                     */
/* ------------------------------------------------------------------ */

const styles = `
@media (prefers-reduced-motion: reduce) {
  .ca-counter {
    /* Immediately show final value -- no animation */
    transition: none !important;
  }
}
`;

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function CounterAnimate({
  from = 0,
  to,
  duration = DEFAULT_DURATION_MS,
  suffix = "",
  prefix = "",
  "aria-label": ariaLabel,
  className,
}: CounterAnimateProps) {
  const [display, setDisplay] = useState(from);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  const animate = useCallback(() => {
    if (hasAnimated) return;
    setHasAnimated(true);

    if (prefersReducedMotion.current) {
      setDisplay(to);
      return;
    }

    const start = performance.now();
    const diff = to - from;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, EASING_EXPONENT);
      setDisplay(Math.round(from + diff * eased));

      if (progress < 1) {
        requestAnimationFrame(tick);
      }
    }

    requestAnimationFrame(tick);
  }, [from, to, duration, hasAnimated]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [animate]);

  const formattedValue = `${prefix}${display.toLocaleString()}${suffix}`;
  const finalValue = `${prefix}${to.toLocaleString()}${suffix}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <span
        ref={ref}
        className={cn("ca-counter tabular-nums", className)}
        role="status"
        aria-label={ariaLabel ?? `Counter: ${finalValue}`}
        aria-live="polite"
      >
        {formattedValue}
      </span>
    </>
  );
}
