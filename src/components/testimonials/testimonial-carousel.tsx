// @version 1.0.0
// @category testimonials
// @name testimonial-carousel
// @source self-authored

'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
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
    from { opacity: 0; }
    to   { opacity: 1; }
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

  const current = testimonials[activeIndex];
  if (!current) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        className={cn(
          'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <div className="text-center mb-12 lg:mb-16">
            {headline && (
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
                style={{ color: 'var(--foreground)' }}
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

        {/* Carousel card */}
        <div
          className="relative rounded-2xl border p-8 lg:p-12"
          style={{
            backgroundColor: 'var(--card)',
            borderColor: 'var(--border)',
          }}
        >
          <div
            key={activeIndex}
            className="flex flex-col items-center text-center"
            style={{
              animation: 'carousel-slide-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both',
            }}
          >
            <span style={{ color: 'var(--primary)' }}>
              <QuoteIcon />
            </span>

            <blockquote
              className="mt-6 text-lg lg:text-xl leading-relaxed max-w-2xl"
              style={{ color: 'var(--card-foreground)' }}
            >
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center gap-4">
              {current.avatarSrc && (
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={current.avatarSrc}
                    alt={current.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="text-left">
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
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            onClick={goPrev}
            aria-label="Vorherige Bewertung"
            className={cn(
              'inline-flex items-center justify-center w-10 h-10 rounded-full border',
              'transition-colors duration-200',
              'hover:opacity-80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            )}
            style={{
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
              backgroundColor: 'var(--card)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            <ChevronLeft />
          </button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goTo(index)}
                aria-label={`Bewertung ${index + 1}`}
                className={cn(
                  'w-2 h-2 rounded-full transition-all duration-300',
                  index === activeIndex ? 'w-6' : '',
                )}
                style={{
                  backgroundColor:
                    index === activeIndex
                      ? 'var(--primary)'
                      : 'var(--border)',
                }}
              />
            ))}
          </div>

          <button
            onClick={goNext}
            aria-label="Nächste Bewertung"
            className={cn(
              'inline-flex items-center justify-center w-10 h-10 rounded-full border',
              'transition-colors duration-200',
              'hover:opacity-80',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            )}
            style={{
              borderColor: 'var(--border)',
              color: 'var(--foreground)',
              backgroundColor: 'var(--card)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            <ChevronRight />
          </button>
        </div>
      </section>
    </>
  );
}
