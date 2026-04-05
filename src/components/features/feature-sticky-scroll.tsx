"use client"

// @version 2.0.0
// @category features
// @name feature-sticky-scroll
// @source custom

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const HEADER_MAX_WIDTH = 'max-w-2xl';
const SECTION_PADDING_Y = 'py-16 sm:py-20 lg:py-24';
const SECTION_PADDING_X = 'px-4 sm:px-6 lg:px-8';
const HEADER_MARGIN_BOTTOM = 'mb-14 lg:mb-20';
const HEADING_CLAMP = 'clamp(1.875rem, 1.5rem + 1.5vw, 3rem)';
const SUBHEADING_FONT_SIZE = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const TITLE_CLAMP = 'clamp(1.5rem, 1.25rem + 1vw, 1.875rem)';
const STAT_CLAMP = 'clamp(2.25rem, 2rem + 1.5vw, 3rem)';
const GRID_COLUMNS = 'grid-cols-1 lg:grid-cols-12';
const NAV_COLUMN_SPAN = 'lg:col-span-4';
const CONTENT_COLUMN_SPAN = 'lg:col-span-8';
const NAV_STICKY_TOP = 'lg:top-24';
const ICON_SIZE_SM = 'w-9 h-9';
const ICON_SIZE_LG = 'w-12 h-12';
const ICON_RADIUS = 'rounded-xl';
const ICON_RADIUS_SM = 'rounded-lg';
const CONTENT_SPACING = 'space-y-16 lg:space-y-32';
const INTERSECTION_ROOT_MARGIN = '-40% 0px -40% 0px';
const IMAGE_ASPECT_RATIO = 'aspect-[16/9]';
const EAGER_LOAD_THRESHOLD = 2;
const INACTIVE_OPACITY = 'lg:opacity-40';
const ACTIVE_OPACITY = 'opacity-100';
const NAV_BUTTON_PADDING = 'p-4';
const NAV_BUTTON_RADIUS = 'rounded-xl';
const NAV_SPACING = 'space-y-2';
const INDICATOR_BAR_HEIGHT = 'h-0.5';
const CONTENT_CARD_PADDING = 'p-6 lg:p-10';
const CONTENT_CARD_RADIUS = 'rounded-2xl';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StickyScrollItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
  imageSrc?: string;
  imageAlt?: string;
  stat?: string;
}

