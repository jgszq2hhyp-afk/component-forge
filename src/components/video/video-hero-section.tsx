// @version 1.0.0
// @category video
// @name VideoHeroSection
// @source custom

"use client";

import { useState, useRef, useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ─── Named Constants ─── */
const DEFAULT_OVERLAY_OPACITY = 0.5;
const MIN_OVERLAY_OPACITY = 0;
const MAX_OVERLAY_OPACITY = 1;
const HEADING_FONT_SIZE = "clamp(2rem, 5vw, 4.5rem)";
const SUBHEADING_FONT_SIZE = "clamp(1rem, 2vw, 1.5rem)";
const SECTION_PADDING_Y = "clamp(4rem, 10vh, 8rem)";
const SECTION_PADDING_X = "clamp(1rem, 5vw, 3rem)";

/* ─── Props ─── */
interface VideoHeroSectionProps {
  videoSrc: string;
  posterSrc?: string;
  headline: string;
  subheadline?: string;
  ctaText?: string;
  ctaHref?: string;
  overlayOpacity?: number;
  className?: string;
}

/* ─── Play/Pause Icon ─── */
function PlayIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={24}
      height={24}
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={24}
      height={24}
      aria-hidden="true"
    >
      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
    </svg>
  );
}

/* ─── Component ─── */
export default function VideoHeroSection({
  videoSrc,
  posterSrc,
  headline,
  subheadline,
  ctaText,
  ctaHref,
  overlayOpacity = DEFAULT_OVERLAY_OPACITY,
  className,
}: VideoHeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const clampedOpacity = Math.min(
    MAX_OVERLAY_OPACITY,
    Math.max(MIN_OVERLAY_OPACITY, overlayOpacity)
  );

  const handleTogglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  }, []);

  return (
    <section
      className={cn(
        "relative flex min-h-[60vh] w-full items-center justify-center overflow-hidden",
        className
      )}
      aria-label={headline}
    >
      {/* Background Video */}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        src={videoSrc}
        poster={posterSrc}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
      />

      {/* Poster fallback for reduced motion */}
      {posterSrc && (
        <img
          src={posterSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block"
        />
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: `color-mix(in oklch, var(--background) ${clampedOpacity * 100}%, transparent)`,
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-10 flex max-w-3xl flex-col items-center gap-6 text-center"
        style={{
          paddingBlock: SECTION_PADDING_Y,
          paddingInline: SECTION_PADDING_X,
        }}
      >
        <h1
          className="font-bold tracking-tight"
          style={{
            fontSize: HEADING_FONT_SIZE,
            color: "var(--foreground)",
          }}
        >
          {headline}
        </h1>

        {subheadline && (
          <p
            className="max-w-xl leading-relaxed"
            style={{
              fontSize: SUBHEADING_FONT_SIZE,
              color: "var(--muted-foreground)",
            }}
          >
            {subheadline}
          </p>
        )}

        {ctaText && (
          <a
            href={ctaHref ?? "#"}
            className={cn(
              "mt-2 inline-flex items-center justify-center rounded-lg px-8 py-3 font-semibold",
              "motion-safe:transition-colors motion-safe:duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            )}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
            }}
          >
            {ctaText}
          </a>
        )}
      </div>

      {/* Play/Pause Toggle */}
      <button
        type="button"
        onClick={handleTogglePlay}
        aria-label={isPlaying ? "Pause background video" : "Play background video"}
        className={cn(
          "absolute bottom-6 right-6 z-20 flex h-12 w-12 items-center justify-center rounded-full",
          "motion-safe:transition-opacity motion-safe:duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
        )}
        style={{
          backgroundColor: "var(--card)",
          color: "var(--foreground)",
          ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
        }}
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
    </section>
  );
}
