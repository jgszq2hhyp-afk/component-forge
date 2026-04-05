// @version 2.0.0
// @category cta
// @name cta-card-centered
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)';
const MAX_CARD_WIDTH = 'max-w-2xl';
const SECTION_PADDING = 'px-6 py-16 md:px-12 lg:py-24';
const CARD_SHADOW =
  '0 8px 40px color-mix(in oklch, var(--foreground) 8%, transparent), 0 2px 8px color-mix(in oklch, var(--foreground) 4%, transparent)';
const CARD_BORDER = '1px solid color-mix(in oklch, var(--border) 60%, transparent)';
const ACCENT_GRADIENT =
  'linear-gradient(90deg, var(--primary), color-mix(in oklch, var(--primary) 70%, var(--accent)))';
const BTN_FONT_SIZE = '0.9375rem';
const ACTIVE_SCALE = '0.98';
const SECONDARY_BORDER = 'color-mix(in oklch, var(--border) 80%, transparent)';

const REDUCED_MOTION_CSS = `
@media (prefers-reduced-motion: reduce) {
  [data-cta-card-centered] *,
  [data-cta-card-centered] *::before,
  [data-cta-card-centered] *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CtaCardCenteredProps {
  headline: string;
  description: string;
  ctaText: string;
  href: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function CtaCardCentered({
  headline,
  description,
  ctaText,
  href,
  secondaryCtaText,
  secondaryCtaHref = '#',
  className,
}: CtaCardCenteredProps) {
  return (
    <section
      aria-label="Handlungsaufforderung"
      data-cta-card-centered=""
      className={cn(
        'flex items-center justify-center',
        SECTION_PADDING,
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: REDUCED_MOTION_CSS }} />

      <article
        className={cn(
          'relative w-full overflow-hidden rounded-2xl px-8 py-12 text-center md:px-14 md:py-16',
          MAX_CARD_WIDTH,
        )}
        style={{
          backgroundColor: 'var(--background)',
          boxShadow: CARD_SHADOW,
          border: CARD_BORDER,
        }}
      >
        {/* Subtle decorative accent */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1"
          aria-hidden="true"
          style={{
            background: ACCENT_GRADIENT,
          }}
        />

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
          className="mx-auto mt-4 max-w-md text-base leading-relaxed"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {description}
        </p>

        {/* Buttons */}
        <nav className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4" aria-label="Handlungsoptionen">
          {/* Primary */}
          <a
            href={href}
            className={cn(
              'inline-flex w-full items-center justify-center sm:w-auto',
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

          {/* Secondary / Ghost */}
          {secondaryCtaText && (
            <a
              href={secondaryCtaHref}
              className={cn(
                'inline-flex w-full items-center justify-center sm:w-auto',
                'rounded-lg border px-7 py-3.5 font-semibold',
                'bg-transparent transition-all duration-200',
                'hover:brightness-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                `active:scale-[${ACTIVE_SCALE}]`,
              )}
              style={{
                fontSize: BTN_FONT_SIZE,
                color: 'var(--foreground)',
                borderColor: SECONDARY_BORDER,
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {secondaryCtaText}
            </a>
          )}
        </nav>
      </article>
    </section>
  );
}
