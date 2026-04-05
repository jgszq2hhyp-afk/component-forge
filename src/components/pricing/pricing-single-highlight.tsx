// @version 2.0.0
// @category pricing
// @name pricing-single-highlight
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(1.75rem, 3vw + 0.5rem, 2.75rem)';
const SUBHEADING_CLAMP = 'clamp(1rem, 0.9rem + 0.4vw, 1.125rem)';
const PRICE_CLAMP = 'clamp(2.5rem, 2rem + 2.5vw, 3.75rem)';
const SECTION_MAX_WIDTH = '48rem';
const CTA_ACTIVE_SCALE = '0.98';
const ICON_SIZE = 18;
const ICON_STROKE_WIDTH = 2;
const CARD_SHADOW_MIX_PERCENT = 12;

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
    <svg
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 9.5L7.5 13L14 5"
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
      aria-label={headline}
      className={cn('px-6 py-20 md:px-12 md:py-28 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto" style={{ maxWidth: SECTION_MAX_WIDTH }}>
        {/* Header */}
        <header className="mb-10 text-center">
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

        {/* Single card */}
        <article
          className="rounded-2xl border-2 p-8 md:p-12"
          style={{
            borderColor: 'var(--primary)',
            backgroundColor: 'var(--background)',
            boxShadow: `0 4px 40px color-mix(in oklch, var(--primary) ${CARD_SHADOW_MIX_PERCENT}%, transparent)`,
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
                className="font-bold tracking-tight"
                style={{
                  fontSize: PRICE_CLAMP,
                  color: 'var(--foreground)',
                }}
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

            {/* Features -- 2-column grid on larger screens */}
            <ul
              className="mt-10 grid w-full gap-3 text-left sm:grid-cols-2"
              aria-label={`${planName} features`}
            >
              {features.map((feature) => (
                <li key={feature.text} className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 shrink-0"
                    aria-hidden="true"
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
                'transition-all duration-200 motion-reduce:transition-none',
                'hover:brightness-110 hover:shadow-lg motion-reduce:hover:shadow-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                `active:scale-[${CTA_ACTIVE_SCALE}]`,
              )}
              style={{
                backgroundColor: 'var(--primary)',
                color: 'var(--primary-foreground)',
                ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
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
        </article>
      </div>
    </section>
  );
}
