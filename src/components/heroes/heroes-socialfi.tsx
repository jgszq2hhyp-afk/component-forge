// @source 21st.dev/r/Samurai-ai-api/hero
"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Data URIs
// ---------------------------------------------------------------------------

const AVATAR =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Ccircle cx='60' cy='60' r='60' fill='%23374151'/%3E%3Ccircle cx='60' cy='45' r='20' fill='%239CA3AF'/%3E%3Cellipse cx='60' cy='90' rx='30' ry='22' fill='%239CA3AF'/%3E%3C/svg%3E";

const AVATAR2 =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Ccircle cx='60' cy='60' r='60' fill='%231E3A5F'/%3E%3Ccircle cx='60' cy='45' r='20' fill='%2360A5FA'/%3E%3Cellipse cx='60' cy='90' rx='30' ry='22' fill='%2360A5FA'/%3E%3C/svg%3E";

const AVATAR3 =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Ccircle cx='60' cy='60' r='60' fill='%233B1F2B'/%3E%3Ccircle cx='60' cy='45' r='20' fill='%23F472B6'/%3E%3Cellipse cx='60' cy='90' rx='30' ry='22' fill='%23F472B6'/%3E%3C/svg%3E";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface UserCard {
  name: string;
  handle: string;
  avatar: string;
  followers: string;
  tag: string;
}

interface FeatureCard {
  icon: string;
  title: string;
  description: string;
}

interface Badge {
  label: string;
  color: string;
}

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

const USER_CARDS: UserCard[] = [
  {
    name: "Sarah Chen",
    handle: "@sarahc",
    avatar: AVATAR,
    followers: "12.4K",
    tag: "Creator",
  },
  {
    name: "Alex Rivera",
    handle: "@alexr",
    avatar: AVATAR2,
    followers: "8.9K",
    tag: "Influencer",
  },
  {
    name: "Maya Patel",
    handle: "@mayap",
    avatar: AVATAR3,
    followers: "23.1K",
    tag: "Top Earner",
  },
];

const FEATURE_CARDS: FeatureCard[] = [
  {
    icon: "💎",
    title: "Subscribe & Earn",
    description:
      "Subscribe to creators and earn rewards for engagement. The more you interact, the more you earn.",
  },
  {
    icon: "🔥",
    title: "Content Rewards",
    description:
      "Creators earn directly from their audience. No middlemen, no algorithms holding you back.",
  },
  {
    icon: "⚡",
    title: "Instant Payouts",
    description:
      "Get paid instantly for your content. No waiting periods, no minimum thresholds.",
  },
];

const BADGES: Badge[] = [
  { label: "DeFi Powered", color: "from-blue-500/20 to-cyan-500/20" },
  { label: "Web3 Native", color: "from-purple-500/20 to-pink-500/20" },
  { label: "Community First", color: "from-emerald-500/20 to-teal-500/20" },
  { label: "Zero Fees", color: "from-orange-500/20 to-amber-500/20" },
];

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

const floatVariants = {
  animate: (i: number) => ({
    y: [0, -12, 0],
    rotate: [0, i % 2 === 0 ? 3 : -3, 0],
    transition: {
      duration: 4 + i * 0.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  }),
};

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.6 + i * 0.15,
      type: "spring" as const,
      stiffness: 150,
      damping: 12,
    },
  }),
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function FloatingUserCard({
  card,
  index,
}: {
  card: UserCard;
  index: number;
}) {
  return (
    <motion.div
      custom={index}
      variants={floatVariants}
      animate="animate"
      className="motion-reduce:animate-none absolute w-56 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-xl backdrop-blur-xl"
      style={{
        top: index === 0 ? "10%" : index === 1 ? "35%" : "60%",
        right: index === 0 ? "5%" : index === 1 ? "-2%" : "8%",
      }}
    >
      <div className="flex items-center gap-3">
        <img
          src={card.avatar}
          alt={card.name}
          className="size-10 rounded-full object-cover ring-2 ring-white/20"
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {card.name}
          </p>
          <p className="text-xs text-white/50">{card.handle}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="rounded-full bg-gradient-to-r from-purple-500/30 to-pink-500/30 px-2.5 py-0.5 text-[10px] font-medium text-white/80">
          {card.tag}
        </span>
        <span className="text-xs text-white/60">{card.followers} followers</span>
      </div>
    </motion.div>
  );
}

