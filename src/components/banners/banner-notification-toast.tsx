// @version 1.0.0
// @category banners
// @name banner-notification-toast
// @source custom

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

/* ─── Named Constants ─── */
const DEFAULT_DURATION_MS = 5000;
const ANIMATION_DURATION_MS = 300;
const PROGRESS_INTERVAL_MS = 16;
const RING_STYLE = { ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' };

/* ─── Types ─── */
interface ToastAction {
  label: string;
  onClick: () => void;
}

interface BannerNotificationToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onDismiss?: () => void;
  action?: ToastAction;
  position?: 'top' | 'bottom';
  className?: string;
}

/* ─── Type Styles (CSS-variable based) ─── */
const typeConfig = {
  success: {
    container: 'border-[var(--toast-success-border,hsl(142_71%_45%))]',
    icon: 'text-[var(--toast-success,hsl(142_71%_45%))]',
    progress: 'bg-[var(--toast-success,hsl(142_71%_45%))]',
    label: 'Erfolgreich',
  },
  error: {
    container: 'border-[var(--toast-error-border,hsl(0_84%_60%))]',
    icon: 'text-[var(--toast-error,hsl(0_84%_60%))]',
    progress: 'bg-[var(--toast-error,hsl(0_84%_60%))]',
    label: 'Fehler',
  },
  info: {
    container: 'border-[var(--toast-info-border,hsl(215_100%_60%))]',
    icon: 'text-[var(--toast-info,hsl(215_100%_60%))]',
    progress: 'bg-[var(--toast-info,hsl(215_100%_60%))]',
    label: 'Information',
  },
  warning: {
    container: 'border-[var(--toast-warning-border,hsl(45_93%_47%))]',
    icon: 'text-[var(--toast-warning,hsl(45_93%_47%))]',
    progress: 'bg-[var(--toast-warning,hsl(45_93%_47%))]',
    label: 'Warnung',
  },
} as const;

/* ─── Icons ─── */
const SuccessIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const ErrorIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const WarningIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const iconMap = {
  success: SuccessIcon,
  error: ErrorIcon,
  info: InfoIcon,
  warning: WarningIcon,
} as const;

/* ─── Component ─── */
export function BannerNotificationToast({
  message,
  type = 'info',
  duration = DEFAULT_DURATION_MS,
  onDismiss,
  action,
  position = 'top',
  className,
}: BannerNotificationToastProps) {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);
  const toastRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef(Date.now());

  const dismiss = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onDismiss?.();
    }, ANIMATION_DURATION_MS);
  }, [onDismiss]);

  /* Auto-dismiss timer with progress */
  useEffect(() => {
    if (duration === 0) return;

    startTimeRef.current = Date.now();

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        dismiss();
      }
    }, PROGRESS_INTERVAL_MS);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [duration, dismiss]);

  /* Auto-focus on mount for screen readers */
  useEffect(() => {
    toastRef.current?.focus();
  }, []);

  if (!visible) return null;

  const config = typeConfig[type];
  const IconComponent = iconMap[type];
  const isTop = position === 'top';

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .toast-enter-top {
          animation: toast-slide-in-top ${ANIMATION_DURATION_MS}ms ease-out;
        }
        .toast-enter-bottom {
          animation: toast-slide-in-bottom ${ANIMATION_DURATION_MS}ms ease-out;
        }
        .toast-exit-top {
          animation: toast-slide-out-top ${ANIMATION_DURATION_MS}ms ease-out forwards;
        }
        .toast-exit-bottom {
          animation: toast-slide-out-bottom ${ANIMATION_DURATION_MS}ms ease-out forwards;
        }
        @keyframes toast-slide-in-top {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes toast-slide-in-bottom {
          from { opacity: 0; transform: translateY(100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes toast-slide-out-top {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(-100%); }
        }
        @keyframes toast-slide-out-bottom {
          from { opacity: 1; transform: translateY(0); }
          to { opacity: 0; transform: translateY(100%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .toast-enter-top,
          .toast-enter-bottom,
          .toast-exit-top,
          .toast-exit-bottom {
            animation: none;
          }
        }
      `}} />

      <div
        ref={toastRef}
        role="alert"
        aria-live="polite"
        aria-label={config.label}
        tabIndex={-1}
        className={cn(
          'fixed left-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2',
          isTop ? 'top-4' : 'bottom-4',
          exiting
            ? isTop ? 'toast-exit-top' : 'toast-exit-bottom'
            : isTop ? 'toast-enter-top' : 'toast-enter-bottom',
          'overflow-hidden rounded-lg border bg-[var(--card,var(--background))] shadow-lg',
          config.container,
          className,
        )}
      >
        <div className="flex items-start gap-3 p-4">
          {/* Icon */}
          <span className={cn('mt-0.5 shrink-0', config.icon)}>
            <IconComponent />
          </span>

          {/* Content */}
          <div className="flex-1 space-y-1">
            <p
              className="text-sm font-medium text-[var(--foreground)]"
              style={{ fontSize: 'clamp(0.8125rem, 0.5vw + 0.75rem, 0.9375rem)' }}
            >
              {message}
            </p>

            {/* Action */}
            {action && (
              <button
                type="button"
                onClick={action.onClick}
                style={RING_STYLE}
                className={cn(
                  'text-sm font-semibold underline underline-offset-2',
                  config.icon,
                  'hover:opacity-80 transition-opacity',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
                )}
              >
                {action.label}
              </button>
            )}
          </div>

          {/* Dismiss */}
          <button
            type="button"
            onClick={dismiss}
            aria-label="Benachrichtigung schließen"
            style={RING_STYLE}
            className={cn(
              'shrink-0 rounded-md p-1 text-[var(--muted-foreground)]',
              'hover:text-[var(--foreground)] hover:bg-[var(--accent)]',
              'transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            )}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Progress bar */}
        {duration > 0 && (
          <div
            className="h-1 w-full bg-[var(--muted)]"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Verbleibende Zeit"
          >
            <div
              className={cn('h-full transition-none', config.progress)}
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </>
  );
}
