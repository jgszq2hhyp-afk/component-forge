// @version 2.0.0
// @category navigation
// @name Nav Centered Logo
// @source custom-implementation

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_WIDTH = "80rem"; // max-w-7xl equivalent
const BREAKPOINT_MD = 768;
const MOBILE_MENU_TRANSITION_MS = 200;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface NavCenteredLogoProps {
  logo?: React.ReactNode;
  leftLinks?: NavLink[];
  rightLinks?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Focus styles (shared)
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--nav-ring,hsl(220_90%_56%))] focus-visible:ring-offset-2";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NavCenteredLogo({
  logo = "Brand",
  leftLinks = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
  ],
  rightLinks = [
    { label: "Blog", href: "#blog" },
    { label: "Docs", href: "#docs" },
    { label: "Support", href: "#support" },
  ],
  ctaLabel = "Get Started",
  ctaHref = "#cta",
  className,
}: NavCenteredLogoProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const allLinks = [...leftLinks, ...rightLinks];

  // Close mobile menu on Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMobileOpen) {
        setIsMobileOpen(false);
      }
    },
    [isMobileOpen],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Close mobile menu when resizing past breakpoint
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${BREAKPOINT_MD}px)`);
    const handler = () => {
      if (mq.matches) setIsMobileOpen(false);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const linkClasses = cn(
    "rounded-lg px-3 py-2 text-sm font-medium",
    "transition-colors motion-reduce:transition-none",
    "text-[var(--nav-link-color,hsl(0_0%_40%))]",
    "hover:text-[var(--nav-link-hover,hsl(0_0%_9%))]",
    "hover:bg-[var(--nav-link-hover-bg,hsl(0_0%_0%/0.05))]",
    focusRing,
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        "bg-[var(--nav-bg,hsl(0_0%_100%))]",
        "border-[var(--nav-border,hsl(0_0%_0%/0.08))]",
        className,
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: MAX_WIDTH }}
      >
        {/* Desktop: three-column grid layout */}
        <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] md:items-center md:py-3">
          {/* Left Links */}
          <ul className="flex items-center gap-1" role="list">
            {leftLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClasses}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Center Logo */}
          <div className="flex justify-center px-6">
            <a
              href="/"
              className={cn(
                "font-bold text-[var(--nav-logo-color,hsl(0_0%_9%))]",
                "text-xl whitespace-nowrap",
                focusRing,
                "rounded-lg px-2 py-1",
              )}
              aria-label="Home"
            >
              {logo}
            </a>
          </div>

          {/* Right Links + CTA */}
          <div className="flex items-center justify-end gap-1">
            {rightLinks.map((link) => (
              <a key={link.href} href={link.href} className={linkClasses}>
                {link.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className={cn(
                "ml-2 inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium",
                "transition-colors motion-reduce:transition-none",
                "bg-[var(--nav-cta-bg,hsl(0_0%_9%))] text-[var(--nav-cta-color,hsl(0_0%_100%))]",
                "hover:bg-[var(--nav-cta-hover-bg,hsl(0_0%_20%))]",
                focusRing,
              )}
            >
              {ctaLabel}
            </a>
          </div>
        </div>

        {/* Mobile: standard layout */}
        <div className="flex md:hidden items-center justify-between py-3">
          <a
            href="/"
            className={cn(
              "text-xl font-bold text-[var(--nav-logo-color,hsl(0_0%_9%))]",
              focusRing,
              "rounded-lg px-1 py-0.5",
            )}
            aria-label="Home"
          >
            {logo}
          </a>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className={cn(
              "p-2 rounded-lg text-[var(--nav-link-color,hsl(0_0%_40%))]",
              focusRing,
            )}
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
            aria-controls="mobile-nav-menu"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
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
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        id="mobile-nav-menu"
        ref={mobileMenuRef}
        role="region"
        aria-label="Mobile navigation"
        className={cn(
          "md:hidden border-t border-[var(--nav-border,hsl(0_0%_0%/0.08))]",
          "overflow-hidden transition-[max-height,opacity] motion-reduce:transition-none",
          isMobileOpen
            ? "max-h-[32rem] opacity-100"
            : "max-h-0 opacity-0 pointer-events-none",
        )}
        style={{
          transitionDuration: `${MOBILE_MENU_TRANSITION_MS}ms`,
        }}
      >
        <div className="px-4 py-4">
          <ul className="flex flex-col gap-1" role="list">
            {allLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2.5 text-sm font-medium",
                    "transition-colors motion-reduce:transition-none",
                    "text-[var(--nav-link-color,hsl(0_0%_40%))]",
                    "hover:bg-[var(--nav-link-hover-bg,hsl(0_0%_0%/0.05))]",
                    focusRing,
                  )}
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
              "transition-colors motion-reduce:transition-none",
              "bg-[var(--nav-cta-bg,hsl(0_0%_9%))] text-[var(--nav-cta-color,hsl(0_0%_100%))]",
              "hover:bg-[var(--nav-cta-hover-bg,hsl(0_0%_20%))]",
              focusRing,
            )}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
