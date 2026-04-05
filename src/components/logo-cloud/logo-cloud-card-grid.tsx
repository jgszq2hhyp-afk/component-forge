// @version 1.0.0
// @category logo-cloud
// @name logo-cloud-card-grid
// @source custom

import { cn } from "@/lib/utils";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const LOGO_SIZE = 48;

interface Logo {
  name: string;
  src: string;
}

interface LogoCloudCardGridProps {
  headline?: string;
  logos: Logo[];
  className?: string;
}

export default function LogoCloudCardGrid({
  headline,
  logos,
  className,
}: LogoCloudCardGridProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby={headline ? "lccg-heading" : undefined}>
      <div className="mx-auto max-w-4xl">
        {headline && (
          <h2 id="lccg-heading" className="mb-8 text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>
        )}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {logos.map((logo) => (
            <div key={logo.name} className="flex flex-col items-center gap-2 rounded-xl border p-5 motion-safe:transition-shadow motion-safe:duration-200 motion-safe:hover:shadow-md" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
              <img src={logo.src} alt={logo.name} className="object-contain" style={{ width: LOGO_SIZE, height: LOGO_SIZE }} />
              <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
