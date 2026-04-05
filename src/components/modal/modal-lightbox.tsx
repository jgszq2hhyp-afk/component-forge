// @version 1.0.0
// @category modal
// @name Modal Lightbox
// @source custom

"use client";

import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const TRANSITION_DURATION_MS = 250;
const BACKDROP_BLUR = "backdrop-blur-md";
const COUNTER_GAP = " / ";
const SWIPE_THRESHOLD_PX = 50;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MediaItem {
  src: string;
  alt: string;
}

interface ModalLightboxProps {
  /** Element that opens the lightbox on click */
  trigger: ReactNode;
  /** Array of images / media to display */
  media: MediaItem[];
  /** Index of the initially displayed image */
  initialIndex?: number;
  /** Additional class names for the outer wrapper */
  className?: string;
}

// ---------------------------------------------------------------------------
// Focus styles (shared)
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const ringStyle = {
  ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
} as React.CSSProperties;

// ---------------------------------------------------------------------------
// Icons (inline SVG to avoid external deps)
// ---------------------------------------------------------------------------

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 18l6-6-6-6" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function ModalLightbox({
  trigger,
  media,
  initialIndex = 0,
  className,
}: ModalLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isVisible, setIsVisible] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  const totalItems = media.length;
  const hasMultiple = totalItems > 1;
  const currentMedia = media[currentIndex];

  // -----------------------------------------------------------------------
  // Open / Close
  // -----------------------------------------------------------------------

  const open = useCallback(() => {
    previousActiveElement.current = document.activeElement as HTMLElement;
    setCurrentIndex(initialIndex);
    setIsOpen(true);
    // Trigger enter animation on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsVisible(true);
      });
    });
  }, [initialIndex]);

  const close = useCallback(() => {
    setIsVisible(false);
    const timer = setTimeout(() => {
      setIsOpen(false);
      previousActiveElement.current?.focus();
    }, TRANSITION_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  // -----------------------------------------------------------------------
  // Navigation
  // -----------------------------------------------------------------------

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalItems) % totalItems);
  }, [totalItems]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalItems);
  }, [totalItems]);

  // -----------------------------------------------------------------------
  // Focus trap + Keyboard navigation
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    // Focus close button on open
    closeButtonRef.current?.focus();

    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          close();
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (hasMultiple) goToPrev();
          break;
        case "ArrowRight":
          e.preventDefault();
          if (hasMultiple) goToNext();
          break;
        case "Tab": {
          // Focus trap: cycle focus within the dialog
          if (!dialog) return;
          const focusable = dialog.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
          break;
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, close, goToPrev, goToNext, hasMultiple]);

  // -----------------------------------------------------------------------
  // Body scroll lock
  // -----------------------------------------------------------------------

  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // -----------------------------------------------------------------------
  // Touch / Swipe handlers
  // -----------------------------------------------------------------------

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      if (touchStartX === null || !hasMultiple) return;
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > SWIPE_THRESHOLD_PX) {
        if (diff > 0) goToPrev();
        else goToNext();
      }
      setTouchStartX(null);
    },
    [touchStartX, hasMultiple, goToPrev, goToNext]
  );

  // -----------------------------------------------------------------------
  // Backdrop click
  // -----------------------------------------------------------------------

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === e.currentTarget) {
        close();
      }
    },
    [close]
  );

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  if (!isOpen && !isVisible) {
    return (
      <div className={cn("inline-block", className)}>
        <button
          type="button"
          onClick={open}
          className={cn(focusRing, "cursor-pointer")}
          style={ringStyle}
          aria-label="Open lightbox"
        >
          {trigger}
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Trigger (always rendered) */}
      <div className={cn("inline-block", className)}>
        <button
          type="button"
          onClick={open}
          className={cn(focusRing, "cursor-pointer")}
          style={ringStyle}
          aria-label="Open lightbox"
        >
          {trigger}
        </button>
      </div>

      {/* Lightbox overlay */}
      {isOpen && (
        <dialog
          ref={dialogRef}
          open
          role="dialog"
          aria-modal="true"
          aria-label={`Image lightbox: ${currentMedia?.alt ?? "image"}`}
          onClick={handleBackdropClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className={cn(
            "fixed inset-0 z-50 flex items-center justify-center",
            "h-full w-full max-h-full max-w-full m-0 p-0 border-none",
            "bg-transparent",
            // Transition
            "motion-safe:transition-opacity motion-safe:duration-[250ms] motion-safe:ease-out",
            "motion-reduce:transition-none",
            isVisible ? "opacity-100" : "opacity-0"
          )}
          style={{ backgroundColor: "transparent" }}
        >
          {/* Backdrop */}
          <div
            className={cn(
              "absolute inset-0",
              BACKDROP_BLUR,
              "motion-safe:transition-opacity motion-safe:duration-[250ms]",
              "motion-reduce:transition-none",
              isVisible ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundColor: "color-mix(in oklch, var(--background) 85%, transparent)" }}
            aria-hidden="true"
          />

          {/* Content container */}
          <div
            className={cn(
              "relative z-10 flex flex-col items-center justify-center",
              "w-full h-full",
              "py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]"
            )}
          >
            {/* Top bar: counter + close */}
            <header className="absolute top-0 left-0 right-0 flex items-center justify-between px-[clamp(1rem,4vw,2rem)] py-4 z-20">
              {/* Counter */}
              {hasMultiple && (
                <span
                  className="text-sm font-medium tabular-nums"
                  style={{ color: "var(--foreground)" }}
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {currentIndex + 1}
                  {COUNTER_GAP}
                  {totalItems}
                </span>
              )}
              {!hasMultiple && <span />}

              {/* Close button */}
              <button
                ref={closeButtonRef}
                type="button"
                onClick={close}
                className={cn(
                  "inline-flex items-center justify-center rounded-full",
                  "h-10 w-10",
                  "motion-safe:transition-colors motion-safe:duration-150",
                  "motion-reduce:transition-none",
                  focusRing,
                  "cursor-pointer"
                )}
                style={{
                  ...ringStyle,
                  color: "var(--foreground)",
                  backgroundColor: "color-mix(in oklch, var(--muted-foreground) 15%, transparent)",
                }}
                aria-label="Close lightbox"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </header>

            {/* Image area */}
            <figure className="relative flex items-center justify-center w-full max-w-5xl flex-1 min-h-0">
              {currentMedia && (
                <img
                  src={currentMedia.src}
                  alt={currentMedia.alt}
                  className={cn(
                    "max-h-full max-w-full object-contain rounded-lg select-none",
                    "motion-safe:transition-[opacity,transform] motion-safe:duration-[250ms] motion-safe:ease-out",
                    "motion-reduce:transition-none",
                    isVisible
                      ? "opacity-100 motion-safe:scale-100"
                      : "opacity-0 motion-safe:scale-95"
                  )}
                  draggable={false}
                />
              )}

              {/* Navigation arrows */}
              {hasMultiple && (
                <>
                  <button
                    type="button"
                    onClick={goToPrev}
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2",
                      "inline-flex items-center justify-center rounded-full",
                      "h-12 w-12 ml-2",
                      "motion-safe:transition-[background-color,transform] motion-safe:duration-150",
                      "motion-reduce:transition-none",
                      "hover:scale-110",
                      focusRing,
                      "cursor-pointer"
                    )}
                    style={{
                      ...ringStyle,
                      color: "var(--foreground)",
                      backgroundColor: "color-mix(in oklch, var(--muted-foreground) 20%, transparent)",
                    }}
                    aria-label="Previous image"
                  >
                    <ChevronLeftIcon className="h-6 w-6" />
                  </button>

                  <button
                    type="button"
                    onClick={goToNext}
                    className={cn(
                      "absolute right-0 top-1/2 -translate-y-1/2",
                      "inline-flex items-center justify-center rounded-full",
                      "h-12 w-12 mr-2",
                      "motion-safe:transition-[background-color,transform] motion-safe:duration-150",
                      "motion-reduce:transition-none",
                      "hover:scale-110",
                      focusRing,
                      "cursor-pointer"
                    )}
                    style={{
                      ...ringStyle,
                      color: "var(--foreground)",
                      backgroundColor: "color-mix(in oklch, var(--muted-foreground) 20%, transparent)",
                    }}
                    aria-label="Next image"
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                </>
              )}
            </figure>

            {/* Thumbnail strip */}
            {hasMultiple && totalItems <= 12 && (
              <nav
                className="flex items-center gap-2 mt-4"
                role="tablist"
                aria-label="Image thumbnails"
              >
                {media.map((item, idx) => (
                  <button
                    key={`thumb-${idx}-${item.src}`}
                    type="button"
                    role="tab"
                    aria-selected={idx === currentIndex}
                    aria-label={`View image ${idx + 1}: ${item.alt}`}
                    onClick={() => setCurrentIndex(idx)}
                    className={cn(
                      "h-12 w-12 rounded-md overflow-hidden",
                      "motion-safe:transition-[opacity,ring] motion-safe:duration-150",
                      "motion-reduce:transition-none",
                      "border-2",
                      focusRing,
                      "cursor-pointer",
                      idx === currentIndex ? "opacity-100" : "opacity-50 hover:opacity-75"
                    )}
                    style={{
                      ...ringStyle,
                      borderColor:
                        idx === currentIndex
                          ? "var(--primary)"
                          : "transparent",
                    }}
                  >
                    <img
                      src={item.src}
                      alt=""
                      className="h-full w-full object-cover"
                      draggable={false}
                    />
                  </button>
                ))}
              </nav>
            )}
          </div>
        </dialog>
      )}
    </>
  );
}
