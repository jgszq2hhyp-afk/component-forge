// @version 1.0.0
// @category navigation
// @name Nav Mega Menu
// @source custom-implementation

"use client";

import { useState, useRef, useEffect } from "react";
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

  const handleMouseEnter = (label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpenMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenMenu(null), 150);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b",
        "bg-[var(--nav-bg,hsl(0_0%_100%))]",
        "border-[var(--nav-border,hsl(0_0%_0%/0.08))]",
        className
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3">
        {/* Logo */}
        <a
          href="/"
          className="text-xl font-bold text-[var(--nav-logo-color,hsl(0_0%_9%))]"
        >
          {logo}
        </a>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {megaMenus.map((menu) => (
            <div
              key={menu.label}
              className="relative"
              onMouseEnter={() => handleMouseEnter(menu.label)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                className={cn(
                  "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  "text-[var(--nav-link-color,hsl(0_0%_40%))]",
                  "hover:text-[var(--nav-link-hover,hsl(0_0%_9%))]",
                  "hover:bg-[var(--nav-link-hover-bg,hsl(0_0%_0%/0.05))]",
                  openMenu === menu.label && "text-[var(--nav-link-hover,hsl(0_0%_9%))] bg-[var(--nav-link-hover-bg,hsl(0_0%_0%/0.05))]"
                )}
                aria-expanded={openMenu === menu.label}
                aria-haspopup="true"
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
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Mega Menu Dropdown */}
              {openMenu === menu.label && (
                <div
                  className={cn(
                    "absolute left-1/2 top-full mt-2 -translate-x-1/2 rounded-xl p-6 shadow-xl",
                    "bg-[var(--nav-mega-bg,hsl(0_0%_100%))]",
                    "border border-[var(--nav-mega-border,hsl(0_0%_0%/0.08))]",
                    "min-w-[480px] animate-in fade-in slide-in-from-top-2 duration-200",
                    "motion-reduce:animate-none"
                  )}
                  onMouseEnter={() => handleMouseEnter(menu.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <div className={cn("grid gap-6", menu.featured ? "grid-cols-2" : "grid-cols-1")}>
                    <div className="space-y-1">
                      {menu.items.map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          className={cn(
                            "flex items-start gap-3 rounded-lg p-3 transition-colors",
                            "hover:bg-[var(--nav-mega-item-hover,hsl(0_0%_0%/0.04))]"
                          )}
                        >
                          {item.icon && (
                            <div className="mt-0.5 flex-shrink-0 text-[var(--nav-mega-icon,hsl(0_0%_40%))]">
                              {item.icon}
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-medium text-[var(--nav-mega-title,hsl(0_0%_9%))]">
                              {item.title}
                            </div>
                            <div className="text-xs text-[var(--nav-mega-desc,hsl(0_0%_50%))]">
                              {item.description}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                    {menu.featured && (
                      <a
                        href={menu.featured.href}
                        className={cn(
                          "flex flex-col justify-end rounded-lg p-6 transition-colors",
                          "bg-[var(--nav-mega-featured-bg,hsl(0_0%_96%))]",
                          "hover:bg-[var(--nav-mega-featured-hover,hsl(0_0%_93%))]"
                        )}
                      >
                        <div className="text-sm font-semibold text-[var(--nav-mega-title,hsl(0_0%_9%))]">
                          {menu.featured.title}
                        </div>
                        <div className="mt-1 text-xs text-[var(--nav-mega-desc,hsl(0_0%_50%))]">
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
        </div>

        {/* CTA */}
        <a
          href={ctaHref}
          className={cn(
            "hidden lg:inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium transition-colors",
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

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="lg:hidden border-t border-[var(--nav-border,hsl(0_0%_0%/0.08))] px-4 py-4">
          {megaMenus.map((menu) => (
            <div key={menu.label} className="mb-4">
              <p className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-[var(--nav-mega-desc,hsl(0_0%_50%))]">
                {menu.label}
              </p>
              {menu.items.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileOpen(false)}
                  className="block rounded-lg px-3 py-2 text-sm text-[var(--nav-link-color,hsl(0_0%_40%))] hover:bg-[var(--nav-link-hover-bg,hsl(0_0%_0%/0.05))]"
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
              onClick={() => setIsMobileOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-[var(--nav-link-color,hsl(0_0%_40%))] hover:bg-[var(--nav-link-hover-bg,hsl(0_0%_0%/0.05))]"
            >
              {link.label}
            </a>
          ))}
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
