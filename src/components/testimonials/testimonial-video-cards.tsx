// @version 1.0.0
// @category testimonials
// @name testimonial-video-cards
// @source self-authored

'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes video-modal-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
}
`;

// ---------------------------------------------------------------------------
// Play icon
// ---------------------------------------------------------------------------

function PlayIcon() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="24" fill="currentColor" fillOpacity="0.9" />
      <path d="M19 16L33 24L19 32V16Z" fill="white" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Close icon
// ---------------------------------------------------------------------------

function CloseIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        className={cn(
          'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
            {headline && (
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
                style={{ color: 'var(--foreground)' }}
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
          </div>
        )}

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                'rounded-2xl border overflow-hidden',
                'transition-shadow duration-300 hover:shadow-lg',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderColor: 'var(--border)',
                animation: 'video-card-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both',
                animationDelay: `${0.1 + index * 0.1}s`,
              }}
            >
              {/* Thumbnail */}
              <button
                onClick={() => openVideo(testimonial.videoUrl)}
                className="relative w-full aspect-video group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset"
                style={{ ['--tw-ring-color' as string]: 'var(--primary)' }}
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
                  className="absolute inset-0 flex items-center justify-center transition-opacity duration-200 group-hover:opacity-100 opacity-80"
                  style={{ color: 'var(--primary)' }}
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
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-4">
                  <p
                    className="text-sm font-semibold"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    {testimonial.name}
                  </p>
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
                </div>
              </div>
            </div>
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
              aria-hidden="true"
            />

            {/* Content */}
            <div
              className="relative w-full max-w-4xl aspect-video rounded-2xl overflow-hidden"
              style={{
                animation: 'video-modal-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
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
                onClick={closeVideo}
                className={cn(
                  'absolute top-4 right-4 inline-flex items-center justify-center',
                  'w-10 h-10 rounded-full',
                  'transition-opacity duration-200 hover:opacity-80',
                  'focus-visible:outline-none focus-visible:ring-2',
                )}
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.6)',
                  color: 'white',
                  ['--tw-ring-color' as string]: 'white',
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
