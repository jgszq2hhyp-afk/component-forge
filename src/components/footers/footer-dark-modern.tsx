// @version 2.0.0
// @category footers
// @name footer-dark-modern
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const SECTION_PADDING_X = 'px-6 md:px-12 lg:px-20';
const SECTION_PADDING_TOP = 'pt-20';
const SECTION_PADDING_BOTTOM = 'pb-8';
const BRAND_MAX_WIDTH = 'max-w-sm';
const GRID_LAYOUT = 'lg:grid-cols-[1.5fr_2fr]';
const COLUMN_GRID = 'sm:grid-cols-2 lg:grid-cols-3';
const DIVIDER_MARGIN = 'mt-16 mb-6';
const ORB_SIZE = 'h-80 w-80';
const ORB_OFFSET = '-top-40';
const ORB_BLUR = 'blur-[100px]';
const ORB_OPACITY = 'opacity-20';
const COLUMN_HEADING_TRACKING = 'tracking-[0.15em]';
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

const linkColor: React.CSSProperties = {
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
      aria-label="Site footer"
      className={cn(
        'relative overflow-hidden',
        SECTION_PADDING_X,
        SECTION_PADDING_TOP,
        SECTION_PADDING_BOTTOM,
        className,
      )}
      style={sectionStyles}
    >
      {/* Decorative gradient orb */}
      <div
        className={cn(
          'pointer-events-none absolute right-0 rounded-full',
          ORB_SIZE,
          ORB_OFFSET,
          ORB_OPACITY,
          ORB_BLUR,
        )}
        aria-hidden="true"
        style={{
          background: 'var(--primary)',
        }}
      />

      <div className={cn('relative mx-auto', SECTION_MAX_WIDTH)}>
        {/* Top section */}
        <div className={cn('grid gap-12', GRID_LAYOUT)}>
          {/* Brand */}
          <div className={BRAND_MAX_WIDTH}>
            {logo ? (
              <div className="mb-4">{logo}</div>
            ) : (
              <p
                className="mb-4 font-bold tracking-tight"
                style={{
                  ...headingText,
                  fontSize: 'clamp(1.5rem, 1.25rem + 1vw, 1.875rem)',
                }}
              >
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
          <nav aria-label="Footer navigation">
            <div className={cn('grid gap-8', COLUMN_GRID)}>
              {columns.map((column) => (
                <div key={column.title}>
                  <h3
                    className={cn(
                      'mb-4 text-xs font-semibold uppercase',
                      COLUMN_HEADING_TRACKING,
                    )}
                    style={headingText}
                  >
                    {column.title}
                  </h3>
                  <ul className="space-y-2.5" role="list">
                    {column.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className={cn(
                            'text-sm transition-colors duration-200',
                            'hover:underline underline-offset-4',
                            FOCUS_RING,
                            'rounded-sm',
                          )}
                          style={{
                            ...linkColor,
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
          </nav>
        </div>

        {/* Divider */}
        <div
          className={cn(DIVIDER_MARGIN, 'h-px')}
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
                  className={cn(
                    'text-xs transition-colors duration-200 hover:underline underline-offset-4',
                    FOCUS_RING,
                    'rounded-sm',
                  )}
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
