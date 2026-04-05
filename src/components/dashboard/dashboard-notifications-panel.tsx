// @version 1.0.0
// @category dashboard
// @name dashboard-notifications-panel
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_SIZE = "1.125rem";
const DOT_SIZE = 8;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type NotificationType = "info" | "success" | "warning" | "error";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  type?: NotificationType;
  read?: boolean;
}

interface DashboardNotificationsPanelProps {
  headline?: string;
  notifications: Notification[];
  onMarkAllRead?: () => void;
  onDismiss?: (id: string) => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const TYPE_COLORS: Record<NotificationType, string> = {
  info: "var(--primary)",
  success: "var(--primary)",
  warning: "color-mix(in srgb, var(--foreground) 60%, orange)",
  error: "var(--destructive, red)",
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DashboardNotificationsPanel({
  headline = "Notifications",
  notifications: initialNotifications,
  onMarkAllRead,
  onDismiss,
  className,
}: DashboardNotificationsPanelProps) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleDismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    onDismiss?.(id);
  }, [onDismiss]);

  const handleMarkAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    onMarkAllRead?.();
  }, [onMarkAllRead]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div
      className={cn("rounded-xl border", className)}
      style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
    >
      <div className="flex items-center justify-between border-b px-5 py-4" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2">
          <h3 className="font-semibold" style={{ fontSize: HEADING_SIZE, color: "var(--foreground)" }}>
            {headline}
          </h3>
          {unreadCount > 0 && (
            <span
              className="flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold"
              style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", minWidth: "1.25rem" }}
            >
              {unreadCount}
            </span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            type="button"
            onClick={handleMarkAllRead}
            className="text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
            style={{ color: "var(--primary)", ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))" }}
          >
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="px-5 py-8 text-center">
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>No notifications</p>
        </div>
      ) : (
        <ul className="divide-y" style={{ borderColor: "var(--border)" }} role="list">
          {notifications.map((n) => {
            const dotColor = TYPE_COLORS[n.type ?? "info"];
            return (
              <li
                key={n.id}
                className={cn(
                  "flex items-start gap-3 px-5 py-3",
                  "motion-safe:transition-colors motion-safe:duration-150",
                )}
                style={{
                  backgroundColor: n.read
                    ? "var(--card)"
                    : "color-mix(in srgb, var(--primary) 3%, var(--card))",
                }}
              >
                {/* Unread dot */}
                <div className="mt-1.5 shrink-0" aria-hidden="true">
                  <div
                    className="rounded-full"
                    style={{
                      width: DOT_SIZE,
                      height: DOT_SIZE,
                      backgroundColor: n.read ? "transparent" : dotColor,
                    }}
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {n.title}
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {n.message}
                  </p>
                  <p className="mt-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {n.time}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDismiss(n.id)}
                  className="mt-0.5 shrink-0 rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  aria-label={`Dismiss notification: ${n.title}`}
                  style={{ ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))" }}
                >
                  <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--muted-foreground)" }} aria-hidden="true">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
