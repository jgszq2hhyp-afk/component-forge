// @version 1.0.0
// @category notification
// @name notification-banner
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

type NotificationType = "info" | "success" | "warning" | "error";

interface NotificationBannerProps {
  message: string;
  type?: NotificationType;
  dismissible?: boolean;
  className?: string;
}

const TYPE_STYLES: Record<NotificationType, { bg: string; text: string; border: string }> = {
  info: { bg: "color-mix(in srgb, var(--primary) 8%, transparent)", text: "var(--primary)", border: "var(--primary)" },
  success: { bg: "color-mix(in srgb, var(--primary) 8%, transparent)", text: "var(--primary)", border: "var(--primary)" },
  warning: { bg: "color-mix(in srgb, orange 8%, transparent)", text: "color-mix(in srgb, var(--foreground) 70%, orange)", border: "orange" },
  error: { bg: "color-mix(in srgb, var(--destructive, red) 8%, transparent)", text: "var(--destructive, red)", border: "var(--destructive, red)" },
};

export default function NotificationBanner({ message, type = "info", dismissible = true, className }: NotificationBannerProps) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  const s = TYPE_STYLES[type];

  return (
    <div className={cn("w-full border-l-4 px-4 py-3", className)} role="alert" style={{ backgroundColor: s.bg, borderLeftColor: s.border }}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium" style={{ color: s.text }}>{message}</p>
        {dismissible && (
          <button type="button" onClick={() => setVisible(false)} className="ml-3 shrink-0 rounded p-1 focus-visible:outline-none focus-visible:ring-2" aria-label="Dismiss" style={{ color: s.text, ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        )}
      </div>
    </div>
  );
}
