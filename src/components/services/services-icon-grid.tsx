// @version 1.0.0
// @category services
// @name ServicesIconGrid
// @source custom

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_COLUMNS = 3 as const;

const COLUMN_MAP: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
} as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface ServiceItem {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface ServicesIconGridProps {
  headline?: string;
  subheadline?: string;
  services: ServiceItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function ServicesIconGrid({
  headline,
  subheadline,
  services,
  columns = DEFAULT_COLUMNS,
  className,
}: ServicesIconGridProps) {
  return (
    <section
      className={cn('w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]', className)}
      aria-labelledby={headline ? 'services-icon-grid-heading' : undefined}
    >
      {(headline || subheadline) && (
        <header className="mx-auto max-w-3xl text-center mb-[clamp(2rem,5vw,4rem)]">
          {headline && (
            <h2
              id="services-icon-grid-heading"
              className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-tight text-[var(--foreground)]"
            >
              {headline}
            </h2>
          )}
          {subheadline && (
            <p className="mt-3 text-[clamp(1rem,1.5vw,1.25rem)] text-[var(--muted-foreground)]">
              {subheadline}
            </p>
          )}
        </header>
      )}

      <ul
        className={cn(
          'mx-auto grid max-w-7xl gap-[clamp(1rem,2vw,1.5rem)]',
          COLUMN_MAP[columns],
        )}
        role="list"
      >
        {services.map((service) => (
          <li
            key={service.title}
            className={cn(
              'group relative rounded-xl border border-[var(--border)]',
              'bg-[var(--card)] p-[clamp(1.25rem,2.5vw,2rem)]',
              'transition-all duration-300 ease-out',
              'hover:-translate-y-1 hover:border-[var(--primary)] hover:shadow-lg',
              'motion-safe:transition-all motion-reduce:transition-none',
              'focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--ring)]',
            )}
            style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
          >
            {service.icon && (
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--primary)] text-[var(--primary-foreground)]"
                aria-hidden="true"
              >
                {service.icon}
              </div>
            )}
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              {service.title}
            </h3>
            <p className="mt-2 text-[var(--muted-foreground)] leading-relaxed">
              {service.description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
