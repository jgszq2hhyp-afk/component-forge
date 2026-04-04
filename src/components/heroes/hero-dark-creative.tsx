// @version 1.0.0
// @category heroes
// @name hero-dark-creative
// @source https://prebuiltui.com/components/hero-section, https://www.hover.dev/components/heros

'use client';

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroDarkCreativeProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  /** Number of animated grid lines */
  gridDensity?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hdc-fade-up {
  from {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
}

@keyframes hdc-glow-pulse {
  0%, 100% { opacity: 0.4; }
  50%      { opacity: 0.8; }
}

@keyframes hdc-grid-scroll {
  from { transform: translateY(0); }
  to   { transform: translateY(60px); }
}

@keyframes hdc-line-reveal {
  from {
    transform: scaleX(0);
    opacity: 0;
  }
  to {
    transform: scaleX(1);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hdc-fade-up {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes hdc-glow-pulse {
    0%, 100% { opacity: 0.5; }
  }
  @keyframes hdc-grid-scroll {
    from, to { transform: translateY(0); }
  }
  @keyframes hdc-line-reveal {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroDarkCreative({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  gridDensity = 12,
  className,
}: HeroDarkCreativeProps) {
  const gridLines = Array.from({ length: gridDensity });

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        className={cn(
          'relative min-h-screen flex flex-col items-center justify-center overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Animated grid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ animation: 'hdc-grid-scroll 8s linear infinite' }}
          aria-hidden="true"
        >
          {/* Vertical lines */}
          {gridLines.map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px"
              style={{
                left: `${((i + 1) / (gridDensity + 1)) * 100}%`,
                backgroundColor: 'color-mix(in srgb, var(--foreground) 5%, transparent)',
              }}
            />
          ))}
          {/* Horizontal lines */}
          {gridLines.map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px"
              style={{
                top: `${((i + 1) / (gridDensity + 1)) * 100}%`,
                backgroundColor: 'color-mix(in srgb, var(--foreground) 5%, transparent)',
              }}
            />
          ))}
        </div>

        {/* Dual glow orbs */}
        <div
          className="pointer-events-none absolute top-1/4 -left-20 h-80 w-80 rounded-full"
          style={{
            background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 25%, transparent), transparent 70%)',
            animation: 'hdc-glow-pulse 6s ease-in-out infinite',
          }}
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute bottom-1/4 -right-20 h-64 w-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, color-mix(in srgb, var(--primary) 15%, transparent), transparent 70%)',
            animation: 'hdc-glow-pulse 6s ease-in-out infinite 3s',
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 max-w-4xl text-center">
          {/* Decorative line above headline */}
          <div
            className="mx-auto mb-8 h-px w-16 origin-center"
            style={{
              backgroundColor: 'var(--primary)',
              animation: 'hdc-line-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0.1s',
            }}
            aria-hidden="true"
          />

          <h1
            className="font-bold tracking-tight leading-[1.04] uppercase"
            style={{
              fontSize: 'clamp(2.5rem, 6vw + 1rem, 5.5rem)',
              color: 'var(--foreground)',
              animation: 'hdc-fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0.2s',
              letterSpacing: '-0.02em',
            }}
          >
            {headline}
          </h1>

          {subheadline && (
            <p
              className="mx-auto mt-6 md:mt-8 text-lg md:text-xl leading-relaxed max-w-2xl"
              style={{
                color: 'var(--muted-foreground)',
                animation: 'hdc-fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.4s',
              }}
            >
              {subheadline}
            </p>
          )}

          {(ctaText || secondaryCtaText) && (
            <div
              className="mt-10 md:mt-12 flex flex-wrap items-center justify-center gap-4"
              style={{
                animation: 'hdc-fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.6s',
              }}
            >
              {ctaText && (
                <a
                  href={ctaHref}
                  className={cn(
                    'group inline-flex items-center justify-center',
                    'rounded-full px-8 py-4 text-[0.9375rem] font-semibold',
                    'transition-all duration-300',
                    'hover:shadow-[0_0_24px_color-mix(in_srgb,var(--primary)_40%,transparent)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'active:scale-[0.97]',
                  )}
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                    ['--tw-ring-color' as string]: 'var(--primary)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {ctaText}
                  <svg
                    className="ml-2 size-4 transition-transform duration-300 group-hover:translate-x-1"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M3.333 8h9.334M8.667 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              )}

              {secondaryCtaText && (
                <a
                  href={secondaryCtaHref}
                  className={cn(
                    'inline-flex items-center justify-center',
                    'rounded-full px-8 py-4 text-[0.9375rem] font-semibold',
                    'border transition-all duration-300',
                    'hover:brightness-110',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'active:scale-[0.97]',
                  )}
                  style={{
                    color: 'var(--foreground)',
                    borderColor: 'color-mix(in srgb, var(--foreground) 20%, transparent)',
                    ['--tw-ring-color' as string]: 'var(--foreground)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {secondaryCtaText}
                </a>
              )}
            </div>
          )}

          {/* Decorative line below CTAs */}
          <div
            className="mx-auto mt-8 h-px w-16 origin-center"
            style={{
              backgroundColor: 'var(--primary)',
              animation: 'hdc-line-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0.8s',
            }}
            aria-hidden="true"
          />
        </div>
      </section>
    </>
  );
}
