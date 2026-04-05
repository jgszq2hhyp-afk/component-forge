// @version 1.0.0
// @category animations
// @name number-ticker
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_DURATION = 2000;
const DEFAULT_DECIMALS = 0;
const DEFAULT_LOCALE = 'de-DE';
const OBSERVER_THRESHOLD = 0.3;

const RING_STYLE = {
  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NumberTickerProps {
  /** Target value to count up to */
  value: number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Text prefix (e.g. "$", "EUR ") */
  prefix?: string;
  /** Text suffix (e.g. "+", "%") */
  suffix?: string;
  /** Number of decimal places */
  decimals?: number;
  /** Locale for number formatting (Intl.NumberFormat) */
  locale?: string;
  /** Additional CSS classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Easing function (ease-out cubic)
// ---------------------------------------------------------------------------

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

// ---------------------------------------------------------------------------
// Format helper
// ---------------------------------------------------------------------------

function formatNumber(
  num: number,
  decimals: number,
  locale: string,
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

// ---------------------------------------------------------------------------
// Reduced motion hook
// ---------------------------------------------------------------------------

function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  return reduced;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function NumberTicker({
  value,
  duration = DEFAULT_DURATION,
  prefix = '',
  suffix = '',
  decimals = DEFAULT_DECIMALS,
  locale = DEFAULT_LOCALE,
  className,
}: NumberTickerProps) {
  const reducedMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const elementRef = useRef<HTMLSpanElement>(null);
  const rafRef = useRef<number | null>(null);

  const finalFormatted = formatNumber(value, decimals, locale);

  // Show final value immediately if reduced motion
  const shownValue = reducedMotion || hasAnimated
    ? finalFormatted
    : formatNumber(displayValue, decimals, locale);

  const animate = useCallback(() => {
    if (hasAnimated) return;

    const startTime = performance.now();

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = easedProgress * value;

      setDisplayValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplayValue(value);
        setHasAnimated(true);
      }
    };

    rafRef.current = requestAnimationFrame(step);
  }, [value, duration, hasAnimated]);

  // IntersectionObserver to trigger animation on viewport entry
  useEffect(() => {
    if (reducedMotion) {
      setHasAnimated(true);
      return;
    }

    const el = elementRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          animate();
          observer.disconnect();
        }
      },
      { threshold: OBSERVER_THRESHOLD },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [reducedMotion, hasAnimated, animate]);

  return (
    <span
      ref={elementRef}
      className={cn('tabular-nums', className)}
      aria-label={`${prefix}${finalFormatted}${suffix}`}
      role="status"
      style={{
        fontSize: 'clamp(1.5rem, 3vw, 4rem)',
        color: 'var(--foreground)',
        ...RING_STYLE,
      }}
    >
      <span aria-hidden="true">
        {prefix}
        {shownValue}
        {suffix}
      </span>
    </span>
  );
}

export default NumberTicker;
