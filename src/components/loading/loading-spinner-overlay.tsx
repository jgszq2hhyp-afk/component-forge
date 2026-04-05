// @version 1.0.0 // @category loading // @name loading-spinner-overlay // @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SPINNER_SIZE = '2.5rem';
const SPINNER_BORDER_WIDTH = '3px';
const SPINNER_DURATION = '0.75s';
const BACKDROP_OPACITY = '0.6';
const LABEL_FONT_SIZE = '0.875rem';
const Z_INDEX_OVERLAY = 50;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LoadingSpinnerOverlayProps {
  /** Whether the overlay covers the entire viewport */
  fullscreen?: boolean;
  /** Accessible label displayed below the spinner */
  label?: string;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Scoped styles with prefers-reduced-motion
// ---------------------------------------------------------------------------

const spinnerStyles = `
  @keyframes spinner-rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .spinner-ring {
    animation: spinner-rotate ${SPINNER_DURATION} linear infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .spinner-ring {
      animation: none;
      opacity: 0.7;
    }
  }
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LoadingSpinnerOverlay({
  fullscreen = false,
  label = 'Loading...',
  className,
}: LoadingSpinnerOverlayProps) {
  return (
    <>
      {/* Scoped animation styles */}
      <style dangerouslySetInnerHTML={{ __html: spinnerStyles }} />

      <div
        role="status"
        aria-live="polite"
        aria-label={label}
        className={cn(
          'flex flex-col items-center justify-center gap-3',
          fullscreen
            ? 'fixed inset-0'
            : 'absolute inset-0',
          className,
        )}
        style={{
          zIndex: Z_INDEX_OVERLAY,
        }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{
            backgroundColor: 'var(--background, hsl(0 0% 100%))',
            opacity: BACKDROP_OPACITY,
          }}
          aria-hidden="true"
        />

        {/* Spinner and label container */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          {/* Spinner ring */}
          <div
            className="spinner-ring rounded-full"
            style={{
              width: SPINNER_SIZE,
              height: SPINNER_SIZE,
              border: `${SPINNER_BORDER_WIDTH} solid var(--border, hsl(214 32% 91%))`,
              borderTopColor: 'var(--primary, hsl(220 90% 56%))',
            }}
            aria-hidden="true"
          />

          {/* Label */}
          {label && (
            <p
              className="font-medium"
              style={{
                fontSize: LABEL_FONT_SIZE,
                color: 'var(--muted-foreground, hsl(215 16% 47%))',
              }}
            >
              {label}
            </p>
          )}
        </div>

        {/* Screen reader announcement */}
        <span className="sr-only">{label}</span>
      </div>
    </>
  );
}
