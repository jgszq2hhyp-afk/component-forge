// @version 1.0.0
// @category mobile-menu
// @name mobile-menu-accordion
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface SubLink { label: string; href: string; }
interface NavGroup { label: string; links: SubLink[]; }

interface MobileMenuAccordionProps {
  groups: NavGroup[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

export default function MobileMenuAccordion({ groups, isOpen, onClose, className }: MobileMenuAccordionProps) {
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
      <nav className="absolute inset-x-0 bottom-0 max-h-[80vh] overflow-y-auto rounded-t-2xl border-t p-6 motion-safe:animate-in motion-safe:slide-in-from-bottom motion-safe:duration-300 motion-reduce:animate-none" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
        <div className="mx-auto mb-4 h-1 w-10 rounded-full" style={{ backgroundColor: "var(--border)" }} aria-hidden="true" />
        <div className="space-y-2">
          {groups.map((group) => (
            <details key={group.label} className="group rounded-lg border" style={{ borderColor: "var(--border)" }}>
              <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-base font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg" style={{ color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
                {group.label}
                <svg className="size-4 shrink-0 motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
              </summary>
              <ul className="space-y-1 px-4 pb-3" role="list">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="block rounded-lg px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: "var(--muted-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} onClick={onClose}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </nav>
    </div>
  );
}
