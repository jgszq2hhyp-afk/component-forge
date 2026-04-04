// @version 2.0.0
// @category social-proof
// @name Logo Carousel Infinite
// @source custom-implementation

"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const DEFAULT_SPEED_SECONDS_PER_LOGO = 40;
const DEFAULT_LOGO_WIDTH = 120;
const DEFAULT_LOGO_HEIGHT = 40;
const MAX_WIDTH = "80rem"; // max-w-7xl

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Logo {
  name: string;
  src: string;
  href?: string;
  width?: number;
  height?: number;
}

interface LogoCarouselInfiniteProps {
  logos?: Logo[];
  /** Seconds per logo -- lower = faster */
  speed?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  heading?: string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Focus ring
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--social-proof-ring,hsl(220_90%_56%))] focus-visible:ring-offset-2";

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const defaultLogos: Logo[] = [
  { name: "Acme Corp", src: "/logos/acme.svg" },
  { name: "Globex", src: "/logos/globex.svg" },
  { name: "Initech", src: "/logos/initech.svg" },
  { name: "Umbrella", src: "/logos/umbrella.svg" },
  { name: "Hooli", src: "/logos/hooli.svg" },
  { name: "Stark Industries", src: "/logos/stark.svg" },
];

// ---------------------------------------------------------------------------
// Logo item component
// ---------------------------------------------------------------------------

function LogoItem({
  logo,
  isClone = false,
}: {
  logo: Logo;
  isClone?: boolean;
}) {
  const image = (
    <Image
      src={logo.src}
      alt={logo.name}
      width={logo.width ?? DEFAULT_LOGO_WIDTH}
      height={logo.height ?? DEFAULT_LOGO_HEIGHT}
      className="h-8 sm:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-[filter] motion-reduce:transition-none motion-reduce:grayscale-0"
      loading="lazy"
    />
  );

  if (logo.href) {
    return (
      <a
        href={logo.href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "block opacity-50 transition-opacity hover:opacity-100 motion-reduce:transition-none motion-reduce:opacity-100",
          "rounded-lg",
          focusRing,
        )}
        aria-hidden={isClone ? "true" : undefined}
        tabIndex={isClone ? -1 : undefined}
      >
        {image}
      </a>
    );
  }

  return (
    <div
      className="opacity-50 hover:opacity-100 transition-opacity motion-reduce:transition-none motion-reduce:opacity-100"
      aria-hidden={isClone ? "true" : undefined}
    >
      {image}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function LogoCarouselInfinite({
  logos = defaultLogos,
  speed = DEFAULT_SPEED_SECONDS_PER_LOGO,
  pauseOnHover = true,
  direction = "left",
  heading = "Trusted by leading companies",
  className,
}: LogoCarouselInfiniteProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [duplicated, setDuplicated] = useState(false);

  // Memoize animation duration
  const animationDuration = useMemo(
    () => `${logos.length * speed}s`,
    [logos.length, speed],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !scrollerRef.current || duplicated) return;

    const scroller = scrollerRef.current;
    const scrollerContent = Array.from(scroller.children);

    // Duplicate items for seamless loop
    scrollerContent.forEach((item) => {
      const duplicate = item.cloneNode(true) as HTMLElement;
      duplicate.setAttribute("aria-hidden", "true");
      // Remove cloned links from tab order
      const links = duplicate.querySelectorAll("a");
      links.forEach((link) => link.setAttribute("tabindex", "-1"));
      scroller.appendChild(duplicate);
    });

    setDuplicated(true);
  }, [prefersReducedMotion, duplicated]);

  return (
    <section
      aria-label={heading ?? "Partner logos"}
      className={cn("py-12 sm:py-16 overflow-hidden", className)}
    >
      <div
        className="mx-auto px-4 sm:px-6 lg:px-8"
        style={{ maxWidth: MAX_WIDTH }}
      >
        {heading && (
          <p
            className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-[var(--social-proof-heading-color,hsl(0_0%_45%))]"
            style={{
              fontSize: "clamp(0.75rem, 1vw, 0.875rem)",
            }}
          >
            {heading}
          </p>
        )}

        <div
          className={cn(
            "relative",
            "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
            prefersReducedMotion && "[mask-image:none]",
          )}
        >
          <div
            ref={scrollerRef}
            className={cn(
              "flex items-center gap-12 sm:gap-16 w-max",
              !prefersReducedMotion &&
                "animate-[scroll_var(--scroll-duration)_linear_infinite]",
              pauseOnHover &&
                !prefersReducedMotion &&
                "hover:[animation-play-state:paused]",
              prefersReducedMotion && "flex-wrap justify-center w-auto",
            )}
            style={
              {
                "--scroll-duration": animationDuration,
                animationDirection:
                  direction === "right" ? "reverse" : "normal",
              } as React.CSSProperties
            }
          >
            {logos.map((logo) => (
              <div key={logo.name} className="flex-shrink-0">
                <LogoItem logo={logo} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-\\[scroll_var\\(--scroll-duration\\)_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
