"use client"

// @version 1.0.0
// @category breadcrumbs
// @name breadcrumb-animated
// @source custom

'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const STAGGER_DELAY_MS = 80 as const;
const SEPARATOR_CHAR = '/' as const;
const MAX_ITEMS_SAFETY = 20 as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface BreadcrumbItem {
  /** Display label */
  label: string;
  /** Navigation target */
  href: string;
}

interface BreadcrumbAnimatedProps {
  /** Ordered list of breadcrumb items (last = current page) */
  items: BreadcrumbItem[];
  /** Additional class names */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Separator                                                         */
/* ------------------------------------------------------------------ */

function Separator() {
  return (
    <span
      aria-hidden="true"
      className="mx-2 select-none text-[var(--color-text-muted,hsl(0_0%_65%))]"
    >
      {SEPARATOR_CHAR}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BreadcrumbAnimated({
  items,
  className,
}: BreadcrumbAnimatedProps) {
  const [mounted, setMounted] = useState(false);
  const safeItems = items.slice(0, MAX_ITEMS_SAFETY);

  useEffect(() => {
    // Trigger staggered entry after mount
    setMounted(true);
  }, []);

  if (safeItems.length === 0) return null;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('flex items-center', className)}
    >
      <ol className="flex flex-wrap items-center" role="list">
        {safeItems.map((item, index) => {
          const isLast = index === safeItems.length - 1;
          const delayMs = index * STAGGER_DELAY_MS;

          return (
            <li
              key={item.href}
              className={cn(
                'flex items-center',
                /* Motion-safe: slide-in with stagger */
                'motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out',
                mounted
                  ? 'motion-safe:translate-x-0 motion-safe:opacity-100'
                  : 'motion-safe:-translate-x-3 motion-safe:opacity-0',
                /* Motion-reduce: no animation, always visible */
                'motion-reduce:translate-x-0 motion-reduce:opacity-100',
                'motion-reduce:transition-none',
              )}
              style={{
                transitionDelay: mounted ? `${delayMs}ms` : '0ms',
              }}
            >
              {index > 0 && <Separator />}

              {isLast ? (
                <span
                  aria-current="page"
                  className={cn(
                    'text-sm font-semibold',
                    'text-[var(--color-text,hsl(0_0%_8%))]',
                  )}
                  style={{
                    fontSize: 'clamp(0.8125rem, 0.75rem + 0.2vw, 0.9375rem)',
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className={cn(
                    'text-sm',
                    'text-[var(--color-text-muted,hsl(0_0%_40%))]',
                    'hover:text-[var(--color-text,hsl(0_0%_10%))]',
                    'hover:underline underline-offset-2',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring,hsl(220_70%_55%))] focus-visible:ring-offset-2',
                    'motion-safe:transition-colors',
                    'motion-reduce:transition-none',
                    'rounded-sm',
                  )}
                  style={{
                    fontSize: 'clamp(0.8125rem, 0.75rem + 0.2vw, 0.9375rem)',
                  }}
                >
                  {item.label}
                </a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
