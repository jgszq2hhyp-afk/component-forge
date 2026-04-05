// @source 21st.dev/r/UmairXD/landing-page
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionData {
  id: string;
  badge?: string;
  title: string;
  subtitle?: string;
  description: string;
  align?: "left" | "center" | "right";
  features?: { title: string; description: string }[];
  actions?: {
    label: string;
    variant: "primary" | "secondary";
    onClick?: () => void;
  }[];
}

interface GlobePosition {
  top: string;
  left: string;
  scale: number;
}

interface HeroLandingPageProps {
  sections?: SectionData[];
  globePositions?: GlobePosition[];
  className?: string;
}

const DEFAULT_GLOBE_POSITIONS: GlobePosition[] = [
  { top: "50%", left: "75%", scale: 1.4 },
  { top: "25%", left: "50%", scale: 0.9 },
  { top: "15%", left: "90%", scale: 2 },
  { top: "50%", left: "50%", scale: 1.8 },
];

const DEFAULT_SECTIONS: SectionData[] = [
  {
    id: "hero",
    badge: "Welcome",
    title: "Explore",
    subtitle: "Our World",
    description:
      "Journey through an immersive experience where technology meets innovation. Watch as perspectives shift and possibilities unfold with every interaction.",
    align: "left",
    actions: [
      { label: "Begin Journey", variant: "primary" },
      { label: "Learn More", variant: "secondary" },
    ],
  },
  {
    id: "innovation",
    badge: "Innovation",
    title: "Connected Worldwide",
    description:
      "From every corner of the globe, we witness the interconnected web of human achievement. Each connection represents progress, every interaction drives innovation forward.",
    align: "center",
  },
  {
    id: "discovery",
    badge: "Discovery",
    title: "Expanding",
    subtitle: "Possibilities",
    description:
      "As we push beyond familiar boundaries, new worlds of opportunity emerge from the horizon. What seemed impossible yesterday becomes tomorrow's foundation.",
    align: "left",
    features: [
      {
        title: "Limitless Exploration",
        description: "Discover new dimensions of possibility and innovation",
      },
      {
        title: "Seamless Integration",
        description: "Where cutting-edge technology meets human intuition",
      },
      {
        title: "Future-Ready Solutions",
        description: "Built for tomorrow's challenges and opportunities",
      },
    ],
  },
  {
    id: "future",
    badge: "Future",
    title: "Our Shared",
    subtitle: "Tomorrow",
    description:
      "In this moment of unity, we see not just a planet, but a canvas of infinite human potential. Every connection represents hope.",
    align: "center",
    actions: [
      { label: "Join the Movement", variant: "primary" },
      { label: "Explore More", variant: "secondary" },
    ],
  },
];

const parsePercent = (str: string): number => parseFloat(str.replace("%", ""));

