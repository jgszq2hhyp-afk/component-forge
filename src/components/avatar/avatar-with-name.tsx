// @version 1.0.0
// @category avatar
// @name avatar-with-name
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

const NAME_SIZE_MAP = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
} as const;

const ROLE_SIZE_MAP = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-sm",
} as const;

const GAP_MAP = {
  sm: "gap-2",
  md: "gap-3",
  lg: "gap-4",
} as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

type AvatarSize = "sm" | "md" | "lg";

interface AvatarWithNameProps {
  name: string;
  role?: string;
  src?: string;
  size?: AvatarSize;
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

export default function AvatarWithName({
  name,
  role,
  src,
  size = "md",
  className,
}: AvatarWithNameProps) {
  const initials = getInitials(name);
  const avatarSize = SIZE_MAP[size];
  const nameSize = NAME_SIZE_MAP[size];
  const roleSize = ROLE_SIZE_MAP[size];
  const gap = GAP_MAP[size];

  return (
    <div
      className={cn(
        "inline-flex items-center",
        gap,
        className,
      )}
    >
      {/* Avatar circle */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full",
          "flex items-center justify-center font-semibold",
          avatarSize,
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
        role="img"
        aria-label={name}
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

      {/* Name + Role text */}
      <div className="flex min-w-0 flex-col">
        <span
          className={cn("truncate font-medium leading-tight", nameSize)}
          style={{ color: "var(--foreground)" }}
        >
          {name}
        </span>
        {role && (
          <span
            className={cn("truncate leading-tight", roleSize)}
            style={{ color: "var(--muted-foreground)" }}
          >
            {role}
          </span>
        )}
      </div>
    </div>
  );
}
