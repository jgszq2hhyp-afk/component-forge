// @source 21st.dev/r/thanh/interactive-image-accordion

"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface AccordionItem {
  id: number;
  title: string;
  imageUrl: string;
}

interface AccordionItemProps {
  item: AccordionItem;
  isActive: boolean;
  onMouseEnter: () => void;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const IMG_PLACEHOLDER = (label: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='600'%3E%3Crect width='800' height='600' rx='8' fill='%231a1a2e'/%3E%3Ctext x='400' y='300' text-anchor='middle' dominant-baseline='central' fill='%23ffffff80' font-family='system-ui' font-size='24'%3E${encodeURIComponent(label)}%3C/text%3E%3C/svg%3E`;

const DEFAULT_ITEMS: AccordionItem[] = [
  {
    id: 1,
    title: "Voice Assistant",
    imageUrl: IMG_PLACEHOLDER("Voice Assistant"),
  },
  {
    id: 2,
    title: "AI Image Generation",
    imageUrl: IMG_PLACEHOLDER("AI Image Generation"),
  },
  {
    id: 3,
    title: "AI Chatbot + Local RAG",
    imageUrl: IMG_PLACEHOLDER("AI Chatbot"),
  },
  {
    id: 4,
    title: "AI Agent",
    imageUrl: IMG_PLACEHOLDER("AI Agent"),
  },
  {
    id: 5,
    title: "Visual Understanding",
    imageUrl: IMG_PLACEHOLDER("Visual Understanding"),
  },
];

// ---------------------------------------------------------------------------
// Sub-component: Single Accordion Panel
// ---------------------------------------------------------------------------

function AccordionPanel({ item, isActive, onMouseEnter }: AccordionItemProps) {
  return (
    <div
      className={cn(
        "relative h-[450px] cursor-pointer overflow-hidden rounded-2xl",
        "transition-all duration-700 ease-in-out",
        "motion-reduce:transition-none",
        isActive ? "w-[400px]" : "w-[60px]"
      )}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={item.imageUrl}
        alt={item.title}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Caption */}
      <span
        className={cn(
          "absolute whitespace-nowrap text-lg font-semibold text-white",
          "transition-all duration-300 ease-in-out",
          "motion-reduce:transition-none",
          isActive
            ? "bottom-6 left-1/2 -translate-x-1/2 rotate-0"
            : "bottom-24 left-1/2 -translate-x-1/2 rotate-90"
        )}
      >
        {item.title}
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function GalleryImageAccordion({
  items = DEFAULT_ITEMS,
  heading = "Accelerate Gen-AI Tasks on Any Device",
  description = "Build high-performance AI apps on-device without the hassle of model compression or edge deployment.",
  ctaLabel = "Contact Us",
  ctaHref = "#contact",
}: {
  items?: AccordionItem[];
  heading?: string;
  description?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  const [activeIndex, setActiveIndex] = useState(items.length - 1);

  return (
    <div
      className="font-sans"
      style={{ backgroundColor: "var(--background)" }}
    >
      <section className="container mx-auto px-4 py-12 md:py-24">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          {/* Left: Text Content */}
          <div className="w-full text-center md:w-1/2 md:text-left">
            <h1
              className="text-4xl font-bold leading-tight tracking-tighter md:text-6xl"
              style={{ color: "var(--foreground)" }}
            >
              {heading}
            </h1>
            <p
              className="mx-auto mt-6 max-w-xl text-lg md:mx-0"
              style={{ color: "var(--muted-foreground)" }}
            >
              {description}
            </p>
            <div className="mt-8">
              <a
                href={ctaHref}
                className={cn(
                  "inline-block rounded-lg px-8 py-3 font-semibold shadow-lg",
                  "transition-colors duration-300",
                  "motion-reduce:transition-none",
                  "bg-[var(--foreground)] text-[var(--background)]",
                  "hover:opacity-90"
                )}
              >
                {ctaLabel}
              </a>
            </div>
          </div>

          {/* Right: Image Accordion */}
          <div className="w-full md:w-1/2">
            <div className="flex flex-row items-center justify-center gap-4 overflow-x-auto p-4">
              {items.map((item, index) => (
                <AccordionPanel
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
