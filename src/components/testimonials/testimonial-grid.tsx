// @version 1.0.0
// @category testimonials
// @name testimonial-grid
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
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component
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
        className={cn(
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
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
        )}

        {/* Masonry-like grid using CSS columns */}
        <div
          className={cn(
            'gap-6',
            columns === 2
              ? 'columns-1 sm:columns-2'
              : 'columns-1 sm:columns-2 lg:columns-3',
          )}
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                'break-inside-avoid mb-6 rounded-2xl border p-6 lg:p-8',
                'transition-shadow duration-300 hover:shadow-lg',
                testimonial.featured && 'ring-2',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                ['--tw-ring-color' as string]: testimonial.featured
                  ? 'var(--primary)'
                  : 'transparent',
                animation: 'grid-card-in 0.6s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: `${0.1 + index * 0.06}s`,
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
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-5 flex items-center gap-3">
                {testimonial.avatarSrc && (
                  <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
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
