// @version 2.0.0
// @category footers
// @name footer-minimal-centered
// @source custom

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const MAX_CONTENT_WIDTH = '48rem'; // max-w-3xl

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Component (Server Component)                                      */
/* ------------------------------------------------------------------ */

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
      aria-label="Site footer"
    >
      <div
        className="mx-auto flex flex-col items-center gap-6 text-center"
        style={{ maxWidth: MAX_CONTENT_WIDTH }}
      >
        {/* Logo / Brand */}
        {logo ? (
          <div>{logo}</div>
        ) : (
          <p
            className="font-bold tracking-tight text-[clamp(1rem,2.5vw,1.25rem)]"
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
                  'text-sm rounded-sm',
                  'transition-colors duration-200 motion-reduce:!transition-none',
                  'hover:underline underline-offset-4',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
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
        <small
          className="text-xs block"
          style={{ color: 'var(--muted-foreground)' }}
        >
          &copy; {currentYear} {companyName}. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
