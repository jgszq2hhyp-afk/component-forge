// @version 2.0.0
// @category heroes
// @name hero-with-video-modal
// @source self-authored

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState, useEffect, useCallback, useRef } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MODAL_FADE_DURATION = '0.2s';
const MODAL_SCALE_DURATION = '0.25s';
const BACKDROP_OPACITY = 0.8;
const OVERLAY_OPACITY = 0.7;
const HEADING_CLAMP = 'clamp(2.25rem, 5vw + 1rem, 4rem)';
const PLAY_ICON_SIZE = 48;
const CLOSE_BUTTON_SIZE = 36;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroWithVideoModalProps {
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  videoSrc: string;
  backgroundImageSrc: string;
  backgroundImageAlt?: string;
  playButtonLabel?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hero-modal-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes hero-modal-scale-in {
  from { opacity: 0; transform: scale(0.92); }
  to { opacity: 1; transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hero-modal-fade-in {
    from, to { opacity: 1; }
  }
  @keyframes hero-modal-scale-in {
    from, to { opacity: 1; transform: none; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component ('use client' -- modal open/close state)
// ---------------------------------------------------------------------------

export default function HeroWithVideoModal({
  headline,
  subheadline,
  ctaText,
  ctaHref = '#',
  videoSrc,
  backgroundImageSrc,
  backgroundImageAlt = 'Hero background',
  playButtonLabel = 'Watch video',
  className,
}: HeroWithVideoModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setIsOpen(false);
    // Return focus to trigger button on close
    triggerRef.current?.focus();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    // Focus close button when modal opens
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label="Video hero"
        className={cn(
          'relative flex min-h-[85vh] items-center justify-center overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          'text-center',
          className,
        )}
      >
        {/* Background image */}
        <Image
          src={backgroundImageSrc}
          alt={backgroundImageAlt}
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ backgroundColor: 'var(--background)', opacity: OVERLAY_OPACITY }}
          aria-hidden="true"
        />

        {/* Content */}
        <header className="relative z-10 max-w-3xl">
          <h1
            className="font-bold tracking-tight"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            {headline}
          </h1>

          {subheadline && (
            <p
              className="mt-6 text-lg leading-relaxed md:text-xl"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {subheadline}
            </p>
          )}

          <nav aria-label="Call to action" className="mt-10 flex flex-wrap items-center justify-center gap-5">
            {ctaText && (
              <a
                href={ctaHref}
                className={cn(
                  'inline-flex items-center justify-center',
                  'rounded-lg px-7 py-3.5 text-sm font-semibold',
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

            <button
              ref={triggerRef}
              onClick={() => setIsOpen(true)}
              className={cn(
                'group inline-flex items-center gap-3 text-sm font-semibold',
                'transition-opacity hover:opacity-80',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'rounded-lg px-4 py-3',
              )}
              style={{
                color: 'var(--foreground)',
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
              aria-label={playButtonLabel}
            >
              {/* Play icon circle */}
              <span
                className="inline-flex items-center justify-center rounded-full transition-transform group-hover:scale-105"
                style={{
                  width: `${PLAY_ICON_SIZE}px`,
                  height: `${PLAY_ICON_SIZE}px`,
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5 ml-0.5"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </span>
              {playButtonLabel}
            </button>
          </nav>
        </header>
      </section>

      {/* Video Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          style={{ animation: `hero-modal-fade-in ${MODAL_FADE_DURATION} ease-out` }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 cursor-pointer"
            style={{ backgroundColor: `rgba(0, 0, 0, ${BACKDROP_OPACITY})` }}
            onClick={close}
            aria-hidden="true"
          />

          {/* Video container */}
          <div
            className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl"
            style={{ animation: `hero-modal-scale-in ${MODAL_SCALE_DURATION} ease-out` }}
          >
            <iframe
              src={videoSrc}
              className="h-full w-full"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title="Video"
            />

            {/* Close button */}
            <button
              ref={closeButtonRef}
              onClick={close}
              className={cn(
                'absolute top-3 right-3 inline-flex items-center justify-center rounded-full',
                'text-white/80 transition-colors hover:text-white',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              )}
              style={{
                width: `${CLOSE_BUTTON_SIZE}px`,
                height: `${CLOSE_BUTTON_SIZE}px`,
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                ['--tw-ring-color' as string]: 'white',
                ['--tw-ring-offset-color' as string]: 'transparent',
              }}
              aria-label="Close video"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
                aria-hidden="true"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
