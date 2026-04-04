// @version 2.0.0
// @category pricing
// @name pricing-comparison-table
// @source custom

import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_CONTENT_WIDTH = "64rem"; // max-w-5xl
const MAX_HEADER_WIDTH = "42rem"; // max-w-2xl
const FEATURE_COL_WIDTH = "40%";
const PLAN_COL_MIN_WIDTH = "9rem"; // 140px approx
const TABLE_MIN_WIDTH = "37.5rem"; // 600px

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
  selectedPlanId?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Focus styles
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring,hsl(220_90%_56%))] focus-visible:ring-offset-2";

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function CheckIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      role="img"
      aria-label="Included"
    >
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
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      role="img"
      aria-label="Not included"
    >
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
  if (typeof value === "boolean") {
    return value ? (
      <span style={{ color: "var(--primary)" }}>
        <CheckIcon />
      </span>
    ) : (
      <span style={{ color: "var(--muted-foreground)", opacity: 0.4 }}>
        <XIcon />
      </span>
    );
  }
  return (
    <span
      className="text-sm font-medium"
      style={{ color: "var(--foreground)" }}
    >
      {value}
    </span>
  );
}

function groupFeaturesByCategory(features: ComparisonFeature[]) {
  const groups: { category: string; features: ComparisonFeature[] }[] = [];
  let currentCategory = "";

  for (const feature of features) {
    const cat = feature.category ?? "";
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
  headline = "Compare plans",
  description,
  plans,
  features,
  selectedPlanId,
  className,
}: PricingComparisonTableProps) {
  const groups = groupFeaturesByCategory(features);

  return (
    <section
      aria-label={headline}
      className={cn("px-6 py-20 md:px-12 md:py-28 lg:px-20", className)}
      style={{ backgroundColor: "var(--background)" }}
    >
      <div className="mx-auto" style={{ maxWidth: MAX_CONTENT_WIDTH }}>
        {/* Header */}
        <div
          className="mx-auto mb-14 text-center"
          style={{ maxWidth: MAX_HEADER_WIDTH }}
        >
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: "clamp(1.75rem, 3vw + 0.5rem, 2.75rem)",
              color: "var(--foreground)",
            }}
          >
            {headline}
          </h2>
          {description && (
            <p
              className="mt-4 text-base leading-relaxed md:text-lg"
              style={{ color: "var(--muted-foreground)" }}
            >
              {description}
            </p>
          )}
        </div>

        {/* Table -- scrollable on mobile */}
        <div className="overflow-x-auto">
          <table
            className="w-full border-collapse"
            style={{ minWidth: TABLE_MIN_WIDTH }}
          >
            {/* Plan headers -- sticky on mobile scroll */}
            <thead className="sticky top-0 z-10" style={{ backgroundColor: "var(--background)" }}>
              <tr>
                <th
                  className="pb-6 text-left"
                  style={{ width: FEATURE_COL_WIDTH }}
                />
                {plans.map((plan) => {
                  const isSelected = selectedPlanId === plan.id;
                  return (
                    <th
                      key={plan.id}
                      className="pb-6 text-center"
                      style={{ minWidth: PLAN_COL_MIN_WIDTH }}
                      aria-current={isSelected ? "true" : undefined}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <span
                          className="text-sm font-semibold"
                          style={{ color: "var(--foreground)" }}
                        >
                          {plan.name}
                        </span>
                        <span className="flex items-baseline gap-0.5">
                          <span
                            className="text-2xl font-bold"
                            style={{ color: "var(--foreground)" }}
                          >
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span
                              className="text-xs"
                              style={{ color: "var(--muted-foreground)" }}
                            >
                              /{plan.period}
                            </span>
                          )}
                        </span>
                        <a
                          href={plan.ctaHref}
                          className={cn(
                            "mt-1 inline-flex items-center justify-center",
                            "rounded-lg px-5 py-2 text-xs font-semibold",
                            "transition-all duration-200 motion-reduce:transition-none",
                            "hover:brightness-110",
                            focusRing,
                            "active:scale-[0.98] motion-reduce:active:scale-100",
                          )}
                          style={
                            plan.highlighted
                              ? {
                                  backgroundColor: "var(--primary)",
                                  color: "var(--primary-foreground)",
                                }
                              : {
                                  border: "1px solid var(--border)",
                                  color: "var(--foreground)",
                                }
                          }
                        >
                          {plan.ctaText}
                        </a>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>

            {/* Feature rows grouped by category */}
            <tbody>
              {groups.map((group, groupIdx) => {
                const rows = [];
                if (group.category) {
                  rows.push(
                    <tr key={`cat-${groupIdx}`}>
                      <td
                        colSpan={plans.length + 1}
                        className="pt-8 pb-3 text-xs font-semibold uppercase tracking-wider"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {group.category}
                      </td>
                    </tr>,
                  );
                }
                group.features.forEach((feature) => {
                  rows.push(
                    <tr
                      key={feature.name}
                      className="border-t"
                      style={{ borderColor: "var(--border)" }}
                    >
                      <td
                        className="py-3 pr-4 text-sm"
                        style={{ color: "var(--foreground)" }}
                      >
                        {feature.name}
                      </td>
                      {plans.map((plan) => (
                        <td key={plan.id} className="py-3 text-center">
                          {renderValue(feature.values[plan.id] ?? false)}
                        </td>
                      ))}
                    </tr>,
                  );
                });
                return rows;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
