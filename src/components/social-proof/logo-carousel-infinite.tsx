// @version 1.0.0
// @category social-proof
// @name Logo Carousel Infinite
// @source custom-implementation

"use client";

import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  src: string;
  href?: string;
  width?: number;
  height?: number;
}

interface LogoCarouselInfiniteProps {
  logos?: Logo[];
  speed?: number;
  pauseOnHover?: boolean;
  direction?: "left" | "right";
  heading?: string;
  className?: string;
}

const defaultLogos: Logo[] = [
  { name: "Acme Corp", src: "/logos/acme.svg" },
  { name: "Globex", src: "/logos/globex.svg" },
  { name: "Initech", src: "/logos/initech.svg" },
  { name: "Umbrella", src: "/logos/umbrella.svg" },
  { name: "Hooli", src: "/logos/hooli.svg" },
  { name: "Stark Industries", src: "/logos/stark.svg" },
];

export default function LogoCarouselInfinite({
  logos = defaultLogos,
  speed = 40,
  pauseOnHover = true,
  direction = "left",
  heading = "Trusted by leading companies",
  className,
}: LogoCarouselInfiniteProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !scrollerRef.current) return;

    const scroller = scrollerRef.current;
    const scrollerContent = Array.from(scroller.children);

    // Duplicate items for seamless loop
    scrollerContent.forEach((item) => {
      const duplicate = item.cloneNode(true) as HTMLElement;
      duplicate.setAttribute("aria-hidden", "true");
      scroller.appendChild(duplicate);
    });
  }, [prefersReducedMotion]);

  const animationDuration = `${logos.length * speed}s`;

  return (
    <section
      className={cn("py-12 sm:py-16 overflow-hidden", className)}
      aria-label="Partner logos"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <p className="mb-8 text-center text-sm font-medium uppercase tracking-wider text-[var(--social-proof-heading-color,hsl(0_0%_45%))]">
            {heading}
          </p>
        )}

        <div
          className={cn(
            "relative",
            "[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]"
          )}
        >
          <div
            ref={scrollerRef}
            className={cn(
              "flex items-center gap-12 sm:gap-16 w-max",
              !prefersReducedMotion && "animate-[scroll_var(--scroll-duration)_linear_infinite]",
              pauseOnHover && !prefersReducedMotion && "hover:[animation-play-state:paused]",
              prefersReducedMotion && "flex-wrap justify-center"
            )}
            style={{
              "--scroll-duration": animationDuration,
              animationDirection: direction === "right" ? "reverse" : "normal",
            } as React.CSSProperties}
          >
            {logos.map((logo) => (
              <div
                key={logo.name}
                className="flex-shrink-0"
              >
                {logo.href ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block opacity-50 transition-opacity hover:opacity-100 motion-reduce:transition-none"
                  >
                    <img
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width ?? 120}
                      height={logo.height ?? 40}
                      className="h-8 sm:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-[filter] motion-reduce:transition-none"
                      loading="lazy"
                    />
                  </a>
                ) : (
                  <div className="opacity-50 hover:opacity-100 transition-opacity motion-reduce:transition-none">
                    <img
                      src={logo.src}
                      alt={logo.name}
                      width={logo.width ?? 120}
                      height={logo.height ?? 40}
                      className="h-8 sm:h-10 w-auto object-contain grayscale hover:grayscale-0 transition-[filter] motion-reduce:transition-none"
                      loading="lazy"
                    />
                  </div>
                )}
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
      `}</style>
    </section>
  );
}
