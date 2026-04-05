"use client"

// @version 2.0.0
// @category heroes
// @name hero-gradient-animated
// @source https://ui.aceternity.com/components/background-gradient-animation

'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ANIMATION_DURATION = '0.9s';
const ANIMATION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const FADE_UP_TRANSLATE_Y = '24px';
const FADE_UP_BLUR = '6px';
const BLOB_BLUR = '80px';
const BLOB_SIZE = '50%';
const INTERACTIVE_BLOB_SIZE = '40%';
const BLOB_OPACITY = 0.25;
const INTERACTIVE_BLOB_OPACITY = 0.15;
const BLOB_TOP_START = 15;
const BLOB_TOP_STEP = 12;
const BLOB_LEFT_START = 10;
const BLOB_LEFT_STEP = 15;
const HEADLINE_DELAY = '0.15s';
const SUBHEADLINE_DELAY = '0.3s';
const CTA_DELAY = '0.45s';
const HEADING_CLAMP = 'clamp(2.5rem, 5vw + 1rem, 5rem)';
const SUBHEADLINE_CLAMP = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroGradientAnimatedProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  interactive?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hga-move-horizontal {
  0%   { transform: translateX(-50%) translateY(-10%); }
  50%  { transform: translateX(50%) translateY(10%); }
  100% { transform: translateX(-50%) translateY(-10%); }
}

@keyframes hga-move-circle {
  0%   { transform: rotate(0deg); }
  50%  { transform: rotate(180deg); }
  100% { transform: rotate(360deg); }
}

@keyframes hga-move-vertical {
  0%   { transform: translateY(-50%); }
  50%  { transform: translateY(50%); }
  100% { transform: translateY(-50%); }
}

@keyframes hga-fade-up {
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

@media (prefers-reduced-motion: reduce) {
  @keyframes hga-move-horizontal {
    0%, 50%, 100% { transform: translateX(0) translateY(0); }
  }
  @keyframes hga-move-circle {
    0%, 50%, 100% { transform: rotate(0deg); }
  }
  @keyframes hga-move-vertical {
    0%, 50%, 100% { transform: translateY(0); }
  }
  @keyframes hga-fade-up {
    from { opacity: 1; transform: none; filter: none; }
    to   { opacity: 1; transform: none; filter: none; }
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Gradient blob config
// ---------------------------------------------------------------------------

interface BlobConfig {
  animation: string;
  duration: string;
  cssVar: string;
}

const blobs: BlobConfig[] = [
  { animation: 'hga-move-vertical', duration: '30s', cssVar: '--hga-first' },
  { animation: 'hga-move-circle', duration: '20s', cssVar: '--hga-second' },
  { animation: 'hga-move-horizontal', duration: '40s', cssVar: '--hga-third' },
  { animation: 'hga-move-circle', duration: '25s', cssVar: '--hga-fourth' },
  { animation: 'hga-move-vertical', duration: '35s', cssVar: '--hga-fifth' },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroGradientAnimated({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  interactive = true,
  className,
}: HeroGradientAnimatedProps) {
  const interactiveRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!interactive) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    if (prefersReducedMotion) return;

    function handleMouseMove(e: MouseEvent) {
      if (!interactiveRef.current) return;
      const rect =
        interactiveRef.current.parentElement?.getBoundingClientRect();
      if (!rect) return;
      interactiveRef.current.style.transform = `translate(${e.clientX - rect.left - rect.width / 2}px, ${e.clientY - rect.top - rect.height / 2}px)`;
    }

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [interactive]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label="Hero with animated gradient"
        className={cn(
          'relative min-h-[90vh] flex items-center justify-center overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          className,
        )}
        style={
          {
            '--hga-first': 'var(--primary)',
            '--hga-second':
              'color-mix(in srgb, var(--primary) 60%, var(--background))',
            '--hga-third':
              'color-mix(in srgb, var(--primary) 40%, var(--foreground) 10%)',
            '--hga-fourth':
              'color-mix(in srgb, var(--primary) 80%, var(--background))',
            '--hga-fifth':
              'color-mix(in srgb, var(--primary) 30%, var(--background))',
            backgroundColor: 'var(--background)',
          } as React.CSSProperties
        }
      >
        <div
          className="absolute inset-0"
          style={{ filter: `blur(${BLOB_BLUR})` }}
          aria-hidden="true"
        >
          {blobs.map((blob, i) => (
            <div
              key={blob.cssVar}
              className="absolute rounded-full mix-blend-hard-light"
              style={{
                width: BLOB_SIZE,
                height: BLOB_SIZE,
                top: `${BLOB_TOP_START + i * BLOB_TOP_STEP}%`,
                left: `${BLOB_LEFT_START + i * BLOB_LEFT_STEP}%`,
                backgroundColor: `var(${blob.cssVar})`,
                opacity: BLOB_OPACITY,
                animation: `${blob.animation} ${blob.duration} ease-in-out infinite`,
              }}
            />
          ))}

          {interactive && (
            <div
              ref={interactiveRef}
              className="absolute top-1/2 left-1/2 rounded-full mix-blend-hard-light transition-transform duration-300 ease-out motion-reduce:transition-none"
              style={{
                width: INTERACTIVE_BLOB_SIZE,
                height: INTERACTIVE_BLOB_SIZE,
                backgroundColor: 'var(--hga-first)',
                opacity: INTERACTIVE_BLOB_OPACITY,
              }}
            />
          )}
        </div>

        <article className="relative z-10 max-w-3xl text-center">
          <h1
            className="font-bold tracking-tight leading-[1.08]"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
              animation: `hga-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
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
                animation: `hga-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                animationDelay: SUBHEADLINE_DELAY,
              }}
            >
              {subheadline}
            </p>
          )}

          {(ctaText || secondaryCtaText) && (
            <nav
              aria-label="Hero actions"
              className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4"
              style={{
                animation: `hga-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
                animationDelay: CTA_DELAY,
              }}
            >
              {ctaText && (
                <a
                  href={ctaHref}
                  className={cn(
                    'inline-flex items-center justify-center',
                    'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
                    'backdrop-blur-sm transition-all duration-200 motion-reduce:transition-none',
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
                    'border backdrop-blur-md transition-all duration-200 motion-reduce:transition-none',
                    'hover:brightness-110',
                    FOCUS_RING,
                    'active:scale-[0.98] motion-reduce:active:scale-100',
                  )}
                  style={{
                    color: 'var(--foreground)',
                    borderColor: 'color-mix(in srgb, var(--foreground) 30%, transparent)',
                    backgroundColor:
                      'color-mix(in srgb, var(--background) 30%, transparent)',
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
