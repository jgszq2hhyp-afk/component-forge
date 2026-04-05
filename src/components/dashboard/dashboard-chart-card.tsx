// @version 1.0.0
// @category dashboard
// @name Dashboard Chart Card
// @source custom

"use client";

import { useState, useRef, useCallback, type KeyboardEvent } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SECTION_PADDING = "py-[clamp(1.5rem,1rem+1.5vw,2.5rem)]";
const HEADING_SIZE = "text-[clamp(1.125rem,0.85rem+0.8vw,1.5rem)]";
const CARD_RADIUS = "rounded-xl";
const CARD_PADDING = "p-5 sm:p-6";
const TAB_SIZE = "text-sm";
const LABEL_SIZE = "text-xs";
const TOOLTIP_SIZE = "text-xs";
const BAR_RADIUS = "rounded-t-md";
const BAR_MIN_HEIGHT = 4;
const BAR_MAX_HEIGHT = 160;
const CHART_HEIGHT = "h-48";
const RING_COLOR_VALUE = "var(--ring, hsl(215 20% 65%))";
const DEFAULT_TABS = ["7d", "30d", "90d", "1y"];
const BAR_ANIMATION_DURATION = "duration-500";
const BAR_ANIMATION_EASING = "ease-out";
const TRANSITION_CLASSES = "motion-safe:transition-all";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ChartData {
  labels: string[];
  values: number[];
}

