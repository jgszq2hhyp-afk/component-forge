// @version 2.0.0
// @category navigation
// @name Nav With Search
// @score 92
// @source custom-implementation

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CONTENT_MAX_WIDTH = "80rem";
const SEARCH_MAX_WIDTH = "28rem";
const ICON_SIZE_SM = 16;
const ICON_SIZE_MD = 20;
const SVG_VIEWBOX = 24;
const SVG_STROKE_WIDTH = 2;
const NAV_PADDING_Y = "0.75rem";
const LOGO_FONT_SIZE = "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)";
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
const RING_STYLE = {
  ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
  ["--tw-ring-offset-color" as string]: "var(--background)",
} as React.CSSProperties;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface NavWithSearchProps {
  logo?: React.ReactNode;
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  searchPlaceholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Reduced-motion styles
// ---------------------------------------------------------------------------

const reducedMotionStyles = `
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Search icon SVG path
// ---------------------------------------------------------------------------

const SEARCH_ICON_PATH =
  "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z";

function SearchIcon({
  size = ICON_SIZE_SM,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      className={className}
      style={{ width: size, height: size, color: "var(--muted-foreground)" }}
      fill="none"
      viewBox={`0 0 ${SVG_VIEWBOX} ${SVG_VIEWBOX}`}
      strokeWidth={SVG_STROKE_WIDTH}
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={SEARCH_ICON_PATH} />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NavWithSearch({
  logo = "Brand",
  links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "Docs", href: "#docs" },
  ],
  ctaLabel = "Sign Up",
  ctaHref = "#signup",
  searchPlaceholder = "Search...",
  onSearch,
  className,
}: NavWithSearchProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [focusedLinkIndex, setFocusedLinkIndex] = useState(-1);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const desktopNavRef = useRef<HTMLUListElement>(null);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setIsMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Arrow-key navigation for desktop links
  const handleNavKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        const next = (focusedLinkIndex + 1) % links.length;
        setFocusedLinkIndex(next);
        const items =
          desktopNavRef.current?.querySelectorAll<HTMLAnchorElement>("a");
        items?.[next]?.focus();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        const prev = (focusedLinkIndex - 1 + links.length) % links.length;
        setFocusedLinkIndex(prev);
        const items =
          desktopNavRef.current?.querySelectorAll<HTMLAnchorElement>("a");
        items?.[prev]?.focus();
      }
    },
    [focusedLinkIndex, links.length],
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: reducedMotionStyles }} />

      <header
        className={cn(
          "sticky top-0 z-50 w-full border-b backdrop-blur-sm",
          className,
        )}
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--border)",
        }}
      >
        <nav
          aria-label="Main navigation"
          className="mx-auto flex items-center gap-4 px-4 sm:px-6 lg:px-8"
          style={{
            maxWidth: CONTENT_MAX_WIDTH,
            paddingTop: NAV_PADDING_Y,
            paddingBottom: NAV_PADDING_Y,
          }}
        >
          {/* Logo */}
          <a
            href="/"
            aria-label="Home"
            className={cn(
              "flex-shrink-0 font-bold",
              FOCUS_RING,
              "rounded-lg",
            )}
            style={{
              color: "var(--foreground)",
              fontSize: LOGO_FONT_SIZE,
              ...RING_STYLE,
            }}
          >
            {logo}
          </a>

          {/* Desktop Links */}
          <ul
            ref={desktopNavRef}
            className="hidden lg:flex items-center gap-1"
            role="menubar"
            aria-label="Main menu"
            onKeyDown={handleNavKeyDown}
          >
            {links.map((link, i) => (
              <li key={link.href} role="none">
                <a
                  href={link.href}
                  role="menuitem"
                  tabIndex={
                    i === focusedLinkIndex ||
                    (focusedLinkIndex === -1 && i === 0)
                      ? 0
                      : -1
                  }
                  onFocus={() => setFocusedLinkIndex(i)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium",
                    "transition-colors duration-200 motion-reduce:transition-none",
                    FOCUS_RING,
                  )}
                  style={{
                    color: "var(--muted-foreground)",
                    ...RING_STYLE,
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Search Bar - Desktop */}
          <div
            className="hidden md:flex flex-1 mx-auto"
            style={{ maxWidth: SEARCH_MAX_WIDTH }}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full"
              role="search"
              aria-label="Site search"
            >
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Search"
                className={cn(
                  "w-full rounded-lg border py-2 pl-10 pr-20 text-sm",
                  FOCUS_RING,
                )}
                style={{
                  backgroundColor: "var(--accent)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  ...RING_STYLE,
                }}
              />
              <kbd
                className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 rounded border px-1.5 py-0.5 text-xs font-mono"
                style={{
                  color: "var(--muted-foreground)",
                  borderColor: "var(--border)",
                }}
                aria-hidden="true"
              >
                <span className="text-xs">&#8984;</span>K
              </kbd>
            </form>
          </div>

          {/* Mobile Search Icon */}
          <button
            type="button"
            onClick={() => setSearchOpen(!searchOpen)}
            className={cn(
              "md:hidden ml-auto p-2 rounded-lg",
              FOCUS_RING,
            )}
            style={{
              color: "var(--muted-foreground)",
              ...RING_STYLE,
            }}
            aria-label={searchOpen ? "Close search" : "Open search"}
            aria-expanded={searchOpen}
          >
            <SearchIcon size={ICON_SIZE_MD} />
          </button>

          {/* CTA */}
          <a
            href={ctaHref}
            className={cn(
              "hidden md:inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium",
              "transition-colors duration-200 motion-reduce:transition-none",
              FOCUS_RING,
            )}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              ["--tw-ring-color" as string]: "var(--primary)",
              ["--tw-ring-offset-color" as string]: "var(--background)",
            }}
          >
            {ctaLabel}
          </a>

          {/* Mobile Toggle */}
          <button
            type="button"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={cn("lg:hidden p-2 rounded-lg", FOCUS_RING)}
            style={{
              color: "var(--foreground)",
              ...RING_STYLE,
            }}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav-menu"
          >
            <svg
              style={{ width: ICON_SIZE_MD, height: ICON_SIZE_MD }}
              fill="none"
              viewBox={`0 0 ${SVG_VIEWBOX} ${SVG_VIEWBOX}`}
              strokeWidth={SVG_STROKE_WIDTH}
              stroke="currentColor"
              aria-hidden="true"
            >
              {isMobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Mobile Search Dropdown */}
        {searchOpen && (
          <div
            className="md:hidden px-4 py-3"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <form
              onSubmit={handleSearchSubmit}
              className="relative"
              role="search"
              aria-label="Mobile site search"
            >
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label="Search"
                autoFocus
                className={cn(
                  "w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm",
                  FOCUS_RING,
                )}
                style={{
                  backgroundColor: "var(--accent)",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  ...RING_STYLE,
                }}
              />
            </form>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileOpen && (
          <nav
            id="mobile-nav-menu"
            aria-label="Mobile navigation"
            className="lg:hidden px-4 py-4"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <ul className="flex flex-col gap-1" role="menu">
              {links.map((link) => (
                <li key={link.href} role="none">
                  <a
                    href={link.href}
                    role="menuitem"
                    onClick={() => setIsMobileOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm font-medium",
                      "transition-colors duration-200 motion-reduce:transition-none",
                      FOCUS_RING,
                    )}
                    style={{
                      color: "var(--muted-foreground)",
                      ...RING_STYLE,
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={ctaHref}
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "mt-3 block rounded-lg px-4 py-2.5 text-center text-sm font-medium",
                "transition-colors duration-200 motion-reduce:transition-none",
                FOCUS_RING,
              )}
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                ["--tw-ring-color" as string]: "var(--primary)",
                ["--tw-ring-offset-color" as string]: "var(--background)",
              }}
            >
              {ctaLabel}
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
