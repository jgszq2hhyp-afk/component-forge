// @source 21st.dev/r/0xUrvish/bucket
"use client"

import { AnimatePresence, motion } from "framer-motion"
import React, { useEffect, useState } from "react"

import { cn } from "@/lib/utils"

// Inline SVG icons to avoid hugeicons dependency
function IconShield({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}

function IconZap({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  )
}

function IconUsers({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}

function IconSparkles({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z" />
    </svg>
  )
}

type IconComponent = ({ className }: { className?: string }) => React.JSX.Element

interface ChipItem {
  id: number
  title: string
  description: string
  icon: IconComponent
}

const INITIAL_CHIPS: ChipItem[] = [
  {
    id: 1,
    title: "Production Ready",
    description: "Fully type-safe and tested",
    icon: IconShield,
  },
  {
    id: 2,
    title: "Fluid Motion",
    description: "60fps optimizations built-in",
    icon: IconZap,
  },
  {
    id: 3,
    title: "Accessible",
    description: "Works perfectly for everyone",
    icon: IconUsers,
  },
  {
    id: 4,
    title: "Modern Design",
    description: "Crafted for high-end feel",
    icon: IconSparkles,
  },
]

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])
  return isMobile
}

export default function Bucket() {
  const [items, setItems] = useState(INITIAL_CHIPS)
  const isMobile = useIsMobile()

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const [first, ...rest] = prev
        return [...rest, first]
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-fit relative w-full">
      <div
        className="relative isolate w-full max-w-[655px]"
        style={{ aspectRatio: "655/352" }}
      >
        {/* Background bucket SVG */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 655 352"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 z-0"
        >
          <foreignObject x="443.561" y="-10.5141" width="211.24" height="166.977">
            <div
              style={{
                backdropFilter: "blur(11.03px)",
                clipPath: "url(#bgblur_0_bucket_clip)",
                height: "100%",
                width: "100%",
              }}
            />
          </foreignObject>
          <g filter="url(#filter1_bucket)">
            <path
              d="M535.59 78.7427L487.973 42.8776L558.738 13.9516C562.902 12.2494 564.984 11.3984 567.143 11.5597C569.301 11.7211 571.233 12.8723 575.098 15.1747L590.22 24.1832C603.923 32.347 610.775 36.4289 610.372 42.0779C609.97 47.7269 602.609 50.7964 587.887 56.9354L535.59 78.7427Z"
              fill="white"
              fillOpacity="0.42"
              shapeRendering="crispEdges"
            />
          </g>
          <foreignObject x="0" y="-10.9516" width="215.96" height="167.786">
            <div
              style={{
                backdropFilter: "blur(11.03px)",
                clipPath: "url(#bgblur_1_bucket_clip)",
                height: "100%",
                width: "100%",
              }}
            />
          </foreignObject>
          <g filter="url(#filter2_bucket)">
            <path
              d="M123.116 79.1145L171.548 42.8776L97.2715 12.5164C94.8305 11.5186 93.61 11.0197 92.3446 11.1143C91.0793 11.2089 89.9465 11.8837 87.681 13.2334L56.155 32.0149C48.1832 36.7641 44.1973 39.1386 44.4205 42.4378C44.6438 45.737 48.9132 47.553 57.4522 51.1849L123.116 79.1145Z"
              fill="white"
              fillOpacity="0.42"
              shapeRendering="crispEdges"
            />
          </g>
          <foreignObject x="78.7048" y="20.823" width="501.297" height="136.012">
            <div
              style={{
                backdropFilter: "blur(11.03px)",
                clipPath: "url(#bgblur_2_bucket_clip)",
                height: "100%",
                width: "100%",
              }}
            />
          </foreignObject>
          <g filter="url(#filter3_bucket)">
            <path
              d="M487.973 42.8774L171.548 42.8775L123.116 79.1144L535.59 78.7424L487.973 42.8774Z"
              fill="url(#bucket_paint0)"
              fillOpacity="0.72"
              shapeRendering="crispEdges"
            />
          </g>
          <foreignObject x="78.7048" y="20.823" width="137.255" height="136.012">
            <div
              style={{
                backdropFilter: "blur(11.03px)",
                clipPath: "url(#bgblur_3_bucket_clip)",
                height: "100%",
                width: "100%",
              }}
            />
          </foreignObject>
          <g filter="url(#filter4_bucket)">
            <path
              d="M171.548 78.9088V42.8774L123.116 79.1144L171.548 78.9088Z"
              fill="white"
              fillOpacity="0.32"
              shapeRendering="crispEdges"
            />
          </g>
          <g filter="url(#filter5_bucket)">
            <path
              d="M487.973 78.9088V42.8774L536.404 79.1144L487.973 78.9088Z"
              fill="white"
              fillOpacity="0.32"
              shapeRendering="crispEdges"
            />
          </g>

          <defs>
            <filter id="filter0_bucket" x="123.766" y="79.1595" width="413" height="275.676" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="5.51362" />
              <feGaussianBlur stdDeviation="1.83787" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
              <feBlend mode="normal" in2="shape" result="effect1_innerShadow" />
            </filter>
            <filter id="filter1_bucket" x="443.561" y="-10.5141" width="211.24" height="166.977" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="33.3087" />
              <feGaussianBlur stdDeviation="22.2058" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="5.51362" />
              <feGaussianBlur stdDeviation="1.83787" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
              <feBlend mode="normal" in2="shape" result="effect2" />
            </filter>
            <filter id="filter2_bucket" x="0" y="-10.9516" width="215.96" height="167.786" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="33.3087" />
              <feGaussianBlur stdDeviation="22.2058" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="5.51362" />
              <feGaussianBlur stdDeviation="1.83787" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
              <feBlend mode="normal" in2="shape" result="effect2" />
            </filter>
            <filter id="filter3_bucket" x="78.7048" y="20.823" width="501.297" height="136.012" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="33.3087" />
              <feGaussianBlur stdDeviation="22.2058" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="5.51362" />
              <feGaussianBlur stdDeviation="1.83787" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
              <feBlend mode="normal" in2="shape" result="effect2" />
            </filter>
            <filter id="filter4_bucket" x="78.7048" y="20.823" width="137.255" height="136.012" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="33.3087" />
              <feGaussianBlur stdDeviation="22.2058" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1" result="shape" />
            </filter>
            <filter id="filter5_bucket" x="443.561" y="20.823" width="137.255" height="136.012" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="33.3087" />
              <feGaussianBlur stdDeviation="22.2058" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1" result="shape" />
            </filter>
            <filter id="filter6_bucket" x="21.477" y="56.6875" width="612.444" height="212.562" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="33.3087" />
              <feGaussianBlur stdDeviation="22.2058" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.03 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1" result="shape" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset dy="5.51362" />
              <feGaussianBlur stdDeviation="1.83787" />
              <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
              <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.36 0" />
              <feBlend mode="normal" in2="shape" result="effect2" />
            </filter>
            <clipPath id="bgblur_0_bucket_clip" transform="translate(-443.561 10.5141)">
              <path d="M535.59 78.7427L487.973 42.8776L558.738 13.9516C562.902 12.2494 564.984 11.3984 567.143 11.5597C569.301 11.7211 571.233 12.8723 575.098 15.1747L590.22 24.1832C603.923 32.347 610.775 36.4289 610.372 42.0779C609.97 47.7269 602.609 50.7964 587.887 56.9354L535.59 78.7427Z" />
            </clipPath>
            <clipPath id="bgblur_1_bucket_clip" transform="translate(0 10.9516)">
              <path d="M123.116 79.1145L171.548 42.8776L97.2715 12.5164C94.8305 11.5186 93.61 11.0197 92.3446 11.1143C91.0793 11.2089 89.9465 11.8837 87.681 13.2334L56.155 32.0149C48.1832 36.7641 44.1973 39.1386 44.4205 42.4378C44.6438 45.737 48.9132 47.553 57.4522 51.1849L123.116 79.1145Z" />
            </clipPath>
            <clipPath id="bgblur_2_bucket_clip" transform="translate(-78.7048 -20.823)">
              <path d="M487.973 42.8774L171.548 42.8775L123.116 79.1144L535.59 78.7424L487.973 42.8774Z" />
            </clipPath>
            <clipPath id="bgblur_3_bucket_clip" transform="translate(-78.7048 -20.823)">
              <path d="M171.548 78.9088V42.8774L123.116 79.1144L171.548 78.9088Z" />
            </clipPath>
            <clipPath id="center_box_clip_bucket">
              <rect x="123.766" y="0" width="413" height="352" />
            </clipPath>
            <linearGradient id="bucket_paint0" x1="329.353" y1="42.8774" x2="329.353" y2="79.1144" gradientUnits="userSpaceOnUse">
              <stop stopColor="white" stopOpacity="0.4" />
              <stop offset="1" stopColor="white" stopOpacity="0.2" />
            </linearGradient>
          </defs>
        </svg>

        {/* Animated chip in center */}
        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
          <div
            className="relative w-full h-full flex justify-center items-center"
            style={{ paddingBottom: "65%" }}
          >
            <AnimatePresence mode="popLayout">
              {items.map((chip, index) => {
                if (index !== 0) return null

                const ChipIcon = chip.icon

                return (
                  <motion.div
                    key={chip.id}
                    initial={{
                      y: isMobile ? -70 : -100,
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                      scale: isMobile ? 1 : 1.25,
                    }}
                    exit={{
                      y: isMobile ? 100 : 130,
                      scale: 0.8,
                    }}
                    transition={{
                      duration: 0.5,
                      ease: [0.455, 0.03, 0.515, 0.955] as [number, number, number, number],
                    }}
                    className={cn(
                      "rounded-full p-2 w-[240px] shadow-sm absolute pointer-events-auto flex items-center gap-2 origin-bottom motion-reduce:transition-none"
                    )}
                    style={{
                      backgroundColor: "var(--card)",
                      borderWidth: 1,
                      borderColor: "var(--border)",
                    }}
                  >
                    <div
                      className="flex size-10 shrink-0 items-center justify-center rounded-full"
                      style={{
                        backgroundColor: "color-mix(in oklch, var(--muted-foreground) 10%, transparent)",
                        color: "var(--muted-foreground)",
                      }}
                    >
                      <ChipIcon className="size-5" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span
                        className="text-sm font-medium leading-none"
                        style={{ color: "var(--foreground)" }}
                      >
                        {chip.title}
                      </span>
                      <span
                        className="text-xs"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {chip.description}
                      </span>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        </div>

        {/* Front face SVG overlay */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 655 352"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 z-20 pointer-events-none overflow-hidden"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          <g filter="url(#filter0_bucket)">
            <path
              d="M512.766 79.1595L147.766 79.1624C136.453 79.1625 130.796 79.1626 127.281 82.6773C123.766 86.192 123.766 91.8488 123.766 103.162V327.159C123.766 338.473 123.766 344.13 127.281 347.645C130.796 351.159 136.453 351.159 147.766 351.159H512.766C524.08 351.159 529.737 351.159 533.252 347.645C536.766 344.13 536.766 338.473 536.766 327.159V103.159C536.766 91.8457 536.766 86.1888 533.252 82.6741C529.737 79.1594 524.08 79.1594 512.766 79.1595Z"
              style={{ fill: "var(--card)" }}
            />
          </g>
          <g clipPath="url(#center_box_clip_bucket)">
            <foreignObject x="0" y="0" width="655" height="352">
              <div
                style={{
                  backdropFilter: "blur(60.03px)",
                  WebkitBackdropFilter: "blur(60.03px)",
                  height: "100%",
                  width: "100%",
                  background: "rgba(255, 255, 255, 0.01)",
                  clipPath:
                    "path('M74.6011 164.033L123.116 79.1138L535.59 78.7419L581.532 164.469C588.006 176.55 591.243 182.59 588.568 187.06C585.892 191.529 579.039 191.529 565.333 191.529H90.5591C76.4759 191.529 69.4343 191.529 66.7781 186.953C64.1219 182.376 67.615 176.262 74.6011 164.033Z')",
                }}
              />
            </foreignObject>
          </g>
          <g filter="url(#filter6_bucket)">
            <path
              d="M74.6011 164.033L123.116 79.1138L535.59 78.7419L581.532 164.469C588.006 176.55 591.243 182.59 588.568 187.06C585.892 191.529 579.039 191.529 565.333 191.529H90.5591C76.4759 191.529 69.4343 191.529 66.7781 186.953C64.1219 182.376 67.615 176.262 74.6011 164.033Z"
              fill="white"
              fillOpacity="0.42"
              shapeRendering="crispEdges"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
