"use client"

// @version 2.0.0
// @category heroes
// @name hero-with-carousel
// @score 92
// @source https://www.shadcnblocks.com/blocks/hero, https://www.hover.dev/components/heros

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HERO_MIN_HEIGHT = '85vh';
const CONTENT_MAX_WIDTH = '48rem';
const SUBHEADLINE_MAX_WIDTH = '36rem';
const HEADING_CLAMP = 'clamp(2.5rem, 5vw + 1rem, 4.5rem)';
const SUBHEADLINE_CLAMP = 'clamp(1.125rem, 1vw + 0.75rem, 1.25rem)';
const TRANSITION_LOCK_MS = 600;
const OVERLAY_MIX_PERCENT = '55%';
const NAV_BUTTON_SIZE = '2.5rem';
const NAV_BUTTON_BG_MIX = '40%';
const DOT_ACTIVE_WIDTH = '2rem';
const DOT_INACTIVE_WIDTH = '1rem';
const DOT_HEIGHT = '0.25rem';
const DOT_BG_MIX = '30%';
const ANIMATION_DURATION = '0.6s';
const ANIMATION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const DELAY_SUBHEADLINE = '0.15s';
const DELAY_CTA = '0.3s';
const IMAGE_TRANSITION_MS = 700;
const ARROW_SIZE = 16;
const ARROW_STROKE_WIDTH = 1.5;
const DEFAULT_AUTOPLAY_MS = 5000;
const CTA_FONT_SIZE = '0.9375rem';
const ACTIVE_SCALE = '0.98';
const DOT_WIDTH_TRANSITION_MS = '300ms';
const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CarouselSlide {
  imageSrc: string;
  imageAlt: string;
  headline: string;
  subheadline?: string;
}

