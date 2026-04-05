// @source 21st.dev/r/uniquesonu/slide-tabs
"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CursorPosition {
  left: number;
  width: number;
  opacity: number;
}

interface TabItem {
  label: string;
  href?: string;
}

interface TabProps {
  children: ReactNode;
  setPosition: (pos: CursorPosition) => void;
  onClick?: () => void;
}

interface SlideTabsProps {
  tabs?: TabItem[];
  onTabChange?: (index: number, label: string) => void;
  className?: string;
}

// ---------------------------------------------------------------------------
// Default data
// ---------------------------------------------------------------------------

const DEFAULT_TABS: TabItem[] = [
  { label: "Home" },
  { label: "Pricing" },
  { label: "Features" },
  { label: "Docs" },
  { label: "Blog" },
];

// ---------------------------------------------------------------------------
// Tab
// ---------------------------------------------------------------------------

function Tab({ children, setPosition, onClick }: TabProps) {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
          left: ref.current.offsetLeft,
          width,
          opacity: 1,
        });
      }}
      onClick={onClick}
      className={cn(
        "relative z-10 block cursor-pointer",
        "px-3 py-1.5 text-xs uppercase",
        "text-[var(--foreground)] mix-blend-difference",
        "md:px-5 md:py-3 md:text-base",
      )}
      role="tab"
    >
      {children}
    </li>
  );
}

// ---------------------------------------------------------------------------
// Cursor
// ---------------------------------------------------------------------------

function Cursor({ position }: { position: CursorPosition }) {
  return (
    <motion.li
      animate={position as { left: number; width: number; opacity: number }}
      transition={{ type: "spring" as const, stiffness: 500, damping: 35 }}
      className={cn(
        "absolute z-0 h-7 rounded-full bg-[var(--foreground)]",
        "md:h-12",
        "motion-reduce:transition-none",
      )}
      aria-hidden
    />
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function TabsSlide({
  tabs = DEFAULT_TABS,
  onTabChange,
  className,
}: SlideTabsProps) {
  const [position, setPosition] = useState<CursorPosition>({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      onMouseLeave={() => {
        setPosition((pv) => ({ ...pv, opacity: 0 }));
      }}
      className={cn(
        "relative mx-auto flex w-fit rounded-full",
        "border-2 border-[var(--foreground)]",
        "bg-[var(--background)] p-1",
        className,
      )}
      role="tablist"
    >
      {tabs.map((tab, index) => (
        <Tab
          key={tab.label}
          setPosition={setPosition}
          onClick={() => onTabChange?.(index, tab.label)}
        >
          {tab.label}
        </Tab>
      ))}

      <Cursor position={position} />
    </ul>
  );
}
