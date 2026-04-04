// @version 1.0.0 // @category pricing // @name pricing-toggle-monthly // @source custom

'use client';

import { useState } from 'react';
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
  monthlyPrice: string;
  yearlyPrice: string;
  features: PricingFeature[];
  ctaText: string;
  ctaHref: string;
  highlighted?: boolean;
  badge?: string;
}

interface PricingToggleMonthlyProps {
  headline?: string;
  description?: string;
  monthlyLabel?: string;
  yearlyLabel?: string;
  yearlySavingsBadge?: string;
  plans: PricingPlan[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Check icon
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

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function PricingToggleMonthly({
  headline = 'Choose your plan',
  description,
  monthlyLabel = 'Monthly',
  yearlyLabel = 'Yearly',
  yearlySavingsBadge = 'Save 20%',
  plans,
  className,
}: PricingToggleMonthlyProps) {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section
      className={cn('px-6 py-20 md:px-12 md:py-28 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
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

        {/* Toggle */}
        <div className="mb-12 flex items-center justify-center gap-3">
          <span
            className="text-sm font-medium"
            style={{
              color: !isYearly ? 'var(--foreground)' : 'var(--muted-foreground)',
            }}
          >
            {monthlyLabel}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={isYearly}
            aria-label={`Switch to ${isYearly ? 'monthly' : 'yearly'} billing`}
            onClick={() => setIsYearly((prev) => !prev)}
            className={cn(
              'relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full',
              'transition-colors duration-200',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            )}
            style={{
              backgroundColor: isYearly
                ? 'var(--primary)'
                : 'color-mix(in oklch, var(--foreground) 20%, transparent)',
              ['--tw-ring-color' as string]: 'var(--primary)',
              ['--tw-ring-offset-color' as string]: 'var(--background)',
            }}
          >
            <span
              className="pointer-events-none block h-5 w-5 rounded-full shadow-sm transition-transform duration-200"
              style={{
                backgroundColor: 'var(--background)',
                transform: isYearly ? 'translateX(22px)' : 'translateX(4px)',
              }}
            />
          </button>
          <span
            className="flex items-center gap-1.5 text-sm font-medium"
            style={{
              color: isYearly ? 'var(--foreground)' : 'var(--muted-foreground)',
            }}
          >
            {yearlyLabel}
            {yearlySavingsBadge && (
              <span
                className="rounded-full px-2 py-0.5 text-xs font-semibold"
                style={{
                  backgroundColor: 'color-mix(in oklch, var(--primary) 15%, transparent)',
                  color: 'var(--primary)',
                }}
              >
                {yearlySavingsBadge}
              </span>
            )}
          </span>
        </div>

        {/* Plans */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                'relative flex flex-col rounded-2xl border p-8',
                plan.highlighted && 'shadow-lg',
              )}
              style={{
                borderColor: plan.highlighted ? 'var(--primary)' : 'var(--border)',
                backgroundColor: 'var(--background)',
              }}
            >
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

              <h3
                className="text-lg font-semibold"
                style={{ color: 'var(--foreground)' }}
              >
                {plan.name}
              </h3>
              {plan.description && (
                <p className="mt-1 text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  {plan.description}
                </p>
              )}

              {/* Price with toggle */}
              <div className="mt-6 flex items-baseline gap-1">
                <span
                  className="text-4xl font-bold tracking-tight"
                  style={{ color: 'var(--foreground)' }}
                >
                  {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-sm" style={{ color: 'var(--muted-foreground)' }}>
                  /{isYearly ? 'year' : 'month'}
                </span>
              </div>

              {/* Features */}
              <ul className="mt-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.text} className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 shrink-0"
                      style={{
                        color: feature.included ? 'var(--primary)' : 'var(--muted-foreground)',
                        opacity: feature.included ? 1 : 0.4,
                      }}
                    >
                      <CheckIcon />
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        color: feature.included ? 'var(--foreground)' : 'var(--muted-foreground)',
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
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: 'var(--foreground)',
                        border: '1px solid var(--border)',
                        ['--tw-ring-color' as string]: 'var(--foreground)',
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
