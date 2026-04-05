// @version 1.0.0
// @category video
// @name VideoFeatureShowcase
// @source custom

"use client";

import { useRef, useState, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ─── Named Constants ─── */
const HEADING_FONT_SIZE = "clamp(1.75rem, 4vw, 3rem)";
const FEATURE_TITLE_FONT_SIZE = "clamp(1rem, 1.5vw, 1.25rem)";
const SECTION_PADDING_Y = "clamp(3rem, 8vh, 6rem)";
const SECTION_PADDING_X = "clamp(1rem, 5vw, 3rem)";
const VIDEO_BORDER_RADIUS = "0.75rem";
const ICON_SIZE = "2.5rem";
const FEATURE_GAP = "1.5rem";

/* ─── Props ─── */
interface Feature {
  title: string;
  description: string;
  icon?: ReactNode;
}

interface VideoFeatureShowcaseProps {
  videoSrc: string;
  posterSrc?: string;
  features: Feature[];
  headline?: string;
  videoPosition?: "left" | "right";
  className?: string;
}

/* ─── Fallback Icon ─── */
function CheckCircleIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={20}
      height={20}
      aria-hidden="true"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

/* ─── Component ─── */
export default function VideoFeatureShowcase({
  videoSrc,
  posterSrc,
  features,
  headline,
  videoPosition = "left",
  className,
}: VideoFeatureShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasError, setHasError] = useState(false);

  const handleVideoError = useCallback(() => {
    setHasError(true);
  }, []);

  const isVideoLeft = videoPosition === "left";

  /* ─── Video Panel ─── */
  const videoPanel = (
    <div className="flex-1">
      <div
        className="relative overflow-hidden"
        style={{ borderRadius: VIDEO_BORDER_RADIUS }}
      >
        {!hasError ? (
          <video
            ref={videoRef}
            className="aspect-video w-full object-cover motion-reduce:hidden"
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            loop
            muted
            playsInline
            onError={handleVideoError}
            aria-label="Feature showcase video"
          />
        ) : null}

        {/* Poster fallback for reduced motion or error */}
        {posterSrc && (
          <img
            src={posterSrc}
            alt="Feature showcase preview"
            className={cn(
              "aspect-video w-full object-cover",
              hasError ? "block" : "hidden motion-reduce:block"
            )}
            style={{ borderRadius: VIDEO_BORDER_RADIUS }}
          />
        )}

        {/* Fallback when no poster and video errored */}
        {hasError && !posterSrc && (
          <div
            className="flex aspect-video w-full items-center justify-center"
            style={{
              backgroundColor: "var(--muted-foreground)",
              borderRadius: VIDEO_BORDER_RADIUS,
              opacity: 0.1,
            }}
            aria-hidden="true"
          >
            <span
              style={{
                color: "var(--muted-foreground)",
                fontSize: FEATURE_TITLE_FONT_SIZE,
              }}
            >
              Video unavailable
            </span>
          </div>
        )}
      </div>
    </div>
  );

  /* ─── Features Panel ─── */
  const featuresPanel = (
    <div className="flex flex-1 flex-col justify-center">
      {headline && (
        <h2
          className="mb-8 font-bold tracking-tight"
          style={{
            fontSize: HEADING_FONT_SIZE,
            color: "var(--foreground)",
          }}
        >
          {headline}
        </h2>
      )}

      <ul
        className="flex flex-col"
        style={{ gap: FEATURE_GAP }}
        role="list"
      >
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-4">
            {/* Icon */}
            <div
              className="flex flex-shrink-0 items-center justify-center rounded-lg"
              style={{
                width: ICON_SIZE,
                height: ICON_SIZE,
                backgroundColor: "var(--accent)",
                color: "var(--primary)",
              }}
              aria-hidden="true"
            >
              {feature.icon ?? <CheckCircleIcon />}
            </div>

            {/* Text */}
            <div className="flex flex-col gap-1">
              <h3
                className="font-semibold"
                style={{
                  fontSize: FEATURE_TITLE_FONT_SIZE,
                  color: "var(--foreground)",
                }}
              >
                {feature.title}
              </h3>
              <p
                className="leading-relaxed"
                style={{
                  color: "var(--muted-foreground)",
                  fontSize: "0.9375rem",
                }}
              >
                {feature.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <section
      className={cn("w-full", className)}
      style={{
        paddingBlock: SECTION_PADDING_Y,
        paddingInline: SECTION_PADDING_X,
      }}
      aria-label={headline ?? "Feature showcase"}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl flex-col gap-12 lg:flex-row lg:items-center",
          isVideoLeft ? "lg:flex-row" : "lg:flex-row-reverse"
        )}
      >
        {videoPanel}
        {featuresPanel}
      </div>
    </section>
  );
}
