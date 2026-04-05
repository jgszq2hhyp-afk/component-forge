// @version 1.0.0
// @category forms
// @name form-newsletter-preferences
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useId, useState } from "react";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const TOGGLE_W = 44;
const TOGGLE_H = 24;
const THUMB_SIZE = 18;
const THUMB_OFFSET = 3;
const THUMB_TRANSLATE = TOGGLE_W - THUMB_SIZE - THUMB_OFFSET * 2;

interface Preference {
  id: string;
  label: string;
  description: string;
  defaultEnabled?: boolean;
}

interface FormNewsletterPreferencesProps {
  headline?: string;
  preferences: Preference[];
  onSave?: (enabled: string[]) => void;
  className?: string;
}

export default function FormNewsletterPreferences({
  headline = "Email Preferences",
  preferences,
  onSave,
  className,
}: FormNewsletterPreferencesProps) {
  const id = useId();
  const [enabled, setEnabled] = useState<Set<string>>(() => {
    const init = new Set<string>();
    preferences.forEach((p) => { if (p.defaultEnabled) init.add(p.id); });
    return init;
  });

  const toggle = useCallback((prefId: string) => {
    setEnabled((prev) => {
      const next = new Set(prev);
      if (next.has(prefId)) next.delete(prefId); else next.add(prefId);
      return next;
    });
  }, []);

  const handleSave = useCallback(() => {
    onSave?.(Array.from(enabled));
  }, [enabled, onSave]);

  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }} aria-labelledby={`${id}-heading`}>
      <div className="mx-auto max-w-lg">
        <h2 id={`${id}-heading`} className="mb-6 font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>
          {headline}
        </h2>
        <div className="space-y-4">
          {preferences.map((pref) => {
            const isOn = enabled.has(pref.id);
            return (
              <div key={pref.id} className="flex items-start justify-between gap-4 rounded-lg border p-4" style={{ borderColor: "var(--border)" }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>{pref.label}</p>
                  <p className="mt-0.5 text-xs" style={{ color: "var(--muted-foreground)" }}>{pref.description}</p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={isOn}
                  onClick={() => toggle(pref.id)}
                  className="shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    width: TOGGLE_W, height: TOGGLE_H,
                    backgroundColor: isOn ? "var(--primary)" : "var(--border)",
                    ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
                  }}
                >
                  <span className="block rounded-full shadow motion-safe:transition-transform motion-safe:duration-200" style={{ width: THUMB_SIZE, height: THUMB_SIZE, marginLeft: THUMB_OFFSET, marginTop: THUMB_OFFSET, backgroundColor: "var(--background)", transform: isOn ? `translateX(${THUMB_TRANSLATE}px)` : "translateX(0)" }} aria-hidden="true" />
                </button>
              </div>
            );
          })}
        </div>
        <button
          type="button"
          onClick={handleSave}
          className="mt-6 w-full rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
        >
          Save Preferences
        </button>
      </div>
    </section>
  );
}
