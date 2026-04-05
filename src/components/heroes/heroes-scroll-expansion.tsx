// @source 21st.dev/r/arunachalam0606/scroll-expansion-hero
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Data URIs
// ---------------------------------------------------------------------------

const PLACEHOLDER_IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1920' height='1080'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='%230f0c29'/%3E%3Cstop offset='50%25' stop-color='%23302b63'/%3E%3Cstop offset='100%25' stop-color='%2324243e'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='1920' height='1080' fill='url(%23g)'/%3E%3Ctext x='960' y='540' font-family='sans-serif' font-size='48' fill='white' text-anchor='middle' dominant-baseline='middle' opacity='0.3'%3EMedia Placeholder%3C/text%3E%3C/svg%3E";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type MediaType = "youtube" | "video" | "image";

interface ScrollExpansionHeroProps {
  mediaType?: MediaType;
  mediaSrc?: string;
  title?: string;
  subtitle?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

function getYouTubeEmbedUrl(url: string): string {
  const regExp = /^.*(?:youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[1]
    ? `https://www.youtube.com/embed/${match[1]}?autoplay=1&mute=1&loop=1&playlist=${match[1]}&controls=0&showinfo=0`
    : url;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const SCROLL_MULTIPLIER = 3;
const TOUCH_MULTIPLIER = 2.5;
const WHEEL_THRESHOLD = 800;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ScrollExpansionHero({
  mediaType = "image",
  mediaSrc = PLACEHOLDER_IMG,
  title = "Expand Your Vision",
  subtitle = "Scroll down to reveal the full experience",
  className,
}: ScrollExpansionHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const touchStartY = useRef<number>(0);
  const accumulatedDelta = useRef<number>(0);
  const isExpanding = useRef(false);

  // 0 = collapsed, 1 = fully expanded
  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, {
    stiffness: 100,
    damping: 30,
    mass: 0.8,
  });

  // Derived transforms
  const width = useTransform(springProgress, [0, 1], ["60%", "100vw"]);
  const height = useTransform(springProgress, [0, 1], ["50vh", "100vh"]);
  const borderRadius = useTransform(springProgress, [0, 1], [24, 0]);
  const scale = useTransform(springProgress, [0, 0.5, 1], [0.9, 0.95, 1]);
  const textOpacity = useTransform(springProgress, [0, 0.3], [1, 0]);
  const textY = useTransform(springProgress, [0, 0.3], [0, -60]);

  const [isFullyExpanded, setIsFullyExpanded] = useState(false);

  // Track expansion state
  useEffect(() => {
    const unsubscribe = springProgress.on("change", (val) => {
      setIsFullyExpanded(val >= 0.98);
    });
    return unsubscribe;
  }, [springProgress]);

  // ---------- Wheel handling ----------
  const handleWheel = useCallback(
    (e: WheelEvent) => {
      const current = progress.get();

      // If fully expanded and scrolling down, allow normal scroll
      if (current >= 1 && e.deltaY > 0) return;

      // If at top and scrolling up, allow collapse
      if (current <= 0 && e.deltaY < 0) return;

      // Prevent default scroll during expansion
      if (current > 0 && current < 1) {
        e.preventDefault();
      }

      // Begin expansion on first scroll down when collapsed
      if (current === 0 && e.deltaY > 0) {
        e.preventDefault();
        isExpanding.current = true;
      }

      if (isExpanding.current || current > 0) {
        e.preventDefault();
        accumulatedDelta.current += e.deltaY;
        const newProgress = clamp(
          accumulatedDelta.current / WHEEL_THRESHOLD,
          0,
          1
        );
        progress.set(newProgress);

        if (newProgress <= 0) {
          isExpanding.current = false;
          accumulatedDelta.current = 0;
        }
      }
    },
    [progress]
  );

  // ---------- Touch handling ----------
  const handleTouchStart = useCallback((e: TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  }, []);

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      const current = progress.get();
      const touchDelta = touchStartY.current - e.touches[0].clientY;

      if (current >= 1 && touchDelta > 0) return;
      if (current <= 0 && touchDelta < 0) return;

      if (current > 0 && current < 1) {
        e.preventDefault();
      }

      if (current === 0 && touchDelta > 0) {
        e.preventDefault();
        isExpanding.current = true;
      }

      if (isExpanding.current || current > 0) {
        e.preventDefault();
        accumulatedDelta.current += touchDelta * TOUCH_MULTIPLIER;
        touchStartY.current = e.touches[0].clientY;
        const newProgress = clamp(
          accumulatedDelta.current / WHEEL_THRESHOLD,
          0,
          1
        );
        progress.set(newProgress);

        if (newProgress <= 0) {
          isExpanding.current = false;
          accumulatedDelta.current = 0;
        }
      }
    },
    [progress]
  );

