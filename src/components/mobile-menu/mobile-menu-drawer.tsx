// @version 1.0.0
// @category mobile-menu
// @name Mobile Menu Drawer
// @source custom

"use client";

import { cn } from "@/lib/utils";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DRAWER_WIDTH = "w-[min(320px,85vw)]";
const ANIMATION_DURATION_MS = 300;
const BACKDROP_OPACITY = 0.5;
const LINK_FONT_SIZE = "text-[clamp(0.9375rem,1.2vw,1.125rem)]";
const CHILD_FONT_SIZE = "text-[clamp(0.875rem,1.1vw,1rem)]";
const SECTION_TRANSITION = `${ANIMATION_DURATION_MS}ms`;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

interface MobileMenuDrawerProps {
  open: boolean;
  onClose: () => void;
  links: NavLink[];
  logo?: ReactNode;
  position?: "left" | "right";
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MobileMenuDrawer({
  open,
  onClose,
  links,
  logo,
  position = "left",
  className,
}: MobileMenuDrawerProps) {
  const uid = useId();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  const navId = `mmd-nav-${uid}`;
  const labelId = `mmd-label-${uid}`;
  const subMenuId = (i: number) => `mmd-submenu-${uid}-${i}`;

  // -----------------------------------------------------------------------
  // Open / close lifecycle with animation
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (open) {
      setVisible(true);
      // Small delay so the browser paints the initial state before animating
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      setAnimating(false);
      const timer = setTimeout(() => {
        setVisible(false);
        setExpandedIndex(null);
      }, ANIMATION_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // -----------------------------------------------------------------------
  // Body scroll lock
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (open) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [open]);

  // -----------------------------------------------------------------------
  // Focus trap
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!open || !drawerRef.current) return;

    // Move focus to close button on open
    closeRef.current?.focus();

    const drawer = drawerRef.current;

    const handleFocusTrap = (e: FocusEvent) => {
      if (!drawer.contains(e.target as Node)) {
        closeRef.current?.focus();
      }
    };

    document.addEventListener("focusin", handleFocusTrap);
    return () => document.removeEventListener("focusin", handleFocusTrap);
  }, [open]);

  // -----------------------------------------------------------------------
  // Escape to close
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  // -----------------------------------------------------------------------
  // Accordion toggle
  // -----------------------------------------------------------------------

  const toggleExpanded = useCallback(
    (index: number) => {
      setExpandedIndex(expandedIndex === index ? null : index);
    },
    [expandedIndex],
  );

  // -----------------------------------------------------------------------
  // Keyboard navigation for accordion triggers
  // -----------------------------------------------------------------------

  const handleAccordionKeyDown = useCallback(
    (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleExpanded(index);
      }
    },
    [toggleExpanded],
  );

  // -----------------------------------------------------------------------
  // Guard — not visible at all
  // -----------------------------------------------------------------------

  if (!visible) return null;

  // -----------------------------------------------------------------------
  // Position classes
  // -----------------------------------------------------------------------

  const isLeft = position === "left";

  const slideFrom = isLeft
    ? animating
      ? "translate-x-0"
      : "-translate-x-full"
    : animating
      ? "translate-x-0"
      : "translate-x-full";

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <>
      {/* ==============================================================
          Backdrop
          ============================================================== */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/[var(--mmd-backdrop-opacity)]",
          "motion-safe:transition-opacity",
          `motion-safe:duration-[${SECTION_TRANSITION}]`,
          "motion-reduce:transition-none",
          animating ? "opacity-100" : "opacity-0",
        )}
        style={{
          ["--mmd-backdrop-opacity" as string]: BACKDROP_OPACITY,
        }}
      />

      {/* ==============================================================
          Drawer Panel
          ============================================================== */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        className={cn(
          "fixed inset-y-0 z-50 flex flex-col",
          DRAWER_WIDTH,
          isLeft ? "left-0" : "right-0",
          "bg-[var(--background)] text-[var(--foreground)]",
          "shadow-2xl",
          "motion-safe:transition-transform",
          `motion-safe:duration-[${SECTION_TRANSITION}]`,
          "motion-safe:ease-[cubic-bezier(0.32,0.72,0,1)]",
          "motion-reduce:transition-none",
          slideFrom,
          className,
        )}
      >
        {/* ---------------------------------------------------------------
            Header: Logo + Close
            --------------------------------------------------------------- */}
        <header className="flex items-center justify-between border-b border-[var(--border)] px-5 py-4">
          {logo ? (
            <div id={labelId} className="shrink-0">
              {logo}
            </div>
          ) : (
            <span id={labelId} className="sr-only">
              Navigation menu
            </span>
          )}

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close navigation menu"
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-md",
              "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]",
              "motion-safe:transition-colors motion-safe:duration-150",
              "motion-reduce:transition-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            )}
            style={{
              ["--tw-ring-color" as string]:
                "var(--ring, hsl(215 20% 65%))",
            }}
          >
            {/* X icon */}
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </header>

        {/* ---------------------------------------------------------------
            Navigation
            --------------------------------------------------------------- */}
        <nav id={navId} aria-label="Main navigation" className="flex-1 overflow-y-auto px-4 py-4">
          <ul role="list" className="space-y-1">
            {links.map((link, index) => {
              const hasChildren = link.children && link.children.length > 0;
              const isExpanded = expandedIndex === index;

              return (
                <li key={`${navId}-link-${index}`}>
                  {hasChildren ? (
                    <>
                      {/* Accordion trigger */}
                      <button
                        type="button"
                        onClick={() => toggleExpanded(index)}
                        onKeyDown={(e) => handleAccordionKeyDown(e, index)}
                        aria-expanded={isExpanded}
                        aria-controls={subMenuId(index)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-md px-3 py-2.5",
                          LINK_FONT_SIZE,
                          "font-medium text-[var(--foreground)]",
                          "hover:bg-[var(--accent)]",
                          "motion-safe:transition-colors motion-safe:duration-150",
                          "motion-reduce:transition-none",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                        )}
                        style={{
                          ["--tw-ring-color" as string]:
                            "var(--ring, hsl(215 20% 65%))",
                        }}
                      >
                        <span>{link.label}</span>

                        {/* Chevron */}
                        <svg
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={cn(
                            "shrink-0 text-[var(--muted-foreground)]",
                            "motion-safe:transition-transform motion-safe:duration-200",
                            "motion-reduce:transition-none",
                            isExpanded ? "rotate-180" : "rotate-0",
                          )}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </button>

                      {/* Sub-menu (accordion body) */}
                      <div
                        id={subMenuId(index)}
                        role="region"
                        aria-labelledby={undefined}
                        className={cn(
                          "overflow-hidden",
                          "motion-safe:transition-[max-height,opacity] motion-safe:duration-200",
                          "motion-safe:ease-[cubic-bezier(0.4,0,0.2,1)]",
                          "motion-reduce:transition-none",
                        )}
                        style={{
                          maxHeight: isExpanded
                            ? `${(link.children?.length ?? 0) * 48 + 16}px`
                            : "0px",
                          opacity: isExpanded ? 1 : 0,
                        }}
                      >
                        <ul
                          role="list"
                          className="ml-3 space-y-0.5 border-l border-[var(--border)] py-1 pl-3"
                        >
                          {link.children?.map((child, childIdx) => (
                            <li key={`${subMenuId(index)}-child-${childIdx}`}>
                              <a
                                href={child.href}
                                className={cn(
                                  "block rounded-md px-3 py-2",
                                  CHILD_FONT_SIZE,
                                  "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]",
                                  "motion-safe:transition-colors motion-safe:duration-150",
                                  "motion-reduce:transition-none",
                                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                                )}
                                style={{
                                  ["--tw-ring-color" as string]:
                                    "var(--ring, hsl(215 20% 65%))",
                                }}
                              >
                                {child.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </>
                  ) : (
                    /* Simple link */
                    <a
                      href={link.href}
                      className={cn(
                        "block rounded-md px-3 py-2.5",
                        LINK_FONT_SIZE,
                        "font-medium text-[var(--foreground)]",
                        "hover:bg-[var(--accent)]",
                        "motion-safe:transition-colors motion-safe:duration-150",
                        "motion-reduce:transition-none",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      )}
                      style={{
                        ["--tw-ring-color" as string]:
                          "var(--ring, hsl(215 20% 65%))",
                      }}
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* ================================================================
          Keyframes (prefixed with mmd-)
          ================================================================ */}
      <style>{`
        @keyframes mmd-slideInLeft {
          from { transform: translateX(-100%); }
          to   { transform: translateX(0); }
        }
        @keyframes mmd-slideInRight {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes mmd-fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </>
  );
}
