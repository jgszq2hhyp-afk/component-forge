// @version 1.0.0
// @category stats
// @name StatsRadialProgress
// @source custom

'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_MAX = 100;
const SVG_SIZE = 120;
const STROKE_WIDTH = 10;
const RADIUS = (SVG_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const ANIMATION_DURATION_MS = 1200;
const ANIMATION_STEP_MS = 16;
const INTERSECTION_THRESHOLD = 0.3;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface StatItem {
  label: string;
  value: number;
  max?: number;
  suffix?: string;
}

interface StatsRadialProgressProps {
  stats: StatItem[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function RadialRing({ stat, isVisible }: { stat: StatItem; isVisible: boolean }) {
  const max = stat.max ?? DEFAULT_MAX;
  const percentage = Math.min(1, Math.max(0, stat.value / max));
  const [animatedValue, setAnimatedValue] = useState(0);
  const [animatedOffset, setAnimatedOffset] = useState(CIRCUMFERENCE);
  const prefersReducedMotion = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      prefersReducedMotion.current = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;
    }
  }, []);

  useEffect(() => {
    if (!isVisible) {
      setAnimatedValue(0);
      setAnimatedOffset(CIRCUMFERENCE);
      return;
    }

    const targetOffset = CIRCUMFERENCE * (1 - percentage);
    const targetValue = stat.value;

    /* Skip animation if user prefers reduced motion */
    if (prefersReducedMotion.current) {
      setAnimatedOffset(targetOffset);
      setAnimatedValue(targetValue);
      return;
    }

    let startTime: number | null = null;
    let rafId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / ANIMATION_DURATION_MS);

      /* Ease-out cubic */
      const eased = 1 - Math.pow(1 - progress, 3);

      setAnimatedOffset(CIRCUMFERENCE - eased * (CIRCUMFERENCE - targetOffset));
      setAnimatedValue(Math.round(eased * targetValue));

      if (progress < 1) {
        rafId = requestAnimationFrame(animate);
      }
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [isVisible, percentage, stat.value]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: SVG_SIZE, height: SVG_SIZE }}>
        <svg
          width={SVG_SIZE}
          height={SVG_SIZE}
          viewBox={`0 0 ${SVG_SIZE} ${SVG_SIZE}`}
          className="-rotate-90"
          role="img"
          aria-label={`${stat.label}: ${stat.value}${stat.suffix ?? ''} of ${max}${stat.suffix ?? ''}`}
        >
          {/* Background circle */}
          <circle
            cx={SVG_SIZE / 2}
            cy={SVG_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--muted)"
            strokeWidth={STROKE_WIDTH}
          />
          {/* Progress circle */}
          <circle
            cx={SVG_SIZE / 2}
            cy={SVG_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={animatedOffset}
          />
        </svg>
        {/* Center value */}
        <span
          className="absolute inset-0 flex items-center justify-center text-[clamp(1.25rem,2vw,1.75rem)] font-bold text-[var(--foreground)]"
          aria-hidden="true"
        >
          {animatedValue}
          {stat.suffix && (
            <span className="text-[0.6em] text-[var(--muted-foreground)]">{stat.suffix}</span>
          )}
        </span>
      </div>
      <span className="text-sm font-medium text-[var(--muted-foreground)]">
        {stat.label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function StatsRadialProgress({
  stats,
  className,
}: StatsRadialProgressProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: INTERSECTION_THRESHOLD },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={cn(
        'w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]',
        className,
      )}
      style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
    >
      <div
        className={cn(
          'mx-auto flex max-w-5xl flex-wrap items-start justify-center',
          'gap-[clamp(2rem,4vw,4rem)]',
        )}
      >
        {stats.map((stat) => (
          <RadialRing key={stat.label} stat={stat} isVisible={isVisible} />
        ))}
      </div>
    </section>
  );
}
