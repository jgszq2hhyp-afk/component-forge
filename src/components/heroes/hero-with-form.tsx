// @version 2.0.0
// @category heroes
// @name hero-with-form
// @score 92
// @source self-authored

'use client';

import { cn } from '@/lib/utils';
import { useState, useEffect, useRef, type FormEvent } from 'react';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HERO_MIN_HEIGHT = '80vh';
const CONTENT_MAX_WIDTH = '80rem'; // max-w-7xl
const SUBHEADLINE_MAX_WIDTH = '32rem'; // max-w-lg
const CARD_MAX_WIDTH = '28rem'; // max-w-md
const CARD_BORDER_RADIUS = '1rem'; // rounded-2xl
const CARD_PADDING = '2rem'; // p-8
const HEADING_CLAMP = 'clamp(2.25rem, 4vw + 1rem, 3.75rem)';
const SUBHEADLINE_CLAMP = 'clamp(1.125rem, 1vw + 0.75rem, 1.25rem)';
const ANIMATION_DURATION = '0.6s';
const ANIMATION_EASING = 'ease-out';
const DELAY_FORM = '0.15s';
const INPUT_BORDER_RADIUS = '0.5rem';
const INPUT_PY = '0.625rem';
const INPUT_PX = '1rem';
const FOCUS_RING = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ring)]';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroWithFormProps {
  headline: string;
  subheadline?: string;
  badgeText?: string;
  formTitle?: string;
  formDescription?: string;
  submitText?: string;
  onSubmit?: (data: { name: string; email: string }) => void | Promise<void>;
  className?: string;
}

// ---------------------------------------------------------------------------
// Keyframes
// ---------------------------------------------------------------------------

const keyframes = `
@keyframes hero-form-fade-up {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  @keyframes hero-form-fade-up {
    from { opacity: 1; }
    to { opacity: 1; }
  }
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component ('use client' -- form state management)
// ---------------------------------------------------------------------------

export default function HeroWithForm({
  headline,
  subheadline,
  badgeText,
  formTitle = 'Get Started',
  formDescription = 'Enter your details and we\'ll be in touch.',
  submitText = 'Submit',
  onSubmit,
  className,
}: HeroWithFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  // Escape key resets form status messages
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && (status === 'success' || status === 'error')) {
        setStatus('idle');
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setStatus('submitting');
    try {
      await onSubmit?.({ name, email });
      setStatus('success');
      setName('');
      setEmail('');
    } catch {
      setStatus('error');
    }
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      <section
        aria-label="Hero with contact form"
        className={cn(
          'relative flex items-center',
          'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
          className,
        )}
        style={{
          minHeight: HERO_MIN_HEIGHT,
          backgroundColor: 'var(--background)',
        }}
      >
        <div
          className="mx-auto grid w-full gap-12 lg:grid-cols-2 lg:gap-20"
          style={{ maxWidth: CONTENT_MAX_WIDTH }}
        >
          {/* Left -- Text content */}
          <article
            className="flex flex-col justify-center"
            style={{
              animation: `hero-form-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} both`,
            }}
          >
            {badgeText && (
              <span
                className="mb-4 inline-flex w-fit items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase"
                style={{
                  backgroundColor: 'var(--accent)',
                  color: 'var(--accent-foreground)',
                }}
              >
                {badgeText}
              </span>
            )}

            <h1
              className="font-bold tracking-tight"
              style={{
                fontSize: HEADING_CLAMP,
                color: 'var(--foreground)',
              }}
            >
              {headline}
            </h1>

            {subheadline && (
              <p
                className="mt-6 leading-relaxed"
                style={{
                  fontSize: SUBHEADLINE_CLAMP,
                  maxWidth: SUBHEADLINE_MAX_WIDTH,
                  color: 'var(--muted-foreground)',
                }}
              >
                {subheadline}
              </p>
            )}
          </article>

          {/* Right -- Form */}
          <div
            className="flex items-center justify-center lg:justify-end"
            style={{
              animation: `hero-form-fade-up ${ANIMATION_DURATION} ${ANIMATION_EASING} ${DELAY_FORM} both`,
            }}
          >
            <div
              className="w-full shadow-xl"
              style={{
                maxWidth: CARD_MAX_WIDTH,
                borderRadius: CARD_BORDER_RADIUS,
                padding: CARD_PADDING,
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
              }}
            >
              <h2
                className="text-xl font-semibold"
                id="hero-form-title"
                style={{ color: 'var(--card-foreground)' }}
              >
                {formTitle}
              </h2>

              {formDescription && (
                <p
                  className="mt-2 text-sm"
                  id="hero-form-desc"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {formDescription}
                </p>
              )}

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="mt-6 space-y-4"
                aria-labelledby="hero-form-title"
                aria-describedby={formDescription ? 'hero-form-desc' : undefined}
              >
                <div>
                  <label
                    htmlFor="hero-form-name"
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Name
                  </label>
                  <input
                    id="hero-form-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className={cn(
                      'w-full text-sm',
                      FOCUS_RING,
                    )}
                    style={{
                      borderRadius: INPUT_BORDER_RADIUS,
                      padding: `${INPUT_PY} ${INPUT_PX}`,
                      backgroundColor: 'var(--input)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)',
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="hero-form-email"
                    className="mb-1.5 block text-sm font-medium"
                    style={{ color: 'var(--foreground)' }}
                  >
                    Email
                  </label>
                  <input
                    id="hero-form-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className={cn(
                      'w-full text-sm',
                      FOCUS_RING,
                    )}
                    style={{
                      borderRadius: INPUT_BORDER_RADIUS,
                      padding: `${INPUT_PY} ${INPUT_PX}`,
                      backgroundColor: 'var(--input)',
                      color: 'var(--foreground)',
                      border: '1px solid var(--border)',
                    }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={cn(
                    'w-full text-sm font-semibold disabled:opacity-50',
                    FOCUS_RING,
                  )}
                  style={{
                    borderRadius: INPUT_BORDER_RADIUS,
                    padding: `${INPUT_PY} ${INPUT_PX}`,
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  {status === 'submitting' ? 'Sending...' : submitText}
                </button>

                {status === 'success' && (
                  <p
                    className="text-center text-sm font-medium"
                    role="status"
                    style={{ color: 'var(--primary)' }}
                  >
                    Thanks! We&apos;ll be in touch.
                  </p>
                )}

                {status === 'error' && (
                  <p
                    className="text-center text-sm font-medium"
                    role="alert"
                    style={{ color: 'var(--destructive)' }}
                  >
                    Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
