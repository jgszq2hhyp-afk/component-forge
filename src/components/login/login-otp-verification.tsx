// @version 1.0.0
// @category login
// @name login-otp-verification
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useId, useRef, useState } from "react";

const OTP_LENGTH = 6;
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

interface LoginOtpVerificationProps { email?: string; onVerify?: (code: string) => void; className?: string; }

export default function LoginOtpVerification({ email, onVerify, className }: LoginOtpVerificationProps) {
  const id = useId();
  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = useCallback((index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const next = [...digits];
    next[index] = value.slice(-1);
    setDigits(next);
    if (value && index < OTP_LENGTH - 1) refs.current[index + 1]?.focus();
    if (next.every((d) => d.length === 1)) onVerify?.(next.join(""));
  }, [digits, onVerify]);

  const handleKeyDown = useCallback((index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) refs.current[index - 1]?.focus();
  }, [digits]);

  return (
    <section className={cn("flex min-h-[50vh] w-full items-center justify-center", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="w-full max-w-sm text-center">
        <h1 className="text-2xl font-bold" style={{ color: "var(--foreground)" }}>Verification Code</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Enter the {OTP_LENGTH}-digit code{email ? ` sent to ${email}` : ""}
        </p>
        <div className="mt-8 flex justify-center gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => { refs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              className="size-12 rounded-lg border text-center text-lg font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
