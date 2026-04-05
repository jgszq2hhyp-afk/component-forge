// @version 2.0.0
// @category heroes
// @name hero-split-image
// @score 92
// @csv-refs landing:1, products:general

import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HERO_MIN_HEIGHT = '70vh';
const CONTENT_MAX_WIDTH = '80rem';
const SUBHEADLINE_MAX_WIDTH = '32rem';
const ANIMATION_DURATION = '0.9s';
const FADE_DURATION = '0.8s';
const ANIMATION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const DELAY_TEXT = '0.1s';
const DELAY_SUBHEADLINE = '0.3s';
const DELAY_CTA = '0.5s';
const DELAY_IMAGE = '0.25s';
const HEADING_CLAMP = 'clamp(2.25rem, 4vw + 1rem, 4.25rem)';
const SUBHEADLINE_CLAMP = 'clamp(1.125rem, 1vw + 0.75rem, 1.25rem)';
const IMAGE_SHADOW_MIX = '8%';
const ARROW_ICON_SIZE = 16;
const ARROW_STROKE_WIDTH = 1.5;
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroSplitImageProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  imageSrc: string;
  imageAlt: string;
  reversed?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles (injected once via <style>)
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hero-split-slide-left {
  from {
    opacity: 0;
    filter: blur(4px);
    transform: translateX(-48px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateX(0);
  }
}

@keyframes hero-split-slide-right {
  from {
    opacity: 0;
    filter: blur(4px);
    transform: translateX(48px);
  }
  to {
    opacity: 1;
    filter: blur(0px);
    transform: translateX(0);
  }
}

@keyframes hero-split-fade-up {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hero-split-slide-left {
    from { opacity: 1; transform: none; filter: none; }
    to   { opacity: 1; transform: none; filter: none; }
  }
  @keyframes hero-split-slide-right {
    from { opacity: 1; transform: none; filter: none; }
    to   { opacity: 1; transform: none; filter: none; }
  }
  @keyframes hero-split-fade-up {
    from { opacity: 1; transform: none; }
    to   { opacity: 1; transform: none; }
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroSplitImage({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  imageSrc,
  imageAlt,
  reversed = false,
  className,
}: HeroSplitImageProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label="Hero"
        className={cn(
          'relative',
          'px-6 py-16 md:px-12 md:py-24 lg:px-20 lg:py-32',
          className,
        )}
        style={{
          minHeight: HERO_MIN_HEIGHT,
          backgroundColor: 'var(--background)',
        }}
      >
        <div
          className={cn(
            'mx-auto grid grid-cols-1 items-center gap-8',
            'lg:grid-cols-2 lg:gap-16',
          )}
          style={{ maxWidth: CONTENT_MAX_WIDTH }}
        >
          <div
            className={cn(
              'flex flex-col justify-center',
              reversed && 'lg:order-last',
            )}
            style={{
              animation: `hero-split-slide-left ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
              animationDelay: DELAY_TEXT,
            }}
          >
            <h1
              className="font-bold tracking-tight leading-[1.08]"
              style={{
                fontSize: HEADING_CLAMP,
                color: 'var(--foreground)',
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
                  animation: `hero-split-fade-up ${FADE_DURATION} ${ANIMATION_EASING} both`,
                  animationDelay: DELAY_SUBHEADLINE,
                }}
              >
                {subheadline}
              </p>
            )}

            {ctaText && (
              <nav
                aria-label="Hero actions"
                className="mt-8 md:mt-10"
                style={{
                  animation: `hero-split-fade-up ${FADE_DURATION} ${ANIMATION_EASING} both`,
                  animationDelay: DELAY_CTA,
                }}
              >
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
                  <svg
                    className="ml-2 size-4"
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
              </nav>
            )}
          </div>

          <figure
            className={cn(
              'relative overflow-hidden rounded-2xl',
              reversed && 'lg:order-first',
            )}
            style={{
              animation: `hero-split-slide-right ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
              animationDelay: DELAY_IMAGE,
              boxShadow: `0 8px 30px color-mix(in srgb, var(--foreground) ${IMAGE_SHADOW_MIX}, transparent)`,
            }}
          >
            <div className="relative w-full aspect-[16/9] lg:aspect-[4/3]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </div>
          </figure>
        </div>
      </section>
    </>
  );
}
