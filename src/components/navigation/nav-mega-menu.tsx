// @version 1.1.0
// @category navigation
// @name Nav Mega Menu
// @source custom-implementation

"use client";

import { useState, useRef, useEffect, useCallback, useId } from "react";
import { cn } from "@/lib/utils";

interface MegaMenuItem {
  icon?: React.ReactNode;
  title: string;
  description: string;
  href: string;
}

interface MegaMenuGroup {
  label: string;
  items: MegaMenuItem[];
  featured?: {
    title: string;
    description: string;
    href: string;
    image?: string;
  };
}

interface NavLink {
  label: string;
  href: string;
}

interface NavMegaMenuProps {
  logo?: React.ReactNode;
  megaMenus?: MegaMenuGroup[];
  links?: NavLink[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

const defaultMegaMenus: MegaMenuGroup[] = [
  {
    label: "Products",
    items: [
      { title: "Analytics", description: "Measure what matters", href: "#analytics" },
      { title: "Automation", description: "Streamline your workflow", href: "#automation" },
      { title: "Integrations", description: "Connect your tools", href: "#integrations" },
      { title: "Security", description: "Enterprise-grade protection", href: "#security" },
    ],
    featured: {
      title: "New: AI Assistant",
      description: "Supercharge your productivity with AI-powered features",
      href: "#ai",
    },
  },
  {
    label: "Solutions",
    items: [
      { title: "For Startups", description: "Move fast and ship", href: "#startups" },
      { title: "For Enterprise", description: "Scale with confidence", href: "#enterprise" },
      { title: "For Agencies", description: "Manage client projects", href: "#agencies" },
    ],
  },
];

export default function NavMegaMenu({
  logo = "Brand",
  megaMenus = defaultMegaMenus,
  links = [
    { label: "Pricing", href: "#pricing" },
    { label: "Blog", href: "#blog" },
  ],
  ctaLabel = "Get Started",
  ctaHref = "#cta",
  className,
}: NavMegaMenuProps) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const dropdownRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const instanceId = useId();

  const getDropdownId = (label: string) =>
    `${instanceId}-mega-dropdown-${label.toLowerCase().replace(/\s+/g, "-")}`;

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  const closeMenu = useCallback(() => {
    const currentOpen = openMenu;
    setOpenMenu(null);
    if (currentOpen) {
      const trigger = triggerRefs.current.get(currentOpen);
      trigger?.focus();
    }
  }, [openMenu]);

  const toggleMenu = useCallback(
    (label: string) => {
      if (openMenu === label) {
        closeMenu();
      } else {
        setOpenMenu(label);
        // Focus first link in dropdown after render
        requestAnimationFrame(() => {
          const dropdown = dropdownRefs.current.get(label);
          const firstLink = dropdown?.querySelector<HTMLAnchorElement>("a[href]");
          firstLink?.focus();
        });
      }
    },
    [openMenu, closeMenu]
  );

  // Keyboard navigation for dropdown triggers
  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent, label: string, index: number) => {
      const menuLabels = megaMenus.map((m) => m.label);

      switch (e.key) {
        case "Enter":
        case " ": {
          e.preventDefault();
          toggleMenu(label);
          break;
        }
        case "ArrowDown": {
          e.preventDefault();
          if (openMenu === label) {
            // Focus first item in open dropdown
            const dropdown = dropdownRefs.current.get(label);
            const firstLink = dropdown?.querySelector<HTMLAnchorElement>("a[href]");
            firstLink?.focus();
          } else {
            toggleMenu(label);
          }
          break;
        }
        case "ArrowRight": {
          e.preventDefault();
          const nextIndex = (index + 1) % menuLabels.length;
          const nextTrigger = triggerRefs.current.get(menuLabels[nextIndex]);
          nextTrigger?.focus();
          break;
        }
        case "ArrowLeft": {
          e.preventDefault();
          const prevIndex = (index - 1 + menuLabels.length) % menuLabels.length;
          const prevTrigger = triggerRefs.current.get(menuLabels[prevIndex]);
          prevTrigger?.focus();
          break;
        }
        case "Escape": {
          e.preventDefault();
          closeMenu();
          break;
        }
      }
    },
    [megaMenus, openMenu, toggleMenu, closeMenu]
  );

  // Keyboard navigation inside dropdown
  const handleDropdownKeyDown = useCallback(
    (e: React.KeyboardEvent, label: string) => {
      const dropdown = dropdownRefs.current.get(label);
      if (!dropdown) return;

      const focusableItems = Array.from(
        dropdown.querySelectorAll<HTMLAnchorElement>("a[href]")
      );
      const currentIndex = focusableItems.indexOf(
        document.activeElement as HTMLAnchorElement
      );

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const next = (currentIndex + 1) % focusableItems.length;
          focusableItems[next]?.focus();
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          if (currentIndex <= 0) {
            // Return focus to trigger
            const trigger = triggerRefs.current.get(label);
            trigger?.focus();
          } else {
            focusableItems[currentIndex - 1]?.focus();
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          closeMenu();
          break;
        }
        case "Tab": {
          // Close on tab out
          closeMenu();
          break;
        }
      }
    },
    [closeMenu]
  );

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!openMenu) return;
      const target = e.target as Node;
      const trigger = triggerRefs.current.get(openMenu);
      const dropdown = dropdownRefs.current.get(openMenu);
      if (
        trigger &&
        !trigger.contains(target) &&
        dropdown &&
        !dropdown.contains(target)
      ) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenu]);

  // Global Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (openMenu) {
          closeMenu();
        } else if (isMobileOpen) {
          setIsMobileOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [openMenu, isMobileOpen, closeMenu]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        "bg-background",
        "border-border",
        className
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="/"
          className={cn(
            "text-xl font-bold text-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            "rounded-sm"
          )}
        >
          {logo}
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1" role="menubar">
          {megaMenus.map((menu, index) => (
            <div
              key={menu.label}
              className="relative"
              onMouseEnter={() => handleMouseEnter(menu.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                ref={(el) => {
                  if (el) triggerRefs.current.set(menu.label, el);
                }}
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium",
                  "transition-colors motion-reduce:transition-none",
                  "text-muted-foreground",
                  "hover:text-foreground",
                  "hover:bg-muted",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  openMenu === menu.label && "text-foreground bg-muted"
                )}
                role="menuitem"
                aria-expanded={openMenu === menu.label}
                aria-haspopup="true"
                aria-controls={getDropdownId(menu.label)}
                onKeyDown={(e) => handleTriggerKeyDown(e, menu.label, index)}
                onClick={() => toggleMenu(menu.label)}
              >
                {menu.label}
                <svg
                  className={cn(
                    "h-4 w-4 transition-transform motion-reduce:transition-none",
                    openMenu === menu.label && "rotate-180"
                  )}
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega Menu Dropdown */}
              {openMenu === menu.label && (
                <div
                  ref={(el) => {
                    if (el) dropdownRefs.current.set(menu.label, el);
                  }}
                  id={getDropdownId(menu.label)}
                  role="menu"
                  aria-label={`${menu.label} submenu`}
                  className={cn(
                    "absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-xl p-6 shadow-xl",
                    "bg-card text-card-foreground",
                    "border border-border",
                    "min-w-[480px] animate-in fade-in slide-in-from-top-2 duration-200",
                    "motion-reduce:animate-none motion-reduce:transition-none"
                  )}
                  onMouseEnter={() => handleMouseEnter(menu.label)}
                  onMouseLeave={handleMouseLeave}
                  onKeyDown={(e) => handleDropdownKeyDown(e, menu.label)}
                >
                  <div className={cn("grid gap-6", menu.featured ? "grid-cols-2" : "grid-cols-1")}>
                    <div className="space-y-1">
                      {menu.items.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          role="menuitem"
                          className={cn(
                            "flex items-start gap-3 rounded-lg p-3",
                            "transition-colors motion-reduce:transition-none",
                            "hover:bg-muted",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                          )}
                        >
                          {item.icon && (
                            <div className="mt-0.5 flex-shrink-0 text-muted-foreground" aria-hidden="true">
                              {item.icon}
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-foreground">
                              {item.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.description}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                    {menu.featured && (
                      <a
                        href={menu.featured.href}
                        role="menuitem"
                        className={cn(
                          "flex flex-col justify-end rounded-lg p-6",
                          "transition-colors motion-reduce:transition-none",
                          "bg-muted",
                          "hover:bg-muted/80",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        )}
                      >
                        <div className="text-sm font-semibold text-foreground">
                          {menu.featured.title}
                        </div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          {menu.featured.description}
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}

          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="menuitem"
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium",
                "transition-colors motion-reduce:transition-none",
                "text-muted-foreground",
                "hover:text-foreground",
                "hover:bg-muted",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <a
          href={ctaHref}
          className={cn(
            "hidden lg:inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium",
            "transition-colors motion-reduce:transition-none",
            "bg-primary text-primary-foreground",
            "hover:bg-primary/90",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
        >
          {ctaLabel}
        </a>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className={cn(
            "lg:hidden p-2 rounded-lg text-muted-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          )}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          aria-controls={`${instanceId}-mobile-menu`}
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
          id={`${instanceId}-mobile-menu`}
          role="menu"
          aria-label="Mobile navigation"
          className={cn(
            "lg:hidden border-t border-border px-4 py-4",
            "animate-in fade-in slide-in-from-top-1 duration-150",
            "motion-reduce:animate-none motion-reduce:transition-none"
          )}
        >
          {megaMenus.map((menu) => (
            <div key={menu.label} className="mb-4">
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {menu.label}
              </p>
              {menu.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  role="menuitem"
                  onClick={() => setIsMobileOpen(false)}
                  className={cn(
                    "block rounded-lg px-3 py-2 text-sm text-muted-foreground",
                    "transition-colors motion-reduce:transition-none",
                    "hover:bg-muted hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                  )}
                >
                  {item.title}
                </a>
              ))}
            </div>
          ))}
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              role="menuitem"
              onClick={() => setIsMobileOpen(false)}
              className={cn(
                "block rounded-lg px-3 py-2 text-sm text-muted-foreground",
                "transition-colors motion-reduce:transition-none",
                "hover:bg-muted hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              )}
            >
              {link.label}
            </a>
          ))}
          <a
            href={ctaHref}
            role="menuitem"
            onClick={() => setIsMobileOpen(false)}
            className={cn(
              "mt-3 block rounded-lg px-4 py-2.5 text-center text-sm font-medium",
              "transition-colors motion-reduce:transition-none",
              "bg-primary text-primary-foreground",
              "hover:bg-primary/90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            )}
          >
            {ctaLabel}
          </a>
        </div>
      )}
    </header>
  );
}
