// @version 2.0.0
// @category navigation
// @name Nav Sidebar
// @score 92
// @source custom-implementation

"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SIDEBAR_WIDTH_EXPANDED = "16rem"; // 256px / w-64
const SIDEBAR_WIDTH_COLLAPSED = "4rem"; // 64px / w-16
const MOBILE_TOPBAR_HEIGHT = "3.5rem";
const LOGO_PY = "1.25rem";
const LOGO_PX = "1rem";
const GROUP_SPACING = "1.5rem";
const LINK_PY = "0.5rem";
const LINK_PX = "0.75rem";
const LINK_GAP = "0.75rem";
const LINK_BORDER_RADIUS = "0.5rem";
const COLLAPSE_ICON_SIZE = 16;
const NAV_ICON_SIZE = 20;
const HAMBURGER_SIZE = 20;
const HAMBURGER_STROKE = 2;
const COLLAPSE_STROKE = 2;
const FOCUS_RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--ring)]";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SidebarLink {
  icon?: React.ReactNode;
  label: string;
  href: string;
  badge?: string;
}

interface SidebarGroup {
  title?: string;
  links: SidebarLink[];
}

interface NavSidebarProps {
  logo?: React.ReactNode;
  groups?: SidebarGroup[];
  footerLinks?: SidebarLink[];
  activeHref?: string;
  className?: string;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

// ---------------------------------------------------------------------------
// Keyframes
// ---------------------------------------------------------------------------

const keyframes = `
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
`;

// ---------------------------------------------------------------------------
// Default icon
// ---------------------------------------------------------------------------

const defaultIcon = (
  <svg
    style={{ width: NAV_ICON_SIZE, height: NAV_ICON_SIZE }}
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    aria-hidden="true"
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6z" />
  </svg>
);

const defaultGroups: SidebarGroup[] = [
  {
    links: [
      { label: "Dashboard", href: "#dashboard", icon: defaultIcon },
      { label: "Analytics", href: "#analytics", icon: defaultIcon, badge: "New" },
      { label: "Projects", href: "#projects", icon: defaultIcon },
    ],
  },
  {
    title: "Management",
    links: [
      { label: "Team", href: "#team", icon: defaultIcon },
      { label: "Settings", href: "#settings", icon: defaultIcon },
      { label: "Billing", href: "#billing", icon: defaultIcon },
    ],
  },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NavSidebar({
  logo = "Brand",
  groups = defaultGroups,
  footerLinks = [
    { label: "Help", href: "#help", icon: defaultIcon },
    { label: "Logout", href: "#logout", icon: defaultIcon },
  ],
  activeHref = "#dashboard",
  className,
  collapsed: controlledCollapsed,
  onCollapsedChange,
}: NavSidebarProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarRef = useRef<HTMLElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  const collapsed = controlledCollapsed ?? internalCollapsed;
  const setCollapsed = onCollapsedChange ?? setInternalCollapsed;

  // Escape key closes mobile menu
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  // Arrow key navigation within sidebar links
  const handleNavKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();

      const container = navLinksRef.current;
      if (!container) return;

      const focusableLinks = Array.from(container.querySelectorAll<HTMLAnchorElement>("a"));
      const currentIndex = focusableLinks.indexOf(document.activeElement as HTMLAnchorElement);

      let nextIndex: number;
      if (e.key === "ArrowDown") {
        nextIndex = currentIndex < focusableLinks.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : focusableLinks.length - 1;
      }

      focusableLinks[nextIndex]?.focus();
    },
    [],
  );

