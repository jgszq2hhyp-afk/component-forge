// @version 1.0.0 // @category cta // @name cta-exit-intent // @source custom

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CtaExitIntentProps {
  headline?: string;
  description?: string;
  inputPlaceholder?: string;
  ctaText?: string;
  dismissText?: string;
  onSubmit?: (email: string) => void;
  /** Delay in ms before exit-intent detection activates */
  activationDelay?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Client Component — mouse tracking + modal state)
// ---------------------------------------------------------------------------

export default function CtaExitIntent({
  headline = "Wait — don't leave yet!",
  description = 'Get exclusive tips and a special offer delivered straight to your inbox.',
  inputPlaceholder = 'Enter your email',
  ctaText = 'Claim My Offer',
  dismissText = 'No thanks, I\'ll pass',
  onSubmit,
  activationDelay = 3000,
  className,
}: CtaExitIntentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const hasTriggered = useRef(false);
  const isReady = useRef(false);

  // Delay activation so the modal doesn't fire immediately
  useEffect(() => {
    const timer = setTimeout(() => {
      isReady.current = true;
    }, activationDelay);
    return () => clearTimeout(timer);
  }, [activationDelay]);

  // Exit intent detection — mouse leaves viewport from top
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (
        e.clientY <= 0 &&
        isReady.current &&
        !hasTriggered.current
      ) {
        hasTriggered.current = true;
        setIsVisible(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isVisible) {
        setIsVisible(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email.trim()) return;
      onSubmit?.(email);
      setSubmitted(true);
    },
    [email, onSubmit],
  );

  const dismiss = useCallback(() => {
    setIsVisible(false);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-[9999] flex items-center justify-center px-4',
        className,
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-headline"
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundColor: 'color-mix(in oklch, var(--foreground) 50%, transparent)',
        }}
        onClick={dismiss}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={cn(
          'relative w-full max-w-md overflow-hidden rounded-2xl',
          'px-8 py-10 text-center',
          'shadow-2xl',
          'animate-exit-intent-in',
        )}
        style={{
          backgroundColor: 'var(--background)',
          border: '1px solid var(--border)',
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={dismiss}
          aria-label="Close modal"
          className={cn(
            'absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full',
            'transition-colors duration-200',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
          )}
          style={{
            color: 'var(--muted-foreground)',
            ['--tw-ring-color' as string]: 'var(--primary)',
            ['--tw-ring-offset-color' as string]: 'var(--background)',
          }}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Decorative top accent */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-1"
          aria-hidden="true"
          style={{
            background:
              'linear-gradient(90deg, var(--primary), color-mix(in oklch, var(--primary) 60%, var(--accent)))',
          }}
        />

        {submitted ? (
          /* Success state */
          <div className="py-4">
            <svg
              className="mx-auto mb-4 h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              aria-hidden="true"
              style={{ color: 'var(--primary)' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p
              className="text-lg font-semibold"
              style={{ color: 'var(--foreground)' }}
            >
              You&apos;re in!
            </p>
            <p
              className="mt-2 text-sm"
              style={{ color: 'var(--muted-foreground)' }}
            >
              Check your inbox for the next steps.
            </p>
          </div>
        ) : (
          /* Default state */
          <>
            <h2
              id="exit-intent-headline"
              className="font-bold tracking-tight"
              style={{
                fontSize: 'clamp(1.25rem, 2vw + 0.5rem, 1.75rem)',
                color: 'var(--foreground)',
              }}
            >
              {headline}
            </h2>

            <p
              className="mx-auto mt-3 max-w-xs text-sm leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {description}
            </p>

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-6 flex flex-col gap-3 sm:flex-row"
            >
              <label htmlFor="exit-intent-email" className="sr-only">
                Email address
              </label>
              <input
                id="exit-intent-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={inputPlaceholder}
                className={cn(
                  'flex-1 rounded-lg px-4 py-3 text-sm',
                  'transition-colors duration-200',
                  'placeholder:opacity-60',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                )}
                style={{
                  backgroundColor: 'var(--muted)',
                  color: 'var(--foreground)',
                  border: '1px solid var(--border)',
                  ['--tw-ring-color' as string]: 'var(--primary)',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              />
              <button
                type="submit"
                className={cn(
                  'inline-flex items-center justify-center whitespace-nowrap',
                  'rounded-lg px-6 py-3 text-sm font-semibold',
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
              </button>
            </form>

            {/* Dismiss link */}
            <button
              type="button"
              onClick={dismiss}
              className={cn(
                'mt-4 inline-block text-xs',
                'transition-colors duration-200',
                'hover:underline underline-offset-4',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
              )}
              style={{
                color: 'var(--muted-foreground)',
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {dismissText}
            </button>
          </>
        )}
      </div>

      {/* Animation + reduced-motion */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
@keyframes exit-intent-in {
  from {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.animate-exit-intent-in {
  animation: exit-intent-in 0.25s ease-out;
}
@media (prefers-reduced-motion: reduce) {
  .animate-exit-intent-in {
    animation: none !important;
  }
  div, button, input {
    transition-duration: 0.01ms !important;
  }
}`,
        }}
      />
    </div>
  );
}