function FeatureCardComponent({ card, index }: { card: FeatureCard; index: number }) {
  return (
    <motion.div
      variants={itemVariants}
      whileHover={{
        scale: 1.03,
        borderColor: "rgba(255,255,255,0.2)",
        transition: { duration: 0.2 },
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm"
    >
      {/* Hover glow */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-b from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative z-10">
        <span className="text-3xl">{card.icon}</span>
        <h3 className="mt-4 text-lg font-semibold text-white">{card.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/60">
          {card.description}
        </p>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Grid background pattern
// ---------------------------------------------------------------------------

function GridPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
      {/* Radial fade */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function HeroesSocialfi({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <section
      ref={containerRef}
      className={cn(
        "relative min-h-screen overflow-hidden bg-[#0a0a0f] px-4 py-20 sm:px-6 lg:px-8",
        className
      )}
    >
      <GridPattern />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="relative z-10 mx-auto max-w-7xl"
      >
        {/* ---- Badges ---- */}
        <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
          {BADGES.map((badge, i) => (
            <motion.span
              key={badge.label}
              custom={i}
              variants={badgeVariants}
              className={cn(
                "motion-reduce:transition-none rounded-full bg-gradient-to-r px-4 py-1.5 text-xs font-medium text-white/80 ring-1 ring-white/10 backdrop-blur-sm",
                badge.color
              )}
            >
              {badge.label}
            </motion.span>
          ))}
        </div>

        {/* ---- Heading ---- */}
        <motion.div variants={itemVariants} className="text-center">
          <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            The Future of{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 bg-clip-text text-transparent">
              Social Finance
            </span>
          </h1>
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-6 max-w-2xl text-center text-lg text-white/50 sm:text-xl"
        >
          Where creators earn, communities thrive, and every interaction has
          real value. Join the decentralized social revolution.
        </motion.p>

        {/* ---- CTA ---- */}
        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-8 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-shadow duration-300 hover:shadow-purple-500/40">
            <span className="relative z-10">Launch App</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </button>
          <button className="inline-flex h-12 items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 text-sm font-medium text-white/80 backdrop-blur-sm transition-colors duration-200 hover:bg-white/10 hover:text-white">
            Read Whitepaper
          </button>
        </motion.div>

        {/* ---- Hero visual area with floating cards ---- */}
        <div className="relative mt-20 min-h-[400px]">
          {/* Glow background */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="size-[500px] rounded-full bg-purple-500/10 blur-[120px]" />
          </div>

          {/* Floating user cards */}
          <div className="relative mx-auto max-w-3xl">
            {USER_CARDS.map((card, i) => (
              <FloatingUserCard key={card.handle} card={card} index={i} />
            ))}

            {/* Center stat card */}
            <motion.div
              variants={itemVariants}
              className="relative mx-auto w-72 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-center backdrop-blur-xl"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-white/40">
                Total Value Locked
              </p>
              <p className="mt-2 text-4xl font-bold text-white">$47.2M</p>
              <p className="mt-1 text-sm text-emerald-400">+12.4% this week</p>
              <div className="mt-4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="mt-4 flex justify-center gap-6">
                <div>
                  <p className="text-lg font-semibold text-white">142K</p>
                  <p className="text-[10px] text-white/40">Creators</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">3.2M</p>
                  <p className="text-[10px] text-white/40">Users</p>
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">$8.1M</p>
                  <p className="text-[10px] text-white/40">Paid Out</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ---- Feature cards ---- */}
        <motion.div
          variants={containerVariants}
          className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURE_CARDS.map((card, i) => (
            <FeatureCardComponent key={card.title} card={card} index={i} />
          ))}
        </motion.div>

        {/* ---- Bottom stat badges ---- */}
        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center"
        >
          {[
            { value: "0%", label: "Platform Fees" },
            { value: "<1s", label: "Transaction Speed" },
            { value: "100%", label: "Ownership" },
            { value: "24/7", label: "Payout Access" },
          ].map((stat) => (
            <div key={stat.label}>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-xs text-white/40">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* ---- Ambient glow effects ---- */}
      <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/[0.07] blur-[160px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[500px] w-[500px] translate-x-1/3 translate-y-1/3 rounded-full bg-pink-600/[0.05] blur-[140px]" />
    </section>
  );
}
