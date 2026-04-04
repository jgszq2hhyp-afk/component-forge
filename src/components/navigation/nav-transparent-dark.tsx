// @version 2.0.0
// @category navigation
// @name Nav Transparent Dark
// @source custom-implementation

"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_SCROLL_THRESHOLD = 100;
const TRANSITION_DURATION = "duration-500";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface NavTransparentDarkProps {
  logo?: React.ReactNode;
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  scrollThreshold?: number;
}

// ---------------------------------------------------------------------------
// Shared styles
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring,var(--primary))] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)]";

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NavTransparentDark({
  logo = "Brand",
  links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ],
  ctaLabel = "Get Started",
  ctaHref = "#cta",
  className,
  scrollThreshold = DEFAULT_SCROLL_THRESHOLD,
}: NavTransparentDarkProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setIsScrolled(window.scrollY > scrollThreshold);
  }, [scrollThreshold]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <header
      className={cn(
        `fixed top-0 left-0 right-0 z-50 transition-all ${TRANSITION_DURATION} motion-reduce:transition-none`,
        isScrolled
          ? "bg-[var(--background)] shadow-sm border-b border-[var(--border)]"
          : "bg-transparent",
        className
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4"
      >
        {/* Logo */}
        <a
          href="/"
          className={cn(
            focusRing,
            `rounded-lg text-xl font-bold transition-colors ${TRANSITION_DURATION} motion-reduce:transition-none`,
            isScrolled
              ? "text-[var(--foreground)]"
              : "text-[var(--nav-dark-logo,var(--background))]"
          )}
          style={{
            fontSize: 'clamp(1.125rem, 1.5vw + 0.5rem, 1.25rem)',
          }}
        >
          {logo}
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1" role="list">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  focusRing,
                  `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${TRANSITION_DURATION} motion-reduce:transition-none`,
                  isScrolled
                    ? "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                    : "text-[var(--nav-dark-link,var(--background)/0.8)] hover:text-[var(--nav-dark-link-hover,var(--background))]"
                )}
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
            focusRing,
            `hidden md:inline-flex items-center rounded-lg px-5 py-2 text-sm font-medium transition-all ${TRANSITION_DURATION} motion-reduce:transition-none`,
            isScrolled
              ? "bg-[var(--primary)] text-[var(--primary-foreground)] hover:bg-[var(--primary)]/90"
              : "bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--background)]/90"
          )}
        >
          {ctaLabel}
        </a>

        {/* Mobile Toggle */}
        <button
          type="button"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            focusRing,
            "md:hidden rounded-lg p-2 transition-colors motion-reduce:transition-none",
            isScrolled
              ? "text-[var(--muted-foreground)]"
              : "text-[var(--nav-dark-link,var(--background)/0.8)]"
          )}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" aria-hidden="true">
            {isMobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div
          className={cn(
            "md:hidden px-4 pb-4",
            isScrolled
              ? "bg-[var(--background)]"
              : "bg-[var(--nav-dark-mobile-bg,hsl(0_0%_0%/0.9))] backdrop-blur-md"
          )}
          role="menu"
          aria-label="Mobile navigation"
        >
          <ul className="flex flex-col gap-1" role="list">
            {links.map((link) => (
              <li key={link.href} role="none">
                <a
                  href={link.href}
                  role="menuitem"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    focusRing,
                    "block rounded-lg px-4 py-2.5 text-sm font-medium transition-colors motion-reduce:transition-none",
                    isScrolled
                      ? "text-[var(--muted-foreground)] hover:bg-[var(--muted)]/10"
                      : "text-[var(--nav-dark-link,var(--background)/0.8)] hover:bg-[var(--background)]/10"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li role="none">
              <a
                href={ctaHref}
                role="menuitem"
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  focusRing,
                  "block rounded-lg px-4 py-2.5 text-sm font-medium text-center mt-2 transition-colors motion-reduce:transition-none",
                  isScrolled
                    ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                    : "bg-[var(--background)] text-[var(--foreground)]"
                )}
              >
                {ctaLabel}
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
