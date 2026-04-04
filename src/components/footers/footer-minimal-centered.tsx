// @version 1.0.0 // @category footers // @name footer-minimal-centered // @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FooterLink {
  label: string;
  href: string;
}

interface FooterMinimalCenteredProps {
  logo?: React.ReactNode;
  companyName?: string;
  links?: FooterLink[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function FooterMinimalCentered({
  logo,
  companyName = 'Company',
  links,
  className,
}: FooterMinimalCenteredProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'px-6 py-12 md:px-12 md:py-16',
        className,
      )}
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        {/* Logo / Brand */}
        {logo ? (
          <div>{logo}</div>
        ) : (
          <p
            className="text-lg font-bold tracking-tight"
            style={{ color: 'var(--foreground)' }}
          >
            {companyName}
          </p>
        )}

        {/* Nav links */}
        {links && links.length > 0 && (
          <nav aria-label="Footer navigation" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <a
                key={link.label}
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
            ))}
          </nav>
        )}

        {/* Copyright */}
        <p
          className="text-xs"
          style={{ color: 'var(--muted-foreground)' }}
        >
          &copy; {currentYear} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
