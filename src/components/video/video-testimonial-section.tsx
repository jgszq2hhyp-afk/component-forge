// @version 1.0.0
// @category video
// @name VideoTestimonialSection
// @source custom

"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type ReactNode,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import { cn } from "@/lib/utils";

/* ─── Named Constants ─── */
const HEADING_FONT_SIZE = "clamp(1.75rem, 4vw, 3rem)";
const NAME_FONT_SIZE = "clamp(0.875rem, 1.2vw, 1rem)";
const ROLE_FONT_SIZE = "0.875rem";
const SECTION_PADDING_Y = "clamp(3rem, 8vh, 6rem)";
const SECTION_PADDING_X = "clamp(1rem, 5vw, 3rem)";
const CARD_BORDER_RADIUS = "0.75rem";
const PLAY_BUTTON_SIZE = "3.5rem";
const MODAL_Z_INDEX = 50;
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/* ─── Props ─── */
interface Testimonial {
  videoSrc: string;
  posterSrc: string;
  name: string;
  role: string;
  company?: string;
}

interface VideoTestimonialSectionProps {
  testimonials: Testimonial[];
  headline?: string;
  columns?: 2 | 3;
  className?: string;
}

/* ─── Play Icon ─── */
function PlayIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={28}
      height={28}
      aria-hidden="true"
    >
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

/* ─── Close Icon ─── */
function CloseIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      width={24}
      height={24}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ─── Component ─── */
export default function VideoTestimonialSection({
  testimonials,
  headline,
  columns = 3,
  className,
}: VideoTestimonialSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const videoModalRef = useRef<HTMLVideoElement>(null);

  const activeTestimonial =
    activeIndex !== null ? testimonials[activeIndex] : null;

  /* ─── Focus Trap ─── */
  const trapFocus = useCallback((event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusable = modal.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }, []);

  /* ─── Open Modal ─── */
  const openModal = useCallback(
    (index: number, trigger: HTMLButtonElement) => {
      triggerRef.current = trigger;
      setActiveIndex(index);
    },
    []
  );

  /* ─── Close Modal ─── */
  const closeModal = useCallback(() => {
    setActiveIndex(null);
    triggerRef.current?.focus();
    triggerRef.current = null;
  }, []);

  /* ─── Escape Key ─── */
  useEffect(() => {
    if (activeIndex === null) return;

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [activeIndex, closeModal]);

  /* ─── Auto-focus close button ─── */
  useEffect(() => {
    if (activeIndex !== null && modalRef.current) {
      const closeButton =
        modalRef.current.querySelector<HTMLButtonElement>("button");
      closeButton?.focus();
    }
  }, [activeIndex]);

  const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      className={cn("w-full", className)}
      style={{
        paddingBlock: SECTION_PADDING_Y,
        paddingInline: SECTION_PADDING_X,
      }}
      aria-label={headline ?? "Video testimonials"}
    >
      <div className="mx-auto max-w-6xl">
        {/* Headline */}
        {headline && (
          <h2
            className="mb-10 text-center font-bold tracking-tight"
            style={{
              fontSize: HEADING_FONT_SIZE,
              color: "var(--foreground)",
            }}
          >
            {headline}
          </h2>
        )}

        {/* Grid */}
        <div className={cn("grid grid-cols-1 gap-6", gridCols)}>
          {testimonials.map((testimonial, index) => (
            <article
              key={index}
              className="group flex flex-col overflow-hidden rounded-xl"
              style={{
                backgroundColor: "var(--card)",
                borderRadius: CARD_BORDER_RADIUS,
                border: "1px solid var(--border)",
              }}
            >
              {/* Thumbnail */}
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={testimonial.posterSrc}
                  alt={`${testimonial.name} testimonial preview`}
                  className="h-full w-full object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-105"
                />

                {/* Play Button Overlay */}
                <button
                  type="button"
                  onClick={(e) =>
                    openModal(index, e.currentTarget)
                  }
                  aria-label={`Play testimonial from ${testimonial.name}`}
                  className={cn(
                    "absolute inset-0 flex items-center justify-center",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  )}
                  style={{
                    ["--tw-ring-color" as string]:
                      "var(--ring, hsl(215 20% 65%))",
                  }}
                >
                  <span
                    className="flex items-center justify-center rounded-full motion-safe:transition-transform motion-safe:duration-200 group-hover:scale-110"
                    style={{
                      width: PLAY_BUTTON_SIZE,
                      height: PLAY_BUTTON_SIZE,
                      backgroundColor: "var(--primary)",
                      color: "var(--primary-foreground)",
                    }}
                    aria-hidden="true"
                  >
                    <PlayIcon />
                  </span>
                </button>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-0.5 p-4">
                <p
                  className="font-semibold"
                  style={{
                    fontSize: NAME_FONT_SIZE,
                    color: "var(--foreground)",
                  }}
                >
                  {testimonial.name}
                </p>
                <p
                  style={{
                    fontSize: ROLE_FONT_SIZE,
                    color: "var(--muted-foreground)",
                  }}
                >
                  {testimonial.role}
                  {testimonial.company && ` at ${testimonial.company}`}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {activeTestimonial && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`Testimonial from ${activeTestimonial.name}`}
          ref={modalRef}
          onKeyDown={trapFocus}
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: MODAL_Z_INDEX }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 motion-safe:animate-in motion-safe:fade-in"
            style={{
              backgroundColor: "color-mix(in oklch, var(--background) 80%, transparent)",
            }}
            onClick={closeModal}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 w-full max-w-4xl px-4">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close video"
              className={cn(
                "absolute -top-12 right-4 flex h-10 w-10 items-center justify-center rounded-full",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              )}
              style={{
                backgroundColor: "var(--card)",
                color: "var(--foreground)",
                ["--tw-ring-color" as string]:
                  "var(--ring, hsl(215 20% 65%))",
              }}
            >
              <CloseIcon />
            </button>

            <video
              ref={videoModalRef}
              className="aspect-video w-full rounded-xl"
              src={activeTestimonial.videoSrc}
              poster={activeTestimonial.posterSrc}
              controls
              autoPlay
              style={{ backgroundColor: "var(--background)" }}
            >
              <track kind="captions" />
            </video>
          </div>
        </div>
      )}
    </section>
  );
}
