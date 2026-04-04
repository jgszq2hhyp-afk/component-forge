// @version 1.0.0 // @category footers // @name footer-simple-links // @source custom

import { cn } from '@/lib/utils';

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
      className={cn(
        'px-6 py-6 md:px-12 md:py-8',
        className,
      )}
      style={{
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 md:flex-row md:justify-between">
        {/* Links row */}
        <nav
          aria-label="Footer navigation"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:justify-start"
        >
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

        {/* Copyright */}
        <p
          className="whitespace-nowrap text-xs"
          style={{ color: 'var(--muted-foreground)' }}
        >
          &copy; {currentYear} {companyName}
        </p>
      </div>

      {/* Reduced-motion */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
@media (prefers-reduced-motion: reduce) {
  footer a {
    transition-duration: 0.01ms !important;
  }
}`,
        }}
      />
    </footer>
  );
}
