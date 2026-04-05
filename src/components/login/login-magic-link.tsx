// @version 1.0.0
// @category login
// @name login-magic-link
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useId, useState } from "react";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const INPUT_CLASSES = "w-full rounded-lg border px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

interface LoginMagicLinkProps {
  onSubmit?: (email: string) => void;
  className?: string;
}

export default function LoginMagicLink({ onSubmit, className }: LoginMagicLinkProps) {
  const id = useId();
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(email);
    setSent(true);
  }, [email, onSubmit]);

  return (
    <section className={cn("flex min-h-[50vh] w-full items-center justify-center", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="w-full max-w-sm text-center">
        {sent ? (
          <>
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full" style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)" }}>
              <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
            </div>
            <h1 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Check your email</h1>
            <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>We sent a magic link to <strong>{email}</strong></p>
          </>
        ) : (
          <>
            <h1 className="mb-2 text-2xl font-bold" style={{ color: "var(--foreground)" }}>Sign in</h1>
            <p className="mb-8 text-sm" style={{ color: "var(--muted-foreground)" }}>Enter your email and we'll send you a magic link</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-left">
                <label htmlFor={`${id}-e`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>Email</label>
                <input id={`${id}-e`} type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className={INPUT_CLASSES} style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} placeholder="you@example.com" />
              </div>
              <button type="submit" className="w-full rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
                Send Magic Link
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  );
}
