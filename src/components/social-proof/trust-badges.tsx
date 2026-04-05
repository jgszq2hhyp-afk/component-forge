// @version 2.0.0
// @category social-proof
// @name Trust Badges
// @source custom-implementation

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SECTION_MAX_WIDTH = 'max-w-7xl';
const SECTION_PADDING_X = 'px-4 sm:px-6 lg:px-8';
const SECTION_PADDING_Y = 'py-8 sm:py-12';
const ICON_SIZE = 'h-6 w-6';
const BADGE_RADIUS = 'rounded-xl';
const BADGE_PADDING = 'px-4 py-3';
const BADGE_GAP = 'gap-3';
const HEADING_CLAMP = 'clamp(0.75rem, 1vw + 0.25rem, 0.875rem)';
const HEADING_MARGIN_BOTTOM = 'mb-6';
const HORIZONTAL_GAP = 'gap-6 sm:gap-10';
const GRID_GAP = 'gap-6';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Badge {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
}

interface TrustBadgesProps {
  badges?: Badge[];
  heading?: string;
  layout?: 'horizontal' | 'grid';
  className?: string;
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  );
}

function LockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const defaultBadges: Badge[] = [
  {
    icon: <ShieldIcon className={ICON_SIZE} />,
    label: 'SSL Secured',
    sublabel: '256-bit encryption',
  },
  {
    icon: <StarIcon className={ICON_SIZE} />,
    label: '4.9/5 Rating',
    sublabel: '500+ reviews',
  },
  {
    icon: <LockIcon className={ICON_SIZE} />,
    label: 'GDPR Compliant',
    sublabel: 'Data protection',
  },
  {
    icon: <CheckIcon className={ICON_SIZE} />,
    label: 'ISO 27001',
    sublabel: 'Certified',
  },
];

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function TrustBadges({
  badges = defaultBadges,
  heading,
  layout = 'horizontal',
  className,
}: TrustBadgesProps) {
  return (
    <section
      className={cn(
        SECTION_PADDING_Y,
        'border-y border-[var(--trust-badge-border,hsl(0_0%_0%/0.06))]',
        'bg-[var(--trust-badge-bg,hsl(0_0%_98%))]',
        className,
      )}
      aria-label={heading ?? 'Vertrauensindikatoren'}
    >
      <div className={cn('mx-auto', SECTION_MAX_WIDTH, SECTION_PADDING_X)}>
        {heading && (
          <h2
            className={cn(
              HEADING_MARGIN_BOTTOM,
              'text-center font-medium',
              'text-[var(--trust-badge-heading-color,hsl(0_0%_45%))]',
            )}
            style={{ fontSize: HEADING_CLAMP }}
          >
            {heading}
          </h2>
        )}

        <ul
          className={cn(
            layout === 'horizontal'
              ? cn('flex flex-wrap items-center justify-center', HORIZONTAL_GAP)
              : cn('grid grid-cols-2 sm:grid-cols-4', GRID_GAP),
          )}
          role="list"
        >
          {badges.map((badge) => (
            <li
              key={badge.label}
              className={cn(
                'flex items-center',
                BADGE_GAP,
                BADGE_RADIUS,
                BADGE_PADDING,
                'bg-[var(--trust-badge-card-bg,hsl(0_0%_100%))]',
                'border border-[var(--trust-badge-card-border,hsl(0_0%_0%/0.06))]',
                'shadow-sm',
              )}
            >
              <div
                className="flex-shrink-0 text-[var(--trust-badge-icon-color,hsl(142_71%_45%))]"
                aria-hidden="true"
              >
                {badge.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--trust-badge-label-color,hsl(0_0%_9%))]">
                  {badge.label}
                </p>
                {badge.sublabel && (
                  <p className="text-xs text-[var(--trust-badge-sublabel-color,hsl(0_0%_45%))]">
                    {badge.sublabel}
                  </p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