// Inline SVG Globe for standalone usage (no external dependency)
function InlineGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 600;
    canvas.height = 600;

    let rotation = 0;
    const cx = 300;
    const cy = 300;
    const radius = 240;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const draw = () => {
      ctx.clearRect(0, 0, 600, 600);

      // Glow
      const glow = ctx.createRadialGradient(cx, cy, radius * 0.7, cx, cy, radius * 1.3);
      glow.addColorStop(0, "rgba(59, 130, 246, 0.08)");
      glow.addColorStop(1, "rgba(59, 130, 246, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 600, 600);

      // Sphere outline
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Latitude lines
      for (let lat = -60; lat <= 60; lat += 30) {
        const latRad = (lat * Math.PI) / 180;
        const y = cy - Math.sin(latRad) * radius;
        const ellipseRadius = Math.cos(latRad) * radius;

        ctx.strokeStyle = "rgba(59, 130, 246, 0.12)";
        ctx.beginPath();
        ctx.ellipse(cx, y, ellipseRadius, ellipseRadius * 0.15, 0, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Longitude lines
      for (let lon = 0; lon < 360; lon += 30) {
        const lonRad = ((lon + rotation) * Math.PI) / 180;
        const xOffset = Math.sin(lonRad) * radius;

        if (Math.abs(xOffset) < radius * 0.97) {
          ctx.strokeStyle = `rgba(59, 130, 246, ${0.05 + Math.cos(lonRad) * 0.1})`;
          ctx.beginPath();
          ctx.ellipse(cx + xOffset * 0.1, cy, Math.abs(Math.cos(lonRad)) * 4 + 1, radius, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }

      // Dots along equator
      for (let d = 0; d < 360; d += 15) {
        const dRad = ((d + rotation * 2) * Math.PI) / 180;
        const dx = cx + Math.cos(dRad) * radius * 0.95;
        const dy = cy + Math.sin(dRad) * radius * 0.1;
        const visible = Math.cos(dRad);

        if (visible > 0) {
          ctx.fillStyle = `rgba(59, 130, 246, ${0.3 * visible})`;
          ctx.beginPath();
          ctx.arc(dx, dy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (!prefersReducedMotion) {
        rotation += 0.15;
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-[600px] h-[600px] motion-reduce:opacity-60"
      style={{ maxWidth: "100%", maxHeight: "100%" }}
    />
  );
}

export default function HeroLandingPage({
  sections = DEFAULT_SECTIONS,
  globePositions = DEFAULT_GLOBE_POSITIONS,
  className,
}: HeroLandingPageProps) {
  const [activeSection, setActiveSection] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [globeTransform, setGlobeTransform] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);
  const animationFrameId = useRef<number>(0);

  const calculatedPositions = useMemo(
    () =>
      globePositions.map((pos) => ({
        top: parsePercent(pos.top),
        left: parsePercent(pos.left),
        scale: pos.scale,
      })),
    [globePositions]
  );

  const updateScrollPosition = useCallback(() => {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(Math.max(scrollTop / docHeight, 0), 1);
    setScrollProgress(progress);

    const viewportCenter = window.innerHeight / 2;
    let newActiveSection = 0;
    let minDistance = Infinity;

    sectionRefs.current.forEach((ref, index) => {
      if (ref) {
        const rect = ref.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);
        if (distance < minDistance) {
          minDistance = distance;
          newActiveSection = index;
        }
      }
    });

    const currentPos = calculatedPositions[newActiveSection];
    if (currentPos) {
      const transform = `translate3d(${currentPos.left}vw, ${currentPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${currentPos.scale}, ${currentPos.scale}, 1)`;
      setGlobeTransform(transform);
    }
    setActiveSection(newActiveSection);
  }, [calculatedPositions]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        animationFrameId.current = requestAnimationFrame(() => {
          updateScrollPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateScrollPosition();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animationFrameId.current)
        cancelAnimationFrame(animationFrameId.current);
    };
  }, [updateScrollPosition]);

  useEffect(() => {
    const initialPos = calculatedPositions[0];
    if (initialPos) {
      const initialTransform = `translate3d(${initialPos.left}vw, ${initialPos.top}vh, 0) translate3d(-50%, -50%, 0) scale3d(${initialPos.scale}, ${initialPos.scale}, 1)`;
      setGlobeTransform(initialTransform);
    }
  }, [calculatedPositions]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full max-w-screen overflow-x-hidden min-h-screen",
        className
      )}
      style={{
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 w-full h-0.5 z-50"
        style={{
          background:
            "linear-gradient(to right, rgba(var(--border-rgb, 200,200,200), 0.2), rgba(var(--border-rgb, 200,200,200), 0.4), rgba(var(--border-rgb, 200,200,200), 0.2))",
        }}
      >
        <div
          className="h-full will-change-transform motion-reduce:transition-none"
          style={{
            background:
              "linear-gradient(to right, var(--primary, #3b82f6), #2563eb, #1e3a8a)",
            transform: `scaleX(${scrollProgress})`,
            transformOrigin: "left center",
            transition: "transform 0.15s ease-out",
            filter: "drop-shadow(0 0 2px rgba(59, 130, 246, 0.3))",
          }}
        />
      </div>

      {/* Side Navigation Dots */}
      <div className="hidden sm:flex fixed right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-40">
        <div className="space-y-3 sm:space-y-4 lg:space-y-6">
          {sections.map((section, index) => (
            <div key={index} className="relative group">
              <div
                className={cn(
                  "absolute right-5 sm:right-6 lg:right-8 top-1/2 -translate-y-1/2",
                  "px-2 sm:px-3 lg:px-4 py-1 sm:py-1.5 lg:py-2 rounded-md sm:rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap",
                  "backdrop-blur-md shadow-xl z-50 transition-opacity duration-300 motion-reduce:transition-none",
                  activeSection === index
                    ? "opacity-100"
                    : "opacity-0 pointer-events-none"
                )}
                style={{
                  backgroundColor: "color-mix(in srgb, var(--background) 95%, transparent)",
                  border: "1px solid color-mix(in srgb, var(--border) 60%, transparent)",
                }}
              >
                <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
                  <div
                    className="w-1 sm:w-1.5 lg:w-2 h-1 sm:h-1.5 lg:h-2 rounded-full animate-pulse motion-reduce:animate-none"
                    style={{ backgroundColor: "var(--primary, #3b82f6)" }}
                  />
                  <span className="text-xs sm:text-sm lg:text-base">
                    {section.badge || `Section ${index + 1}`}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  sectionRefs.current[index]?.scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                  });
                }}
                className={cn(
                  "relative w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 rounded-full border-2 transition-all duration-300 hover:scale-125 motion-reduce:transition-none",
                  activeSection === index
                    ? "shadow-lg"
                    : "bg-transparent hover:bg-opacity-10"
                )}
                style={{
                  backgroundColor:
                    activeSection === index
                      ? "var(--primary, #3b82f6)"
                      : "transparent",
                  borderColor:
                    activeSection === index
                      ? "var(--primary, #3b82f6)"
                      : "var(--muted-foreground, #888)",
                }}
                aria-label={`Go to ${section.badge || `section ${index + 1}`}`}
              />
            </div>
          ))}
        </div>
        <div
          className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 -z-10"
          style={{
            background:
              "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--primary, #3b82f6) 20%, transparent), transparent)",
          }}
        />
      </div>

      {/* Globe */}
      <div
        className="fixed z-10 pointer-events-none will-change-transform motion-reduce:transition-none"
        style={{
          transform: globeTransform,
          transition: "all 1400ms cubic-bezier(0.23, 1, 0.32, 1)",
          filter: `opacity(${activeSection === 3 ? 0.4 : 0.85})`,
        }}
      >
        <div className="scale-75 sm:scale-90 lg:scale-100">
          <InlineGlobe />
        </div>
      </div>

      {/* Sections */}
      {sections.map((section, index) => (
        <section
          key={section.id}
          ref={(el) => {
            sectionRefs.current[index] = el;
          }}
          className={cn(
            "relative min-h-screen flex flex-col justify-center px-4 sm:px-6 md:px-8 lg:px-12 z-20 py-12 sm:py-16 lg:py-20",
            "w-full max-w-full overflow-hidden",
            section.align === "center" && "items-center text-center",
            section.align === "right" && "items-end text-right",
            section.align !== "center" &&
              section.align !== "right" &&
              "items-start text-left"
          )}
        >
          <div className="w-full max-w-sm sm:max-w-lg md:max-w-2xl lg:max-w-4xl xl:max-w-5xl will-change-transform">
            <h1
              className={cn(
                "font-bold mb-6 sm:mb-8 leading-[1.1] tracking-tight",
                index === 0
                  ? "text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl"
                  : "text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
              )}
            >
              {section.subtitle ? (
                <div className="space-y-1 sm:space-y-2">
                  <div
                    className="bg-clip-text text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(to right, var(--foreground), color-mix(in srgb, var(--foreground) 80%, transparent))",
                    }}
                  >
                    {section.title}
                  </div>
                  <div
                    className="text-[0.6em] sm:text-[0.7em] font-medium tracking-wider"
                    style={{
                      color: "color-mix(in srgb, var(--muted-foreground) 90%, transparent)",
                    }}
                  >
                    {section.subtitle}
                  </div>
                </div>
              ) : (
                <div
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, var(--foreground), var(--foreground), color-mix(in srgb, var(--foreground) 80%, transparent))",
                  }}
                >
                  {section.title}
                </div>
              )}
            </h1>

            <div
              className={cn(
                "leading-relaxed mb-8 sm:mb-10 text-base sm:text-lg lg:text-xl font-light",
                section.align === "center"
                  ? "max-w-full mx-auto text-center"
                  : "max-w-full"
              )}
              style={{
                color: "color-mix(in srgb, var(--muted-foreground) 80%, transparent)",
              }}
            >
              <p className="mb-3 sm:mb-4">{section.description}</p>
              {index === 0 && (
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm mt-4 sm:mt-6">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div
                      className="w-1 h-1 rounded-full animate-pulse motion-reduce:animate-none"
                      style={{ backgroundColor: "var(--primary, #3b82f6)" }}
                    />
                    <span>Interactive Experience</span>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div
                      className="w-1 h-1 rounded-full animate-pulse motion-reduce:animate-none"
                      style={{
                        backgroundColor: "var(--primary, #3b82f6)",
                        animationDelay: "0.5s",
                      }}
                    />
                    <span>Scroll to Explore</span>
                  </div>
                </div>
              )}
            </div>

            {/* Features */}
            {section.features && (
              <div className="grid gap-3 sm:gap-4 mb-8 sm:mb-10">
                {section.features.map((feature, featureIndex) => (
                  <div
                    key={feature.title}
                    className="group p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                    style={{
                      border: "1px solid var(--border)",
                      backgroundColor: "color-mix(in srgb, var(--card) 50%, transparent)",
                      backdropFilter: "blur(12px)",
                    }}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <div
                        className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full mt-1.5 sm:mt-2 group-hover:opacity-100 transition-colors motion-reduce:transition-none flex-shrink-0"
                        style={{
                          backgroundColor: "color-mix(in srgb, var(--primary, #3b82f6) 60%, transparent)",
                        }}
                      />
                      <div className="flex-1 space-y-1.5 sm:space-y-2 min-w-0">
                        <h3
                          className="font-semibold text-base sm:text-lg"
                          style={{ color: "var(--foreground)" }}
                        >
                          {feature.title}
                        </h3>
                        <p
                          className="leading-relaxed text-sm sm:text-base"
                          style={{
                            color: "color-mix(in srgb, var(--muted-foreground) 80%, transparent)",
                          }}
                        >
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Actions */}
            {section.actions && (
              <div
                className={cn(
                  "flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4",
                  section.align === "center" && "justify-center",
                  section.align === "right" && "justify-end",
                  (!section.align || section.align === "left") &&
                    "justify-start"
                )}
              >
                {section.actions.map((action) => (
                  <button
                    key={action.label}
                    onClick={action.onClick}
                    className={cn(
                      "group relative px-6 sm:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl font-medium transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] text-sm sm:text-base",
                      "hover:shadow-lg focus:outline-none focus:ring-2 w-full sm:w-auto",
                      "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100"
                    )}
                    style={
                      action.variant === "primary"
                        ? {
                            backgroundColor: "var(--primary, #3b82f6)",
                            color: "var(--background, #fff)",
                            boxShadow: "0 4px 14px color-mix(in srgb, var(--primary, #3b82f6) 20%, transparent)",
                          }
                        : {
                            border: "2px solid var(--border)",
                            backgroundColor: "color-mix(in srgb, var(--background) 50%, transparent)",
                            backdropFilter: "blur(12px)",
                            color: "var(--foreground)",
                          }
                    }
                  >
                    <span className="relative z-10">{action.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}
    </div>
  );
}
