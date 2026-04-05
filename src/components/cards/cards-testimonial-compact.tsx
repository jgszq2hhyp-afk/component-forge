// @version 1.0.0
// @category cards
// @name cards-testimonial-compact
// @source custom

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const MAX_STARS = 5 as const;
const DEFAULT_COLUMNS = 3 as const;

const COLUMN_MAP: Record<2 | 3, string> = {
  2: 'sm:grid-cols-2',
  3: 'sm:grid-cols-2 lg:grid-cols-3',
} as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface Testimonial {
  /** Quote text */
  quote: string;
  /** Author name */
  name: string;
  /** Author role / company */
  role: string;
  /** Star rating 1-5 */
  rating: number;
}

interface CardsTestimonialCompactProps {
  /** Array of testimonials */
  testimonials: Testimonial[];
  /** Number of grid columns */
  columns?: 2 | 3;
  /** Additional class names */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Star Icon                                                         */
/* ------------------------------------------------------------------ */

function StarIcon({ filled, className }: { filled: boolean; className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.5}
      className={cn('size-4', className)}
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Star Rating                                                       */
/* ------------------------------------------------------------------ */

function StarRating({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(MAX_STARS, Math.round(rating)));

  return (
    <div className="flex gap-0.5" aria-label={`${clamped} von ${MAX_STARS} Sternen`} role="img">
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <StarIcon
          key={i}
          filled={i < clamped}
          className={
            i < clamped
              ? 'text-[var(--color-star-filled,hsl(45_95%_55%))]'
              : 'text-[var(--color-star-empty,hsl(0_0%_78%))]'
          }
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function CardsTestimonialCompact({
  testimonials,
  columns = DEFAULT_COLUMNS,
  className,
}: CardsTestimonialCompactProps) {
  if (testimonials.length === 0) return null;

  return (
    <section className={cn('w-full px-4 py-10 sm:px-6 lg:px-8', className)}>
      <div className={cn('mx-auto grid max-w-5xl gap-5', COLUMN_MAP[columns])}>
        {testimonials.map((t, idx) => (
          <blockquote
            key={idx}
            className={cn(
              'flex flex-col rounded-xl border border-[var(--color-border,hsl(0_0%_88%))]',
              'bg-[var(--color-surface,hsl(0_0%_100%))]',
              'p-5 shadow-sm',
              'motion-safe:transition-shadow motion-safe:duration-200',
              'motion-reduce:transition-none',
              'hover:shadow-md',
            )}
          >
            {/* Stars */}
            <StarRating rating={t.rating} />

            {/* Quote */}
            <p
              className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-text-muted,hsl(0_0%_25%))]"
              style={{
                fontSize: 'clamp(0.8125rem, 0.75rem + 0.2vw, 0.9375rem)',
              }}
            >
              &ldquo;{t.quote}&rdquo;
            </p>

            {/* Author */}
            <footer className="mt-4 border-t border-[var(--color-border,hsl(0_0%_90%))] pt-3">
              <p className="text-sm font-semibold text-[var(--color-text,hsl(0_0%_8%))]">
                {t.name}
              </p>
              <p className="text-xs text-[var(--color-text-muted,hsl(0_0%_45%))]">
                {t.role}
              </p>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
