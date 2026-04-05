// @version 1.0.0
// @category notification
// @name notification-list-panel
// @source custom

import { cn } from "@/lib/utils";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read?: boolean;
}

interface NotificationListPanelProps {
  headline?: string;
  notifications: NotificationItem[];
  className?: string;
}

export default function NotificationListPanel({ headline = "Notifications", notifications, className }: NotificationListPanelProps) {
  return (
    <div className={cn("w-full max-w-sm rounded-xl border shadow-lg", className)} style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
      <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
        <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{headline}</h3>
      </div>
      {notifications.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>No notifications</p>
        </div>
      ) : (
        <ul className="max-h-80 divide-y overflow-y-auto" style={{ ['--tw-divide-color' as string]: "var(--border)" }} role="list">
          {notifications.map((n) => (
            <li key={n.id} className="px-4 py-3" style={{ backgroundColor: n.read ? "var(--card)" : "color-mix(in srgb, var(--primary) 3%, var(--card))" }}>
              <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{n.title}</p>
              <p className="mt-0.5 text-xs" style={{ color: "var(--muted-foreground)" }}>{n.message}</p>
              <p className="mt-1 text-xs" style={{ color: "var(--muted-foreground)" }}>{n.time}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
