// @version 1.0.0
// @category animations
// @name scroll-snap-gallery
// @source custom

'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SCROLL_DEBOUNCE_MS = 50;
const IMAGE_ASPECT_RATIO = '4/3';
const ARROW_SIZE = 40;
const DOT_SIZE = 10;
const DOT_SIZE_ACTIVE = 12;
const OVERLAY_GRADIENT = 'linear-gradient(to top, var(--background) 0%, transparent 100%)';

const RING_STYLE = {
  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
};

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface GalleryItem {
  imageSrc: string;
  imageAlt?: string;
  title?: string;
  description?: string;
}

interface ScrollSnapGalleryProps {
  /** Gallery items to display */
  items: GalleryItem[];
  /** Additional CSS classes on the wrapper */
  className?: string;
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
// Scoped CSS
// ---------------------------------------------------------------------------

const GALLERY_CSS = `
.snap-gallery-scroll {
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.snap-gallery-scroll::-webkit-scrollbar {
  display: none;
}
.snap-gallery-item {
  scroll-snap-align: start;
  flex-shrink: 0;
}
@media (prefers-reduced-motion: reduce) {
  .snap-gallery-scroll {
    scroll-behavior: auto !important;
  }
}`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ScrollSnapGallery({
  items,
  className,
}: ScrollSnapGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  const totalItems = items.length;

  // Track scroll position to update current index
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const scrollLeft = container.scrollLeft;
        const itemWidth = container.firstElementChild?.clientWidth ?? 1;
        const index = Math.round(scrollLeft / itemWidth);
        setCurrentIndex(Math.min(index, totalItems - 1));
      }, SCROLL_DEBOUNCE_MS);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [totalItems]);

  const scrollToIndex = useCallback(
    (index: number) => {
      const container = scrollRef.current;
      if (!container) return;

      const clamped = Math.max(0, Math.min(index, totalItems - 1));
      const itemWidth = container.firstElementChild?.clientWidth ?? 0;

      container.scrollTo({
        left: clamped * itemWidth,
        behavior: reducedMotion ? 'auto' : 'smooth',
      });
    },
    [totalItems, reducedMotion],
  );

  const goNext = useCallback(
    () => scrollToIndex(currentIndex + 1),
    [currentIndex, scrollToIndex],
  );

  const goPrev = useCallback(
    () => scrollToIndex(currentIndex - 1),
    [currentIndex, scrollToIndex],
  );

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    },
    [goNext, goPrev],
  );

  if (totalItems === 0) return null;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: GALLERY_CSS }} />

      <div
        role="region"
        aria-label="Image gallery"
        aria-roledescription="carousel"
        className={cn('relative w-full', className)}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        style={RING_STYLE}
      >
        {/* Scroll container */}
        <div
          ref={scrollRef}
          className="snap-gallery-scroll flex w-full gap-4 overflow-x-auto px-4"
          style={{
            scrollBehavior: reducedMotion ? 'auto' : 'smooth',
          }}
        >
          {items.map((item, i) => (
            <article
              key={`${item.imageSrc}-${i}`}
              className="snap-gallery-item relative w-[85vw] max-w-lg overflow-hidden rounded-xl sm:w-[70vw] md:w-[50vw]"
              role="group"
              aria-roledescription="slide"
              aria-label={`Slide ${i + 1} of ${totalItems}`}
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: IMAGE_ASPECT_RATIO }}
              >
                <Image
                  src={item.imageSrc}
                  alt={item.imageAlt ?? item.title ?? `Gallery image ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 85vw, (max-width: 768px) 70vw, 50vw"
                />
              </div>

              {/* Text overlay */}
              {(item.title ?? item.description) && (
                <div
                  className="absolute inset-x-0 bottom-0 p-4"
                  style={{
                    background: OVERLAY_GRADIENT,
                  }}
                >
                  {item.title && (
                    <h3
                      className="font-semibold"
                      style={{
                        color: 'var(--foreground)',
                        fontSize: 'clamp(0.875rem, 1.5vw, 1.25rem)',
                      }}
                    >
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p
                      className="mt-1"
                      style={{
                        color: 'var(--muted-foreground)',
                        fontSize: 'clamp(0.75rem, 1.2vw, 1rem)',
                      }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>

        {/* Navigation arrows (desktop only) */}
        {totalItems > 1 && (
          <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-2 md:flex">
            <button
              type="button"
              onClick={goPrev}
              disabled={currentIndex === 0}
              aria-label="Previous slide"
              className={cn(
                'pointer-events-auto flex items-center justify-center rounded-full transition-opacity',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                currentIndex === 0 ? 'opacity-0' : 'opacity-100',
              )}
              style={{
                width: `${ARROW_SIZE}px`,
                height: `${ARROW_SIZE}px`,
                backgroundColor: 'color-mix(in oklch, var(--background) 80%, transparent)',
                color: 'var(--foreground)',
                ...RING_STYLE,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M12.5 15L7.5 10L12.5 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={goNext}
              disabled={currentIndex === totalItems - 1}
              aria-label="Next slide"
              className={cn(
                'pointer-events-auto flex items-center justify-center rounded-full transition-opacity',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                currentIndex === totalItems - 1 ? 'opacity-0' : 'opacity-100',
              )}
              style={{
                width: `${ARROW_SIZE}px`,
                height: `${ARROW_SIZE}px`,
                backgroundColor: 'color-mix(in oklch, var(--background) 80%, transparent)',
                color: 'var(--foreground)',
                ...RING_STYLE,
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M7.5 5L12.5 10L7.5 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Dot indicators */}
        {totalItems > 1 && (
          <nav
            className="mt-4 flex items-center justify-center gap-2"
            aria-label="Gallery navigation"
          >
            {items.map((_, i) => (
              <button
                key={`dot-${i}`}
                type="button"
                onClick={() => scrollToIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === currentIndex ? 'true' : undefined}
                className={cn(
                  'rounded-full transition-all',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                )}
                style={{
                  width: `${i === currentIndex ? DOT_SIZE_ACTIVE : DOT_SIZE}px`,
                  height: `${i === currentIndex ? DOT_SIZE_ACTIVE : DOT_SIZE}px`,
                  backgroundColor:
                    i === currentIndex
                      ? 'var(--primary)'
                      : 'color-mix(in oklch, var(--foreground) 25%, transparent)',
                  ...RING_STYLE,
                }}
              />
            ))}
          </nav>
        )}
      </div>
    </>
  );
}

export default ScrollSnapGallery;
