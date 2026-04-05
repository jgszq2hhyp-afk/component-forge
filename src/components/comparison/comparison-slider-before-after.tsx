// @version 1.0.0
// @category comparison
// @name comparison-slider-before-after
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const DEFAULT_POSITION = 50;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ComparisonSliderBeforeAfterProps {
  headline?: string;
  beforeLabel?: string;
  afterLabel?: string;
  beforeSrc: string;
  afterSrc: string;
  beforeAlt?: string;
  afterAlt?: string;
  aspectRatio?: string;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ComparisonSliderBeforeAfter({
  headline,
  beforeLabel = "Before",
  afterLabel = "After",
  beforeSrc,
  afterSrc,
  beforeAlt = "Before image",
  afterAlt = "After image",
  aspectRatio = "16/9",
  className,
}: ComparisonSliderBeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [dragging, setDragging] = useState(false);

  const updatePosition = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPosition((x / rect.width) * 100);
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    setDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
  }, [updatePosition]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragging) return;
    updatePosition(e.clientX);
  }, [dragging, updatePosition]);

  const handlePointerUp = useCallback(() => {
    setDragging(false);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const step = 2;
    if (e.key === "ArrowLeft") setPosition((p) => Math.max(0, p - step));
    else if (e.key === "ArrowRight") setPosition((p) => Math.min(100, p + step));
  }, []);

  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}
      aria-labelledby={headline ? "csba-heading" : undefined}
    >
      <div className="mx-auto max-w-4xl">
        {headline && (
          <h2
            id="csba-heading"
            className="mb-[clamp(2rem,4vw,3rem)] text-center font-bold tracking-tight"
            style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
          >
            {headline}
          </h2>
        )}

        <div
          ref={containerRef}
          className="relative select-none overflow-hidden rounded-xl border"
          style={{ aspectRatio, borderColor: "var(--border)" }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          role="slider"
          aria-label="Comparison slider"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(position)}
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          {/* After (full) */}
          <img
            src={afterSrc}
            alt={afterAlt}
            className="absolute inset-0 size-full object-cover"
            draggable={false}
          />

          {/* Before (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${position}%` }}
          >
            <img
              src={beforeSrc}
              alt={beforeAlt}
              className="absolute inset-0 size-full object-cover"
              style={{ width: containerRef.current?.offsetWidth ?? "100%" }}
              draggable={false}
            />
          </div>

          {/* Slider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5"
            style={{ left: `${position}%`, backgroundColor: "var(--background)" }}
          >
            <div
              className={cn(
                "absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg",
                "motion-safe:transition-transform motion-safe:duration-150",
                dragging && "scale-110",
              )}
              style={{ backgroundColor: "var(--background)" }}
            >
              <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--foreground)" }} aria-hidden="true">
                <path d="M8 3l-5 9 5 9M16 3l5 9-5 9" />
              </svg>
            </div>
          </div>

          {/* Labels */}
          <span
            className="absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
          >
            {beforeLabel}
          </span>
          <span
            className="absolute top-3 right-3 rounded-full px-3 py-1 text-xs font-semibold"
            style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}
          >
            {afterLabel}
          </span>
        </div>
      </div>
    </section>
  );
}
