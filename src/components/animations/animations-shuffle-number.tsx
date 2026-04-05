// @source 21st.dev/r/reuno-ui/shuffle-number
// NOTE: Requires npm packages: @number-flow/react
"use client"

import React, { useState, useEffect, useCallback } from "react"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

// Inline ArrowUp SVG icon to avoid lucide-react dependency
function ArrowUpIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}

const MotionArrowUp = motion.create(ArrowUpIcon)

interface ShuffleNumberProps {
  value?: number
  diff?: number
  currency?: string
  autoShuffle?: boolean
  shuffleInterval?: number
}

// Simple animated number display that shuffles digits
function AnimatedDigit({ digit, className }: { digit: string; className?: string }) {
  return (
    <motion.span
      key={digit}
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{
        type: "spring" as const,
        stiffness: 300,
        damping: 30,
      }}
      className={cn("inline-block motion-reduce:transition-none", className)}
    >
      {digit}
    </motion.span>
  )
}

function formatCurrency(value: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(value)
}

function formatPercent(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "percent",
    maximumFractionDigits: 2,
  }).format(value)
}

export default function ShuffleNumber({
  value: initialValue = 1234.56,
  diff: initialDiff = 0.054,
  currency = "USD",
  autoShuffle = true,
  shuffleInterval = 3000,
}: ShuffleNumberProps) {
  const [value, setValue] = useState(initialValue)
  const [diff, setDiff] = useState(initialDiff)

  const shuffle = useCallback(() => {
    const newValue = Math.round((Math.random() * 2000 + 500) * 100) / 100
    const newDiff = (Math.random() - 0.3) * 0.1
    setValue(newValue)
    setDiff(Math.round(newDiff * 10000) / 10000)
  }, [])

  useEffect(() => {
    if (!autoShuffle) return
    const interval = setInterval(shuffle, shuffleInterval)
    return () => clearInterval(interval)
  }, [autoShuffle, shuffleInterval, shuffle])

  const formattedValue = formatCurrency(value, currency)
  const formattedDiff = formatPercent(Math.abs(diff))
  const isPositive = diff > 0

  return (
    <span className="flex items-center justify-center gap-2">
      <span className="text-5xl font-semibold" style={{ color: "var(--foreground)" }}>
        {formattedValue.split("").map((char, i) => (
          <AnimatedDigit key={`${i}-${char}`} digit={char} />
        ))}
      </span>
      <motion.span
        className={cn(
          "inline-flex items-center px-[0.3em] text-white transition-colors duration-300 motion-reduce:transition-none"
        )}
        style={{
          borderRadius: 999,
          backgroundColor: isPositive
            ? "var(--chart-2, #34d399)"
            : "var(--destructive, #ef4444)",
        }}
        layout
        transition={{
          layout: {
            duration: 0.9,
            bounce: 0,
            type: "spring" as const,
          },
        }}
      >
        <MotionArrowUp
          className="mr-0.5 size-[0.75em]"
          transition={{
            rotate: {
              type: "spring" as const,
              duration: 0.5,
              bounce: 0,
            },
          }}
          animate={{ rotate: isPositive ? 0 : -180 }}
          initial={false}
        />
        <motion.span
          className="font-semibold"
          layout
        >
          {formattedDiff}
        </motion.span>
      </motion.span>
    </span>
  )
}
