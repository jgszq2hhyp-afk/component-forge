// @version 2.0.0
// @category cta
// @name cta-with-testimonial
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)';
const MAX_CONTENT_WIDTH = 'max-w-6xl';
const SECTION_PADDING = 'px-6 py-16 md:px-12 lg:py-24';
const QUOTE_BG = 'color-mix(in oklch, var(--primary) 5%, var(--background))';
const QUOTE_BORDER = '1px solid color-mix(in oklch, var(--border) 40%, transparent)';
const QUOTE_ICON_SIZE = 40;
const BTN_FONT_SIZE = '0.9375rem';
const ACTIVE_SCALE = '0.98';

const REDUCED_MOTION_CSS = `
@media (prefers-reduced-motion: reduce) {
  [data-cta-with-testimonial] *,
  [data-cta-with-testimonial] *::before,
  [data-cta-with-testimonial] *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CtaWithTestimonialProps {
  headline: string;
  description: string;
  ctaText: string;
  href: string;
  quote: string;
  authorName: string;
  authorRole?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function CtaWithTestimonial({
  headline,
  description,
  ctaText,
  href,
  quote,
  authorName,
  authorRole,
  className,
}: CtaWithTestimonialProps) {
  return (
    <section
      aria-label="Handlungsaufforderung mit Kundenstimme"
      data-cta-with-testimonial=""
      className={cn(
        'relative overflow-hidden',
        SECTION_PADDING,
        className,
      )}
      style={{
        backgroundColor: 'var(--background)',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: REDUCED_MOTION_CSS }} />

      <div className={cn('mx-auto grid gap-10 md:grid-cols-2 md:items-center md:gap-16', MAX_CONTENT_WIDTH)}>
        {/* Left -- Testimonial */}
        <figure
          className="relative rounded-2xl p-8 md:p-10"
          aria-label={`Kundenstimme von ${authorName}`}
          style={{
            backgroundColor: QUOTE_BG,
            border: QUOTE_BORDER,
          }}
        >
          {/* Quote mark */}
          <svg
            className="absolute top-6 left-6 opacity-15 md:top-8 md:left-8"
            width={QUOTE_ICON_SIZE}
            height={QUOTE_ICON_SIZE}
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M10 8c-1.1 0-2 .9-2 2v6h6v-6h-4c0-2.21 1.79-4 4-4V4c-3.31 0-6 2.69-6 6v8h8V10c0-1.1-.9-2-2-2h-4zm-8 0c-1.1 0-2 .9-2 2v6h6v-6H2c0-2.21 1.79-4 4-4V4C2.69 4 0 6.69 0 10v8h8V10c0-1.1-.9-2-2-2H2z"
              fill="currentColor"
              style={{ color: 'var(--primary)' }}
            />
          </svg>

          <blockquote
            className="relative mt-6 text-base leading-relaxed md:text-lg"
            style={{ color: 'var(--foreground)' }}
          >
            &ldquo;{quote}&rdquo;
          </blockquote>

          <figcaption className="mt-5">
            <cite className="not-italic">
              <span
                className="block text-sm font-semibold"
                style={{ color: 'var(--foreground)' }}
              >
                {authorName}
              </span>
              {authorRole && (
                <span
                  className="mt-0.5 block text-sm"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {authorRole}
                </span>
              )}
            </cite>
          </figcaption>
        </figure>

        {/* Right -- CTA */}
        <header>
          <h2
            className="font-bold tracking-tight leading-[1.1]"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            {headline}
          </h2>

          <p
            className="mt-4 max-w-lg text-base leading-relaxed md:text-lg"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {description}
          </p>

          <nav className="mt-8" aria-label="Handlungsaufforderung">
            <a
              href={href}
              className={cn(
                'inline-flex items-center justify-center',
                'rounded-lg px-7 py-3.5 font-semibold',
                'transition-all duration-200',
                'hover:brightness-110 hover:shadow-lg',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                `active:scale-[${ACTIVE_SCALE}]`,
              )}
              style={{
                fontSize: BTN_FONT_SIZE,
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {ctaText}
            </a>
          </nav>
        </header>
      </div>
    </section>
  );
}
