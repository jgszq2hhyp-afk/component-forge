// @version 1.0.0
// @category avatar
// @name avatar-badge-list
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const AVATAR_SIZE = "h-10 w-10" as const;

const ROW_PADDING = "px-4 py-3" as const;

const BADGE_PADDING = "px-2.5 py-0.5" as const;

const DEFAULT_HEADLINE = "Team Members";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface UserEntry {
  name: string;
  role: string;
  src?: string;
  badge?: string;
}

interface AvatarBadgeListProps {
  users: UserEntry[];
  headline?: string;
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

export default function AvatarBadgeList({
  users,
  headline = DEFAULT_HEADLINE,
  className,
}: AvatarBadgeListProps) {
  return (
    <section
      className={cn("w-full py-8", className)}
      style={{ color: "var(--foreground)" }}
    >
      {/* Optional headline */}
      {headline && (
        <h2
          className="mb-6 font-semibold"
          style={{
            fontSize: "clamp(1.25rem, 2vw + 0.25rem, 1.75rem)",
            color: "var(--foreground)",
          }}
        >
          {headline}
        </h2>
      )}

      {/* User list */}
      <ul className="flex flex-col divide-y" style={{ ['--tw-divide-color' as string]: "var(--border, hsl(0 0% 90%))" }} role="list">
        {users.map((user, index) => (
          <li
            key={`user-${index}`}
            className={cn(
              "flex items-center gap-4",
              ROW_PADDING,
              "motion-safe:transition-colors motion-safe:duration-150",
              "motion-safe:hover:bg-[var(--muted,hsl(0_0%_96%))]",
              "motion-reduce:transition-none",
            )}
          >
            {/* Avatar */}
            <div
              className={cn(
                "relative shrink-0 overflow-hidden rounded-full",
                "flex items-center justify-center font-semibold text-sm",
                AVATAR_SIZE,
              )}
              style={{
                backgroundColor: "var(--muted, hsl(0 0% 96%))",
                color: "var(--muted-foreground)",
              }}
              role="img"
              aria-label={user.name}
            >
              {user.src ? (
                <img
                  src={user.src}
                  alt=""
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span aria-hidden="true">{getInitials(user.name)}</span>
              )}
            </div>

            {/* Name + Role */}
            <div className="flex min-w-0 flex-1 flex-col">
              <span
                className="truncate text-sm font-medium leading-tight"
                style={{ color: "var(--foreground)" }}
              >
                {user.name}
              </span>
              <span
                className="truncate text-xs leading-tight"
                style={{ color: "var(--muted-foreground)" }}
              >
                {user.role}
              </span>
            </div>

            {/* Badge */}
            {user.badge && (
              <span
                className={cn(
                  "shrink-0 rounded-full text-xs font-medium",
                  BADGE_PADDING,
                )}
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                }}
              >
                {user.badge}
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
