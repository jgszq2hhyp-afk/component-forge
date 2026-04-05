// @version 2.0.0
// @category stats
// @name Stats Large Numbers
// @source custom-implementation

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SECTION_PADDING_Y = "py-16 sm:py-24";
const MAX_WIDTH_WIDE = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const MAX_WIDTH_NARROW = "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8";
const STACKED_VALUE_WIDTH = "sm:w-64 lg:w-80";
const HEADING_CLAMP = "text-[clamp(1.5rem,1rem+1.5vw,1.875rem)]";
const VALUE_CLAMP_SIDE = "text-[clamp(3rem,2rem+3vw,4.5rem)]";
const VALUE_CLAMP_ALT = "text-[clamp(3.75rem,2.5rem+4vw,6rem)]";
const VALUE_CLAMP_STACKED = "text-[clamp(3rem,2rem+3vw,4.5rem)]";
const HEADER_MARGIN_BOTTOM = "mb-16";
const STACKED_ITEM_PADDING = "py-10";
const ALT_SPACING = "space-y-16 sm:space-y-20";
const SIDE_GRID_GAP = "gap-12";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LargeStat {
  value: string;
  label: string;
  description?: string;
}

interface StatsLargeNumbersProps {
  stats?: LargeStat[];
  heading?: string;
  subheading?: string;
  variant?: "stacked" | "side-by-side" | "alternating";
  className?: string;
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const defaultStats: LargeStat[] = [
  {
    value: "10M+",
    label: "Requests per day",
    description:
      "Handling enterprise-scale traffic with 99.99% reliability across all regions.",
  },
  {
    value: "$2.1B",
    label: "Processed annually",
    description:
      "Trusted by Fortune 500 companies for their most critical payment infrastructure.",
  },
  {
    value: "150+",
    label: "Enterprise clients",
    description:
      "From startups to global corporations, across every major industry vertical.",
  },
];

// ---------------------------------------------------------------------------
// Component (Server Component)
// ---------------------------------------------------------------------------

export default function StatsLargeNumbers({
  stats = defaultStats,
  heading,
  subheading,
  variant = "stacked",
  className,
}: StatsLargeNumbersProps) {
  if (variant === "side-by-side") {
    return (
      <section
        className={cn(
          SECTION_PADDING_Y,
          "bg-[var(--stats-large-bg,transparent)]",
          className,
        )}
        aria-label="Key figures"
      >
        <div className={MAX_WIDTH_WIDE}>
          {(heading || subheading) && (
            <header className={cn(HEADER_MARGIN_BOTTOM, "max-w-2xl")}>
              {heading && (
                <h2
                  className={cn(
                    "font-bold",
                    HEADING_CLAMP,
                    "text-[var(--stats-large-heading-color,hsl(0_0%_9%))]",
                  )}
                >
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="mt-3 text-lg text-[var(--stats-large-subheading-color,hsl(0_0%_45%))]">
                  {subheading}
                </p>
              )}
            </header>
          )}

          <dl className={cn("grid sm:grid-cols-2 lg:grid-cols-3", SIDE_GRID_GAP)}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <dd
                  className={cn(
                    "font-bold tracking-tighter",
                    VALUE_CLAMP_SIDE,
                    "text-[var(--stats-large-value-color,hsl(0_0%_9%))]",
                  )}
                >
                  {stat.value}
                </dd>
                <dt className="mt-4 text-base font-semibold text-[var(--stats-large-label-color,hsl(0_0%_20%))]">
                  {stat.label}
                </dt>
                {stat.description && (
                  <p className="mt-2 text-sm leading-relaxed text-[var(--stats-large-desc-color,hsl(0_0%_45%))]">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </dl>
        </div>
      </section>
    );
  }

  if (variant === "alternating") {
    return (
      <section
        className={cn(
          SECTION_PADDING_Y,
          "bg-[var(--stats-large-bg,transparent)]",
          className,
        )}
        aria-label="Key figures"
      >
        <div className={MAX_WIDTH_NARROW}>
          {(heading || subheading) && (
            <header className={cn(HEADER_MARGIN_BOTTOM, "text-center")}>
              {heading && (
                <h2
                  className={cn(
                    "font-bold",
                    HEADING_CLAMP,
                    "text-[var(--stats-large-heading-color,hsl(0_0%_9%))]",
                  )}
                >
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="mt-3 text-lg text-[var(--stats-large-subheading-color,hsl(0_0%_45%))]">
                  {subheading}
                </p>
              )}
            </header>
          )}

          <dl className={ALT_SPACING}>
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-12",
                  i % 2 !== 0 && "sm:flex-row-reverse sm:text-right",
                )}
              >
                <dd
                  className={cn(
                    "flex-shrink-0 font-bold tracking-tighter",
                    VALUE_CLAMP_ALT,
                    "text-[var(--stats-large-value-color,hsl(0_0%_9%))]",
                  )}
                >
                  {stat.value}
                </dd>
                <div
                  className={cn(
                    "border-l-2 border-[var(--stats-large-accent,hsl(220_80%_55%))] pl-6",
                    i % 2 !== 0 &&
                      "sm:border-l-0 sm:border-r-2 sm:pl-0 sm:pr-6",
                  )}
                >
                  <dt className="text-lg font-semibold text-[var(--stats-large-label-color,hsl(0_0%_20%))]">
                    {stat.label}
                  </dt>
                  {stat.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[var(--stats-large-desc-color,hsl(0_0%_45%))]">
                      {stat.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </dl>
        </div>
      </section>
    );
  }

  // stacked variant (default)
  return (
    <section
      className={cn(
        SECTION_PADDING_Y,
        "bg-[var(--stats-large-bg,transparent)]",
        className,
      )}
      aria-label="Key figures"
    >
      <div className={MAX_WIDTH_WIDE}>
        {(heading || subheading) && (
          <header className={cn(HEADER_MARGIN_BOTTOM, "text-center")}>
            {heading && (
              <h2
                className={cn(
                  "font-bold",
                  HEADING_CLAMP,
                  "text-[var(--stats-large-heading-color,hsl(0_0%_9%))]",
                )}
              >
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-3 text-lg text-[var(--stats-large-subheading-color,hsl(0_0%_45%))]">
                {subheading}
              </p>
            )}
          </header>
        )}

        <dl className="divide-y divide-[var(--stats-large-divider,hsl(0_0%_0%/0.08))]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                "flex flex-col gap-2 first:pt-0 last:pb-0 sm:flex-row sm:items-baseline sm:gap-8",
                STACKED_ITEM_PADDING,
              )}
            >
              <dd
                className={cn(
                  "flex-shrink-0 font-bold tracking-tighter",
                  VALUE_CLAMP_STACKED,
                  STACKED_VALUE_WIDTH,
                  "text-[var(--stats-large-value-color,hsl(0_0%_9%))]",
                )}
              >
                {stat.value}
              </dd>
              <div>
                <dt className="text-lg font-semibold text-[var(--stats-large-label-color,hsl(0_0%_20%))]">
                  {stat.label}
                </dt>
                {stat.description && (
                  <p className="mt-1 text-sm leading-relaxed text-[var(--stats-large-desc-color,hsl(0_0%_45%))]">
                    {stat.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
