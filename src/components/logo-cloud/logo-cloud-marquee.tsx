// @version 1.0.0
// @category logo-cloud
// @name logo-cloud-marquee
// @source custom

import { cn } from "@/lib/utils";

const SECTION_PY = "clamp(2rem,5vw,4rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const LOGO_HEIGHT = 32;

interface Logo {
  name: string;
  src: string;
}

interface LogoCloudMarqueeProps {
  logos: Logo[];
  speed?: number;
  className?: string;
}

export default function LogoCloudMarquee({
  logos,
  speed = 30,
  className,
}: LogoCloudMarqueeProps) {
  const duplicated = [...logos, ...logos];

  return (
    <section className={cn("w-full overflow-hidden", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div
        className="flex gap-12 motion-safe:animate-[marquee_var(--speed)_linear_infinite] motion-reduce:flex-wrap motion-reduce:justify-center"
        style={{ ["--speed" as string]: `${speed}s` }}
      >
        {duplicated.map((logo, i) => (
          <img
            key={`${logo.name}-${i}`}
            src={logo.src}
            alt={logo.name}
            className="shrink-0 object-contain opacity-60 grayscale motion-safe:transition-opacity motion-safe:hover:opacity-100 motion-safe:hover:grayscale-0"
            style={{ height: LOGO_HEIGHT }}
          />
        ))}
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