interface HeroWithCarouselProps {
  slides: CarouselSlide[];
  ctaText?: string;
  ctaHref?: string;
  autoPlayInterval?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hwc-fade-in {
  from {
    opacity: 0;
    filter: blur(4px);
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
}

@keyframes hwc-progress {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hwc-fade-in {
    from, to { opacity: 1; transform: none; filter: none; }
  }
  @keyframes hwc-progress {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroWithCarousel({
  slides,
  ctaText,
  ctaHref = '#',
  autoPlayInterval = DEFAULT_AUTOPLAY_MS,
  className,
}: HeroWithCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const sectionRef = useRef<HTMLElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), TRANSITION_LOCK_MS);
    },
    [current, isTransitioning],
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goTo]);

  useEffect(() => {
    if (autoPlayInterval <= 0) return;
    timerRef.current = setTimeout(goNext, autoPlayInterval);
    return () => clearTimeout(timerRef.current);
  }, [current, autoPlayInterval, goNext]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
    }

    section.addEventListener('keydown', handleKeyDown);
    return () => section.removeEventListener('keydown', handleKeyDown);
  }, [goNext, goPrev]);

  const slide = slides[current];
  if (!slide) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        ref={sectionRef}
        aria-label="Hero carousel"
        aria-roledescription="carousel"
        role="region"
        tabIndex={0}
        className={cn(
          'relative flex items-center overflow-hidden',
          FOCUS_RING,
          className,
        )}
        style={{
          minHeight: HERO_MIN_HEIGHT,
          backgroundColor: 'var(--background)',
          ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
        }}
      >
        {/* Background images */}
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              opacity: i === current ? 1 : 0,
              transitionProperty: 'opacity',
              transitionDuration: `${IMAGE_TRANSITION_MS}ms`,
            }}
            aria-hidden={i !== current}
          >
            <Image
              src={s.imageSrc}
              alt={s.imageAlt}
              fill
              sizes="100vw"
              className="object-cover"
              priority={i === 0}
            />
          </div>
        ))}

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `color-mix(in srgb, var(--background) ${OVERLAY_MIX_PERCENT}, transparent)`,
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <article
          className="relative z-10 w-full px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36"
          aria-live="polite"
          aria-atomic="true"
        >
          <div style={{ maxWidth: CONTENT_MAX_WIDTH }}>
            <h1
              key={`headline-${current}`}
              className="font-bold tracking-tight leading-[1.08]"
              style={{
                fontSize: HEADING_CLAMP,
                color: 'var(--foreground)',
                animation: `hwc-fade-in ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
              }}
            >
              {slide.headline}
            </h1>

            {slide.subheadline && (
              <p
                key={`sub-${current}`}
                className="mt-5 md:mt-6 leading-relaxed"
                style={{
                  fontSize: SUBHEADLINE_CLAMP,
                  maxWidth: SUBHEADLINE_MAX_WIDTH,
                  color: 'var(--muted-foreground)',
                  animation: `hwc-fade-in ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                  animationDelay: DELAY_SUBHEADLINE,
                }}
              >
                {slide.subheadline}
              </p>
            )}

            {ctaText && (
              <div
                className="mt-8 md:mt-10"
                style={{
                  animation: `hwc-fade-in ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                  animationDelay: DELAY_CTA,
                }}
              >
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
              </div>
            )}
          </div>
        </article>

        {/* Navigation arrows */}
        <nav
          aria-label="Carousel navigation"
          className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 flex items-center gap-2"
        >
          <button
            onClick={goPrev}
            type="button"
            className={cn(
              'flex items-center justify-center rounded-full',
              'backdrop-blur-md transition-colors duration-200 motion-reduce:transition-none',
              FOCUS_RING,
            )}
            style={{
              width: NAV_BUTTON_SIZE,
              height: NAV_BUTTON_SIZE,
              backgroundColor: `color-mix(in srgb, var(--background) ${NAV_BUTTON_BG_MIX}, transparent)`,
              color: 'var(--foreground)',
              ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
            }}
            aria-label="Previous slide"
          >
            <svg width={ARROW_SIZE} height={ARROW_SIZE} viewBox={`0 0 ${ARROW_SIZE} ${ARROW_SIZE}`} fill="none" aria-hidden="true">
              <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth={ARROW_STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={goNext}
            type="button"
            className={cn(
              'flex items-center justify-center rounded-full',
              'backdrop-blur-md transition-colors duration-200 motion-reduce:transition-none',
              FOCUS_RING,
            )}
            style={{
              width: NAV_BUTTON_SIZE,
              height: NAV_BUTTON_SIZE,
              backgroundColor: `color-mix(in srgb, var(--background) ${NAV_BUTTON_BG_MIX}, transparent)`,
              color: 'var(--foreground)',
              ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
            }}
            aria-label="Next slide"
          >
            <svg width={ARROW_SIZE} height={ARROW_SIZE} viewBox={`0 0 ${ARROW_SIZE} ${ARROW_SIZE}`} fill="none" aria-hidden="true">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth={ARROW_STROKE_WIDTH} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </nav>

        {/* Dot indicators with progress */}
        <div
          className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 flex items-center gap-2"
          role="tablist"
          aria-label="Slide indicators"
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              onClick={() => goTo(i)}
              className={cn('relative rounded-full overflow-hidden', FOCUS_RING)}
              style={{
                height: DOT_HEIGHT,
                width: i === current ? DOT_ACTIVE_WIDTH : DOT_INACTIVE_WIDTH,
                backgroundColor: `color-mix(in srgb, var(--foreground) ${DOT_BG_MIX}, transparent)`,
                transitionProperty: 'width',
                transitionDuration: DOT_WIDTH_TRANSITION_MS,
                ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
              }}
              aria-label={`Go to slide ${i + 1}`}
              aria-selected={i === current}
              tabIndex={i === current ? 0 : -1}
            >
              {i === current && (
                <div
                  className="absolute inset-0 origin-left rounded-full"
                  style={{
                    backgroundColor: 'var(--primary)',
                    animation: `hwc-progress ${autoPlayInterval}ms linear`,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
