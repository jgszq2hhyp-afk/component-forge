// @version 1.0.0
// @category logo-cloud
// @name logo-cloud-with-text
// @source custom

import { cn } from "@/lib/utils";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const LOGO_HEIGHT = 28;

interface Logo {
  name: string;
  src: string;
}

interface LogoCloudWithTextProps {
  headline?: string;
  logos: Logo[];
  className?: string;
}

export default function LogoCloudWithText({
  headline = "Trusted by leading companies",
  logos,
  className,
}: LogoCloudWithTextProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-4xl text-center">
        <p className="mb-6 text-sm font-medium uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>{headline}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6">
          {logos.map((logo) => (
            <img key={logo.name} src={logo.src} alt={logo.name} className="object-contain opacity-50 grayscale" style={{ height: LOGO_HEIGHT }} />
          ))}
        </div>
      </div>
    </section>
  );
}
