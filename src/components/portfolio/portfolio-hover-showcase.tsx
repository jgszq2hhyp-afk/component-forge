// @source 21st.dev/r/jatin-yadav05/project-showcase
// @category portfolio
// @name Portfolio Hover Showcase

"use client";

import { useState, useRef, useEffect, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  SVG placeholder                                                    */
/* ------------------------------------------------------------------ */

const PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='560' height='360' fill='%23444'%3E%3Crect width='560' height='360' rx='12'/%3E%3Ctext x='280' y='185' text-anchor='middle' fill='%23888' font-size='18' font-family='system-ui'%3EProject%3C/text%3E%3C/svg%3E";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Project {
  title: string;
  description: string;
  year: string;
  link: string;
  image: string;
}

interface PortfolioHoverShowcaseProps {
  heading?: string;
  projects?: Project[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Default data                                                       */
/* ------------------------------------------------------------------ */

const DEFAULT_PROJECTS: Project[] = [
  {
    title: "Lumina",
    description: "AI-powered design system generator.",
    year: "2024",
    link: "#",
    image: PLACEHOLDER,
  },
  {
    title: "Flux",
    description: "Real-time collaboration for creative teams.",
    year: "2024",
    link: "#",
    image: PLACEHOLDER,
  },
  {
    title: "Prism",
    description: "Color palette extraction from any image.",
    year: "2023",
    link: "#",
    image: PLACEHOLDER,
  },
  {
    title: "Vertex",
    description: "3D modeling toolkit for the web.",
    year: "2023",
    link: "#",
    image: PLACEHOLDER,
  },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function PortfolioHoverShowcase({
  heading = "Selected Work",
  projects = DEFAULT_PROJECTS,
  className,
}: PortfolioHoverShowcaseProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  /* Lerp animation loop ------------------------------------------- */
  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const animate = () => {
      setSmoothPos((prev) => {
        if (prefersReduced) return mousePos;
        const factor = 0.15;
        return {
          x: prev.x + (mousePos.x - prev.x) * factor,
          y: prev.y + (mousePos.y - prev.y) * factor,
        };
      });
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [mousePos]);

  /* Handlers ------------------------------------------------------ */
  const handleMouseMove = (e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
    setIsVisible(true);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
    setIsVisible(false);
  };

  /* Render -------------------------------------------------------- */
  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={cn("relative mx-auto w-full max-w-2xl px-6 py-16", className)}
      style={{ color: "var(--foreground)" }}
    >
      {/* Section heading */}
      <h2
        className="mb-8 text-sm font-medium uppercase tracking-wide"
        style={{ color: "var(--muted-foreground)" }}
      >
        {heading}
      </h2>

      {/* Floating image preview */}
      <div
        className="pointer-events-none fixed z-50 overflow-hidden rounded-xl shadow-2xl motion-reduce:hidden"
        style={{
          left: containerRef.current?.getBoundingClientRect().left ?? 0,
          top: containerRef.current?.getBoundingClientRect().top ?? 0,
          transform: `translate3d(${smoothPos.x + 20}px, ${smoothPos.y - 100}px, 0)`,
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? "1" : "0.8",
          transition:
            "opacity 0.3s cubic-bezier(0.4,0,0.2,1), scale 0.3s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <div
          className="relative h-[180px] w-[280px] overflow-hidden rounded-xl"
          style={{ backgroundColor: "var(--card)" }}
        >
          {projects.map((project, index) => (
            <img
              key={project.title}
              src={project.image || PLACEHOLDER}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-all duration-500 ease-out"
              style={{
                opacity: hoveredIndex === index ? 1 : 0,
                scale: hoveredIndex === index ? "1" : "1.1",
                filter: hoveredIndex === index ? "none" : "blur(10px)",
              }}
            />
          ))}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, color-mix(in srgb, var(--background) 20%, transparent), transparent)",
            }}
          />
        </div>
      </div>

      {/* Project list */}
      <div className="space-y-0">
        {projects.map((project, index) => (
          <a
            key={project.title}
            href={project.link}
            className="group block"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative py-5 transition-all duration-300 ease-out"
              style={{ borderTop: "1px solid var(--border)" }}
            >
              {/* Hover bg */}
              <div
                className={cn(
                  "absolute inset-0 -mx-4 rounded-lg px-4 transition-all duration-300 ease-out",
                  hoveredIndex === index
                    ? "scale-100 opacity-100"
                    : "scale-95 opacity-0"
                )}
                style={{
                  backgroundColor:
                    "color-mix(in srgb, var(--muted-foreground) 8%, transparent)",
                }}
              />

              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="inline-flex items-center gap-2">
                    <h3
                      className="text-lg font-medium tracking-tight"
                      style={{ color: "var(--foreground)" }}
                    >
                      <span className="relative">
                        {project.title}
                        <span
                          className={cn(
                            "absolute -bottom-0.5 left-0 h-px transition-all duration-300 ease-out",
                            hoveredIndex === index ? "w-full" : "w-0"
                          )}
                          style={{ backgroundColor: "var(--foreground)" }}
                        />
                      </span>
                    </h3>

                    {/* Arrow icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={cn(
                        "transition-all duration-300 ease-out",
                        hoveredIndex === index
                          ? "translate-x-0 translate-y-0 opacity-100"
                          : "-translate-x-2 translate-y-2 opacity-0"
                      )}
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      <path d="M7 7h10v10" />
                      <path d="M7 17 17 7" />
                    </svg>
                  </div>

                  <p
                    className={cn(
                      "mt-1 text-sm leading-relaxed transition-all duration-300 ease-out"
                    )}
                    style={{
                      color:
                        hoveredIndex === index
                          ? "color-mix(in srgb, var(--foreground) 70%, transparent)"
                          : "var(--muted-foreground)",
                    }}
                  >
                    {project.description}
                  </p>
                </div>

                <span
                  className="text-xs font-mono tabular-nums transition-all duration-300 ease-out"
                  style={{
                    color:
                      hoveredIndex === index
                        ? "color-mix(in srgb, var(--foreground) 60%, transparent)"
                        : "var(--muted-foreground)",
                  }}
                >
                  {project.year}
                </span>
              </div>
            </div>
          </a>
        ))}
        <div style={{ borderTop: "1px solid var(--border)" }} />
      </div>
    </section>
  );
}
