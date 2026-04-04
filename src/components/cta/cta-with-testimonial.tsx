// @version 1.0.0
// @category cta
// @name cta-with-testimonial
// @source custom

import { cn } from '@/lib/utils';

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
      className={cn(
        'relative overflow-hidden',
        'px-6 py-16 md:px-12 lg:py-24',
        className,
      )}
      style={{
        backgroundColor: 'var(--background)',
      }}
    >
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:items-center md:gap-16">
        {/* Left — Testimonial */}
        <figure
          className="relative rounded-2xl p-8 md:p-10"
          style={{
            backgroundColor: 'color-mix(in oklch, var(--primary) 5%, var(--background))',
            border: '1px solid color-mix(in oklch, var(--border) 40%, transparent)',
          }}
        >
          {/* Quote mark */}
          <svg
            className="absolute top-6 left-6 opacity-15 md:top-8 md:left-8"
            width="40"
            height="40"
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

        {/* Right — CTA */}
        <div>
          <h2
            className="font-bold tracking-tight leading-[1.1]"
            style={{
              fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)',
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

          <div className="mt-8">
            <a
              href={href}
              className={cn(
                'inline-flex items-center justify-center',
                'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
                'transition-all duration-200',
                'hover:brightness-110 hover:shadow-lg',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'active:scale-[0.98]',
              )}
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {ctaText}
            </a>
          </div>
        </div>
      </div>

      {/* Reduced-motion */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
@media (prefers-reduced-motion: reduce) {
  .cta-with-testimonial * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}`,
        }}
      />
    </section>
  );
}
