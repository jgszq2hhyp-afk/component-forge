// @source 21st.dev/r/wisedev/silk-background-animation
"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface BackgroundsSilkProps {
  title?: string;
  descriptors?: string[];
  speed?: number;
  scale?: number;
  noiseIntensity?: number;
  colorR?: number;
  colorG?: number;
  colorB?: number;
  className?: string;
}

export default function BackgroundsSilk({
  title = "silk",
  descriptors = ["flowing", "texture", "art"],
  speed = 0.02,
  scale = 2,
  noiseIntensity = 0.8,
  colorR = 123,
  colorG = 116,
  colorB = 129,
  className,
}: BackgroundsSilkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const noise = (x: number, y: number): number => {
      const G = 2.71828;
      const rx = G * Math.sin(G * x);
      const ry = G * Math.sin(G * y);
      return (rx * ry * (1 + x)) % 1;
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const renderFrame = () => {
      const { width, height } = canvas;

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, "#1a1a1a");
      gradient.addColorStop(0.5, "#2a2a2a");
      gradient.addColorStop(1, "#1a1a1a");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      // Render silk pattern with 2px stepping for performance
      for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {
          const u = (x / width) * scale;
          const v = (y / height) * scale;

          const tOffset = speed * time;
          const tex_x = u;
          const tex_y = v + 0.03 * Math.sin(8.0 * tex_x - tOffset);

          const pattern =
            0.6 +
            0.4 *
              Math.sin(
                5.0 *
                  (tex_x +
                    tex_y +
                    Math.cos(3.0 * tex_x + 5.0 * tex_y) +
                    0.02 * tOffset) +
                  Math.sin(20.0 * (tex_x + tex_y - 0.1 * tOffset))
              );

          const rnd = noise(x, y);
          const intensity = Math.max(
            0,
            pattern - (rnd / 15.0) * noiseIntensity
          );

          const r = Math.floor(colorR * intensity);
          const g = Math.floor(colorG * intensity);
          const b = Math.floor(colorB * intensity);

          const index = (y * width + x) * 4;
          if (index < data.length) {
            data[index] = r;
            data[index + 1] = g;
            data[index + 2] = b;
            data[index + 3] = 255;

            // Fill adjacent pixels for 2x2 block
            if (x + 1 < width) {
              const idx2 = (y * width + x + 1) * 4;
              data[idx2] = r;
              data[idx2 + 1] = g;
              data[idx2 + 2] = b;
              data[idx2 + 3] = 255;
            }
            if (y + 1 < height) {
              const idx3 = ((y + 1) * width + x) * 4;
              data[idx3] = r;
              data[idx3 + 1] = g;
              data[idx3 + 2] = b;
              data[idx3 + 3] = 255;
              if (x + 1 < width) {
                const idx4 = ((y + 1) * width + x + 1) * 4;
                data[idx4] = r;
                data[idx4 + 1] = g;
                data[idx4 + 2] = b;
                data[idx4 + 3] = 255;
              }
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);

      // Vignette overlay
      const overlayGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 2
      );
      overlayGradient.addColorStop(0, "rgba(0, 0, 0, 0.1)");
      overlayGradient.addColorStop(1, "rgba(0, 0, 0, 0.4)");
      ctx.fillStyle = overlayGradient;
      ctx.fillRect(0, 0, width, height);
    };

    const animate = () => {
      renderFrame();
      time += 1;
      animationRef.current = requestAnimationFrame(animate);
    };

    if (prefersReducedMotion) {
      // Static single-frame render
      renderFrame();
    } else {
      animate();
    }

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed, scale, noiseIntensity, colorR, colorG, colorB]);

  return (
    <div
      className={cn("relative h-screen w-full overflow-hidden", className)}
      style={{ backgroundColor: "var(--background, #000)" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full motion-reduce:opacity-80"
        style={{ zIndex: 0 }}
      />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3), transparent 50%, rgba(0,0,0,0.5))",
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex h-full items-center justify-center">
        <div className="text-center px-8">
          <h1
            className={cn(
              "text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem]",
              "font-light tracking-[-0.05em] leading-none",
              "mix-blend-difference",
              "transition-all duration-1000 motion-reduce:transition-none",
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            )}
            style={{
              color: "var(--foreground, #fff)",
              textShadow: "0 0 40px rgba(255, 255, 255, 0.1)",
              fontFamily:
                "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif",
            }}
          >
            {title}
          </h1>

          <div
            className={cn(
              "mt-8 text-lg md:text-xl lg:text-2xl",
              "font-extralight tracking-[0.2em] uppercase",
              "mix-blend-overlay",
              "transition-all duration-1000 delay-300 motion-reduce:transition-none",
              isLoaded
                ? "opacity-80 translate-y-0"
                : "opacity-0 translate-y-4"
            )}
            style={{
              color: "color-mix(in srgb, var(--foreground, #d1d5db) 80%, transparent)",
            }}
          >
            {descriptors.map((word, i) => (
              <span key={word}>
                {i > 0 && (
                  <span
                    className="mx-4"
                    style={{
                      color: "var(--muted-foreground, #6b7280)",
                    }}
                  >
                    &bull;
                  </span>
                )}
                <span className="inline-block">{word}</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Year tag */}
      <div
        className={cn(
          "absolute top-8 left-8 z-30",
          "text-xs font-light tracking-widest uppercase",
          "mix-blend-overlay",
          "transition-all duration-1000 delay-[900ms] motion-reduce:transition-none",
          isLoaded ? "opacity-40 translate-y-0" : "opacity-0 -translate-y-4"
        )}
        style={{
          color: "color-mix(in srgb, var(--muted-foreground, #6b7280) 40%, transparent)",
        }}
      >
        2025
      </div>
    </div>
  );
}
