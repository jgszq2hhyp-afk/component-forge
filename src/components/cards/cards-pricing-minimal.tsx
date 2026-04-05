// @version 1.0.0
// @category cards
// @name cards-pricing-minimal
// @source custom

import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const DEFAULT_HEADLINE = '' as const;
const DEFAULT_PERIOD = '/Monat' as const;
const CHECK_ICON_SIZE = 'size-4' as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface PricingPlan {
  /** Plan name, e.g. "Starter" */
  name: string;
  /** Price display, e.g. "29 EUR" */
  price: string;
  /** Billing period label */
  period?: string;
  /** List of included features */
  features: string[];
  /** CTA button text */
  ctaText: string;
  /** CTA button link */
  ctaHref: string;
  /** Visually highlight this plan */
  highlighted?: boolean;
}

interface CardsPricingMinimalProps {
  /** Array of pricing plans */
  plans: PricingPlan[];
  /** Optional section headline */
  headline?: string;
  /** Additional class names */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Check Icon                                                        */
/* ------------------------------------------------------------------ */

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={cn(CHECK_ICON_SIZE, 'shrink-0', className)}
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
        clipRule="evenodd"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function CardsPricingMinimal({
  plans,
  headline = DEFAULT_HEADLINE,
  className,
}: CardsPricingMinimalProps) {
  return (
    <section className={cn('w-full px-4 py-12 sm:px-6 lg:px-8', className)}>
      {/* Headline */}
      {headline && (
        <h2
          className="mb-10 text-center font-bold tracking-tight text-[var(--color-text,hsl(0_0%_8%))]"
          style={{ fontSize: 'clamp(1.5rem, 1.25rem + 1vw, 2.25rem)' }}
        >
          {headline}
        </h2>
      )}

      {/* Grid */}
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className={cn(
              'relative flex flex-col rounded-2xl border p-6',
              'bg-[var(--color-surface,hsl(0_0%_100%))]',
              plan.highlighted
                ? 'border-[var(--color-primary,hsl(220_70%_50%))] shadow-lg ring-1 ring-[var(--color-primary,hsl(220_70%_50%))]'
                : 'border-[var(--color-border,hsl(0_0%_88%))] shadow-sm',
            )}
          >
            {/* Plan name */}
            <h3
              className="text-lg font-semibold text-[var(--color-text,hsl(0_0%_8%))]"
              style={{ fontSize: 'clamp(1rem, 0.9rem + 0.4vw, 1.25rem)' }}
            >
              {plan.name}
            </h3>

            {/* Price */}
            <div className="mt-4 flex items-baseline gap-1">
              <span
                className="font-bold text-[var(--color-text,hsl(0_0%_5%))]"
                style={{ fontSize: 'clamp(1.75rem, 1.5rem + 1vw, 2.5rem)' }}
              >
                {plan.price}
              </span>
              <span className="text-sm text-[var(--color-text-muted,hsl(0_0%_45%))]">
                {plan.period ?? DEFAULT_PERIOD}
              </span>
            </div>

            {/* Features */}
            <ul className="mt-6 flex flex-1 flex-col gap-2.5" role="list">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5">
                  <CheckIcon className="mt-0.5 text-[var(--color-primary,hsl(220_70%_50%))]" />
                  <span className="text-sm text-[var(--color-text-muted,hsl(0_0%_30%))]">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={plan.ctaHref}
              className={cn(
                'mt-8 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-ring,hsl(220_70%_55%))] focus-visible:ring-offset-2',
                'motion-safe:transition-colors motion-safe:duration-200',
                'motion-reduce:transition-none',
                plan.highlighted
                  ? cn(
                      'bg-[var(--color-primary,hsl(220_70%_50%))]',
                      'text-[var(--color-primary-foreground,hsl(0_0%_100%))]',
                      'hover:bg-[var(--color-primary-hover,hsl(220_70%_42%))]',
                    )
                  : cn(
                      'border border-[var(--color-border,hsl(0_0%_80%))]',
                      'text-[var(--color-text,hsl(0_0%_10%))]',
                      'hover:bg-[var(--color-muted,hsl(0_0%_95%))]',
                    ),
              )}
            >
              {plan.ctaText}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
