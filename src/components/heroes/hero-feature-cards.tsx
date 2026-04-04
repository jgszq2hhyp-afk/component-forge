// @version 1.0.0
// @category heroes
// @name hero-feature-cards
// @source https://dev.to/vaibhavg/shadcn-hero-sections-37af, https://www.shadcn.io/blocks/hero-feature-comparison

'use client';

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HeroFeatureCardsProps {
  badgeText?: string;
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  features: FeatureCard[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hfc-fade-up {
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

@keyframes hfc-card-in {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hfc-fade-up {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes hfc-card-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroFeatureCards({
  badgeText,
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  features,
  className,
}: HeroFeatureCardsProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        className={cn(
          'relative overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="mx-auto max-w-6xl">
          {/* Top: centered headline area */}
          <div className="text-center max-w-3xl mx-auto">
            {badgeText && (
              <span
                className={cn(
                  'mb-6 inline-flex items-center rounded-full px-4 py-1.5',
                  'text-xs font-medium tracking-wide uppercase',
                )}
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--primary) 10%, transparent)',
                  color: 'var(--primary)',
                  animation: 'hfc-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: '0.05s',
                }}
              >
                {badgeText}
              </span>
            )}

            <h1
              className="font-bold tracking-tight leading-[1.08]"
              style={{
                fontSize: 'clamp(2.25rem, 4.5vw + 1rem, 4.25rem)',
                color: 'var(--foreground)',
                animation: 'hfc-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.15s',
              }}
            >
              {headline}
            </h1>

            {subheadline && (
              <p
                className="mx-auto mt-5 md:mt-6 text-lg md:text-xl leading-relaxed max-w-xl"
                style={{
                  color: 'var(--muted-foreground)',
                  animation: 'hfc-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: '0.3s',
                }}
              >
                {subheadline}
              </p>
            )}

            {ctaText && (
              <div
                className="mt-8 md:mt-10"
                style={{
                  animation: 'hfc-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: '0.45s',
                }}
              >
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
              </div>
            )}
          </div>

          {/* Feature cards grid */}
          <div
            className={cn(
              'mt-14 md:mt-20 grid gap-5',
              features.length <= 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
            )}
          >
            {features.map((feature, i) => (
              <div
                key={i}
                className={cn(
                  'group relative rounded-xl p-6',
                  'transition-all duration-300',
                  'hover:-translate-y-1',
                )}
                style={{
                  backgroundColor: 'color-mix(in srgb, var(--foreground) 3%, var(--background))',
                  border: '1px solid color-mix(in srgb, var(--foreground) 8%, transparent)',
                  animation: 'hfc-card-in 0.7s cubic-bezier(0.16, 1, 0.3, 1) both',
                  animationDelay: `${0.6 + i * 0.1}s`,
                }}
              >
                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--primary) 8%, transparent), transparent 70%)',
                  }}
                  aria-hidden="true"
                />

                {/* Icon */}
                <div
                  className="relative mb-4 inline-flex items-center justify-center size-10 rounded-lg"
                  style={{
                    backgroundColor: 'color-mix(in srgb, var(--primary) 12%, transparent)',
                    color: 'var(--primary)',
                  }}
                >
                  {feature.icon}
                </div>

                {/* Text */}
                <h3
                  className="relative text-base font-semibold"
                  style={{ color: 'var(--foreground)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="relative mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
