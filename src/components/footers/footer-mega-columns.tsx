// @version 1.0.0 // @category footers // @name footer-mega-columns // @source custom

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
                className="mb-4 text-lg font-bold tracking-tight"
                style={{ color: 'var(--foreground)' }}
              >
                {companyName}
              </p>
            )}
            {description && (
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {description}
              </p>
            )}
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <div key={column.title}>
              <h3
                className="mb-4 text-sm font-semibold uppercase tracking-wider"
                style={{ color: 'var(--foreground)' }}
              >
                {column.title}
              </h3>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={cn(
                        'text-sm transition-colors duration-200',
                        'hover:underline underline-offset-4',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
                      )}
                      style={{
                        color: 'var(--muted-foreground)',
                        ['--tw-ring-color' as string]: 'var(--primary)',
                        ['--tw-ring-offset-color' as string]: 'var(--background)',
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mt-12 mb-6 h-px"
          style={{ backgroundColor: 'var(--border)' }}
          aria-hidden="true"
        />

        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm sm:flex-row">
          <p style={{ color: 'var(--muted-foreground)' }}>
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>
          {bottomLinks && bottomLinks.length > 0 && (
            <nav aria-label="Legal links" className="flex flex-wrap gap-4">
              {bottomLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="transition-colors duration-200 hover:underline underline-offset-4"
                  style={{ color: 'var(--muted-foreground)' }}
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
