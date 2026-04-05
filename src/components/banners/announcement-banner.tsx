// @version 1.0.0
// @category banners
// @name announcement-banner
// @source aura-inspired

'use client';

import { useState, useCallback } from 'react';
import { cn } from '@/lib/utils';

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

const DefaultIcon = () => (
  <svg
    width="16"
    height="16"
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
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M11 3L3 11M3 3l8 8"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

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
    wrapper: 'bg-red-600 text-white',
    link: 'text-white hover:opacity-80',
    badge: 'bg-white/15 text-white',
    closeHover: 'hover:bg-white/15',
  },
} as const;

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
      <style dangerouslySetInnerHTML={{ __html: `
        .announcement-banner {
          max-height: 60px;
          opacity: 1;
          transition: max-height 300ms ease-out, opacity 200ms ease-out;
        }
        .announcement-banner--dismissed {
          max-height: 0;
          opacity: 0;
          overflow: hidden;
          pointer-events: none;
        }
        @media (prefers-reduced-motion: reduce) {
          .announcement-banner {
            transition: none;
          }
          .announcement-banner--dismissed {
            display: none;
          }
        }
      `}} />
      <div
        role="banner"
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
          <span className="shrink-0 opacity-90">
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
                    styles.link,
                  )}
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
              aria-label="Banner schließen"
              className={cn(
                'absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 transition-colors',
                styles.closeHover,
              )}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    </>
  );
}
