"use client"

// @version 2.0.0
// @category cta
// @name cta-newsletter
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { useCallback, useState } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)';
const MAX_CONTENT_WIDTH = 'max-w-xl';
const SECTION_PADDING = 'px-6 py-16 md:px-12 lg:py-24';
const SUCCESS_BG = 'color-mix(in oklch, var(--primary) 10%, var(--background))';
const SUCCESS_BORDER = '1px solid color-mix(in oklch, var(--primary) 25%, transparent)';
const INPUT_BORDER = '1px solid color-mix(in oklch, var(--border) 80%, transparent)';
const BTN_FONT_SIZE = '0.875rem';
const ACTIVE_SCALE = '0.98';
const SPINNER_SIZE = 'h-4 w-4';

const REDUCED_MOTION_CSS = `
@media (prefers-reduced-motion: reduce) {
  [data-cta-newsletter] *,
  [data-cta-newsletter] *::before,
  [data-cta-newsletter] *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}`;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CtaNewsletterProps {
  headline: string;
  description: string;
  ctaText: string;
  href: string;
  placeholderText?: string;
  successMessage?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Client Component -- form state required)
// ---------------------------------------------------------------------------

export default function CtaNewsletter({
  headline,
  description,
  ctaText,
  href,
  placeholderText = 'name@email.com',
  successMessage = 'Erfolgreich angemeldet!',
  className,
}: CtaNewsletterProps) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!email.trim() || loading) return;

      setLoading(true);

      try {
        const res = await fetch(href, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (res.ok) {
          setSubmitted(true);
          setEmail('');
        }
      } catch {
        // Silently fail -- could add error state
      } finally {
        setLoading(false);
      }
    },
    [email, href, loading],
  );

  return (
    <section
      aria-label="Newsletter-Anmeldung"
      data-cta-newsletter=""
      className={cn(
        SECTION_PADDING,
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <style dangerouslySetInnerHTML={{ __html: REDUCED_MOTION_CSS }} />

      <div className={cn('mx-auto text-center', MAX_CONTENT_WIDTH)}>
        <h2
          className="font-bold tracking-tight leading-[1.1]"
          style={{
            fontSize: HEADING_CLAMP,
            color: 'var(--foreground)',
          }}
        >
          {headline}
        </h2>

        <p
          className="mx-auto mt-3 max-w-md text-base leading-relaxed"
          style={{ color: 'var(--muted-foreground)' }}
        >
          {description}
        </p>

        {submitted ? (
          <div
            role="status"
            aria-live="polite"
            className="mt-8 rounded-lg px-6 py-4 text-sm font-medium"
            style={{
              backgroundColor: SUCCESS_BG,
              color: 'var(--primary)',
              border: SUCCESS_BORDER,
            }}
          >
            {successMessage}
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-0"
          >
            <label htmlFor="cta-newsletter-email" className="sr-only">
              E-Mail-Adresse
            </label>
            <input
              id="cta-newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholderText}
              className={cn(
                'w-full rounded-lg px-4 py-3 text-sm',
                'sm:rounded-r-none sm:border-r-0',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              )}
              style={{
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                border: INPUT_BORDER,
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              aria-busy={loading}
              className={cn(
                'inline-flex shrink-0 items-center justify-center',
                'rounded-lg px-6 py-3 font-semibold',
                'sm:rounded-l-none',
                'transition-all duration-200',
                'hover:brightness-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                `active:scale-[${ACTIVE_SCALE}]`,
                'disabled:opacity-60 disabled:pointer-events-none',
              )}
              style={{
                fontSize: BTN_FONT_SIZE,
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {loading ? (
                <span
                  className={cn('inline-block animate-spin rounded-full border-2 border-current border-t-transparent', SPINNER_SIZE)}
                  role="status"
                  aria-label="Laden..."
                />
              ) : (
                ctaText
              )}
            </button>
          </form>
        )}

        <p
          className="mt-3 text-xs"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Kein Spam. Jederzeit abmeldbar.
        </p>
      </div>
    </section>
  );
}
