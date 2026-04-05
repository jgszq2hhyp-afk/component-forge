// @version 1.0.0
// @category mobile-menu
// @name Mobile Menu Fullscreen
// @source custom

"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TRANSITION_DURATION_MS = 300;
const STAGGER_DELAY_MS = 60;
const ANIMATION_NAME_PREFIX = "mobileMenuFullscreen";
const CLOSE_BUTTON_SIZE = "h-12 w-12";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MenuLink {
  label: string;
  href: string;
}

interface SocialLink {
  label: string;
  href: string;
  icon?: ReactNode;
}

interface MobileMenuFullscreenProps {
  /** Whether the menu is open */
  open: boolean;
  /** Callback to close the menu */
  onClose: () => void;
  /** Navigation links */
  links: MenuLink[];
  /** Optional social media links shown at bottom */
  socialLinks?: SocialLink[];
  /** Optional logo element */
  logo?: ReactNode;
  /** Additional class names */
  className?: string;
}

// ---------------------------------------------------------------------------
// Focus styles
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const ringStyle = {
  ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
} as React.CSSProperties;

// ---------------------------------------------------------------------------
// Close icon
// ---------------------------------------------------------------------------

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Generate staggered keyframes CSS
// ---------------------------------------------------------------------------

function generateStaggerKeyframes(count: number): string {
  let css = `
    @keyframes ${ANIMATION_NAME_PREFIX}FadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes ${ANIMATION_NAME_PREFIX}SlideUp {
      from { opacity: 0; transform: translateY(1.5rem); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes ${ANIMATION_NAME_PREFIX}SocialFadeIn {
      from { opacity: 0; transform: translateY(0.75rem); }
      to { opacity: 1; transform: translateY(0); }
    }
  `;

  for (let i = 0; i < count; i++) {
    const delay = i * STAGGER_DELAY_MS;
    css += `
      .${ANIMATION_NAME_PREFIX}-link-${i} {
        opacity: 0;
        animation: ${ANIMATION_NAME_PREFIX}SlideUp ${TRANSITION_DURATION_MS}ms ease-out ${delay}ms forwards;
      }
      @media (prefers-reduced-motion: reduce) {
        .${ANIMATION_NAME_PREFIX}-link-${i} {
          opacity: 1;
          animation: none;
        }
      }
    `;
  }

  return css;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MobileMenuFullscreen({
  open,
  onClose,
  links,
  socialLinks,
  logo,
  className,
}: MobileMenuFullscreenProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const totalLinks = links.length;
  const staggerCSS = generateStaggerKeyframes(totalLinks);

  // -----------------------------------------------------------------------
  // Focus management
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      requestAnimationFrame(() => {
        closeButtonRef.current?.focus();
      });
    } else {
      previousActiveElement.current?.focus();
    }
  }, [open]);

  // -----------------------------------------------------------------------
  // Body scroll lock
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!open) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  // -----------------------------------------------------------------------
  // Focus trap + Keyboard
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!open) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "Tab") {
        const menu = menuRef.current;
        if (!menu) return;

        const focusable = menu.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // -----------------------------------------------------------------------
  // Link click handler
  // -----------------------------------------------------------------------

  const handleLinkClick = useCallback(() => {
    onClose();
  }, [onClose]);

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  if (!open) return null;

  return (
    <>
      {/* Inject stagger animation CSS */}
      <style>{staggerCSS}</style>

      <div
        ref={menuRef}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
        className={cn(
          "fixed inset-0 z-50 flex flex-col",
          "py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]",
          "motion-safe:animate-[mobileMenuFullscreenFadeIn_300ms_ease-out_forwards]",
          "motion-reduce:opacity-100",
          className
        )}
        style={{
          backgroundColor: "var(--background)",
        }}
      >
        {/* Header: Logo + Close */}
        <header className="flex items-center justify-between w-full shrink-0">
          {/* Logo */}
          {logo ? (
            <div className="flex items-center" aria-hidden="true">
              {logo}
            </div>
          ) : (
            <span />
          )}

          {/* Close button */}
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className={cn(
              "inline-flex items-center justify-center rounded-full",
              CLOSE_BUTTON_SIZE,
              "motion-safe:transition-colors motion-safe:duration-150",
              "motion-reduce:transition-none",
              focusRing,
              "cursor-pointer"
            )}
            style={{
              ...ringStyle,
              color: "var(--foreground)",
              backgroundColor: "color-mix(in oklch, var(--muted-foreground) 10%, transparent)",
            }}
            aria-label="Close menu"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </header>

        {/* Main navigation links */}
        <nav
          className="flex flex-col items-center justify-center flex-1 gap-2"
          aria-label="Main navigation"
        >
          <ul className="flex flex-col items-center gap-1 list-none p-0 m-0">
            {links.map((link, idx) => (
              <li
                key={`menu-link-${idx}-${link.href}`}
                className={`${ANIMATION_NAME_PREFIX}-link-${idx}`}
              >
                <a
                  href={link.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "inline-flex items-center justify-center",
                    "text-[clamp(1.5rem,5vw,3rem)] font-semibold leading-tight",
                    "py-3 px-4 rounded-lg",
                    "motion-safe:transition-[color,background-color] motion-safe:duration-200",
                    "motion-reduce:transition-none",
                    "hover:opacity-80",
                    focusRing
                  )}
                  style={{
                    ...ringStyle,
                    color: "var(--foreground)",
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social links footer */}
        {socialLinks && socialLinks.length > 0 && (
          <footer className="shrink-0 w-full">
            {/* Divider */}
            <div
              className="w-16 h-px mx-auto mb-6"
              style={{ backgroundColor: "var(--border)" }}
              aria-hidden="true"
            />

            <nav aria-label="Social media links">
              <ul className="flex items-center justify-center gap-4 list-none p-0 m-0">
                {socialLinks.map((social, idx) => {
                  const socialDelay =
                    totalLinks * STAGGER_DELAY_MS + idx * STAGGER_DELAY_MS;

                  return (
                    <li key={`social-${idx}-${social.href}`}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className={cn(
                          "inline-flex items-center justify-center",
                          "h-11 w-11 rounded-full",
                          "motion-safe:transition-[color,background-color,transform] motion-safe:duration-200",
                          "motion-reduce:transition-none",
                          "hover:scale-110",
                          focusRing,
                          // Stagger animation via inline style
                          "motion-reduce:opacity-100"
                        )}
                        style={{
                          ...ringStyle,
                          color: "var(--muted-foreground)",
                          backgroundColor: "color-mix(in oklch, var(--muted-foreground) 10%, transparent)",
                          // Stagger animation
                          opacity: 0,
                          animation: `${ANIMATION_NAME_PREFIX}SocialFadeIn ${TRANSITION_DURATION_MS}ms ease-out ${socialDelay}ms forwards`,
                        }}
                      >
                        {social.icon ? (
                          social.icon
                        ) : (
                          <span className="text-sm font-medium">
                            {social.label.charAt(0).toUpperCase()}
                          </span>
                        )}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Optional small label below */}
            <p
              className="text-center text-xs mt-4"
              style={{ color: "var(--muted-foreground)" }}
            >
              {socialLinks.map((s) => s.label).join(" · ")}
            </p>
          </footer>
        )}
      </div>
    </>
  );
}
