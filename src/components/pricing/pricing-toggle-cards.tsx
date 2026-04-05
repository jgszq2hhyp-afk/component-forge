// @source 21st.dev/r/ui-layouts/pricing-section-4
"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface PricingFeature {
  text: string;
}

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
}

interface PricingToggleCardsProps {
  heading?: string;
  subheading?: string;
  plans?: PricingPlan[];
  className?: string;
  onCtaClick?: (plan: PricingPlan) => void;
}

// ---------------------------------------------------------------------------
// oklch palette
// ---------------------------------------------------------------------------

const colors = {
  bg: "oklch(0.13 0 0)",
  cardFrom: "oklch(0.18 0 0)",
  cardTo: "oklch(0.22 0 0)",
  cardBorder: "oklch(0.30 0 0)",
  text: "oklch(0.95 0 0)",
  textMuted: "oklch(0.70 0 0)",
  textDim: "oklch(0.50 0 0)",
  blue: "oklch(0.55 0.25 265)",
  blueBright: "oklch(0.65 0.25 265)",
  blueDim: "oklch(0.40 0.20 265)",
  gridLine: "oklch(0.20 0 0)",
} as const;

// ---------------------------------------------------------------------------
// Default data (matching original prices)
// ---------------------------------------------------------------------------

const DEFAULT_PLANS: PricingPlan[] = [
  {
    name: "Starter",
    description: "For individuals and small projects getting started.",
    monthlyPrice: 12,
    yearlyPrice: 99,
    cta: "Get Started",
    features: [
      { text: "Up to 3 projects" },
      { text: "Basic analytics" },
      { text: "Email support" },
      { text: "Community access" },
      { text: "48h response time" },
    ],
  },
  {
    name: "Business",
    description: "For growing teams that need more power and flexibility.",
    monthlyPrice: 48,
    yearlyPrice: 399,
    cta: "Start Free Trial",
    popular: true,
    features: [
      { text: "Unlimited projects" },
      { text: "Advanced analytics" },
      { text: "Priority support" },
      { text: "Custom domain" },
      { text: "Team collaboration" },
      { text: "API access" },
    ],
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced security and scale needs.",
    monthlyPrice: 96,
    yearlyPrice: 899,
    cta: "Contact Sales",
    features: [
      { text: "Everything in Business" },
      { text: "SSO & SAML" },
      { text: "Dedicated account manager" },
      { text: "Custom integrations" },
      { text: "SLA guarantee" },
      { text: "On-premise option" },
    ],
  },
];

// ---------------------------------------------------------------------------
// Sparkle particles (CSS keyframe animated dots)
// ---------------------------------------------------------------------------

const sparkleKeyframes = `
@keyframes sparkle-float {
  0% {
    transform: translateY(0px) scale(1);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(-120px) scale(0);
    opacity: 0;
  }
}
@keyframes sparkle-drift {
  0% { transform: translateX(0px); }
  50% { transform: translateX(15px); }
  100% { transform: translateX(0px); }
}
`;

function SparkleField() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 8,
        duration: 4 + Math.random() * 6,
        opacity: 0.3 + Math.random() * 0.5,
      })),
    [],
  );

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden motion-reduce:hidden"
      aria-hidden="true"
    >
      <style>{sparkleKeyframes}</style>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: p.left,
            bottom: "30%",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            backgroundColor: colors.text,
            opacity: 0,
            animation: `sparkle-float ${p.duration}s ${p.delay}s infinite ease-out, sparkle-drift ${p.duration * 0.7}s ${p.delay}s infinite ease-in-out`,
          }}
        />
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Grid background pattern
// ---------------------------------------------------------------------------

function GridBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
      style={{
        backgroundImage: `
          linear-gradient(${colors.gridLine} 1px, transparent 1px),
          linear-gradient(90deg, ${colors.gridLine} 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 40%, black 20%, transparent 70%)",
        opacity: 0.4,
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Blue glow (behind cards)
// ---------------------------------------------------------------------------

function BlueGlow() {
  return (
    <div
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/3"
      aria-hidden="true"
      style={{
        width: "70%",
        height: "500px",
        background: `radial-gradient(ellipse at center, ${colors.blue} 0%, transparent 70%)`,
        opacity: 0.12,
        mixBlendMode: "screen",
        filter: "blur(60px)",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// VerticalCutReveal (word-by-word heading animation, inline framer-motion)
// ---------------------------------------------------------------------------

function VerticalCutReveal({
  text,
  inView,
}: {
  text: string;
  inView: boolean;
}) {
  const words = text.split(" ");

  return (
    <span className="inline-flex flex-wrap justify-center gap-x-[0.3em]">
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <motion.span
            className="inline-block motion-reduce:!transform-none motion-reduce:!opacity-100"
            initial={{ y: "110%", opacity: 0 }}
            animate={inView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.08 * i,
              ease: [0.33, 1, 0.68, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Spring toggle
// ---------------------------------------------------------------------------

function BillingToggle({
  isYearly,
  onToggle,
}: {
  isYearly: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="relative mx-auto flex w-fit rounded-full p-1"
      style={{
        backgroundColor: "oklch(0.22 0 0)",
        border: `1px solid ${colors.cardBorder}`,
      }}
    >
      {(["Monthly", "Yearly"] as const).map((label) => {
        const active =
          (label === "Yearly" && isYearly) ||
          (label === "Monthly" && !isYearly);
        return (
          <button
            key={label}
            type="button"
            onClick={onToggle}
            className="relative z-10 rounded-full px-6 py-2 text-sm font-medium transition-colors duration-200 motion-reduce:transition-none"
            style={{
              color: active ? colors.text : colors.textMuted,
            }}
          >
            {active && (
              <motion.span
                layoutId="pricing-toggle-pill"
                className="absolute inset-0 rounded-full motion-reduce:!transition-none"
                style={{
                  background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueBright})`,
                  boxShadow: `0 0 20px ${colors.blue}, 0 2px 8px oklch(0 0 0 / 0.4)`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 30,
                }}
              />
            )}
            <span className="relative z-10">{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Dot bullet
// ---------------------------------------------------------------------------

function DotBullet() {
  return (
    <span
      className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full"
      style={{ backgroundColor: colors.textDim }}
    />
  );
}

// ---------------------------------------------------------------------------
// Plan card
// ---------------------------------------------------------------------------

function PlanCard({
  plan,
  isYearly,
  index,
  inView,
  onCtaClick,
}: {
  plan: PricingPlan;
  isYearly: boolean;
  index: number;
  inView: boolean;
  onCtaClick?: (plan: PricingPlan) => void;
}) {
  const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice;
  const period = isYearly ? "/year" : "/month";

  return (
    <motion.div
      className="motion-reduce:!transform-none motion-reduce:!opacity-100"
      initial={{ y: 40, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 40, opacity: 0 }}
      transition={{
        duration: 0.6,
        delay: 0.15 * index,
        ease: [0.25, 1, 0.5, 1],
      }}
    >
      <div
        className="relative flex h-full flex-col rounded-2xl border p-6 transition-shadow duration-300 motion-reduce:transition-none"
        style={{
          background: `linear-gradient(to bottom, ${colors.cardFrom}, ${colors.cardTo})`,
          borderColor: plan.popular ? colors.blue : colors.cardBorder,
          boxShadow: plan.popular
            ? `0 0 0 1px ${colors.blue}, 0 0 40px ${colors.blueDim}, 0 8px 32px oklch(0 0 0 / 0.5)`
            : `0 4px 24px oklch(0 0 0 / 0.3)`,
        }}
      >
        {/* Popular badge */}
        {plan.popular && (
          <span
            className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold tracking-wide"
            style={{
              background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueBright})`,
              color: colors.text,
              boxShadow: `0 0 16px ${colors.blueDim}`,
            }}
          >
            Most Popular
          </span>
        )}

        {/* Plan name & description */}
        <div className="mb-5">
          <h3
            className="text-lg font-semibold"
            style={{ color: colors.text }}
          >
            {plan.name}
          </h3>
          <p
            className="mt-1.5 text-sm leading-relaxed"
            style={{ color: colors.textMuted }}
          >
            {plan.description}
          </p>
        </div>

        {/* Price with NumberFlow */}
        <div className="mb-6 flex items-baseline gap-1">
          <span
            className="text-4xl font-bold tracking-tight"
            style={{ color: colors.text }}
          >
            $
            <NumberFlow
              value={price}
              transformTiming={{
                duration: 500,
                easing: "cubic-bezier(0.33, 1, 0.68, 1)",
              }}
              spinTiming={{
                duration: 500,
                easing: "cubic-bezier(0.33, 1, 0.68, 1)",
              }}
              className="motion-reduce:[&_*]:!transition-none"
            />
          </span>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={period}
              initial={{ y: 8, opacity: 0, filter: "blur(3px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -8, opacity: 0, filter: "blur(3px)" }}
              transition={{ duration: 0.2 }}
              className="text-sm motion-reduce:!transform-none motion-reduce:!transition-none"
              style={{ color: colors.textMuted }}
            >
              {period}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Features with dot bullets */}
        <ul className="mb-8 flex-1 space-y-3">
          {plan.features.map((feature) => (
            <li
              key={feature.text}
              className="flex items-start gap-3 text-sm"
              style={{ color: colors.textMuted }}
            >
              <DotBullet />
              <span>{feature.text}</span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <button
          type="button"
          onClick={() => onCtaClick?.(plan)}
          className="w-full rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-200 hover:brightness-110 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:brightness-100 motion-reduce:active:scale-100"
          style={
            plan.popular
              ? {
                  background: `linear-gradient(135deg, ${colors.blue}, ${colors.blueBright})`,
                  color: colors.text,
                  boxShadow: `0 0 20px ${colors.blueDim}, 0 2px 8px oklch(0 0 0 / 0.4)`,
                }
              : {
                  background: `linear-gradient(to bottom, ${colors.cardTo}, ${colors.cardFrom})`,
                  color: colors.textMuted,
                  border: `1px solid ${colors.cardBorder}`,
                }
          }
        >
          {plan.cta}
        </button>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function PricingToggleCards({
  heading = "Simple, transparent pricing",
  subheading = "Choose the plan that fits your needs. Upgrade or downgrade at any time.",
  plans = DEFAULT_PLANS,
  className,
  onCtaClick,
}: PricingToggleCardsProps) {
  const [isYearly, setIsYearly] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full overflow-hidden py-24", className)}
      style={{ backgroundColor: colors.bg }}
    >
      {/* Background layers */}
      <GridBackground />
      <SparkleField />
      <BlueGlow />

      {/* Gradient overlay top & bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to bottom, ${colors.bg}, transparent)`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32"
        aria-hidden="true"
        style={{
          background: `linear-gradient(to top, ${colors.bg}, transparent)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.p
            className="mb-3 text-sm font-medium uppercase tracking-widest motion-reduce:!transform-none motion-reduce:!opacity-100"
            style={{ color: colors.blue }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5 }}
          >
            Pricing
          </motion.p>

          <h2
            className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
            style={{ color: colors.text }}
          >
            <VerticalCutReveal text={heading} inView={inView} />
          </h2>

          <motion.p
            className="mx-auto mt-4 max-w-lg text-base leading-relaxed motion-reduce:!transform-none motion-reduce:!opacity-100"
            style={{ color: colors.textMuted }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {subheading}
          </motion.p>

          <motion.div
            className="mt-8 motion-reduce:!transform-none motion-reduce:!opacity-100"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <BillingToggle
              isYearly={isYearly}
              onToggle={() => setIsYearly((y) => !y)}
            />
          </motion.div>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, i) => (
            <PlanCard
              key={plan.name}
              plan={plan}
              isYearly={isYearly}
              index={i}
              inView={inView}
              onCtaClick={onCtaClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
