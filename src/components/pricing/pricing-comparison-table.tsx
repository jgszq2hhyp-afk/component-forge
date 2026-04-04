// @version 1.0.0 // @category pricing // @name pricing-comparison-table // @source custom

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type FeatureValue = boolean | string;

interface ComparisonFeature {
  name: string;
  category?: string;
  values: Record<string, FeatureValue>;
}

interface ComparisonPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  ctaText: string;
  ctaHref: string;
  highlighted?: boolean;
}

interface PricingComparisonTableProps {
  headline?: string;
  description?: string;
  plans: ComparisonPlan[];
  features: ComparisonFeature[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-label="Included">
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

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-label="Not included">
      <path
        d="M5 5L13 13M13 5L5 13"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function renderValue(value: FeatureValue) {
  if (typeof value === 'boolean') {
    return value ? (
      <span style={{ color: 'var(--primary)' }}>
        <CheckIcon />
      </span>
    ) : (
      <span style={{ color: 'var(--muted-foreground)', opacity: 0.4 }}>
        <XIcon />
      </span>
    );
  }
  return (
    <span className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>
      {value}
    </span>
  );
}

function groupFeaturesByCategory(features: ComparisonFeature[]) {
  const groups: { category: string; features: ComparisonFeature[] }[] = [];
  let currentCategory = '';

  for (const feature of features) {
    const cat = feature.category ?? '';
    if (cat !== currentCategory) {
      currentCategory = cat;
      groups.push({ category: cat, features: [] });
    }
    groups[groups.length - 1].features.push(feature);
  }
  return groups;
}

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function PricingComparisonTable({
  headline = 'Compare plans',
  description,
  plans,
  features,
  className,
}: PricingComparisonTableProps) {
  const groups = groupFeaturesByCategory(features);

  return (
    <section
      className={cn('px-6 py-20 md:px-12 md:py-28 lg:px-20', className)}
      style={{ backgroundColor: 'var(--background)' }}
    >
      <div className="mx-auto max-w-5xl">
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

        {/* Table — scrollable on mobile */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse">
            {/* Plan headers */}
            <thead>
              <tr>
                <th className="w-[40%] pb-6 text-left" />
                {plans.map((plan) => (
                  <th
                    key={plan.id}
                    className="pb-6 text-center"
                    style={{ minWidth: 140 }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span
                        className="text-sm font-semibold"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {plan.name}
                      </span>
                      <span className="flex items-baseline gap-0.5">
                        <span
                          className="text-2xl font-bold"
                          style={{ color: 'var(--foreground)' }}
                        >
                          {plan.price}
                        </span>
                        {plan.period && (
                          <span
                            className="text-xs"
                            style={{ color: 'var(--muted-foreground)' }}
                          >
                            /{plan.period}
                          </span>
                        )}
                      </span>
                      <a
                        href={plan.ctaHref}
                        className={cn(
                          'mt-1 inline-flex items-center justify-center',
                          'rounded-lg px-5 py-2 text-xs font-semibold',
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
                              }
                            : {
                                border: '1px solid var(--border)',
                                color: 'var(--foreground)',
                              }
                        }
                      >
                        {plan.ctaText}
                      </a>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            {/* Feature rows grouped by category */}
            <tbody>
              {groups.map((group) => (
                <>
                  {group.category && (
                    <tr key={`cat-${group.category}`}>
                      <td
                        colSpan={plans.length + 1}
                        className="pt-8 pb-3 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: 'var(--muted-foreground)' }}
                      >
                        {group.category}
                      </td>
                    </tr>
                  )}
                  {group.features.map((feature) => (
                    <tr
                      key={feature.name}
                      className="border-t"
                      style={{ borderColor: 'var(--border)' }}
                    >
                      <td
                        className="py-3 pr-4 text-sm"
                        style={{ color: 'var(--foreground)' }}
                      >
                        {feature.name}
                      </td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="py-3 text-center">
                          {renderValue(feature.values[plan.id] ?? false)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