  const handleTouchEnd = useCallback(() => {
    // Snap to nearest state
    const current = progress.get();
    if (current > 0.5) {
      progress.set(1);
      accumulatedDelta.current = WHEEL_THRESHOLD;
    } else {
      progress.set(0);
      accumulatedDelta.current = 0;
      isExpanding.current = false;
    }
  }, [progress]);

  // ---------- Keyboard handling ----------
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === " ") {
        const current = progress.get();
        if (current < 1) {
          e.preventDefault();
          accumulatedDelta.current = Math.min(
            accumulatedDelta.current + WHEEL_THRESHOLD * 0.15 * SCROLL_MULTIPLIER,
            WHEEL_THRESHOLD
          );
          progress.set(
            clamp(accumulatedDelta.current / WHEEL_THRESHOLD, 0, 1)
          );
          isExpanding.current = true;
        }
      }
      if (e.key === "ArrowUp") {
        const current = progress.get();
        if (current > 0) {
          e.preventDefault();
          accumulatedDelta.current = Math.max(
            accumulatedDelta.current - WHEEL_THRESHOLD * 0.15 * SCROLL_MULTIPLIER,
            0
          );
          progress.set(
            clamp(accumulatedDelta.current / WHEEL_THRESHOLD, 0, 1)
          );
          if (accumulatedDelta.current <= 0) {
            isExpanding.current = false;
          }
        }
      }
      if (e.key === "Escape") {
        progress.set(0);
        accumulatedDelta.current = 0;
        isExpanding.current = false;
      }
    },
    [progress]
  );

  // ---------- Attach listeners ----------
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    container.addEventListener("touchmove", handleTouchMove, {
      passive: false,
    });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd, handleKeyDown]);

  // ---------- Media rendering ----------
  const mediaContent = useMemo(() => {
    switch (mediaType) {
      case "youtube":
        return (
          <iframe
            src={getYouTubeEmbedUrl(mediaSrc)}
            className="pointer-events-none size-full object-cover"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="Hero video"
          />
        );
      case "video":
        return (
          <video
            src={mediaSrc}
            className="size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          />
        );
      case "image":
      default:
        return (
          <img
            src={mediaSrc}
            alt="Hero media"
            className="size-full object-cover"
          />
        );
    }
  }, [mediaType, mediaSrc]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-black",
        className
      )}
    >
      {/* Parallax text */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 top-[15%] z-10 flex flex-col items-center gap-4 px-4 text-center"
        style={{ opacity: textOpacity, y: textY }}
      >
        <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {title}
        </h1>
        <p className="max-w-xl text-lg text-white/60 sm:text-xl">
          {subtitle}
        </p>

        {/* Scroll indicator */}
        <motion.div
          className="motion-reduce:hidden mt-8 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm text-white/40">Scroll to expand</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-white/40"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Expanding media container */}
      <motion.div
        ref={mediaRef}
        className="relative overflow-hidden shadow-2xl"
        style={{
          width,
          height,
          borderRadius,
          scale,
        }}
      >
        {mediaContent}

        {/* Gradient overlays */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          style={{ opacity: useTransform(springProgress, [0.5, 1], [1, 0]) }}
        />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </div>
  );
}