interface FeatureStickyScrollProps {
  headline?: string;
  subheadline?: string;
  items: StickyScrollItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes sticky-fade-in {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes sticky-fade-in {
    from { opacity: 1; }
    to   { opacity: 1; }
  }

  .sticky-content-panel {
    transition: none !important;
    animation: none !important;
    opacity: 1 !important;
    transform: none !important;
  }

  .sticky-nav-button {
    transition: none !important;
  }

  .sticky-indicator-bar {
    transition: none !important;
  }

  .sticky-icon-box {
    transition: none !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FeatureStickyScroll({
  headline,
  subheadline,
  items,
  className,
}: FeatureStickyScrollProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveIndex(index);
            }
          });
        },
        {
          rootMargin: INTERSECTION_ROOT_MARGIN,
          threshold: 0,
        },
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, [items.length]);

  const handleNavKeyDown = (e: React.KeyboardEvent, index: number) => {
    let nextIndex: number | null = null;

    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      nextIndex = (index + 1) % items.length;
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      nextIndex = (index - 1 + items.length) % items.length;
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = items.length - 1;
    }

    if (nextIndex !== null) {
      const target = sectionRefs.current[nextIndex];
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      // Focus the button at that index
      const buttons = (e.currentTarget as HTMLElement)
        .closest('nav')
        ?.querySelectorAll<HTMLButtonElement>('button');
      buttons?.[nextIndex]?.focus();
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'Features'}
        className={cn(
          SECTION_MAX_WIDTH,
          'mx-auto',
          SECTION_PADDING_X,
          SECTION_PADDING_Y,
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <header className={cn(HEADER_MAX_WIDTH, 'mx-auto text-center', HEADER_MARGIN_BOTTOM)}>
            {headline && (
              <h2
                className="font-bold tracking-tight"
                style={{
                  color: 'var(--foreground)',
                  fontSize: HEADING_CLAMP,
                }}
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className="mt-4 leading-relaxed"
                style={{
                  color: 'var(--muted-foreground)',
                  fontSize: SUBHEADING_FONT_SIZE,
                }}
              >
                {subheadline}
              </p>
            )}
          </header>
        )}

        {/* Two-column layout */}
        <div className={cn('grid', GRID_COLUMNS, 'gap-8 lg:gap-12')}>
          {/* Left: Sticky nav (desktop) / stacked list (mobile) */}
          <div className={NAV_COLUMN_SPAN}>
            <nav
              className={cn('lg:sticky', NAV_STICKY_TOP, NAV_SPACING)}
              aria-label="Feature navigation"
            >
              {items.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    const target = sectionRefs.current[index];
                    if (target) {
                      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }}
                  onKeyDown={(e) => handleNavKeyDown(e, index)}
                  className={cn(
                    'sticky-nav-button w-full text-left border transition-all duration-300',
                    'motion-reduce:transition-none',
                    NAV_BUTTON_PADDING,
                    NAV_BUTTON_RADIUS,
                    FOCUS_RING,
                    index === activeIndex
                      ? 'shadow-md'
                      : 'hover:shadow-sm',
                  )}
                  style={{
                    backgroundColor: index === activeIndex ? 'var(--card)' : 'transparent',
                    borderColor: index === activeIndex ? 'var(--primary)' : 'var(--border)',
                    ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                  }}
                  aria-current={index === activeIndex ? 'true' : undefined}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && (
                      <div
                        className={cn(
                          'sticky-icon-box inline-flex items-center justify-center flex-shrink-0 transition-colors duration-300',
                          ICON_SIZE_SM,
                          ICON_RADIUS_SM,
                        )}
                        style={{
                          backgroundColor: index === activeIndex
                            ? 'var(--primary)'
                            : 'var(--accent)',
                          color: index === activeIndex
                            ? 'var(--primary-foreground)'
                            : 'var(--accent-foreground)',
                        }}
                        aria-hidden="true"
                      >
                        {item.icon}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3
                        className="text-sm font-semibold tracking-tight truncate"
                        style={{
                          color: index === activeIndex
                            ? 'var(--foreground)'
                            : 'var(--muted-foreground)',
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Active indicator bar */}
                  <div
                    className={cn(
                      'sticky-indicator-bar mt-3 rounded-full transition-all duration-300',
                      INDICATOR_BAR_HEIGHT,
                      index === activeIndex ? 'w-full' : 'w-0',
                    )}
                    style={{ backgroundColor: 'var(--primary)' }}
                    aria-hidden="true"
                  />
                </button>
              ))}
            </nav>
          </div>

          {/* Right: Scrolling content sections */}
          <div className={cn(CONTENT_COLUMN_SPAN, CONTENT_SPACING)}>
            {items.map((item, index) => (
              <article
                key={index}
                ref={(el) => { sectionRefs.current[index] = el; }}
                className={cn(
                  'sticky-content-panel',
                  'border transition-opacity duration-500',
                  CONTENT_CARD_RADIUS,
                  CONTENT_CARD_PADDING,
                  index === activeIndex ? ACTIVE_OPACITY : INACTIVE_OPACITY,
                )}
                style={{
                  backgroundColor: 'var(--card)',
                  borderColor: 'var(--border)',
                }}
              >
                {/* Icon + Title */}
                <div className="flex items-center gap-4 mb-4">
                  {item.icon && (
                    <div
                      className={cn(
                        'inline-flex items-center justify-center flex-shrink-0',
                        ICON_SIZE_LG,
                        ICON_RADIUS,
                      )}
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                      }}
                      aria-hidden="true"
                    >
                      {item.icon}
                    </div>
                  )}
                  <h3
                    className="font-bold tracking-tight"
                    style={{
                      color: 'var(--card-foreground)',
                      fontSize: TITLE_CLAMP,
                    }}
                  >
                    {item.title}
                  </h3>
                </div>

                {item.stat && (
                  <p
                    className="font-extrabold tracking-tight mb-3"
                    style={{
                      color: 'var(--primary)',
                      fontSize: STAT_CLAMP,
                    }}
                  >
                    {item.stat}
                  </p>
                )}

                <p
                  className="text-base lg:text-lg leading-relaxed max-w-2xl"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {item.description}
                </p>

                {/* Optional screenshot */}
                {item.imageSrc && (
                  <figure
                    className={cn(
                      'relative mt-6 rounded-xl overflow-hidden border',
                      IMAGE_ASPECT_RATIO,
                    )}
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt ?? item.title}
                      fill
                      className="object-cover"
                      loading={index < EAGER_LOAD_THRESHOLD ? 'eager' : 'lazy'}
                    />
                  </figure>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
