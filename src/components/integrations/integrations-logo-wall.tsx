// @version 1.0.0
// @category integrations
// @name integrations-logo-wall
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const LOGO_SIZE = 48;

interface IntegrationLogo {
  name: string;
  src: string;
}

interface IntegrationsLogoWallProps {
  headline?: string;
  description?: string;
  logos: IntegrationLogo[];
  className?: string;
}

export default function IntegrationsLogoWall({
  headline = "Works with your favorite tools",
  description,
  logos,
  className,
}: IntegrationsLogoWallProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby="ilw-heading">
      <div className="mx-auto max-w-4xl text-center">
        <h2 id="ilw-heading" className="font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>
        {description && <p className="mt-3 text-sm" style={{ color: "var(--muted-foreground)" }}>{description}</p>}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
          {logos.map((logo) => (
            <div key={logo.name} className="flex items-center justify-center rounded-xl border p-4 motion-safe:transition-shadow motion-safe:duration-200 motion-safe:hover:shadow-md" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
              <img src={logo.src} alt={logo.name} style={{ width: LOGO_SIZE, height: LOGO_SIZE }} className="object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
