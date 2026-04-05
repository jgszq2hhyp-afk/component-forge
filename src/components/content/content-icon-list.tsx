// @version 1.0.0
// @category content
// @name content-icon-list
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const ICON_SIZE = 40;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface IconListItem {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

interface ContentIconListProps {
  headline?: string;
  items: IconListItem[];
  columns?: 1 | 2;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Default icon                                                       */
/* ------------------------------------------------------------------ */

function DefaultIcon() {
  return (
    <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }} aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContentIconList({
  headline,
  items,
  columns = 1,
  className,
}: ContentIconListProps) {
  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}
      aria-labelledby={headline ? "cil-heading" : undefined}
    >
      <div className="mx-auto max-w-4xl">
        {headline && (
          <h2
            id="cil-heading"
            className="mb-[clamp(2rem,4vw,3rem)] text-center font-bold tracking-tight"
            style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
          >
            {headline}
          </h2>
        )}

        <ul
          className={cn(
            "grid gap-6",
            columns === 2 && "sm:grid-cols-2",
          )}
          role="list"
        >
          {items.map((item) => (
            <li key={item.title} className="flex gap-4">
              <div
                className="flex shrink-0 items-center justify-center rounded-lg"
                style={{
                  width: ICON_SIZE,
                  height: ICON_SIZE,
                  backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
                }}
              >
                {item.icon ?? <DefaultIcon />}
              </div>
              <div>
                <h3 className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                  {item.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
