// @source 21st.dev/r/linarui/sparkles (variant: with-progressive-blur-and-slider)
"use client";

import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
 * Types
 * ----------------------------------------------------------------*/

interface Particle {
  id: string;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  angle: number;
  opacityDirection: 1 | -1;
}

interface SparklesProps {
  className?: string;
  particleCount?: number;
  minSize?: number;
  maxSize?: number;
  speed?: number;
  color?: string;
  opacitySpeed?: number;
}

interface ProgressiveBlurProps {
  direction?: "top" | "right" | "bottom" | "left";
  blurLayers?: number;
  blurIntensity?: number;
  className?: string;
}

interface BackgroundSparklesProps {
  className?: string;
  particleCount?: number;
  speed?: number;
  color?: string;
  showSlider?: boolean;
  showBlur?: boolean;
  blurDirection?: "top" | "right" | "bottom" | "left";
  blurIntensity?: number;
  children?: React.ReactNode;
}

/* ------------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------*/

const GRADIENT_ANGLES: Record<string, number> = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
};

/* ------------------------------------------------------------------
 * ProgressiveBlur
 * ----------------------------------------------------------------*/

function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 8,
  blurIntensity = 0.25,
  className,
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2);
  const segmentSize = 1 / (blurLayers + 1);

  return (
    <div className={cn("relative", className)}>
      {Array.from({ length: layers }).map((_, index) => {
        const angle = GRADIENT_ANGLES[direction] ?? 180;
        const gradientStops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map(
          (pos, posIndex) =>
            `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`
        );

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(", ")})`;

        return (
          <div
            key={index}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${index * blurIntensity}px)`,
            }}
          />
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------
 * Sparkles (Canvas-based, no tsparticles dependency)
 * ----------------------------------------------------------------*/

function Sparkles({
  className,
  particleCount = 120,
  minSize = 0.4,
  maxSize = 1.2,
  speed = 0.3,
  color = "#FFFFFF",
  opacitySpeed = 0.02,
}: SparklesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const id = useId();

  const createParticle = useCallback(
    (width: number, height: number): Particle => ({
      id: Math.random().toString(36).slice(2, 9),
      x: Math.random() * width,
      y: Math.random() * height,
      size: minSize + Math.random() * (maxSize - minSize),
      opacity: Math.random(),
      speed: (speed / 10 + Math.random() * speed) * 0.5,
      angle: Math.random() * Math.PI * 2,
      opacityDirection: Math.random() > 0.5 ? 1 : -1,
    }),
    [minSize, maxSize, speed]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize particles
    const rect = canvas.getBoundingClientRect();
    particlesRef.current = Array.from({ length: particleCount }, () =>
      createParticle(rect.width, rect.height)
    );

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      particlesRef.current.forEach((p) => {
        // Update position
        if (!prefersReducedMotion) {
          p.x += Math.cos(p.angle) * p.speed;
          p.y += Math.sin(p.angle) * p.speed;
          p.angle += (Math.random() - 0.5) * 0.1;

          // Opacity oscillation
          p.opacity += opacitySpeed * p.opacityDirection;
          if (p.opacity >= 1) {
            p.opacity = 1;
            p.opacityDirection = -1;
          }
          if (p.opacity <= 0.05) {
            p.opacity = 0.05;
            p.opacityDirection = 1;
          }

          // Wrap around
          if (p.x < -10) p.x = rect.width + 10;
          if (p.x > rect.width + 10) p.x = -10;
          if (p.y < -10) p.y = rect.height + 10;
          if (p.y > rect.height + 10) p.y = -10;
        }

        // Draw
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.globalAlpha = 1;
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [particleCount, minSize, maxSize, speed, color, opacitySpeed, createParticle]);

  return (
    <canvas
      ref={canvasRef}
      id={id}
      className={cn("absolute inset-0 w-full h-full", className)}
    />
  );
}

/* ------------------------------------------------------------------
 * Slider Control
 * ----------------------------------------------------------------*/

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  label?: string;
}

function Slider({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  label,
}: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="flex flex-col gap-2 w-full max-w-xs">
      {label && (
        <div className="flex items-center justify-between">
          <label
            className="text-sm font-medium"
            style={{ color: "var(--foreground, #fff)" }}
          >
            {label}
          </label>
          <span
            className="text-xs tabular-nums"
            style={{ color: "var(--muted-foreground, #999)" }}
          >
            {value}
          </span>
        </div>
      )}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 rounded-full appearance-none cursor-pointer motion-reduce:transition-none"
        style={{
          background: `linear-gradient(to right, var(--primary, #3b82f6) ${percentage}%, var(--border, #333) ${percentage}%)`,
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * Main Component
 * ----------------------------------------------------------------*/

export default function BackgroundSparkles({
  className,
  particleCount = 120,
  speed = 0.3,
  color = "#FFFFFF",
  showSlider = true,
  showBlur = true,
  blurDirection = "bottom",
  blurIntensity = 0.5,
  children,
}: BackgroundSparklesProps) {
  const [density, setDensity] = useState(particleCount);
  const [particleSpeed, setParticleSpeed] = useState(speed * 100);
  const [blur, setBlur] = useState(blurIntensity * 100);

  return (
    <div
      className={cn("relative w-full h-screen overflow-hidden", className)}
      style={{ backgroundColor: "var(--background, #0a0a0a)" }}
    >
      {/* Sparkle layer */}
      <Sparkles
        particleCount={density}
        speed={particleSpeed / 100}
        color={color}
        className="motion-reduce:opacity-50"
      />

      {/* Progressive blur overlay */}
      {showBlur && (
        <ProgressiveBlur
          direction={blurDirection}
          blurIntensity={blur / 100 + 0.1}
          blurLayers={8}
          className="absolute inset-0 z-10"
        />
      )}

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full px-4">
        {children || (
          <h2
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-center mb-12"
            style={{ color: "var(--foreground, #fff)" }}
          >
            Sparkles
          </h2>
        )}

        {/* Slider Controls */}
        {showSlider && (
          <div
            className="flex flex-col gap-4 p-6 rounded-xl backdrop-blur-md"
            style={{
              backgroundColor: "color-mix(in srgb, var(--card, #111) 60%, transparent)",
              border: "1px solid var(--border, #333)",
            }}
          >
            <Slider
              label="Particle Count"
              value={density}
              onChange={setDensity}
              min={10}
              max={500}
              step={10}
            />
            <Slider
              label="Speed"
              value={particleSpeed}
              onChange={setParticleSpeed}
              min={1}
              max={200}
            />
            <Slider
              label="Blur Intensity"
              value={blur}
              onChange={setBlur}
              min={0}
              max={200}
            />
          </div>
        )}
      </div>
    </div>
  );
}
