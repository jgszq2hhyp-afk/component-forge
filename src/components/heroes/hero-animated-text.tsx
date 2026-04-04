// @version 1.0.0
// @category heroes
// @name hero-animated-text
// @source self-authored

'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState, useCallback } from 'react';

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
// Component ('use client' — text rotation with interval)
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
  intervalMs = 2500,
  className,
}: HeroAnimatedTextProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const next = useCallback(() => {
    setIsAnimating(true);
    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % rotatingWords.length);
      setIsAnimating(false);
    }, 300);
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
    <section
      className={cn(
        'relative flex min-h-[80vh] flex-col items-center justify-center',
        'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
        'text-center',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Keyframes */}
      <style>{`
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
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes hero-word-exit {
            from { opacity: 1; }
            to { opacity: 0; }
          }
        }
      `}</style>

      <h1
        className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        style={{ color: 'var(--foreground)' }}
      >
        {headlineBefore && <span>{headlineBefore} </span>}

        <span
          className="relative inline-block overflow-hidden align-bottom"
          style={{ minWidth: '2ch' }}
        >
          <span
            key={currentIndex}
            className="inline-block"
            style={{
              color: 'var(--primary)',
              animation: isAnimating
                ? 'hero-word-exit 0.3s ease-in forwards'
                : 'hero-word-enter 0.3s ease-out forwards',
            }}
          >
            {rotatingWords[currentIndex]}
          </span>
        </span>

        {headlineAfter && <span> {headlineAfter}</span>}
      </h1>

      {subheadline && (
        <p
          className="mt-6 max-w-2xl text-lg leading-relaxed md:text-xl"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {subheadline}
        </p>
      )}

      {(ctaText || secondaryCtaText) && (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {ctaText && (
            <a
              href={ctaHref}
              className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                '--tw-ring-color': 'var(--ring)',
              } as React.CSSProperties}
            >
              {ctaText}
            </a>
          )}

          {secondaryCtaText && (
            <a
              href={secondaryCtaHref}
              className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition-colors focus-visible:ring-2 focus-visible:outline-none"
              style={{
                border: '1px solid var(--border)',
                color: 'var(--foreground)',
                '--tw-ring-color': 'var(--ring)',
              } as React.CSSProperties}
            >
              {secondaryCtaText}
            </a>
          )}
        </div>
      )}
    </section>
  );
}
