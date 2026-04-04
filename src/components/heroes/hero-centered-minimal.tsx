// @version 1.0.0
// @category heroes
// @name hero-centered-minimal
// @source https://tailwindcss.com/plus/ui-blocks/marketing/sections/heroes

import { cn } from '@/lib/utils';

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
// Component (server component — no interactivity needed)
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
      className={cn(
        'relative flex min-h-[75vh] flex-col items-center justify-center',
        'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
        'text-center',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Subtle radial glow behind headline */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[60%] w-[80%] rounded-full"
        style={{
          background:
            'radial-gradient(ellipse at center, color-mix(in srgb, var(--primary) 8%, transparent), transparent 70%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl">
        {/* Badge */}
        {badgeText && (
          <span
            className={cn(
              'mb-6 inline-flex items-center rounded-full px-4 py-1.5',
              'text-xs font-medium tracking-wide uppercase',
            )}
            style={{
              backgroundColor: 'color-mix(in srgb, var(--primary) 12%, transparent)',
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
            fontSize: 'clamp(2.5rem, 5vw + 1rem, 4.5rem)',
            color: 'var(--foreground)',
          }}
        >
          {headline}
        </h1>

        {/* Subheadline */}
        {subheadline && (
          <p
            className="mx-auto mt-5 md:mt-6 text-lg md:text-xl leading-relaxed max-w-xl"
            style={{ color: 'var(--muted-foreground)' }}
          >
            {subheadline}
          </p>
        )}

        {/* CTAs */}
        {(ctaText || secondaryCtaText) && (
          <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4">
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
                  color: 'var(--primary-foreground)',
                  ['--tw-ring-color' as string]: 'var(--primary)',
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
                  'transition-colors duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                )}
                style={{
                  color: 'var(--muted-foreground)',
                  ['--tw-ring-color' as string]: 'var(--primary)',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                {secondaryCtaText}
                <svg
                  className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
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
          </div>
        )}
      </div>
    </section>
  );
}
