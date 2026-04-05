// @source 21st.dev/r/aceternity/lamp
"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface LampContainerProps {
  children?: React.ReactNode;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function BackgroundsLamp({
  children,
  className,
}: LampContainerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-slate-950",
        className
      )}
    >
      {/* ---- Lamp glow layers ---- */}
      <div className="relative isolate z-0 flex w-full flex-1 items-center justify-center">
        {/* Left conic gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          animate={isInView ? { opacity: 1, width: "30rem" } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className="motion-reduce:transition-none absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible bg-gradient-to-r from-cyan-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-[100%] w-40 bg-slate-950 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>

        {/* Right conic gradient */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          animate={isInView ? { opacity: 1, width: "30rem" } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          style={{
            backgroundImage:
              "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
          }}
          className="motion-reduce:transition-none absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-to-l from-cyan-500 via-transparent to-transparent [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute bottom-0 right-0 z-20 h-[100%] w-40 bg-slate-950 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-[100%] bg-slate-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>

        {/* Top blur layer */}
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-slate-950 blur-2xl" />

        {/* Backdrop circle blur */}
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md" />

        {/* Horizontal glow line */}
        <motion.div
          initial={{ width: "8rem" }}
          animate={isInView ? { width: "16rem" } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="motion-reduce:transition-none absolute inset-auto z-30 h-0.5 w-[16rem] -translate-y-[7rem] bg-cyan-400"
        />

        {/* Top glow spread */}
        <motion.div
          initial={{ width: "15rem" }}
          animate={isInView ? { width: "30rem" } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: "easeInOut" }}
          className="motion-reduce:transition-none absolute inset-auto z-50 h-36 w-[30rem] -translate-y-[12.5rem] rounded-full bg-cyan-500 opacity-50 blur-3xl"
        />

        {/* Center ambient light */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.15 } : {}}
          transition={{ delay: 0.5, duration: 1 }}
          className="absolute inset-auto z-40 h-44 w-64 -translate-y-[10rem] rounded-full bg-cyan-400 blur-2xl"
        />
      </div>

      {/* ---- Content slot ---- */}
      <div className="relative z-50 -mt-48 flex w-full flex-col items-center px-4">
        {children ?? (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="bg-gradient-to-br from-white to-slate-400 bg-clip-text text-center text-4xl font-bold tracking-tight text-transparent md:text-7xl"
          >
            Build lamps,
            <br />
            not ceilings
          </motion.h2>
        )}
      </div>
    </div>
  );
}
