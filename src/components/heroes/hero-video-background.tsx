"use client"

// @version 2.0.0
// @category heroes
// @name hero-video-background
// @source https://www.shadcnblocks.com/blocks/hero, https://bundui.io/blocks/marketing/hero-sections

'use client';

import { cn } from '@/lib/utils';
import { useCallback, useRef, useState } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ANIMATION_DURATION = '0.9s';
const ANIMATION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const FADE_UP_TRANSLATE_Y = '28px';
const FADE_UP_BLUR = '6px';
const PULSE_RING_SCALE = '1.5';
const PULSE_RING_DURATION = '2s';
const HEADLINE_DELAY = '0.1s';
const SUBHEADLINE_DELAY = '0.25s';
const CTA_DELAY = '0.4s';
const DEFAULT_OVERLAY_OPACITY = 0.55;
const HEADING_CLAMP = 'clamp(2.5rem, 5vw + 1rem, 5rem)';
const SUBHEADLINE_CLAMP = 'clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)';
const PLAY_ICON_SIZE = 16;
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroVideoBackgroundProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  videoSrc: string;
  posterSrc?: string;
  overlayOpacity?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hvb-fade-up {
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

@keyframes hvb-pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.6;
  }
  100% {
    transform: scale(${PULSE_RING_SCALE});
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hvb-fade-up {
    from { opacity: 1; transform: none; filter: none; }
    to   { opacity: 1; transform: none; filter: none; }
  }
  @keyframes hvb-pulse-ring {
    0%, 100% { transform: scale(1); opacity: 0; }
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

export default function HeroVideoBackground({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  secondaryCtaText,
  secondaryCtaHref = '#',
  videoSrc,
  posterSrc,
  overlayOpacity = DEFAULT_OVERLAY_OPACITY,
  className,
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  const toggleVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label="Hero with video background"
        className={cn(
          'relative min-h-[90vh] flex items-center justify-center overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          className,
        )}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          poster={posterSrc}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `color-mix(in srgb, var(--background) ${overlayOpacity * 100}%, transparent)`,
          }}
          aria-hidden="true"
        />

        <article className="relative z-10 max-w-3xl text-center">
          <h1
            className="font-bold tracking-tight leading-[1.08]"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
              animation: `hvb-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
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
                animation: `hvb-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
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
                animation: `hvb-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
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
                    backgroundColor: 'color-mix(in srgb, var(--background) 20%, transparent)',
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

        <button
          onClick={toggleVideo}
          type="button"
          className={cn(
            'absolute bottom-6 right-6 z-10',
            'flex items-center justify-center size-10 rounded-full',
            'backdrop-blur-md transition-all duration-200 motion-reduce:transition-none',
            'hover:scale-110 motion-reduce:hover:scale-100',
            FOCUS_RING,
          )}
          style={{
            backgroundColor: 'color-mix(in srgb, var(--background) 40%, transparent)',
            color: 'var(--foreground)',
            ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
            ['--tw-ring-offset-color' as string]: 'var(--background)',
          }}
          aria-label={isPaused ? 'Play background video' : 'Pause background video'}
        >
          {isPaused ? (
            <svg
              width={PLAY_ICON_SIZE}
              height={PLAY_ICON_SIZE}
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M4 2.5l10 5.5-10 5.5V2.5z" />
            </svg>
          ) : (
            <svg
              width={PLAY_ICON_SIZE}
              height={PLAY_ICON_SIZE}
              viewBox="0 0 16 16"
              fill="currentColor"
              aria-hidden="true"
            >
              <rect x="3" y="2" width="4" height="12" rx="1" />
              <rect x="9" y="2" width="4" height="12" rx="1" />
            </svg>
          )}
        </button>

        <div
          className="absolute bottom-6 right-6 size-10 rounded-full pointer-events-none"
          style={{
            border: '2px solid var(--primary)',
            animation: `hvb-pulse-ring ${PULSE_RING_DURATION} ease-out infinite`,
          }}
          aria-hidden="true"
        />
      </section>
    </>
  );
}
