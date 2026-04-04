// @version 2.0.0
// @category heroes
// @name hero-centered-minimal
// @score 92
// @source https://tailwindcss.com/plus/ui-blocks/marketing/sections/heroes

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HERO_MIN_HEIGHT = '75vh';
const CONTENT_MAX_WIDTH = '48rem'; // max-w-3xl
const SUBHEADLINE_MAX_WIDTH = '36rem'; // max-w-xl
const GLOW_HEIGHT = '60%';
const GLOW_WIDTH = '80%';
const GLOW_MIX_PERCENT = '8%';
const BADGE_BG_MIX_PERCENT = '12%';
const HEADING_CLAMP = 'clamp(2.5rem, 5vw + 1rem, 4.5rem)';
const SUBHEADLINE_CLAMP = 'clamp(1.125rem, 1vw + 0.75rem, 1.25rem)';
const ARROW_ICON_SIZE = 16;
const ARROW_STROKE_WIDTH = 1.5;
const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ring)]';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroCenteredMinimalProps {
  badgeText?: string;
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (server component -- no interactivity needed)
// ---------------------------------------------------------------------------

export default function HeroCenteredMinimal({
  badgeText,
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  className,
}: HeroCenteredMinimalProps) {
  return (
    <section
      aria-label="Hero"
      className={cn(
        'relative flex flex-col items-center justify-center',
        'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
        'text-center',
        className,
      )}
      style={{
        minHeight: HERO_MIN_HEIGHT,
        backgroundColor: 'var(--background)',
      }}
    >
      {/* Subtle radial glow behind headline */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          height: GLOW_HEIGHT,
          width: GLOW_WIDTH,
          background: `radial-gradient(ellipse at center, color-mix(in srgb, var(--primary) ${GLOW_MIX_PERCENT}, transparent), transparent 70%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10" style={{ maxWidth: CONTENT_MAX_WIDTH }}>
        {/* Badge */}
        {badgeText && (
          <span
            className={cn(
              'mb-6 inline-flex items-center rounded-full px-4 py-1.5',
              'text-xs font-medium tracking-wide uppercase',
            )}
            style={{
              backgroundColor: `color-mix(in srgb, var(--primary) ${BADGE_BG_MIX_PERCENT}, transparent)`,
              color: 'var(--primary)',
            }}
          >
            {badgeText}
          </span>
        )}

        {/* Headline */}
        <h1
          className="font-bold tracking-tight leading-[1.08]"
          style={{
            fontSize: HEADING_CLAMP,
            color: 'var(--foreground)',
          }}
        >
          {headline}
        </h1>

        {/* Subheadline */}
        {subheadline && (
          <p
            className="mx-auto mt-5 md:mt-6 leading-relaxed"
            style={{
              fontSize: SUBHEADLINE_CLAMP,
              maxWidth: SUBHEADLINE_MAX_WIDTH,
              color: 'var(--muted-foreground)',
            }}
          >
            {subheadline}
          </p>
        )}

        {/* CTAs */}
        {(ctaText || secondaryCtaText) && (
          <nav
            aria-label="Hero actions"
            className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            {ctaText && (
              <a
                href={ctaHref}
                className={cn(
                  'inline-flex items-center justify-center',
                  'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
                  FOCUS_RING,
                  'active:scale-[0.98]',
                )}
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                {ctaText}
              </a>
            )}

            {secondaryCtaText && (
              <a
                href={secondaryCtaHref}
                className={cn(
                  'group inline-flex items-center justify-center gap-2',
                  'text-[0.9375rem] font-semibold',
                  FOCUS_RING,
                )}
                style={{
                  color: 'var(--muted-foreground)',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                {secondaryCtaText}
                <svg
                  className="size-4"
                  width={ARROW_ICON_SIZE}
                  height={ARROW_ICON_SIZE}
                  viewBox={`0 0 ${ARROW_ICON_SIZE} ${ARROW_ICON_SIZE}`}
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3.333 8h9.334M8.667 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth={ARROW_STROKE_WIDTH}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </nav>
        )}
      </div>
    </section>
  );
}
