// @version 1.0.0
// @category cards
// @name cards-icon-feature
// @source custom

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_COLUMNS = 3 as const;

const COLUMN_MAP: Record<2 | 3 | 4, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
} as const;

const ICON_CIRCLE_SIZE = 'size-14' as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface Feature {
  /** Custom icon ReactNode (optional, falls back to placeholder) */
  icon?: ReactNode;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
}

interface CardsIconFeatureProps {
  /** Array of features to display */
  features: Feature[];
  /** Grid columns */
  columns?: 2 | 3 | 4;
  /** Additional class names */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Fallback Icon                                                     */
/* ------------------------------------------------------------------ */

function FallbackIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-6"
      aria-hidden="true"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function CardsIconFeature({
  features,
  columns = DEFAULT_COLUMNS,
  className,
}: CardsIconFeatureProps) {
  if (features.length === 0) return null;

  return (
    <section className={cn('w-full px-4 py-12 sm:px-6 lg:px-8', className)}>
      <div className={cn('mx-auto grid max-w-6xl gap-6', COLUMN_MAP[columns])}>
        {features.map((feature, idx) => (
          <article
            key={idx}
            className={cn(
              'flex flex-col items-center rounded-2xl border border-[var(--color-border,hsl(0_0%_88%))]',
              'bg-[var(--color-surface,hsl(0_0%_100%))]',
              'p-6 text-center shadow-sm',
              'motion-safe:transition-shadow motion-safe:duration-200',
              'motion-reduce:transition-none',
              'hover:shadow-md',
            )}
          >
            {/* Icon circle */}
            <div
              className={cn(
                ICON_CIRCLE_SIZE,
                'flex items-center justify-center rounded-full',
                'bg-[var(--color-primary-light,hsl(220_80%_96%))]',
                'text-[var(--color-primary,hsl(220_70%_50%))]',
              )}
              aria-hidden="true"
            >
              {feature.icon ?? <FallbackIcon />}
            </div>

            {/* Title */}
            <h3
              className="mt-5 font-semibold text-[var(--color-text,hsl(0_0%_8%))]"
              style={{
                fontSize: 'clamp(1rem, 0.9rem + 0.4vw, 1.25rem)',
              }}
            >
              {feature.title}
            </h3>

            {/* Description */}
            <p
              className="mt-2 leading-relaxed text-[var(--color-text-muted,hsl(0_0%_35%))]"
              style={{
                fontSize: 'clamp(0.8125rem, 0.75rem + 0.25vw, 0.9375rem)',
              }}
            >
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
