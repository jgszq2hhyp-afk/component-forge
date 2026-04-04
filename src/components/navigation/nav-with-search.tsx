// @version 1.0.0
// @category navigation
// @name Nav With Search
// @source custom-implementation

"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

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
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchQuery);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        "bg-[var(--nav-bg,hsl(0_0%_100%/0.95))] backdrop-blur-sm",
        "border-[var(--nav-border,hsl(0_0%_0%/0.08))]",
        className
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <a
          href="/"
          className="flex-shrink-0 text-xl font-bold text-[var(--nav-logo-color,hsl(0_0%_9%))]"
        >
          {logo}
        </a>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-1">
          {links.map((link) => (
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

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--nav-search-icon,hsl(0_0%_50%))]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className={cn(
                "w-full rounded-lg border py-2 pl-10 pr-20 text-sm transition-colors",
                "bg-[var(--nav-search-bg,hsl(0_0%_96%))]",
                "border-[var(--nav-search-border,hsl(0_0%_0%/0.08))]",
                "text-[var(--nav-search-text,hsl(0_0%_9%))]",
                "placeholder:text-[var(--nav-search-placeholder,hsl(0_0%_50%))]",
                "focus:outline-none focus:ring-2 focus:ring-[var(--nav-search-ring,hsl(220_90%_56%/0.3))]",
                "focus:border-[var(--nav-search-focus-border,hsl(220_90%_56%))]"
              )}
            />
            <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-0.5 rounded border px-1.5 py-0.5 text-xs font-mono text-[var(--nav-search-kbd,hsl(0_0%_50%))] border-[var(--nav-search-border,hsl(0_0%_0%/0.12))]">
              <span className="text-xs">&#8984;</span>K
            </kbd>
          </form>
        </div>

        {/* Mobile Search Icon */}
        <button
          onClick={() => setSearchOpen(!searchOpen)}
          className="md:hidden ml-auto p-2 text-[var(--nav-link-color,hsl(0_0%_40%))]"
          aria-label="Toggle search"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>

        {/* CTA */}
        <a
          href={ctaHref}
          className={cn(
            "hidden md:inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            "bg-[var(--nav-cta-bg,hsl(0_0%_9%))] text-[var(--nav-cta-color,hsl(0_0%_100%))]",
            "hover:bg-[var(--nav-cta-hover-bg,hsl(0_0%_20%))]"
          )}
        >
          {ctaLabel}
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="lg:hidden p-2 text-[var(--nav-link-color,hsl(0_0%_40%))]"
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

      {/* Mobile Search Dropdown */}
      {searchOpen && (
        <div className="md:hidden border-t border-[var(--nav-border,hsl(0_0%_0%/0.08))] px-4 py-3">
          <form onSubmit={handleSearchSubmit} className="relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--nav-search-icon,hsl(0_0%_50%))]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={searchPlaceholder}
              autoFocus
              className={cn(
                "w-full rounded-lg border py-2.5 pl-10 pr-4 text-sm",
                "bg-[var(--nav-search-bg,hsl(0_0%_96%))]",
                "border-[var(--nav-search-border,hsl(0_0%_0%/0.08))]",
                "text-[var(--nav-search-text,hsl(0_0%_9%))]",
                "placeholder:text-[var(--nav-search-placeholder,hsl(0_0%_50%))]",
                "focus:outline-none focus:ring-2 focus:ring-[var(--nav-search-ring,hsl(220_90%_56%/0.3))]"
              )}
            />
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden border-t border-[var(--nav-border,hsl(0_0%_0%/0.08))] px-4 py-4">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
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
