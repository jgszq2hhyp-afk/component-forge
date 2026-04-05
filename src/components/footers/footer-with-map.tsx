// @version 2.0.0
// @category footers
// @name footer-with-map
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const SECTION_PADDING_X = 'px-6 md:px-12';
const SECTION_PADDING_Y = 'py-12 md:py-16';
const MAP_ASPECT_RATIO = 'aspect-[4/3] md:aspect-auto';
const MAP_MIN_HEIGHT = 'md:min-h-[320px]';
const MAP_RADIUS = 'rounded-xl';
const MAP_ICON_SIZE = 40;
const GRID_LAYOUT = 'md:grid-cols-2';
const GRID_GAP = 'gap-10 lg:gap-16';
const LINK_GAP = 'gap-x-6 gap-y-2';
const COMPANY_NAME_SIZE = 'clamp(1.125rem, 1rem + 0.5vw, 1.25rem)';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

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
      aria-label="Site footer"
      className={cn(SECTION_PADDING_X, SECTION_PADDING_Y, className)}
      style={{
        backgroundColor: 'var(--background)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div className={cn('mx-auto grid', SECTION_MAX_WIDTH, GRID_LAYOUT, GRID_GAP)}>
        {/* Left -- Map */}
        <figure
          className={cn(
            'w-full overflow-hidden',
            MAP_ASPECT_RATIO,
            MAP_MIN_HEIGHT,
            MAP_RADIUS,
          )}
          style={{
            backgroundColor: 'var(--muted)',
            border: '1px solid var(--border)',
          }}
          aria-label={`${companyName} location map`}
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
            <figcaption
              className="flex h-full w-full items-center justify-center p-6 text-center text-sm"
              style={{ color: 'var(--muted-foreground)' }}
            >
              <div className="flex flex-col items-center gap-3">
                <svg
                  width={MAP_ICON_SIZE}
                  height={MAP_ICON_SIZE}
                  viewBox="0 0 24 24"
                  fill="none"
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
            </figcaption>
          )}
        </figure>

        {/* Right -- Contact + Links */}
        <div className="flex flex-col justify-between gap-8">
          {/* Contact info */}
          <div className="space-y-4">
            <p
              className="font-bold tracking-tight"
              style={{
                color: 'var(--foreground)',
                fontSize: COMPANY_NAME_SIZE,
              }}
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
                      'rounded-sm',
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
                    {contact.phone}
                  </a>
                </p>
              )}
              {contact.email && (
                <p>
                  <a
                    href={`mailto:${contact.email}`}
                    className={cn(
                      'rounded-sm',
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
                    {contact.email}
                  </a>
                </p>
              )}
            </address>
          </div>

          {/* Navigation links */}
          <nav
            aria-label="Footer navigation"
            className={cn('flex flex-wrap', LINK_GAP)}
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
            className="block text-xs"
            style={{ color: 'var(--muted-foreground)' }}
          >
            &copy; {currentYear} {companyName}. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
}
