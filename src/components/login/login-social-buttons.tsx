// @version 1.0.0
// @category login
// @name login-social-buttons
// @source custom

import { cn } from "@/lib/utils";

const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";
const BTN_CLASSES = "flex w-full items-center justify-center gap-3 rounded-lg border px-5 py-3 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

interface SocialProvider {
  name: string;
  icon: React.ReactNode;
  href?: string;
}

interface LoginSocialButtonsProps {
  headline?: string;
  providers: SocialProvider[];
  className?: string;
}

export default function LoginSocialButtons({
  headline = "Continue with",
  providers,
  className,
}: LoginSocialButtonsProps) {
  return (
    <section className={cn("flex min-h-[50vh] w-full items-center justify-center", className)} style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}>
      <div className="w-full max-w-sm">
        <h1 className="mb-8 text-center text-2xl font-bold" style={{ color: "var(--foreground)" }}>{headline}</h1>
        <div className="space-y-3">
          {providers.map((p) => (
            <a
              key={p.name}
              href={p.href ?? "#"}
              className={BTN_CLASSES}
              style={{
                borderColor: "var(--border)",
                backgroundColor: "var(--card)",
                color: "var(--foreground)",
                ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
              }}
            >
              {p.icon}
              {p.name}
            </a>
          ))}
        </div>
        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>or</span>
          <div className="h-px flex-1" style={{ backgroundColor: "var(--border)" }} />
        </div>
        <a href="#" className="block w-full rounded-lg px-5 py-3 text-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ backgroundColor: "var(--primary)", color: "var(--primary-foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }}>
          Sign in with Email
        </a>
      </div>
    </section>
  );
}
