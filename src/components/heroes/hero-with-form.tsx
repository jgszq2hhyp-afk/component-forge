// @version 1.0.0
// @category heroes
// @name hero-with-form
// @source self-authored

'use client';

import { cn } from '@/lib/utils';
import { useState, type FormEvent } from 'react';

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
// Component ('use client' — form state management)
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
    <section
      className={cn(
        'relative flex min-h-[80vh] items-center',
        'px-6 py-20 md:px-12 md:py-28 lg:px-20 lg:py-36',
        className,
      )}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Keyframes */}
      <style>{`
        @keyframes hero-form-fade-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes hero-form-fade-up {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        }
      `}</style>

      <div className="mx-auto grid w-full max-w-7xl gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left — Text content */}
        <div
          className="flex flex-col justify-center"
          style={{ animation: 'hero-form-fade-up 0.6s ease-out both' }}
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
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: 'var(--foreground)' }}
          >
            {headline}
          </h1>

          {subheadline && (
            <p
              className="mt-6 max-w-lg text-lg leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {subheadline}
            </p>
          )}
        </div>

        {/* Right — Form */}
        <div
          className="flex items-center justify-center lg:justify-end"
          style={{ animation: 'hero-form-fade-up 0.6s ease-out 0.15s both' }}
        >
          <div
            className="w-full max-w-md rounded-2xl p-8 shadow-xl"
            style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
            }}
          >
            <h2
              className="text-xl font-semibold"
              style={{ color: 'var(--card-foreground)' }}
            >
              {formTitle}
            </h2>

            {formDescription && (
              <p
                className="mt-2 text-sm"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {formDescription}
              </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                  className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-shadow focus-visible:ring-2"
                  style={{
                    backgroundColor: 'var(--input)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border)',
                    boxShadow: 'none',
                    '--tw-ring-color': 'var(--ring)',
                  } as React.CSSProperties}
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
                  className="w-full rounded-lg px-4 py-2.5 text-sm outline-none transition-shadow focus-visible:ring-2"
                  style={{
                    backgroundColor: 'var(--input)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--border)',
                    boxShadow: 'none',
                    '--tw-ring-color': 'var(--ring)',
                  } as React.CSSProperties}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="w-full rounded-lg px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90 focus-visible:ring-2 focus-visible:outline-none disabled:opacity-50"
                style={{
                  backgroundColor: 'var(--primary)',
                  color: 'var(--primary-foreground)',
                  '--tw-ring-color': 'var(--ring)',
                } as React.CSSProperties}
              >
                {status === 'submitting' ? 'Sending...' : submitText}
              </button>

              {status === 'success' && (
                <p className="text-center text-sm font-medium" style={{ color: 'var(--primary)' }}>
                  Thanks! We&apos;ll be in touch.
                </p>
              )}

              {status === 'error' && (
                <p className="text-center text-sm font-medium" style={{ color: 'var(--destructive)' }}>
                  Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
