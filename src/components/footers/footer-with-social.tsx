// @version 1.0.0 // @category footers // @name footer-with-social // @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FooterLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface FooterWithSocialProps {
  logo?: React.ReactNode;
  companyName?: string;
  description?: string;
  links?: FooterLink[];
  socialLinks: SocialLink[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function FooterWithSocial({
  logo,
  companyName = 'Company',
  description,
  links,
  socialLinks,
  className,
}: FooterWithSocialProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn('px-6 pt-16 pb-8 md:px-12 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}
    >
      <div className="mx-auto max-w-7xl">
        {/* Top section */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand + description */}
          <div className="max-w-sm">
            {logo ? (
              <div className="mb-3">{logo}</div>
            ) : (
              <p
                className="mb-3 text-lg font-bold tracking-tight"
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

            {/* Social icons — prominent */}
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className={cn(
                    'inline-flex h-10 w-10 items-center justify-center rounded-full',
                    'transition-all duration-200',
                    'hover:scale-110',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  )}
                  style={{
                    backgroundColor: 'color-mix(in oklch, var(--foreground) 8%, transparent)',
                    color: 'var(--foreground)',
                    ['--tw-ring-color' as string]: 'var(--primary)',
                    ['--tw-ring-offset-color' as string]: 'var(--background)',
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation links */}
          {links && links.length > 0 && (
            <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
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
        </div>

        {/* Divider */}
        <div
          className="mt-12 mb-6 h-px"
          style={{ backgroundColor: 'var(--border)' }}
          aria-hidden="true"
        />

        {/* Copyright */}
        <p
          className="text-center text-xs"
          style={{ color: 'var(--muted-foreground)' }}
        >
          &copy; {currentYear} {companyName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
