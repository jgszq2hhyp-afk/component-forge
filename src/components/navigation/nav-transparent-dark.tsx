// @version 1.0.0
// @category navigation
// @name Nav Transparent Dark
// @source custom-implementation

"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

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
  scrollThreshold = 100,
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
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 motion-reduce:transition-none",
        isScrolled
          ? "bg-[var(--nav-scrolled-bg,hsl(0_0%_100%))] shadow-sm border-b border-[var(--nav-scrolled-border,hsl(0_0%_0%/0.08))]"
          : "bg-transparent",
        className
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-4">
        {/* Logo */}
        <a
          href="/"
          className={cn(
            "text-xl font-bold transition-colors duration-500 motion-reduce:transition-none",
            isScrolled
              ? "text-[var(--nav-scrolled-logo,hsl(0_0%_9%))]"
              : "text-[var(--nav-dark-logo,hsl(0_0%_100%))]"
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
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-500 motion-reduce:transition-none",
                  isScrolled
                    ? "text-[var(--nav-scrolled-link,hsl(0_0%_40%))] hover:text-[var(--nav-scrolled-link-hover,hsl(0_0%_9%))]"
                    : "text-[var(--nav-dark-link,hsl(0_0%_100%/0.8))] hover:text-[var(--nav-dark-link-hover,hsl(0_0%_100%))]"
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
            "hidden md:inline-flex items-center rounded-lg px-5 py-2 text-sm font-medium transition-all duration-500 motion-reduce:transition-none",
            isScrolled
              ? "bg-[var(--nav-cta-bg,hsl(0_0%_9%))] text-[var(--nav-cta-color,hsl(0_0%_100%))] hover:bg-[var(--nav-cta-hover-bg,hsl(0_0%_20%))]"
              : "bg-[var(--nav-dark-cta-bg,hsl(0_0%_100%))] text-[var(--nav-dark-cta-color,hsl(0_0%_9%))] hover:bg-[var(--nav-dark-cta-hover,hsl(0_0%_100%/0.9))]"
          )}
        >
          {ctaLabel}
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            "md:hidden p-2 transition-colors motion-reduce:transition-none",
            isScrolled
              ? "text-[var(--nav-scrolled-link,hsl(0_0%_40%))]"
              : "text-[var(--nav-dark-link,hsl(0_0%_100%/0.8))]"
          )}
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
      </nav>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div
          className={cn(
            "md:hidden px-4 pb-4",
            isScrolled
              ? "bg-[var(--nav-scrolled-bg,hsl(0_0%_100%))]"
              : "bg-[var(--nav-dark-mobile-bg,hsl(0_0%_0%/0.9))] backdrop-blur-md"
          )}
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-4 py-2.5 text-sm font-medium",
                    isScrolled
                      ? "text-[var(--nav-scrolled-link,hsl(0_0%_40%))] hover:bg-[var(--nav-link-hover-bg,hsl(0_0%_0%/0.05))]"
                      : "text-[var(--nav-dark-link,hsl(0_0%_100%/0.8))] hover:bg-[var(--nav-dark-link-hover-bg,hsl(0_0%_100%/0.1))]"
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
                  "block rounded-lg px-4 py-2.5 text-sm font-medium text-center mt-2",
                  isScrolled
                    ? "bg-[var(--nav-cta-bg,hsl(0_0%_9%))] text-[var(--nav-cta-color,hsl(0_0%_100%))]"
                    : "bg-[var(--nav-dark-cta-bg,hsl(0_0%_100%))] text-[var(--nav-dark-cta-color,hsl(0_0%_9%))]"
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
