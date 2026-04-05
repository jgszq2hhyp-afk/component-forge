// @version 1.0.0
// @category modal
// @name modal-image-preview
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useEffect } from "react";

interface ModalImagePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
  caption?: string;
}

export default function ModalImagePreview({ isOpen, onClose, src, alt = "", caption }: ModalImagePreviewProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Image preview">
      <div className="absolute inset-0" style={{ backgroundColor: "color-mix(in srgb, var(--background) 90%, transparent)" }} onClick={onClose} aria-hidden="true" />
      <div className={cn("relative max-h-[90vh] max-w-[90vw]", "motion-safe:animate-in motion-safe:zoom-in-95 motion-safe:fade-in motion-safe:duration-200 motion-reduce:animate-none")}>
        <img src={src} alt={alt} className="max-h-[80vh] rounded-lg object-contain" />
        {caption && <p className="mt-3 text-center text-sm" style={{ color: "var(--muted-foreground)" }}>{caption}</p>}
        <button type="button" onClick={onClose} className="absolute -top-3 -right-3 rounded-full p-2 shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" aria-label="Close" style={{ backgroundColor: "var(--card)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}
