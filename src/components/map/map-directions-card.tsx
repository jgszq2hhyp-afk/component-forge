// @version 1.0.0
// @category map
// @name map-directions-card
// @source custom

import { cn } from "@/lib/utils";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface DirectionStep {
  icon?: React.ReactNode;
  title: string;
  description: string;
}

interface MapDirectionsCardProps {
  headline?: string;
  address: string;
  directions: DirectionStep[];
  mapsLink?: string;
  className?: string;
}

export default function MapDirectionsCard({
  headline = "How to Get Here",
  address,
  directions,
  mapsLink,
  className,
}: MapDirectionsCardProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-lg">
        <div className="rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
          <h2 className="text-lg font-bold" style={{ color: "var(--foreground)" }}>{headline}</h2>
          <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>{address}</p>

          <div className="mt-5 space-y-4">
            {directions.map((step, i) => (
              <div key={i} className="flex gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-bold" style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)", color: "var(--primary)" }}>
                  {i + 1}
                </div>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{step.title}</p>
                  <p className="mt-0.5 text-xs" style={{ color: "var(--muted-foreground)" }}>{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {mapsLink && (
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline decoration-1 underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded"
              style={{ color: "var(--primary)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
            >
              Open in Maps
              <svg className="size-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" /></svg>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
