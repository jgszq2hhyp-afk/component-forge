// @version 2.0.0
// @category gallery
// @name Gallery Before After
// @source custom-implementation

"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const SLIDER_DEFAULT_POSITION = 50; // percent
const SLIDER_STEP = 2; // percent per arrow key press
const SLIDER_MIN = 0;
const SLIDER_MAX = 100;
const HANDLE_SIZE = 40; // px
const HANDLE_ICON_SIZE = 20; // px
const ASPECT_RATIO = "16 / 10";

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface BeforeAfterPair {
  before: { src: string; alt: string; label?: string };
  after: { src: string; alt: string; label?: string };
  title?: string;
}

interface GalleryBeforeAfterProps {
  title?: string;
  subtitle?: string;
  pairs?: BeforeAfterPair[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Default data                                                      */
/* ------------------------------------------------------------------ */

const defaultPairs: BeforeAfterPair[] = [
  {
    before: { src: "/placeholder-before-1.jpg", alt: "Before renovation", label: "Before" },
    after: { src: "/placeholder-after-1.jpg", alt: "After renovation", label: "After" },
    title: "Home Renovation",
  },
  {
    before: { src: "/placeholder-before-2.jpg", alt: "Before redesign", label: "Before" },
    after: { src: "/placeholder-after-2.jpg", alt: "After redesign", label: "After" },
    title: "Website Redesign",
  },
];

/* ------------------------------------------------------------------ */
/*  BeforeAfterSlider                                                 */
/* ------------------------------------------------------------------ */

function BeforeAfterSlider({ pair }: { pair: BeforeAfterPair }) {
  const [position, setPosition] = useState(SLIDER_DEFAULT_POSITION);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percent = Math.max(SLIDER_MIN, Math.min(SLIDER_MAX, (x / rect.width) * SLIDER_MAX));
    setPosition(percent);
  }, []);

  const handleMouseDown = useCallback(() => {
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging) return;
      updatePosition(e.touches[0].clientX);
    },
    [isDragging, updatePosition]
  );

  useEffect(() => {
    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("touchmove", handleTouchMove, { passive: true });
      window.addEventListener("touchend", handleMouseUp);
    }
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp, handleTouchMove]);

  return (
    <figure className="space-y-3">
      {pair.title && (
        <figcaption>
          <h3 className="text-lg font-semibold text-[var(--gallery-title,hsl(0_0%_9%))]">
            {pair.title}
          </h3>
        </figcaption>
      )}
      <div
        ref={containerRef}
        className={cn(
          "relative w-full cursor-col-resize overflow-hidden rounded-xl select-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gallery-ring,hsl(220_90%_56%))] focus-visible:ring-offset-2"
        )}
        style={{ aspectRatio: ASPECT_RATIO }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        role="slider"
        aria-label={`Before and after comparison${pair.title ? `: ${pair.title}` : ""}`}
        aria-valuemin={SLIDER_MIN}
        aria-valuemax={SLIDER_MAX}
        aria-valuenow={Math.round(position)}
        aria-valuetext={`${Math.round(position)}% before image visible`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") setPosition((p) => Math.max(SLIDER_MIN, p - SLIDER_STEP));
          if (e.key === "ArrowRight") setPosition((p) => Math.min(SLIDER_MAX, p + SLIDER_STEP));
        }}
      >
        {/* After Image (background) */}
        <img
          src={pair.after.src}
          alt={pair.after.alt}
          className="absolute inset-0 h-full w-full object-cover"
          draggable={false}
        />

        {/* Before Image (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${SLIDER_MAX - position}% 0 0)` }}
        >
          <img
            src={pair.before.src}
            alt={pair.before.alt}
            className="absolute inset-0 h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* Divider Line */}
        <div
          className="absolute top-0 bottom-0 z-10 w-0.5 bg-[var(--gallery-slider-line,hsl(0_0%_100%))]"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          aria-hidden="true"
        >
          {/* Handle */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full shadow-lg bg-[var(--gallery-slider-handle-bg,hsl(0_0%_100%))] border-2 border-[var(--gallery-slider-handle-border,hsl(0_0%_0%/0.1))]"
            style={{ width: HANDLE_SIZE, height: HANDLE_SIZE }}
          >
            <svg
              width={HANDLE_ICON_SIZE}
              height={HANDLE_ICON_SIZE}
              className="text-[var(--gallery-slider-handle-icon,hsl(0_0%_40%))]"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
            </svg>
          </div>
        </div>

        {/* Labels */}
        {pair.before.label && (
          <span className="absolute top-3 left-3 z-20 rounded-full px-3 py-1 text-xs font-medium bg-[var(--gallery-label-bg,hsl(0_0%_0%/0.6))] text-[var(--gallery-label-text,hsl(0_0%_100%))]" aria-hidden="true">
            {pair.before.label}
          </span>
        )}
        {pair.after.label && (
          <span className="absolute top-3 right-3 z-20 rounded-full px-3 py-1 text-xs font-medium bg-[var(--gallery-label-bg,hsl(0_0%_0%/0.6))] text-[var(--gallery-label-text,hsl(0_0%_100%))]" aria-hidden="true">
            {pair.after.label}
          </span>
        )}
      </div>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function GalleryBeforeAfter({
  title = "Transformations",
  subtitle = "Drag the slider to see the before and after.",
  pairs = defaultPairs,
  className,
}: GalleryBeforeAfterProps) {
  return (
    <section
      className={cn("py-16 sm:py-24 bg-[var(--gallery-bg,hsl(0_0%_100%))]", className)}
      aria-label="Before and after gallery"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {(title || subtitle) && (
          <header className="text-center max-w-2xl mx-auto mb-12">
            {title && (
              <h2 className="font-bold tracking-tight text-[clamp(1.75rem,4vw,2.5rem)] text-[var(--gallery-title,hsl(0_0%_9%))]">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-3 text-base text-[var(--gallery-subtitle,hsl(0_0%_40%))]">
                {subtitle}
              </p>
            )}
          </header>
        )}

        {/* Slider Pairs */}
        <div className={cn("grid gap-8", pairs.length === 1 ? "max-w-3xl mx-auto" : "lg:grid-cols-2")}>
          {pairs.map((pair, index) => (
            <BeforeAfterSlider key={index} pair={pair} />
          ))}
        </div>
      </div>
    </section>
  );
}
