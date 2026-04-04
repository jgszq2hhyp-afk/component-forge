// @version 1.1.0
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

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring,var(--primary))] focus-visible:ring-offset-2";

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
        aria-label="Main navigation"
        className={cn(
          "mx-auto flex items-center justify-between transition-all duration-500",
          "motion-reduce:transition-none",
          isScrolled
            ? "max-w-3xl rounded-full px-4 py-2 shadow-lg backdrop-blur-md bg-[var(--background)]/85 border border-[var(--border)]"
            : "max-w-7xl px-4 sm:px-6 lg:px-8 py-4 bg-[var(--background)]"
        )}
      >
        {/* Logo */}
        <a
          href="/"
          className={cn(
            focusRing,
            "rounded-lg font-bold transition-all duration-500 motion-reduce:transition-none text-[var(--foreground)]",
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
                  focusRing,
                  "rounded-full px-3 py-1.5 text-sm font-medium transition-colors motion-reduce:transition-none",
                  "text-[var(--muted-foreground)]",
                  "hover:text-[var(--foreground)]",
                  "hover:bg-[var(--muted)]"
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
            focusRing,
            "hidden md:inline-flex items-center rounded-full font-medium transition-all duration-500 motion-reduce:transition-none",
            "bg-[var(--primary)] text-[var(--primary-foreground)]",
            "hover:bg-[var(--primary)]/90",
            isScrolled ? "px-4 py-1.5 text-sm" : "px-5 py-2 text-sm"
          )}
        >
          {ctaLabel}
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            focusRing,
            "md:hidden rounded-lg p-2 text-[var(--muted-foreground)] transition-colors motion-reduce:transition-none"
          )}
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
            "bg-[var(--background)]/95",
            "border border-[var(--border)]"
          )}
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    focusRing,
                    "block rounded-xl px-4 py-2.5 text-sm font-medium transition-colors motion-reduce:transition-none",
                    "text-[var(--muted-foreground)]",
                    "hover:bg-[var(--muted)]"
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
                  focusRing,
                  "block rounded-xl px-4 py-2.5 text-sm font-medium text-center mt-2 transition-colors motion-reduce:transition-none",
                  "bg-[var(--primary)] text-[var(--primary-foreground)]"
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
