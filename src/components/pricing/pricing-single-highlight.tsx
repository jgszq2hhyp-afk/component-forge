// @version 1.0.0 // @category pricing // @name pricing-single-highlight // @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PricingFeature {
  text: string;
}

interface PricingSingleHighlightProps {
  headline?: string;
  description?: string;
  planName: string;
  planDescription?: string;
  price: string;
  period?: string;
  features: PricingFeature[];
  ctaText: string;
  ctaHref: string;
  guaranteeText?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Check icon
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M4 9.5L7.5 13L14 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function PricingSingleHighlight({
  headline = 'One plan. Everything included.',
  description,
  planName,
  planDescription,
  price,
  period = 'month',
  features,
  ctaText,
  ctaHref,
  guaranteeText,
  className,
}: PricingSingleHighlightProps) {
  return (
    <section
      className={cn('px-6 py-20 md:px-12 md:py-28 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-10 text-center">
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

        {/* Single card */}
        <div
          className="rounded-2xl border-2 p-8 md:p-12"
          style={{
            borderColor: 'var(--primary)',
            backgroundColor: 'var(--background)',
            boxShadow: '0 4px 40px color-mix(in oklch, var(--primary) 12%, transparent)',
          }}
        >
          <div className="flex flex-col items-center text-center">
            <h3
              className="text-xl font-semibold"
              style={{ color: 'var(--foreground)' }}
            >
              {planName}
            </h3>
            {planDescription && (
              <p
                className="mt-2 max-w-md text-sm leading-relaxed"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {planDescription}
              </p>
            )}

            {/* Price */}
            <div className="mt-8 flex items-baseline gap-1">
              <span
                className="text-5xl font-bold tracking-tight md:text-6xl"
                style={{ color: 'var(--foreground)' }}
              >
                {price}
              </span>
              <span
                className="text-base"
                style={{ color: 'var(--muted-foreground)' }}
              >
                /{period}
              </span>
            </div>

            {/* Features — 2-column grid on larger screens */}
            <ul className="mt-10 grid w-full gap-3 sm:grid-cols-2 text-left">
              {features.map((feature) => (
                <li key={feature.text} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 shrink-0"
                    style={{ color: 'var(--primary)' }}
                  >
                    <CheckIcon />
                  </span>
                  <span
                    className="text-sm"
                    style={{ color: 'var(--foreground)' }}
                  >
                    {feature.text}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={ctaHref}
              className={cn(
                'mt-10 inline-flex items-center justify-center',
                'rounded-lg px-10 py-4 text-base font-semibold',
                'transition-all duration-200',
                'hover:brightness-110 hover:shadow-lg',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                'active:scale-[0.98]',
              )}
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                ['--tw-ring-color' as string]: 'var(--primary)',
                ['--tw-ring-offset-color' as string]: 'var(--background)',
              }}
            >
              {ctaText}
            </a>

            {guaranteeText && (
              <p
                className="mt-4 text-xs"
                style={{ color: 'var(--muted-foreground)' }}
              >
                {guaranteeText}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
