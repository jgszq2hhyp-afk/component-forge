"use client"

// @version 1.0.0
// @category banners
// @name banner-cookie-simple
// @source custom

'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const STORAGE_KEY = 'cookie-consent-dismissed' as const;
const DEFAULT_MESSAGE =
  'Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu bieten.' as const;

const TRANSITION_DURATION = 'duration-300' as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface BannerCookieSimpleProps {
  /** Cookie-consent message displayed in the bar */
  message?: string;
  /** Callback fired when user accepts */
  onAccept?: () => void;
  /** Callback fired when user rejects */
  onReject?: () => void;
  /** Additional class names */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function BannerCookieSimple({
  message = DEFAULT_MESSAGE,
  onAccept,
  onReject,
  className,
}: BannerCookieSimpleProps) {
  const [visible, setVisible] = useState(false);

  /* Check localStorage on mount */
  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY);
      if (!dismissed) {
        setVisible(true);
      }
    } catch {
      // localStorage unavailable – show banner as fallback
      setVisible(true);
    }
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, 'true');
    } catch {
      // silent fail
    }
  }, []);

  const handleAccept = useCallback(() => {
    dismiss();
    onAccept?.();
  }, [dismiss, onAccept]);

  const handleReject = useCallback(() => {
    dismiss();
    onReject?.();
  }, [dismiss, onReject]);

  if (!visible) return null;

  return (
    <aside
      role="region"
      aria-label="Cookie-Hinweis"
      className={cn(
        'fixed inset-x-0 bottom-0 z-50',
        'border-t border-[var(--color-border,hsl(0_0%_85%))]',
        'bg-[var(--color-surface,hsl(0_0%_100%))]',
        'px-4 py-4 sm:px-6 md:px-8',
        'shadow-[0_-2px_12px_hsl(0_0%_0%/0.08)]',
        'motion-safe:animate-[slideUp_0.35s_ease-out]',
        'motion-reduce:animate-none',
        `transition-opacity ${TRANSITION_DURATION}`,
        className,
      )}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 sm:flex-row sm:justify-between">
        {/* Message */}
        <p className="text-center text-sm text-[var(--color-text-muted,hsl(0_0%_35%))] sm:text-left">
          {message}
        </p>

        {/* Actions */}
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={handleReject}
            className={cn(
              'rounded-md border border-[var(--color-border,hsl(0_0%_80%))]',
              'bg-transparent px-4 py-2 text-sm font-medium',
              'text-[var(--color-text,hsl(0_0%_10%))]',
              'hover:bg-[var(--color-muted,hsl(0_0%_95%))]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring,hsl(220_70%_55%))] focus-visible:ring-offset-2',
              'motion-safe:transition-colors motion-safe:duration-200',
              'motion-reduce:transition-none',
              'cursor-pointer',
            )}
          >
            Ablehnen
          </button>

          <button
            type="button"
            onClick={handleAccept}
            className={cn(
              'rounded-md px-4 py-2 text-sm font-medium',
              'bg-[var(--color-primary,hsl(220_70%_50%))]',
              'text-[var(--color-primary-foreground,hsl(0_0%_100%))]',
              'hover:bg-[var(--color-primary-hover,hsl(220_70%_42%))]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring,hsl(220_70%_55%))] focus-visible:ring-offset-2',
              'motion-safe:transition-colors motion-safe:duration-200',
              'motion-reduce:transition-none',
              'cursor-pointer',
            )}
          >
            Akzeptieren
          </button>
        </div>
      </div>

      {/* Slide-up keyframe (injected once) */}
      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </aside>
  );
}
