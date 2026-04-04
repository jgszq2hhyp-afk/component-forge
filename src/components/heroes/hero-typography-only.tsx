// @version 1.0.0
// @category heroes
// @name hero-typography-only
// @score pending
// @csv-refs landing:4, products:10,11,5, colors:11

'use client';

import { cn } from '@/lib/utils';

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
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes hero-chevron-bounce {
    0%, 100% { opacity: 0.8; }
    50%      { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Scroll indicator (animated chevron)
// ---------------------------------------------------------------------------

function ScrollIndicator() {
  return (
    <div
      className="absolute bottom-8 left-6 md:left-12 lg:left-20 flex flex-col items-center gap-1"
      aria-hidden="true"
    >
      <span
        className="text-[0.6875rem] uppercase tracking-[0.2em] font-medium"
        style={{ color: 'var(--muted-foreground)' }}
      >
        Scroll
      </span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{
          color: 'var(--muted-foreground)',
          animation: 'hero-chevron-bounce 2s ease-in-out infinite',
        }}
      >
        <path
          d="M5 8L10 13L15 8"
          stroke="currentColor"
          strokeWidth="1.5"
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
      {/* Inject keyframes once — tiny inline style, no external deps */}
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        className={cn(
          'relative min-h-[80vh] flex flex-col justify-center',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* ---- Content container ---- */}
        <div className="max-w-3xl">
          {/* Headline */}
          <h1
            className="font-bold tracking-tight leading-[1.08]"
            style={{
              fontSize: 'clamp(2.5rem, 5vw + 1rem, 5rem)',
              color: 'var(--foreground)',
              animation: 'hero-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0.1s',
            }}
          >
            {headline}
          </h1>

          {/* Subheadline */}
          {subheadline && (
            <p
              className="mt-5 md:mt-6 text-lg md:text-xl leading-relaxed max-w-xl"
              style={{
                color: 'var(--muted-foreground)',
                animation: 'hero-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.25s',
              }}
            >
              {subheadline}
            </p>
          )}

          {/* CTAs */}
          {(ctaText || secondaryCtaText) && (
            <div
              className="mt-8 md:mt-10 flex flex-wrap items-center gap-4"
              style={{
                animation: 'hero-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.4s',
              }}
            >
              {/* Primary CTA */}
              {ctaText && (
                <a
                  href={ctaHref}
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
                    color: 'var(--background)',
                    // ring offset inherits background
                    ['--tw-ring-color' as string]: 'var(--primary)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {ctaText}
                </a>
              )}

              {/* Secondary CTA (ghost) */}
              {secondaryCtaText && (
                <a
                  href={secondaryCtaHref}
                  className={cn(
                    'inline-flex items-center justify-center',
                    'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
                    'border transition-all duration-200',
                    'hover:brightness-110',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'active:scale-[0.98]',
                  )}
                  style={{
                    color: 'var(--foreground)',
                    borderColor: 'var(--foreground)',
                    backgroundColor: 'transparent',
                    ['--tw-ring-color' as string]: 'var(--foreground)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {secondaryCtaText}
                </a>
              )}
            </div>
          )}
        </div>

        {/* ---- Scroll indicator ---- */}
        <ScrollIndicator />
      </section>
    </>
  );
}
