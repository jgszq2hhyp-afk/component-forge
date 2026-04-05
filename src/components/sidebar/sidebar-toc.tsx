// @version 1.0.0 // @category sidebar // @name sidebar-toc // @source custom

'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(0.875rem, 1vw + 0.5rem, 1.125rem)';
const TOC_MAX_WIDTH = '16rem';
const ITEM_FONT_SIZE = '0.8125rem';
const LEVEL_3_INDENT = '1rem';
const ACTIVE_BAR_WIDTH = '2px';
const SCROLL_OFFSET = 80;
const OBSERVER_ROOT_MARGIN = '-80px 0px -60% 0px';
const OBSERVER_THRESHOLD = 0;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface TocHeading {
  /** HTML id of the heading element */
  id: string;
  /** Display text */
  text: string;
  /** Heading level: h2 or h3 */
  level: 2 | 3;
}

interface SidebarTocProps {
  /** Array of heading entries to display */
  headings: TocHeading[];
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function SidebarToc({
  headings,
  className,
}: SidebarTocProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // ---- IntersectionObserver for active heading tracking ----
  const setupObserver = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Disconnect any existing observer
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    const headingElements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Find the first intersecting entry
        const intersecting = entries.find((entry) => entry.isIntersecting);
        if (intersecting?.target.id) {
          setActiveId(intersecting.target.id);
        }
      },
      {
        rootMargin: OBSERVER_ROOT_MARGIN,
        threshold: OBSERVER_THRESHOLD,
      },
    );

    headingElements.forEach((el) => {
      observerRef.current?.observe(el);
    });
  }, [headings]);

  useEffect(() => {
    setupObserver();

    return () => {
      observerRef.current?.disconnect();
    };
  }, [setupObserver]);

  // ---- Smooth scroll handler ----
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      event.preventDefault();
      const target = document.getElementById(id);
      if (!target) return;

      const top = target.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET;

      window.scrollTo({
        top,
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
          ? 'instant'
          : 'smooth',
      });

      setActiveId(id);

      // Update URL hash without jumping
      window.history.pushState(null, '', `#${id}`);
    },
    [],
  );

  if (headings.length === 0) return null;

  const navHeadingId = 'toc-nav-heading';

  return (
    <nav
      aria-label="Table of contents"
      aria-labelledby={navHeadingId}
      className={cn('sticky top-24', className)}
      style={{ maxWidth: TOC_MAX_WIDTH }}
    >
      <h3
        id={navHeadingId}
        className="mb-3 font-semibold tracking-tight"
        style={{
          fontSize: HEADING_CLAMP,
          color: 'var(--foreground)',
        }}
      >
        On this page
      </h3>

      <ul
        className="flex flex-col gap-0.5"
        role="list"
        style={{
          borderLeft: `1px solid var(--border)`,
        }}
      >
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          const isLevel3 = heading.level === 3;

          return (
            <li key={heading.id} className="relative">
              {/* Active indicator bar */}
              {isActive && (
                <div
                  className="absolute left-0 top-0 h-full motion-safe:transition-all motion-safe:duration-200"
                  style={{
                    width: ACTIVE_BAR_WIDTH,
                    backgroundColor: 'var(--primary, hsl(220 90% 56%))',
                    marginLeft: `-1px`, // overlap border
                  }}
                  aria-hidden="true"
                />
              )}

              <a
                href={`#${heading.id}`}
                onClick={(e) => handleClick(e, heading.id)}
                className={cn(
                  'block py-1.5 leading-snug',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
                  'motion-safe:transition-colors motion-safe:duration-150',
                )}
                style={{
                  fontSize: ITEM_FONT_SIZE,
                  paddingLeft: isLevel3 ? `calc(0.75rem + ${LEVEL_3_INDENT})` : '0.75rem',
                  color: isActive
                    ? 'var(--primary, hsl(220 90% 56%))'
                    : 'var(--muted-foreground)',
                  fontWeight: isActive ? 500 : 400,
                  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
                aria-current={isActive ? 'location' : undefined}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