  const sidebarContent = (
    <div className="flex h-full flex-col" ref={navLinksRef} onKeyDown={handleNavKeyDown}>
      {/* Logo */}
      <div
        className="flex items-center justify-between border-b border-[var(--sidebar-border,hsl(0_0%_0%/0.08))]"
        style={{ padding: `${LOGO_PY} ${LOGO_PX}` }}
      >
        {!collapsed && (
          <a
            href="/"
            aria-label="Home"
            className={cn(
              "text-lg font-bold text-[var(--sidebar-logo,hsl(0_0%_9%))]",
              "rounded-lg",
              FOCUS_RING,
            )}
          >
            {logo}
          </a>
        )}
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "hidden lg:flex p-1.5 rounded-lg",
            "text-[var(--sidebar-muted,hsl(0_0%_50%))]",
            "hover:bg-[var(--sidebar-hover-bg,hsl(0_0%_0%/0.05))]",
            FOCUS_RING,
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg
            className={cn(collapsed && "rotate-180")}
            style={{ width: COLLAPSE_ICON_SIZE, height: COLLAPSE_ICON_SIZE }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={COLLAPSE_STROKE}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4" style={{ display: 'flex', flexDirection: 'column', gap: GROUP_SPACING }}>
        {groups.map((group, gi) => (
          <div key={gi} role="group" aria-label={group.title ?? `Navigation group ${gi + 1}`}>
            {group.title && !collapsed && (
              <p
                className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--sidebar-muted,hsl(0_0%_50%))]"
                id={`sidebar-group-${gi}`}
              >
                {group.title}
              </p>
            )}
            <ul
              className="space-y-1"
              role="menu"
              aria-labelledby={group.title ? `sidebar-group-${gi}` : undefined}
            >
              {group.links.map((link) => {
                const isActive = link.href === activeHref;
                return (
                  <li key={link.href} role="none">
                    <a
                      href={link.href}
                      role="menuitem"
                      title={collapsed ? link.label : undefined}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex items-center text-sm font-medium",
                        isActive
                          ? "bg-[var(--sidebar-active-bg,hsl(0_0%_0%/0.08))] text-[var(--sidebar-active-text,hsl(0_0%_9%))]"
                          : "text-[var(--sidebar-link,hsl(0_0%_40%))] hover:bg-[var(--sidebar-hover-bg,hsl(0_0%_0%/0.05))] hover:text-[var(--sidebar-link-hover,hsl(0_0%_9%))]",
                        collapsed && "justify-center",
                        FOCUS_RING,
                      )}
                      style={{
                        gap: collapsed ? 0 : LINK_GAP,
                        borderRadius: LINK_BORDER_RADIUS,
                        padding: collapsed ? `${LINK_PY} 0.5rem` : `${LINK_PY} ${LINK_PX}`,
                      }}
                    >
                      {link.icon && (
                        <span className="flex-shrink-0" aria-hidden="true">{link.icon}</span>
                      )}
                      {!collapsed && (
                        <>
                          <span className="flex-1">{link.label}</span>
                          {link.badge && (
                            <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-[var(--sidebar-badge-bg,hsl(220_90%_56%))] text-[var(--sidebar-badge-text,hsl(0_0%_100%))]">
                              {link.badge}
                            </span>
                          )}
                        </>
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Links */}
      <div className="border-t border-[var(--sidebar-border,hsl(0_0%_0%/0.08))] px-3 py-3 space-y-1">
        {footerLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            title={collapsed ? link.label : undefined}
            className={cn(
              "flex items-center text-sm font-medium",
              "text-[var(--sidebar-link,hsl(0_0%_40%))]",
              "hover:bg-[var(--sidebar-hover-bg,hsl(0_0%_0%/0.05))]",
              "hover:text-[var(--sidebar-link-hover,hsl(0_0%_9%))]",
              collapsed && "justify-center",
              FOCUS_RING,
            )}
            style={{
              gap: collapsed ? 0 : LINK_GAP,
              borderRadius: LINK_BORDER_RADIUS,
              padding: collapsed ? `${LINK_PY} 0.5rem` : `${LINK_PY} ${LINK_PX}`,
            }}
          >
            {link.icon && <span className="flex-shrink-0" aria-hidden="true">{link.icon}</span>}
            {!collapsed && <span>{link.label}</span>}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: keyframes }} />

      {/* Mobile Top Bar */}
      <header
        className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 border-b bg-[var(--sidebar-bg,hsl(0_0%_100%))] border-[var(--sidebar-border,hsl(0_0%_0%/0.08))]"
        style={{ height: MOBILE_TOPBAR_HEIGHT }}
        aria-label="Mobile header"
      >
        <a
          href="/"
          aria-label="Home"
          className={cn(
            "text-lg font-bold text-[var(--sidebar-logo,hsl(0_0%_9%))]",
            "rounded-lg",
            FOCUS_RING,
          )}
        >
          {logo}
        </a>
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            "p-2 text-[var(--sidebar-muted,hsl(0_0%_50%))]",
            "rounded-lg",
            FOCUS_RING,
          )}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="sidebar-nav"
        >
          <svg
            style={{ width: HAMBURGER_SIZE, height: HAMBURGER_SIZE }}
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={HAMBURGER_STROKE}
            stroke="currentColor"
            aria-hidden="true"
          >
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-[var(--sidebar-overlay,hsl(0_0%_0%/0.5))]"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        id="sidebar-nav"
        aria-label="Sidebar navigation"
        className={cn(
          "fixed top-0 left-0 z-50 h-screen border-r",
          "bg-[var(--sidebar-bg,hsl(0_0%_100%))]",
          "border-[var(--sidebar-border,hsl(0_0%_0%/0.08))]",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className,
        )}
        style={{
          width: collapsed ? SIDEBAR_WIDTH_COLLAPSED : SIDEBAR_WIDTH_EXPANDED,
          transitionProperty: 'width, transform',
          transitionDuration: '300ms',
        }}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
