// @version 1.0.0
// @category breadcrumbs
// @name BreadcrumbSimple
// @source custom

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_SEPARATOR = (
  <span aria-hidden="true" className="text-[var(--muted-foreground)]">/</span>
);

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbSimpleProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BreadcrumbSimple({
  items,
  separator = DEFAULT_SEPARATOR,
  className,
}: BreadcrumbSimpleProps) {
  if (items.length === 0) return null;

  const lastIndex = items.length - 1;

  return (
    <nav
      aria-label="Breadcrumb"
      className={cn('w-full px-[clamp(1rem,4vw,2rem)] py-3', className)}
    >
      <ol className="flex flex-wrap items-center gap-1.5 text-sm" role="list">
        {items.map((item, index) => {
          const isCurrent = index === lastIndex;

          return (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              {index > 0 && <span className="select-none">{separator}</span>}

              {isCurrent || !item.href ? (
                <span
                  className="font-medium text-[var(--foreground)]"
                  aria-current={isCurrent ? 'page' : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a
                  href={item.href}
                  className={cn(
                    'text-[var(--muted-foreground)] hover:text-[var(--foreground)]',
                    'underline-offset-4 hover:underline',
                    'transition-colors duration-200 motion-reduce:transition-none',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
                  )}
                  style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
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
