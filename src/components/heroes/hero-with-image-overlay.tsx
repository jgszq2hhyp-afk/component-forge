// @version 2.0.0
// @category heroes
// @name hero-with-image-overlay
// @source https://tailwindcss.com/plus/ui-blocks/marketing/sections/heroes

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ANIMATION_DURATION = '0.9s';
const ANIMATION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const SCALE_IN_DURATION = '1.5s';
const FADE_UP_TRANSLATE_Y = '20px';
const FADE_UP_BLUR = '4px';
const SCALE_IN_START = '1.08';
const HEADLINE_DELAY = '0.2s';
const SUBHEADLINE_DELAY = '0.35s';
const CTA_DELAY = '0.5s';
const DEFAULT_OVERLAY_OPACITY = 0.5;
const GRADIENT_FADE_STOP = '60%';
const HEADING_CLAMP = 'clamp(2.25rem, 5vw + 1rem, 4.5rem)';
const SUBHEADLINE_CLAMP = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroWithImageOverlayProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  imageSrc: string;
  imageAlt: string;
  overlayOpacity?: number;
  contentPosition?: 'center' | 'left' | 'bottom-left';
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hio-fade-up {
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

@keyframes hio-scale-in {
  from {
    transform: scale(${SCALE_IN_START});
  }
  to {
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hio-fade-up {
    from { opacity: 1; transform: none; filter: none; }
    to   { opacity: 1; transform: none; filter: none; }
  }
  @keyframes hio-scale-in {
    from { transform: scale(1); }
    to   { transform: scale(1); }
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Position mapping
// ---------------------------------------------------------------------------

const positionClasses: Record<
  NonNullable<HeroWithImageOverlayProps['contentPosition']>,
  string
> = {
  center: 'items-center justify-center text-center',
  left: 'items-start justify-center text-left',
  'bottom-left': 'items-end justify-end text-left pb-8 md:pb-16',
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroWithImageOverlay({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  imageSrc,
  imageAlt,
  overlayOpacity = DEFAULT_OVERLAY_OPACITY,
  contentPosition = 'center',
  className,
}: HeroWithImageOverlayProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label="Hero with image overlay"
        className={cn(
          'relative flex min-h-[85vh] overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          positionClasses[contentPosition],
          className,
        )}
      >
        <div
          className="absolute inset-0"
          style={{
            animation: `hio-scale-in ${SCALE_IN_DURATION} ${ANIMATION_EASING} both`,
          }}
          aria-hidden="true"
        >
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>

        <div
          className="absolute inset-0"
          style={{
            background:
              contentPosition === 'bottom-left'
                ? `linear-gradient(to top, color-mix(in srgb, var(--background) ${overlayOpacity * 100}%, transparent), transparent ${GRADIENT_FADE_STOP})`
                : `color-mix(in srgb, var(--background) ${overlayOpacity * 100}%, transparent)`,
          }}
          aria-hidden="true"
        />

        <article
          className={cn(
            'relative z-10',
            contentPosition === 'center' ? 'max-w-3xl' : 'max-w-2xl',
          )}
        >
          <h1
            className="font-bold tracking-tight leading-[1.08]"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
              animation: `hio-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
              animationDelay: HEADLINE_DELAY,
            }}
          >
            {headline}
          </h1>

          {subheadline && (
            <p
              className={cn(
                'mt-5 md:mt-6 leading-relaxed',
                contentPosition === 'center'
                  ? 'mx-auto max-w-xl'
                  : 'max-w-lg',
              )}
              style={{
                fontSize: SUBHEADLINE_CLAMP,
                color: 'var(--muted-foreground)',
                animation: `hio-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                animationDelay: SUBHEADLINE_DELAY,
              }}
            >
              {subheadline}
            </p>
          )}

          {(ctaText || secondaryCtaText) && (
            <nav
              aria-label="Hero actions"
              className={cn(
                'mt-8 md:mt-10 flex flex-wrap gap-4',
                contentPosition === 'center'
                  ? 'items-center justify-center'
                  : 'items-center',
              )}
              style={{
                animation: `hio-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                animationDelay: CTA_DELAY,
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
                    'border backdrop-blur-sm transition-all duration-200 motion-reduce:transition-none',
                    'hover:brightness-110',
                    FOCUS_RING,
                    'active:scale-[0.98] motion-reduce:active:scale-100',
                  )}
                  style={{
                    color: 'var(--foreground)',
                    borderColor: 'var(--border)',
                    backgroundColor:
                      'color-mix(in srgb, var(--background) 15%, transparent)',
                    ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {secondaryCtaText}
                </a>
              )}
            </nav>
          )}
        </article>
      </section>
    </>
  );
}
