// @source 21st.dev/r/ruixenui/cloud-watch-form

"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// SVG Cloud character (replaces external image URL)
// ---------------------------------------------------------------------------

function CloudCharacter({ eyePos, isTyping, blink }: { eyePos: { x: number; y: number }; isTyping: boolean; blink: boolean }) {
  const eyeHeight = isTyping ? 2 : blink ? 3 : 18;
  const eyeRy = isTyping ? 1 : blink ? 1.5 : 12;
  const pupilVisible = !isTyping && !blink;

  return (
    <svg viewBox="0 0 280 140" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      {/* Cloud body */}
      <ellipse cx="140" cy="95" rx="120" ry="45" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      <ellipse cx="90" cy="70" rx="55" ry="45" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      <ellipse cx="190" cy="70" rx="55" ry="45" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      <ellipse cx="140" cy="55" rx="65" ry="50" fill="var(--card)" stroke="var(--border)" strokeWidth="2" />
      {/* Fill over strokes for interior */}
      <ellipse cx="140" cy="80" rx="100" ry="40" fill="var(--card)" />

      {/* Left eye */}
      <ellipse
        cx="115"
        cy="75"
        rx="14"
        ry={eyeRy}
        fill="white"
        stroke="var(--foreground)"
        strokeWidth="2"
        style={{ transition: "all 0.15s ease" }}
      />
      {pupilVisible && (
        <circle
          cx={115 + eyePos.x * 0.15}
          cy={75}
          r="6"
          fill="var(--foreground)"
          style={{ transition: "all 0.1s ease" }}
        />
      )}

      {/* Right eye */}
      <ellipse
        cx="165"
        cy="75"
        rx="14"
        ry={eyeRy}
        fill="white"
        stroke="var(--foreground)"
        strokeWidth="2"
        style={{ transition: "all 0.15s ease" }}
      />
      {pupilVisible && (
        <circle
          cx={165 + eyePos.x * 0.15}
          cy={75}
          r="6"
          fill="var(--foreground)"
          style={{ transition: "all 0.1s ease" }}
        />
      )}

      {/* Smile */}
      <path
        d="M 120 100 Q 140 115 160 100"
        fill="none"
        stroke="var(--foreground)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FormsCloudWatch() {
  const [isTyping, setIsTyping] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const offsetX = ((cursor.x / window.innerWidth) - 0.5) * 40;
    const offsetY = ((cursor.y / window.innerHeight) - 0.5) * 20;
    setEyePos({ x: offsetX, y: offsetY });
  }, [cursor]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const inputClasses = cn(
    "w-full rounded-lg border px-3 py-2 text-sm outline-none transition-colors",
    "bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]",
    "placeholder:text-[var(--muted-foreground)]",
    "focus:border-[var(--ring)] focus:ring-2 focus:ring-[var(--ring)]/20"
  );

  const labelClasses = "text-sm font-medium text-[var(--foreground)]";

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="rounded-xl shadow-xl p-8 flex flex-col items-center gap-6 w-full max-w-md border bg-[var(--background)]/30 backdrop-blur-md border-[var(--border)]">

        {/* Cloud character */}
        <div className="relative w-[280px] h-[140px]">
          <CloudCharacter eyePos={eyePos} isTyping={isTyping} blink={blink} />
        </div>

        {/* Form fields */}
        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className={labelClasses}>Name</label>
            <input className={inputClasses} placeholder="Your Name" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClasses}>Email</label>
            <input type="email" className={inputClasses} placeholder="Your Email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClasses}>Username</label>
            <input className={inputClasses} placeholder="Username" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className={labelClasses}>Password</label>
            <input
              type="password"
              className={inputClasses}
              placeholder="Password"
              onFocus={() => setIsTyping(true)}
              onBlur={() => setIsTyping(false)}
            />
          </div>
          <button
            className={cn(
              "mt-2 w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-colors",
              "bg-[var(--primary)] text-[var(--primary-foreground,#fff)]",
              "hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)]"
            )}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
