// @source 21st.dev/r/reuno-ui/slide-button
"use client";

import { useState, useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type SlideStatus = "idle" | "loading" | "success" | "error";

interface CtaSlideConfirmProps {
  onConfirm?: () => Promise<void> | void;
  label?: string;
  className?: string;
  resolveTo?: "success" | "error";
}

// ---------------------------------------------------------------------------
// Inline SVG icons
// ---------------------------------------------------------------------------

function ArrowIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width={20}
      height={20}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      className="animate-spin motion-reduce:animate-none"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const HANDLE_SIZE = 48;
const DRAG_THRESHOLD = 0.85;

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function CtaSlideConfirm({
  onConfirm,
  label = "Slide to confirm",
  className,
  resolveTo = "success",
}: CtaSlideConfirmProps) {
  const [status, setStatus] = useState<SlideStatus>("idle");
  const trackRef = useRef<HTMLDivElement>(null);
  const [trackWidth, setTrackWidth] = useState(0);

  const x = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 400, damping: 40 });

  const maxDrag = trackWidth - HANDLE_SIZE;

  // Track width measurement
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setTrackWidth(trackRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Progress fill width
  const fillWidth = useTransform(springX, [0, maxDrag || 1], [HANDLE_SIZE, trackWidth || HANDLE_SIZE]);

  // Label opacity fades out as user drags
  const labelOpacity = useTransform(springX, [0, maxDrag * 0.5 || 1], [1, 0]);

  const handleDragEnd = async () => {
    if (status !== "idle") return;

    const currentX = x.get();
    if (currentX >= maxDrag * DRAG_THRESHOLD) {
      // Snap to end
      x.set(maxDrag);
      setStatus("loading");

      try {
        await onConfirm?.();
        setStatus(resolveTo);
      } catch {
        setStatus("error");
      }

      // Reset after showing result
      setTimeout(() => {
        setStatus("idle");
        x.set(0);
      }, 2000);
    } else {
      // Snap back
      x.set(0);
    }
  };

  const handleIcon = () => {
    switch (status) {
      case "loading":
        return <SpinnerIcon />;
      case "success":
        return <CheckIcon />;
      case "error":
        return <XIcon />;
      default:
        return <ArrowIcon />;
    }
  };

  const fillColor = () => {
    switch (status) {
      case "success":
        return "oklch(0.75 0.18 145)";
      case "error":
        return "var(--destructive)";
      default:
        return "var(--primary)";
    }
  };

  return (
    <div
      ref={trackRef}
      className={cn(
        "relative flex h-14 w-full max-w-sm items-center overflow-hidden rounded-full",
        className,
      )}
      style={{
        backgroundColor: "color-mix(in srgb, var(--muted-foreground) 12%, transparent)",
      }}
    >
      {/* Progress fill */}
      <motion.div
        className="pointer-events-none absolute inset-y-0 left-0 rounded-full"
        style={{
          width: fillWidth,
          backgroundColor: fillColor(),
          opacity: 0.2,
        }}
      />

      {/* Label */}
      <motion.span
        className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-medium select-none"
        style={{
          color: "var(--muted-foreground)",
          opacity: labelOpacity,
        }}
      >
        {label}
      </motion.span>

      {/* Draggable handle */}
      <motion.button
        type="button"
        drag={status === "idle" ? "x" : false}
        dragConstraints={{ left: 0, right: maxDrag }}
        dragElastic={0}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        className={cn(
          "relative z-10 flex items-center justify-center rounded-full shadow-md transition-colors motion-reduce:transition-none",
          status !== "idle" && "cursor-default",
          status === "idle" && "cursor-grab active:cursor-grabbing",
        )}
        style={{
          x: springX,
          width: HANDLE_SIZE,
          height: HANDLE_SIZE,
          backgroundColor:
            status === "success"
              ? "oklch(0.75 0.18 145)"
              : status === "error"
                ? "var(--destructive)"
                : "var(--primary)",
          color: "var(--background)",
        }}
      >
        {handleIcon()}
      </motion.button>
    </div>
  );
}
