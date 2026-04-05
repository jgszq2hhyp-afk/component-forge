// @version 1.0.0
// @category mobile-menu
// @name mobile-menu-slide-down
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";

interface NavLink { label: string; href: string; }

interface MobileMenuSlideDownProps {
  links: NavLink[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function MobileMenuSlideDown({ links, isOpen, onClose, className }: MobileMenuSlideDownProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { if (isOpen) setMounted(true); }, [isOpen]);

  const handleTransitionEnd = useCallback(() => { if (!isOpen) setMounted(false); }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!mounted) return null;

  return (
    <nav
      className={cn("fixed inset-x-0 top-0 z-50 overflow-hidden motion-safe:transition-[max-height] motion-safe:duration-300", className)}
      style={{
        maxHeight: isOpen ? "100vh" : "0",
        backgroundColor: "var(--card)",
        borderBottom: "1px solid var(--border)",
      }}
      onTransitionEnd={handleTransitionEnd}
      aria-label="Mobile navigation"
    >
      <div className="flex items-center justify-end p-4">
        <button type="button" onClick={onClose} className="rounded p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Close menu" style={{ color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
          <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>
      <ul className="space-y-1 px-4 pb-6" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <a href={link.href} className="block rounded-lg px-4 py-3 text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} onClick={onClose}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
