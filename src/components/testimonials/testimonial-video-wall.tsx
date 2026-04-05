"use client"

// @version 1.0.0
// @category testimonials
// @name Testimonial Video Wall
// @source custom-implementation

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Grid gap in Tailwind spacing */
const GRID_GAP = 'gap-4 sm:gap-5 lg:gap-6';

/** Play button icon size */
const PLAY_ICON_SIZE = 48;

/** Close button icon size */
const CLOSE_ICON_SIZE = 24;

/** Modal backdrop opacity */
const BACKDROP_OPACITY = 'bg-black/80';

/** Modal animation durations */
const MODAL_ENTER_DURATION = '0.3s';
const MODAL_EXIT_DURATION = '0.2s';
const MODAL_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** Exit animation timeout in ms */
const EXIT_TIMEOUT_MS = 200;

/** Focus ring utility */
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

/** Card aspect ratio */
const CARD_ASPECT = 'aspect-[9/12]';

/** Max modal video width */
const MODAL_MAX_WIDTH = 'max-w-3xl';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface VideoTestimonial {
  name: string;
  role: string;
  company?: string;
  videoSrc: string;
  posterSrc?: string;
  quote: string;
}

interface TestimonialVideoWallProps {
  headline?: string;
  subheadline?: string;
  testimonials: VideoTestimonial[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes tvw-backdrop-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes tvw-backdrop-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}
@keyframes tvw-modal-in {
  from {
    opacity: 0;
    transform: scale(0.92) translateY(1rem);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
@keyframes tvw-modal-out {
  from {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
  to {
    opacity: 0;
    transform: scale(0.92) translateY(1rem);
  }
}
@keyframes tvw-card-in {
  from {
    opacity: 0;
    transform: translateY(1.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes tvw-backdrop-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes tvw-backdrop-out {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
  @keyframes tvw-modal-in {
    from { opacity: 0; transform: none; }
    to   { opacity: 1; transform: none; }
  }
  @keyframes tvw-modal-out {
    from { opacity: 1; transform: none; }
    to   { opacity: 0; transform: none; }
  }
  @keyframes tvw-card-in {
    from { opacity: 0; transform: none; }
    to   { opacity: 1; transform: none; }
  }
  .tvw-card,
  .tvw-modal-content,
  .tvw-backdrop {
    animation-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// SVG icons
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
      <circle cx="24" cy="24" r="24" fill="currentColor" opacity="0.85" />
      <path d="M19 15L35 24L19 33V15Z" fill="white" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width={CLOSE_ICON_SIZE}
      height={CLOSE_ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M18 6L6 18M6 6L18 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TestimonialVideoWall({
  headline,
  subheadline,
  testimonials,
  className,
}: TestimonialVideoWallProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [exiting, setExiting] = useState(false);

  // Refs for focus management
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isOpen = activeIndex !== null;
  const activeTestimonial = activeIndex !== null ? testimonials[activeIndex] : null;

  // -------------------------------------------------------------------------
  // Open modal
  // -------------------------------------------------------------------------

  const openModal = useCallback((index: number, triggerEl: HTMLButtonElement) => {
    triggerRef.current = triggerEl;
    setActiveIndex(index);
  }, []);

  // -------------------------------------------------------------------------
  // Close modal
  // -------------------------------------------------------------------------

  const closeModal = useCallback(() => {
    setExiting(true);

    // Pause video immediately
    if (videoRef.current) {
      videoRef.current.pause();
    }

    const timeout = setTimeout(() => {
      setActiveIndex(null);
      setExiting(false);

      // Return focus to the trigger button
      triggerRef.current?.focus();
      triggerRef.current = null;
    }, EXIT_TIMEOUT_MS);

    return () => clearTimeout(timeout);
  }, []);

  // -------------------------------------------------------------------------
  // Body scroll lock
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen]);

  // -------------------------------------------------------------------------
  // Focus trap + Escape key
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!isOpen || exiting) return;

    // Auto-focus close button when modal opens
    const rafId = requestAnimationFrame(() => {
      closeButtonRef.current?.focus();
    });

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
        return;
      }

      if (e.key !== 'Tab') return;

      const modal = modalRef.current;
      if (!modal) return;

      const focusable = modal.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, exiting, closeModal]);

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  const isEntering = isOpen && !exiting;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label="Video testimonials"
        className={cn(
          'mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24',
          className,
        )}
        style={{ backgroundColor: 'var(--background)' }}
      >
        {/* Header */}
        {(headline || subheadline) && (
          <header className="text-center mb-12 lg:mb-16">
            {headline && (
              <h2
                className="font-bold tracking-tight"
                style={{
                  fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 3rem)',
                  color: 'var(--foreground)',
                }}
              >
                {headline}
              </h2>
            )}
            {subheadline && (
              <p
                className="mt-4 max-w-2xl mx-auto leading-relaxed"
                style={{
                  fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.125rem)',
                  color: 'var(--muted-foreground)',
                }}
              >
                {subheadline}
              </p>
            )}
          </header>
        )}

        {/* Masonry-style grid */}
        <div
          className={cn(
            'columns-1 sm:columns-2 lg:columns-3',
            GRID_GAP,
          )}
          style={{ columnGap: undefined }}
        >
          {testimonials.map((testimonial, index) => (
            <figure
              key={`${testimonial.name}-${index}`}
              className={cn(
                'tvw-card mb-4 sm:mb-5 lg:mb-6 break-inside-avoid',
                'group relative overflow-hidden rounded-xl border',
              )}
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--card)',
                animation: `tvw-card-in 0.5s ${MODAL_EASING} ${index * 0.08}s both`,
              }}
            >
              {/* Video thumbnail / poster */}
              <div className={cn('relative', CARD_ASPECT)}>
                {testimonial.posterSrc ? (
                  <img
                    src={testimonial.posterSrc}
                    alt={`Video testimonial by ${testimonial.name}`}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      backgroundColor:
                        'color-mix(in oklch, var(--muted) 60%, transparent)',
                    }}
                  >
                    <span
                      className="text-4xl font-bold uppercase opacity-20"
                      style={{ color: 'var(--muted-foreground)' }}
                      aria-hidden="true"
                    >
                      {testimonial.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </span>
                  </div>
                )}

                {/* Play button overlay */}
                <button
                  type="button"
                  aria-label={`Play video testimonial from ${testimonial.name}`}
                  onClick={(e) =>
                    openModal(index, e.currentTarget)
                  }
                  className={cn(
                    'absolute inset-0 flex items-center justify-center',
                    'transition-opacity duration-200 motion-reduce:transition-none',
                    'bg-black/20 group-hover:bg-black/30',
                    FOCUS_RING,
                  )}
                  style={{
                    color: 'var(--primary)',
                    ['--tw-ring-color' as string]: 'var(--primary)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  <span className="transition-transform duration-200 motion-reduce:transition-none group-hover:scale-110">
                    <PlayIcon />
                  </span>
                </button>
              </div>

              {/* Name + role caption */}
              <figcaption className="p-4">
                <p
                  className="text-sm font-semibold"
                  style={{ color: 'var(--card-foreground)' }}
                >
                  {testimonial.name}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {[testimonial.role, testimonial.company]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Modal                                                              */}
      {/* ----------------------------------------------------------------- */}

      {isOpen && activeTestimonial && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Video testimonial from ${activeTestimonial.name}`}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        >
          {/* Backdrop */}
          <div
            className={cn('tvw-backdrop absolute inset-0', BACKDROP_OPACITY)}
            onClick={closeModal}
            aria-hidden="true"
            style={{
              animation: isEntering
                ? `tvw-backdrop-in ${MODAL_ENTER_DURATION} ${MODAL_EASING} both`
                : `tvw-backdrop-out ${MODAL_EXIT_DURATION} ${MODAL_EASING} both`,
              backdropFilter: 'blur(4px)',
            }}
          />

          {/* Modal content */}
          <div
            className={cn(
              'tvw-modal-content relative z-10 w-full',
              MODAL_MAX_WIDTH,
            )}
            style={{
              animation: isEntering
                ? `tvw-modal-in ${MODAL_ENTER_DURATION} ${MODAL_EASING} both`
                : `tvw-modal-out ${MODAL_EXIT_DURATION} ${MODAL_EASING} both`,
            }}
          >
            {/* Close button */}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeModal}
              aria-label="Close video"
              className={cn(
                'absolute -top-12 right-0 z-20',
                'inline-flex items-center justify-center rounded-full p-2',
                'text-white/80 hover:text-white',
                'transition-colors duration-150 motion-reduce:transition-none',
                FOCUS_RING,
              )}
              style={{
                ['--tw-ring-color' as string]: 'white',
                ['--tw-ring-offset-color' as string]: 'transparent',
              }}
            >
              <CloseIcon />
            </button>

            {/* Video */}
            <figure className="overflow-hidden rounded-xl">
              <video
                ref={videoRef}
                src={activeTestimonial.videoSrc}
                poster={activeTestimonial.posterSrc}
                controls
                autoPlay
                playsInline
                className="w-full rounded-t-xl"
                style={{ backgroundColor: 'black' }}
              >
                <track kind="captions" />
                Your browser does not support the video element.
              </video>

              {/* Quote + attribution below video */}
              <figcaption
                className="rounded-b-xl p-5 sm:p-6"
                style={{
                  backgroundColor: 'var(--card)',
                  borderTop: '1px solid var(--border)',
                }}
              >
                <blockquote
                  className="leading-relaxed"
                  style={{
                    fontSize: 'clamp(0.9375rem, 0.5vw + 0.8125rem, 1.125rem)',
                    color: 'var(--card-foreground)',
                  }}
                >
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </blockquote>
                <footer className="mt-3 flex items-center gap-2">
                  <cite
                    className="text-sm font-semibold not-italic"
                    style={{ color: 'var(--card-foreground)' }}
                  >
                    {activeTestimonial.name}
                  </cite>
                  <span
                    className="text-xs"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {[activeTestimonial.role, activeTestimonial.company]
                      .filter(Boolean)
                      .join(' · ')}
                  </span>
                </footer>
              </figcaption>
            </figure>
          </div>
        </div>
      )}
    </>
  );
}
