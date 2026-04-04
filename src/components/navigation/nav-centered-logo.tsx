// @version 1.0.0
// @category navigation
// @name Nav Centered Logo
// @source custom-implementation

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const allLinks = [...leftLinks, ...rightLinks];

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        "bg-[var(--nav-bg,hsl(0_0%_100%))]",
        "border-[var(--nav-border,hsl(0_0%_0%/0.08))]",
        className
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop: three-column layout */}
        <div className="hidden md:grid md:grid-cols-3 md:items-center md:py-3">
          {/* Left Links */}
          <ul className="flex items-center gap-1">
            {leftLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    "text-[var(--nav-link-color,hsl(0_0%_40%))]",
                    "hover:text-[var(--nav-link-hover,hsl(0_0%_9%))]",
                    "hover:bg-[var(--nav-link-hover-bg,hsl(0_0%_0%/0.05))]"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Center Logo */}
          <div className="flex justify-center">
            <a
              href="/"
              className="text-xl font-bold text-[var(--nav-logo-color,hsl(0_0%_9%))]"
            >
              {logo}
            </a>
          </div>

          {/* Right Links + CTA */}
          <div className="flex items-center justify-end gap-1">
            {rightLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "text-[var(--nav-link-color,hsl(0_0%_40%))]",
                  "hover:text-[var(--nav-link-hover,hsl(0_0%_9%))]",
                  "hover:bg-[var(--nav-link-hover-bg,hsl(0_0%_0%/0.05))]"
                )}
              >
                {link.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className={cn(
                "ml-2 inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                "bg-[var(--nav-cta-bg,hsl(0_0%_9%))] text-[var(--nav-cta-color,hsl(0_0%_100%))]",
                "hover:bg-[var(--nav-cta-hover-bg,hsl(0_0%_20%))]"
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
            className="text-xl font-bold text-[var(--nav-logo-color,hsl(0_0%_9%))]"
          >
            {logo}
          </a>
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="p-2 text-[var(--nav-link-color,hsl(0_0%_40%))]"
            aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileOpen}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              {isMobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden border-t border-[var(--nav-border,hsl(0_0%_0%/0.08))] px-4 py-4">
          <ul className="flex flex-col gap-1">
            {allLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[var(--nav-link-color,hsl(0_0%_40%))] hover:bg-[var(--nav-link-hover-bg,hsl(0_0%_0%/0.05))]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={ctaHref}
            onClick={() => setIsMobileOpen(false)}
            className="mt-3 block rounded-lg px-4 py-2.5 text-center text-sm font-medium bg-[var(--nav-cta-bg,hsl(0_0%_9%))] text-[var(--nav-cta-color,hsl(0_0%_100%))]"
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </header>
  );
}
