// @source 21st.dev/r/reapollo/hero-ascii
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface HeroAsciiArtProps {
  title?: string;
  titleSecondLine?: string;
  subtitle?: string;
  brandName?: string;
  brandTagline?: string;
  primaryCta?: string;
  secondaryCta?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

const STARS_BG_STYLE = `
  radial-gradient(1px 1px at 20% 30%, white, transparent),
  radial-gradient(1px 1px at 60% 70%, white, transparent),
  radial-gradient(1px 1px at 50% 50%, white, transparent),
  radial-gradient(1px 1px at 80% 10%, white, transparent),
  radial-gradient(1px 1px at 90% 60%, white, transparent),
  radial-gradient(1px 1px at 33% 80%, white, transparent),
  radial-gradient(1px 1px at 15% 60%, white, transparent),
  radial-gradient(1px 1px at 70% 40%, white, transparent)
`;

const ASCII_ART = `
    *         .        *    .    *
  .    *    .    *         *
       .         *    .        .
    *    .    *         .    *
  .         *    .    *         .
       *         .        *
    .    *    .    *         *    .
  *         .    *    .         *
       .    *         *    .
    *         .    *         .    *
`;

export default function HeroAsciiArt({
  title = "PERFECT",
  titleSecondLine = "PROPORTIONS",
  subtitle = "Where geometry meets humanity — Da Vinci's vision of ideal form",
  brandName = "UIMIX",
  brandTagline = "EST. 2025",
  primaryCta = "GET STARTED",
  secondaryCta = "LEARN MORE",
  onPrimaryClick,
  onSecondaryClick,
  className,
}: HeroAsciiArtProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // ASCII canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const chars = ".·:;+=xX#@";
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const animate = () => {
      const { width, height } = canvas;
      ctx.fillStyle = "rgba(0, 0, 0, 0.95)";
      ctx.fillRect(0, 0, width, height);

      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";

      const cellSize = 12;
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const nx = x / cols;
          const ny = y / rows;
          const wave =
            Math.sin(nx * 6 + time * 0.02) * 0.5 +
            Math.sin(ny * 4 + time * 0.015) * 0.5;
          const normalizedWave = (wave + 1) / 2;
          const charIndex = Math.floor(normalizedWave * (chars.length - 1));
          const char = chars[charIndex];

          ctx.fillText(char, x * cellSize, y * cellSize);
        }
      }

      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {
      animate();
    } else {
      // Static render
      const { width, height } = canvas;
      ctx.fillStyle = "rgba(0, 0, 0, 1)";
      ctx.fillRect(0, 0, width, height);
      ctx.font = "10px monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.06)";
      const cellSize = 12;
      const cols = Math.ceil(width / cellSize);
      const rows = Math.ceil(height / cellSize);
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const charIndex = Math.floor(Math.random() * chars.length);
          ctx.fillText(chars[charIndex], x * cellSize, y * cellSize);
        }
      }
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <main
      className={cn(
        "relative min-h-screen overflow-hidden",
        className
      )}
      style={{ backgroundColor: "var(--background, #000)" }}
    >
      {/* ASCII Canvas Background (Desktop) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full hidden lg:block motion-reduce:hidden"
      />

      {/* Static Stars Background (Mobile) */}
      <div
        className="absolute inset-0 w-full h-full lg:hidden"
        style={{
          backgroundImage: STARS_BG_STYLE,
          backgroundSize:
            "200% 200%, 180% 180%, 250% 250%, 220% 220%, 190% 190%, 240% 240%, 210% 210%, 230% 230%",
          opacity: 0.3,
          backgroundColor: "var(--background, #000)",
        }}
      />

      {/* Top Navigation Bar */}
      <div
        className="absolute top-0 left-0 right-0 z-20"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.2)" }}
      >
        <div className="container mx-auto px-4 lg:px-8 py-3 lg:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 lg:gap-4">
            <div
              className="font-mono text-xl lg:text-2xl font-bold tracking-widest italic transform -skew-x-12"
              style={{ color: "var(--foreground, #fff)" }}
            >
              {brandName}
            </div>
            <div
              className="h-3 lg:h-4 w-px"
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            />
            <span
              className="text-[8px] lg:text-[10px] font-mono"
              style={{ color: "var(--muted-foreground, rgba(255,255,255,0.6))" }}
            >
              {brandTagline}
            </span>
          </div>

          <div
            className="hidden lg:flex items-center gap-3 text-[10px] font-mono"
            style={{ color: "var(--muted-foreground, rgba(255,255,255,0.6))" }}
          >
            <span>LAT: 37.7749&deg;</span>
            <div
              className="w-1 h-1 rounded-full"
              style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
            />
            <span>LONG: 122.4194&deg;</span>
          </div>
        </div>
      </div>

      {/* Corner Decorations */}
      <div
        className="absolute top-0 left-0 w-8 h-8 lg:w-12 lg:h-12 z-20"
        style={{
          borderTop: "2px solid rgba(255,255,255,0.3)",
          borderLeft: "2px solid rgba(255,255,255,0.3)",
        }}
      />
      <div
        className="absolute top-0 right-0 w-8 h-8 lg:w-12 lg:h-12 z-20"
        style={{
          borderTop: "2px solid rgba(255,255,255,0.3)",
          borderRight: "2px solid rgba(255,255,255,0.3)",
        }}
      />
      <div
        className="absolute left-0 w-8 h-8 lg:w-12 lg:h-12 z-20"
        style={{
          bottom: "5vh",
          borderBottom: "2px solid rgba(255,255,255,0.3)",
          borderLeft: "2px solid rgba(255,255,255,0.3)",
        }}
      />
      <div
        className="absolute right-0 w-8 h-8 lg:w-12 lg:h-12 z-20"
        style={{
          bottom: "5vh",
          borderBottom: "2px solid rgba(255,255,255,0.3)",
          borderRight: "2px solid rgba(255,255,255,0.3)",
        }}
      />

      {/* Main Content */}
      <div
        className="relative z-10 flex min-h-screen items-center pt-16 lg:pt-0"
        style={{ marginTop: "5vh" }}
      >
        <div className="container mx-auto px-6 lg:px-16 lg:ml-[10%]">
          <div className="max-w-lg relative">
            {/* Section Number */}
            <div className="flex items-center gap-2 mb-3 opacity-60">
              <div
                className="w-8 h-px"
                style={{ backgroundColor: "var(--foreground, #fff)" }}
              />
              <span
                className="text-[10px] font-mono tracking-wider"
                style={{ color: "var(--foreground, #fff)" }}
              >
                001
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "var(--foreground, #fff)" }}
              />
            </div>

            {/* Title */}
            <div className="relative">
              <div
                className="hidden lg:block absolute -left-3 top-0 bottom-0 w-1 opacity-40"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(255,255,255,0.8) 1px, rgba(255,255,255,0.8) 2px), repeating-linear-gradient(90deg, transparent 0px, transparent 1px, rgba(255,255,255,0.8) 1px, rgba(255,255,255,0.8) 2px)",
                  backgroundSize: "3px 3px",
                }}
              />
              <h1
                className="text-2xl lg:text-5xl font-bold mb-3 lg:mb-4 leading-tight font-mono tracking-wider"
                style={{
                  color: "var(--foreground, #fff)",
                  letterSpacing: "0.1em",
                }}
              >
                {title}
                <span className="block mt-1 lg:mt-2 opacity-90">
                  {titleSecondLine}
                </span>
              </h1>
            </div>

            {/* Dot Separator */}
            <div className="hidden lg:flex gap-1 mb-3 opacity-40">
              {Array.from({ length: 40 }).map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 h-0.5 rounded-full"
                  style={{ backgroundColor: "var(--foreground, #fff)" }}
                />
              ))}
            </div>

            {/* Subtitle */}
            <div className="relative">
              <p
                className="text-xs lg:text-base mb-5 lg:mb-6 leading-relaxed font-mono opacity-80"
                style={{ color: "var(--muted-foreground, #d1d5db)" }}
              >
                {subtitle}
              </p>

              <div
                className="hidden lg:block absolute -right-4 top-1/2 w-3 h-3 opacity-30"
                style={{
                  transform: "translateY(-50%)",
                  border: "1px solid var(--foreground, #fff)",
                }}
              >
                <div
                  className="absolute w-1 h-1"
                  style={{
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "var(--foreground, #fff)",
                  }}
                />
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
              <button
                onClick={onPrimaryClick}
                className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent font-mono text-xs lg:text-sm transition-all duration-200 motion-reduce:transition-none group"
                style={{
                  color: "var(--foreground, #fff)",
                  border: "1px solid var(--foreground, #fff)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--foreground, #fff)";
                  e.currentTarget.style.color = "var(--background, #000)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--foreground, #fff)";
                }}
              >
                <span className="hidden lg:block absolute -top-1 -left-1 w-2 h-2 border-t border-l opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:transition-none" />
                <span className="hidden lg:block absolute -bottom-1 -right-1 w-2 h-2 border-b border-r opacity-0 group-hover:opacity-100 transition-opacity motion-reduce:transition-none" />
                {primaryCta}
              </button>

              <button
                onClick={onSecondaryClick}
                className="relative px-5 lg:px-6 py-2 lg:py-2.5 bg-transparent font-mono text-xs lg:text-sm transition-all duration-200 motion-reduce:transition-none"
                style={{
                  color: "var(--foreground, #fff)",
                  border: "1px solid var(--foreground, #fff)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--foreground, #fff)";
                  e.currentTarget.style.color = "var(--background, #000)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--foreground, #fff)";
                }}
              >
                {secondaryCta}
              </button>
            </div>

            {/* Bottom Line */}
            <div className="hidden lg:flex items-center gap-2 mt-6 opacity-40">
              <span
                className="text-[9px] font-mono"
                style={{ color: "var(--foreground, #fff)" }}
              >
                &#8734;
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: "var(--foreground, #fff)" }}
              />
              <span
                className="text-[9px] font-mono"
                style={{ color: "var(--foreground, #fff)" }}
              >
                VITRUVIAN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div
        className="absolute left-0 right-0 z-20"
        style={{
          bottom: "5vh",
          borderTop: "1px solid rgba(255,255,255,0.2)",
          backgroundColor: "rgba(0,0,0,0.4)",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="container mx-auto px-4 lg:px-8 py-2 lg:py-3 flex items-center justify-between">
          <div
            className="flex items-center gap-3 lg:gap-6 text-[8px] lg:text-[9px] font-mono"
            style={{ color: "var(--muted-foreground, rgba(255,255,255,0.5))" }}
          >
            <span className="hidden lg:inline">SYSTEM.ACTIVE</span>
            <span className="lg:hidden">SYS.ACT</span>
            <div className="hidden lg:flex gap-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1"
                  style={{
                    height: `${Math.floor(Math.random() * 12 + 4)}px`,
                    backgroundColor: "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
            <span>V1.0.0</span>
          </div>

          <div
            className="flex items-center gap-2 lg:gap-4 text-[8px] lg:text-[9px] font-mono"
            style={{ color: "var(--muted-foreground, rgba(255,255,255,0.5))" }}
          >
            <span className="hidden lg:inline">&#9684; RENDERING</span>
            <div className="flex gap-1">
              <div
                className="w-1 h-1 rounded-full animate-pulse motion-reduce:animate-none"
                style={{ backgroundColor: "rgba(255,255,255,0.6)" }}
              />
              <div
                className="w-1 h-1 rounded-full animate-pulse motion-reduce:animate-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.4)",
                  animationDelay: "0.2s",
                }}
              />
              <div
                className="w-1 h-1 rounded-full animate-pulse motion-reduce:animate-none"
                style={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  animationDelay: "0.4s",
                }}
              />
            </div>
            <span className="hidden lg:inline">FRAME: &#8734;</span>
          </div>
        </div>
      </div>
    </main>
  );
}
