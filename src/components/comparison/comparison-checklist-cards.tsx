// @version 1.0.0
// @category comparison
// @name comparison-checklist-cards
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Feature {
  name: string;
  included: boolean;
}

interface Plan {
  name: string;
  features: Feature[];
  highlighted?: boolean;
}

interface ComparisonChecklistCardsProps {
  headline?: string;
  plans: Plan[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function CheckIcon() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }} aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }} aria-hidden="true">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ComparisonChecklistCards({
  headline,
  plans,
  className,
}: ComparisonChecklistCardsProps) {
  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}
      aria-labelledby={headline ? "ccl-heading" : undefined}
    >
      <div className="mx-auto max-w-5xl">
        {headline && (
          <h2
            id="ccl-heading"
            className="mb-[clamp(2rem,4vw,3rem)] text-center font-bold tracking-tight"
            style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
          >
            {headline}
          </h2>
        )}

        <div className={cn(
          "grid gap-6",
          plans.length === 2 && "sm:grid-cols-2",
          plans.length >= 3 && "sm:grid-cols-2 lg:grid-cols-3",
        )}>
          {plans.map((plan) => (
            <article
              key={plan.name}
              className={cn(
                "flex flex-col rounded-xl border-2 p-6",
                "motion-safe:transition-shadow motion-safe:duration-200 motion-safe:hover:shadow-lg",
                "motion-reduce:transition-none",
              )}
              style={{
                borderColor: plan.highlighted ? "var(--primary)" : "var(--border)",
                backgroundColor: "var(--card)",
              }}
            >
              {plan.highlighted && (
                <span
                  className="mb-4 inline-flex self-start rounded-full px-3 py-1 text-xs font-semibold"
                  style={{
                    backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
                    color: "var(--primary)",
                  }}
                >
                  Recommended
                </span>
              )}
              <h3
                className="mb-6 text-xl font-bold"
                style={{ color: "var(--foreground)" }}
              >
                {plan.name}
              </h3>
              <ul className="space-y-3" role="list">
                {plan.features.map((f) => (
                  <li
                    key={f.name}
                    className="flex items-center gap-3 text-sm"
                    style={{ color: f.included ? "var(--foreground)" : "var(--muted-foreground)" }}
                  >
                    {f.included ? <CheckIcon /> : <CrossIcon />}
                    <span className={cn(!f.included && "line-through opacity-60")}>
                      {f.name}
                    </span>
                    <span className="sr-only">{f.included ? "included" : "not included"}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
