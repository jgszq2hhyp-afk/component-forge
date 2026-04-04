// @version 1.0.0 // @category footers // @name footer-with-map // @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FooterLink {
  label: string;
  href: string;
}

interface ContactInfo {
  address?: string;
  phone?: string;
  email?: string;
}

interface FooterWithMapProps {
  companyName?: string;
  contact?: ContactInfo;
  links?: FooterLink[];
  mapEmbedUrl?: string;
  mapPlaceholderText?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function FooterWithMap({
  companyName = 'Company',
  contact = {
    address: '123 Main Street, City, 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@company.com',
  },
  links = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Imprint', href: '/imprint' },
  ],
  mapEmbedUrl,
  mapPlaceholderText = 'Map placeholder — replace with your embed URL',
  className,
}: FooterWithMapProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        'px-6 py-12 md:px-12 md:py-16',
        className,
      )}
      style={{
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:gap-16">
        {/* Left — Map */}
        <div
          className="aspect-[4/3] w-full overflow-hidden rounded-xl md:aspect-auto md:min-h-[320px]"
          style={{
            backgroundColor: 'var(--muted)',
            border: '1px solid var(--border)',
          }}
        >
          {mapEmbedUrl ? (
            <iframe
              src={mapEmbedUrl}
              title={`${companyName} location`}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          ) : (
            <div
              className="flex h-full w-full items-center justify-center p-6 text-center text-sm"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {/* Map icon */}
              <div className="flex flex-col items-center gap-3">
                <svg
                  className="h-10 w-10"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                <span>{mapPlaceholderText}</span>
              </div>
            </div>
          )}
        </div>

        {/* Right — Contact + Links */}
        <div className="flex flex-col justify-between gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <p
              className="text-lg font-bold tracking-tight"
              style={{ color: 'var(--foreground)' }}
            >
              {companyName}
            </p>

            <address
              className="not-italic space-y-2 text-sm leading-relaxed"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {contact.address && <p>{contact.address}</p>}
              {contact.phone && (
                <p>
                  <a
                    href={`tel:${contact.phone.replace(/\s/g, '')}`}
                    className={cn(
                      'transition-colors duration-200',
                      'hover:underline underline-offset-4',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
                    )}
                    style={{
                      color: 'var(--muted-foreground)',
                      ['--tw-ring-color' as string]: 'var(--primary)',
                      ['--tw-ring-offset-color' as string]: 'var(--background)',
                    }}
                  >
                    {contact.phone}
                  </a>
                </p>
              )}
              {contact.email && (
                <p>
                  <a
                    href={`mailto:${contact.email}`}
                    className={cn(
                      'transition-colors duration-200',
                      'hover:underline underline-offset-4',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm',
                    )}
                    style={{
                      color: 'var(--muted-foreground)',
                      ['--tw-ring-color' as string]: 'var(--primary)',
                      ['--tw-ring-offset-color' as string]: 'var(--background)',
                    }}
                  >
                    {contact.email}
                  </a>
                </p>
              )}
            </address>
          </div>

          {/* Links */}
          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-x-6 gap-y-2"
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
            className="text-xs"
            style={{ color: 'var(--muted-foreground)' }}
          >
            &copy; {currentYear} {companyName}. All rights reserved.
          </p>
        </div>
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
