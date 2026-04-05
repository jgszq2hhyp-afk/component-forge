// @source 21st.dev/r/thanh/menu-hover-effects
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MenuItem {
  label: string;
  href: string;
}

interface NavigationMenuHoverProps {
  items?: MenuItem[];
  className?: string;
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const DEFAULT_MENU_ITEMS: MenuItem[] = [
  { label: "Home", href: "#" },
  { label: "About", href: "#" },
  { label: "Services", href: "#" },
  { label: "Team", href: "#" },
  { label: "Portfolio", href: "#" },
  { label: "Contact", href: "#" },
];

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function NavigationMenuHover({
  items = DEFAULT_MENU_ITEMS,
  className,
}: NavigationMenuHoverProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className={cn(
        "relative w-full bg-[var(--background)]",
        className,
      )}
    >
      {/* Mobile menu toggle button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden absolute top-6 right-6 z-20 p-2"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        type="button"
      >
        <div
          className={cn(
            "w-6 h-0.5 bg-[var(--foreground)] mb-1.5",
            "transition-transform duration-300 motion-reduce:transition-none",
            isMenuOpen && "rotate-45 translate-y-2",
          )}
        />
        <div
          className={cn(
            "w-6 h-0.5 bg-[var(--foreground)] mb-1.5",
            "transition-opacity duration-300 motion-reduce:transition-none",
            isMenuOpen && "opacity-0",
          )}
        />
        <div
          className={cn(
            "w-6 h-0.5 bg-[var(--foreground)]",
            "transition-transform duration-300 motion-reduce:transition-none",
            isMenuOpen && "-rotate-45 -translate-y-2",
          )}
        />
      </button>

      {/* Menu container */}
      <div
        className={cn(
          "flex items-center justify-center w-full py-8",
          "md:block md:h-auto",
          isMenuOpen ? "block" : "hidden md:block",
        )}
      >
        <ul
          className={cn(
            "flex flex-col items-center space-y-6",
            "md:flex-row md:space-y-0 md:space-x-4 md:justify-center",
            "lg:space-x-8",
          )}
        >
          {items.map((item) => (
            <li key={item.label} className="list-none">
              <a
                href={item.href}
                className="relative inline-block group"
                onClick={() => setIsMenuOpen(false)}
              >
                {/* Link text */}
                <span
                  className={cn(
                    "relative z-10 block uppercase text-[var(--foreground)]",
                    "font-sans font-semibold",
                    "transition-colors duration-300 motion-reduce:transition-none",
                    "group-hover:text-[var(--background)]",
                    "text-xl py-2 px-3",
                    "md:text-base md:py-2 md:px-3",
                    "lg:text-lg lg:py-2 lg:px-4",
                  )}
                >
                  {item.label}
                </span>

                {/* Top & bottom border animation */}
                <span
                  className={cn(
                    "absolute inset-0 border-t-2 border-b-2 border-[var(--foreground)]",
                    "scale-y-[2] opacity-0",
                    "transition-all duration-300 origin-center motion-reduce:transition-none",
                    "group-hover:scale-y-100 group-hover:opacity-100",
                  )}
                />

                {/* Background fill animation */}
                <span
                  className={cn(
                    "absolute top-[2px] left-0 w-full h-full bg-[var(--foreground)]",
                    "scale-0 opacity-0",
                    "transition-all duration-300 origin-top motion-reduce:transition-none",
                    "group-hover:scale-100 group-hover:opacity-100",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
