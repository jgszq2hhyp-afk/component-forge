// @version 1.0.0
// @category testimonials
// @name testimonial-with-stars
// @source self-authored

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

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
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Star icons
// ---------------------------------------------------------------------------

function StarFilled() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8 1.5L9.85 5.25L14 5.85L11 8.75L11.7 12.85L8 10.95L4.3 12.85L5 8.75L2 5.85L6.15 5.25L8 1.5Z" />
    </svg>
  );
}

function StarEmpty() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M8 1.5L9.85 5.25L14 5.85L11 8.75L11.7 12.85L8 10.95L4.3 12.85L5 8.75L2 5.85L6.15 5.25L8 1.5Z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="inline-flex items-center gap-0.5" style={{ color: 'var(--primary)' }}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i}>{i < rating ? <StarFilled /> : <StarEmpty />}</span>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
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
        className={cn(
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
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
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
              style={{ color: 'var(--foreground)' }}
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
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                'rounded-2xl border p-6 lg:p-8',
                'transition-shadow duration-300 hover:shadow-lg',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                animation: 'stars-card-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: `${0.1 + index * 0.08}s`,
              }}
            >
              {/* Stars */}
              <StarRating rating={testimonial.rating} />

              {/* Quote */}
              <blockquote
                className="mt-4 text-sm leading-relaxed"
                style={{ color: 'var(--card-foreground)' }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3">
                {testimonial.avatarSrc && (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={testimonial.avatarSrc}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    {testimonial.name}
                  </p>
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
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
