// @version 1.0.0
// @category modal
// @name Modal Command Palette
// @source custom

"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const PALETTE_MAX_WIDTH = "32rem";
const PALETTE_MAX_HEIGHT = "24rem";
const INPUT_HEIGHT = "h-12";
const ITEM_HEIGHT = "h-10";
const TRANSITION_DURATION_MS = 150;
const NO_RESULTS_TEXT = "No results found.";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CommandItem {
  label: string;
  icon?: ReactNode;
  shortcut?: string;
  onSelect: () => void;
}

interface CommandGroup {
  label: string;
  items: CommandItem[];
}

interface ModalCommandPaletteProps {
  /** Whether the palette is open */
  open: boolean;
  /** Callback to close the palette */
  onClose: () => void;
  /** Groups of command items */
  groups: CommandGroup[];
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Focus styles
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const ringStyle = {
  ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
} as React.CSSProperties;

// ---------------------------------------------------------------------------
// Search icon
// ---------------------------------------------------------------------------

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

interface FlatItem {
  groupIndex: number;
  itemIndex: number;
  item: CommandItem;
  groupLabel: string;
}

function flattenGroups(groups: CommandGroup[]): FlatItem[] {
  const result: FlatItem[] = [];
  groups.forEach((group, gi) => {
    group.items.forEach((item, ii) => {
      result.push({ groupIndex: gi, itemIndex: ii, item, groupLabel: group.label });
    });
  });
  return result;
}

function filterGroups(groups: CommandGroup[], query: string): CommandGroup[] {
  if (!query.trim()) return groups;
  const lower = query.toLowerCase();
  return groups
    .map((group) => ({
      ...group,
      items: group.items.filter((item) =>
        item.label.toLowerCase().includes(lower)
      ),
    }))
    .filter((group) => group.items.length > 0);
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ModalCommandPalette({
  open,
  onClose,
  groups,
  placeholder = "Type a command or search...",
  className,
}: ModalCommandPaletteProps) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // -----------------------------------------------------------------------
  // Filtered + flattened data
  // -----------------------------------------------------------------------

  const filteredGroups = useMemo(
    () => filterGroups(groups, query),
    [groups, query]
  );

  const flatItems = useMemo(
    () => flattenGroups(filteredGroups),
    [filteredGroups]
  );

  const totalItems = flatItems.length;

  // -----------------------------------------------------------------------
  // Reset state on open/close
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      setQuery("");
      setActiveIndex(0);
      requestAnimationFrame(() => {
        inputRef.current?.focus();
      });
    } else {
      previousActiveElement.current?.focus();
    }
  }, [open]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // -----------------------------------------------------------------------
  // Body scroll lock
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // -----------------------------------------------------------------------
  // Scroll active item into view
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!open || totalItems === 0) return;
    const activeId = `cmd-item-${activeIndex}`;
    const el = document.getElementById(activeId);
    el?.scrollIntoView({ block: "nearest" });
  }, [activeIndex, open, totalItems]);

  // -----------------------------------------------------------------------
  // Select handler
  // -----------------------------------------------------------------------

  const selectItem = useCallback(
    (item: CommandItem) => {
      onClose();
      // Defer execution so the modal closes first
      requestAnimationFrame(() => {
        item.onSelect();
      });
    },
    [onClose]
  );

  // -----------------------------------------------------------------------
  // Focus trap + Keyboard navigation
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          onClose();
          break;

        case "ArrowDown":
          e.preventDefault();
          setActiveIndex((prev) => (prev + 1) % Math.max(totalItems, 1));
          break;

        case "ArrowUp":
          e.preventDefault();
          setActiveIndex((prev) =>
            (prev - 1 + Math.max(totalItems, 1)) % Math.max(totalItems, 1)
          );
          break;

        case "Enter":
          e.preventDefault();
          if (flatItems[activeIndex]) {
            selectItem(flatItems[activeIndex].item);
          }
          break;

        case "Tab": {
          // Focus trap: keep focus within the dialog
          const dialog = dialogRef.current;
          if (!dialog) return;

          const focusable = dialog.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
          break;
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose, totalItems, flatItems, activeIndex, selectItem]);

  // -----------------------------------------------------------------------
  // Backdrop click
  // -----------------------------------------------------------------------

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  // -----------------------------------------------------------------------
  // Track group boundaries for rendering group headers
  // -----------------------------------------------------------------------

  const groupStartIndices = useMemo(() => {
    const map = new Map<number, number>();
    let runningIndex = 0;
    filteredGroups.forEach((group, gi) => {
      map.set(gi, runningIndex);
      runningIndex += group.items.length;
    });
    return map;
  }, [filteredGroups]);

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={handleBackdropClick}
      className={cn(
        "fixed inset-0 z-50 flex items-start justify-center pt-[clamp(6rem,20vh,12rem)]",
        "px-[clamp(1rem,4vw,2rem)]",
        "motion-safe:animate-[cmdFadeIn_150ms_ease-out_forwards]",
        "motion-reduce:opacity-100",
        className
      )}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 backdrop-blur-sm",
          "motion-safe:animate-[cmdFadeIn_150ms_ease-out_forwards]",
          "motion-reduce:opacity-100"
        )}
        style={{
          backgroundColor: "color-mix(in oklch, var(--background) 60%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Palette panel */}
      <div
        ref={dialogRef}
        className={cn(
          "relative z-10 w-full rounded-xl shadow-2xl overflow-hidden",
          "border",
          "motion-safe:animate-[cmdSlideDown_150ms_ease-out_forwards]",
          "motion-reduce:translate-y-0 motion-reduce:opacity-100"
        )}
        style={{
          maxWidth: PALETTE_MAX_WIDTH,
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Search input */}
        <div
          className="flex items-center gap-3 px-4 border-b"
          style={{ borderColor: "var(--border)" }}
        >
          <SearchIcon
            className="shrink-0"
            // color via parent style
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className={cn(
              INPUT_HEIGHT,
              "w-full bg-transparent text-sm",
              "placeholder:text-[var(--muted-foreground)]",
              "outline-none border-none",
              focusRing
            )}
            style={{
              ...ringStyle,
              color: "var(--foreground)",
            }}
            role="combobox"
            aria-expanded={totalItems > 0}
            aria-controls="cmd-list"
            aria-activedescendant={
              totalItems > 0 ? `cmd-item-${activeIndex}` : undefined
            }
            autoComplete="off"
            spellCheck={false}
          />

          {/* Escape badge */}
          <kbd
            className="hidden sm:inline-flex items-center rounded px-1.5 py-0.5 text-[0.65rem] font-mono border shrink-0"
            style={{
              color: "var(--muted-foreground)",
              borderColor: "var(--border)",
              backgroundColor: "color-mix(in oklch, var(--muted-foreground) 8%, transparent)",
            }}
          >
            ESC
          </kbd>
        </div>

        {/* Results list */}
        <div
          ref={listRef}
          id="cmd-list"
          role="listbox"
          aria-label="Commands"
          className="overflow-y-auto py-2"
          style={{ maxHeight: PALETTE_MAX_HEIGHT }}
        >
          {totalItems === 0 && (
            <p
              className="px-4 py-8 text-center text-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              {NO_RESULTS_TEXT}
            </p>
          )}

          {filteredGroups.map((group, gi) => {
            const startIdx = groupStartIndices.get(gi) ?? 0;

            return (
              <div key={`group-${gi}-${group.label}`} role="group" aria-label={group.label}>
                {/* Group header */}
                <div
                  className="px-4 py-1.5 text-xs font-medium uppercase tracking-wider"
                  style={{ color: "var(--muted-foreground)" }}
                  role="presentation"
                >
                  {group.label}
                </div>

                {/* Items */}
                {group.items.map((item, ii) => {
                  const flatIdx = startIdx + ii;
                  const isActive = flatIdx === activeIndex;

                  return (
                    <button
                      key={`item-${gi}-${ii}-${item.label}`}
                      id={`cmd-item-${flatIdx}`}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onClick={() => selectItem(item)}
                      onMouseEnter={() => setActiveIndex(flatIdx)}
                      className={cn(
                        "flex items-center gap-3 w-full px-4 text-sm text-left",
                        ITEM_HEIGHT,
                        "motion-safe:transition-colors motion-safe:duration-75",
                        "motion-reduce:transition-none",
                        focusRing,
                        "cursor-pointer"
                      )}
                      style={{
                        ...ringStyle,
                        color: "var(--foreground)",
                        backgroundColor: isActive
                          ? "color-mix(in oklch, var(--primary) 10%, transparent)"
                          : "transparent",
                      }}
                    >
                      {/* Icon */}
                      {item.icon && (
                        <span
                          className="shrink-0 w-5 h-5 flex items-center justify-center"
                          style={{ color: "var(--muted-foreground)" }}
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                      )}

                      {/* Label */}
                      <span className="flex-1 truncate">{item.label}</span>

                      {/* Shortcut */}
                      {item.shortcut && (
                        <kbd
                          className="hidden sm:inline-flex items-center gap-0.5 text-[0.65rem] font-mono shrink-0"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {item.shortcut.split("+").map((key, ki) => (
                            <span
                              key={`key-${ki}-${key}`}
                              className="inline-flex items-center rounded px-1 py-0.5 border"
                              style={{
                                borderColor: "var(--border)",
                                backgroundColor: "color-mix(in oklch, var(--muted-foreground) 8%, transparent)",
                              }}
                            >
                              {key.trim()}
                            </span>
                          ))}
                        </kbd>
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer hint */}
        <div
          className="flex items-center justify-between px-4 py-2 text-[0.65rem] border-t"
          style={{
            color: "var(--muted-foreground)",
            borderColor: "var(--border)",
            backgroundColor: "color-mix(in oklch, var(--muted-foreground) 4%, transparent)",
          }}
        >
          <span className="flex items-center gap-2">
            <kbd className="inline-flex items-center rounded border px-1 py-0.5" style={{ borderColor: "var(--border)" }}>
              &uarr;&darr;
            </kbd>
            <span>navigate</span>
          </span>
          <span className="flex items-center gap-2">
            <kbd className="inline-flex items-center rounded border px-1 py-0.5" style={{ borderColor: "var(--border)" }}>
              &crarr;
            </kbd>
            <span>select</span>
          </span>
          <span className="flex items-center gap-2">
            <kbd className="inline-flex items-center rounded border px-1 py-0.5" style={{ borderColor: "var(--border)" }}>
              esc
            </kbd>
            <span>close</span>
          </span>
        </div>
      </div>

      {/* Keyframe definitions */}
      <style>{`
        @keyframes cmdFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes cmdSlideDown {
          from { opacity: 0; transform: translateY(-0.5rem) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
