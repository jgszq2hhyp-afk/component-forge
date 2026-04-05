// @version 1.0.0
// @category modal
// @name modal-confirmation
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

const DIALOG_MAX_W = "24rem";
const BTN_CLASSES = "rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

interface ModalConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "destructive";
}

export default function ModalConfirmation({ isOpen, onClose, onConfirm, title, description, confirmLabel = "Confirm", cancelLabel = "Cancel", variant = "default" }: ModalConfirmationProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const el = dialogRef.current;
    if (!el) return;
    const focusable = el.querySelectorAll<HTMLElement>("button, [tabindex]");
    focusable[0]?.focus();
  }, [isOpen]);

  if (!isOpen) return null;

  const confirmBg = variant === "destructive" ? "var(--destructive, red)" : "var(--primary)";
  const confirmFg = variant === "destructive" ? "#fff" : "var(--primary-foreground)";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label={title}>
      <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)" }} onClick={onClose} aria-hidden="true" />
      <div ref={dialogRef} className={cn("relative w-full rounded-xl border p-6 shadow-lg", "motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:fade-in motion-safe:duration-200 motion-reduce:animate-none")} style={{ maxWidth: DIALOG_MAX_W, borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
        <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{title}</h2>
        {description && <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>{description}</p>}
        <div className="mt-6 flex justify-end gap-2">
          <button type="button" onClick={onClose} className={BTN_CLASSES} style={{ backgroundColor: "transparent", color: "var(--muted-foreground)", border: "1px solid var(--border)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} className={BTN_CLASSES} style={{ backgroundColor: confirmBg, color: confirmFg, ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
