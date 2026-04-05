// @version 1.0.0
// @category video
// @name video-inline-player
// @source custom

import { cn } from "@/lib/utils";

interface VideoInlinePlayerProps { src: string; poster?: string; title?: string; aspectRatio?: string; className?: string; }

export default function VideoInlinePlayer({ src, poster, title = "Video", aspectRatio = "16/9", className }: VideoInlinePlayerProps) {
  return (
    <div className={cn("overflow-hidden rounded-xl border", className)} style={{ borderColor: "var(--border)", aspectRatio }}>
      <video src={src} poster={poster} controls className="size-full object-cover" title={title} preload="metadata">
        <track kind="captions" />
      </video>
    </div>
  );
}
