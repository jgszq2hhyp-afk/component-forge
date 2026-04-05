"use client";
// @source 21st.dev/r/paceui/dot-loader
// 7x7 dot matrix loader with frame-based animation

import { useEffect, useRef, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Default frames: spinning line pattern                             */
/* ------------------------------------------------------------------ */

/**
 * Each frame is a flat array of dot indices (0-48) that should be active.
 * The grid is 7x7 = 49 dots, numbered left-to-right, top-to-bottom.
 */
const idx = (row: number, col: number) => row * 7 + col;

const DEFAULT_FRAMES: number[][] = [
  // vertical bar center
  [idx(0, 3), idx(1, 3), idx(2, 3), idx(3, 3), idx(4, 3), idx(5, 3), idx(6, 3)],
  // diagonal ↘
  [idx(0, 5), idx(1, 4), idx(2, 4), idx(3, 3), idx(4, 2), idx(5, 2), idx(6, 1)],
  // horizontal bar center
  [idx(3, 0), idx(3, 1), idx(3, 2), idx(3, 3), idx(3, 4), idx(3, 5), idx(3, 6)],
  // diagonal ↙
  [idx(0, 1), idx(1, 2), idx(2, 2), idx(3, 3), idx(4, 4), idx(5, 4), idx(6, 5)],
  // growing square step 1 (center dot)
  [idx(3, 3)],
  // growing square step 2
  [idx(2, 2), idx(2, 3), idx(2, 4), idx(3, 2), idx(3, 4), idx(4, 2), idx(4, 3), idx(4, 4)],
  // growing square step 3
  [
    idx(1, 1), idx(1, 2), idx(1, 3), idx(1, 4), idx(1, 5),
    idx(2, 1), idx(2, 5),
    idx(3, 1), idx(3, 5),
    idx(4, 1), idx(4, 5),
    idx(5, 1), idx(5, 2), idx(5, 3), idx(5, 4), idx(5, 5),
  ],
  // growing square step 4 (full border)
  [
    idx(0, 0), idx(0, 1), idx(0, 2), idx(0, 3), idx(0, 4), idx(0, 5), idx(0, 6),
    idx(1, 0), idx(1, 6),
    idx(2, 0), idx(2, 6),
    idx(3, 0), idx(3, 6),
    idx(4, 0), idx(4, 6),
    idx(5, 0), idx(5, 6),
    idx(6, 0), idx(6, 1), idx(6, 2), idx(6, 3), idx(6, 4), idx(6, 5), idx(6, 6),
  ],
];

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface LoadingDotMatrixProps {
  /** Array of frames; each frame is a number[] of active dot indices (0-48). */
  frames?: number[][];
  /** Duration per frame in ms. @default 200 */
  duration?: number;
  /** Whether the animation is playing. @default true */
  isPlaying?: boolean;
  /** Number of times to loop. 0 = infinite. @default 0 */
  repeatCount?: number;
  /** Extra className for individual dots. */
  dotClassName?: string;
  /** Extra className for the grid wrapper. */
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function LoadingDotMatrix({
  frames = DEFAULT_FRAMES,
  duration = 200,
  isPlaying = true,
  repeatCount = 0,
  dotClassName,
  className,
}: LoadingDotMatrixProps) {
  const [frameIdx, setFrameIdx] = useState(0);
  const loopsRef = useRef(0);
  const totalFrames = frames.length;

  /* Check prefers-reduced-motion at runtime */
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
  }, []);

  /* Frame stepper */
  useEffect(() => {
    if (!isPlaying || totalFrames === 0) return;

    // If reduced motion, just show first frame
    if (prefersReducedMotion.current) return;

    const timer = setInterval(() => {
      setFrameIdx((prev) => {
        const next = (prev + 1) % totalFrames;
        if (next === 0) {
          loopsRef.current += 1;
          if (repeatCount > 0 && loopsRef.current >= repeatCount) {
            clearInterval(timer);
            return prev; // stay on last frame
          }
        }
        return next;
      });
    }, duration);

    return () => clearInterval(timer);
  }, [isPlaying, duration, totalFrames, repeatCount]);

  /* Reset loop counter when frames change */
  useEffect(() => {
    loopsRef.current = 0;
    setFrameIdx(0);
  }, [frames]);

  const activeSet = new Set(frames[frameIdx] ?? []);

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("inline-grid grid-cols-7 gap-1.5", className)}
    >
      {Array.from({ length: 49 }, (_, i) => {
        const isActive = activeSet.has(i);
        return (
          <span
            key={i}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition-colors duration-150",
              "motion-reduce:transition-none",
              dotClassName
            )}
            style={{
              backgroundColor: isActive
                ? "var(--primary)"
                : "var(--muted-foreground)",
              opacity: isActive ? 1 : 0.2,
            }}
          />
        );
      })}
      <span className="sr-only">Loading...</span>
    </div>
  );
}
