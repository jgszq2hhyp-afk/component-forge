// @version 1.0.0
// @category cookie-consent
// @name cookie-consent-categories-inline
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const SECTION_PX = "clamp(1rem,4vw,2rem)";
const BTN_CLASSES = "rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
const TOGGLE_W = 44;
const TOGGLE_H = 24;
const THUMB_SIZE = 18;
const THUMB_OFFSET = 3;
const THUMB_TRANSLATE = TOGGLE_W - THUMB_SIZE - THUMB_OFFSET * 2;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CookieCategory {
  id: string;
  name: string;
  description: string;
  required?: boolean;
}

interface CookieConsentCategoriesInlineProps {
  headline?: string;
  categories?: CookieCategory[];
  onSave?: (accepted: string[]) => void;
  className?: string;
}

const DEFAULT_CATEGORIES: CookieCategory[] = [
  { id: "essential", name: "Essential", description: "Required for the website to function.", required: true },
  { id: "analytics", name: "Analytics", description: "Help us understand how visitors use our site." },
  { id: "marketing", name: "Marketing", description: "Used to deliver relevant advertisements." },
  { id: "preferences", name: "Preferences", description: "Remember your settings and choices." },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CookieConsentCategoriesInline({
  headline = "Manage Cookie Preferences",
  categories = DEFAULT_CATEGORIES,
  onSave,
  className,
}: CookieConsentCategoriesInlineProps) {
  const [visible, setVisible] = useState(true);
  const [accepted, setAccepted] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    categories.forEach((c) => { if (c.required) initial.add(c.id); });
    return initial;
  });

  const toggle = useCallback((id: string) => {
    setAccepted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleSave = useCallback(() => {
    onSave?.(Array.from(accepted));
    setVisible(false);
  }, [accepted, onSave]);

  const handleAcceptAll = useCallback(() => {
    onSave?.(categories.map((c) => c.id));
    setVisible(false);
  }, [categories, onSave]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-50 border-t",
        "motion-safe:animate-in motion-safe:slide-in-from-bottom motion-safe:duration-300",
        "motion-reduce:animate-none",
        className,
      )}
      role="dialog"
      aria-label={headline}
      style={{
        borderColor: "var(--border)",
        backgroundColor: "var(--card)",
        padding: `clamp(1rem,3vw,1.5rem) ${SECTION_PX}`,
      }}
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-4 text-base font-bold" style={{ color: "var(--foreground)" }}>
          {headline}
        </h2>

        <div className="mb-4 grid gap-3 sm:grid-cols-2">
          {categories.map((cat) => {
            const isOn = accepted.has(cat.id);
            return (
              <div
                key={cat.id}
                className="flex items-start gap-3 rounded-lg border p-3"
                style={{ borderColor: "var(--border)" }}
              >
                <button
                  type="button"
                  role="switch"
                  aria-checked={isOn}
                  aria-label={`${cat.name} cookies`}
                  disabled={cat.required}
                  onClick={() => toggle(cat.id)}
                  className="mt-0.5 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    width: TOGGLE_W,
                    height: TOGGLE_H,
                    backgroundColor: isOn ? "var(--primary)" : "var(--border)",
                    opacity: cat.required ? 0.6 : 1,
                    ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
                  }}
                >
                  <span
                    className={cn(
                      "block rounded-full shadow motion-safe:transition-transform motion-safe:duration-200",
                    )}
                    style={{
                      width: THUMB_SIZE,
                      height: THUMB_SIZE,
                      marginLeft: THUMB_OFFSET,
                      marginTop: THUMB_OFFSET,
                      backgroundColor: "var(--background)",
                      transform: isOn ? `translateX(${THUMB_TRANSLATE}px)` : "translateX(0)",
                    }}
                    aria-hidden="true"
                  />
                </button>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                    {cat.name}
                    {cat.required && (
                      <span className="ml-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                        (Required)
                      </span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs" style={{ color: "var(--muted-foreground)" }}>
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={handleSave}
            className={BTN_CLASSES}
            style={{
              backgroundColor: "transparent",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
              ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
            }}
          >
            Save Preferences
          </button>
          <button
            type="button"
            onClick={handleAcceptAll}
            className={BTN_CLASSES}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
            }}
          >
            Accept All
          </button>
        </div>
      </div>
    </div>
  );
}
