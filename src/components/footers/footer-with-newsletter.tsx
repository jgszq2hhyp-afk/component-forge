// @version 1.0.0 // @category footers // @name footer-with-newsletter // @source custom

'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

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
      className={cn('px-6 pt-16 pb-8 md:px-12 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Newsletter banner */}
        <div
          className="mb-12 rounded-2xl px-6 py-10 md:px-12 md:py-14"
          style={{
            backgroundColor: 'var(--primary)',
            color: 'var(--primary-foreground)',
          }}
        >
          <div className="mx-auto flex max-w-4xl flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-md">
              <h3
                className="text-xl font-bold tracking-tight md:text-2xl"
                style={{ color: 'var(--primary-foreground)' }}
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
            <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
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
                  'flex-1 rounded-lg px-4 py-2.5 text-sm',
                  'placeholder:opacity-60',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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
                  'whitespace-nowrap rounded-lg px-5 py-2.5 text-sm font-semibold',
                  'transition-all duration-200',
                  'hover:brightness-110 active:scale-[0.98]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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
            <p className="mt-3 text-center text-sm font-medium" style={{ color: 'var(--primary-foreground)' }}>
              Thanks for subscribing!
            </p>
          )}
          {status === 'error' && (
            <p className="mt-3 text-center text-sm font-medium" style={{ color: 'var(--primary-foreground)' }}>
              Something went wrong. Please try again.
            </p>
          )}
        </div>

        {/* Columns */}
        {columns && columns.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {columns.map((column) => (
              <div key={column.title}>
                <h4
                  className="mb-3 text-sm font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--foreground)' }}
                >
                  {column.title}
                </h4>
                <ul className="space-y-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors duration-200 hover:underline underline-offset-4"
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
        )}

        {/* Divider + copyright */}
        <div
          className="mt-12 mb-6 h-px"
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