interface DashboardChartCardProps {
  title: string;
  data: ChartData;
  tabs?: string[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function computeBarHeight(value: number, maxValue: number): number {
  if (maxValue === 0) return BAR_MIN_HEIGHT;
  return Math.max(
    BAR_MIN_HEIGHT,
    Math.round((value / maxValue) * BAR_MAX_HEIGHT)
  );
}

function formatValue(value: number): string {
  if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)}K`;
  }
  return value.toLocaleString();
}

/* ------------------------------------------------------------------ */
/*  Tab Bar                                                            */
/* ------------------------------------------------------------------ */

function TabBar({
  tabs,
  activeIndex,
  onSelect,
}: {
  tabs: string[];
  activeIndex: number;
  onSelect: (index: number) => void;
}) {
  const tablistRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      let nextIndex = activeIndex;

      switch (event.key) {
        case "ArrowRight":
          nextIndex = (activeIndex + 1) % tabs.length;
          break;
        case "ArrowLeft":
          nextIndex = (activeIndex - 1 + tabs.length) % tabs.length;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = tabs.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      onSelect(nextIndex);

      // Focus the new active tab
      const tablist = tablistRef.current;
      if (tablist) {
        const buttons = tablist.querySelectorAll<HTMLButtonElement>(
          '[role="tab"]'
        );
        buttons[nextIndex]?.focus();
      }
    },
    [activeIndex, tabs.length, onSelect]
  );

  return (
    <div
      ref={tablistRef}
      role="tablist"
      aria-label="Time range selection"
      className={cn(
        "inline-flex gap-1 rounded-lg p-1",
        "bg-[var(--color-muted,hsl(215_16%_47%/0.08))]"
      )}
      onKeyDown={handleKeyDown}
    >
      {tabs.map((tab, index) => {
        const isActive = index === activeIndex;
        return (
          <button
            key={tab}
            role="tab"
            type="button"
            id={`chart-tab-${index}`}
            aria-selected={isActive}
            aria-controls="chart-tabpanel"
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelect(index)}
            className={cn(
              TAB_SIZE,
              "rounded-md px-3 py-1.5 font-medium",
              "focus-visible:outline-none focus-visible:ring-2",
              TRANSITION_CLASSES,
              "motion-safe:duration-150",
              isActive
                ? [
                    "bg-[var(--color-background,hsl(0_0%_100%))]",
                    "text-[var(--color-foreground,hsl(215_25%_9%))]",
                    "shadow-sm",
                  ]
                : [
                    "text-[var(--color-muted-foreground,hsl(215_16%_47%))]",
                    "hover:text-[var(--color-foreground,hsl(215_25%_9%))]",
                  ]
            )}
            style={{
              ["--tw-ring-color" as string]: RING_COLOR_VALUE,
            }}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Single Bar                                                         */
/* ------------------------------------------------------------------ */

function ChartBar({
  label,
  value,
  height,
  maxValue,
}: {
  label: string;
  value: number;
  height: number;
  maxValue: number;
}) {
  const percentage =
    maxValue > 0 ? Math.round((value / maxValue) * 100) : 0;

  return (
    <div
      className="group relative flex flex-1 flex-col items-center gap-2"
      role="graphics-symbol"
      aria-roledescription="bar"
      aria-label={`${label}: ${formatValue(value)}`}
    >
      {/* Tooltip */}
      <div
        className={cn(
          TOOLTIP_SIZE,
          "pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2",
          "whitespace-nowrap rounded-md px-2 py-1",
          "bg-[var(--color-foreground,hsl(215_25%_9%))]",
          "text-[var(--color-background,hsl(0_0%_100%))]",
          "opacity-0 group-hover:opacity-100",
          "focus-within:opacity-100",
          TRANSITION_CLASSES,
          "motion-safe:duration-150",
          "motion-reduce:transition-none"
        )}
        role="tooltip"
      >
        {formatValue(value)}
        {/* Tooltip Arrow */}
        <span
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 top-full -translate-x-1/2",
            "border-4 border-transparent",
            "border-t-[var(--color-foreground,hsl(215_25%_9%))]"
          )}
        />
      </div>

      {/* Bar Container (grows from bottom) */}
      <div className={cn(CHART_HEIGHT, "flex w-full items-end")}>
        <div
          className={cn(
            "w-full",
            BAR_RADIUS,
            TRANSITION_CLASSES,
            BAR_ANIMATION_DURATION,
            BAR_ANIMATION_EASING,
            "motion-reduce:transition-none",
            "bg-[var(--color-primary,hsl(215_90%_60%))]",
            "group-hover:bg-[var(--color-primary-hover,hsl(215_90%_50%))]",
            "min-h-[4px]"
          )}
          style={{ height: `${height}px` }}
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={maxValue}
          aria-label={`${percentage}% of maximum`}
        />
      </div>

      {/* Label */}
      <span
        className={cn(
          LABEL_SIZE,
          "truncate text-center",
          "text-[var(--color-muted-foreground,hsl(215_16%_47%))]",
          "max-w-full"
        )}
      >
        {label}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Y-Axis Gridlines                                                   */
/* ------------------------------------------------------------------ */

const GRIDLINE_COUNT = 4;

function YAxisGridlines({ maxValue }: { maxValue: number }) {
  const lines = Array.from({ length: GRIDLINE_COUNT + 1 }, (_, i) => {
    const value = Math.round((maxValue / GRIDLINE_COUNT) * (GRIDLINE_COUNT - i));
    return { value, position: (i / GRIDLINE_COUNT) * 100 };
  });

  return (
    <div
      className={cn(CHART_HEIGHT, "pointer-events-none absolute inset-0")}
      aria-hidden="true"
    >
      {lines.map((line) => (
        <div
          key={line.value}
          className="absolute left-0 right-0 flex items-center"
          style={{ top: `${line.position}%` }}
        >
          <span
            className={cn(
              LABEL_SIZE,
              "absolute -left-12 w-10 text-right",
              "text-[var(--color-muted-foreground,hsl(215_16%_47%/0.5))]"
            )}
          >
            {formatValue(line.value)}
          </span>
          <span
            className={cn(
              "h-px w-full",
              "bg-[var(--color-border,hsl(215_20%_85%/0.5))]"
            )}
          />
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function DashboardChartCard({
  title,
  data,
  tabs = DEFAULT_TABS,
  className,
}: DashboardChartCardProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const maxValue = Math.max(...data.values, 1);

  const barHeights = data.values.map((v) =>
    computeBarHeight(v, maxValue)
  );

  return (
    <section
      aria-label={title}
      className={cn(SECTION_PADDING, className)}
    >
      <div
        className={cn(
          CARD_RADIUS,
          CARD_PADDING,
          "border border-[var(--color-border,hsl(215_20%_85%))]",
          "bg-[var(--color-card,hsl(0_0%_100%))]",
          "shadow-sm"
        )}
      >
        {/* Header: Title + Tabs */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2
            className={cn(
              HEADING_SIZE,
              "font-bold tracking-tight",
              "text-[var(--color-foreground,hsl(215_25%_9%))]"
            )}
          >
            {title}
          </h2>

          {tabs.length > 0 && (
            <TabBar
              tabs={tabs}
              activeIndex={activeTabIndex}
              onSelect={setActiveTabIndex}
            />
          )}
        </div>

        {/* Chart Area */}
        <div
          id="chart-tabpanel"
          role="tabpanel"
          aria-labelledby={`chart-tab-${activeTabIndex}`}
          className="relative pl-14"
        >
          {/* Y-Axis Gridlines */}
          <YAxisGridlines maxValue={maxValue} />

          {/* Bars */}
          <div
            className="relative flex items-end gap-2 sm:gap-3"
            role="img"
            aria-label={`Bar chart showing ${title} with ${data.values.length} data points`}
          >
            {data.labels.map((label, index) => (
              <ChartBar
                key={`${label}-${index}`}
                label={label}
                value={data.values[index] ?? 0}
                height={barHeights[index] ?? BAR_MIN_HEIGHT}
                maxValue={maxValue}
              />
            ))}
          </div>
        </div>

        {/* Summary line */}
        <div
          className={cn(
            "mt-4 border-t pt-3",
            "border-[var(--color-border,hsl(215_20%_85%))]"
          )}
        >
          <p
            className={cn(
              LABEL_SIZE,
              "text-[var(--color-muted-foreground,hsl(215_16%_47%))]"
            )}
          >
            Showing data for{" "}
            <span className="font-medium text-[var(--color-foreground,hsl(215_25%_9%))]">
              {tabs[activeTabIndex] ?? "selected period"}
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
