// @version 2.0.0
// @category footers
// @name footer-with-newsletter
// @source custom

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const SECTION_PADDING_X = 'px-6 md:px-12 lg:px-20';
const SECTION_PADDING_Y = 'pt-16 pb-8';
const NEWSLETTER_MAX_WIDTH = 'max-w-4xl';
const NEWSLETTER_DESCRIPTION_MAX_WIDTH = 'max-w-md';
const FORM_MAX_WIDTH = 'max-w-sm';
const BANNER_PADDING = 'px-6 py-10 md:px-12 md:py-14';
const BANNER_RADIUS = 'rounded-2xl';
const BANNER_MARGIN_BOTTOM = 'mb-12';
const COLUMN_GRID = 'sm:grid-cols-2 lg:grid-cols-4';
const DIVIDER_MARGIN = 'mt-12 mb-6';
const INPUT_PADDING = 'px-4 py-2.5';
const BUTTON_PADDING = 'px-5 py-2.5';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface FooterWithNewsletterProps {
  logo?: React.ReactNode;
  companyName?: string;
  columns?: FooterColumn[];
  newsletterHeadline?: string;
  newsletterDescription?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  onSubscribe?: (email: string) => void | Promise<void>;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FooterWithNewsletter({
  logo,
  companyName = 'Company',
  columns,
  newsletterHeadline = 'Stay up to date',
  newsletterDescription = 'Get the latest news and updates delivered to your inbox.',
  newsletterPlaceholder = 'Enter your email',
  newsletterButtonText = 'Subscribe',
  onSubscribe,
  className,
}: FooterWithNewsletterProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const currentYear = new Date().getFullYear();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');
    try {
      await onSubscribe?.(email);
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer
      aria-label="Site footer"
      className={cn(SECTION_PADDING_X, SECTION_PADDING_Y, className)}
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className={cn('mx-auto', SECTION_MAX_WIDTH)}>
        {/* Newsletter banner */}
        <aside
          aria-label="Newsletter signup"
          className={cn(BANNER_MARGIN_BOTTOM, BANNER_RADIUS, BANNER_PADDING)}
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          <div className={cn('mx-auto flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between', NEWSLETTER_MAX_WIDTH)}>
            <div className={NEWSLETTER_DESCRIPTION_MAX_WIDTH}>
              <h3
                className="font-bold tracking-tight"
                style={{
                  color: 'var(--primary-foreground)',
                  fontSize: 'clamp(1.25rem, 1rem + 1vw, 1.5rem)',
                }}
              >
                {newsletterHeadline}
              </h3>
              <p
                className="mt-2 text-sm leading-relaxed"
                style={{
                  color: 'color-mix(in oklch, var(--primary-foreground) 80%, transparent)',
                }}
              >
                {newsletterDescription}
              </p>
            </div>
            <form onSubmit={handleSubmit} className={cn('flex w-full gap-2', FORM_MAX_WIDTH)}>
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter-email"
                type="email"
                required
                placeholder={newsletterPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={cn(
                  'flex-1 rounded-lg text-sm',
                  INPUT_PADDING,
                  'placeholder:opacity-60',
                  FOCUS_RING,
                )}
                style={{
                  backgroundColor: 'var(--primary-foreground)',
                  color: 'var(--primary)',
                  ['--tw-ring-color' as string]: 'var(--primary-foreground)',
                  ['--tw-ring-offset-color' as string]: 'var(--primary)',
                }}
              />
              <button
                type="submit"
                disabled={status === 'loading'}
                className={cn(
                  'whitespace-nowrap rounded-lg text-sm font-semibold',
                  BUTTON_PADDING,
                  'transition-all duration-200',
                  'hover:brightness-110 active:scale-[0.98]',
                  FOCUS_RING,
                  'disabled:opacity-60 disabled:pointer-events-none',
                )}
                style={{
                  backgroundColor: 'var(--foreground)',
                  color: 'var(--background)',
                  ['--tw-ring-color' as string]: 'var(--foreground)',
                  ['--tw-ring-offset-color' as string]: 'var(--primary)',
                }}
              >
                {status === 'loading' ? '...' : newsletterButtonText}
              </button>
            </form>
          </div>
          {status === 'success' && (
            <p className="mt-3 text-center text-sm font-medium" role="status" style={{ color: 'var(--primary-foreground)' }}>
              Thanks for subscribing!
            </p>
          )}
          {status === 'error' && (
            <p className="mt-3 text-center text-sm font-medium" role="alert" style={{ color: 'var(--primary-foreground)' }}>
              Something went wrong. Please try again.
            </p>
          )}
        </aside>

        {/* Columns */}
        {columns && columns.length > 0 && (
          <nav aria-label="Footer navigation">
            <div className={cn('grid gap-8', COLUMN_GRID)}>
              {columns.map((column) => (
                <div key={column.title}>
                  <h4
                    className="mb-3 text-sm font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {column.title}
                  </h4>
                  <ul className="space-y-2" role="list">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className={cn(
                            'text-sm transition-colors duration-200 hover:underline underline-offset-4',
                            FOCUS_RING,
                            'rounded-sm',
                          )}
                          style={{ color: 'var(--muted-foreground)' }}
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        )}

        {/* Divider + copyright */}
        <div
          className={cn(DIVIDER_MARGIN, 'h-px')}
          style={{ backgroundColor: 'var(--border)' }}
          aria-hidden="true"
        />
        <div className="flex items-center justify-between">
          {logo ? (
            <div>{logo}</div>
          ) : (
            <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
              {companyName}
            </p>
          )}
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
