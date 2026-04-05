// @version 1.0.0
// @category empty-state
// @name empty-state-inbox
// @source custom

import { cn } from "@/lib/utils";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface EmptyStateInboxProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function EmptyStateInbox({
  title = "Inbox zero",
  description = "You're all caught up! No new messages.",
  className,
}: EmptyStateInboxProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-sm text-center">
        <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)" }}>
          <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }} aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
        </div>
        <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{title}</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>{description}</p>
      </div>
    </section>
  );
}
