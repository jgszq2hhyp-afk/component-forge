// @version 1.0.0
// @category notification
// @name notification-floating-badge
// @source custom

import { cn } from "@/lib/utils";

interface NotificationFloatingBadgeProps {
  count: number;
  className?: string;
}

export default function NotificationFloatingBadge({ count, className }: NotificationFloatingBadgeProps) {
  if (count <= 0) return null;
  const display = count > 99 ? "99+" : String(count);
  return (
    <span
      className={cn("inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold", className)}
      style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", minWidth: "1.25rem" }}
      aria-label={`${count} notifications`}
    >
      {display}
    </span>
  );
}
