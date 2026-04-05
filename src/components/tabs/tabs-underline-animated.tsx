// @version 1.0.0
// @category tabs
// @name Tabs Underline Animated
// @source custom

"use client";

import {
  useState,
  useCallback,
  useRef,
  useEffect,
  type ReactNode,
  type KeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const UNDERLINE_HEIGHT = 2;
const MIN_DEFAULT_INDEX = 0;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsUnderlineAnimatedProps {
  tabs: Tab[];
  defaultIndex?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Focus ring helper
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const ringStyle = {
  ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function TabsUnderlineAnimated({
  tabs,
  defaultIndex = MIN_DEFAULT_INDEX,
  className,
}: TabsUnderlineAnimatedProps) {
  const safeDefault = Math.min(
    Math.max(defaultIndex, MIN_DEFAULT_INDEX),
    Math.max(tabs.length - 1, 0)
  );

  const [activeIndex, setActiveIndex] = useState(safeDefault);
  const [underlineStyle, setUnderlineStyle] = useState<{
    left: number;
    width: number;
  }>({ left: 0, width: 0 });

  const tabListRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // -----------------------------------------------------------------------
  // Underline positioning
  // -----------------------------------------------------------------------

  const updateUnderline = useCallback(() => {
    const activeTab = tabRefs.current[activeIndex];
    const tabList = tabListRef.current;

    if (!activeTab || !tabList) return;

    const tabRect = activeTab.getBoundingClientRect();
    const listRect = tabList.getBoundingClientRect();

    setUnderlineStyle({
      left: tabRect.left - listRect.left,
      width: tabRect.width,
    });
  }, [activeIndex]);

  useEffect(() => {
    updateUnderline();
  }, [updateUnderline]);

  // Recalculate on resize
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      updateUnderline();
    });

    if (tabListRef.current) {
      observer.observe(tabListRef.current);
    }

    return () => observer.disconnect();
  }, [updateUnderline]);

  // -----------------------------------------------------------------------
  // Keyboard navigation
  // -----------------------------------------------------------------------

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>) => {
      let newIndex = activeIndex;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        newIndex = (activeIndex + 1) % tabs.length;
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        newIndex = (activeIndex - 1 + tabs.length) % tabs.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        newIndex = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        newIndex = tabs.length - 1;
      }

      if (newIndex !== activeIndex) {
        setActiveIndex(newIndex);
        tabRefs.current[newIndex]?.focus();
      }
    },
    [activeIndex, tabs.length]
  );

  // -----------------------------------------------------------------------
  // Tab change handler
  // -----------------------------------------------------------------------

  const handleTabClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  // -----------------------------------------------------------------------
  // Unique IDs for ARIA
  // -----------------------------------------------------------------------

  const tabIdPrefix = "tab-underline";

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <section
      className={cn(
        "w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]",
        className
      )}
      aria-label="Tabbed content"
    >
      <div className="mx-auto max-w-3xl">
        {/* ----- Tab List ----- */}
        <div
          ref={tabListRef}
          role="tablist"
          aria-label="Content tabs"
          className="relative border-b border-[var(--border)]"
        >
          <div className="flex">
            {tabs.map((tab, index) => {
              const isActive = index === activeIndex;

              return (
                <button
                  key={tab.label}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  id={`${tabIdPrefix}-${index}`}
                  role="tab"
                  type="button"
                  tabIndex={isActive ? 0 : -1}
                  aria-selected={isActive}
                  aria-controls={`${tabIdPrefix}-panel-${index}`}
                  onClick={() => handleTabClick(index)}
                  onKeyDown={handleKeyDown}
                  style={ringStyle}
                  className={cn(
                    "relative px-4 py-3 text-sm font-medium",
                    "motion-safe:transition-colors motion-safe:duration-200",
                    isActive
                      ? "text-[var(--primary)]"
                      : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                    focusRing
                  )}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* ----- Animated Underline ----- */}
          <span
            aria-hidden="true"
            className={cn(
              "absolute bottom-0 bg-[var(--primary)]",
              "motion-safe:transition-all motion-safe:duration-300 motion-safe:ease-out",
              "motion-reduce:transition-none"
            )}
            style={{
              left: underlineStyle.left,
              width: underlineStyle.width,
              height: `${UNDERLINE_HEIGHT}px`,
            }}
          />
        </div>

        {/* ----- Tab Panels ----- */}
        <div className="mt-6">
          {tabs.map((tab, index) => {
            const isActive = index === activeIndex;

            return (
              <div
                key={tab.label}
                id={`${tabIdPrefix}-panel-${index}`}
                role="tabpanel"
                tabIndex={0}
                aria-labelledby={`${tabIdPrefix}-${index}`}
                hidden={!isActive}
                className={cn(
                  isActive && "motion-safe:animate-in motion-safe:fade-in-0",
                  "motion-reduce:animate-none",
                  "rounded-lg border border-[var(--border)] bg-[var(--card)] p-6",
                  focusRing
                )}
                style={ringStyle}
              >
                {tab.content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
