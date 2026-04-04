// @version 2.0.0
// @category testimonials
// @name testimonial-video-cards
// @source self-authored

'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const HEADER_MAX_WIDTH = 'max-w-2xl';
const MODAL_MAX_WIDTH = 'max-w-4xl';
const CARD_RADIUS = 'rounded-2xl';
const CLOSE_BUTTON_SIZE = 'w-10 h-10';
const PLAY_ICON_SIZE = 48;
const CLOSE_ICON_SIZE = 24;
const PLAY_CIRCLE_RADIUS = 24;
const ANIMATION_CARD_DURATION = '0.5s';
const ANIMATION_MODAL_DURATION = '0.3s';
const ANIMATION_BASE_DELAY_S = 0.1;
const ANIMATION_STAGGER_S = 0.1;
const ANIMATION_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';
const HEADING_CLAMP = 'clamp(1.875rem, 2.5vw + 1rem, 3rem)';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface VideoTestimonial {
  name: string;
  role?: string;
  company?: string;
  quote: string;
  thumbnailSrc: string;
  videoUrl: string;
}

interface TestimonialVideoCardsProps {
  headline?: string;
  subheadline?: string;
  testimonials: VideoTestimonial[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes video-card-in {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes video-modal-in {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes video-card-in {
    from, to {
      opacity: 1;
      transform: none;
    }
  }
  @keyframes video-modal-in {
    from, to {
      opacity: 1;
      transform: none;
    }
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Play icon
// ---------------------------------------------------------------------------

function PlayIcon() {
  return (
    <svg
      width={PLAY_ICON_SIZE}
      height={PLAY_ICON_SIZE}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <circle cx={PLAY_CIRCLE_RADIUS} cy={PLAY_CIRCLE_RADIUS} r={PLAY_CIRCLE_RADIUS} fill="currentColor" fillOpacity="0.9" />
      <path d="M19 16L33 24L19 32V16Z" fill="white" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Close icon
// ---------------------------------------------------------------------------

function CloseIcon() {
  return (
    <svg width={CLOSE_ICON_SIZE} height={CLOSE_ICON_SIZE} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TestimonialVideoCards({
  headline,
  subheadline,
  testimonials,
  className,
}: TestimonialVideoCardsProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const openVideo = useCallback((url: string) => setActiveVideo(url), []);
  const closeVideo = useCallback(() => setActiveVideo(null), []);

  // Close modal on Escape key
  useEffect(() => {
    if (!activeVideo) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        closeVideo();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo, closeVideo]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label={headline ?? 'Video-Kundenstimmen'}
        className={cn(
          `${SECTION_MAX_WIDTH} mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24`,
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <header className={`${HEADER_MAX_WIDTH} mx-auto text-center mb-12 lg:mb-16`}>
            {headline && (
              <h2
                className="font-bold tracking-tight"
                style={{
                  fontSize: HEADING_CLAMP,
                  color: 'var(--foreground)',
                }}
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className="mt-4 text-lg leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {subheadline}
              </p>
            )}
          </header>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" role="list">
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              role="listitem"
              className={cn(
                `${CARD_RADIUS} border overflow-hidden`,
                'transition-shadow duration-300 hover:shadow-lg motion-reduce:transition-none',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                animation: `video-card-in ${ANIMATION_CARD_DURATION} ${ANIMATION_EASING} both`,
                animationDelay: `${ANIMATION_BASE_DELAY_S + index * ANIMATION_STAGGER_S}s`,
              }}
            >
              {/* Thumbnail */}
              <button
                type="button"
                onClick={() => openVideo(testimonial.videoUrl)}
                className={cn(
                  'relative w-full aspect-video group',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                )}
                style={{
                  ['--tw-ring-color' as string]: 'var(--primary)',
                  ['--tw-ring-offset-color' as string]: 'var(--card)',
                }}
                aria-label={`Video von ${testimonial.name} abspielen`}
              >
                <Image
                  src={testimonial.thumbnailSrc}
                  alt={`Video-Testimonial von ${testimonial.name}`}
                  fill
                  className="object-cover"
                />
                {/* Play overlay */}
                <div
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-100 opacity-80 motion-reduce:transition-none"
                  style={{ color: 'var(--primary)' }}
                  aria-hidden="true"
                >
                  <PlayIcon />
                </div>
              </button>

              {/* Content */}
              <div className="p-5">
                <blockquote
                  className="text-sm leading-relaxed line-clamp-3"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  <p>&ldquo;{testimonial.quote}&rdquo;</p>
                </blockquote>
                <footer className="mt-4">
                  <cite
                    className="text-sm font-semibold not-italic block"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    {testimonial.name}
                  </cite>
                  {(testimonial.role || testimonial.company) && (
                    <p
                      className="text-xs"
                      style={{ color: 'var(--muted-foreground)' }}
                    >
                      {[testimonial.role, testimonial.company]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  )}
                </footer>
              </div>
            </article>
          ))}
        </div>

        {/* Video Modal */}
        {activeVideo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-label="Video-Testimonial"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={closeVideo}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') closeVideo(); }}
              role="button"
              tabIndex={-1}
              aria-label="Video schließen"
            />

            {/* Content */}
            <div
              className={`relative w-full ${MODAL_MAX_WIDTH} aspect-video ${CARD_RADIUS} overflow-hidden`}
              style={{
                animation: `video-modal-in ${ANIMATION_MODAL_DURATION} ${ANIMATION_EASING} both`,
              }}
            >
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Video-Testimonial"
              />

              {/* Close button */}
              <button
                type="button"
                onClick={closeVideo}
                className={cn(
                  'absolute top-4 right-4 inline-flex items-center justify-center',
                  CLOSE_BUTTON_SIZE,
                  'rounded-full',
                  'transition-opacity duration-200 hover:opacity-80 motion-reduce:transition-none',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                )}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  ['--tw-ring-color' as string]: 'white',
                  ['--tw-ring-offset-color' as string]: 'transparent',
                }}
                aria-label="Video schließen"
              >
                <CloseIcon />
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
