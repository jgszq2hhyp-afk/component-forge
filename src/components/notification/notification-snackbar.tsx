// @version 1.0.0
// @category notification
// @name notification-snackbar
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

const AUTO_DISMISS_MS = 5000;

interface NotificationSnackbarProps {
  message: string;
  actionLabel?: string;
  onAction?: () => void;
  autoDismiss?: boolean;
  className?: string;
}

export default function NotificationSnackbar({ message, actionLabel, onAction, autoDismiss = true, className }: NotificationSnackbarProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (!autoDismiss) return;
    const timer = setTimeout(() => setVisible(false), AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [autoDismiss]);

  if (!visible) return null;

  return (
    <div className={cn("fixed inset-x-0 bottom-4 z-50 flex justify-center px-4", "motion-safe:animate-in motion-safe:slide-in-from-bottom-4 motion-safe:fade-in motion-safe:duration-300 motion-reduce:animate-none", className)} role="status" aria-live="polite">
      <div className="flex items-center gap-3 rounded-lg px-4 py-3 shadow-lg" style={{ backgroundColor: "color-mix(in srgb, var(--foreground) 90%, var(--background))", color: "var(--background)" }}>
        <p className="text-sm">{message}</p>
        {actionLabel && (
          <button type="button" onClick={() => { onAction?.(); setVisible(false); }} className="shrink-0 text-sm font-semibold underline focus-visible:outline-none focus-visible:ring-2 rounded" style={{ color: "var(--primary-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            {actionLabel}
          </button>
        )}
        <button type="button" onClick={() => setVisible(false)} className="ml-1 shrink-0 rounded p-1 focus-visible:outline-none focus-visible:ring-2" aria-label="Dismiss" style={{ ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
          <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}
