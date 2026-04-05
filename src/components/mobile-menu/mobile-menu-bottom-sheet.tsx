// @version 1.0.0
// @category mobile-menu
// @name mobile-menu-bottom-sheet
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface NavLink { label: string; href: string; }

interface MobileMenuBottomSheetProps {
  links: NavLink[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function MobileMenuBottomSheet({ links, isOpen, onClose, className }: MobileMenuBottomSheetProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={cn("fixed inset-0 z-50", className)} role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, var(--background) 60%, transparent)" }} onClick={onClose} aria-hidden="true" />
      <nav className={cn("absolute inset-x-0 bottom-0 rounded-t-2xl border-t p-6 motion-safe:animate-in motion-safe:slide-in-from-bottom motion-safe:duration-300 motion-reduce:animate-none")} style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
        <div className="mx-auto mb-4 h-1 w-10 rounded-full" style={{ backgroundColor: "var(--border)" }} aria-hidden="true" />
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
