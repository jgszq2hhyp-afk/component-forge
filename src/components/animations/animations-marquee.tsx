// @source 21st.dev/r/tom_ui/marquee
"use client"

import React from "react"
import { cn } from "@/lib/utils"

interface MarqueeProps extends React.HTMLAttributes<HTMLDivElement> {
  duration?: number
  pauseOnHover?: boolean
  direction?: "left" | "right" | "up" | "down"
  fade?: boolean
  fadeAmount?: number
}

export default function Marquee({
  children,
  className,
  duration = 20,
  pauseOnHover = false,
  direction = "left",
  fade = true,
  fadeAmount = 10,
  ...props
}: MarqueeProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = React.useState(false)

  const items = React.Children.toArray(children)
  const isVertical = direction === "up" || direction === "down"

  const animationName = isVertical
    ? direction === "up"
      ? "marquee-scroll-y"
      : "marquee-scroll-y-reverse"
    : direction === "left"
      ? "marquee-scroll"
      : "marquee-scroll-reverse"

  return (
    <>
      <style>
        {`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes marquee-scroll-reverse {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
        @keyframes marquee-scroll-y {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes marquee-scroll-y-reverse {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        .marquee-scroller-inner {
          display: flex;
          animation: ${animationName} ${duration}s linear infinite;
        }
        .marquee-scroller-inner.paused {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-scroller-inner {
            animation: none;
          }
        }
        `}
      </style>
      <div
        ref={containerRef}
        className={cn(
          "flex w-full overflow-hidden",
          isVertical && "flex-col",
          className
        )}
        style={{
          ...(fade && {
            maskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`,
            WebkitMaskImage: isVertical
              ? `linear-gradient(to bottom, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`
              : `linear-gradient(to right, transparent 0%, black ${fadeAmount}%, black ${100 - fadeAmount}%, transparent 100%)`,
          }),
        }}
        onMouseEnter={() => pauseOnHover && setIsPaused(true)}
        onMouseLeave={() => pauseOnHover && setIsPaused(false)}
        {...props}
      >
        <div
          className={cn(
            "marquee-scroller-inner flex shrink-0",
            isVertical && "flex-col",
            isPaused && "paused"
          )}
        >
          {items.map((item, index) => (
            <div
              key={`first-${index}`}
              className={cn("flex shrink-0", isVertical && "w-full")}
            >
              {item}
            </div>
          ))}
          {items.map((item, index) => (
            <div
              key={`second-${index}`}
              className={cn("flex shrink-0", isVertical && "w-full")}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
