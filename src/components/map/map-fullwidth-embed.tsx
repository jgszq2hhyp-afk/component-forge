// @version 1.0.0
// @category map
// @name map-fullwidth-embed
// @source custom

import { cn } from "@/lib/utils";

const MAP_HEIGHT = "clamp(16rem,40vw,28rem)";

interface MapFullwidthEmbedProps {
  embedUrl: string;
  title?: string;
  className?: string;
}

export default function MapFullwidthEmbed({
  embedUrl,
  title = "Location map",
  className,
}: MapFullwidthEmbedProps) {
  return (
    <section className={cn("w-full", className)}>
      <iframe
        src={embedUrl}
        title={title}
        className="w-full border-0"
        style={{ height: MAP_HEIGHT }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
