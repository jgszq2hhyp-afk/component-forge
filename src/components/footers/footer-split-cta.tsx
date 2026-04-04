// @version 1.0.0 // @category footers // @name footer-split-cta // @source custom

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

interface FooterSplitCtaProps {
  ctaHeadline: string;
  ctaDescription?: string;
  ctaButtonText: string;
  ctaButtonHref: string;
  logo?: React.ReactNode;
  companyName?: string;
  columns?: FooterColumn[];
  bottomLinks?: FooterLink[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function FooterSplitCta({
  ctaHeadline,
  ctaDescription,
  ctaButtonText,
  ctaButtonHref,
  logo,
  companyName = 'Company',
  columns,
  bottomLinks,
  className,
}: FooterSplitCtaProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn('overflow-hidden', className)}>
      {/* CTA Section */}
      <section
        className="px-6 py-16 md:px-12 md:py-20 lg:px-20"
        style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
      >
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-lg">
            <h2
              className="text-2xl font-bold tracking-tight md:text-3xl"
              style={{ color: 'var(--primary-foreground)' }}
            >
              {ctaHeadline}
            </h2>
            {ctaDescription && (
              <p
                className="mt-3 text-base leading-relaxed"
                style={{
                  color: 'color-mix(in oklch, var(--primary-foreground) 80%, transparent)',
                }}
              >
                {ctaDescription}
              </p>
            )}
          </div>
          <a
            href={ctaButtonHref}
            className={cn(
              'inline-flex items-center justify-center',
              'rounded-lg px-8 py-3.5 text-[0.9375rem] font-semibold',
              'transition-all duration-200',
              'hover:brightness-110 hover:shadow-lg',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'active:scale-[0.98]',
              'shrink-0',
            )}
            style={{
              backgroundColor: 'var(--primary-foreground)',
              color: 'var(--primary)',
              ['--tw-ring-color' as string]: 'var(--primary-foreground)',
              ['--tw-ring-offset-color' as string]: 'var(--primary)',
            }}
          >
            {ctaButtonText}
          </a>
        </div>
      </section>

      {/* Footer main section */}
      <section
        className="px-6 pt-14 pb-8 md:px-12 lg:px-20"
        style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Columns */}
          {columns && columns.length > 0 && (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {columns.map((column) => (
                <div key={column.title}>
                  <h3
                    className="mb-3 text-sm font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {column.title}
                  </h3>
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

          {/* Divider */}
          <div
            className="mt-12 mb-6 h-px"
            style={{ backgroundColor: 'var(--border)' }}
            aria-hidden="true"
          />

          {/* Bottom bar */}
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              {logo ? (
                <div>{logo}</div>
              ) : (
                <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
                  {companyName}
                </p>
              )}
              <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                &copy; {currentYear}
              </span>
            </div>
            {bottomLinks && bottomLinks.length > 0 && (
              <nav aria-label="Legal" className="flex flex-wrap gap-4">
                {bottomLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="text-xs transition-colors duration-200 hover:underline underline-offset-4"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      </section>
    </footer>
  );
}
