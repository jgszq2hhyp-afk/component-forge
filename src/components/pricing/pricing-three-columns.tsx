// @version 1.0.0 // @category pricing // @name pricing-three-columns // @source custom

import { cn } from '@/lib/utils';

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
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M3.5 8.5L6.5 11.5L12.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4.5 4.5L11.5 11.5M11.5 4.5L4.5 11.5"
        stroke="currentColor"
        strokeWidth="1.5"
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
      className={cn('px-6 py-20 md:px-12 md:py-28 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)',
              color: 'var(--foreground)',
            }}
          >
            {headline}
          </h2>
          {description && (
            <p
              className="mt-4 text-base leading-relaxed md:text-lg"
              style={{ color: 'var(--muted-foreground)' }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Plans grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative flex flex-col rounded-2xl border p-8',
                'transition-shadow duration-200',
                plan.highlighted && 'shadow-lg',
              )}
              style={{
                borderColor: plan.highlighted ? 'var(--primary)' : 'var(--border)',
                backgroundColor: 'var(--background)',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <span
                  className="absolute -top-3 left-6 rounded-full px-3 py-0.5 text-xs font-semibold"
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
                  className="text-4xl font-bold tracking-tight"
                  style={{ color: 'var(--foreground)' }}
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
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 shrink-0"
                      style={{
                        color: feature.included
                          ? 'var(--primary)'
                          : 'var(--muted-foreground)',
                        opacity: feature.included ? 1 : 0.4,
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
                  'transition-all duration-200',
                  'hover:brightness-110',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                  'active:scale-[0.98]',
                )}
                style={
                  plan.highlighted
                    ? {
                        backgroundColor: 'var(--primary)',
                        color: 'var(--primary-foreground)',
                        ['--tw-ring-color' as string]: 'var(--primary)',
                        ['--tw-ring-offset-color' as string]: 'var(--background)',
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: 'var(--foreground)',
                        border: '1px solid var(--border)',
                        ['--tw-ring-color' as string]: 'var(--foreground)',
                        ['--tw-ring-offset-color' as string]: 'var(--background)',
                      }
                }
              >
                {plan.ctaText}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
