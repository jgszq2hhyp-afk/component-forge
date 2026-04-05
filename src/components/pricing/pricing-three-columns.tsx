// @version 2.0.0
// @category pricing
// @name pricing-three-columns
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)';
const SUBHEADING_CLAMP = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const PRICE_CLAMP = 'clamp(2rem, 1.5rem + 2vw, 2.5rem)';
const SECTION_MAX_WIDTH = '72rem';
const BADGE_OFFSET_TOP = '-top-3';
const BADGE_OFFSET_LEFT = 'left-6';
const CTA_ACTIVE_SCALE = '0.98';
const ICON_SIZE = 16;
const ICON_STROKE_WIDTH = 1.5;
const FEATURE_EXCLUDED_OPACITY = 0.4;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description?: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  ctaText: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
}

interface PricingThreeColumnsProps {
  headline?: string;
  description?: string;
  plans: [PricingPlan, PricingPlan, PricingPlan];
  className?: string;
}

// ---------------------------------------------------------------------------
// Check / X icons
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5"
        stroke="currentColor"
        strokeWidth={ICON_STROKE_WIDTH}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function PricingThreeColumns({
  headline = 'Simple, transparent pricing',
  description,
  plans,
  className,
}: PricingThreeColumnsProps) {
  return (
    <section
      aria-label={headline}
      className={cn('px-6 py-20 md:px-12 md:py-28 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto" style={{ maxWidth: SECTION_MAX_WIDTH }}>
        {/* Header */}
        <header className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            {headline}
          </h2>
          {description && (
            <p
              className="mt-4 leading-relaxed"
              style={{
                color: 'var(--muted-foreground)',
                fontSize: SUBHEADING_CLAMP,
              }}
            >
              {description}
            </p>
          )}
        </header>

        {/* Plans grid */}
        <div className="grid gap-8 md:grid-cols-3" role="list">
          {plans.map((plan) => (
            <article
              key={plan.name}
              role="listitem"
              className={cn(
                'relative flex flex-col rounded-2xl border p-8',
                'transition-shadow duration-200 motion-reduce:transition-none',
                plan.highlighted && 'shadow-lg',
              )}
              style={{
                borderColor: plan.highlighted
                  ? 'var(--primary)'
                  : 'var(--border)',
                backgroundColor: 'var(--background)',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <span
                  className={cn(
                    'absolute rounded-full px-3 py-0.5 text-xs font-semibold',
                    BADGE_OFFSET_TOP,
                    BADGE_OFFSET_LEFT,
                  )}
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  {plan.badge}
                </span>
              )}

              {/* Plan header */}
              <h3
                className="text-lg font-semibold"
                style={{ color: 'var(--foreground)' }}
              >
                {plan.name}
              </h3>
              {plan.description && (
                <p
                  className="mt-1 text-sm"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  {plan.description}
                </p>
              )}

              {/* Price */}
              <div className="mt-6 flex items-baseline gap-1">
                <span
                  className="font-bold tracking-tight"
                  style={{
                    fontSize: PRICE_CLAMP,
                    color: 'var(--foreground)',
                  }}
                >
                  {plan.price}
                </span>
                {plan.period && (
                  <span
                    className="text-sm"
                    style={{ color: 'var(--muted-foreground)' }}
                  >
                    /{plan.period}
                  </span>
                )}
              </div>

              {/* Features */}
              <ul
                className="mt-8 flex-1 space-y-3"
                aria-label={`${plan.name} features`}
              >
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 shrink-0"
                      aria-hidden="true"
                      style={{
                        color: feature.included
                          ? 'var(--primary)'
                          : 'var(--muted-foreground)',
                        opacity: feature.included
                          ? 1
                          : FEATURE_EXCLUDED_OPACITY,
                      }}
                    >
                      {feature.included ? <CheckIcon /> : <XIcon />}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        color: feature.included
                          ? 'var(--foreground)'
                          : 'var(--muted-foreground)',
                      }}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={plan.ctaHref}
                className={cn(
                  'mt-8 inline-flex items-center justify-center',
                  'rounded-lg px-6 py-3 text-sm font-semibold',
                  'transition-all duration-200 motion-reduce:transition-none',
                  'hover:brightness-110',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  `active:scale-[${CTA_ACTIVE_SCALE}]`,
                )}
                style={
                  plan.highlighted
                    ? {
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                        ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                        ['--tw-ring-offset-color' as string]:
                          'var(--background)',
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: 'var(--foreground)',
                        border: '1px solid var(--border)',
                        ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                        ['--tw-ring-offset-color' as string]:
                          'var(--background)',
                      }
                }
              >
                {plan.ctaText}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
