// @version 1.0.0
// @category stats
// @name Stats Large Numbers
// @source custom-implementation

import { cn } from "@/lib/utils";

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

const defaultStats: LargeStat[] = [
  {
    value: "10M+",
    label: "Requests per day",
    description: "Handling enterprise-scale traffic with 99.99% reliability across all regions.",
  },
  {
    value: "$2.1B",
    label: "Processed annually",
    description: "Trusted by Fortune 500 companies for their most critical payment infrastructure.",
  },
  {
    value: "150+",
    label: "Enterprise clients",
    description: "From startups to global corporations, across every major industry vertical.",
  },
];

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
        className={cn("py-16 sm:py-24 bg-[var(--stats-large-bg,transparent)]", className)}
        aria-label="Key figures"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {(heading || subheading) && (
            <div className="mb-16 max-w-2xl">
              {heading && (
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--stats-large-heading-color,hsl(0_0%_9%))]">
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="mt-3 text-lg text-[var(--stats-large-subheading-color,hsl(0_0%_45%))]">
                  {subheading}
                </p>
              )}
            </div>
          )}

          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[var(--stats-large-value-color,hsl(0_0%_9%))]">
                  {stat.value}
                </p>
                <p className="mt-4 text-base font-semibold text-[var(--stats-large-label-color,hsl(0_0%_20%))]">
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="mt-2 text-sm leading-relaxed text-[var(--stats-large-desc-color,hsl(0_0%_45%))]">
                    {stat.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === "alternating") {
    return (
      <section
        className={cn("py-16 sm:py-24 bg-[var(--stats-large-bg,transparent)]", className)}
        aria-label="Key figures"
      >
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {(heading || subheading) && (
            <div className="mb-16 text-center">
              {heading && (
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--stats-large-heading-color,hsl(0_0%_9%))]">
                  {heading}
                </h2>
              )}
              {subheading && (
                <p className="mt-3 text-lg text-[var(--stats-large-subheading-color,hsl(0_0%_45%))]">
                  {subheading}
                </p>
              )}
            </div>
          )}

          <div className="space-y-16 sm:space-y-20">
            {stats.map((stat, i) => (
              <div
                key={stat.label}
                className={cn(
                  "flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-12",
                  i % 2 !== 0 && "sm:flex-row-reverse sm:text-right"
                )}
              >
                <p className="flex-shrink-0 text-6xl sm:text-7xl lg:text-8xl font-bold tracking-tighter text-[var(--stats-large-value-color,hsl(0_0%_9%))]">
                  {stat.value}
                </p>
                <div className={cn("border-l-2 border-[var(--stats-large-accent,hsl(220_80%_55%))] pl-6", i % 2 !== 0 && "sm:border-l-0 sm:border-r-2 sm:pl-0 sm:pr-6")}>
                  <p className="text-lg font-semibold text-[var(--stats-large-label-color,hsl(0_0%_20%))]">
                    {stat.label}
                  </p>
                  {stat.description && (
                    <p className="mt-2 text-sm leading-relaxed text-[var(--stats-large-desc-color,hsl(0_0%_45%))]">
                      {stat.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // stacked variant (default)
  return (
    <section
      className={cn("py-16 sm:py-24 bg-[var(--stats-large-bg,transparent)]", className)}
      aria-label="Key figures"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(heading || subheading) && (
          <div className="mb-16 text-center">
            {heading && (
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--stats-large-heading-color,hsl(0_0%_9%))]">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="mt-3 text-lg text-[var(--stats-large-subheading-color,hsl(0_0%_45%))]">
                {subheading}
              </p>
            )}
          </div>
        )}

        <div className="divide-y divide-[var(--stats-large-divider,hsl(0_0%_0%/0.08))]">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 py-10 sm:flex-row sm:items-baseline sm:gap-8 first:pt-0 last:pb-0"
            >
              <p className="flex-shrink-0 text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tighter text-[var(--stats-large-value-color,hsl(0_0%_9%))] sm:w-64 lg:w-80">
                {stat.value}
              </p>
              <div>
                <p className="text-lg font-semibold text-[var(--stats-large-label-color,hsl(0_0%_20%))]">
                  {stat.label}
                </p>
                {stat.description && (
                  <p className="mt-1 text-sm leading-relaxed text-[var(--stats-large-desc-color,hsl(0_0%_45%))]">
                    {stat.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
