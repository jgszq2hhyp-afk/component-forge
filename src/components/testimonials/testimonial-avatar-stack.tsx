// @version 1.0.0
// @category testimonials
// @name TestimonialAvatarStack
// @source custom

import Image from 'next/image';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const AVATAR_SIZE = 40;
const MAX_STARS = 5;
const STAR_SIZE = 20;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface AvatarItem {
  src: string;
  alt: string;
}

interface TestimonialAvatarStackProps {
  headline?: string;
  avatars: AvatarItem[];
  rating?: number;
  totalReviews?: number;
  quote?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={STAR_SIZE}
      height={STAR_SIZE}
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={filled ? 'text-[var(--primary)]' : 'text-[var(--muted-foreground)]'}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  const clampedRating = Math.min(MAX_STARS, Math.max(0, rating));

  return (
    <div
      className="flex items-center gap-0.5"
      role="img"
      aria-label={`${clampedRating} out of ${MAX_STARS} stars`}
    >
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <StarIcon key={i} filled={i < Math.round(clampedRating)} />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function TestimonialAvatarStack({
  headline,
  avatars,
  rating,
  totalReviews,
  quote,
  className,
}: TestimonialAvatarStackProps) {
  return (
    <section
      className={cn(
        'w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]',
        className,
      )}
      aria-labelledby={headline ? 'testimonial-stack-heading' : undefined}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
        {headline && (
          <h2
            id="testimonial-stack-heading"
            className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold tracking-tight text-[var(--foreground)] mb-6"
          >
            {headline}
          </h2>
        )}

        {/* Avatar stack */}
        {avatars.length > 0 && (
          <div className="flex -space-x-3" aria-label={`${avatars.length} reviewers`}>
            {avatars.map((avatar, index) => (
              <div
                key={avatar.alt}
                className="relative overflow-hidden rounded-full border-2 border-[var(--background)]"
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  zIndex: avatars.length - index,
                }}
              >
                <Image
                  src={avatar.src}
                  alt={avatar.alt}
                  width={AVATAR_SIZE}
                  height={AVATAR_SIZE}
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Rating row */}
        {(rating !== undefined || totalReviews !== undefined) && (
          <div className="mt-4 flex items-center gap-2">
            {rating !== undefined && <StarRating rating={rating} />}
            {totalReviews !== undefined && (
              <span className="text-sm text-[var(--muted-foreground)]">
                ({totalReviews.toLocaleString()} reviews)
              </span>
            )}
          </div>
        )}

        {/* Quote */}
        {quote && (
          <blockquote className="mt-5 max-w-xl text-[clamp(1rem,1.5vw,1.125rem)] text-[var(--muted-foreground)] italic leading-relaxed">
            &ldquo;{quote}&rdquo;
          </blockquote>
        )}
      </div>
    </section>
  );
}
