// @source 21st.dev/r/easemize/sign-in
// Glass morphism sign-in form with staggered entrance animations

"use client";

import { useState, useCallback, type FormEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Inline SVG icons                                                  */
/* ------------------------------------------------------------------ */

function EyeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
    >
      <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-5 w-5", className)}
    >
      <path d="M10.733 5.076a10.744 10.744 0 0 1 11.205 6.575 1 1 0 0 1 0 .696 10.747 10.747 0 0 1-1.444 2.49" />
      <path d="M14.084 14.158a3 3 0 0 1-4.242-4.242" />
      <path d="M17.479 17.499A10.75 10.75 0 0 1 2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 4.168-5.078" />
      <line x1="2" y1="2" x2="22" y2="22" />
    </svg>
  );
}

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className={cn("h-5 w-5", className)}
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface LoginGlassFormProps {
  title?: string;
  description?: string;
  onSignIn?: (email: string, password: string) => void;
  onGoogleSignIn?: () => void;
  onResetPassword?: () => void;
  onCreateAccount?: () => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Animation helpers                                                 */
/* ------------------------------------------------------------------ */

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" as const } },
};

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function LoginGlassForm({
  title = "Welcome back",
  description = "Sign in to your account to continue",
  onSignIn,
  onGoogleSignIn,
  onResetPassword,
  onCreateAccount,
  className,
}: LoginGlassFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(false);

  const handleSubmit = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      onSignIn?.(email, password);
    },
    [email, password, onSignIn]
  );

  /* Shared glass-input wrapper styles */
  const glassInput = cn(
    "w-full rounded-xl border px-4 py-3 text-sm backdrop-blur-md",
    "transition-all duration-200",
    "placeholder:opacity-50",
    "focus-within:ring-2"
  );

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="show"
      className={cn(
        "w-full max-w-md rounded-2xl border p-8 shadow-xl backdrop-blur-xl",
        "motion-reduce:!transform-none",
        className
      )}
      style={{
        backgroundColor: "color-mix(in srgb, var(--card) 70%, transparent)",
        borderColor: "var(--border)",
      }}
    >
      {/* Header */}
      <motion.div variants={fadeUp} className="mb-6 text-center motion-reduce:!transform-none">
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--muted-foreground)" }}>
          {description}
        </p>
      </motion.div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Email */}
        <motion.div variants={fadeUp} className="motion-reduce:!transform-none">
          <label
            htmlFor="login-email"
            className="mb-1.5 block text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Email
          </label>
          <div
            className={glassInput}
            style={{
              backgroundColor: "color-mix(in srgb, var(--background) 50%, transparent)",
              borderColor: "var(--border)",
              // @ts-expect-error CSS custom property
              "--tw-ring-color": "var(--ring)",
            }}
          >
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-transparent outline-none"
              style={{ color: "var(--foreground)" }}
            />
          </div>
        </motion.div>

        {/* Password */}
        <motion.div variants={fadeUp} className="motion-reduce:!transform-none">
          <label
            htmlFor="login-password"
            className="mb-1.5 block text-sm font-medium"
            style={{ color: "var(--foreground)" }}
          >
            Password
          </label>
          <div
            className={cn(glassInput, "flex items-center gap-2")}
            style={{
              backgroundColor: "color-mix(in srgb, var(--background) 50%, transparent)",
              borderColor: "var(--border)",
              // @ts-expect-error CSS custom property
              "--tw-ring-color": "var(--ring)",
            }}
          >
            <input
              id="login-password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full bg-transparent outline-none"
              style={{ color: "var(--foreground)" }}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="shrink-0 opacity-60 transition-opacity hover:opacity-100"
              style={{ color: "var(--muted-foreground)" }}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
        </motion.div>

        {/* Keep signed in + Reset password */}
        <motion.div
          variants={fadeUp}
          className="flex items-center justify-between text-sm motion-reduce:!transform-none"
        >
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={keepSignedIn}
              onChange={(e) => setKeepSignedIn(e.target.checked)}
              className="h-4 w-4 rounded border accent-[var(--primary)]"
              style={{ borderColor: "var(--border)" }}
            />
            <span style={{ color: "var(--foreground)" }}>Keep me signed in</span>
          </label>

          <button
            type="button"
            onClick={onResetPassword}
            className="font-medium underline-offset-2 hover:underline"
            style={{ color: "var(--primary)" }}
          >
            Reset password
          </button>
        </motion.div>

        {/* Submit */}
        <motion.button
          variants={fadeUp}
          type="submit"
          className={cn(
            "mt-2 w-full rounded-xl py-3 text-sm font-semibold",
            "transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2",
            "motion-reduce:!transform-none"
          )}
          style={{
            backgroundColor: "var(--primary)",
            color: "var(--background)",
            // @ts-expect-error CSS custom property
            "--tw-ring-color": "var(--ring)",
          }}
        >
          Sign in
        </motion.button>
      </form>

      {/* Divider */}
      <motion.div
        variants={fadeUp}
        className="my-6 flex items-center gap-3 motion-reduce:!transform-none"
      >
        <span className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          Or continue with
        </span>
        <span className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
      </motion.div>

      {/* Google */}
      <motion.button
        variants={fadeUp}
        type="button"
        onClick={onGoogleSignIn}
        className={cn(
          "flex w-full items-center justify-center gap-2 rounded-xl border py-3 text-sm font-medium",
          "transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2",
          "motion-reduce:!transform-none"
        )}
        style={{
          borderColor: "var(--border)",
          backgroundColor: "color-mix(in srgb, var(--background) 50%, transparent)",
          color: "var(--foreground)",
          // @ts-expect-error CSS custom property
          "--tw-ring-color": "var(--ring)",
        }}
      >
        <GoogleIcon />
        Sign in with Google
      </motion.button>

      {/* Create account */}
      <motion.p
        variants={fadeUp}
        className="mt-6 text-center text-sm motion-reduce:!transform-none"
        style={{ color: "var(--muted-foreground)" }}
      >
        Don&apos;t have an account?{" "}
        <button
          type="button"
          onClick={onCreateAccount}
          className="font-medium underline-offset-2 hover:underline"
          style={{ color: "var(--primary)" }}
        >
          Create Account
        </button>
      </motion.p>
    </motion.div>
  );
}
