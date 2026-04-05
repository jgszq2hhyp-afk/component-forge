// @version 2.0.0
// @category heroes
// @name hero-typography-only
// @score 92
// @csv-refs landing:4, products:10,11,5, colors:11

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HERO_MIN_HEIGHT = '80vh';
const CONTENT_MAX_WIDTH = '48rem';
const SUBHEADLINE_MAX_WIDTH = '36rem';
const SCROLL_INDICATOR_BOTTOM = '2rem';
const SCROLL_INDICATOR_LEFT_SM = '1.5rem';
const CHEVRON_SIZE = 20;
const CHEVRON_STROKE_WIDTH = 1.5;
const ANIMATION_DURATION = '0.8s';
const ANIMATION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const BOUNCE_DURATION = '2s';
const DELAY_HEADLINE = '0.1s';
const DELAY_SUBHEADLINE = '0.25s';
const DELAY_CTA = '0.4s';
const HEADING_CLAMP = 'clamp(2.5rem, 5vw + 1rem, 5rem)';
const SUBHEADLINE_CLAMP = 'clamp(1.125rem, 1vw + 0.75rem, 1.25rem)';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroTypographyOnlyProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles (injected once via <style>)
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hero-fade-up {
  from {
    opacity: 0;
    filter: blur(6px);
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
}

@keyframes hero-chevron-bounce {
  0%, 100% {
    transform: translateY(0);
    opacity: 0.6;
  }
  50% {
    transform: translateY(6px);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hero-fade-up {
    from { opacity: 1; transform: none; filter: none; }
    to   { opacity: 1; transform: none; filter: none; }
  }
  @keyframes hero-chevron-bounce {
    0%, 100% { opacity: 0.8; transform: none; }
    50%      { opacity: 0.8; transform: none; }
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Scroll indicator (animated chevron)
// ---------------------------------------------------------------------------

function ScrollIndicator() {
  return (
    <div
      className="absolute flex flex-col items-center gap-1"
      style={{
        bottom: SCROLL_INDICATOR_BOTTOM,
        left: SCROLL_INDICATOR_LEFT_SM,
      }}
      aria-hidden="true"
    >
      <span
        className="text-[0.6875rem] uppercase tracking-[0.2em] font-medium"
        style={{ color: 'var(--muted-foreground)' }}
      >
        Scroll
      </span>
      <svg
        width={CHEVRON_SIZE}
        height={CHEVRON_SIZE}
        viewBox={`0 0 ${CHEVRON_SIZE} ${CHEVRON_SIZE}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: 'var(--muted-foreground)',
          animation: `hero-chevron-bounce ${BOUNCE_DURATION} ease-in-out infinite`,
        }}
      >
        <path
          d="M5 8L10 13L15 8"
          stroke="currentColor"
          strokeWidth={CHEVRON_STROKE_WIDTH}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroTypographyOnly({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  className,
}: HeroTypographyOnlyProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label="Hero"
        className={cn(
          'relative flex flex-col justify-center',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          className,
        )}
        style={{
          minHeight: HERO_MIN_HEIGHT,
          backgroundColor: 'var(--background)',
        }}
      >
        <div style={{ maxWidth: CONTENT_MAX_WIDTH }}>
          <h1
            className="font-bold tracking-tight leading-[1.08]"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
              animation: `hero-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
              animationDelay: DELAY_HEADLINE,
            }}
          >
            {headline}
          </h1>

          {subheadline && (
            <p
              className="mt-5 md:mt-6 leading-relaxed"
              style={{
                fontSize: SUBHEADLINE_CLAMP,
                maxWidth: SUBHEADLINE_MAX_WIDTH,
                color: 'var(--muted-foreground)',
                animation: `hero-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                animationDelay: DELAY_SUBHEADLINE,
              }}
            >
              {subheadline}
            </p>
          )}

          {(ctaText || secondaryCtaText) && (
            <nav
              aria-label="Hero actions"
              className="mt-8 md:mt-10 flex flex-wrap items-center gap-4"
              style={{
                animation: `hero-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                animationDelay: DELAY_CTA,
              }}
            >
              {ctaText && (
                <a
                  href={ctaHref}
                  className={cn(
                    'inline-flex items-center justify-center',
                    'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
                    'transition-all duration-200 motion-reduce:transition-none',
                    'hover:brightness-110 hover:shadow-lg',
                    FOCUS_RING,
                    'active:scale-[0.98] motion-reduce:active:scale-100',
                  )}
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
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
                    'inline-flex items-center justify-center',
                    'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
                    'border transition-all duration-200 motion-reduce:transition-none',
                    'hover:brightness-110',
                    FOCUS_RING,
                    'active:scale-[0.98] motion-reduce:active:scale-100',
                  )}
                  style={{
                    color: 'var(--foreground)',
                    borderColor: 'var(--border)',
                    backgroundColor: 'transparent',
                    ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {secondaryCtaText}
                </a>
              )}
            </nav>
          )}
        </div>

        <ScrollIndicator />
      </section>
    </>
  );
}
