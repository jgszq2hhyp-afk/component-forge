// @version 1.0.0
// @category cta
// @name CTA Sticky Bottom
// @source custom-implementation

'use client';

import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Default scroll distance in px before bar appears */
const DEFAULT_SCROLL_THRESHOLD = 400;

/** Slide-up animation timing */
const SLIDE_UP_DURATION = '0.4s';
const SLIDE_UP_EASING = 'cubic-bezier(0.16, 1, 0.3, 1)';

/** Slide-down (dismiss) animation timing */
const SLIDE_DOWN_DURATION = '0.25s';
const SLIDE_DOWN_EASING = 'cubic-bezier(0.55, 0, 1, 0.45)';

/** Exit animation timeout in ms */
const EXIT_TIMEOUT_MS = 250;

/** Close button icon size */
const CLOSE_ICON_SIZE = 18;

/** Focus ring utility */
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

/** Max inner container width */
const CONTAINER_MAX_WIDTH = '72rem';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CtaStickyBottomProps {
  title: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  showAfterScroll?: number;
  dismissible?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes csb-slide-up {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes csb-slide-down {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes csb-slide-up {
    from { opacity: 0; transform: none; }
    to   { opacity: 1; transform: none; }
  }
  @keyframes csb-slide-down {
    from { opacity: 1; transform: none; }
    to   { opacity: 0; transform: none; }
  }
  .csb-bar {
    animation-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// SVG icons
// ---------------------------------------------------------------------------

function CloseIcon() {
  return (
    <svg
      width={CLOSE_ICON_SIZE}
      height={CLOSE_ICON_SIZE}
      viewBox={`0 0 ${CLOSE_ICON_SIZE} ${CLOSE_ICON_SIZE}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M13.5 4.5L4.5 13.5M4.5 4.5L13.5 13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="ml-1.5"
    >
      <path
        d="M3 8H13M13 8L9 4M13 8L9 12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CtaStickyBottom({
  title,
  description,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
  showAfterScroll = DEFAULT_SCROLL_THRESHOLD,
  dismissible = true,
  className,
}: CtaStickyBottomProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [exiting, setExiting] = useState(false);

  // -------------------------------------------------------------------------
  // Scroll detection
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (dismissed) return;

    function handleScroll() {
      setVisible(window.scrollY >= showAfterScroll);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll, dismissed]);

  // -------------------------------------------------------------------------
  // Dismiss handler
  // -------------------------------------------------------------------------

  const handleDismiss = useCallback(() => {
    setExiting(true);
    const timeout = setTimeout(() => {
      setDismissed(true);
      setExiting(false);
    }, EXIT_TIMEOUT_MS);
    return () => clearTimeout(timeout);
  }, []);

  // -------------------------------------------------------------------------
  // Render guards
  // -------------------------------------------------------------------------

  if (dismissed) return null;
  if (!visible && !exiting) return null;

  const isEntering = visible && !exiting;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <aside
        role="complementary"
        aria-label="Call to action"
        className={cn(
          'csb-bar fixed inset-x-0 bottom-0 z-50',
          'border-t',
          className,
        )}
        style={{
          backgroundColor:
            'color-mix(in oklch, var(--background) 85%, transparent)',
          borderColor:
            'color-mix(in oklch, var(--border) 50%, transparent)',
          backdropFilter: 'blur(16px) saturate(1.8)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.8)',
          animation: isEntering
            ? `csb-slide-up ${SLIDE_UP_DURATION} ${SLIDE_UP_EASING} both`
            : `csb-slide-down ${SLIDE_DOWN_DURATION} ${SLIDE_DOWN_EASING} both`,
        }}
      >
        <div
          className="mx-auto flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-4"
          style={{ maxWidth: CONTAINER_MAX_WIDTH }}
        >
          {/* Text content */}
          <div className="min-w-0 flex-1">
            <p
              className="truncate text-sm font-semibold sm:text-base"
              style={{ color: 'var(--foreground)' }}
            >
              {title}
            </p>
            {description && (
              <p
                className="mt-0.5 hidden text-xs leading-snug sm:block sm:text-sm"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Secondary link */}
            {secondaryLabel && secondaryHref && (
              <a
                href={secondaryHref}
                className={cn(
                  'hidden sm:inline-flex items-center',
                  'rounded-lg px-4 py-2 text-sm font-medium',
                  'border transition-colors duration-150 motion-reduce:transition-none',
                  'hover:brightness-95',
                  FOCUS_RING,
                )}
                style={{
                  color: 'var(--foreground)',
                  borderColor: 'var(--border)',
                  backgroundColor: 'var(--background)',
                  ['--tw-ring-color' as string]: 'var(--ring, var(--primary))',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                {secondaryLabel}
              </a>
            )}

            {/* Primary CTA */}
            <a
              href={ctaHref}
              className={cn(
                'inline-flex items-center justify-center',
                'rounded-lg px-5 py-2.5 text-sm font-semibold',
                'transition-all duration-200 motion-reduce:transition-none',
                'hover:brightness-110 hover:shadow-md',
                'active:scale-[0.98] motion-reduce:active:scale-100',
                FOCUS_RING,
              )}
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {ctaLabel}
              <ArrowRightIcon />
            </a>

            {/* Dismiss button */}
            {dismissible && (
              <button
                type="button"
                onClick={handleDismiss}
                aria-label="Dismiss"
                className={cn(
                  'inline-flex shrink-0 items-center justify-center',
                  'rounded-lg p-2 transition-colors duration-150 motion-reduce:transition-none',
                  'hover:bg-black/5 dark:hover:bg-white/10',
                  FOCUS_RING,
                )}
                style={{
                  color: 'var(--muted-foreground)',
                  ['--tw-ring-color' as string]: 'var(--ring, var(--primary))',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                <CloseIcon />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
