// @version 1.0.0
// @category ratings
// @name ratings-review-cards
// @source custom

import type { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_STARS = 5;
const STAR_SIZE = 16;
const SECTION_MAX_WIDTH = 'max-w-7xl';
const HEADER_MAX_WIDTH = 'max-w-2xl';
const CARD_RADIUS = 'rounded-2xl';
const CARD_PADDING = 'p-6 lg:p-8';
const AVATAR_SIZE = 40;
const HEADING_CLAMP = 'clamp(1.5rem, 2.5vw + 0.875rem, 2.5rem)';
const SECTION_PADDING_CLAMP = 'clamp(3rem, 5vw, 6rem)';
const TRUNCATE_LENGTH = 200;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Review {
  /** Reviewer name */
  name: string;
  /** Rating from 1 to 5 */
  rating: number;
  /** Display date string (e.g. "March 12, 2026") */
  date: string;
  /** Review body text */
  text: string;
  /** Whether the reviewer is verified */
  verified?: boolean;
  /** Optional avatar image source */
  avatarSrc?: string;
}

interface RatingsReviewCardsProps {
  /** Array of review objects */
  reviews: Review[];
  /** Optional section headline */
  headline?: string;
  /** Number of grid columns (responsive base) */
  columns?: 1 | 2 | 3;
  /** Additional CSS classes */
  className?: string;
}

// ---------------------------------------------------------------------------
// Star SVG helpers
// ---------------------------------------------------------------------------

function StarFilled(): ReactNode {
  return (
    <svg
      width={STAR_SIZE}
      height={STAR_SIZE}
      viewBox="0 0 16 16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M8 1.5L9.85 5.25L14 5.85L11 8.75L11.7 12.85L8 10.95L4.3 12.85L5 8.75L2 5.85L6.15 5.25L8 1.5Z" />
    </svg>
  );
}

function StarEmpty(): ReactNode {
  return (
    <svg
      width={STAR_SIZE}
      height={STAR_SIZE}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M8 1.5L9.85 5.25L14 5.85L11 8.75L11.7 12.85L8 10.95L4.3 12.85L5 8.75L2 5.85L6.15 5.25L8 1.5Z"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }): ReactNode {
  const clamped = Math.min(MAX_STARS, Math.max(0, Math.round(rating)));
  return (
    <div
      className="inline-flex items-center gap-0.5"
      role="img"
      aria-label={`${clamped} out of ${MAX_STARS} stars`}
    >
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <span
          key={i}
          style={{ color: i < clamped ? 'var(--primary)' : 'var(--border)' }}
        >
          {i < clamped ? <StarFilled /> : <StarEmpty />}
        </span>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Verified badge
// ---------------------------------------------------------------------------

function VerifiedBadge(): ReactNode {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full"
      style={{
        backgroundColor: 'var(--accent)',
        color: 'var(--primary)',
      }}
    >
      <svg
        width="12"
        height="12"
        viewBox="0 0 12 12"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M10 3.5L4.75 8.5L2 5.75"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      Verified
    </span>
  );
}

// ---------------------------------------------------------------------------
// Avatar placeholder
// ---------------------------------------------------------------------------

function AvatarFallback({ name }: { name: string }): ReactNode {
  const initials = name
    .split(' ')
    .map((part) => part.charAt(0))
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div
      className="flex items-center justify-center rounded-full text-sm font-semibold select-none shrink-0"
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        backgroundColor: 'var(--accent)',
        color: 'var(--primary)',
      }}
      aria-hidden="true"
    >
      {initials}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Grid column map
// ---------------------------------------------------------------------------

const COLUMN_CLASSES: Record<1 | 2 | 3, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
} as const;

// ---------------------------------------------------------------------------
// Review card
// ---------------------------------------------------------------------------

function ReviewCard({ review }: { review: Review }): ReactNode {
  const isLong = review.text.length > TRUNCATE_LENGTH;

  return (
    <article
      className={cn(
        CARD_RADIUS,
        CARD_PADDING,
        'border flex flex-col gap-4',
        'transition-shadow duration-300 hover:shadow-lg',
      )}
      style={{
        backgroundColor: 'var(--card)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Stars + verified */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <StarRating rating={review.rating} />
        {review.verified && <VerifiedBadge />}
      </div>

      {/* Review text */}
      <div>
        {isLong ? (
          <details className="group">
            <summary
              className="text-sm leading-relaxed cursor-pointer list-none"
              style={{ color: 'var(--foreground)' }}
            >
              <span>{review.text.slice(0, TRUNCATE_LENGTH).trim()}&hellip;</span>
              <span
                className="ml-1 text-xs font-medium group-open:hidden"
                style={{ color: 'var(--primary)' }}
              >
                Read more
              </span>
            </summary>
            <p
              className="text-sm leading-relaxed mt-1"
              style={{ color: 'var(--foreground)' }}
            >
              {review.text}
            </p>
          </details>
        ) : (
          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--foreground)' }}
          >
            {review.text}
          </p>
        )}
      </div>

      {/* Author row */}
      <footer className="flex items-center gap-3 mt-auto pt-2">
        {review.avatarSrc ? (
          <div
            className="relative rounded-full overflow-hidden shrink-0"
            style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}
          >
            <Image
              src={review.avatarSrc}
              alt={`Profile picture of ${review.name}`}
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <AvatarFallback name={review.name} />
        )}

        <div className="min-w-0">
          <p
            className="text-sm font-semibold truncate"
            style={{ color: 'var(--foreground)' }}
          >
            {review.name}
          </p>
          <time
            className="text-xs"
            style={{ color: 'var(--muted-foreground)' }}
            dateTime={review.date}
          >
            {review.date}
          </time>
        </div>
      </footer>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function RatingsReviewCards({
  reviews,
  headline,
  columns = 3,
  className,
}: RatingsReviewCardsProps): ReactNode {
  return (
    <section
      aria-label={headline ?? 'Customer reviews'}
      className={cn(
        `${SECTION_MAX_WIDTH} mx-auto px-4 sm:px-6 lg:px-8`,
        className,
      )}
      style={{
        paddingBlock: SECTION_PADDING_CLAMP,
        backgroundColor: 'var(--background)',
      }}
    >
      {/* Header */}
      {headline && (
        <header className={`${HEADER_MAX_WIDTH} mx-auto text-center mb-10 lg:mb-14`}>
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            {headline}
          </h2>
        </header>
      )}

      {/* Review grid */}
      <div
        className={cn('grid gap-6', COLUMN_CLASSES[columns])}
        role="list"
      >
        {reviews.map((review, index) => (
          <div key={index} role="listitem">
            <ReviewCard review={review} />
          </div>
        ))}
      </div>
    </section>
  );
}
