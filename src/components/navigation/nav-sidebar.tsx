// @version 1.0.0
// @category navigation
// @name Nav Sidebar
// @source custom-implementation

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

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

const defaultIcon = (
  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
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

  const collapsed = controlledCollapsed ?? internalCollapsed;
  const setCollapsed = onCollapsedChange ?? setInternalCollapsed;

  const sidebarContent = (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-[var(--sidebar-border,hsl(0_0%_0%/0.08))]">
        {!collapsed && (
          <a href="/" className="text-lg font-bold text-[var(--sidebar-logo,hsl(0_0%_9%))]">
            {logo}
          </a>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex p-1.5 rounded-lg text-[var(--sidebar-muted,hsl(0_0%_50%))] hover:bg-[var(--sidebar-hover-bg,hsl(0_0%_0%/0.05))]"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg className={cn("h-4 w-4 transition-transform motion-reduce:transition-none", collapsed && "rotate-180")} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {groups.map((group, gi) => (
          <div key={gi}>
            {group.title && !collapsed && (
              <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-[var(--sidebar-muted,hsl(0_0%_50%))]">
                {group.title}
              </p>
            )}
            <ul className="space-y-1">
              {group.links.map((link) => {
                const isActive = link.href === activeHref;
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      title={collapsed ? link.label : undefined}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        isActive
                          ? "bg-[var(--sidebar-active-bg,hsl(0_0%_0%/0.08))] text-[var(--sidebar-active-text,hsl(0_0%_9%))]"
                          : "text-[var(--sidebar-link,hsl(0_0%_40%))] hover:bg-[var(--sidebar-hover-bg,hsl(0_0%_0%/0.05))] hover:text-[var(--sidebar-link-hover,hsl(0_0%_9%))]",
                        collapsed && "justify-center px-2"
                      )}
                    >
                      {link.icon && (
                        <span className="flex-shrink-0">{link.icon}</span>
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
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              "text-[var(--sidebar-link,hsl(0_0%_40%))]",
              "hover:bg-[var(--sidebar-hover-bg,hsl(0_0%_0%/0.05))]",
              "hover:text-[var(--sidebar-link-hover,hsl(0_0%_9%))]",
              collapsed && "justify-center px-2"
            )}
          >
            {link.icon && <span className="flex-shrink-0">{link.icon}</span>}
            {!collapsed && <span>{link.label}</span>}
          </a>
        ))}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 border-b bg-[var(--sidebar-bg,hsl(0_0%_100%))] border-[var(--sidebar-border,hsl(0_0%_0%/0.08))]">
        <a href="/" className="text-lg font-bold text-[var(--sidebar-logo,hsl(0_0%_9%))]">
          {logo}
        </a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-[var(--sidebar-muted,hsl(0_0%_50%))]"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-[var(--sidebar-overlay,hsl(0_0%_0%/0.5))]"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-screen border-r transition-all duration-300 motion-reduce:transition-none",
          "bg-[var(--sidebar-bg,hsl(0_0%_100%))]",
          "border-[var(--sidebar-border,hsl(0_0%_0%/0.08))]",
          collapsed ? "lg:w-16" : "lg:w-64",
          mobileOpen ? "w-64 translate-x-0" : "-translate-x-full lg:translate-x-0",
          className
        )}
      >
        {sidebarContent}
      </aside>
    </>
  );
}
