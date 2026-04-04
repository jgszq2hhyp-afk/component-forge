// @version 1.0.0
// @category heroes
// @name hero-video-background
// @source https://www.shadcnblocks.com/blocks/hero, https://bundui.io/blocks/marketing/hero-sections

'use client';

import { cn } from '@/lib/utils';
import { useRef, useState } from 'react';

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
    filter: blur(6px);
    transform: translateY(28px);
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
    transform: scale(1.5);
    opacity: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hvb-fade-up {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes hvb-pulse-ring {
    0%, 100% { opacity: 0; }
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
  overlayOpacity = 0.55,
  className,
}: HeroVideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  function toggleVideo() {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
      setIsPaused(false);
    } else {
      video.pause();
      setIsPaused(true);
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        className={cn(
          'relative min-h-[90vh] flex items-center justify-center overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          className,
        )}
      >
        {/* Video background */}
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

        {/* Dark overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: `color-mix(in srgb, var(--background) ${overlayOpacity * 100}%, transparent)`,
          }}
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 max-w-3xl text-center">
          <h1
            className="font-bold tracking-tight leading-[1.08]"
            style={{
              fontSize: 'clamp(2.5rem, 5vw + 1rem, 5rem)',
              color: 'var(--foreground)',
              animation: 'hvb-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
              animationDelay: '0.1s',
            }}
          >
            {headline}
          </h1>

          {subheadline && (
            <p
              className="mx-auto mt-5 md:mt-6 text-lg md:text-xl leading-relaxed max-w-xl"
              style={{
                color: 'var(--muted-foreground)',
                animation: 'hvb-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.25s',
              }}
            >
              {subheadline}
            </p>
          )}

          {(ctaText || secondaryCtaText) && (
            <div
              className="mt-8 md:mt-10 flex flex-wrap items-center justify-center gap-4"
              style={{
                animation: 'hvb-fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: '0.4s',
              }}
            >
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
                    'inline-flex items-center justify-center',
                    'rounded-lg px-7 py-3.5 text-[0.9375rem] font-semibold',
                    'border backdrop-blur-sm transition-all duration-200',
                    'hover:brightness-110',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'active:scale-[0.98]',
                  )}
                  style={{
                    color: 'var(--foreground)',
                    borderColor: 'var(--foreground)',
                    backgroundColor: 'color-mix(in srgb, var(--background) 20%, transparent)',
                    ['--tw-ring-color' as string]: 'var(--foreground)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {secondaryCtaText}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Pause/play toggle */}
        <button
          onClick={toggleVideo}
          className={cn(
            'absolute bottom-6 right-6 z-10',
            'flex items-center justify-center size-10 rounded-full',
            'backdrop-blur-md transition-all duration-200',
            'hover:scale-110',
            'focus-visible:outline-none focus-visible:ring-2',
          )}
          style={{
            backgroundColor: 'color-mix(in srgb, var(--background) 40%, transparent)',
            color: 'var(--foreground)',
            ['--tw-ring-color' as string]: 'var(--primary)',
          }}
          aria-label={isPaused ? 'Play background video' : 'Pause background video'}
        >
          {isPaused ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <path d="M4 2.5l10 5.5-10 5.5V2.5z" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
              <rect x="3" y="2" width="4" height="12" rx="1" />
              <rect x="9" y="2" width="4" height="12" rx="1" />
            </svg>
          )}
        </button>

        {/* Pulse ring around button */}
        <div
          className="absolute bottom-6 right-6 size-10 rounded-full pointer-events-none"
          style={{
            border: '2px solid var(--primary)',
            animation: 'hvb-pulse-ring 2s ease-out infinite',
          }}
          aria-hidden="true"
        />
      </section>
    </>
  );
}
