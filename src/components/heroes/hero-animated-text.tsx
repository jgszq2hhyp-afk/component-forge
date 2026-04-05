"use client"

// @version 2.0.0
// @category heroes
// @name hero-animated-text
// @source self-authored

'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState, useCallback } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WORD_TRANSITION_DURATION = 300;
const DEFAULT_INTERVAL_MS = 2500;
const HEADING_CLAMP = 'clamp(2.25rem, 5vw + 1rem, 4.5rem)';
const SUBHEADLINE_CLAMP = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)';
const CTA_FONT_SIZE = '0.9375rem';
const ACTIVE_SCALE = '0.98';
const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroAnimatedTextProps {
  headlineBefore?: string;
  rotatingWords: string[];
  headlineAfter?: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  intervalMs?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframes
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hero-word-enter {
  from { opacity: 0; transform: translateY(100%); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes hero-word-exit {
  from { opacity: 1; transform: translateY(0); }
  to { opacity: 0; transform: translateY(-100%); }
}
@media (prefers-reduced-motion: reduce) {
  @keyframes hero-word-enter {
    from, to { opacity: 1; transform: none; }
  }
  @keyframes hero-word-exit {
    from, to { opacity: 0; transform: none; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroAnimatedText({
  headlineBefore = 'We build',
  rotatingWords,
  headlineAfter,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  intervalMs = DEFAULT_INTERVAL_MS,
  className,
}: HeroAnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = useCallback(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingWords.length);
      setIsAnimating(false);
    }, WORD_TRANSITION_DURATION);
    return () => clearTimeout(timeout);
  }, [rotatingWords.length]);

  useEffect(() => {
    if (rotatingWords.length <= 1) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const interval = setInterval(next, intervalMs);
    return () => clearInterval(interval);
  }, [next, intervalMs, rotatingWords.length]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label="Animated text hero"
        className={cn(
          'relative flex min-h-[80vh] flex-col items-center justify-center',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          'text-center',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        <header className="max-w-5xl">
          <h1
            className="font-bold tracking-tight"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            {headlineBefore && <span>{headlineBefore} </span>}

            <span
              className="relative inline-block overflow-hidden align-bottom"
              style={{ minWidth: '2ch' }}
              aria-live="polite"
              aria-atomic="true"
            >
              <span
                key={currentIndex}
                className="inline-block"
                style={{
                  color: 'var(--primary)',
                  animation: isAnimating
                    ? `hero-word-exit ${WORD_TRANSITION_DURATION}ms ease-in forwards`
                    : `hero-word-enter ${WORD_TRANSITION_DURATION}ms ease-out forwards`,
                }}
              >
                {rotatingWords[currentIndex]}
              </span>
            </span>

            {headlineAfter && <span> {headlineAfter}</span>}
          </h1>

          {subheadline && (
            <p
              className="mt-6 max-w-2xl mx-auto leading-relaxed"
              style={{
                fontSize: SUBHEADLINE_CLAMP,
                color: 'var(--muted-foreground)',
              }}
            >
              {subheadline}
            </p>
          )}
        </header>

        {(ctaText || secondaryCtaText) && (
          <nav aria-label="Call to action" className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {ctaText && (
              <a
                href={ctaHref}
                className={cn(
                  'inline-flex items-center justify-center',
                  `rounded-lg px-7 py-3.5 text-[${CTA_FONT_SIZE}] font-semibold`,
                  'transition-all duration-200 motion-reduce:transition-none',
                  'hover:brightness-110 hover:shadow-lg',
                  FOCUS_RING,
                  `active:scale-[${ACTIVE_SCALE}] motion-reduce:active:scale-100`,
                )}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                {ctaText}
              </a>
            )}

            {secondaryCtaText && (
              <a
                href={secondaryCtaHref}
                className={cn(
                  'inline-flex items-center justify-center',
                  `rounded-lg px-7 py-3.5 text-[${CTA_FONT_SIZE}] font-semibold`,
                  'border transition-all duration-200 motion-reduce:transition-none',
                  'hover:brightness-110',
                  FOCUS_RING,
                  `active:scale-[${ACTIVE_SCALE}] motion-reduce:active:scale-100`,
                )}
                style={{
                  color: 'var(--foreground)',
                  borderColor: 'color-mix(in srgb, var(--foreground) 20%, transparent)',
                  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                {secondaryCtaText}
              </a>
            )}
          </nav>
        )}
      </section>
    </>
  );
}
