// @version 1.0.0
// @category heroes
// @name hero-with-carousel
// @source https://www.shadcnblocks.com/blocks/hero, https://www.hover.dev/components/heros

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useCallback, useEffect, useRef, useState } from 'react';

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
    from { opacity: 0; }
    to   { opacity: 1; }
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
  autoPlayInterval = 5000,
  className,
}: HeroWithCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning || index === current) return;
      setIsTransitioning(true);
      setCurrent(index);
      setTimeout(() => setIsTransitioning(false), 600);
    },
    [current, isTransitioning],
  );

  const goNext = useCallback(() => {
    goTo((current + 1) % slides.length);
  }, [current, slides.length, goTo]);

  const goPrev = useCallback(() => {
    goTo((current - 1 + slides.length) % slides.length);
  }, [current, slides.length, goTo]);

  // Auto-play
  useEffect(() => {
    if (autoPlayInterval <= 0) return;
    timerRef.current = setTimeout(goNext, autoPlayInterval);
    return () => clearTimeout(timerRef.current);
  }, [current, autoPlayInterval, goNext]);

  const slide = slides[current];
  if (!slide) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        className={cn(
          'relative min-h-[85vh] flex items-center overflow-hidden',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
        aria-roledescription="carousel"
        aria-label="Hero carousel"
      >
        {/* Background image */}
        {slides.map((s, i) => (
          <div
            key={i}
            className={cn(
              'absolute inset-0 transition-opacity duration-700',
              i === current ? 'opacity-100' : 'opacity-0',
            )}
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
            backgroundColor: 'color-mix(in srgb, var(--background) 55%, transparent)',
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 w-full px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36">
          <div className="max-w-3xl">
            <h1
              key={`headline-${current}`}
              className="font-bold tracking-tight leading-[1.08]"
              style={{
                fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)',
                color: 'var(--foreground)',
                animation: 'hwc-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
              }}
            >
              {slide.headline}
            </h1>

            {slide.subheadline && (
              <p
                key={`sub-${current}`}
                className="mt-5 md:mt-6 text-lg md:text-xl leading-relaxed max-w-xl"
                style={{
                  color: 'var(--muted-foreground)',
                  animation: 'hwc-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: '0.15s',
                }}
              >
                {slide.subheadline}
              </p>
            )}

            {ctaText && (
              <div
                className="mt-8 md:mt-10"
                style={{
                  animation: 'hwc-fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: '0.3s',
                }}
              >
                <a
                  href={ctaHref}
                  className={cn(
                    'inline-flex items-center justify-center',
                    'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
                    'transition-all duration-200',
                    'hover:brightness-110 hover:shadow-lg',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'active:scale-[0.98]',
                  )}
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    ['--tw-ring-color' as string]: 'var(--primary)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {ctaText}
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Navigation arrows */}
        <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 flex items-center gap-2">
          <button
            onClick={goPrev}
            className={cn(
              'flex items-center justify-center size-10 rounded-full',
              'backdrop-blur-md transition-all duration-200',
              'hover:scale-110',
              'focus-visible:outline-none focus-visible:ring-2',
            )}
            style={{
              backgroundColor: 'color-mix(in srgb, var(--background) 40%, transparent)',
              color: 'var(--foreground)',
              ['--tw-ring-color' as string]: 'var(--primary)',
            }}
            aria-label="Previous slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M10 4l-4 4 4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={goNext}
            className={cn(
              'flex items-center justify-center size-10 rounded-full',
              'backdrop-blur-md transition-all duration-200',
              'hover:scale-110',
              'focus-visible:outline-none focus-visible:ring-2',
            )}
            style={{
              backgroundColor: 'color-mix(in srgb, var(--background) 40%, transparent)',
              color: 'var(--foreground)',
              ['--tw-ring-color' as string]: 'var(--primary)',
            }}
            aria-label="Next slide"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Dot indicators with progress */}
        <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 z-10 flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={cn(
                'relative h-1 rounded-full overflow-hidden transition-all duration-300',
                i === current ? 'w-8' : 'w-4',
              )}
              style={{
                backgroundColor: 'color-mix(in srgb, var(--foreground) 30%, transparent)',
              }}
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current ? 'true' : undefined}
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
