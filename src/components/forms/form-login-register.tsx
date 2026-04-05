// @version 1.0.0
// @category forms
// @name form-login-register
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useId, useState } from "react";

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const INPUT_CLASSES = "w-full rounded-lg border px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
const TAB_CLASSES = "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

interface FormLoginRegisterProps {
  onLogin?: (data: { email: string; password: string }) => void;
  onRegister?: (data: { name: string; email: string; password: string }) => void;
  className?: string;
}

export default function FormLoginRegister({
  onLogin,
  onRegister,
  className,
}: FormLoginRegisterProps) {
  const id = useId();
  const [tab, setTab] = useState<"login" | "register">("login");

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onLogin?.({ email: fd.get("email") as string, password: fd.get("password") as string });
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    onRegister?.({ name: fd.get("name") as string, email: fd.get("email") as string, password: fd.get("password") as string });
  };

  const inputStyle = { borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' };

  return (
    <section className={cn("w-full", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="mx-auto max-w-sm">
        <h2 className="mb-6 text-center font-bold tracking-tight" style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}>
          Welcome
        </h2>

        {/* Tabs */}
        <div className="mb-6 flex gap-1 rounded-lg border p-1" style={{ borderColor: "var(--border)" }}>
          <button type="button" onClick={() => setTab("login")} className={TAB_CLASSES} style={{ backgroundColor: tab === "login" ? "var(--primary)" : "transparent", color: tab === "login" ? "var(--primary-foreground)" : "var(--muted-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            Sign In
          </button>
          <button type="button" onClick={() => setTab("register")} className={TAB_CLASSES} style={{ backgroundColor: tab === "register" ? "var(--primary)" : "transparent", color: tab === "register" ? "var(--primary-foreground)" : "var(--muted-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
            Register
          </button>
        </div>

        {tab === "login" ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor={`${id}-le`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>Email</label>
              <input id={`${id}-le`} name="email" type="email" required className={INPUT_CLASSES} style={inputStyle} placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor={`${id}-lp`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>Password</label>
              <input id={`${id}-lp`} name="password" type="password" required className={INPUT_CLASSES} style={inputStyle} placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
              Sign In
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label htmlFor={`${id}-rn`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>Name</label>
              <input id={`${id}-rn`} name="name" type="text" required className={INPUT_CLASSES} style={inputStyle} placeholder="Jane Smith" />
            </div>
            <div>
              <label htmlFor={`${id}-re`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>Email</label>
              <input id={`${id}-re`} name="email" type="email" required className={INPUT_CLASSES} style={inputStyle} placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor={`${id}-rp`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>Password</label>
              <input id={`${id}-rp`} name="password" type="password" required minLength={8} className={INPUT_CLASSES} style={inputStyle} placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full rounded-lg px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
              Create Account
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
