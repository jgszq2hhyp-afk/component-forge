// @version 1.0.0
// @category features
// @name feature-showcase-carousel
// @source custom

'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ShowcaseItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  stat?: string;
}

interface FeatureShowcaseCarouselProps {
  headline?: string;
  subheadline?: string;
  items: ShowcaseItem[];
  autoAdvanceMs?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes showcase-slide-in {
  from {
    opacity: 0;
    transform: translateX(24px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes showcase-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes showcase-slide-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .showcase-image {
    transition: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureShowcaseCarousel({
  headline,
  subheadline,
  items,
  autoAdvanceMs = 5000,
  className,
}: FeatureShowcaseCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  useEffect(() => {
    if (isPaused || items.length <= 1) return;
    timerRef.current = setInterval(advance, autoAdvanceMs);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [advance, autoAdvanceMs, isPaused, items.length]);

  const goTo = (index: number) => {
    setActiveIndex(index);
    // Reset the timer when manually navigating
    if (timerRef.current) clearInterval(timerRef.current);
    if (!isPaused) {
      timerRef.current = setInterval(advance, autoAdvanceMs);
    }
  };

  const current = items[activeIndex];
  if (!current) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'Feature showcase'}
        className={cn(
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
            {headline && (
              <h2
                className="font-bold tracking-tight"
                style={{
                  color: 'var(--foreground)',
                  fontSize: 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)',
                }}
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className="mt-4 text-lg leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {subheadline}
              </p>
            )}
          </div>
        )}

        {/* Carousel Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Side */}
          <div
            className="relative aspect-[4/3] rounded-2xl overflow-hidden border"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}
          >
            {current.imageSrc ? (
              <Image
                key={activeIndex}
                src={current.imageSrc}
                alt={current.imageAlt ?? current.title}
                fill
                className="showcase-image object-cover"
                style={{ animation: 'showcase-fade-in 0.4s ease-out both' }}
                priority={activeIndex === 0}
              />
            ) : (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {current.icon && (
                  <div className="w-16 h-16 opacity-40">{current.icon}</div>
                )}
              </div>
            )}
          </div>

          {/* Details Side */}
          <div className="flex flex-col">
            {/* Active Feature Detail */}
            <div
              key={activeIndex}
              style={{ animation: 'showcase-slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both' }}
            >
              {current.icon && (
                <div
                  className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                >
                  {current.icon}
                </div>
              )}

              {current.stat && (
                <p
                  className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-2"
                  style={{ color: 'var(--primary)' }}
                >
                  {current.stat}
                </p>
              )}

              <h3
                className="text-2xl lg:text-3xl font-bold tracking-tight"
                style={{ color: 'var(--foreground)' }}
              >
                {current.title}
              </h3>

              <p
                className="mt-3 text-base lg:text-lg leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {current.description}
              </p>
            </div>

            {/* Navigation Dots & Buttons */}
            <div className="mt-8 flex items-center gap-3" role="tablist" aria-label="Feature slides">
              {items.map((item, index) => (
                <button
                  key={index}
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`Show feature: ${item.title}`}
                  onClick={() => goTo(index)}
                  className={cn(
                    'relative h-2 rounded-full transition-all duration-300',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    index === activeIndex ? 'w-8' : 'w-2',
                  )}
                  style={{
                    backgroundColor: index === activeIndex
                      ? 'var(--primary)'
                      : 'var(--border)',
                    '--tw-ring-color': 'var(--ring, hsl(215 20% 65%))',
                  } as React.CSSProperties}
                />
              ))}

              <div className="ml-auto flex gap-2">
                <button
                  onClick={() => goTo((activeIndex - 1 + items.length) % items.length)}
                  aria-label="Previous feature"
                  className={cn(
                    'inline-flex items-center justify-center w-10 h-10 rounded-full border',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  )}
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)',
                    backgroundColor: 'var(--card)',
                    '--tw-ring-color': 'var(--ring, hsl(215 20% 65%))',
                  } as React.CSSProperties}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button
                  onClick={() => goTo((activeIndex + 1) % items.length)}
                  aria-label="Next feature"
                  className={cn(
                    'inline-flex items-center justify-center w-10 h-10 rounded-full border',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  )}
                  style={{
                    borderColor: 'var(--border)',
                    color: 'var(--foreground)',
                    backgroundColor: 'var(--card)',
                    '--tw-ring-color': 'var(--ring, hsl(215 20% 65%))',
                  } as React.CSSProperties}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div
              className="mt-4 h-0.5 rounded-full overflow-hidden"
              style={{ backgroundColor: 'var(--border)' }}
              aria-hidden="true"
            >
              <div
                className="h-full rounded-full"
                style={{
                  backgroundColor: 'var(--primary)',
                  width: `${((activeIndex + 1) / items.length) * 100}%`,
                  transition: 'width 0.3s ease-out',
                }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
