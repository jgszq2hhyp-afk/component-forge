// @version 2.0.0
// @category footers
// @name footer-mega-columns
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const LINK_TRANSITION_DURATION = '200ms';

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

interface FooterMegaColumnsProps {
  logo?: React.ReactNode;
  companyName?: string;
  description?: string;
  columns: FooterColumn[];
  bottomLinks?: FooterLink[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function FooterMegaColumns({
  logo,
  companyName = 'Company',
  description,
  columns,
  bottomLinks,
  className,
}: FooterMegaColumnsProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className={cn(
        'px-6 pt-16 pb-8 md:px-12 lg:px-20',
        className,
      )}
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Top section: brand + columns */}
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_repeat(auto-fit,1fr)]">
          {/* Brand block */}
          <div className="max-w-xs">
            {logo ? (
              <div className="mb-4">{logo}</div>
            ) : (
              <p
                className="mb-4 font-bold tracking-tight"
                style={{
                  fontSize: 'clamp(1rem, 0.5vw + 0.875rem, 1.25rem)',
                  color: 'var(--foreground)',
                }}
              >
                {companyName}
              </p>
            )}
            {description && (
              <p
                className="leading-relaxed"
                style={{
                  fontSize: 'clamp(0.8125rem, 0.25vw + 0.75rem, 0.9375rem)',
                  color: 'var(--muted-foreground)',
                }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <nav key={column.title} aria-label={`${column.title} links`}>
              <h3
                className="mb-4 font-semibold uppercase tracking-wider"
                style={{
                  fontSize: 'clamp(0.75rem, 0.2vw + 0.7rem, 0.875rem)',
                  color: 'var(--foreground)',
                }}
              >
                {column.title}
              </h3>
              <ul className="space-y-2.5" role="list">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        'inline-block rounded-sm',
                        'underline-offset-4',
                        'transition-colors',
                        'hover:underline',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                      )}
                      style={{
                        fontSize: 'clamp(0.8125rem, 0.2vw + 0.75rem, 0.9375rem)',
                        color: 'var(--muted-foreground)',
                        transitionDuration: LINK_TRANSITION_DURATION,
                        ['--tw-ring-color' as string]: 'var(--ring, var(--primary))',
                        ['--tw-ring-offset-color' as string]: 'var(--background)',
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground)';
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted-foreground)';
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        {/* Divider */}
        <hr
          className="mt-12 mb-6 border-0 h-px"
          style={{ backgroundColor: 'var(--border)' }}
          aria-hidden="true"
        />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p
            style={{
              fontSize: 'clamp(0.75rem, 0.2vw + 0.7rem, 0.875rem)',
              color: 'var(--muted-foreground)',
            }}
          >
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>
          {bottomLinks && bottomLinks.length > 0 && (
            <nav aria-label="Legal links" className="flex flex-wrap gap-4">
              {bottomLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className={cn(
                    'inline-block rounded-sm',
                    'underline-offset-4',
                    'transition-colors',
                    'hover:underline',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  )}
                  style={{
                    fontSize: 'clamp(0.75rem, 0.2vw + 0.7rem, 0.875rem)',
                    color: 'var(--muted-foreground)',
                    transitionDuration: LINK_TRANSITION_DURATION,
                    ['--tw-ring-color' as string]: 'var(--ring, var(--primary))',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--foreground)';
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLAnchorElement).style.color = 'var(--muted-foreground)';
                  }}
                >
                  {link.label}
                </a>
              ))}
            </nav>
          )}
        </div>
      </div>
    </footer>
  );
}
