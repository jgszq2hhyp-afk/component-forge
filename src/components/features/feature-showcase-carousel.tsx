// @version 2.0.0
// @category features
// @name feature-showcase-carousel
// @source custom

'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const SECTION_PADDING_Y = 'py-16 sm:py-20 lg:py-24';
const SECTION_PADDING_X = 'px-4 sm:px-6 lg:px-8';
const HEADER_MAX_WIDTH = 'max-w-2xl';
const HEADER_MARGIN_BOTTOM = 'mb-12 lg:mb-16';
const DEFAULT_AUTO_ADVANCE_MS = 5000;
const ICON_SIZE = 'w-12 h-12';
const ICON_RADIUS = 'rounded-xl';
const ICON_PLACEHOLDER_SIZE = 'w-16 h-16';
const NAV_BUTTON_SIZE = 'w-10 h-10';
const DOT_HEIGHT = 'h-2';
const DOT_ACTIVE_WIDTH = 'w-8';
const DOT_INACTIVE_WIDTH = 'w-2';
const IMAGE_ASPECT_RATIO = 'aspect-[4/3]';
const PROGRESS_BAR_HEIGHT = 'h-0.5';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

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
    from { opacity: 1; }
    to   { opacity: 1; }
  }

  @keyframes showcase-fade-in {
    from { opacity: 1; }
    to   { opacity: 1; }
  }

  .showcase-image,
  .showcase-detail,
  .showcase-progress-fill {
    transition: none !important;
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
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
  autoAdvanceMs = DEFAULT_AUTO_ADVANCE_MS,
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo((activeIndex - 1 + items.length) % items.length);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo((activeIndex + 1) % items.length);
    } else if (e.key === 'Home') {
      e.preventDefault();
      goTo(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      goTo(items.length - 1);
    }
  };

  const current = items[activeIndex];
  if (!current) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'Feature showcase'}
        aria-roledescription="carousel"
        className={cn(
          SECTION_MAX_WIDTH,
          'mx-auto',
          SECTION_PADDING_X,
          SECTION_PADDING_Y,
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsPaused(false);
          }
        }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <header className={cn(HEADER_MAX_WIDTH, 'mx-auto text-center', HEADER_MARGIN_BOTTOM)}>
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
          </header>
        )}

        {/* Carousel Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image Side */}
          <figure
            className={cn(
              'relative rounded-2xl overflow-hidden border',
              IMAGE_ASPECT_RATIO,
            )}
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--muted)' }}
            aria-label={`Image for ${current.title}`}
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
                  <div className={cn(ICON_PLACEHOLDER_SIZE, 'opacity-40')} aria-hidden="true">
                    {current.icon}
                  </div>
                )}
              </div>
            )}
          </figure>

          {/* Details Side */}
          <div className="flex flex-col">
            {/* Active Feature Detail */}
            <div
              key={activeIndex}
              className="showcase-detail"
              style={{ animation: 'showcase-slide-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both' }}
              aria-live="polite"
              aria-atomic="true"
            >
              {current.icon && (
                <div
                  className={cn(
                    'inline-flex items-center justify-center mb-4',
                    ICON_SIZE,
                    ICON_RADIUS,
                  )}
                  style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-foreground)' }}
                  aria-hidden="true"
                >
                  {current.icon}
                </div>
              )}

              {current.stat && (
                <p
                  className="font-extrabold tracking-tight mb-2"
                  style={{
                    color: 'var(--primary)',
                    fontSize: 'clamp(2.25rem, 2rem + 1.5vw, 3rem)',
                  }}
                >
                  {current.stat}
                </p>
              )}

              <h3
                className="font-bold tracking-tight"
                style={{
                  color: 'var(--foreground)',
                  fontSize: 'clamp(1.5rem, 1.25rem + 1vw, 1.875rem)',
                }}
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
            <div
              className="mt-8 flex items-center gap-3"
              role="tablist"
              aria-label="Feature slides"
              onKeyDown={handleKeyDown}
            >
              {items.map((item, index) => (
                <button
                  key={index}
                  role="tab"
                  tabIndex={index === activeIndex ? 0 : -1}
                  aria-selected={index === activeIndex}
                  aria-label={`Show feature: ${item.title}`}
                  onClick={() => goTo(index)}
                  className={cn(
                    'relative rounded-full transition-all duration-300',
                    FOCUS_RING,
                    DOT_HEIGHT,
                    index === activeIndex ? DOT_ACTIVE_WIDTH : DOT_INACTIVE_WIDTH,
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
                    'inline-flex items-center justify-center rounded-full border',
                    'transition-colors duration-200',
                    FOCUS_RING,
                    NAV_BUTTON_SIZE,
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
                    'inline-flex items-center justify-center rounded-full border',
                    'transition-colors duration-200',
                    FOCUS_RING,
                    NAV_BUTTON_SIZE,
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
              className={cn('mt-4 rounded-full overflow-hidden', PROGRESS_BAR_HEIGHT)}
              style={{ backgroundColor: 'var(--border)' }}
              role="progressbar"
              aria-valuenow={activeIndex + 1}
              aria-valuemin={1}
              aria-valuemax={items.length}
              aria-label={`Feature ${activeIndex + 1} of ${items.length}`}
            >
              <div
                className={cn('showcase-progress-fill h-full rounded-full')}
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
