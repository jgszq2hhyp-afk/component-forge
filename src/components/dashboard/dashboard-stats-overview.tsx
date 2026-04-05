// @version 1.0.0
// @category dashboard
// @name Dashboard Stats Overview
// @source custom

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SECTION_PADDING = "py-[clamp(1.5rem,1rem+1.5vw,2.5rem)]";
const GRID_GAP = "gap-4 sm:gap-6";
const CARD_PADDING = "p-5 sm:p-6";
const CARD_RADIUS = "rounded-xl";
const VALUE_SIZE = "text-[clamp(1.75rem,1.25rem+1.5vw,2.5rem)]";
const LABEL_SIZE = "text-sm";
const CHANGE_SIZE = "text-sm";
const TREND_ICON_SIZE = "h-4 w-4";
const PERIOD_SIZE = "text-xs";
const RING_COLOR_VALUE = "var(--ring, hsl(215 20% 65%))";
const TRANSITION_CLASSES =
  "motion-safe:transition-shadow motion-safe:duration-200";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface StatItem {
  label: string;
  value: string;
  change?: number;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
}

interface DashboardStatsOverviewProps {
  stats: StatItem[];
  period?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Trend Colors                                                       */
/* ------------------------------------------------------------------ */

const TREND_COLORS: Record<NonNullable<StatItem["trend"]>, string> = {
  up: "text-[var(--color-success,hsl(142_71%_45%))]",
  down: "text-[var(--color-destructive,hsl(0_84%_60%))]",
  neutral: "text-[var(--color-muted-foreground,hsl(215_16%_47%))]",
};

const TREND_BG: Record<NonNullable<StatItem["trend"]>, string> = {
  up: "bg-[var(--color-success-muted,hsl(142_71%_45%/0.1))]",
  down: "bg-[var(--color-destructive-muted,hsl(0_84%_60%/0.1))]",
  neutral: "bg-[var(--color-muted,hsl(215_16%_47%/0.1))]",
};

/* ------------------------------------------------------------------ */
/*  Trend Arrow SVGs                                                   */
/* ------------------------------------------------------------------ */

function TrendArrowUp({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(TREND_ICON_SIZE, className)}
    >
      <path d="M8 12V4" />
      <path d="M4 8l4-4 4 4" />
    </svg>
  );
}

function TrendArrowDown({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(TREND_ICON_SIZE, className)}
    >
      <path d="M8 4v8" />
      <path d="M4 8l4 4 4-4" />
    </svg>
  );
}

function TrendDash({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={cn(TREND_ICON_SIZE, className)}
    >
      <path d="M3 8h10" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Trend Icon Resolver                                                */
/* ------------------------------------------------------------------ */

function TrendIcon({ trend }: { trend: NonNullable<StatItem["trend"]> }) {
  switch (trend) {
    case "up":
      return <TrendArrowUp />;
    case "down":
      return <TrendArrowDown />;
    case "neutral":
      return <TrendDash />;
  }
}

/* ------------------------------------------------------------------ */
/*  Stat Card                                                          */
/* ------------------------------------------------------------------ */

function StatCard({ stat }: { stat: StatItem }) {
  const trend = stat.trend ?? "neutral";
  const hasChange = stat.change !== undefined;

  return (
    <article
      className={cn(
        CARD_PADDING,
        CARD_RADIUS,
        TRANSITION_CLASSES,
        "border border-[var(--color-border,hsl(215_20%_85%))]",
        "bg-[var(--color-card,hsl(0_0%_100%))]",
        "shadow-sm hover:shadow-md",
        "flex flex-col justify-between gap-3"
      )}
    >
      {/* Top Row: Icon + Label */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={cn(
            LABEL_SIZE,
            "font-medium",
            "text-[var(--color-muted-foreground,hsl(215_16%_47%))]",
            "leading-tight"
          )}
        >
          {stat.label}
        </span>

        {stat.icon && (
          <span
            aria-hidden="true"
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center",
              "rounded-lg",
              "bg-[var(--color-muted,hsl(215_16%_47%/0.08))]",
              "text-[var(--color-muted-foreground,hsl(215_16%_47%))]"
            )}
          >
            {stat.icon}
          </span>
        )}
      </div>

      {/* Metric Value */}
      <p
        className={cn(
          VALUE_SIZE,
          "font-bold tracking-tight leading-none",
          "text-[var(--color-foreground,hsl(215_25%_9%))]"
        )}
      >
        {stat.value}
      </p>

      {/* Trend Badge */}
      {hasChange && (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "inline-flex items-center gap-1",
              "rounded-full px-2 py-0.5",
              CHANGE_SIZE,
              "font-medium",
              TREND_COLORS[trend],
              TREND_BG[trend]
            )}
          >
            <TrendIcon trend={trend} />
            <span>
              {trend === "up" ? "+" : ""}
              {stat.change}%
            </span>
          </span>
        </div>
      )}
    </article>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function DashboardStatsOverview({
  stats,
  period,
  className,
}: DashboardStatsOverviewProps) {
  const gridCols =
    stats.length <= 2
      ? "grid-cols-1 sm:grid-cols-2"
      : stats.length === 3
        ? "grid-cols-1 sm:grid-cols-3"
        : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";

  return (
    <section
      aria-label="Key performance indicators"
      className={cn(SECTION_PADDING, className)}
    >
      {/* Period indicator */}
      {period && (
        <p
          className={cn(
            PERIOD_SIZE,
            "mb-3 font-medium uppercase tracking-wider",
            "text-[var(--color-muted-foreground,hsl(215_16%_47%))]"
          )}
        >
          {period}
        </p>
      )}

      {/* Stat Cards Grid */}
      <div className={cn("grid", gridCols, GRID_GAP)} role="list">
        {stats.map((stat) => (
          <div role="listitem" key={stat.label}>
            <StatCard stat={stat} />
          </div>
        ))}
      </div>
    </section>
  );
}
