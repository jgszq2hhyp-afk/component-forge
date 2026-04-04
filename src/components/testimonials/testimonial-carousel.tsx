// @version 2.0.0
// @category testimonials
// @name testimonial-carousel
// @source self-authored

'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SLIDE_ANIMATION_DURATION = '0.4s';
const SLIDE_ANIMATION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const DOT_ACTIVE_WIDTH = '1.5rem';
const DOT_INACTIVE_SIZE = '0.5rem';
const NAV_BUTTON_SIZE = '2.5rem';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
  /** Unique identifier for stable rendering */
  id?: string;
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
}

interface TestimonialCarouselProps {
  headline?: string;
  subheadline?: string;
  testimonials: Testimonial[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes carousel-slide-in {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes carousel-slide-in {
    from { opacity: 0; transform: none; }
    to   { opacity: 1; transform: none; }
  }

  .tc-carousel-card {
    animation-duration: 0.01ms !important;
  }

  .tc-dot-indicator {
    transition: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Arrow icons
// ---------------------------------------------------------------------------

function ChevronLeft() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M12 15L7 10L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M8 5L13 10L8 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Quote icon
// ---------------------------------------------------------------------------

function QuoteIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className="opacity-20"
    >
      <path
        d="M10.5 25.5C10.5 22.5 12 19.5 15 17L17 19C15 21 14.5 22.5 14.5 24H18V30H10.5V25.5ZM22.5 25.5C22.5 22.5 24 19.5 27 17L29 19C27 21 26.5 22.5 26.5 24H30V30H22.5V25.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TestimonialCarousel({
  headline,
  subheadline,
  testimonials,
  autoPlay = false,
  autoPlayInterval = 5000,
  className,
}: TestimonialCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      setActiveIndex((index + testimonials.length) % testimonials.length);
    },
    [testimonials.length],
  );

  const goNext = useCallback(() => goTo(activeIndex + 1), [activeIndex, goTo]);
  const goPrev = useCallback(() => goTo(activeIndex - 1), [activeIndex, goTo]);

  // Auto-play
  useEffect(() => {
    if (!autoPlay) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    intervalRef.current = setInterval(goNext, autoPlayInterval);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [autoPlay, autoPlayInterval, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          goPrev();
          break;
        case 'ArrowRight':
          e.preventDefault();
          goNext();
          break;
        case 'Home':
          e.preventDefault();
          goTo(0);
          break;
        case 'End':
          e.preventDefault();
          goTo(testimonials.length - 1);
          break;
      }
    }

    el.addEventListener('keydown', handleKeyDown);
    return () => el.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev, goTo, testimonials.length]);

  const current = testimonials[activeIndex];
  if (!current) return null;

  const stableKey = current.id ?? `${current.name}-${activeIndex}`;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label="Customer testimonials"
        className={cn(
          'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <header className="text-center mb-12 lg:mb-16">
            {headline && (
              <h2
                className="font-bold tracking-tight"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3rem)',
                  color: 'var(--foreground)',
                }}
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className="mt-4 leading-relaxed"
                style={{
                  fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
                  color: 'var(--muted-foreground)',
                }}
              >
                {subheadline}
              </p>
            )}
          </header>
        )}

        {/* Carousel card */}
        <div
          ref={carouselRef}
          role="region"
          aria-roledescription="carousel"
          aria-label={`Testimonial ${activeIndex + 1} of ${testimonials.length}`}
          tabIndex={0}
          className={cn(
            'relative rounded-2xl border p-8 lg:p-12',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          )}
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
            ['--tw-ring-color' as string]: 'var(--ring, var(--primary))',
            ['--tw-ring-offset-color' as string]: 'var(--background)',
          }}
        >
          <div
            key={stableKey}
            role="group"
            aria-roledescription="slide"
            aria-label={`Testimonial from ${current.name}`}
            className="tc-carousel-card flex flex-col items-center text-center"
            style={{
              animation: `carousel-slide-in ${SLIDE_ANIMATION_DURATION} ${SLIDE_ANIMATION_EASING} both`,
            }}
          >
            <span style={{ color: 'var(--primary)' }}>
              <QuoteIcon />
            </span>

            <blockquote
              className="mt-6 leading-relaxed max-w-2xl"
              style={{
                fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.25rem)',
                color: 'var(--card-foreground)',
              }}
            >
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <figure className="mt-8 flex items-center gap-4">
              {current.avatarSrc && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={current.avatarSrc}
                    alt={`Photo of ${current.name}`}
                    fill
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              )}
              <figcaption className="text-left">
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  {current.name}
                </p>
                {(current.role || current.company) && (
                  <p
                    className="text-xs"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {[current.role, current.company].filter(Boolean).join(' · ')}
                  </p>
                )}
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Controls */}
        <nav
          aria-label="Testimonial navigation"
          className="mt-8 flex items-center justify-center gap-4"
        >
          <button
            onClick={goPrev}
            aria-label="Previous testimonial"
            className={cn(
              'inline-flex items-center justify-center rounded-full border',
              'transition-colors duration-200',
              'hover:opacity-80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            )}
            style={{
              width: NAV_BUTTON_SIZE,
              height: NAV_BUTTON_SIZE,
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
              backgroundColor: 'var(--card)',
              ['--tw-ring-color' as string]: 'var(--ring, var(--primary))',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            <ChevronLeft />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2" role="tablist" aria-label="Select testimonial">
            {testimonials.map((t, index) => (
              <button
                key={t.id ?? `dot-${t.name}-${index}`}
                role="tab"
                aria-selected={index === activeIndex}
                onClick={() => goTo(index)}
                aria-label={`Testimonial ${index + 1} of ${testimonials.length}`}
                className={cn(
                  'tc-dot-indicator rounded-full transition-all duration-300',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                )}
                style={{
                  width: index === activeIndex ? DOT_ACTIVE_WIDTH : DOT_INACTIVE_SIZE,
                  height: DOT_INACTIVE_SIZE,
                  backgroundColor:
                    index === activeIndex
                      ? 'var(--primary)'
                      : 'var(--border)',
                  ['--tw-ring-color' as string]: 'var(--ring, var(--primary))',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Next testimonial"
            className={cn(
              'inline-flex items-center justify-center rounded-full border',
              'transition-colors duration-200',
              'hover:opacity-80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            )}
            style={{
              width: NAV_BUTTON_SIZE,
              height: NAV_BUTTON_SIZE,
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
              backgroundColor: 'var(--card)',
              ['--tw-ring-color' as string]: 'var(--ring, var(--primary))',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            <ChevronRight />
          </button>
        </nav>
      </section>
    </>
  );
}
