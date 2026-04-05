// @version 2.0.0
// @category footers
// @name footer-simple-links
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const SECTION_PADDING_X = 'px-6 md:px-12';
const SECTION_PADDING_Y = 'py-6 md:py-8';
const LINK_GAP = 'gap-x-6 gap-y-2';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSimpleLinksProps {
  companyName?: string;
  links?: FooterLink[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function FooterSimpleLinks({
  companyName = 'Company',
  links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Imprint', href: '/imprint' },
  ],
  className,
}: FooterSimpleLinksProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className={cn(SECTION_PADDING_X, SECTION_PADDING_Y, className)}
      style={{
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div
        className={cn(
          'mx-auto flex flex-col items-center gap-4 md:flex-row md:justify-between',
          SECTION_MAX_WIDTH,
        )}
      >
        {/* Navigation links */}
        <nav
          aria-label="Footer navigation"
          className={cn('flex flex-wrap justify-center md:justify-start', LINK_GAP)}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className={cn(
                'text-sm rounded-sm',
                'transition-colors duration-200 motion-reduce:transition-none',
                'hover:underline underline-offset-4',
                FOCUS_RING,
              )}
              style={{
                color: 'var(--muted-foreground)',
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Copyright */}
        <small
          className="block whitespace-nowrap text-xs"
          style={{ color: 'var(--muted-foreground)' }}
        >
          &copy; {currentYear} {companyName}
        </small>
      </div>
    </footer>
  );
}
