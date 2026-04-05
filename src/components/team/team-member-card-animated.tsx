// @source 21st.dev/r/Shatlyk1011/team-member-card
"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const IMG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' rx='8' fill='%231a1a2e'/%3E%3C/svg%3E";

interface TeamMemberCardAnimatedProps {
  position?: "left" | "right";
  jobPosition?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  description?: string;
  className?: string;
}

/**
 * Editorial-style team member card with overlapping portrait, large display
 * typography, circular CTA toggle, and staggered entrance animations.
 */
export default function TeamMemberCardAnimated({
  position = "left",
  jobPosition = "Backend Engineer",
  firstName = "Jennie",
  lastName = "Garcia",
  imageUrl = IMG,
  description = "Jennie is a skilled developer with expertise in modern web technologies and a passion for creating seamless user experiences.",
  className,
}: TeamMemberCardAnimatedProps) {
  const fullName = `${firstName} ${lastName}`;
  const isPositionRight = position === "right";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
      className={cn(
        "relative my-16 flex flex-col justify-center motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
    >
      {/* jobPosition label -- editorial uppercase tracking */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="motion-reduce:transform-none"
      >
        <p
          className={cn(
            "mb-4 text-xs font-medium tracking-[0.3em] uppercase text-[var(--muted-foreground)]",
            isPositionRight && "text-right"
          )}
        >
          {jobPosition}
        </p>
      </motion.div>

      <div className="flex items-center justify-end">
        {/* Portrait image with reveal animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className={cn(
            "relative h-[500px] w-[360px] shrink-0 overflow-hidden motion-reduce:transform-none",
            isPositionRight && "order-1"
          )}
        >
          {/* Subtle grain overlay for texture */}
          <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <img
            src={imageUrl}
            alt={fullName}
            className="h-full w-full object-cover duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:scale-105 motion-reduce:transform-none"
          />
        </motion.div>

        {/* Info block -- overlaps image via negative margin */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1] as const,
          }}
          className={cn(
            "relative -left-8 z-[2] flex w-[calc(100%-350px)] flex-col gap-14 motion-reduce:transform-none",
            isPositionRight && "left-8 items-end"
          )}
        >
          {/* Display name -- large editorial type */}
          <div>
            <p className="text-5xl leading-[1.1] font-extralight tracking-tight text-[var(--foreground)]">
              {firstName}
              <br />
              <span className="font-normal">{lastName}</span>
            </p>
          </div>

          {/* Details row -- toggle + bio */}
          <div
            className={cn(
              "flex gap-8",
              isPositionRight && "justify-end"
            )}
          >
            {/* Circular CTA with hover pulse */}
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "group flex h-20 w-20 shrink-0 cursor-pointer items-center justify-center rounded-full border border-[var(--border)] transition-colors duration-300 hover:border-[var(--foreground)] hover:bg-[var(--foreground)] motion-reduce:transform-none",
                isPositionRight && "order-1"
              )}
            >
              <ArrowRight
                size={22}
                className={cn(
                  "text-[var(--muted-foreground)] transition-all duration-300 group-hover:-rotate-45 group-hover:text-[var(--background)]",
                  isPositionRight &&
                    "rotate-180 group-hover:rotate-[225deg]"
                )}
              />
            </motion.div>

            {/* Bio copy -- restrained body text */}
            <div className="w-[40%]">
              <p
                className={cn(
                  "text-sm leading-[1.8] text-[var(--muted-foreground)]",
                  isPositionRight && "text-right"
                )}
              >
                {description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
