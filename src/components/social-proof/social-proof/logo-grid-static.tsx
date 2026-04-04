// @version 1.0.0
// @category social-proof
// @name Logo Grid Static
// @source custom-implementation

import { cn } from "@/lib/utils";

interface Logo {
  name: string;
  src: string;
  href?: string;
  width?: number;
  height?: number;
}

interface LogoGridStaticProps {
  logos?: Logo[];
  heading?: string;
  columns?: 3 | 4 | 5 | 6;
  grayscale?: boolean;
  className?: string;
}

const defaultLogos: Logo[] = [
  { name: "Acme Corp", src: "/logos/acme.svg" },
  { name: "Globex", src: "/logos/globex.svg" },
  { name: "Initech", src: "/logos/initech.svg" },
  { name: "Umbrella", src: "/logos/umbrella.svg" },
  { name: "Hooli", src: "/logos/hooli.svg" },
  { name: "Stark Industries", src: "/logos/stark.svg" },
];

const columnClasses: Record<3 | 4 | 5 | 6, string> = {
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
  5: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-5",
  6: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-6",
};

export default function LogoGridStatic({
  logos = defaultLogos,
  heading = "Trusted by industry leaders",
  columns = 4,
  grayscale = true,
  className,
}: LogoGridStaticProps) {
  return (
    <section
      className={cn(
        "py-12 sm:py-16 bg-[var(--logo-grid-bg,transparent)]",
        className
      )}
      aria-label="Partner logos"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <p className="mb-10 text-center text-sm font-medium uppercase tracking-wider text-[var(--logo-grid-heading-color,hsl(0_0%_45%))]">
            {heading}
          </p>
        )}

        <div
          className={cn(
            "grid gap-8 items-center justify-items-center",
            columnClasses[columns]
          )}
        >
          {logos.map((logo) => {
            const imageElement = (
              <img
                src={logo.src}
                alt={logo.name}
                width={logo.width ?? 140}
                height={logo.height ?? 48}
                className={cn(
                  "h-8 sm:h-10 w-auto max-w-[140px] object-contain transition-all duration-300 motion-reduce:transition-none",
                  grayscale
                    ? "grayscale opacity-40 hover:grayscale-0 hover:opacity-100"
                    : "opacity-60 hover:opacity-100"
                )}
                loading="lazy"
              />
            );

            if (logo.href) {
              return (
                <a
                  key={logo.name}
                  href={logo.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4"
                >
                  {imageElement}
                </a>
              );
            }

            return (
              <div
                key={logo.name}
                className="flex items-center justify-center p-4"
              >
                {imageElement}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
