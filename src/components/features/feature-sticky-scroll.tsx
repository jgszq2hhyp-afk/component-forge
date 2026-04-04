// @version 1.0.0
// @category features
// @name feature-sticky-scroll
// @source custom

'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  .sticky-content-panel {
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
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          rootMargin: '-40% 0px -40% 0px',
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

  const activeItem = items[activeIndex];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'Features'}
        className={cn(
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <div className="max-w-2xl mx-auto text-center mb-14 lg:mb-20">
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

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left: Sticky nav (desktop) / stacked list (mobile) */}
          <div className="lg:col-span-4">
            <nav
              className="lg:sticky lg:top-24 space-y-2"
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
                  className={cn(
                    'w-full text-left p-4 rounded-xl border transition-all duration-300',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    index === activeIndex
                      ? 'shadow-md'
                      : 'hover:shadow-sm',
                  )}
                  style={{
                    backgroundColor: index === activeIndex ? 'var(--card)' : 'transparent',
                    borderColor: index === activeIndex ? 'var(--primary)' : 'var(--border)',
                    '--tw-ring-color': 'var(--ring, hsl(215 20% 65%))',
                  } as React.CSSProperties}
                  aria-current={index === activeIndex ? 'true' : undefined}
                >
                  <div className="flex items-center gap-3">
                    {item.icon && (
                      <div
                        className="inline-flex items-center justify-center w-9 h-9 rounded-lg flex-shrink-0 transition-colors duration-300"
                        style={{
                          backgroundColor: index === activeIndex
                            ? 'var(--primary)'
                            : 'var(--accent)',
                          color: index === activeIndex
                            ? 'var(--primary-foreground)'
                            : 'var(--accent-foreground)',
                        }}
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
                      'mt-3 h-0.5 rounded-full transition-all duration-300',
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
          <div className="lg:col-span-8 space-y-16 lg:space-y-32">
            {items.map((item, index) => (
              <div
                key={index}
                ref={(el) => { sectionRefs.current[index] = el; }}
                className={cn(
                  'sticky-content-panel',
                  'rounded-2xl border p-6 lg:p-10 transition-opacity duration-500',
                  index === activeIndex ? 'opacity-100' : 'lg:opacity-40',
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
                      className="inline-flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0"
                      style={{
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                      }}
                    >
                      {item.icon}
                    </div>
                  )}
                  <h3
                    className="text-2xl lg:text-3xl font-bold tracking-tight"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    {item.title}
                  </h3>
                </div>

                {item.stat && (
                  <p
                    className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-3"
                    style={{ color: 'var(--primary)' }}
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
                  <div
                    className="relative mt-6 aspect-[16/9] rounded-xl overflow-hidden border"
                    style={{ borderColor: 'var(--border)' }}
                  >
                    <Image
                      src={item.imageSrc}
                      alt={item.imageAlt ?? item.title}
                      fill
                      className="object-cover"
                      loading={index < 2 ? 'eager' : 'lazy'}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
