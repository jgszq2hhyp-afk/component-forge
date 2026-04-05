// @version 1.0.0
// @category video
// @name video-gallery-grid
// @source custom

import { cn } from "@/lib/utils";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface VideoItem { title: string; thumbnailSrc: string; duration?: string; href?: string; }
interface VideoGalleryGridProps { headline?: string; videos: VideoItem[]; className?: string; }

export default function VideoGalleryGrid({ headline, videos, className }: VideoGalleryGridProps) {
  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby={headline ? "vgg-heading" : undefined}>
      <div className="mx-auto max-w-5xl">
        {headline && <h2 id="vgg-heading" className="mb-8 text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>{headline}</h2>}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <article key={v.title} className="group overflow-hidden rounded-xl border" style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}>
              <div className="relative aspect-video">
                <img src={v.thumbnailSrc} alt="" className="size-full object-cover" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex size-12 items-center justify-center rounded-full shadow-lg motion-safe:transition-transform motion-safe:group-hover:scale-110" style={{ backgroundColor: "var(--primary)" }}>
                    <svg className="size-5 translate-x-0.5" viewBox="0 0 24 24" fill="currentColor" style={{ color: "var(--primary-foreground)" }}><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  </div>
                </div>
                {v.duration && (
                  <span className="absolute right-2 bottom-2 rounded px-1.5 py-0.5 text-xs font-medium tabular-nums" style={{ backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)", color: "var(--foreground)" }}>{v.duration}</span>
                )}
              </div>
              <div className="p-3">
                <h3 className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{v.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
