// @version 1.0.0
// @category cta
// @name cta-newsletter
// @source custom

'use client';

import { cn } from '@/lib/utils';
import { useCallback, useState } from 'react';

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
// Component (Client Component — form state required)
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
        // Silently fail — could add error state
      } finally {
        setLoading(false);
      }
    },
    [email, href, loading],
  );

  return (
    <section
      className={cn(
        'px-6 py-16 md:px-12 lg:py-24',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto max-w-xl text-center">
        <h2
          className="font-bold tracking-tight leading-[1.1]"
          style={{
            fontSize: 'clamp(1.5rem, 2.5vw + 0.5rem, 2.25rem)',
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
            className="mt-8 rounded-lg px-6 py-4 text-sm font-medium"
            style={{
              backgroundColor: 'color-mix(in oklch, var(--primary) 10%, var(--background))',
              color: 'var(--primary)',
              border: '1px solid color-mix(in oklch, var(--primary) 25%, transparent)',
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
                'focus:outline-none focus:ring-2 focus:ring-offset-1',
              )}
              style={{
                backgroundColor: 'var(--background)',
                color: 'var(--foreground)',
                border: '1px solid color-mix(in oklch, var(--border) 80%, transparent)',
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            />
            <button
              type="submit"
              disabled={loading}
              className={cn(
                'inline-flex shrink-0 items-center justify-center',
                'rounded-lg px-6 py-3 text-sm font-semibold',
                'sm:rounded-l-none',
                'transition-all duration-200',
                'hover:brightness-110',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'active:scale-[0.98]',
                'disabled:opacity-60 disabled:pointer-events-none',
              )}
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {loading ? (
                <span
                  className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
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

      {/* Reduced-motion */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
@media (prefers-reduced-motion: reduce) {
  .cta-newsletter * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
  }
}`,
        }}
      />
    </section>
  );
}
