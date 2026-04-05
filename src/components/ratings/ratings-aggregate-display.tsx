// @version 1.0.0
// @category ratings
// @name ratings-aggregate-display
// @source custom

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_STARS = 5;
const STAR_SIZE = 24;
const STAR_SIZE_SM = 20;
const SECTION_MAX_WIDTH = 'max-w-3xl';
const CARD_RADIUS = 'rounded-2xl';
const CARD_PADDING = 'p-6 sm:p-8 lg:p-10';
const BAR_HEIGHT = 'h-2.5';
const BAR_RADIUS = 'rounded-full';
const SCORE_CLAMP = 'clamp(3rem, 4vw + 2rem, 4.5rem)';
const HEADING_CLAMP = 'clamp(1.5rem, 2vw + 0.875rem, 2.25rem)';
const SECTION_PADDING_CLAMP = 'clamp(3rem, 5vw, 6rem)';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

/** Tuple: [5-star count, 4-star count, 3-star count, 2-star count, 1-star count] */
type StarDistribution = [number, number, number, number, number];

interface RatingsAggregateDisplayProps {
  /** Average rating value (e.g. 4.7) */
  average: number;
  /** Total number of reviews */
  total: number;
  /** Distribution of ratings from 5 stars down to 1 star */
  distribution: StarDistribution;
  /** Optional section headline */
  headline?: string;
  /** Additional CSS classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Star SVG helpers
// ---------------------------------------------------------------------------

function StarFull(): ReactNode {
  return (
    <svg
      width={STAR_SIZE}
      height={STAR_SIZE}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

function StarEmpty(): ReactNode {
  return (
    <svg
      width={STAR_SIZE}
      height={STAR_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarPartial({ fraction }: { fraction: number }): ReactNode {
  const clipId = `star-clip-${Math.round(fraction * 100)}`;
  return (
    <svg
      width={STAR_SIZE}
      height={STAR_SIZE}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <defs>
        <clipPath id={clipId}>
          <rect x="0" y="0" width={24 * fraction} height="24" />
        </clipPath>
      </defs>
      {/* Empty outline behind */}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        style={{ color: 'var(--border)' }}
      />
      {/* Filled portion */}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z"
        fill="currentColor"
        clipPath={`url(#${clipId})`}
        style={{ color: 'var(--primary)' }}
      />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }): ReactNode {
  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${rating.toFixed(1)} out of ${MAX_STARS} stars`}
    >
      {Array.from({ length: MAX_STARS }, (_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i));
        if (fill >= 1) {
          return (
            <span key={i} style={{ color: 'var(--primary)' }}>
              <StarFull />
            </span>
          );
        }
        if (fill <= 0) {
          return (
            <span key={i} style={{ color: 'var(--border)' }}>
              <StarEmpty />
            </span>
          );
        }
        return <StarPartial key={i} fraction={fill} />;
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small star for distribution rows
// ---------------------------------------------------------------------------

function SmallStar(): ReactNode {
  return (
    <svg
      width={STAR_SIZE_SM}
      height={STAR_SIZE_SM}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      style={{ color: 'var(--primary)' }}
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14l-5-4.87 6.91-1.01L12 2z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Distribution bar row
// ---------------------------------------------------------------------------

function DistributionRow({
  starLevel,
  count,
  total,
}: {
  starLevel: number;
  count: number;
  total: number;
}): ReactNode {
  const percentage = total > 0 ? Math.round((count / total) * 100) : 0;

  return (
    <div className="flex items-center gap-3">
      {/* Star label */}
      <span
        className="flex items-center gap-1 text-sm font-medium tabular-nums shrink-0 w-10 justify-end"
        style={{ color: 'var(--foreground)' }}
      >
        {starLevel}
        <SmallStar />
      </span>

      {/* Bar track */}
      <div
        className={cn('flex-1 overflow-hidden', BAR_HEIGHT, BAR_RADIUS)}
        style={{ backgroundColor: 'var(--border)' }}
      >
        <div
          className={cn('h-full transition-all duration-500', BAR_RADIUS)}
          style={{
            width: `${percentage}%`,
            backgroundColor: 'var(--primary)',
            minWidth: count > 0 ? '4px' : '0px',
          }}
        />
      </div>

      {/* Percentage label */}
      <span
        className="text-sm tabular-nums w-10 text-right shrink-0"
        style={{ color: 'var(--muted-foreground)' }}
      >
        {percentage}%
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function RatingsAggregateDisplay({
  average,
  total,
  distribution,
  headline,
  className,
}: RatingsAggregateDisplayProps): ReactNode {
  const clampedAverage = Math.min(MAX_STARS, Math.max(0, average));

  return (
    <section
      aria-label={headline ?? 'Rating overview'}
      className={cn(
        `${SECTION_MAX_WIDTH} mx-auto px-4 sm:px-6 lg:px-8`,
        className,
      )}
      style={{
        paddingBlock: SECTION_PADDING_CLAMP,
        backgroundColor: 'var(--background)',
      }}
    >
      {/* Optional headline */}
      {headline && (
        <h2
          className="font-bold tracking-tight text-center mb-8 lg:mb-10"
          style={{
            fontSize: HEADING_CLAMP,
            color: 'var(--foreground)',
          }}
        >
          {headline}
        </h2>
      )}

      {/* Card */}
      <div
        className={cn(
          CARD_RADIUS,
          CARD_PADDING,
          'border',
          'grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 sm:gap-10',
        )}
        style={{
          backgroundColor: 'var(--card)',
          borderColor: 'var(--border)',
        }}
      >
        {/* Left: Score summary */}
        <div className="flex flex-col items-center justify-center text-center sm:min-w-[140px]">
          <span
            className="font-extrabold leading-none tracking-tight"
            style={{
              fontSize: SCORE_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            {clampedAverage.toFixed(1)}
          </span>

          <div className="mt-3">
            <StarRating rating={clampedAverage} />
          </div>

          <span
            className="mt-2 text-sm"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {total.toLocaleString()} {total === 1 ? 'review' : 'reviews'}
          </span>
        </div>

        {/* Right: Distribution bars */}
        <div
          className="flex flex-col gap-3 justify-center"
          role="list"
          aria-label="Rating distribution"
        >
          {distribution.map((count, index) => {
            const starLevel = MAX_STARS - index;
            return (
              <div key={starLevel} role="listitem">
                <DistributionRow
                  starLevel={starLevel}
                  count={count}
                  total={total}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
