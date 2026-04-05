// @version 1.0.0
// @category comparison
// @name comparison-plan-side-by-side
// @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = 'clamp(2rem, 4vw + 1rem, 3.5rem)';
const PLAN_NAME_CLAMP = 'clamp(1.25rem, 2vw + 0.5rem, 1.75rem)';
const PRICE_CLAMP = 'clamp(2rem, 4vw + 0.5rem, 3.5rem)';
const SECTION_PADDING_Y = 'clamp(3rem, 8vw, 6rem)';
const SECTION_PADDING_X = 'clamp(1.5rem, 4vw, 5rem)';
const CONTENT_MAX_WIDTH = '72rem';
const BADGE_BG_MIX_PERCENT = '12%';
const RECOMMENDED_BORDER_WIDTH = 2;
const CHECK_ICON_SIZE = 18;
const ICON_STROKE_WIDTH = 2;
const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PlanItem {
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
  ctaLabel: string;
  ctaHref: string;
}

interface ComparisonPlanSideBySideProps {
  headline: string;
  plans: PlanItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Sub-component: Check Icon
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      width={CHECK_ICON_SIZE}
      height={CHECK_ICON_SIZE}
      viewBox={`0 0 ${CHECK_ICON_SIZE} ${CHECK_ICON_SIZE}`}
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M4 9l4 4 6-7"
        stroke="var(--primary)"
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

export default function ComparisonPlanSideBySide({
  headline,
  plans,
  className,
}: ComparisonPlanSideBySideProps) {
  const headingId = 'plan-comparison-heading';

  return (
    <section
      aria-labelledby={headingId}
      className={cn('relative', className)}
      style={{
        paddingBlock: SECTION_PADDING_Y,
        paddingInline: SECTION_PADDING_X,
        backgroundColor: 'var(--background)',
      }}
    >
      <div
        className="mx-auto"
        style={{ maxWidth: CONTENT_MAX_WIDTH }}
      >
        {/* Section Header */}
        <header className="text-center">
          <h2
            id={headingId}
            className="font-bold tracking-tight leading-[1.1]"
            style={{
              fontSize: HEADING_CLAMP,
              color: 'var(--foreground)',
            }}
          >
            {headline}
          </h2>
        </header>

        {/* Plans Grid */}
        <div
          className={cn(
            'mt-12 md:mt-16 grid gap-6 md:gap-8',
            plans.length === 2 && 'md:grid-cols-2 max-w-4xl mx-auto',
            plans.length === 3 && 'md:grid-cols-3',
            plans.length >= 4 && 'md:grid-cols-2 lg:grid-cols-4',
          )}
        >
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                'relative flex flex-col rounded-2xl p-6 md:p-8',
                'transition-shadow duration-300 motion-reduce:transition-none',
                'hover:shadow-lg',
                plan.recommended && 'ring-0',
              )}
              style={{
                backgroundColor: 'var(--card)',
                borderWidth: plan.recommended
                  ? RECOMMENDED_BORDER_WIDTH
                  : 1,
                borderStyle: 'solid',
                borderColor: plan.recommended
                  ? 'var(--primary)'
                  : 'var(--border)',
              }}
            >
              {/* Recommended Badge */}
              {plan.recommended && (
                <span
                  className={cn(
                    'absolute -top-3 left-1/2 -translate-x-1/2',
                    'inline-flex items-center rounded-full px-4 py-1',
                    'text-xs font-semibold tracking-wide uppercase',
                  )}
                  style={{
                    backgroundColor: 'var(--primary)',
                    color: 'var(--primary-foreground)',
                  }}
                >
                  Recommended
                </span>
              )}

              {/* Plan Name */}
              <h3
                className="font-semibold tracking-tight"
                style={{
                  fontSize: PLAN_NAME_CLAMP,
                  color: 'var(--foreground)',
                }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-4 flex items-baseline gap-1">
                <span
                  className="font-bold tracking-tight"
                  style={{
                    fontSize: PRICE_CLAMP,
                    color: 'var(--foreground)',
                  }}
                >
                  {plan.price}
                </span>
                <span
                  className="text-sm"
                  style={{ color: 'var(--muted-foreground)' }}
                >
                  /{plan.period}
                </span>
              </div>

              {/* Separator */}
              <div
                className="mt-6 h-px w-full"
                style={{ backgroundColor: 'var(--border)' }}
                role="separator"
                aria-hidden="true"
              />

              {/* Features List */}
              <ul className="mt-6 flex flex-col gap-3 list-none p-0 flex-1" role="list">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-sm md:text-base"
                    style={{ color: 'var(--foreground)' }}
                  >
                    <CheckIcon />
                    <span className="leading-snug">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href={plan.ctaHref}
                className={cn(
                  'mt-8 inline-flex items-center justify-center',
                  'rounded-lg px-6 py-3 text-[0.9375rem] font-semibold',
                  'transition-all duration-200 motion-reduce:transition-none',
                  'active:scale-[0.98] motion-reduce:active:scale-100',
                  FOCUS_RING,
                  plan.recommended
                    ? 'hover:brightness-110 hover:shadow-lg'
                    : 'border hover:brightness-110',
                )}
                style={{
                  backgroundColor: plan.recommended
                    ? 'var(--primary)'
                    : 'transparent',
                  color: plan.recommended
                    ? 'var(--primary-foreground)'
                    : 'var(--foreground)',
                  borderColor: plan.recommended
                    ? 'transparent'
                    : 'var(--border)',
                  ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                  ['--tw-ring-offset-color' as string]: 'var(--background)',
                }}
              >
                {plan.ctaLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
