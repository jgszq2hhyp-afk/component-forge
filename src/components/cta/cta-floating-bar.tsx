// @version 1.0.0 // @category cta // @name cta-floating-bar // @score pending

'use client';

import { useCallback, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CtaFloatingBarProps {
  text: string;
  ctaText: string;
  ctaHref: string;
  showAfterScroll?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframe styles (injected once via <style>)
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes cta-bar-slide-up {
  from {
    opacity: 0;
    transform: translateY(100%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes cta-bar-slide-down {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(100%);
  }
}

@keyframes cta-bar-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes cta-bar-fade-out {
  from { opacity: 1; }
  to   { opacity: 0; }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes cta-bar-slide-up {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
  @keyframes cta-bar-slide-down {
    from { opacity: 1; }
    to   { opacity: 0; }
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function CtaFloatingBar({
  text,
  ctaText,
  ctaHref,
  showAfterScroll = 400,
  className,
}: CtaFloatingBarProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [exiting, setExiting] = useState(false);

  // Track scroll position
  useEffect(() => {
    if (dismissed) return;

    function handleScroll() {
      const scrollY = window.scrollY;
      setVisible(scrollY >= showAfterScroll);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll, dismissed]);

  // Dismiss handler with exit animation
  const handleDismiss = useCallback(() => {
    setExiting(true);
    const timeout = setTimeout(() => {
      setDismissed(true);
      setExiting(false);
    }, 250);
    return () => clearTimeout(timeout);
  }, []);

  // Don't render at all after dismissed
  if (dismissed) return null;

  // Don't render before scroll threshold
  if (!visible && !exiting) return null;

  const isEntering = visible && !exiting;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <div
        role="complementary"
        aria-label="Call to action"
        className={cn(
          'fixed bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 z-40',
          'backdrop-blur-xl border rounded-2xl shadow-2xl',
          'p-4 sm:p-5',
          className,
        )}
        style={{
          backgroundColor: 'color-mix(in oklch, var(--background) 90%, transparent)',
          borderColor: 'color-mix(in oklch, var(--border) 50%, transparent)',
          animation: isEntering
            ? 'cta-bar-slide-up 0.35s cubic-bezier(0.16, 1, 0.3, 1) both'
            : 'cta-bar-slide-down 0.25s cubic-bezier(0.55, 0, 1, 0.45) both',
        }}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          {/* Text */}
          <p
            className="text-sm font-medium leading-snug sm:text-base"
            style={{ color: 'var(--foreground)' }}
          >
            {text}
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:shrink-0">
            {/* CTA button */}
            <a
              href={ctaHref}
              className={cn(
                'inline-flex w-full items-center justify-center sm:w-auto',
                'rounded-lg px-5 py-2.5 text-sm font-semibold',
                'transition-all duration-200',
                'hover:brightness-110 hover:shadow-md',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'active:scale-[0.98]',
              )}
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {ctaText}
            </a>

            {/* Dismiss button */}
            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss"
              className={cn(
                'inline-flex shrink-0 items-center justify-center',
                'rounded-lg p-2 transition-colors duration-150',
                'hover:bg-black/5 dark:hover:bg-white/10',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              )}
              style={{
                color: 'var(--muted-foreground)',
                ['--tw-ring-color' as string]: 'var(--ring)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M12 4L4 12M4 4L12 12"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
