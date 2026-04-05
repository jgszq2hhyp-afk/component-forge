// @version 2.0.0
// @category footers
// @name footer-gradient-cta
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const CTA_MAX_WIDTH = 'max-w-3xl';
const CTA_DESCRIPTION_MAX_WIDTH = 'max-w-xl';
const CTA_PADDING = 'px-6 py-16 md:px-12 md:py-20';
const FOOTER_PADDING = 'px-6 py-10 md:px-12 md:py-14';
const HEADING_CLAMP = 'clamp(1.5rem, 3vw + 0.5rem, 2.5rem)';
const BUTTON_PADDING = 'px-8 py-3.5';
const BUTTON_FONT_SIZE = 'text-[0.9375rem]';
const COLUMN_GRID = 'grid-cols-2 sm:grid-cols-3';
const COLUMN_GAP = 'gap-8 md:gap-12';
const COLUMN_HEADING_TRACKING = 'tracking-wider';
const DIVIDER_MARGIN = 'mt-10 pt-6';
const ACTIVE_SCALE = 'active:scale-[0.98]';
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FooterLink {
  label: string;
  href: string;
}

interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

interface FooterGradientCtaProps {
  ctaHeadline?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaHref?: string;
  companyName?: string;
  linkGroups?: FooterLinkGroup[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function FooterGradientCta({
  ctaHeadline = 'Ready to get started?',
  ctaDescription = 'Join thousands of satisfied customers and take your business to the next level.',
  ctaButtonText = 'Start Free Trial',
  ctaHref = '#signup',
  companyName = 'Company',
  linkGroups = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/features' },
        { label: 'Pricing', href: '/pricing' },
        { label: 'Integrations', href: '/integrations' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Blog', href: '/blog' },
        { label: 'Careers', href: '/careers' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
        { label: 'Imprint', href: '/imprint' },
      ],
    },
  ],
  className,
}: FooterGradientCtaProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className={cn('w-full', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Gradient CTA banner */}
      <section
        aria-label="Call to action"
        className={CTA_PADDING}
        style={{
          background:
            'linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 60%, var(--accent)))',
        }}
      >
        <div className={cn('mx-auto flex flex-col items-center gap-6 text-center', CTA_MAX_WIDTH)}>
          <h2
            className="font-bold tracking-tight leading-[1.1]"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--primary-foreground)',
            }}
          >
            {ctaHeadline}
          </h2>

          <p
            className={cn('text-base leading-relaxed', CTA_DESCRIPTION_MAX_WIDTH)}
            style={{
              color: 'color-mix(in oklch, var(--primary-foreground) 85%, transparent)',
            }}
          >
            {ctaDescription}
          </p>

          <a
            href={ctaHref}
            className={cn(
              'mt-2 inline-flex items-center justify-center',
              'rounded-lg font-semibold',
              BUTTON_PADDING,
              BUTTON_FONT_SIZE,
              'transition-all duration-200 motion-reduce:transition-none',
              'hover:brightness-110 hover:shadow-lg',
              FOCUS_RING,
              ACTIVE_SCALE,
              'motion-reduce:active:scale-100',
            )}
            style={{
              backgroundColor: 'var(--primary-foreground)',
              color: 'var(--primary)',
              ['--tw-ring-color' as string]: 'var(--primary-foreground)',
              ['--tw-ring-offset-color' as string]: 'var(--primary)',
            }}
          >
            {ctaButtonText}
          </a>
        </div>
      </section>

      {/* Footer links section */}
      <section
        aria-label="Footer links and information"
        className={FOOTER_PADDING}
        style={{
          backgroundColor: 'var(--background)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className={cn('mx-auto', SECTION_MAX_WIDTH)}>
          {/* Link group columns */}
          <nav aria-label="Footer navigation">
            <div className={cn('grid', COLUMN_GRID, COLUMN_GAP)}>
              {linkGroups.map((group) => (
                <div key={group.title}>
                  <h3
                    className={cn(
                      'mb-3 text-sm font-semibold uppercase',
                      COLUMN_HEADING_TRACKING,
                    )}
                    style={{ color: 'var(--foreground)' }}
                  >
                    {group.title}
                  </h3>
                  <ul className="space-y-2" role="list">
                    {group.links.map((link) => (
                      <li key={link.label}>
                        <a
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
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>

          {/* Divider + copyright */}
          <div
            className={DIVIDER_MARGIN}
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <small
              className="block text-center text-xs"
              style={{ color: 'var(--muted-foreground)' }}
            >
              &copy; {currentYear} {companyName}. All rights reserved.
            </small>
          </div>
        </div>
      </section>
    </footer>
  );
}
