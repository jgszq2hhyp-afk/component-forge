// @version 1.0.0
// @category login
// @name login-simple
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useId } from "react";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const INPUT_CLASSES = "w-full rounded-lg border px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

interface LoginSimpleProps {
  onSubmit?: (data: { email: string; password: string }) => void;
  className?: string;
}

export default function LoginSimple({ onSubmit, className }: LoginSimpleProps) {
  const id = useId();
  const inputStyle = { borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onSubmit?.({ email: fd.get("email") as string, password: fd.get("password") as string });
  };

  return (
    <section className={cn("flex min-h-[60vh] w-full items-center justify-center", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor={`${id}-e`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>Email</label>
            <input id={`${id}-e`} name="email" type="email" required className={INPUT_CLASSES} style={inputStyle} placeholder="you@example.com" />
          </div>
          <div>
            <label htmlFor={`${id}-p`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>Password</label>
            <input id={`${id}-p`} name="password" type="password" required className={INPUT_CLASSES} style={inputStyle} placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full rounded-lg px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            Sign In
          </button>
        </form>
      </div>
    </section>
  );
}
