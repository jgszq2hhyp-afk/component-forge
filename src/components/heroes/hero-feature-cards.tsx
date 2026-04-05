// @version 2.0.0
// @category heroes
// @name hero-feature-cards
// @source https://dev.to/vaibhavg/shadcn-hero-sections-37af, https://www.shadcn.io/blocks/hero-feature-comparison

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ANIMATION_DURATION = '0.9s';
const ANIMATION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const CARD_ANIMATION_DURATION = '0.7s';
const FADE_UP_TRANSLATE_Y = '24px';
const FADE_UP_BLUR = '4px';
const CARD_TRANSLATE_Y = '20px';
const CARD_SCALE_START = '0.96';
const BADGE_DELAY = '0.05s';
const HEADLINE_DELAY = '0.15s';
const SUBHEADLINE_DELAY = '0.3s';
const CTA_DELAY = '0.45s';
const CARD_BASE_DELAY = 0.6;
const CARD_STAGGER = 0.1;
const ICON_SIZE = 'size-10';
const HEADING_CLAMP = 'clamp(2.25rem, 4.5vw + 1rem, 4.25rem)';
const SUBHEADLINE_CLAMP = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)';
const CTA_FONT_SIZE = '0.9375rem';
const ACTIVE_SCALE = '0.98';
const CARD_BG_MIX = '3%';
const CARD_BORDER_MIX = '8%';
const ICON_BG_MIX = '12%';
const GLOW_MIX = '8%';
const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

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
    filter: blur(${FADE_UP_BLUR});
    transform: translateY(${FADE_UP_TRANSLATE_Y});
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
    transform: translateY(${CARD_TRANSLATE_Y}) scale(${CARD_SCALE_START});
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hfc-fade-up {
    from, to { opacity: 1; transform: none; filter: none; }
  }
  @keyframes hfc-card-in {
    from, to { opacity: 1; transform: none; }
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
        aria-label="Hero with feature cards"
        className={cn(
          'relative overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="mx-auto max-w-6xl">
          <header className="text-center max-w-3xl mx-auto">
            {badgeText && (
              <span
                className={cn(
                  'mb-6 inline-flex items-center rounded-full px-4 py-1.5',
                  'text-xs font-medium tracking-wide uppercase',
                )}
                style={{
                  backgroundColor: `color-mix(in srgb, var(--primary) 10%, transparent)`,
                  color: 'var(--primary)',
                  animation: `hfc-fade-up 0.8s ${ANIMATION_EASING} both`,
                  animationDelay: BADGE_DELAY,
                }}
              >
                {badgeText}
              </span>
            )}

            <h1
              className="font-bold tracking-tight leading-[1.08]"
              style={{
                fontSize: HEADING_CLAMP,
                color: 'var(--foreground)',
                animation: `hfc-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                animationDelay: HEADLINE_DELAY,
              }}
            >
              {headline}
            </h1>

            {subheadline && (
              <p
                className="mx-auto mt-5 md:mt-6 leading-relaxed max-w-xl"
                style={{
                  fontSize: SUBHEADLINE_CLAMP,
                  color: 'var(--muted-foreground)',
                  animation: `hfc-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                  animationDelay: SUBHEADLINE_DELAY,
                }}
              >
                {subheadline}
              </p>
            )}

            {ctaText && (
              <div
                className="mt-8 md:mt-10"
                style={{
                  animation: `hfc-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                  animationDelay: CTA_DELAY,
                }}
              >
                <a
                  href={ctaHref}
                  className={cn(
                    'inline-flex items-center justify-center',
                    `rounded-lg px-7 py-3.5 text-[${CTA_FONT_SIZE}] font-semibold`,
                    'transition-all duration-200 motion-reduce:transition-none',
                    'hover:brightness-110 hover:shadow-lg',
                    FOCUS_RING,
                    `active:scale-[${ACTIVE_SCALE}] motion-reduce:active:scale-100`,
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
              </div>
            )}
          </header>

          {/* Feature cards grid */}
          <ul
            className={cn(
              'mt-14 md:mt-20 grid gap-5 list-none p-0',
              features.length <= 3
                ? 'grid-cols-1 sm:grid-cols-3'
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
            )}
            role="list"
          >
            {features.map((feature, i) => (
              <li
                key={i}
                className={cn(
                  'group relative rounded-xl p-6',
                  'transition-all duration-300 motion-reduce:transition-none',
                  'hover:-translate-y-1 motion-reduce:hover:translate-y-0',
                )}
                style={{
                  backgroundColor: `color-mix(in srgb, var(--foreground) ${CARD_BG_MIX}, var(--background))`,
                  border: `1px solid color-mix(in srgb, var(--foreground) ${CARD_BORDER_MIX}, transparent)`,
                  animation: `hfc-card-in ${CARD_ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                  animationDelay: `${CARD_BASE_DELAY + i * CARD_STAGGER}s`,
                }}
              >
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 motion-reduce:hidden"
                  style={{
                    background:
                      `radial-gradient(circle at 50% 0%, color-mix(in srgb, var(--primary) ${GLOW_MIX}, transparent), transparent 70%)`,
                  }}
                  aria-hidden="true"
                />

                <div
                  className={`relative mb-4 inline-flex items-center justify-center ${ICON_SIZE} rounded-lg`}
                  style={{
                    backgroundColor: `color-mix(in srgb, var(--primary) ${ICON_BG_MIX}, transparent)`,
                    color: 'var(--primary)',
                  }}
                  aria-hidden="true"
                >
                  {feature.icon}
                </div>

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
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
