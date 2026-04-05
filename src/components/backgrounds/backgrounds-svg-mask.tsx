// @source 21st.dev/r/aceternity/svg-mask-effect
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

/* ------------------------------------------------------------------
 * Types
 * ----------------------------------------------------------------*/

interface MaskContainerProps {
  children?: React.ReactNode;
  revealText?: React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}

interface BackgroundsSvgMaskProps {
  revealContent?: React.ReactNode;
  backgroundContent?: React.ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
}

/* ------------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------*/

const MASK_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSI1MCIgZmlsbD0id2hpdGUiLz48L3N2Zz4=";

/* ------------------------------------------------------------------
 * MaskContainer
 * ----------------------------------------------------------------*/

function MaskContainer({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className,
}: MaskContainerProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState<{
    x: number | null;
    y: number | null;
  }>({
    x: null,
    y: null,
  });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handler = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, []);

  const maskSize = isHovered ? revealSize : size;
  const mx = (mousePosition.x ?? 0) - maskSize / 2;
  const my = (mousePosition.y ?? 0) - maskSize / 2;

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative h-screen w-full transition-colors duration-300 motion-reduce:transition-none",
        className
      )}
      style={{ backgroundColor: "var(--background, #fff)" }}
    >
      {/* Masked reveal layer */}
      <motion.div
        className="absolute inset-0 flex h-full w-full items-center justify-center"
        style={{
          backgroundColor: "var(--foreground, #000)",
          WebkitMaskImage: `url("${MASK_DATA_URL}")`,
          WebkitMaskRepeat: "no-repeat",
          maskImage: `url("${MASK_DATA_URL}")`,
          maskRepeat: "no-repeat",
        }}
        animate={{
          maskPosition: `${mx}px ${my}px`,
          maskSize: `${maskSize}px`,
        } as Record<string, string>}
        transition={{
          maskSize: {
            duration: 0.3,
            ease: "easeInOut" as const,
          },
          maskPosition: {
            duration: 0.05,
            ease: "linear" as const,
          },
        } as Record<string, { duration: number; ease: string }>}
      >
        <div
          className="absolute inset-0 z-0 h-full w-full opacity-50"
          style={{ backgroundColor: "var(--foreground, #000)" }}
        />
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative z-20 mx-auto max-w-4xl text-center text-4xl font-bold"
          style={{ color: "var(--background, #fff)" }}
        >
          {children}
        </div>
      </motion.div>

      {/* Background content (always visible) */}
      <div className="flex h-full w-full items-center justify-center">
        {revealText}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Main Component
 * ----------------------------------------------------------------*/

export default function BackgroundsSvgMask({
  revealContent,
  backgroundContent,
  size = 10,
  revealSize = 600,
  className,
}: BackgroundsSvgMaskProps) {
  return (
    <MaskContainer
      size={size}
      revealSize={revealSize}
      className={className}
      revealText={
        backgroundContent || (
          <div className="mx-auto max-w-4xl text-center">
            <p
              className="text-4xl sm:text-5xl md:text-6xl font-bold"
              style={{
                color: "var(--foreground, #000)",
              }}
            >
              Hover to discover what lies beneath the surface
              <span
                className="block mt-2"
                style={{
                  color: "var(--primary, #3b82f6)",
                }}
              >
                mouse interaction
              </span>
            </p>
            <p
              className="mt-6 text-lg"
              style={{
                color: "var(--muted-foreground, #666)",
              }}
            >
              Hover over this area to reveal the hidden content beneath
            </p>
          </div>
        )
      }
    >
      {revealContent || (
        <div className="mx-auto max-w-4xl">
          <p className="text-4xl sm:text-5xl md:text-6xl font-bold">
            A hidden world revealed through light and motion
            <span className="block mt-2" style={{ color: "var(--ring, #60a5fa)" }}>
              SVG Mask Effect
            </span>
          </p>
          <p className="mt-6 text-lg opacity-70">
            This text is hidden behind the mask. Move your mouse to reveal it.
          </p>
        </div>
      )}
    </MaskContainer>
  );
}
