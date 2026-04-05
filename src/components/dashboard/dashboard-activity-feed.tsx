// @version 1.0.0
// @category dashboard
// @name Dashboard Activity Feed
// @source custom

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SECTION_PADDING = "py-[clamp(1.5rem,1rem+1.5vw,2.5rem)]";
const HEADING_SIZE = "text-[clamp(1.125rem,0.85rem+0.8vw,1.5rem)]";
const CARD_RADIUS = "rounded-xl";
const CARD_PADDING = "p-5 sm:p-6";
const AVATAR_SIZE = "h-9 w-9";
const DOT_SIZE = "h-2.5 w-2.5";
const TIMESTAMP_SIZE = "text-xs";
const ACTION_SIZE = "text-sm";
const USER_WEIGHT = "font-semibold";
const RING_COLOR_VALUE = "var(--ring, hsl(215 20% 65%))";
const TIMELINE_LINE_WIDTH = "w-px";
const TRANSITION_CLASSES =
  "motion-safe:transition-colors motion-safe:duration-200";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type ActivityType = "create" | "update" | "delete" | "comment";

interface ActivityItem {
  type: ActivityType;
  user: string;
  action: string;
  timestamp: string;
  avatarSrc?: string;
}

interface DashboardActivityFeedProps {
  activities: ActivityItem[];
  headline?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Activity Type Colors                                               */
/* ------------------------------------------------------------------ */

const TYPE_DOT_COLORS: Record<ActivityType, string> = {
  create: "bg-[var(--color-success,hsl(142_71%_45%))]",
  update: "bg-[var(--color-info,hsl(215_90%_60%))]",
  delete: "bg-[var(--color-destructive,hsl(0_84%_60%))]",
  comment: "bg-[var(--color-warning,hsl(38_92%_50%))]",
};

const TYPE_RING_COLORS: Record<ActivityType, string> = {
  create:
    "ring-[var(--color-success-muted,hsl(142_71%_45%/0.25))]",
  update:
    "ring-[var(--color-info-muted,hsl(215_90%_60%/0.25))]",
  delete:
    "ring-[var(--color-destructive-muted,hsl(0_84%_60%/0.25))]",
  comment:
    "ring-[var(--color-warning-muted,hsl(38_92%_50%/0.25))]",
};

/* ------------------------------------------------------------------ */
/*  Activity Type Icons                                                */
/* ------------------------------------------------------------------ */

const ICON_CLASSES = "h-4 w-4";

function CreateIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      className={cn(ICON_CLASSES, "text-[var(--color-success,hsl(142_71%_45%))]")}
    >
      <path d="M8 3v10" />
      <path d="M3 8h10" />
    </svg>
  );
}

function UpdateIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(ICON_CLASSES, "text-[var(--color-info,hsl(215_90%_60%))]")}
    >
      <path d="M12 2L4 10l-1 3 3-1 8-8z" />
    </svg>
  );
}

function DeleteIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        ICON_CLASSES,
        "text-[var(--color-destructive,hsl(0_84%_60%))]"
      )}
    >
      <path d="M2 4h12" />
      <path d="M5 4V3a1 1 0 011-1h4a1 1 0 011 1v1" />
      <path d="M6 7v5" />
      <path d="M10 7v5" />
      <rect x="4" y="4" width="8" height="9" rx="1" />
    </svg>
  );
}

function CommentIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(
        ICON_CLASSES,
        "text-[var(--color-warning,hsl(38_92%_50%))]"
      )}
    >
      <path d="M2 3h12v8H5l-3 3V3z" />
    </svg>
  );
}

function ActivityTypeIcon({ type }: { type: ActivityType }) {
  switch (type) {
    case "create":
      return <CreateIcon />;
    case "update":
      return <UpdateIcon />;
    case "delete":
      return <DeleteIcon />;
    case "comment":
      return <CommentIcon />;
  }
}

/* ------------------------------------------------------------------ */
/*  Activity Type Labels (for screen readers)                          */
/* ------------------------------------------------------------------ */

const TYPE_LABELS: Record<ActivityType, string> = {
  create: "Created",
  update: "Updated",
  delete: "Deleted",
  comment: "Commented",
};

/* ------------------------------------------------------------------ */
/*  Avatar                                                             */
/* ------------------------------------------------------------------ */

