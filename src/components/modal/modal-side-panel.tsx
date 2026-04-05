// @version 1.0.0
// @category modal
// @name modal-side-panel
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface ModalSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  side?: "left" | "right";
}

export default function ModalSidePanel({ isOpen, onClose, title, children, side = "right" }: ModalSidePanelProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, var(--background) 60%, transparent)" }} onClick={onClose} aria-hidden="true" />
      <div
        className={cn(
          "absolute top-0 bottom-0 w-full max-w-md overflow-y-auto border-l p-6",
          "motion-safe:animate-in motion-safe:duration-300 motion-reduce:animate-none",
          side === "right" ? "right-0 motion-safe:slide-in-from-right" : "left-0 border-r border-l-0 motion-safe:slide-in-from-left",
        )}
        style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
      >
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{title}</h2>
          <button type="button" onClick={onClose} className="rounded p-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Close" style={{ color: "var(--muted-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
