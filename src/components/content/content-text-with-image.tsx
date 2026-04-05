// @version 1.0.0
// @category content
// @name Content Text With Image
// @source custom

import Image from "next/image";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HEADING_CLAMP = "clamp(1.5rem, 3vw, 2.5rem)";
const SECTION_PADDING = "py-[clamp(3rem,8vw,6rem)]";
const IMAGE_ASPECT = "aspect-[16/10]";
const COLUMN_GAP = "gap-12 lg:gap-16";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ContentTextWithImageProps {
  headline: string;
  text: string | ReactNode;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: "left" | "right";
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ContentTextWithImage({
  headline,
  text,
  imageSrc,
  imageAlt,
  imagePosition = "right",
  className,
}: ContentTextWithImageProps) {
  const headingId = "content-text-image-heading";
  const isImageLeft = imagePosition === "left";

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        SECTION_PADDING,
        "bg-[var(--background)] text-[var(--foreground)]",
        className,
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={cn(
            "grid grid-cols-1 items-center lg:grid-cols-2",
            COLUMN_GAP,
          )}
        >
          {/* Text column */}
          <div className={cn(isImageLeft && "lg:order-2")}>
            <header>
              <h2
                id={headingId}
                className="font-bold tracking-tight text-[var(--foreground)]"
                style={{ fontSize: HEADING_CLAMP }}
              >
                {headline}
              </h2>
            </header>
            <div className="mt-4 text-base leading-relaxed text-[var(--muted-foreground)]">
              {typeof text === "string" ? <p>{text}</p> : text}
            </div>
          </div>

          {/* Image column */}
          <figure
            className={cn(
              "relative overflow-hidden rounded-2xl",
              isImageLeft && "lg:order-1",
            )}
          >
            <div className={IMAGE_ASPECT}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
