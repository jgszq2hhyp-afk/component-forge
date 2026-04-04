// @version 1.0.0 // @category pricing // @name pricing-cards-gradient // @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PricingFeature {
  text: string;
}

interface GradientPlan {
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

interface PricingCardsGradientProps {
  headline?: string;
  description?: string;
  plans: GradientPlan[];
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
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function PricingCardsGradient({
  headline = 'Find the perfect plan',
  description,
  plans,
  className,
}: PricingCardsGradientProps) {
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

        {/* Plans */}
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map((plan) => {
            const isHighlighted = plan.highlighted;

            // Highlighted card gets gradient background
            const cardBg: React.CSSProperties = isHighlighted
              ? {
                  background:
                    'linear-gradient(145deg, var(--primary), color-mix(in oklch, var(--primary) 80%, var(--secondary)))',
                  color: 'var(--primary-foreground)',
                }
              : {
                  backgroundColor: 'var(--background)',
                  border: '1px solid var(--border)',
                  color: 'var(--foreground)',
                };

            const textColor = isHighlighted ? 'var(--primary-foreground)' : 'var(--foreground)';
            const mutedColor = isHighlighted
              ? 'color-mix(in oklch, var(--primary-foreground) 75%, transparent)'
              : 'var(--muted-foreground)';
            const checkColor = isHighlighted ? 'var(--primary-foreground)' : 'var(--primary)';

            return (
              <div
                key={plan.name}
                className={cn(
                  'relative flex flex-col rounded-2xl p-8',
                  isHighlighted && 'shadow-xl',
                )}
                style={cardBg}
              >
                {/* Badge */}
                {plan.badge && (
                  <span
                    className="absolute -top-3 left-6 rounded-full px-3 py-0.5 text-xs font-semibold"
                    style={
                      isHighlighted
                        ? {
                            backgroundColor: 'var(--primary-foreground)',
                            color: 'var(--primary)',
                          }
                        : {
                            backgroundColor: 'var(--primary)',
                            color: 'var(--primary-foreground)',
                          }
                    }
                  >
                    {plan.badge}
                  </span>
                )}

                <h3
                  className="text-lg font-semibold"
                  style={{ color: textColor }}
                >
                  {plan.name}
                </h3>
                {plan.description && (
                  <p className="mt-1 text-sm" style={{ color: mutedColor }}>
                    {plan.description}
                  </p>
                )}

                {/* Price */}
                <div className="mt-6 flex items-baseline gap-1">
                  <span
                    className="text-4xl font-bold tracking-tight"
                    style={{ color: textColor }}
                  >
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm" style={{ color: mutedColor }}>
                      /{plan.period}
                    </span>
                  )}
                </div>

                {/* Features */}
                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-2.5">
                      <span className="mt-0.5 shrink-0" style={{ color: checkColor }}>
                        <CheckIcon />
                      </span>
                      <span className="text-sm" style={{ color: textColor }}>
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
                    'hover:brightness-110 hover:shadow-lg',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                    'active:scale-[0.98]',
                  )}
                  style={
                    isHighlighted
                      ? {
                          backgroundColor: 'var(--primary-foreground)',
                          color: 'var(--primary)',
                        }
                      : {
                          backgroundColor: 'var(--primary)',
                          color: 'var(--primary-foreground)',
                        }
                  }
                >
                  {plan.ctaText}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
