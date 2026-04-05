// @version 1.0.0
// @category heroes
// @name hero-scrollytelling
// @description Scroll-driven narrative hero with sticky text and progress indicators

'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import {
  useEffect,
  useRef,
  useState,
  useCallback,
  type KeyboardEvent as ReactKeyboardEvent,
} from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const INTERSECTION_THRESHOLD = 0.5;
const TRANSITION_DURATION_MS = 500;
const TRANSITION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const INDICATOR_SIZE_PX = 12;
const INDICATOR_ACTIVE_SCALE = 1.5;
const SCROLL_MARGIN_PX = 80;
const MIN_SECTION_HEIGHT_VH = 80;
const CONTENT_TRANSLATE_Y_PX = 24;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ScrollytellingSection {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  backgroundColor?: string;
}

interface HeroScrollytellingProps {
  /** Ordered list of narrative sections */
  sections: ScrollytellingSection[];
  /** Additional CSS classes on the root element */
  className?: string;
}

// ---------------------------------------------------------------------------
// Styles (injected via <style>)
// ---------------------------------------------------------------------------

const SCROLLYTELLING_CSS = `
.scrollytelling-section-text {
  opacity: 0;
  transform: translateY(${CONTENT_TRANSLATE_Y_PX}px);
  transition: opacity ${TRANSITION_DURATION_MS}ms ${TRANSITION_EASING},
              transform ${TRANSITION_DURATION_MS}ms ${TRANSITION_EASING};
}

.scrollytelling-section-text[data-active="true"] {
  opacity: 1;
  transform: translateY(0);
}

.scrollytelling-indicator {
  width: ${INDICATOR_SIZE_PX}px;
  height: ${INDICATOR_SIZE_PX}px;
  border-radius: 50%;
  border: 2px solid var(--muted-foreground);
  background: transparent;
  transition: transform ${TRANSITION_DURATION_MS}ms ${TRANSITION_EASING},
              background-color ${TRANSITION_DURATION_MS}ms ${TRANSITION_EASING},
              border-color ${TRANSITION_DURATION_MS}ms ${TRANSITION_EASING};
  cursor: pointer;
}

.scrollytelling-indicator[data-active="true"] {
  background-color: var(--primary);
  border-color: var(--primary);
  transform: scale(${INDICATOR_ACTIVE_SCALE});
}

.scrollytelling-indicator:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px var(--background), 0 0 0 4px var(--ring, var(--primary));
}

.scrollytelling-panel-image {
  opacity: 0;
  transition: opacity ${TRANSITION_DURATION_MS}ms ${TRANSITION_EASING};
}

.scrollytelling-panel-image[data-visible="true"] {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .scrollytelling-section-text {
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }

  .scrollytelling-indicator {
    transition: none !important;
  }

  .scrollytelling-panel-image {
    transition: none !important;
    opacity: 1 !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroScrollytelling({
  sections,
  className,
}: HeroScrollytellingProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Map<string, HTMLElement>>(new Map());
  const prefersReducedMotion = useRef(false);

  /** Callback ref that stores elements keyed by data-section-index */
  const setPanelRef = useCallback(
    (el: HTMLElement | null, index: number, variant: 'desktop' | 'mobile') => {
      const key = `${variant}-${index}`;
      if (el) {
        panelRefs.current.set(key, el);
      } else {
        panelRefs.current.delete(key);
      }
    },
    [],
  );

  // -----------------------------------------------------------------------
  // Detect reduced motion preference
  // -----------------------------------------------------------------------
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      prefersReducedMotion.current = e.matches;
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // -----------------------------------------------------------------------
  // IntersectionObserver for scroll-driven section detection
  // -----------------------------------------------------------------------
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.sectionIndex,
            );
            if (!Number.isNaN(idx)) {
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        threshold: INTERSECTION_THRESHOLD,
        rootMargin: `-${SCROLL_MARGIN_PX}px 0px -${SCROLL_MARGIN_PX}px 0px`,
      },
    );

    panelRefs.current.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [sections.length]);

  // -----------------------------------------------------------------------
  // Keyboard navigation
  // -----------------------------------------------------------------------
  const navigateToSection = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, sections.length - 1));
      // Prefer desktop panels, fall back to mobile
      const target =
        panelRefs.current.get(`desktop-${clamped}`) ??
        panelRefs.current.get(`mobile-${clamped}`);
      if (target) {
        target.scrollIntoView({
          behavior: prefersReducedMotion.current ? 'auto' : 'smooth',
          block: 'center',
        });
        setActiveIndex(clamped);
      }
    },
    [sections.length],
  );

  const handleKeyDown = useCallback(
    (e: ReactKeyboardEvent<HTMLElement>) => {
      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          navigateToSection(activeIndex + 1);
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          navigateToSection(activeIndex - 1);
          break;
        case 'Home':
          e.preventDefault();
          navigateToSection(0);
          break;
        case 'End':
          e.preventDefault();
          navigateToSection(sections.length - 1);
          break;
      }
    },
    [activeIndex, navigateToSection, sections.length],
  );

  const handleIndicatorClick = useCallback(
    (index: number) => {
      navigateToSection(index);
    },
    [navigateToSection],
  );

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------
  const activeSection = sections[activeIndex];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: SCROLLYTELLING_CSS }} />

      <section
        ref={containerRef}
        className={cn('relative', className)}
        aria-label="Scrollytelling narrative"
        role="region"
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* ---- Desktop: side-by-side layout ---- */}
        <div className="hidden md:flex">
          {/* Left: sticky text area */}
          <div
            className="sticky top-0 flex h-screen w-1/2 flex-col justify-center px-8 lg:px-16"
            style={{
              backgroundColor: activeSection?.backgroundColor
                ? activeSection.backgroundColor
                : 'var(--background)',
              transition: `background-color ${TRANSITION_DURATION_MS}ms ${TRANSITION_EASING}`,
            }}
          >
            {sections.map((section, i) => (
              <div
                key={`text-${i}`}
                className={cn(
                  'scrollytelling-section-text absolute inset-x-8 lg:inset-x-16',
                )}
                data-active={i === activeIndex}
                aria-hidden={i !== activeIndex}
              >
                <p
                  className="mb-3 font-medium uppercase tracking-widest"
                  style={{
                    fontSize: 'clamp(0.75rem, 0.5vw + 0.625rem, 0.875rem)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
                </p>
                <h2
                  className="font-bold leading-tight tracking-tight"
                  style={{
                    fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3.5rem)',
                    color: 'var(--foreground)',
                  }}
                >
                  {section.title}
                </h2>
                <p
                  className="mt-4 max-w-lg leading-relaxed"
                  style={{
                    fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.25rem)',
                    color: 'var(--muted-foreground)',
                  }}
                >
                  {section.description}
                </p>
              </div>
            ))}
          </div>

          {/* Right: scrollable image/content panels */}
          <div className="w-1/2" role="list" aria-label="Narrative sections">
            {sections.map((section, i) => (
              <article
                key={`panel-${i}`}
                data-section-index={i}
                ref={(el) => setPanelRef(el, i, 'desktop')}
                className="flex items-center justify-center px-8 lg:px-16"
                style={{
                  minHeight: `${MIN_SECTION_HEIGHT_VH}vh`,
                }}
                role="listitem"
                aria-label={section.title}
              >
                {section.imageSrc ? (
                  <div
                    className="scrollytelling-panel-image relative aspect-[4/3] w-full overflow-hidden rounded-2xl"
                    data-visible={i === activeIndex}
                    style={{
                      boxShadow: '0 8px 32px color-mix(in oklch, var(--foreground) 10%, transparent)',
                    }}
                  >
                    <Image
                      src={section.imageSrc}
                      alt={section.imageAlt ?? section.title}
                      fill
                      sizes="50vw"
                      className="object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                ) : (
                  <div
                    className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl"
                    style={{
                      backgroundColor: 'color-mix(in oklch, var(--muted) 50%, var(--background) 50%)',
                    }}
                  >
                    <p
                      className="text-center font-semibold"
                      style={{
                        fontSize: 'clamp(1.5rem, 2vw + 0.5rem, 2.5rem)',
                        color: 'var(--muted-foreground)',
                      }}
                    >
                      {section.title}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>

          {/* Progress indicators (desktop right edge) */}
          <nav
            className="fixed right-6 top-1/2 z-20 flex -translate-y-1/2 flex-col gap-4"
            aria-label="Section navigation"
            role="tablist"
          >
            {sections.map((section, i) => (
              <button
                key={`indicator-${i}`}
                type="button"
                className="scrollytelling-indicator"
                data-active={i === activeIndex}
                onClick={() => handleIndicatorClick(i)}
                aria-label={`Go to section ${i + 1}: ${section.title}`}
                aria-selected={i === activeIndex}
                role="tab"
              />
            ))}
          </nav>
        </div>

        {/* ---- Mobile: stacked layout ---- */}
        <div className="md:hidden">
          {/* Mobile progress indicators */}
          <nav
            className="sticky top-4 z-20 flex justify-center gap-3 pb-4"
            aria-label="Section navigation"
            role="tablist"
          >
            {sections.map((section, i) => (
              <button
                key={`m-indicator-${i}`}
                type="button"
                className="scrollytelling-indicator"
                data-active={i === activeIndex}
                onClick={() => handleIndicatorClick(i)}
                aria-label={`Go to section ${i + 1}: ${section.title}`}
                aria-selected={i === activeIndex}
                role="tab"
              />
            ))}
          </nav>

          {/* Stacked sections */}
          <div role="list" aria-label="Narrative sections">
            {sections.map((section, i) => (
              <article
                key={`m-panel-${i}`}
                data-section-index={i}
                ref={(el) => setPanelRef(el, i, 'mobile')}
                className="flex flex-col gap-6 px-6 py-12"
                style={{
                  minHeight: `${MIN_SECTION_HEIGHT_VH}vh`,
                  backgroundColor: section.backgroundColor ?? 'var(--background)',
                }}
                role="listitem"
                aria-label={section.title}
              >
                <div>
                  <p
                    className="mb-2 font-medium uppercase tracking-widest"
                    style={{
                      fontSize: 'clamp(0.75rem, 0.5vw + 0.625rem, 0.875rem)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')} / {String(sections.length).padStart(2, '0')}
                  </p>
                  <h2
                    className="font-bold leading-tight tracking-tight"
                    style={{
                      fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.5rem)',
                      color: 'var(--foreground)',
                    }}
                  >
                    {section.title}
                  </h2>
                  <p
                    className="mt-3 leading-relaxed"
                    style={{
                      fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
                      color: 'var(--muted-foreground)',
                    }}
                  >
                    {section.description}
                  </p>
                </div>

                {section.imageSrc && (
                  <div
                    className="relative aspect-[4/3] w-full overflow-hidden rounded-xl"
                    style={{
                      boxShadow: '0 4px 20px color-mix(in oklch, var(--foreground) 8%, transparent)',
                    }}
                  >
                    <Image
                      src={section.imageSrc}
                      alt={section.imageAlt ?? section.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
