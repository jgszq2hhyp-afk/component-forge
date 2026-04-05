// @source 21st.dev/r/Mazyar%20kawa/location-map

"use client";

import type React from "react";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MapLocationCardProps {
  location?: string;
  coordinates?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function MapLocationCard({
  location = "San Francisco, CA",
  coordinates = "37.7749\u00B0 N, 122.4194\u00B0 W",
  className,
}: MapLocationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-50, 50], [8, -8]);
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8]);

  const springRotateX = useSpring(rotateX, {
    stiffness: 300,
    damping: 30,
  } as const);
  const springRotateY = useSpring(rotateY, {
    stiffness: 300,
    damping: 30,
  } as const);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      ref={containerRef}
      className={cn("relative cursor-pointer select-none", className)}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl border"
        style={{
          rotateX: springRotateX,
          rotateY: springRotateY,
          transformStyle: "preserve-3d" as const,
          backgroundColor: "var(--background)",
          borderColor: "var(--border)",
        }}
        animate={{
          width: isExpanded ? 360 : 240,
          height: isExpanded ? 280 : 140,
        }}
        transition={{
          type: "spring" as const,
          stiffness: 400,
          damping: 35,
        }}
      >
        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, color-mix(in oklch, var(--muted-foreground) 5%, transparent), color-mix(in oklch, var(--muted-foreground) 10%, transparent))",
          }}
        />

        {/* Expanded map view */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="pointer-events-none absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              {/* Map background */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{ backgroundColor: "var(--muted-foreground)", opacity: 0.15 }}
              />

              {/* Grid lines (streets) */}
              <svg
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                {/* Major horizontal lines */}
                <motion.line
                  x1="0%"
                  y1="35%"
                  x2="100%"
                  y2="35%"
                  stroke="var(--foreground)"
                  strokeOpacity="0.25"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <motion.line
                  x1="0%"
                  y1="65%"
                  x2="100%"
                  y2="65%"
                  stroke="var(--foreground)"
                  strokeOpacity="0.25"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                />
                {/* Major vertical lines */}
                <motion.line
                  x1="30%"
                  y1="0%"
                  x2="30%"
                  y2="100%"
                  stroke="var(--foreground)"
                  strokeOpacity="0.2"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                />
                <motion.line
                  x1="70%"
                  y1="0%"
                  x2="70%"
                  y2="100%"
                  stroke="var(--foreground)"
                  strokeOpacity="0.2"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                />
                {/* Minor horizontal lines */}
                {[20, 50, 80].map((y, i) => (
                  <motion.line
                    key={`h-${i}`}
                    x1="0%"
                    y1={`${y}%`}
                    x2="100%"
                    y2={`${y}%`}
                    stroke="var(--foreground)"
                    strokeOpacity="0.1"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                  />
                ))}
                {/* Minor vertical lines */}
                {[15, 45, 55, 85].map((x, i) => (
                  <motion.line
                    key={`v-${i}`}
                    x1={`${x}%`}
                    y1="0%"
                    x2={`${x}%`}
                    y2="100%"
                    stroke="var(--foreground)"
                    strokeOpacity="0.1"
                    strokeWidth="1.5"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.7 + i * 0.1 }}
                  />
                ))}
              </svg>

              {/* Building blocks */}
              {[
                {
                  top: "40%",
                  left: "10%",
                  h: "20%",
                  w: "15%",
                  delay: 0.5,
                  opacity: 0.3,
                },
                {
                  top: "15%",
                  left: "35%",
                  h: "15%",
                  w: "12%",
                  delay: 0.6,
                  opacity: 0.25,
                },
                {
                  top: "70%",
                  left: "75%",
                  h: "18%",
                  w: "18%",
                  delay: 0.7,
                  opacity: 0.28,
                },
                {
                  top: "20%",
                  right: "10%",
                  h: "25%",
                  w: "10%",
                  delay: 0.55,
                  opacity: 0.22,
                },
                {
                  top: "55%",
                  left: "5%",
                  h: "12%",
                  w: "8%",
                  delay: 0.65,
                  opacity: 0.2,
                },
                {
                  top: "8%",
                  left: "75%",
                  h: "10%",
                  w: "14%",
                  delay: 0.75,
                  opacity: 0.22,
                },
              ].map((block, i) => (
                <motion.div
                  key={`block-${i}`}
                  className="absolute rounded-sm border"
                  style={{
                    top: block.top,
                    left: "left" in block ? block.left : undefined,
                    right: "right" in block ? block.right : undefined,
                    height: block.h,
                    width: block.w,
                    backgroundColor: `color-mix(in oklch, var(--muted-foreground) ${Math.round(block.opacity * 100)}%, transparent)`,
                    borderColor: `color-mix(in oklch, var(--muted-foreground) ${Math.round(block.opacity * 60)}%, transparent)`,
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: block.delay }}
                />
              ))}

              {/* Center pin marker */}
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0, y: -20 }}
                animate={{ scale: 1, y: 0 }}
                transition={{
                  type: "spring" as const,
                  stiffness: 400,
                  damping: 20,
                  delay: 0.3,
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="drop-shadow-lg"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(52, 211, 153, 0.5))",
                  }}
                >
                  <path
                    d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                    fill="#34D399"
                  />
                  <circle
                    cx="12"
                    cy="9"
                    r="2.5"
                    fill="var(--background)"
                  />
                </svg>
              </motion.div>

              {/* Gradient fade at bottom */}
              <div
                className="absolute inset-0 opacity-60"
                style={{
                  background:
                    "linear-gradient(to top, var(--background), transparent, transparent)",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle grid pattern (collapsed state) */}
        <motion.div
          className="absolute inset-0 opacity-[0.03]"
          animate={{ opacity: isExpanded ? 0 : 0.03 }}
          transition={{ duration: 0.3 }}
        >
          <svg width="100%" height="100%" className="absolute inset-0">
            <defs>
              <pattern
                id="location-grid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke="var(--foreground)"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#location-grid)" />
          </svg>
        </motion.div>

        {/* Content overlay */}
        <div className="relative z-10 flex h-full flex-col justify-between p-5">
          {/* Top row */}
          <div className="flex items-start justify-between">
            {/* Map icon */}
            <div className="relative">
              <motion.div
                className="relative"
                animate={{ opacity: isExpanded ? 0 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-emerald-400"
                  animate={{
                    filter: isHovered
                      ? "drop-shadow(0 0 8px rgba(52, 211, 153, 0.6))"
                      : "drop-shadow(0 0 4px rgba(52, 211, 153, 0.3))",
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
                  <line x1="9" x2="9" y1="3" y2="18" />
                  <line x1="15" x2="15" y1="6" y2="21" />
                </motion.svg>
              </motion.div>
            </div>

            {/* Live badge */}
            <motion.div
              className="flex items-center gap-1.5 rounded-full px-2 py-1 backdrop-blur-sm"
              style={{
                backgroundColor: "color-mix(in oklch, var(--foreground) 5%, transparent)",
              }}
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span
                className="text-[10px] font-medium uppercase tracking-wide"
                style={{ color: "var(--muted-foreground)" }}
              >
                Live
              </span>
            </motion.div>
          </div>

          {/* Bottom info */}
          <div className="space-y-1">
            <motion.h3
              className="text-sm font-medium tracking-tight"
              style={{ color: "var(--foreground)" }}
              animate={{ x: isHovered ? 4 : 0 }}
              transition={{
                type: "spring" as const,
                stiffness: 400,
                damping: 25,
              }}
            >
              {location}
            </motion.h3>

            <AnimatePresence>
              {isExpanded && (
                <motion.p
                  className="font-mono text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                  initial={{ opacity: 0, y: -10, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -10, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {coordinates}
                </motion.p>
              )}
            </AnimatePresence>

            <motion.div
              className="h-px"
              style={{
                background:
                  "linear-gradient(to right, rgba(52, 211, 153, 0.5), rgba(52, 211, 153, 0.3), transparent)",
              }}
              initial={{ scaleX: 0, originX: 0 }}
              animate={{
                scaleX: isHovered || isExpanded ? 1 : 0.3,
              }}
              transition={{ duration: 0.4, ease: "easeOut" as const }}
            />
          </div>
        </div>
      </motion.div>

      {/* Hint text */}
      <motion.p
        className="absolute -bottom-6 left-1/2 whitespace-nowrap text-[10px]"
        style={{
          color: "var(--muted-foreground)",
          x: "-50%",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: isHovered && !isExpanded ? 1 : 0,
          y: isHovered ? 0 : 4,
        }}
        transition={{ duration: 0.2 }}
      >
        Click to expand
      </motion.p>
    </motion.div>
  );
}
