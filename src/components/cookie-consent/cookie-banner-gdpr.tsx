"use client"

// @version 1.0.0
// @category cookie-consent
// @name cookie-banner-gdpr
// @source custom

'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'cookie-consent-gdpr';
const SLIDE_DURATION_MS = 400;
const BANNER_MAX_WIDTH = '56rem';
const BANNER_PADDING_X = '1.5rem';
const BANNER_PADDING_Y = '1.5rem';
const BANNER_BOTTOM_OFFSET = '1.5rem';
const BANNER_BORDER_RADIUS = '1rem';
const BACKDROP_BLUR = '16px';
const HEADING_CLAMP = 'clamp(1rem, 1.5vw + 0.5rem, 1.25rem)';
const BODY_CLAMP = 'clamp(0.8125rem, 1vw + 0.25rem, 0.9375rem)';
const BUTTON_BORDER_RADIUS = '0.5rem';
const BUTTON_PADDING_X = '1.25rem';
const BUTTON_PADDING_Y = '0.625rem';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CookieBannerGdprProps {
  /** Link to privacy policy page */
  privacyHref?: string;
  /** Callback when user accepts all cookies */
  onAcceptAll?: () => void;
  /** Callback when user rejects all cookies */
  onRejectAll?: () => void;
  /** Callback when user clicks settings/customize */
  onCustomize?: () => void;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function hasConsented(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return localStorage.getItem(STORAGE_KEY) !== null;
  } catch {
    return false;
  }
}

function saveConsent(value: 'accepted' | 'rejected'): void {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ value, timestamp: Date.now() })
    );
  } catch {
    // localStorage unavailable -- silently fail
  }
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CookieBannerGdpr({
  privacyHref = '/datenschutz',
  onAcceptAll,
  onRejectAll,
  onCustomize,
  className,
}: CookieBannerGdprProps) {
  const [visible, setVisible] = useState(false);
  const [animatingOut, setAnimatingOut] = useState(false);
  const acceptRef = useRef<HTMLButtonElement>(null);

  // Check localStorage on mount
  useEffect(() => {
    if (!hasConsented()) {
      setVisible(true);
    }
  }, []);

  // Auto-focus first button when shown
  useEffect(() => {
    if (visible && acceptRef.current) {
      acceptRef.current.focus();
    }
  }, [visible]);

  // Dismiss helper with slide-out animation
  const dismiss = useCallback(
    (action: 'accepted' | 'rejected') => {
      setAnimatingOut(true);
      setTimeout(() => {
        saveConsent(action);
        setVisible(false);
        setAnimatingOut(false);
      }, SLIDE_DURATION_MS);
    },
    []
  );

  const handleAcceptAll = useCallback(() => {
    onAcceptAll?.();
    dismiss('accepted');
  }, [onAcceptAll, dismiss]);

  const handleRejectAll = useCallback(() => {
    onRejectAll?.();
    dismiss('rejected');
  }, [onRejectAll, dismiss]);

  // Escape key rejects
  useEffect(() => {
    if (!visible) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        handleRejectAll();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [visible, handleRejectAll]);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie-Einstellungen"
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 flex justify-center',
        className
      )}
      style={{
        padding: BANNER_BOTTOM_OFFSET,
        ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
      }}
    >
      <div
        className={cn(
          'w-full border shadow-lg',
          animatingOut
            ? 'animate-[slideDown_var(--slide-duration)_ease-in_forwards]'
            : 'animate-[slideUp_var(--slide-duration)_ease-out_forwards]'
        )}
        style={{
          maxWidth: BANNER_MAX_WIDTH,
          padding: `${BANNER_PADDING_Y} ${BANNER_PADDING_X}`,
          borderRadius: BANNER_BORDER_RADIUS,
          backdropFilter: `blur(${BACKDROP_BLUR})`,
          WebkitBackdropFilter: `blur(${BACKDROP_BLUR})`,
          backgroundColor: 'color-mix(in oklch, var(--card) 85%, transparent)',
          borderColor: 'var(--border)',
          ['--slide-duration' as string]: `${SLIDE_DURATION_MS}ms`,
        }}
      >
        {/* Text content */}
        <div className="mb-4">
          <h2
            className="mb-1 font-semibold"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            Cookie-Einstellungen
          </h2>
          <p
            style={{
              fontSize: BODY_CLAMP,
              color: 'var(--muted-foreground)',
              lineHeight: 1.6,
            }}
          >
            Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf
            unserer Website zu bieten. Einige sind essenziell, andere helfen uns,
            die Website zu verbessern.{' '}
            <a
              href={privacyHref}
              className={cn(
                'underline underline-offset-2 transition-colors',
                FOCUS_RING
              )}
              style={{
                color: 'var(--primary)',
                ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
              }}
            >
              Datenschutzerklärung
            </a>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Accept All -- primary */}
          <button
            ref={acceptRef}
            type="button"
            onClick={handleAcceptAll}
            className={cn(
              'font-medium transition-colors',
              FOCUS_RING
            )}
            style={{
              padding: `${BUTTON_PADDING_Y} ${BUTTON_PADDING_X}`,
              borderRadius: BUTTON_BORDER_RADIUS,
              fontSize: BODY_CLAMP,
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
              ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
            }}
          >
            Alle akzeptieren
          </button>

          {/* Reject All -- outline */}
          <button
            type="button"
            onClick={handleRejectAll}
            className={cn(
              'border font-medium transition-colors',
              FOCUS_RING
            )}
            style={{
              padding: `${BUTTON_PADDING_Y} ${BUTTON_PADDING_X}`,
              borderRadius: BUTTON_BORDER_RADIUS,
              fontSize: BODY_CLAMP,
              backgroundColor: 'transparent',
              color: 'var(--foreground)',
              borderColor: 'var(--border)',
              ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
            }}
          >
            Alle ablehnen
          </button>

          {/* Customize -- text link */}
          <button
            type="button"
            onClick={onCustomize}
            className={cn(
              'underline underline-offset-2 transition-colors',
              FOCUS_RING
            )}
            style={{
              padding: `${BUTTON_PADDING_Y} 0.5rem`,
              fontSize: BODY_CLAMP,
              color: 'var(--muted-foreground)',
              background: 'none',
              border: 'none',
              ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
            }}
          >
            Einstellungen
          </button>
        </div>
      </div>

      {/* Keyframe animations -- injected via style tag */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(100%);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideDown {
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
          .animate-\\[slideUp_var\\(--slide-duration\\)_ease-out_forwards\\],
          .animate-\\[slideDown_var\\(--slide-duration\\)_ease-in_forwards\\] {
            animation: none !important;
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
