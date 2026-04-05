// @version 2.0.0
// @category navigation
// @name nav-with-cta-bar
// @source custom

"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const CONTENT_MAX_WIDTH = "max-w-7xl";
const SVG_VIEWBOX = 24;
const SVG_STROKE_WIDTH = 2;
const ICON_SIZE = "h-5 w-5";
const DISMISS_BUTTON_SIZE = "h-6 w-6";
const DISMISS_ICON_SIZE = "h-4 w-4";
const LOGO_FONT_SIZE = "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)";
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
const RING_STYLE = {
  ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
  ["--tw-ring-offset-color" as string]: "var(--background)",
} as React.CSSProperties;
const PRIMARY_RING_ON_BG = {
  ["--tw-ring-color" as string]: "var(--primary)",
  ["--tw-ring-offset-color" as string]: "var(--background)",
} as React.CSSProperties;
const CONTRAST_RING_STYLE = {
  ["--tw-ring-color" as string]: "var(--primary-foreground)",
  ["--tw-ring-offset-color" as string]: "var(--primary)",
} as React.CSSProperties;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface NavWithCtaBarProps {
  barText?: string;
  barCtaLabel?: string;
  barCtaHref?: string;
  logo?: React.ReactNode;
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Reduced-motion styles
// ---------------------------------------------------------------------------

const reducedMotionStyles = `
@media (prefers-reduced-motion: reduce) {
  header, header * {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NavWithCtaBar({
  barText = "New: Our latest feature is now live.",
  barCtaLabel = "Learn more",
  barCtaHref = "/blog/new-feature",
  logo = "Brand",
  links = [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  ctaLabel = "Get Started",
  ctaHref = "/signup",
  className,
}: NavWithCtaBarProps) {
  const [barVisible, setBarVisible] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [focusedLinkIndex, setFocusedLinkIndex] = useState(-1);
  const desktopNavRef = useRef<HTMLUListElement>(null);

  // Close mobile menu on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
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

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: reducedMotionStyles }} />

      <header
        className={cn("sticky top-0 z-50 w-full", className)}
        style={{ backgroundColor: "var(--background)" }}
      >
        {/* Announcement / CTA Bar */}
        {barVisible && (
          <div
            role="banner"
            className="relative flex items-center justify-center gap-2 px-10 py-2.5 text-center text-sm"
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
            }}
          >
            <span>{barText}</span>
            <a
              href={barCtaHref}
              className={cn(
                "font-semibold underline underline-offset-4",
                "transition-opacity duration-200 hover:opacity-80 motion-reduce:transition-none",
                FOCUS_RING,
                "rounded-sm",
              )}
              style={{
                color: "var(--primary-foreground)",
                ...CONTRAST_RING_STYLE,
              }}
            >
              {barCtaLabel}
            </a>

            {/* Dismiss button */}
            <button
              type="button"
              onClick={() => setBarVisible(false)}
              aria-label="Dismiss announcement"
              className={cn(
                "absolute right-3 top-1/2 -translate-y-1/2",
                "flex items-center justify-center rounded-full",
                DISMISS_BUTTON_SIZE,
                "transition-opacity duration-200 hover:opacity-70 motion-reduce:transition-none",
                FOCUS_RING,
              )}
              style={{
                color: "var(--primary-foreground)",
                ...CONTRAST_RING_STYLE,
              }}
            >
              <svg
                className={DISMISS_ICON_SIZE}
                fill="none"
                viewBox={`0 0 ${SVG_VIEWBOX} ${SVG_VIEWBOX}`}
                strokeWidth={SVG_STROKE_WIDTH}
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Main navigation */}
        <nav
          aria-label="Main navigation"
          className={cn(CONTENT_MAX_WIDTH, "mx-auto px-4 sm:px-6 lg:px-8")}
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          {/* Desktop */}
          <div className="hidden md:flex md:items-center md:justify-between md:py-3">
            {/* Logo */}
            <a
              href="/"
              aria-label="Home"
              className={cn(
                "font-bold tracking-tight rounded-sm",
                FOCUS_RING,
              )}
              style={{
                color: "var(--foreground)",
                fontSize: LOGO_FONT_SIZE,
                ...PRIMARY_RING_ON_BG,
              }}
            >
              {logo}
            </a>

            {/* Links */}
            <ul
              ref={desktopNavRef}
              className="flex items-center gap-1"
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
                      ...PRIMARY_RING_ON_BG,
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href={ctaHref}
              className={cn(
                "inline-flex items-center rounded-lg px-5 py-2.5 text-sm font-semibold",
                "transition-all duration-200 motion-reduce:transition-none",
                "hover:brightness-110 hover:shadow-md",
                "active:scale-[0.98] motion-reduce:active:scale-100",
                FOCUS_RING,
              )}
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                ...PRIMARY_RING_ON_BG,
              }}
            >
              {ctaLabel}
            </a>
          </div>

          {/* Mobile */}
          <div className="flex items-center justify-between py-3 md:hidden">
            <a
              href="/"
              aria-label="Home"
              className={cn(
                "font-bold tracking-tight rounded-sm",
                FOCUS_RING,
              )}
              style={{
                color: "var(--foreground)",
                fontSize: LOGO_FONT_SIZE,
                ...PRIMARY_RING_ON_BG,
              }}
            >
              {logo}
            </a>

            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="cta-bar-mobile-menu"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                FOCUS_RING,
              )}
              style={{
                color: "var(--foreground)",
                ...PRIMARY_RING_ON_BG,
              }}
            >
              <svg
                className={ICON_SIZE}
                fill="none"
                viewBox={`0 0 ${SVG_VIEWBOX} ${SVG_VIEWBOX}`}
                strokeWidth={SVG_STROKE_WIDTH}
                stroke="currentColor"
                aria-hidden="true"
              >
                {mobileOpen ? (
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
          </div>
        </nav>

        {/* Mobile dropdown */}
        {mobileOpen && (
          <div
            id="cta-bar-mobile-menu"
            className="px-4 py-4 md:hidden"
            style={{
              backgroundColor: "var(--background)",
              borderBottom: "1px solid var(--border)",
            }}
          >
            <ul className="flex flex-col gap-1" role="menu">
              {links.map((link) => (
                <li key={link.href} role="none">
                  <a
                    href={link.href}
                    role="menuitem"
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-sm font-medium",
                      "transition-colors duration-200 motion-reduce:transition-none",
                      FOCUS_RING,
                    )}
                    style={{
                      color: "var(--muted-foreground)",
                      ...PRIMARY_RING_ON_BG,
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={ctaHref}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "mt-3 block rounded-lg px-4 py-2.5 text-center text-sm font-semibold",
                "transition-all duration-200 motion-reduce:transition-none",
                FOCUS_RING,
              )}
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                ...PRIMARY_RING_ON_BG,
              }}
            >
              {ctaLabel}
            </a>
          </div>
        )}
      </header>
    </>
  );
}
