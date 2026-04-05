// @version 2.0.0
// @category cta
// @name cta-split-highlight
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)';
const MAX_CONTENT_WIDTH = 'max-w-6xl';
const SECTION_PADDING = 'px-6 py-16 md:px-12 lg:py-24';
const BG_PRIMARY_MIX = 'color-mix(in oklch, var(--primary) 6%, var(--background))';
const RADIAL_ACCENT =
  'radial-gradient(ellipse at 80% 50%, color-mix(in oklch, var(--primary) 10%, transparent) 0%, transparent 60%)';
const CARD_SHADOW =
  '0 4px 24px color-mix(in oklch, var(--foreground) 6%, transparent), 0 1px 4px color-mix(in oklch, var(--foreground) 4%, transparent)';
const CARD_BORDER = '1px solid color-mix(in oklch, var(--border) 50%, transparent)';
const STAT_CLAMP = 'clamp(2rem, 4vw + 0.5rem, 3rem)';
const BTN_FONT_SIZE = '0.9375rem';
const ACTIVE_SCALE = '0.98';

const REDUCED_MOTION_CSS = `
@media (prefers-reduced-motion: reduce) {
  [data-cta-split-highlight] *,
  [data-cta-split-highlight] *::before,
  [data-cta-split-highlight] *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CtaSplitHighlightProps {
  headline: string;
  description: string;
  ctaText: string;
  href: string;
  highlightStat?: string;
  highlightLabel?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function CtaSplitHighlight({
  headline,
  description,
  ctaText,
  href,
  highlightStat,
  highlightLabel,
  className,
}: CtaSplitHighlightProps) {
  return (
    <section
      aria-label="Handlungsaufforderung mit Statistik-Highlight"
      data-cta-split-highlight=""
      className={cn(
        'relative overflow-hidden',
        SECTION_PADDING,
        className,
      )}
      style={{
        backgroundColor: BG_PRIMARY_MIX,
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: REDUCED_MOTION_CSS }} />

      {/* Decorative background accent */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background: RADIAL_ACCENT,
        }}
      />

      <div className={cn('relative mx-auto grid gap-10 md:grid-cols-2 md:items-center md:gap-16', MAX_CONTENT_WIDTH)}>
        {/* Left -- Text content */}
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
        </header>

        {/* Right -- Highlight card */}
        <div
          className="flex flex-col items-center gap-6 rounded-2xl p-8 text-center md:p-10"
          role="presentation"
          style={{
            backgroundColor: 'var(--background)',
            boxShadow: CARD_SHADOW,
            border: CARD_BORDER,
          }}
        >
          {highlightStat && (
            <figure aria-label={highlightLabel ?? 'Statistik'}>
              <span
                className="block font-extrabold tracking-tight"
                style={{
                  fontSize: STAT_CLAMP,
                  color: 'var(--primary)',
                }}
              >
                {highlightStat}
              </span>
              {highlightLabel && (
                <figcaption
                  className="mt-1 block text-sm font-medium"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {highlightLabel}
                </figcaption>
              )}
            </figure>
          )}

          <a
            href={href}
            className={cn(
              'inline-flex w-full items-center justify-center',
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
        </div>
      </div>
    </section>
  );
}