function UserAvatar({
  user,
  avatarSrc,
}: {
  user: string;
  avatarSrc?: string;
}) {
  const initials = user
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (avatarSrc) {
    return (
      <img
        src={avatarSrc}
        alt=""
        className={cn(
          AVATAR_SIZE,
          "shrink-0 rounded-full object-cover",
          "ring-2 ring-[var(--color-background,hsl(0_0%_100%))]"
        )}
      />
    );
  }

  return (
    <span
      aria-hidden="true"
      className={cn(
        AVATAR_SIZE,
        "inline-flex shrink-0 items-center justify-center",
        "rounded-full",
        "bg-[var(--color-muted,hsl(215_16%_47%/0.12))]",
        "text-xs font-semibold",
        "text-[var(--color-muted-foreground,hsl(215_16%_47%))]",
        "ring-2 ring-[var(--color-background,hsl(0_0%_100%))]"
      )}
    >
      {initials}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Single Activity Entry                                              */
/* ------------------------------------------------------------------ */

function ActivityEntry({
  activity,
  isLast,
}: {
  activity: ActivityItem;
  isLast: boolean;
}) {
  return (
    <li className="relative flex gap-4">
      {/* Timeline Spine */}
      <div
        className="flex flex-col items-center"
        aria-hidden="true"
      >
        {/* Dot */}
        <span
          className={cn(
            DOT_SIZE,
            "mt-3 shrink-0 rounded-full ring-4",
            TYPE_DOT_COLORS[activity.type],
            TYPE_RING_COLORS[activity.type]
          )}
        />

        {/* Connector Line */}
        {!isLast && (
          <span
            className={cn(
              TIMELINE_LINE_WIDTH,
              "grow",
              "bg-[var(--color-border,hsl(215_20%_85%))]"
            )}
          />
        )}
      </div>

      {/* Content */}
      <div
        className={cn(
          "flex min-w-0 flex-1 items-start gap-3 pb-6",
          isLast && "pb-0"
        )}
      >
        <UserAvatar user={activity.user} avatarSrc={activity.avatarSrc} />

        <div className="min-w-0 flex-1">
          {/* Action line */}
          <p className={cn(ACTION_SIZE, "leading-relaxed")}>
            <span
              className={cn(
                USER_WEIGHT,
                "text-[var(--color-foreground,hsl(215_25%_9%))]"
              )}
            >
              {activity.user}
            </span>{" "}
            <span className="text-[var(--color-muted-foreground,hsl(215_16%_47%))]">
              {activity.action}
            </span>
          </p>

          {/* Meta row: type badge + timestamp */}
          <div className="mt-1 flex flex-wrap items-center gap-2">
            <span
              className="inline-flex items-center gap-1"
              aria-label={TYPE_LABELS[activity.type]}
            >
              <ActivityTypeIcon type={activity.type} />
            </span>
            <time
              dateTime={activity.timestamp}
              className={cn(
                TIMESTAMP_SIZE,
                "text-[var(--color-muted-foreground,hsl(215_16%_47%/0.7))]"
              )}
            >
              {activity.timestamp}
            </time>
          </div>
        </div>
      </div>
    </li>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function DashboardActivityFeed({
  activities,
  headline = "Recent Activity",
  className,
}: DashboardActivityFeedProps) {
  return (
    <section
      aria-label={headline}
      className={cn(SECTION_PADDING, className)}
    >
      {/* Card Wrapper */}
      <div
        className={cn(
          CARD_RADIUS,
          CARD_PADDING,
          "border border-[var(--color-border,hsl(215_20%_85%))]",
          "bg-[var(--color-card,hsl(0_0%_100%))]",
          "shadow-sm"
        )}
      >
        {/* Headline */}
        <h2
          className={cn(
            HEADING_SIZE,
            "mb-6 font-bold tracking-tight",
            "text-[var(--color-foreground,hsl(215_25%_9%))]"
          )}
        >
          {headline}
        </h2>

        {/* Timeline List */}
        {activities.length > 0 ? (
          <ol className="list-none" role="list">
            {activities.map((activity, index) => (
              <ActivityEntry
                key={`${activity.user}-${activity.timestamp}-${index}`}
                activity={activity}
                isLast={index === activities.length - 1}
              />
            ))}
          </ol>
        ) : (
          <p
            className={cn(
              ACTION_SIZE,
              "py-8 text-center",
              "text-[var(--color-muted-foreground,hsl(215_16%_47%))]"
            )}
          >
            No recent activity
          </p>
        )}
      </div>
    </section>
  );
}
