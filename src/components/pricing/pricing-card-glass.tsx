// @source 21st.dev/r/0xUrvish/pricing-card
"use client";

import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { ArrowRight, Check, Minus, Plus, Users } from "lucide-react";
import { useState } from "react";

const plans = [
  {
    id: "plus",
    name: "Plus",
    description: "solo",
    monthlyPrice: 8.99,
    yearlyPrice: 6.99,
    features: [
      "1TB of Space",
      "30 days of file recovery",
      "256-bit AES and SSL/TLS",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    description: "startup",
    monthlyPrice: 12.99,
    yearlyPrice: 9.99,
    features: [
      "1TB of Space",
      "30 days of file recovery",
      "256-bit AES and SSL/TLS",
    ],
  },
  {
    id: "advanced",
    name: "Advanced",
    description: "teams",
    monthlyPrice: 24.99,
    yearlyPrice: 19.99,
    features: [
      "1TB of Space",
      "30 days of file recovery",
      "256-bit AES and SSL/TLS",
    ],
  },
];

const TRANSITION = {
  type: "spring" as const,
  stiffness: 300,
  damping: 30,
  mass: 0.8,
};

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

export default function PricingCardGlass() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );
  const [selectedPlan, setSelectedPlan] = useState("standard");
  const [userCount, setUserCount] = useState(3);

  return (
    <LayoutGroup>
      <div className="w-full max-w-[450px] flex flex-col gap-6 p-5 px-4 sm:p-6 rounded-3xl sm:rounded-2xl border border-[var(--border)] bg-[var(--background)] shadow-sm transition-colors duration-300">
        <div className="flex flex-col gap-4 mb-2">
          <h1 className="text-2xl font-semibold text-[var(--foreground)] tracking-tight">
            Select a Plan
          </h1>

          <div className="bg-[var(--muted)] p-1 h-10 w-full rounded-xl ring-1 ring-[var(--border)] flex">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`flex-1 h-full rounded-lg text-base font-medium relative transition-colors duration-300 motion-reduce:transition-none ${
                billingCycle === "monthly"
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {billingCycle === "monthly" && (
                <motion.div
                  layoutId="pricing-tab-bg"
                  className="absolute inset-0 bg-[var(--background)] rounded-lg shadow-sm ring-1 ring-[var(--border)]"
                  transition={TRANSITION}
                />
              )}
              <span className="relative z-10">Monthly</span>
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`flex-1 h-full rounded-lg text-base font-medium relative transition-colors duration-300 motion-reduce:transition-none flex items-center justify-center gap-2 ${
                billingCycle === "yearly"
                  ? "text-[var(--foreground)]"
                  : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
              }`}
            >
              {billingCycle === "yearly" && (
                <motion.div
                  layoutId="pricing-tab-bg"
                  className="absolute inset-0 bg-[var(--background)] rounded-lg shadow-sm ring-1 ring-[var(--border)]"
                  transition={TRANSITION}
                />
              )}
              <span className="relative z-10">Yearly</span>
              <span className="relative z-10 bg-[var(--primary)] text-xs font-light px-1.5 py-0.5 rounded-full uppercase text-[var(--primary-foreground)] tracking-tight whitespace-nowrap">
                20% OFF
              </span>
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            const price =
              billingCycle === "monthly"
                ? plan.monthlyPrice
                : plan.yearlyPrice;

            return (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className="relative cursor-pointer"
              >
                <div
                  className={`relative rounded-xl bg-[var(--card)] border transition-colors duration-300 motion-reduce:transition-none ${
                    isSelected
                      ? "z-10 border-[var(--primary)] border-2"
                      : "border-[var(--foreground)]/10"
                  }`}
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-4">
                        <div className="mt-1 shrink-0">
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 motion-reduce:transition-none ${
                              isSelected
                                ? "border-[var(--primary)]"
                                : "border-[var(--muted-foreground)]/15"
                            }`}
                          >
                            <AnimatePresence mode="wait" initial={false}>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  exit={{ scale: 0 }}
                                  className="w-4 h-4 rounded-full bg-[var(--primary)] motion-reduce:transform-none"
                                  transition={{
                                    type: "spring" as const,
                                    stiffness: 300,
                                    damping: 25,
                                    duration: 0.2,
                                  }}
                                />
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-[var(--foreground)] leading-tight">
                            {plan.name}
                          </h3>
                          <p className="text-sm text-[var(--muted-foreground)] lowercase">
                            {plan.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-medium text-[var(--foreground)]">
                          {formatCurrency(price)}
                        </div>
                        <div className="text-xs text-[var(--muted-foreground)]/60 flex items-center justify-end gap-1">
                          {billingCycle === "monthly" ? "Month" : "Year"}
                        </div>
                      </div>
                    </div>

                    <AnimatePresence initial={false}>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.4,
                            ease: [0.32, 0.72, 0, 1] as const,
                          }}
                          className="overflow-hidden w-full motion-reduce:transform-none"
                        >
                          <div className="pt-6 flex flex-col gap-6">
                            <div className="flex flex-col gap-3.5">
                              {plan.features.map((feature, idx) => (
                                <motion.div
                                  initial={{ opacity: 0, y: 5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    delay: idx * 0.05,
                                    duration: 0.3,
                                  }}
                                  key={idx}
                                  className="flex items-center gap-3 text-sm text-[var(--foreground)]/80 motion-reduce:transform-none"
                                >
                                  <Check
                                    size={16}
                                    className="text-[var(--primary)]"
                                  />
                                  {feature}
                                </motion.div>
                              ))}
                            </div>

                            <div className="h-px bg-[var(--muted)]" />

                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-[var(--muted)] shrink-0 flex items-center justify-center">
                                  <Users
                                    size={24}
                                    className="text-[var(--muted-foreground)]"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-base font-medium text-[var(--foreground)] leading-none">
                                    Users
                                  </span>
                                  <span className="text-sm text-[var(--muted-foreground)] mt-0.5">
                                    Starting at {userCount} users
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-center gap-4 bg-[var(--muted)] p-1.5 rounded-xl border border-[var(--border)]">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setUserCount(
                                      Math.max(1, userCount - 1)
                                    );
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-[var(--background)] hover:shadow-sm transition-all text-[var(--muted-foreground)]/60 hover:text-[var(--foreground)] active:scale-95 motion-reduce:transform-none"
                                >
                                  <Minus size={14} />
                                </button>
                                <span className="text-sm w-4 text-center tabular-nums text-[var(--foreground)]/80">
                                  {userCount}
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setUserCount(userCount + 1);
                                  }}
                                  className="p-1.5 rounded-lg hover:bg-[var(--background)] hover:shadow-sm transition-all text-[var(--muted-foreground)]/60 hover:text-[var(--foreground)] active:scale-95 motion-reduce:transform-none"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </LayoutGroup>
  );
}
