// @version 1.0.0
// @category tabs
// @name Tabs Pill Cards
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = "clamp(1.5rem, 3vw, 2.5rem)";
const SECTION_PADDING = "py-[clamp(3rem,8vw,6rem)]";
const CARD_TITLE_CLAMP = "clamp(1rem, 1.5vw, 1.25rem)";
const PILL_PADDING_X = "px-5";
const PILL_PADDING_Y = "py-2";
const CROSSFADE_DURATION_MS = 250;
const GRID_COLS = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Card {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface PillTab {
  label: string;
  icon?: ReactNode;
  cards: Card[];
}

interface TabsPillCardsProps {
  tabs: PillTab[];
  headline?: string;
  defaultIndex?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TabsPillCards({
  tabs,
  headline,
  defaultIndex = 0,
  className,
}: TabsPillCardsProps) {
  const uid = useId();
  const [activeIndex, setActiveIndex] = useState(
    Math.min(Math.max(0, defaultIndex), tabs.length - 1),
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const headingId = headline ? `tpc-heading-${uid}` : undefined;
  const tabId = (i: number) => `tpc-tab-${uid}-${i}`;
  const panelId = (i: number) => `tpc-panel-${uid}-${i}`;

  // -----------------------------------------------------------------------
  // Focus helper
  // -----------------------------------------------------------------------

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
  // Keyboard — Arrow Left / Right, Home, End
  // -----------------------------------------------------------------------

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      const actions: Record<string, () => void> = {
        ArrowRight: () => focusTab(activeIndex + 1),
        ArrowLeft: () => focusTab(activeIndex - 1),
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
  // Guard
  // -----------------------------------------------------------------------

  if (tabs.length === 0) return null;

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        SECTION_PADDING,
        "bg-[var(--background)] text-[var(--foreground)]",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* ============================================================
            Headline
            ============================================================ */}
        {headline && (
          <header className="mb-10 text-center">
            <h2
              id={headingId}
              className="font-bold tracking-tight text-[var(--foreground)]"
              style={{ fontSize: HEADING_CLAMP }}
            >
              {headline}
            </h2>
          </header>
        )}

        {/* ============================================================
            Pill Tab List
            ============================================================ */}
        <div className="mb-8 flex justify-center">
          <div
            role="tablist"
            aria-orientation="horizontal"
            className={cn(
              "inline-flex flex-wrap items-center justify-center gap-2",
              "rounded-full border border-[var(--border)] bg-[var(--card)] p-1.5",
              "shadow-sm",
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
                    "relative flex items-center gap-2 rounded-full text-sm font-medium",
                    PILL_PADDING_X,
                    PILL_PADDING_Y,
                    "motion-safe:transition-all motion-safe:duration-200",
                    "motion-reduce:transition-none",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                    isActive
                      ? "bg-[var(--primary)] text-[var(--primary-foreground)] shadow-md"
                      : "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]",
                  )}
                  style={{
                    ["--tw-ring-color" as string]:
                      "var(--ring, hsl(215 20% 65%))",
                  }}
                >
                  {tab.icon && (
                    <span aria-hidden="true" className="shrink-0">
                      {tab.icon}
                    </span>
                  )}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ============================================================
            Card Panels
            ============================================================ */}
        <div className="relative">
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
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  "rounded-lg",
                  "motion-safe:animate-[tpc-crossfade_var(--tpc-duration)_ease-out]",
                  "motion-reduce:animate-none",
                )}
                style={{
                  ["--tpc-duration" as string]: `${CROSSFADE_DURATION_MS}ms`,
                  ["--tw-ring-color" as string]:
                    "var(--ring, hsl(215 20% 65%))",
                }}
              >
                <ul
                  className={cn("grid gap-6", GRID_COLS)}
                  role="list"
                >
                  {tab.cards.map((card, cardIdx) => (
                    <li
                      key={`${panelId(index)}-card-${cardIdx}`}
                      className={cn(
                        "group rounded-xl border border-[var(--border)] bg-[var(--card)] p-6",
                        "shadow-sm",
                        "motion-safe:transition-shadow motion-safe:duration-200",
                        "motion-reduce:transition-none",
                        "hover:shadow-md",
                      )}
                    >
                      {/* Card icon */}
                      {card.icon && (
                        <div
                          aria-hidden="true"
                          className={cn(
                            "mb-4 flex h-10 w-10 items-center justify-center rounded-lg",
                            "bg-[var(--primary)]/10 text-[var(--primary)]",
                          )}
                        >
                          {card.icon}
                        </div>
                      )}

                      {/* Card title */}
                      <h3
                        className="mb-2 font-semibold text-[var(--foreground)]"
                        style={{ fontSize: CARD_TITLE_CLAMP }}
                      >
                        {card.title}
                      </h3>

                      {/* Card description */}
                      <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
                        {card.description}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* ================================================================
          Keyframes
          ================================================================ */}
      <style>{`
        @keyframes tpc-crossfade {
          from {
            opacity: 0;
            transform: scale(0.98);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
}
