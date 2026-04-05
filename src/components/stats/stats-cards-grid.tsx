// @version 2.0.0
// @category stats
// @name Stats Cards Grid
// @source custom-implementation

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SECTION_PY = "py-16 sm:py-24";
const MAX_WIDTH = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8";
const CARD_RADIUS = "rounded-2xl";
const CARD_PADDING = "p-6";
const TREND_ICON_SIZE = "h-3 w-3";

interface StatCard {
  value: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: { direction: "up" | "down"; value: string };
}

interface StatsCardsGridProps {
  stats?: StatCard[];
  heading?: string;
  columns?: 2 | 3 | 4;
  variant?: "bordered" | "filled" | "elevated";
  className?: string;
}

const defaultStats: StatCard[] = [
  {
    value: "2.4M",
    label: "Active Users",
    description: "Monthly active users on our platform",
    trend: { direction: "up", value: "+12.3%" },
  },
  {
    value: "99.9%",
    label: "Uptime",
    description: "Average uptime over the past 12 months",
    trend: { direction: "up", value: "+0.2%" },
  },
  {
    value: "150ms",
    label: "Avg Response",
    description: "Average API response time globally",
    trend: { direction: "down", value: "-23ms" },
  },
  {
    value: "50+",
    label: "Countries",
    description: "Countries with active customers",
    trend: { direction: "up", value: "+8" },
  },
];

const columnClasses: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};

const variantClasses: Record<string, string> = {
  bordered:
    "bg-[var(--stat-card-bg,transparent)] border border-[var(--stat-card-border,hsl(0_0%_0%/0.08))]",
  filled: "bg-[var(--stat-card-bg,hsl(0_0%_97%))]",
  elevated:
    "bg-[var(--stat-card-bg,hsl(0_0%_100%))] shadow-md shadow-[var(--stat-card-shadow,hsl(0_0%_0%/0.04))]",
};

export default function StatsCardsGrid({
  stats = defaultStats,
  heading,
  columns = 4,
  variant = "bordered",
  className,
}: StatsCardsGridProps) {
  return (
    <section
      className={cn(
        SECTION_PY,
        "bg-[var(--stats-bg,transparent)]",
        className
      )}
      aria-label="Key statistics overview"
    >
      <div className={MAX_WIDTH}>
        {heading && (
          <h2
            className={cn(
              "mb-12 text-center font-bold",
              "text-[clamp(1.5rem,1rem+1.5vw,1.875rem)]",
              "text-[var(--stats-heading-color,hsl(0_0%_9%))]"
            )}
          >
            {heading}
          </h2>
        )}

        <dl className={cn("grid gap-6", columnClasses[columns])}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={cn(
                CARD_RADIUS,
                CARD_PADDING,
                variantClasses[variant],
                "focus-within:ring-2 focus-within:ring-[var(--stat-card-focus-ring,hsl(220_80%_55%))] focus-within:ring-offset-2"
              )}
            >
              <div className="flex items-start justify-between">
                <div>
                  <dt className="text-sm font-medium text-[var(--stat-card-label-color,hsl(0_0%_45%))]">
                    {stat.label}
                  </dt>
                  <dd className="mt-2 text-3xl font-bold tracking-tight text-[var(--stat-card-value-color,hsl(0_0%_9%))]">
                    {stat.value}
                  </dd>
                </div>
                {stat.icon && (
                  <div
                    className="flex-shrink-0 text-[var(--stat-card-icon-color,hsl(0_0%_55%))]"
                    aria-hidden="true"
                  >
                    {stat.icon}
                  </div>
                )}
              </div>

              {stat.description && (
                <p className="mt-3 text-sm text-[var(--stat-card-desc-color,hsl(0_0%_55%))]">
                  {stat.description}
                </p>
              )}

              {stat.trend && (
                <div className="mt-4 flex items-center gap-1.5">
                  <span
                    className={cn(
                      "inline-flex items-center text-xs font-semibold",
                      stat.trend.direction === "up"
                        ? "text-[var(--stat-card-trend-up,hsl(142_71%_35%))]"
                        : "text-[var(--stat-card-trend-down,hsl(0_84%_50%))]"
                    )}
                  >
                    <svg
                      className={cn(
                        TREND_ICON_SIZE,
                        "mr-0.5",
                        stat.trend.direction === "down" && "rotate-180"
                      )}
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 9V3m0 0L3 6m3-3l3 3"
                      />
                    </svg>
                    {stat.trend.value}
                  </span>
                  <span className="text-xs text-[var(--stat-card-trend-label,hsl(0_0%_55%))]">
                    vs last period
                  </span>
                </div>
              )}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
