// @version 2.0.0
// @category banners
// @name announcement-banner
// @source aura-inspired

'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_HEIGHT_PX = 60;
const DISMISS_HEIGHT_TRANSITION_MS = 300;
const DISMISS_OPACITY_TRANSITION_MS = 200;
const ICON_SIZE = 16;
const CLOSE_ICON_SIZE = 14;
const CLOSE_STROKE_WIDTH = 1.5;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AnnouncementBannerProps {
  text: string;
  linkText?: string;
  linkHref?: string;
  variant?: 'default' | 'subtle' | 'urgent';
  dismissible?: boolean;
  icon?: React.ReactNode;
  badge?: string;
  className?: string;
  onDismiss?: () => void;
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

const DefaultIcon = () => (
  <svg
    width={ICON_SIZE}
    height={ICON_SIZE}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M8 1l1.796 4.858L15 7l-4.02 3.142L12.392 15 8 12.07 3.608 15l1.412-4.858L1 7l5.204-1.142L8 1z"
      fill="currentColor"
      opacity="0.9"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    width={CLOSE_ICON_SIZE}
    height={CLOSE_ICON_SIZE}
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M11 3L3 11M3 3l8 8"
      stroke="currentColor"
      strokeWidth={CLOSE_STROKE_WIDTH}
      strokeLinecap="round"
    />
  </svg>
);

// ---------------------------------------------------------------------------
// Variant styles
// ---------------------------------------------------------------------------

const variantStyles = {
  default: {
    wrapper: 'bg-[var(--primary)] text-[var(--primary-foreground)]',
    link: 'text-[var(--primary-foreground)] hover:opacity-80',
    badge: 'bg-[var(--primary-foreground)]/15 text-[var(--primary-foreground)]',
    closeHover: 'hover:bg-[var(--primary-foreground)]/15',
  },
  subtle: {
    wrapper: 'bg-[var(--muted)] text-[var(--muted-foreground)]',
    link: 'text-[var(--foreground)] hover:opacity-80',
    badge: 'bg-[var(--foreground)]/10 text-[var(--foreground)]',
    closeHover: 'hover:bg-[var(--foreground)]/10',
  },
  urgent: {
    wrapper: 'bg-[var(--destructive,_#dc2626)] text-[var(--destructive-foreground,_#fff)]',
    link: 'text-[var(--destructive-foreground,_#fff)] hover:opacity-80',
    badge: 'bg-[var(--destructive-foreground,_#fff)]/15 text-[var(--destructive-foreground,_#fff)]',
    closeHover: 'hover:bg-[var(--destructive-foreground,_#fff)]/15',
  },
} as const;

// ---------------------------------------------------------------------------
// Scoped styles
// ---------------------------------------------------------------------------

const scopedStyles = `
.announcement-banner {
  max-height: ${MAX_HEIGHT_PX}px;
  opacity: 1;
  transition:
    max-height ${DISMISS_HEIGHT_TRANSITION_MS}ms ease-out,
    opacity ${DISMISS_OPACITY_TRANSITION_MS}ms ease-out;
}
.announcement-banner--dismissed {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .announcement-banner {
    transition: none !important;
  }
  .announcement-banner--dismissed {
    display: none;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function AnnouncementBanner({
  text,
  linkText,
  linkHref,
  variant = 'default',
  dismissible = true,
  icon,
  badge,
  className,
  onDismiss,
}: AnnouncementBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    onDismiss?.();
  }, [onDismiss]);

  const styles = variantStyles[variant];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: scopedStyles }} />
      <div
        role="banner"
        aria-label="Announcement"
        className={cn(
          'announcement-banner',
          dismissed && 'announcement-banner--dismissed',
          styles.wrapper,
          'relative w-full py-2.5 px-4',
          className,
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-3 text-sm font-medium">
          {/* Icon */}
          <span className="shrink-0 opacity-90" aria-hidden="true">
            {icon ?? <DefaultIcon />}
          </span>

          {/* Badge */}
          {badge && (
            <span
              className={cn(
                'shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold',
                styles.badge,
              )}
            >
              {badge}
            </span>
          )}

          {/* Text + Link */}
          <p className="truncate">
            {text}
            {linkText && linkHref && (
              <>
                {' '}
                <a
                  href={linkHref}
                  className={cn(
                    'inline-flex items-center gap-0.5 underline underline-offset-2 transition-opacity',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    styles.link,
                  )}
                  style={{
                    ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                  }}
                >
                  {linkText}
                  <span aria-hidden="true" className="text-[0.7em]">&thinsp;&rarr;</span>
                </a>
              </>
            )}
          </p>

          {/* Dismiss */}
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss announcement banner"
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                styles.closeHover,
              )}
              style={{
                ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
              }}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
