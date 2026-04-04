// @version 1.0.0
// @category heroes
// @name hero-with-video-modal
// @source self-authored

'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useState, useEffect, useCallback } from 'react';

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
// Component ('use client' — modal open/close state)
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

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, close]);

  return (
    <>
      <section
        className={cn(
          'relative flex min-h-[85vh] items-center justify-center overflow-hidden',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          'text-center',
          className,
        )}
      >
        {/* Keyframes */}
        <style>{`
          @keyframes hero-modal-fade-in {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes hero-modal-scale-in {
            from { opacity: 0; transform: scale(0.92); }
            to { opacity: 1; transform: scale(1); }
          }
          @keyframes hero-modal-pulse {
            0%, 100% { transform: translate(-50%, -50%) scale(1); }
            50% { transform: translate(-50%, -50%) scale(1.08); }
          }
          @media (prefers-reduced-motion: reduce) {
            @keyframes hero-modal-fade-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes hero-modal-scale-in {
              from { opacity: 0; }
              to { opacity: 1; }
            }
            @keyframes hero-modal-pulse {
              0%, 100% { transform: translate(-50%, -50%) scale(1); }
            }
          }
        `}</style>

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
          style={{ backgroundColor: 'var(--background)', opacity: 0.7 }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-3xl">
          <h1
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: 'var(--foreground)' }}
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

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            {ctaText && (
              <a
                href={ctaHref}
                className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  '--tw-ring-color': 'var(--ring)',
                } as React.CSSProperties}
              >
                {ctaText}
              </a>
            )}

            <button
              onClick={() => setIsOpen(true)}
              className="group inline-flex items-center gap-3 text-sm font-semibold transition-opacity hover:opacity-80 focus-visible:ring-2 focus-visible:outline-none rounded-lg px-4 py-3"
              style={{
                color: 'var(--foreground)',
                '--tw-ring-color': 'var(--ring)',
              } as React.CSSProperties}
              aria-label={playButtonLabel}
            >
              {/* Play icon circle */}
              <span
                className="inline-flex h-12 w-12 items-center justify-center rounded-full transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                }}
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
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Video player"
          style={{ animation: 'hero-modal-fade-in 0.2s ease-out' }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 cursor-pointer"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }}
            onClick={close}
            aria-hidden="true"
          />

          {/* Video container */}
          <div
            className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-2xl"
            style={{ animation: 'hero-modal-scale-in 0.25s ease-out' }}
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
              onClick={close}
              className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:text-white focus-visible:ring-2 focus-visible:outline-none"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                '--tw-ring-color': 'var(--ring)',
              } as React.CSSProperties}
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
