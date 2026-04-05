// @version 1.0.0
// @category error
// @name error-403
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const CODE_SIZE = "clamp(4rem,10vw,7rem)";

interface Error403Props {
  message?: string;
  homeHref?: string;
  className?: string;
}

export default function Error403({
  message = "You don't have permission to access this page.",
  homeHref = "/",
  className,
}: Error403Props) {
  return (
    <section className={cn("flex min-h-[60vh] w-full items-center justify-center", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-md text-center">
        <p className="font-bold tabular-nums" style={{ fontSize: CODE_SIZE, color: "var(--primary)" }}>403</p>
        <h1 className="mt-2 font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>Access Denied</h1>
        <p className="mt-3 text-sm" style={{ color: "var(--muted-foreground)" }}>{message}</p>
        <a
          href={homeHref}
          className="mt-6 inline-block rounded-lg px-6 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--primary-foreground)",
            ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
          }}
        >
          Go Home
        </a>
      </div>
    </section>
  );
}
