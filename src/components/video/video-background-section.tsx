// @version 1.0.0
// @category video
// @name video-background-section
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const MIN_HEIGHT = "clamp(20rem,50vw,32rem)";

interface VideoBackgroundSectionProps { videoSrc: string; headline: string; description?: string; className?: string; }

export default function VideoBackgroundSection({ videoSrc, headline, description, className }: VideoBackgroundSectionProps) {
  return (
    <section className={cn("relative w-full overflow-hidden", className)} style={{ minHeight: MIN_HEIGHT }}>
      <video autoPlay muted loop playsInline className="absolute inset-0 size-full object-cover" aria-hidden="true">
        <source src={videoSrc} />
      </video>
      <div className="absolute inset-0" style={{ background: "linear-gradient(to top, color-mix(in srgb, var(--background) 80%, transparent), color-mix(in srgb, var(--background) 40%, transparent))" }} aria-hidden="true" />
      <div className="relative flex h-full min-h-[inherit] items-center justify-center p-[clamp(2rem,5vw,4rem)] text-center">
        <div className="max-w-2xl">
          <h2 className="font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>
          {description && <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{description}</p>}
        </div>
      </div>
    </section>
  );
}
