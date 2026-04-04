// @version 2.0.0
// @category footers
// @name footer-split-cta
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const CTA_PADDING_X = 'px-6 md:px-12 lg:px-20';
const CTA_PADDING_Y = 'py-16 md:py-20';
const FOOTER_PADDING_X = 'px-6 md:px-12 lg:px-20';
const FOOTER_PADDING_Y = 'pt-14 pb-8';
const CTA_DESCRIPTION_MAX_WIDTH = 'max-w-lg';
const COLUMN_GRID = 'sm:grid-cols-2 lg:grid-cols-4';
const DIVIDER_MARGIN = 'mt-12 mb-6';
const BUTTON_PADDING = 'px-8 py-3.5';
const BUTTON_FONT_SIZE = 'text-[0.9375rem]';
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
    <footer
      aria-label="Site footer"
      className={cn('overflow-hidden', className)}
    >
      {/* CTA Section */}
      <section
        aria-label="Call to action"
        className={cn(CTA_PADDING_X, CTA_PADDING_Y)}
        style={{ backgroundColor: 'var(--primary)', color: 'var(--primary-foreground)' }}
      >
        <div className={cn('mx-auto flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between', SECTION_MAX_WIDTH)}>
          <div className={CTA_DESCRIPTION_MAX_WIDTH}>
            <h2
              className="font-bold tracking-tight"
              style={{
                color: 'var(--primary-foreground)',
                fontSize: 'clamp(1.5rem, 1.25rem + 1vw, 1.875rem)',
              }}
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
              'rounded-lg font-semibold',
              BUTTON_PADDING,
              BUTTON_FONT_SIZE,
              'transition-all duration-200',
              'hover:brightness-110 hover:shadow-lg',
              FOCUS_RING,
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
        aria-label="Footer links and information"
        className={cn(FOOTER_PADDING_X, FOOTER_PADDING_Y)}
        style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
      >
        <div className={cn('mx-auto', SECTION_MAX_WIDTH)}>
          {/* Columns */}
          {columns && columns.length > 0 && (
            <nav aria-label="Footer navigation">
              <div className={cn('grid gap-8', COLUMN_GRID)}>
                {columns.map((column) => (
                  <div key={column.title}>
                    <h3
                      className="mb-3 text-sm font-semibold uppercase tracking-wider"
                      style={{ color: 'var(--foreground)' }}
                    >
                      {column.title}
                    </h3>
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

          {/* Divider */}
          <div
            className={cn(DIVIDER_MARGIN, 'h-px')}
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
                    className={cn(
                      'text-xs transition-colors duration-200 hover:underline underline-offset-4',
                      FOCUS_RING,
                      'rounded-sm',
                    )}
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
