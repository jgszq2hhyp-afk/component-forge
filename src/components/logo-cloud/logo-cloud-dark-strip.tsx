// @version 1.0.0
// @category logo-cloud
// @name logo-cloud-dark-strip
// @source custom

import { cn } from "@/lib/utils";

const STRIP_PY = "clamp(1.5rem,3vw,2.5rem)";
const STRIP_PX = "clamp(1rem,4vw,2rem)";
const LOGO_HEIGHT = 24;

interface Logo {
  name: string;
  src: string;
}

interface LogoCloudDarkStripProps {
  logos: Logo[];
  className?: string;
}

export default function LogoCloudDarkStrip({
  logos,
  className,
}: LogoCloudDarkStripProps) {
  return (
    <section
      className={cn("w-full", className)}
      style={{
        padding: `${STRIP_PY} ${STRIP_PX}`,
        backgroundColor: "color-mix(in srgb, var(--foreground) 95%, var(--background))",
      }}
    >
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-10 gap-y-4">
        {logos.map((logo) => (
          <img key={logo.name} src={logo.src} alt={logo.name} className="object-contain brightness-0 invert opacity-50" style={{ height: LOGO_HEIGHT }} />
        ))}
      </div>
    </section>
  );
}
