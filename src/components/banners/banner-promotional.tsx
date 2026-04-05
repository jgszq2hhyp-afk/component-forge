// @version 1.0.0
// @category banners
// @name banner-promotional
// @source custom

'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { cn } from '@/lib/utils';

/* ─── Named Constants ─── */
const COUNTDOWN_INTERVAL_MS = 1000;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = 3600;
const SECONDS_PER_DAY = 86400;
const STORAGE_KEY_PREFIX = 'promo-banner-dismissed-';
const RING_STYLE = { ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' };

/* ─── Types ─── */
interface BannerPromotionalProps {
  title: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
  endDate?: string | Date;
  dismissible?: boolean;
  variant?: 'gradient' | 'solid' | 'outline';
  className?: string;
}

/* ─── Icons ─── */
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

/* ─── Helpers ─── */
function getTimeRemaining(endDate: Date): { days: number; hours: number; minutes: number; seconds: number; expired: boolean } {
  const diff = Math.max(0, endDate.getTime() - Date.now());
  const expired = diff === 0;
  const totalSeconds = Math.floor(diff / 1000);

  return {
    days: Math.floor(totalSeconds / SECONDS_PER_DAY),
    hours: Math.floor((totalSeconds % SECONDS_PER_DAY) / SECONDS_PER_HOUR),
    minutes: Math.floor((totalSeconds % SECONDS_PER_HOUR) / SECONDS_PER_MINUTE),
    seconds: totalSeconds % SECONDS_PER_MINUTE,
    expired,
  };
}

function pad(n: number): string {
  return n.toString().padStart(2, '0');
}

function getDismissalKey(title: string): string {
  return STORAGE_KEY_PREFIX + title.toLowerCase().replace(/\s+/g, '-');
}

/* ─── Variant Styles ─── */
const variantStyles = {
  gradient: {
    wrapper: 'promo-banner--gradient bg-[var(--promo-gradient-from,hsl(250_80%_55%))] text-white',
    cta: 'bg-white/20 hover:bg-white/30 text-white border-white/25',
    close: 'text-white/80 hover:text-white hover:bg-white/15',
  },
  solid: {
    wrapper: 'bg-[var(--primary)] text-[var(--primary-foreground)]',
    cta: 'bg-[var(--primary-foreground)]/15 hover:bg-[var(--primary-foreground)]/25 text-[var(--primary-foreground)] border-[var(--primary-foreground)]/20',
    close: 'text-[var(--primary-foreground)]/80 hover:text-[var(--primary-foreground)] hover:bg-[var(--primary-foreground)]/15',
  },
  outline: {
    wrapper: 'border-2 border-[var(--border)] bg-[var(--card,var(--background))] text-[var(--foreground)]',
    cta: 'bg-[var(--primary)] hover:opacity-90 text-[var(--primary-foreground)] border-transparent',
    close: 'text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:bg-[var(--accent)]',
  },
} as const;

/* ─── Component ─── */
export function BannerPromotional({
  title,
  description,
  ctaLabel,
  ctaHref,
  endDate,
  dismissible = true,
  variant = 'gradient',
  className,
}: BannerPromotionalProps) {
  const [dismissed, setDismissed] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, expired: false });

  const parsedEndDate = useMemo(() => {
    if (!endDate) return null;
    return endDate instanceof Date ? endDate : new Date(endDate);
  }, [endDate]);

  /* Check localStorage for previous dismissal */
  useEffect(() => {
    setHydrated(true);
    try {
      const key = getDismissalKey(title);
      if (typeof window !== 'undefined' && localStorage.getItem(key)) {
        setDismissed(true);
      }
    } catch {
      // localStorage unavailable
    }
  }, [title]);

  /* Countdown timer */
  useEffect(() => {
    if (!parsedEndDate) return;

    setTimeLeft(getTimeRemaining(parsedEndDate));

    const interval = setInterval(() => {
      const remaining = getTimeRemaining(parsedEndDate);
      setTimeLeft(remaining);
      if (remaining.expired) clearInterval(interval);
    }, COUNTDOWN_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [parsedEndDate]);

  const handleDismiss = useCallback(() => {
    setDismissed(true);
    try {
      const key = getDismissalKey(title);
      localStorage.setItem(key, '1');
    } catch {
      // localStorage unavailable
    }
  }, [title]);

  /* Don't render until hydrated (SSR mismatch avoidance) */
  if (!hydrated || dismissed) return null;

  const styles = variantStyles[variant];
  const showCountdown = parsedEndDate && !timeLeft.expired;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .promo-banner--gradient {
          background: linear-gradient(
            135deg,
            var(--promo-gradient-from, hsl(250 80% 55%)),
            var(--promo-gradient-via, hsl(280 80% 55%)),
            var(--promo-gradient-to, hsl(320 80% 55%))
          );
          background-size: 200% 200%;
          animation: promo-gradient-shift 6s ease-in-out infinite;
        }
        @keyframes promo-gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .promo-banner-enter {
          animation: promo-slide-down 400ms ease-out;
        }
        @keyframes promo-slide-down {
          from { opacity: 0; transform: translateY(-100%); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .promo-banner--gradient {
            animation: none;
            background-position: 0% 50%;
          }
          .promo-banner-enter {
            animation: none;
          }
        }
      `}} />

      <div
        role="banner"
        aria-label={`Promotion: ${title}`}
        className={cn(
          'promo-banner-enter relative w-full',
          styles.wrapper,
          className,
        )}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between sm:gap-4 sm:py-3.5">
          {/* Text Content */}
          <div className="flex flex-1 flex-col items-center gap-1 text-center sm:items-start sm:text-left">
            <p
              className="font-bold leading-tight"
              style={{ fontSize: 'clamp(0.9375rem, 1vw + 0.5rem, 1.125rem)' }}
            >
              {title}
            </p>
            {description && (
              <p
                className="opacity-90"
                style={{ fontSize: 'clamp(0.8125rem, 0.5vw + 0.5rem, 0.9375rem)' }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Countdown */}
          {showCountdown && (
            <div
              className="flex items-center gap-1.5 font-mono text-sm font-semibold tabular-nums"
              aria-label={`Verbleibende Zeit: ${timeLeft.days} Tage, ${timeLeft.hours} Stunden, ${timeLeft.minutes} Minuten, ${timeLeft.seconds} Sekunden`}
              aria-live="off"
            >
              {timeLeft.days > 0 && (
                <>
                  <span className="flex flex-col items-center rounded-md bg-black/15 px-2 py-1">
                    <span className="text-base leading-none">{pad(timeLeft.days)}</span>
                    <span className="mt-0.5 text-[0.625rem] uppercase opacity-75">Tage</span>
                  </span>
                  <span aria-hidden="true" className="text-lg opacity-60">:</span>
                </>
              )}
              <span className="flex flex-col items-center rounded-md bg-black/15 px-2 py-1">
                <span className="text-base leading-none">{pad(timeLeft.hours)}</span>
                <span className="mt-0.5 text-[0.625rem] uppercase opacity-75">Std</span>
              </span>
              <span aria-hidden="true" className="text-lg opacity-60">:</span>
              <span className="flex flex-col items-center rounded-md bg-black/15 px-2 py-1">
                <span className="text-base leading-none">{pad(timeLeft.minutes)}</span>
                <span className="mt-0.5 text-[0.625rem] uppercase opacity-75">Min</span>
              </span>
              <span aria-hidden="true" className="text-lg opacity-60">:</span>
              <span className="flex flex-col items-center rounded-md bg-black/15 px-2 py-1">
                <span className="text-base leading-none">{pad(timeLeft.seconds)}</span>
                <span className="mt-0.5 text-[0.625rem] uppercase opacity-75">Sek</span>
              </span>
            </div>
          )}

          {/* CTA */}
          {ctaLabel && ctaHref && (
            <a
              href={ctaHref}
              style={RING_STYLE}
              className={cn(
                'shrink-0 rounded-lg border px-4 py-2 text-sm font-semibold',
                'transition-all',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                styles.cta,
              )}
            >
              {ctaLabel}
            </a>
          )}

          {/* Dismiss */}
          {dismissible && (
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Banner schließen"
              style={RING_STYLE}
              className={cn(
                'shrink-0 rounded-md p-1.5 transition-colors',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'sm:absolute sm:right-3 sm:top-1/2 sm:-translate-y-1/2',
                styles.close,
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
