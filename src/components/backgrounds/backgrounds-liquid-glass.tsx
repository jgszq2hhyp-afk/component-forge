// @source 21st.dev/r/suraj-xd/liquid-glass
"use client";

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
 * Types
 * ----------------------------------------------------------------*/

interface GlassEffectProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  href?: string;
  target?: string;
}

interface DockIconData {
  label: string;
  emoji: string;
  onClick?: () => void;
}

interface GlassDockProps {
  icons: DockIconData[];
  href?: string;
}

interface GlassButtonProps {
  children: React.ReactNode;
  href?: string;
}

interface BackgroundsLiquidGlassProps {
  dockIcons?: DockIconData[];
  promptText?: string;
  className?: string;
}

/* ------------------------------------------------------------------
 * Inline SVG placeholder for dock icons
 * ----------------------------------------------------------------*/

const ICON_COLORS = [
  "#8B5CF6",
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#EC4899",
];

function IconPlaceholder({ label, index }: { label: string; index: number }) {
  const color = ICON_COLORS[index % ICON_COLORS.length];
  return (
    <div
      className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold transition-all duration-700 hover:scale-110 cursor-pointer motion-reduce:transition-none"
      style={{
        backgroundColor: color,
        transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
        color: "#fff",
      }}
      title={label}
    >
      {label.charAt(0).toUpperCase()}
    </div>
  );
}

/* ------------------------------------------------------------------
 * SVG Glass Filter
 * ----------------------------------------------------------------*/

function GlassFilter() {
  return (
    <svg style={{ display: "none" }}>
      <filter
        id="glass-distortion"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        filterUnits="objectBoundingBox"
      >
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.001 0.005"
          numOctaves={1}
          seed={17}
          result="turbulence"
        />
        <feComponentTransfer in="turbulence" result="mapped">
          <feFuncR type="gamma" amplitude={1} exponent={10} offset={0.5} />
          <feFuncG type="gamma" amplitude={0} exponent={1} offset={0} />
          <feFuncB type="gamma" amplitude={0} exponent={1} offset={0.5} />
        </feComponentTransfer>
        <feGaussianBlur in="turbulence" stdDeviation={3} result="softMap" />
        <feSpecularLighting
          in="softMap"
          surfaceScale={5}
          specularConstant={1}
          specularExponent={100}
          lightingColor="white"
          result="specLight"
        >
          <fePointLight x={-200} y={-200} z={300} />
        </feSpecularLighting>
        <feComposite
          in="specLight"
          operator="arithmetic"
          k1={0}
          k2={1}
          k3={1}
          k4={0}
          result="litImage"
        />
        <feDisplacementMap
          in="SourceGraphic"
          in2="softMap"
          scale={200}
          xChannelSelector="R"
          yChannelSelector="G"
        />
      </filter>
    </svg>
  );
}

/* ------------------------------------------------------------------
 * GlassEffect Wrapper
 * ----------------------------------------------------------------*/

function GlassEffect({
  children,
  className = "",
  style = {},
  href,
  target = "_blank",
}: GlassEffectProps) {
  const glassStyle: React.CSSProperties = {
    boxShadow:
      "0 6px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(0, 0, 0, 0.1)",
    transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
    ...style,
  };

  const content = (
    <div
      className={cn(
        "relative flex font-semibold overflow-hidden cursor-pointer transition-all duration-700 motion-reduce:transition-none",
        className
      )}
      style={{ ...glassStyle, color: "var(--foreground, #000)" }}
    >
      {/* Glass layers */}
      <div
        className="absolute inset-0 z-0 overflow-hidden rounded-3xl"
        style={{
          backdropFilter: "blur(3px)",
          filter: "url(#glass-distortion)",
          isolation: "isolate",
        }}
      />
      <div
        className="absolute inset-0 z-10 rounded-3xl"
        style={{ background: "rgba(255, 255, 255, 0.25)" }}
      />
      <div
        className="absolute inset-0 z-20 rounded-3xl overflow-hidden"
        style={{
          boxShadow:
            "inset 2px 2px 1px 0 rgba(255, 255, 255, 0.5), inset -1px -1px 1px 1px rgba(255, 255, 255, 0.5)",
        }}
      />

      {/* Content */}
      <div className="relative z-30">{children}</div>
    </div>
  );

  return href ? (
    <a
      href={href}
      target={target}
      rel="noopener noreferrer"
      className="block"
    >
      {content}
    </a>
  ) : (
    content
  );
}

