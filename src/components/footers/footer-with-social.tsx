// @version 2.0.0
// @category footers
// @name footer-with-social
// @source custom

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const MAX_CONTENT_WIDTH = '80rem'; // max-w-7xl
const SOCIAL_ICON_SIZE = 40; // px – h-10 w-10
const MAX_BRAND_WIDTH = '24rem'; // max-w-sm

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Component (Server Component)                                      */
/* ------------------------------------------------------------------ */

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
      aria-label="Site footer"
    >
      <div className="mx-auto" style={{ maxWidth: MAX_CONTENT_WIDTH }}>
        {/* Top section */}
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          {/* Brand + description */}
          <div style={{ maxWidth: MAX_BRAND_WIDTH }}>
            {logo ? (
              <div className="mb-3">{logo}</div>
            ) : (
              <p
                className="mb-3 font-bold tracking-tight text-[clamp(1rem,2.5vw,1.25rem)]"
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

            {/* Social icons */}
            <div className="mt-6 flex items-center gap-3" role="list" aria-label="Social media links">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  role="listitem"
                  className={cn(
                    'inline-flex items-center justify-center rounded-full',
                    'transition-all duration-200 motion-reduce:!transition-none motion-reduce:!transform-none',
                    'hover:scale-110',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  )}
                  style={{
                    width: SOCIAL_ICON_SIZE,
                    height: SOCIAL_ICON_SIZE,
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
            <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-8 gap-y-3">
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
        </div>

        {/* Divider */}
        <div
          className="mt-12 mb-6 h-px"
          style={{ backgroundColor: 'var(--border)' }}
          role="separator"
          aria-hidden="true"
        />

        {/* Copyright */}
        <small
          className="block text-center text-xs"
          style={{ color: 'var(--muted-foreground)' }}
        >
          &copy; {currentYear} {companyName}. All rights reserved.
        </small>
      </div>
    </footer>
  );
}
