// @version 2.0.0
// @category testimonials
// @name testimonial-grid
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
const AVATAR_SIZE = 'w-10 h-10';
const ANIMATION_DURATION = '0.6s';
const ANIMATION_BASE_DELAY_S = 0.1;
const ANIMATION_STAGGER_S = 0.06;
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
  featured?: boolean;
}

interface TestimonialGridProps {
  headline?: string;
  subheadline?: string;
  testimonials: Testimonial[];
  columns?: 2 | 3;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes grid-card-in {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes grid-card-in {
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
// Component (Server Component — no client interactivity needed)
// ---------------------------------------------------------------------------

export default function TestimonialGrid({
  headline,
  subheadline,
  testimonials,
  columns = 3,
  className,
}: TestimonialGridProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'Kundenstimmen'}
        className={cn(
          `${SECTION_MAX_WIDTH} mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24`,
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <header className={`${HEADER_MAX_WIDTH} mx-auto text-center mb-12 lg:mb-16`}>
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
        )}

        {/* Masonry-like grid using CSS columns */}
        <div
          className={cn(
            'gap-6',
            columns === 2
              ? 'columns-1 sm:columns-2'
              : 'columns-1 sm:columns-2 lg:columns-3',
          )}
          role="list"
        >
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              role="listitem"
              className={cn(
                `break-inside-avoid mb-6 ${CARD_RADIUS} border ${CARD_PADDING}`,
                'transition-shadow duration-300 hover:shadow-lg motion-reduce:transition-none',
                testimonial.featured && 'ring-2',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                ['--tw-ring-color' as string]: testimonial.featured
                  ? 'var(--primary)'
                  : 'transparent',
                animation: `grid-card-in ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                animationDelay: `${ANIMATION_BASE_DELAY_S + index * ANIMATION_STAGGER_S}s`,
              }}
            >
              {/* Quote */}
              <blockquote
                className={cn(
                  'leading-relaxed',
                  testimonial.featured ? 'text-base lg:text-lg' : 'text-sm',
                )}
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