/* ------------------------------------------------------------------
 * GlassDock
 * ----------------------------------------------------------------*/

function GlassDock({ icons, href }: GlassDockProps) {
  return (
    <GlassEffect
      href={href}
      className="rounded-3xl p-3 hover:p-4 hover:rounded-[2rem]"
    >
      <div className="flex items-center justify-center gap-2 rounded-3xl p-3 py-0 px-0.5 overflow-hidden">
        {icons.map((icon, index) => (
          <div
            key={`${icon.label}-${index}`}
            onClick={icon.onClick}
            className="cursor-pointer"
          >
            <IconPlaceholder label={icon.label} index={index} />
          </div>
        ))}
      </div>
    </GlassEffect>
  );
}

/* ------------------------------------------------------------------
 * GlassButton
 * ----------------------------------------------------------------*/

function GlassButton({ children, href }: GlassButtonProps) {
  return (
    <GlassEffect
      href={href}
      className="rounded-3xl px-10 py-6 hover:px-11 hover:py-7 hover:rounded-[2rem] overflow-hidden"
    >
      <div
        className="transition-all duration-700 hover:scale-95 motion-reduce:transition-none"
        style={{
          transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 2.2)",
        }}
      >
        {children}
      </div>
    </GlassEffect>
  );
}

/* ------------------------------------------------------------------
 * Background Pattern (replaces external Unsplash image)
 * ----------------------------------------------------------------*/

function GradientBackground() {
  return (
    <div
      className="absolute inset-0 w-full h-full"
      style={{
        background: `
          linear-gradient(135deg,
            #667eea 0%,
            #764ba2 25%,
            #f77062 50%,
            #eb5757 75%,
            #43e97b 100%
          )`,
        backgroundSize: "400% 400%",
        animation: "moveBackground 30s ease infinite",
      }}
    >
      {/* Overlay noise texture */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 30%, rgba(255,255,255,0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(0,0,0,0.05) 0%, transparent 80%)
          `,
        }}
      />
      <style>{`
        @keyframes moveBackground {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .motion-reduce\\:animate-none {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------------------------------------------
 * Default Dock Icons
 * ----------------------------------------------------------------*/

const DEFAULT_ICONS: DockIconData[] = [
  { label: "Claude", emoji: "C" },
  { label: "Finder", emoji: "F" },
  { label: "Chat", emoji: "G" },
  { label: "Maps", emoji: "M" },
  { label: "Safari", emoji: "S" },
  { label: "Steam", emoji: "T" },
];

/* ------------------------------------------------------------------
 * Main Component
 * ----------------------------------------------------------------*/

export default function BackgroundsLiquidGlass({
  dockIcons = DEFAULT_ICONS,
  promptText = "How can I help you today?",
  className,
}: BackgroundsLiquidGlassProps) {
  return (
    <div
      className={cn(
        "min-h-screen h-full flex items-center justify-center font-light relative overflow-hidden w-full",
        className
      )}
    >
      <GradientBackground />
      <GlassFilter />

      <div className="relative z-10 flex flex-col gap-6 items-center justify-center w-full px-4">
        <GlassDock icons={dockIcons} />

        <GlassButton>
          <div
            className="text-xl"
            style={{ color: "var(--foreground, #fff)" }}
          >
            <p>{promptText}</p>
          </div>
        </GlassButton>
      </div>
    </div>
  );
}
