// @version 1.0.0
// @category tabs
// @name Tabs Vertical Split
// @source custom

"use client";

import { cn } from "@/lib/utils";
import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = "clamp(1.5rem, 3vw, 2.25rem)";
const SECTION_PADDING = "py-[clamp(3rem,8vw,6rem)]";
const TAB_MIN_WIDTH = "min-w-[220px]";
const ACTIVE_BORDER_WIDTH = 3;
const TRANSITION_DURATION_MS = 200;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Tab {
  label: string;
  icon?: ReactNode;
  content: ReactNode;
}

interface TabsVerticalSplitProps {
  tabs: Tab[];
  defaultIndex?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TabsVerticalSplit({
  tabs,
  defaultIndex = 0,
  className,
}: TabsVerticalSplitProps) {
  const uid = useId();
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(0, defaultIndex), tabs.length - 1),
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // -----------------------------------------------------------------------
  // Helpers
  // -----------------------------------------------------------------------

  const tabId = (index: number) => `tvs-tab-${uid}-${index}`;
  const panelId = (index: number) => `tvs-panel-${uid}-${index}`;

  const focusTab = useCallback(
    (index: number) => {
      const clamped =
        index < 0 ? tabs.length - 1 : index >= tabs.length ? 0 : index;
      tabRefs.current[clamped]?.focus();
      setActiveIndex(clamped);
    },
    [tabs.length],
  );

  // -----------------------------------------------------------------------
  // Keyboard handler — Arrow Up / Down, Home, End
  // -----------------------------------------------------------------------

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      const actions: Record<string, () => void> = {
        ArrowDown: () => focusTab(activeIndex + 1),
        ArrowUp: () => focusTab(activeIndex - 1),
        Home: () => focusTab(0),
        End: () => focusTab(tabs.length - 1),
      };

      const action = actions[e.key];
      if (action) {
        e.preventDefault();
        action();
      }
    },
    [activeIndex, focusTab, tabs.length],
  );

  // -----------------------------------------------------------------------
  // Guard — nothing to render
  // -----------------------------------------------------------------------

  if (tabs.length === 0) return null;

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <section
      className={cn(
        SECTION_PADDING,
        "bg-[var(--background)] text-[var(--foreground)]",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* --- Layout wrapper: side-by-side on md+, stacked on mobile --- */}
        <div className="flex flex-col md:flex-row md:gap-8 lg:gap-12">
          {/* ============================================================
              Tab List
              ============================================================ */}
          <div
            role="tablist"
            aria-orientation="vertical"
            className={cn(
              "flex flex-row overflow-x-auto md:flex-col md:overflow-x-visible",
              "border-b border-[var(--border)] md:border-b-0 md:border-r",
              "shrink-0 pb-2 md:pb-0 md:pr-4",
              TAB_MIN_WIDTH,
            )}
          >
            {tabs.map((tab, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={tabId(index)}
                  id={tabId(index)}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={panelId(index)}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={handleKeyDown}
                  className={cn(
                    "group relative flex items-center gap-3 whitespace-nowrap px-4 py-3 text-left text-sm font-medium",
                    "transition-colors",
                    `duration-[${TRANSITION_DURATION_MS}ms]`,
                    "rounded-md",
                    // Focus ring
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    // Active vs inactive
                    isActive
                      ? "bg-[var(--accent)] text-[var(--foreground)]"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--accent)]/50 hover:text-[var(--foreground)]",
                  )}
                  style={{
                    ["--tw-ring-color" as string]:
                      "var(--ring, hsl(215 20% 65%))",
                  }}
                >
                  {/* Left border accent (vertical mode only) */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute left-0 top-1/2 hidden -translate-y-1/2 rounded-r-sm md:block",
                      "motion-safe:transition-all motion-safe:duration-200",
                      "motion-reduce:transition-none",
                      isActive
                        ? "h-3/5 bg-[var(--primary)] opacity-100"
                        : "h-0 bg-[var(--primary)] opacity-0",
                    )}
                    style={{ width: `${ACTIVE_BORDER_WIDTH}px` }}
                  />

                  {/* Bottom border accent (horizontal / mobile only) */}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute bottom-0 left-1/2 block -translate-x-1/2 rounded-t-sm md:hidden",
                      "motion-safe:transition-all motion-safe:duration-200",
                      "motion-reduce:transition-none",
                      isActive
                        ? "w-3/5 bg-[var(--primary)] opacity-100"
                        : "w-0 bg-[var(--primary)] opacity-0",
                    )}
                    style={{ height: `${ACTIVE_BORDER_WIDTH}px` }}
                  />

                  {/* Icon */}
                  {tab.icon && (
                    <span
                      aria-hidden="true"
                      className="shrink-0 text-[var(--primary)]"
                    >
                      {tab.icon}
                    </span>
                  )}

                  {/* Label */}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* ============================================================
              Tab Panels
              ============================================================ */}
          <div className="mt-6 min-w-0 flex-1 md:mt-0">
            {tabs.map((tab, index) => {
              const isActive = index === activeIndex;

              return (
                <div
                  key={panelId(index)}
                  id={panelId(index)}
                  role="tabpanel"
                  aria-labelledby={tabId(index)}
                  tabIndex={0}
                  hidden={!isActive}
                  className={cn(
                    "rounded-lg border border-[var(--border)] bg-[var(--card)] p-6 shadow-sm",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    // Fade in animation
                    "motion-safe:animate-[tvs-fadeIn_300ms_ease-out]",
                    "motion-reduce:animate-none",
                  )}
                  style={{
                    fontSize: HEADING_CLAMP,
                    ["--tw-ring-color" as string]:
                      "var(--ring, hsl(215 20% 65%))",
                  }}
                >
                  <div className="text-base leading-relaxed text-[var(--foreground)]">
                    {tab.content}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ================================================================
          Keyframes
          ================================================================ */}
      <style>{`
        @keyframes tvs-fadeIn {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
