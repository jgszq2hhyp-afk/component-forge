// @version 2.0.0
// @category heroes
// @name hero-saas-landing
// @source https://dev.to/vaibhavg/shadcn-hero-sections-37af, https://prebuiltui.com/components/hero-section

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const FADE_DURATION = '0.9s';
const SLIDE_DURATION = '1s';
const EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const BADGE_DELAY = '0.05s';
const HEADLINE_DELAY = '0.15s';
const SUBHEADLINE_DELAY = '0.3s';
const CTA_DELAY = '0.45s';
const SOCIAL_PROOF_DELAY = '0.6s';
const SCREENSHOT_DELAY = '0.7s';
const MAX_AVATARS = 5;
const HEADING_CLAMP = 'clamp(2.25rem, 4.5vw + 1rem, 4.5rem)';
const ACTIVE_SCALE = '0.98';
const CTA_FONT_SIZE = '0.9375rem';
const SCREENSHOT_WIDTH = 1200;
const SCREENSHOT_HEIGHT = 720;
const AVATAR_SIZE = 32;
const FADE_UP_BLUR = '4px';
const FADE_UP_TRANSLATE_Y = '24px';
const SLIDE_UP_TRANSLATE_Y = '60px';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AvatarItem {
  src: string;
  alt: string;
}

interface HeroSaasLandingProps {
  badgeText?: string;
  headline: string;
  highlightedWord?: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  avatars?: AvatarItem[];
  socialProofText?: string;
  screenshotSrc?: string;
  screenshotAlt?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hsl-fade-up {
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

@keyframes hsl-slide-up {
  from {
    opacity: 0;
    transform: translateY(${SLIDE_UP_TRANSLATE_Y});
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hsl-fade-up {
    from, to { opacity: 1; transform: none; filter: none; }
  }
  @keyframes hsl-slide-up {
    from, to { opacity: 1; transform: none; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroSaasLanding({
  badgeText,
  headline,
  highlightedWord,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  avatars = [],
  socialProofText,
  screenshotSrc,
  screenshotAlt = 'Product screenshot',
  className,
}: HeroSaasLandingProps) {
  const renderedHeadline = highlightedWord
    ? headline.split(highlightedWord).map((part, i, arr) =>
        i < arr.length - 1 ? (
          <span key={i}>
            {part}
            <span style={{ color: 'var(--primary)' }}>{highlightedWord}</span>
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )
    : headline;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label="SaaS product hero"
        className={cn(
          'relative overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-32',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Glow decoration */}
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-80 w-[60%] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, color-mix(in srgb, var(--primary) 15%, transparent), transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 mx-auto max-w-5xl text-center">
          {/* Badge */}
          {badgeText && (
            <div
              className="mb-6"
              style={{
                animation: `hsl-fade-up 0.8s ${EASING} both`,
                animationDelay: BADGE_DELAY,
              }}
            >
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full px-4 py-1.5',
                  'text-xs font-medium tracking-wide',
                  'border',
                )}
                style={{
                  color: 'var(--primary)',
                  borderColor: 'color-mix(in srgb, var(--primary) 30%, transparent)',
                  backgroundColor: 'color-mix(in srgb, var(--primary) 8%, transparent)',
                }}
              >
                <span
                  className="size-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--primary)' }}
                  aria-hidden="true"
                />
                {badgeText}
              </span>
            </div>
          )}

          {/* Headline */}
          <h1
            className="font-bold tracking-tight leading-[1.08]"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
              animation: `hsl-fade-up ${FADE_DURATION} ${EASING} both`,
              animationDelay: HEADLINE_DELAY,
            }}
          >
            {renderedHeadline}
          </h1>

          {/* Subheadline */}
          {subheadline && (
            <p
              className="mx-auto mt-5 md:mt-6 leading-relaxed max-w-2xl"
              style={{
                fontSize: 'clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)',
                color: 'var(--muted-foreground)',
                animation: `hsl-fade-up ${FADE_DURATION} ${EASING} both`,
                animationDelay: SUBHEADLINE_DELAY,
              }}
            >
              {subheadline}
            </p>
          )}

          {/* CTAs */}
          {(ctaText || secondaryCtaText) && (
            <nav
              aria-label="Call to action"
              className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4"
              style={{
                animation: `hsl-fade-up ${FADE_DURATION} ${EASING} both`,
                animationDelay: CTA_DELAY,
              }}
            >
              {ctaText && (
                <a
                  href={ctaHref}
                  className={cn(
                    'inline-flex items-center justify-center',
                    `rounded-lg px-7 py-3.5 text-[${CTA_FONT_SIZE}] font-semibold`,
                    'transition-all duration-200 motion-reduce:transition-none',
                    'hover:brightness-110 hover:shadow-lg',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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
              )}

              {secondaryCtaText && (
                <a
                  href={secondaryCtaHref}
                  className={cn(
                    'inline-flex items-center justify-center',
                    `rounded-lg px-7 py-3.5 text-[${CTA_FONT_SIZE}] font-semibold`,
                    'border transition-all duration-200 motion-reduce:transition-none',
                    'hover:brightness-110',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    `active:scale-[${ACTIVE_SCALE}] motion-reduce:active:scale-100`,
                  )}
                  style={{
                    color: 'var(--foreground)',
                    borderColor: 'color-mix(in srgb, var(--foreground) 20%, transparent)',
                    ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {secondaryCtaText}
                </a>
              )}
            </nav>
          )}

          {/* Social proof -- avatar stack */}
          {(avatars.length > 0 || socialProofText) && (
            <figure
              className="mt-8 flex items-center justify-center gap-3"
              style={{
                animation: `hsl-fade-up 0.8s ${EASING} both`,
                animationDelay: SOCIAL_PROOF_DELAY,
              }}
            >
              {avatars.length > 0 && (
                <div className="flex -space-x-2" role="group" aria-label="User avatars">
                  {avatars.slice(0, MAX_AVATARS).map((avatar, i) => (
                    <Image
                      key={i}
                      src={avatar.src}
                      alt={avatar.alt}
                      width={AVATAR_SIZE}
                      height={AVATAR_SIZE}
                      className="size-8 rounded-full object-cover ring-2"
                      style={{
                        ['--tw-ring-color' as string]: 'var(--background)',
                      }}
                    />
                  ))}
                </div>
              )}
              {socialProofText && (
                <figcaption
                  className="text-sm font-medium"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {socialProofText}
                </figcaption>
              )}
            </figure>
          )}

          {/* Product screenshot */}
          {screenshotSrc && (
            <figure
              className="mt-14 md:mt-20 relative"
              style={{
                animation: `hsl-slide-up ${SLIDE_DURATION} ${EASING} both`,
                animationDelay: SCREENSHOT_DELAY,
              }}
            >
              <div
                className="overflow-hidden rounded-xl md:rounded-2xl"
                style={{
                  border: '1px solid color-mix(in srgb, var(--foreground) 10%, transparent)',
                  boxShadow:
                    '0 20px 60px -12px color-mix(in srgb, var(--foreground) 15%, transparent)',
                }}
              >
                <Image
                  src={screenshotSrc}
                  alt={screenshotAlt}
                  width={SCREENSHOT_WIDTH}
                  height={SCREENSHOT_HEIGHT}
                  className="w-full h-auto"
                />
              </div>
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 md:h-32"
                style={{
                  background: `linear-gradient(to top, var(--background), transparent)`,
                }}
                aria-hidden="true"
              />
            </figure>
          )}
        </div>
      </section>
    </>
  );
}
