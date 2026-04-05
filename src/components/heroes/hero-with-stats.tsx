// @version 2.0.0
// @category heroes
// @name hero-with-stats
// @source https://bundui.io/blocks/marketing/hero-sections, https://dev.to/vaibhavg/shadcn-hero-sections-37af

'use client';

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FADE_DURATION = '0.9s';
const COUNT_DURATION = '0.7s';
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const HEADLINE_DELAY = '0.1s';
const SUBHEADLINE_DELAY = '0.25s';
const CTA_DELAY = '0.4s';
const STAT_BASE_DELAY = 0.6;
const STAT_STAGGER = 0.12;
const MAX_AVATARS = 5;
const HEADING_CLAMP = 'clamp(2.5rem, 5vw + 1rem, 4.5rem)';
const ACTIVE_SCALE = '0.98';
const CTA_FONT_SIZE = '0.9375rem';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface StatItem {
  value: string;
  label: string;
}

interface HeroWithStatsProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  stats: StatItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hws-fade-up {
  from {
    opacity: 0;
    filter: blur(4px);
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateY(0);
  }
}

@keyframes hws-count-in {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(12px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hws-fade-up {
    from, to { opacity: 1; transform: none; filter: none; }
  }
  @keyframes hws-count-in {
    from, to { opacity: 1; transform: none; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroWithStats({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  stats,
  className,
}: HeroWithStatsProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label="Hero with statistics"
        className={cn(
          'relative min-h-[80vh] flex flex-col justify-center',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="mx-auto max-w-7xl w-full">
          {/* Top: Headline + CTAs */}
          <header className="max-w-3xl">
            <h1
              className="font-bold tracking-tight leading-[1.08]"
              style={{
                fontSize: HEADING_CLAMP,
                color: 'var(--foreground)',
                animation: `hws-fade-up ${FADE_DURATION} ${EASING} both`,
                animationDelay: HEADLINE_DELAY,
              }}
            >
              {headline}
            </h1>

            {subheadline && (
              <p
                className="mt-5 md:mt-6 text-lg md:text-xl leading-relaxed max-w-xl"
                style={{
                  color: 'var(--muted-foreground)',
                  animation: `hws-fade-up ${FADE_DURATION} ${EASING} both`,
                  animationDelay: SUBHEADLINE_DELAY,
                }}
              >
                {subheadline}
              </p>
            )}

            {(ctaText || secondaryCtaText) && (
              <nav
                aria-label="Call to action"
                className="mt-8 md:mt-10 flex flex-wrap items-center gap-4"
                style={{
                  animation: `hws-fade-up ${FADE_DURATION} ${EASING} both`,
                  animationDelay: CTA_DELAY,
                }}
              >
                {ctaText && (
                  <a
                    href={ctaHref}
                    className={cn(
                      'inline-flex items-center justify-center',
                      `rounded-lg px-7 py-3.5 text-[${CTA_FONT_SIZE}] font-semibold`,
                      'transition-all duration-200',
                      'hover:brightness-110 hover:shadow-lg',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      `active:scale-[${ACTIVE_SCALE}]`,
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
                      'inline-flex items-center justify-center',
                      `rounded-lg px-7 py-3.5 text-[${CTA_FONT_SIZE}] font-semibold`,
                      'border transition-all duration-200',
                      'hover:brightness-110',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      `active:scale-[${ACTIVE_SCALE}]`,
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
              </nav>
            )}
          </header>

          {/* Divider */}
          <div
            className="mt-14 md:mt-20 h-px w-full"
            style={{
              backgroundColor: 'color-mix(in srgb, var(--foreground) 10%, transparent)',
            }}
            role="separator"
            aria-hidden="true"
          />

          {/* Stats grid */}
          <dl
            className={cn(
              'mt-10 md:mt-14 grid gap-8',
              stats.length <= 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-2 sm:grid-cols-4',
            )}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col"
                style={{
                  animation: `hws-count-in ${COUNT_DURATION} ${EASING} both`,
                  animationDelay: `${STAT_BASE_DELAY + i * STAT_STAGGER}s`,
                }}
              >
                <dt className="order-2 mt-2 text-sm md:text-base" style={{ color: 'var(--muted-foreground)' }}>
                  {stat.label}
                </dt>
                <dd
                  className="order-1 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight"
                  style={{ color: 'var(--primary)' }}
                >
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
