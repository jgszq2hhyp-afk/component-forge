// @version 2.0.0
// @category testimonials
// @name testimonial-with-stars
// @source self-authored

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const HEADER_MAX_WIDTH = 'max-w-2xl';
const CARD_PADDING = 'p-6 lg:p-8';
const CARD_RADIUS = 'rounded-2xl';
const AVATAR_SIZE = 'w-9 h-9';
const STAR_SIZE = 16;
const MAX_STARS = 5;
const ANIMATION_DURATION = '0.5s';
const ANIMATION_BASE_DELAY_S = 0.1;
const ANIMATION_STAGGER_S = 0.08;
const ANIMATION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const HEADING_CLAMP = 'clamp(1.875rem, 2.5vw + 1rem, 3rem)';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
  quote: string;
  name: string;
  role?: string;
  company?: string;
  avatarSrc?: string;
  rating: 1 | 2 | 3 | 4 | 5;
}

interface TestimonialWithStarsProps {
  headline?: string;
  subheadline?: string;
  averageRating?: number;
  totalReviews?: number;
  testimonials: Testimonial[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes stars-card-in {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes stars-card-in {
    from, to {
      opacity: 1;
      transform: none;
    }
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Star icons
// ---------------------------------------------------------------------------

function StarFilled() {
  return (
    <svg width={STAR_SIZE} height={STAR_SIZE} viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 1.5L9.85 5.25L14 5.85L11 8.75L11.7 12.85L8 10.95L4.3 12.85L5 8.75L2 5.85L6.15 5.25L8 1.5Z" />
    </svg>
  );
}

function StarEmpty() {
  return (
    <svg width={STAR_SIZE} height={STAR_SIZE} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M8 1.5L9.85 5.25L14 5.85L11 8.75L11.7 12.85L8 10.95L4.3 12.85L5 8.75L2 5.85L6.15 5.25L8 1.5Z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="inline-flex items-center gap-0.5"
      style={{ color: 'var(--primary)' }}
      role="img"
      aria-label={`${rating} von ${MAX_STARS} Sternen`}
    >
      {Array.from({ length: MAX_STARS }, (_, i) => (
        <span key={i}>{i < rating ? <StarFilled /> : <StarEmpty />}</span>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component (Server Component — no client interactivity needed)
// ---------------------------------------------------------------------------

export default function TestimonialWithStars({
  headline,
  subheadline,
  averageRating,
  totalReviews,
  testimonials,
  className,
}: TestimonialWithStarsProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'Bewertungen'}
        className={cn(
          `${SECTION_MAX_WIDTH} mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24`,
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        <header className={`${HEADER_MAX_WIDTH} mx-auto text-center mb-12 lg:mb-16`}>
          {/* Overall rating */}
          {averageRating !== undefined && (
            <div className="flex items-center justify-center gap-3 mb-4">
              <StarRating rating={Math.round(averageRating)} />
              <span
                className="text-sm font-medium"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {averageRating.toFixed(1)}
                {totalReviews !== undefined && ` (${totalReviews} Bewertungen)`}
              </span>
            </div>
          )}

          {headline && (
            <h2
              className="font-bold tracking-tight"
              style={{
                fontSize: HEADING_CLAMP,
                color: 'var(--foreground)',
              }}
            >
              {headline}
            </h2>
          )}
          {subheadline && (
            <p
              className="mt-4 text-lg leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {subheadline}
            </p>
          )}
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              role="listitem"
              className={cn(
                `${CARD_RADIUS} border ${CARD_PADDING}`,
                'transition-shadow duration-300 hover:shadow-lg motion-reduce:transition-none',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                animation: `stars-card-in ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                animationDelay: `${ANIMATION_BASE_DELAY_S + index * ANIMATION_STAGGER_S}s`,
              }}
            >
              {/* Stars */}
              <StarRating rating={testimonial.rating} />

              {/* Quote */}
              <blockquote
                className="mt-4 text-sm leading-relaxed"
                style={{ color: 'var(--card-foreground)' }}
              >
                <p>&ldquo;{testimonial.quote}&rdquo;</p>
              </blockquote>

              {/* Author */}
              <footer className="mt-5 flex items-center gap-3">
                {testimonial.avatarSrc && (
                  <div className={`relative ${AVATAR_SIZE} rounded-full overflow-hidden flex-shrink-0`}>
                    <Image
                      src={testimonial.avatarSrc}
                      alt={`Profilbild von ${testimonial.name}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <cite
                    className="text-sm font-semibold not-italic"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    {testimonial.name}
                  </cite>
                  {(testimonial.role || testimonial.company) && (
                    <p
                      className="text-xs"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {[testimonial.role, testimonial.company]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  )}
                </div>
              </footer>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
