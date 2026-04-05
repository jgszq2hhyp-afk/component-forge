// @version 2.0.0
// @category navigation
// @name nav-minimal-logo
// @source custom

"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SVG_VIEWBOX = 24;
const SVG_STROKE_WIDTH = 2;
const ICON_SIZE = "h-5 w-5";
const PANEL_MAX_WIDTH = "max-w-sm";
const PANEL_Z_INDEX = 58;
const OVERLAY_Z_INDEX = 55;
const HEADER_Z_INDEX = 50;
const HAMBURGER_Z_INDEX = 60;
const LOGO_FONT_SIZE = "clamp(1.125rem, 1rem + 0.5vw, 1.25rem)";
const FOCUS_RING =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
const RING_STYLE = {
  ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
  ["--tw-ring-offset-color" as string]: "var(--background)",
} as React.CSSProperties;
const PRIMARY_RING_STYLE = {
  ["--tw-ring-color" as string]: "var(--primary)",
  ["--tw-ring-offset-color" as string]: "var(--background)",
} as React.CSSProperties;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface NavLink {
  label: string;
  href: string;
}

interface NavMinimalLogoProps {
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
  nav, div, a, button {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NavMinimalLogo({
  logo = "Brand",
  links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Work", href: "/work" },
    { label: "Contact", href: "/contact" },
  ],
  ctaLabel = "Get in Touch",
  ctaHref = "/contact",
  className,
}: NavMinimalLogoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelRef = useRef<HTMLElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);

  // Lock body scroll when panel is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        close();
        hamburgerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close]);

  // Trap focus inside panel when open
  useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const panel = panelRef.current;
    const focusableElements = panel.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, textarea, select, [tabindex]:not([tabindex="-1"])',
    );
    const firstEl = focusableElements[0];
    const lastEl = focusableElements[focusableElements.length - 1];

    const handleTrap = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl?.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl?.focus();
        }
      }
    };

    panel.addEventListener("keydown", handleTrap);
    firstEl?.focus();
    return () => panel.removeEventListener("keydown", handleTrap);
  }, [isOpen]);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: reducedMotionStyles }} />

      <header
        className={cn(
          "fixed inset-x-0 top-0 flex items-center justify-between px-6 py-4 md:px-10",
          className,
        )}
        style={{
          zIndex: HEADER_Z_INDEX,
          backgroundColor: "var(--background)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Logo */}
        <a
          href="/"
          aria-label="Home"
          className={cn("font-bold tracking-tight rounded-sm", FOCUS_RING)}
          style={{
            color: "var(--foreground)",
            fontSize: LOGO_FONT_SIZE,
            ...RING_STYLE,
          }}
        >
          {logo}
        </a>

        {/* Hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          onClick={toggle}
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="nav-minimal-panel"
          className={cn(
            "relative flex h-10 w-10 items-center justify-center rounded-lg",
            "transition-colors duration-200 motion-reduce:transition-none",
            FOCUS_RING,
          )}
          style={{
            zIndex: HAMBURGER_Z_INDEX,
            color: "var(--foreground)",
            ...RING_STYLE,
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
            {isOpen ? (
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
      </header>

      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 transition-opacity duration-300 motion-reduce:transition-none",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        style={{
          zIndex: OVERLAY_Z_INDEX,
          backgroundColor: "color-mix(in oklch, var(--foreground) 40%, transparent)",
        }}
        onClick={close}
        aria-hidden="true"
      />

      {/* Panel */}
      <nav
        ref={panelRef}
        id="nav-minimal-panel"
        aria-label="Main navigation"
        className={cn(
          "fixed right-0 top-0 flex h-full w-full flex-col",
          PANEL_MAX_WIDTH,
          "px-8 pb-10 pt-24",
          "transition-transform duration-300 ease-out motion-reduce:transition-none",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
        style={{
          zIndex: PANEL_Z_INDEX,
          backgroundColor: "var(--background)",
          borderLeft: "1px solid var(--border)",
        }}
      >
        <ul className="flex flex-col gap-1" role="menu">
          {links.map((link) => (
            <li key={link.href} role="none">
              <a
                href={link.href}
                role="menuitem"
                onClick={close}
                className={cn(
                  "block rounded-lg px-4 py-3 text-lg font-medium",
                  "transition-colors duration-200 motion-reduce:transition-none",
                  FOCUS_RING,
                )}
                style={{
                  color: "var(--foreground)",
                  ...RING_STYLE,
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
          onClick={close}
          className={cn(
            "mt-8 inline-flex items-center justify-center",
            "rounded-lg px-6 py-3 text-base font-semibold",
            "transition-all duration-200 motion-reduce:transition-none",
            "hover:brightness-110",
            "active:scale-[0.98] motion-reduce:active:scale-100",
            FOCUS_RING,
          )}
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            ...PRIMARY_RING_STYLE,
          }}
        >
          {ctaLabel}
        </a>
      </nav>
    </>
  );
}
