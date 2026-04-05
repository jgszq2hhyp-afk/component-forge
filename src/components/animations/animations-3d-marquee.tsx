// @source 21st.dev/r/Shatlyk1011/3d-marquee
"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const IMG = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' rx='8' fill='%231a1a2e'/%3E%3C/svg%3E"

const IMG_ALT1 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' rx='8' fill='%232d1b69'/%3E%3C/svg%3E"

const IMG_ALT2 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' rx='8' fill='%23162447'/%3E%3C/svg%3E"

const IMG_ALT3 = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' rx='8' fill='%231f4068'/%3E%3C/svg%3E"

const defaultImages = [
  IMG, IMG_ALT1, IMG_ALT2, IMG_ALT3,
  IMG, IMG_ALT1, IMG_ALT2, IMG_ALT3,
  IMG, IMG_ALT1, IMG_ALT2, IMG_ALT3,
]

interface ThreeDMarqueeProps {
  images?: string[]
  className?: string
}

export default function ThreeDMarquee({
  images = defaultImages,
  className,
}: ThreeDMarqueeProps) {
  const chunkSize = Math.ceil(images.length / 3)
  const chunks = Array.from({ length: 3 }, (_, colIndex) => {
    const start = colIndex * chunkSize
    return images.slice(start, start + chunkSize)
  })

  return (
    <div
      className={cn(
        "mx-auto block h-[560px] w-full overflow-hidden rounded-md max-xl:h-[480px] max-sm:h-[400px]",
        className
      )}
    >
      <div className="flex size-full items-center justify-center">
        <div className="aspect-square size-[720px] shrink-0 scale-[1.35] max-xl:size-full max-xl:scale-110 max-sm:scale-[1.3]">
          <div
            style={{ transform: "rotateX(45deg) rotateY(0deg) rotateZ(45deg)" }}
            className="relative top-0 right-[-55%] grid size-full origin-top-left grid-cols-3 gap-5 [transform-style:preserve-3d] max-xl:-top-[120px] max-xl:right-[-45%] max-sm:top-0 max-sm:gap-2"
          >
            {chunks.map((subarray, colIndex) => (
              <motion.figure
                animate={{ y: colIndex % 2 === 0 ? 60 : -60 }}
                transition={{
                  duration: colIndex % 2 === 0 ? 10 : 15,
                  repeat: Infinity,
                  repeatType: "reverse" as const,
                }}
                key={colIndex + "marquee"}
                className="flex flex-col items-start gap-6 motion-reduce:animate-none max-sm:gap-3"
              >
                {subarray.map((src, imageIndex) => (
                  <div className="relative" key={imageIndex + src}>
                    <img
                      className="aspect-[4/3] h-full w-full rounded-lg object-cover select-none"
                      style={{ backgroundColor: "var(--muted-foreground)" }}
                      src={src}
                      draggable={false}
                      alt={`Image ${imageIndex + 1}`}
                    />
                  </div>
                ))}
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
