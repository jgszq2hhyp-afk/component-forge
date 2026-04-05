// @version 2.0.0
// @category testimonials
// @name testimonial-minimal
// @source self-authored

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP_CENTERED = 'clamp(1.25rem, 1rem + 1.5vw, 1.875rem)';
const SECTION_MAX_WIDTH_CENTERED = '48rem';
const SECTION_MAX_WIDTH_STACKED = '80rem';
const DASH_WIDTH_REM = '2rem';
const DASH_HEIGHT_PX = '1px';
const HEADLINE_LETTER_SPACING = '0.2em';

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
      className="inline-block mx-auto"
      style={{
        width: DASH_WIDTH_REM,
        height: DASH_HEIGHT_PX,
        backgroundColor: 'var(--border)',
      }}
      aria-hidden="true"
    />
  );
}

// ---------------------------------------------------------------------------
// Component (Server Component)
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
        aria-label={headline ?? 'Testimonials'}
        className={cn(
          'mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28',
          className,
        )}
        style={{
          maxWidth: SECTION_MAX_WIDTH_CENTERED,
          backgroundColor: 'var(--background)',
        }}
      >
        {headline && (
          <p
            className="text-xs uppercase font-medium text-center mb-10"
            style={{
              letterSpacing: HEADLINE_LETTER_SPACING,
              color: 'var(--muted-foreground)',
            }}
          >
            {headline}
          </p>
        )}

        <ol className="list-none space-y-16 p-0 m-0">
          {testimonials.map((testimonial, index) => (
            <li key={index}>
              <figure className="text-center">
                <blockquote
                  className="font-light leading-snug tracking-tight italic"
                  style={{
                    fontSize: HEADING_CLAMP_CENTERED,
                    color: 'var(--foreground)',
                  }}
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
            </li>
          ))}
        </ol>
      </section>
    );
  }

  // Stacked layout
  return (
    <section
      aria-label={headline ?? 'Testimonials'}
      className={cn(
        'mx-auto px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24',
        className,
      )}
      style={{
        maxWidth: SECTION_MAX_WIDTH_STACKED,
        backgroundColor: 'var(--background)',
      }}
    >
      {headline && (
        <p
          className="text-xs uppercase font-medium mb-10"
          style={{
            letterSpacing: HEADLINE_LETTER_SPACING,
            color: 'var(--muted-foreground)',
          }}
        >
          {headline}
        </p>
      )}

      <ol className="list-none grid grid-cols-1 gap-10 p-0 m-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-14">
        {testimonials.map((testimonial, index) => (
          <li key={index}>
            <figure>
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
          </li>
        ))}
      </ol>
    </section>
  );
}
