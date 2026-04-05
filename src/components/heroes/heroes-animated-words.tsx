// @source 21st.dev/r/tommyjepsen/animated-hero
"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface HeroAnimatedWordsProps {
  title?: string;
  rotatingWords?: string[];
  description?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const DEFAULT_WORDS = ["amazing", "beautiful", "modern", "powerful", "creative"];

const DEFAULT_PRIMARY_CTA = { label: "Get Started", href: "#" };
const DEFAULT_SECONDARY_CTA = { label: "Learn More", href: "#" };

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function HeroAnimatedWords({
  title = "Build something",
  rotatingWords = DEFAULT_WORDS,
  description = "Create stunning websites with our powerful platform. Ship faster, iterate smarter, and delight your users.",
  primaryCta = DEFAULT_PRIMARY_CTA,
  secondaryCta = DEFAULT_SECONDARY_CTA,
  className,
}: HeroAnimatedWordsProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const cycleWord = useCallback(() => {
    setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
  }, [rotatingWords.length]);

  useEffect(() => {
    const interval = setInterval(cycleWord, 2500);
    return () => clearInterval(interval);
  }, [cycleWord]);

  return (
    <section
      className={cn(
        "flex min-h-[80vh] w-full flex-col items-center justify-center px-4 py-20 text-center",
        className
      )}
    >
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Heading with rotating word */}
        <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
          {title}{" "}
          <span className="relative inline-block w-[280px] overflow-hidden text-left align-bottom sm:w-[340px] md:w-[400px] lg:w-[500px]">
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[currentWordIndex]}
                initial={{ y: 40, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -40, opacity: 0, filter: "blur(4px)" }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 20,
                  mass: 1,
                }}
                className="motion-reduce:transition-none inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 bg-clip-text text-transparent"
              >
                {rotatingWords[currentWordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </h1>

        {/* Description */}
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
          {description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href={primaryCta.href}
            className="inline-flex h-12 items-center justify-center rounded-full bg-primary px-8 text-sm font-medium text-primary-foreground shadow-lg transition-all duration-200 hover:bg-primary/90 hover:shadow-xl hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {primaryCta.label}
          </a>
          <a
            href={secondaryCta.href}
            className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-8 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
