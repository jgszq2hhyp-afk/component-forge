// @version 1.0.0
// @category avatar
// @name avatar-initials
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const SIZE_MAP = {
  sm: "h-8 w-8 text-xs",
  md: "h-10 w-10 text-sm",
  lg: "h-14 w-14 text-base",
} as const;

const STATUS_DOT_SIZE_MAP = {
  sm: "h-2 w-2",
  md: "h-2.5 w-2.5",
  lg: "h-3 w-3",
} as const;

const STATUS_COLOR_MAP = {
  online: "var(--chart-2, hsl(142 71% 45%))",
  offline: "var(--muted-foreground)",
  away: "var(--chart-4, hsl(43 96% 56%))",
} as const;

const STATUS_LABEL_MAP = {
  online: "Online",
  offline: "Offline",
  away: "Away",
} as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type AvatarSize = "sm" | "md" | "lg";

type AvatarStatus = "online" | "offline" | "away";

interface AvatarInitialsProps {
  name: string;
  src?: string;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function getInitials(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1]![0] ?? "" : "";
  return (first + last).toUpperCase();
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function AvatarInitials({
  name,
  src,
  size = "md",
  status,
  className,
}: AvatarInitialsProps) {
  const initials = getInitials(name);
  const sizeClasses = SIZE_MAP[size];
  const dotSize = STATUS_DOT_SIZE_MAP[size];

  return (
    <div
      className={cn("relative inline-flex shrink-0", className)}
      role="img"
      aria-label={
        status
          ? `${name} - ${STATUS_LABEL_MAP[status]}`
          : name
      }
    >
      {/* Avatar circle */}
      <div
        className={cn(
          "relative overflow-hidden rounded-full",
          "flex items-center justify-center font-semibold",
          sizeClasses,
          "ring-offset-2",
          "focus-visible:outline-none focus-visible:ring-2",
          "motion-safe:transition-shadow motion-safe:duration-200",
          "motion-reduce:transition-none",
        )}
        style={{
          backgroundColor: "var(--muted, hsl(0 0% 96%))",
          color: "var(--muted-foreground)",
          ['--tw-ring-color' as string]: "var(--ring, var(--primary))",
          ['--tw-ring-offset-color' as string]: "var(--background)",
        }}
      >
        {src ? (
          <img
            src={src}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
        ) : (
          <span aria-hidden="true">{initials}</span>
        )}
      </div>

      {/* Status dot */}
      {status && (
        <span
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2",
            dotSize,
          )}
          style={{
            backgroundColor: STATUS_COLOR_MAP[status],
            borderColor: "var(--background)",
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
