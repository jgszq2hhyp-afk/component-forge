// @version 1.0.0 // @category footers // @name footer-gradient-cta // @source custom

import { cn } from '@/lib/utils';

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
      className={cn('w-full', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      {/* Gradient CTA banner */}
      <div
        className="px-6 py-16 md:px-12 md:py-20"
        style={{
          background:
            'linear-gradient(135deg, var(--primary), color-mix(in oklch, var(--primary) 60%, var(--accent)))',
        }}
      >
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2
            className="font-bold tracking-tight leading-[1.1]"
            style={{
              fontSize: 'clamp(1.5rem, 3vw + 0.5rem, 2.5rem)',
              color: 'var(--primary-foreground)',
            }}
          >
            {ctaHeadline}
          </h2>

          <p
            className="max-w-xl text-base leading-relaxed"
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
              'rounded-lg px-8 py-3.5 text-[0.9375rem] font-semibold',
              'transition-all duration-200',
              'hover:brightness-110 hover:shadow-lg',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
              'active:scale-[0.98]',
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
      </div>

      {/* Standard footer links */}
      <div
        className="px-6 py-10 md:px-12 md:py-14"
        style={{
          backgroundColor: 'var(--background)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div className="mx-auto max-w-7xl">
          {/* Link groups */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:gap-12">
            {linkGroups.map((group) => (
              <div key={group.title}>
                <p
                  className="mb-3 text-sm font-semibold uppercase tracking-wider"
                  style={{ color: 'var(--foreground)' }}
                >
                  {group.title}
                </p>
                <ul className="space-y-2">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
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
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="mt-10 pt-6 text-center"
            style={{ borderTop: '1px solid var(--border)' }}
          >
            <p
              className="text-xs"
              style={{ color: 'var(--muted-foreground)' }}
            >
              &copy; {currentYear} {companyName}. All rights reserved.
            </p>
          </div>
        </div>
      </div>

      {/* Reduced-motion */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
@media (prefers-reduced-motion: reduce) {
  footer a {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}`,
        }}
      />
    </footer>
  );
}
