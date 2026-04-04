// @version 1.0.0
// @category testimonials
// @name testimonial-minimal
// @source self-authored

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Testimonial {
  quote: string;
  name: string;
  role?: string;
}

interface TestimonialMinimalProps {
  headline?: string;
  testimonials: Testimonial[];
  layout?: 'centered' | 'stacked';
  className?: string;
}

// ---------------------------------------------------------------------------
// Dash separator
// ---------------------------------------------------------------------------

function Dash() {
  return (
    <span
      className="inline-block w-8 h-px mx-auto"
      style={{ backgroundColor: 'var(--border)' }}
      aria-hidden="true"
    />
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TestimonialMinimal({
  headline,
  testimonials,
  layout = 'centered',
  className,
}: TestimonialMinimalProps) {
  if (layout === 'centered') {
    return (
      <section
        className={cn(
          'max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {headline && (
          <p
            className="text-xs uppercase tracking-[0.2em] font-medium text-center mb-10"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {headline}
          </p>
        )}

        <div className="space-y-16">
          {testimonials.map((testimonial, index) => (
            <figure key={index} className="text-center">
              <blockquote
                className="text-xl sm:text-2xl lg:text-3xl font-light leading-snug tracking-tight italic"
                style={{ color: 'var(--foreground)' }}
              >
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>

              <div className="mt-6 flex flex-col items-center gap-2">
                <Dash />
                <figcaption>
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {testimonial.name}
                  </p>
                  {testimonial.role && (
                    <p
                      className="text-xs"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {testimonial.role}
                    </p>
                  )}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  // Stacked layout
  return (
    <section
      className={cn(
        'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {headline && (
        <p
          className="text-xs uppercase tracking-[0.2em] font-medium mb-10"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {headline}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
        {testimonials.map((testimonial, index) => (
          <figure key={index}>
            <blockquote
              className="text-base leading-relaxed"
              style={{ color: 'var(--foreground)' }}
            >
              &ldquo;{testimonial.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4">
              <Dash />
              <p
                className="mt-3 text-sm font-semibold"
                style={{ color: 'var(--foreground)' }}
              >
                {testimonial.name}
              </p>
              {testimonial.role && (
                <p
                  className="text-xs"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {testimonial.role}
                </p>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
