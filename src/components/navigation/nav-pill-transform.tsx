// @version 1.0.0
// @category navigation
// @name Nav Pill Transform
// @source custom-implementation

"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

interface NavLink {
  label: string;
  href: string;
}

interface NavPillTransformProps {
  logo?: React.ReactNode;
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
  scrollThreshold?: number;
}

export default function NavPillTransform({
  logo = "Brand",
  links = [
    { label: "Features", href: "#features" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
  ],
  ctaLabel = "Get Started",
  ctaHref = "#cta",
  className,
  scrollThreshold = 50,
}: NavPillTransformProps) {
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        "motion-reduce:transition-none",
        isScrolled ? "top-3 px-4 sm:px-8 md:px-16 lg:px-32" : "px-0",
        className
      )}
    >
      <nav
        className={cn(
          "mx-auto flex items-center justify-between transition-all duration-500",
          "motion-reduce:transition-none",
          isScrolled
            ? "max-w-3xl rounded-full px-4 py-2 shadow-lg backdrop-blur-md bg-[var(--nav-pill-bg,hsl(0_0%_100%/0.85))] border border-[var(--nav-pill-border,hsl(0_0%_0%/0.08))]"
            : "max-w-7xl px-4 sm:px-6 lg:px-8 py-4 bg-[var(--nav-bg,hsl(0_0%_100%))]"
        )}
      >
        {/* Logo */}
        <a
          href="/"
          className={cn(
            "font-bold transition-all duration-500 motion-reduce:transition-none text-[var(--nav-logo-color,hsl(0_0%_9%))]",
            isScrolled ? "text-lg" : "text-xl"
          )}
        >
          {logo}
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={cn(
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
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

        {/* CTA Button */}
        <a
          href={ctaHref}
          className={cn(
            "hidden md:inline-flex items-center rounded-full font-medium transition-all duration-500 motion-reduce:transition-none",
            "bg-[var(--nav-cta-bg,hsl(0_0%_9%))] text-[var(--nav-cta-color,hsl(0_0%_100%))]",
            "hover:bg-[var(--nav-cta-hover-bg,hsl(0_0%_20%))]",
            isScrolled ? "px-4 py-1.5 text-sm" : "px-5 py-2 text-sm"
          )}
        >
          {ctaLabel}
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 text-[var(--nav-link-color,hsl(0_0%_40%))]"
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
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
            "md:hidden mt-2 mx-4 rounded-2xl p-4 shadow-lg backdrop-blur-md",
            "bg-[var(--nav-pill-bg,hsl(0_0%_100%/0.95))]",
            "border border-[var(--nav-pill-border,hsl(0_0%_0%/0.08))]"
          )}
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "block rounded-xl px-4 py-2.5 text-sm font-medium",
                    "text-[var(--nav-link-color,hsl(0_0%_40%))]",
                    "hover:bg-[var(--nav-link-hover-bg,hsl(0_0%_0%/0.05))]"
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={ctaHref}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "block rounded-xl px-4 py-2.5 text-sm font-medium text-center mt-2",
                  "bg-[var(--nav-cta-bg,hsl(0_0%_9%))] text-[var(--nav-cta-color,hsl(0_0%_100%))]"
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
