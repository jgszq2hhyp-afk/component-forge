"use client"

// @version 1.0.0
// @category blog
// @name blog-table-of-contents
// @source custom

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const ROOT_MARGIN = '-80px 0px -60% 0px' as const;
const THRESHOLD = 0 as const;
const HEADING_INDENT: Record<2 | 3, string> = {
  2: 'pl-0',
  3: 'pl-4',
} as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface Heading {
  /** DOM id of the heading element */
  id: string;
  /** Display text */
  text: string;
  /** Heading level, h2 or h3 */
  level: 2 | 3;
}

interface BlogTableOfContentsProps {
  /** Ordered list of headings to track */
  headings: Heading[];
  /** Additional class names */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BlogTableOfContents({
  headings,
  className,
}: BlogTableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  /* Scroll-spy via IntersectionObserver */
  const setupObserver = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Disconnect any previous observer
    observerRef.current?.disconnect();

    const callback: IntersectionObserverCallback = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      }
    };

    observerRef.current = new IntersectionObserver(callback, {
      rootMargin: ROOT_MARGIN,
      threshold: THRESHOLD,
    });

    for (const heading of headings) {
      const el = document.getElementById(heading.id);
      if (el) {
        observerRef.current.observe(el);
      }
    }
  }, [headings]);

  useEffect(() => {
    setupObserver();
    return () => {
      observerRef.current?.disconnect();
    };
  }, [setupObserver]);

  /* Set initial active heading if none is set */
  useEffect(() => {
    if (!activeId && headings.length > 0) {
      setActiveId(headings[0].id);
    }
  }, [activeId, headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Inhaltsverzeichnis"
      className={cn(
        'rounded-xl border border-[var(--color-border,hsl(0_0%_88%))]',
        'bg-[var(--color-surface,hsl(0_0%_100%))]',
        'p-5',
        className,
      )}
    >
      <h2
        className="mb-3 font-semibold tracking-tight text-[var(--color-text,hsl(0_0%_8%))]"
        style={{ fontSize: 'clamp(0.875rem, 0.8rem + 0.3vw, 1.0625rem)' }}
      >
        Inhaltsverzeichnis
      </h2>

      <ul className="flex flex-col gap-1" role="list">
        {headings.map((heading) => {
          const isActive = heading.id === activeId;

          return (
            <li key={heading.id} className={HEADING_INDENT[heading.level]}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? 'location' : undefined}
                className={cn(
                  'block rounded-md px-3 py-1.5 text-sm leading-snug',
                  'motion-safe:transition-colors motion-safe:duration-200',
                  'motion-reduce:transition-none',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring,hsl(220_70%_55%))] focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-[var(--color-primary-light,hsl(220_80%_96%))] font-medium text-[var(--color-primary,hsl(220_70%_50%))]'
                    : 'text-[var(--color-text-muted,hsl(0_0%_40%))] hover:text-[var(--color-text,hsl(0_0%_10%))] hover:bg-[var(--color-muted,hsl(0_0%_96%))]',
                )}
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
