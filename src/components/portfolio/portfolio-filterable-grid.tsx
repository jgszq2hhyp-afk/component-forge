// @version 1.0.0
// @category portfolio
// @name Portfolio Filterable Grid
// @source custom

'use client';

import { useState, useMemo, useCallback, useRef } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = 'clamp(1.75rem, 4vw, 2.5rem)';
const GRID_GAP = 'gap-4 sm:gap-6';
const SECTION_PADDING = 'py-16 sm:py-24';
const MAX_WIDTH = 'max-w-7xl';
const ALL_LABEL = 'All';
const IMAGE_OVERLAY_GRADIENT =
  'linear-gradient(to top, var(--overlay-from, hsl(0 0% 0% / 0.75)) 0%, var(--overlay-to, transparent) 60%)';
const FILTER_ANIMATION_DURATION_MS = 300;
const FILTER_SCALE_FROM = 0.95;
const FILTER_SCALE_TO = 1;
const TITLE_CLAMP = 'clamp(0.875rem, 1.5vw, 1.125rem)';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface FilterableProject {
  title: string;
  category: string;
  imageSrc: string;
  imageAlt?: string;
  href?: string;
}

interface PortfolioFilterableGridProps {
  headline?: string;
  projects: FilterableProject[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function PortfolioFilterableGrid({
  headline = 'Our Work',
  projects,
  className,
}: PortfolioFilterableGridProps) {
  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);
  const tabsRef = useRef<HTMLDivElement>(null);

  /* ---- Derive categories from projects ---- */
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(projects.map((p) => p.category))
    );
    return [ALL_LABEL, ...uniqueCategories];
  }, [projects]);

  /* ---- Filtered items ---- */
  const filteredProjects = useMemo(() => {
    if (activeCategory === ALL_LABEL) return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  /* ---- Arrow key navigation for tabs ---- */
  const handleTabKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const tabs = tabsRef.current?.querySelectorAll<HTMLButtonElement>(
        '[role="tab"]'
      );
      if (!tabs) return;

      let nextIndex: number | null = null;

      if (event.key === 'ArrowRight') {
        nextIndex = index < tabs.length - 1 ? index + 1 : 0;
      } else if (event.key === 'ArrowLeft') {
        nextIndex = index > 0 ? index - 1 : tabs.length - 1;
      } else if (event.key === 'Home') {
        nextIndex = 0;
      } else if (event.key === 'End') {
        nextIndex = tabs.length - 1;
      }

      if (nextIndex !== null) {
        event.preventDefault();
        tabs[nextIndex].focus();
        setActiveCategory(categories[nextIndex]);
      }
    },
    [categories]
  );

  return (
    <section
      className={cn(
        SECTION_PADDING,
        'bg-[var(--background,hsl(0_0%_100%))]',
        className
      )}
      aria-labelledby={headline ? 'filterable-grid-heading' : undefined}
    >
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', MAX_WIDTH)}>
        {/* Header */}
        {headline && (
          <header className="mb-10 text-center">
            <h2
              id="filterable-grid-heading"
              className="font-bold tracking-tight text-[var(--foreground,hsl(0_0%_9%))]"
              style={{ fontSize: HEADING_CLAMP }}
            >
              {headline}
            </h2>
          </header>
        )}

        {/* Filter tabs */}
        <div
          ref={tabsRef}
          role="tablist"
          aria-label="Filter projects by category"
          className="mb-10 flex flex-wrap justify-center gap-2"
        >
          {categories.map((category, index) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                role="tab"
                aria-selected={isActive}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveCategory(category)}
                onKeyDown={(e) => handleTabKeyDown(e, index)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm font-medium',
                  'transition-colors duration-200',
                  'motion-reduce:!transition-none',
                  FOCUS_RING,
                  isActive
                    ? 'bg-[var(--primary,hsl(220_90%_56%))] text-[var(--primary-foreground,hsl(0_0%_100%))] shadow-sm'
                    : cn(
                        'bg-[var(--muted,hsl(0_0%_0%/0.05))]',
                        'text-[var(--muted-foreground,hsl(0_0%_40%))]',
                        'hover:bg-[var(--muted-hover,hsl(0_0%_0%/0.1))]',
                        'hover:text-[var(--foreground,hsl(0_0%_9%))]'
                      )
                )}
                style={{
                  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                }}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div
          role="tabpanel"
          aria-live="polite"
          className={cn(
            'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4',
            GRID_GAP
          )}
        >
          {filteredProjects.map((project, index) => {
            const CardWrapper = project.href ? 'a' : 'div';
            const wrapperProps = project.href
              ? { href: project.href }
              : {};

            return (
              <CardWrapper
                key={`${project.title}-${index}`}
                {...wrapperProps}
                className={cn(
                  'group relative overflow-hidden rounded-xl',
                  'aspect-[3/4]',
                  'bg-[var(--muted,hsl(0_0%_96%))]',
                  /* Filter animation */
                  'animate-[filter-in_var(--filter-duration)_ease-out_both]',
                  'motion-reduce:!animate-none',
                  project.href && FOCUS_RING
                )}
                style={{
                  ['--filter-duration' as string]: `${FILTER_ANIMATION_DURATION_MS}ms`,
                  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <Image
                  src={project.imageSrc}
                  alt={project.imageAlt ?? project.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className={cn(
                    'object-cover',
                    'transition-transform duration-500',
                    'group-hover:scale-105',
                    'motion-reduce:!scale-100 motion-reduce:!transition-none'
                  )}
                />

                {/* Title overlay */}
                <div
                  className={cn(
                    'absolute inset-x-0 bottom-0 p-4',
                    'flex flex-col justify-end'
                  )}
                  style={{ backgroundImage: IMAGE_OVERLAY_GRADIENT }}
                  aria-hidden="true"
                >
                  <p
                    className="font-semibold text-[var(--primary-foreground,hsl(0_0%_100%))]"
                    style={{ fontSize: TITLE_CLAMP }}
                  >
                    {project.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[hsl(0_0%_100%/0.7)]">
                    {project.category}
                  </p>
                </div>

                {/* Accessible title for non-link cards */}
                {!project.href && (
                  <span className="sr-only">{project.title}</span>
                )}
              </CardWrapper>
            );
          })}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="py-16 text-center" role="status">
            <p className="text-sm text-[var(--muted-foreground,hsl(0_0%_40%))]">
              No projects found in this category.
            </p>
          </div>
        )}
      </div>

      {/* Filter animation keyframes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes filter-in {
              from {
                opacity: 0;
                transform: scale(${FILTER_SCALE_FROM});
              }
              to {
                opacity: 1;
                transform: scale(${FILTER_SCALE_TO});
              }
            }
            @media (prefers-reduced-motion: reduce) {
              @keyframes filter-in {
                from { opacity: 1; transform: none; }
                to { opacity: 1; transform: none; }
              }
            }
          `,
        }}
      />
    </section>
  );
}
