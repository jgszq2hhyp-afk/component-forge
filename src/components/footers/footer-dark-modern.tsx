// @version 1.0.0 // @category footers // @name footer-dark-modern // @source custom

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

interface FooterDarkModernProps {
  logo?: React.ReactNode;
  companyName?: string;
  tagline?: string;
  columns: FooterColumn[];
  bottomLinks?: FooterLink[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Style helpers (dark themed via CSS variables)
// ---------------------------------------------------------------------------

const sectionStyles: React.CSSProperties = {
  backgroundColor: 'color-mix(in oklch, var(--foreground) 95%, var(--background))',
  color: 'var(--background)',
};

const mutedText: React.CSSProperties = {
  color: 'color-mix(in oklch, var(--background) 60%, transparent)',
};

const headingText: React.CSSProperties = {
  color: 'var(--background)',
};

const linkHover: React.CSSProperties = {
  color: 'color-mix(in oklch, var(--background) 60%, transparent)',
};

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function FooterDarkModern({
  logo,
  companyName = 'Company',
  tagline,
  columns,
  bottomLinks,
  className,
}: FooterDarkModernProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn('relative overflow-hidden px-6 pt-20 pb-8 md:px-12 lg:px-20', className)}
      style={sectionStyles}
    >
      {/* Decorative gradient orb */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-80 w-80 rounded-full opacity-20 blur-[100px]"
        aria-hidden="true"
        style={{
          background: 'var(--primary)',
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Top section */}
        <div className="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            {logo ? (
              <div className="mb-4">{logo}</div>
            ) : (
              <p className="mb-4 text-2xl font-bold tracking-tight" style={headingText}>
                {companyName}
              </p>
            )}
            {tagline && (
              <p className="text-sm leading-relaxed" style={mutedText}>
                {tagline}
              </p>
            )}
          </div>

          {/* Columns grid */}
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3
                  className="mb-4 text-xs font-semibold uppercase tracking-[0.15em]"
                  style={headingText}
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
                          'focus-visible:outline-none focus-visible:ring-2 rounded-sm',
                        )}
                        style={{
                          ...linkHover,
                          ['--tw-ring-color' as string]: 'var(--primary)',
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
        </div>

        {/* Divider */}
        <div
          className="mt-16 mb-6 h-px"
          style={{
            backgroundColor: 'color-mix(in oklch, var(--background) 12%, transparent)',
          }}
          aria-hidden="true"
        />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs" style={mutedText}>
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>
          {bottomLinks && bottomLinks.length > 0 && (
            <nav aria-label="Legal" className="flex flex-wrap gap-4">
              {bottomLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-xs transition-colors duration-200 hover:underline underline-offset-4"
                  style={mutedText}
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
