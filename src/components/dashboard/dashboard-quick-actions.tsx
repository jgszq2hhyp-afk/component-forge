// @version 1.0.0
// @category dashboard
// @name dashboard-quick-actions
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_SIZE = "1.125rem";
const ICON_BOX = 44;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface QuickAction {
  label: string;
  description?: string;
  href?: string;
  icon?: React.ReactNode;
}

interface DashboardQuickActionsProps {
  headline?: string;
  actions: QuickAction[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Default icon                                                       */
/* ------------------------------------------------------------------ */

function DefaultIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }} aria-hidden="true">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DashboardQuickActions({
  headline = "Quick Actions",
  actions,
  className,
}: DashboardQuickActionsProps) {
  return (
    <div
      className={cn("rounded-xl border", className)}
      style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
    >
      <div className="border-b px-5 py-4" style={{ borderColor: "var(--border)" }}>
        <h3 className="font-semibold" style={{ fontSize: HEADING_SIZE, color: "var(--foreground)" }}>
          {headline}
        </h3>
      </div>

      <div className="grid gap-3 p-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Tag = action.href ? "a" : "div";
          return (
            <Tag
              key={action.label}
              {...(action.href ? { href: action.href } : {})}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3",
                "motion-safe:transition-colors motion-safe:duration-150",
                action.href && "cursor-pointer hover:border-[var(--primary)]",
                action.href && "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
              )}
              style={{
                borderColor: "var(--border)",
                ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
              }}
            >
              <div
                className="flex shrink-0 items-center justify-center rounded-lg"
                style={{
                  width: ICON_BOX,
                  height: ICON_BOX,
                  backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
                }}
              >
                {action.icon ?? <DefaultIcon />}
              </div>
              <div>
                <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                  {action.label}
                </p>
                {action.description && (
                  <p className="mt-0.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {action.description}
                  </p>
                )}
              </div>
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
