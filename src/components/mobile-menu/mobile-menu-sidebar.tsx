// @version 1.0.0
// @category mobile-menu
// @name mobile-menu-sidebar
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

interface NavLink { label: string; href: string; }

interface MobileMenuSidebarProps {
  links: NavLink[];
  isOpen: boolean;
  onClose: () => void;
  side?: "left" | "right";
  className?: string;
}

export default function MobileMenuSidebar({ links, isOpen, onClose, side = "left", className }: MobileMenuSidebarProps) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) { document.body.style.overflow = "hidden"; }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={cn("fixed inset-0 z-50", className)} role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, var(--background) 60%, transparent)" }} onClick={onClose} aria-hidden="true" />
      <nav
        ref={navRef}
        className={cn(
          "absolute top-0 bottom-0 w-72 border-r p-6",
          "motion-safe:animate-in motion-safe:duration-300 motion-reduce:animate-none",
          side === "left" ? "left-0 motion-safe:slide-in-from-left" : "right-0 motion-safe:slide-in-from-right",
        )}
        style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
      >
        <div className="mb-6 flex justify-end">
          <button type="button" onClick={onClose} className="rounded p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Close menu" style={{ color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <ul className="space-y-1" role="list">
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="block rounded-lg px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} onClick={onClose}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
