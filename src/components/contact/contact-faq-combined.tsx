// @version 1.0.0
// @category contact
// @name contact-faq-combined
// @source custom

import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PY = "clamp(3rem,8vw,6rem)";
const SECTION_PX = "clamp(1rem,4vw,2rem)";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface FaqItem {
  question: string;
  answer: string;
}

interface ContactInfo {
  label: string;
  value: string;
  href?: string;
}

interface ContactFaqCombinedProps {
  headline?: string;
  description?: string;
  faqs: FaqItem[];
  contactDetails: ContactInfo[];
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function ContactFaqCombined({
  headline = "Questions & Contact",
  description,
  faqs,
  contactDetails,
  className,
}: ContactFaqCombinedProps) {
  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PY} ${SECTION_PX}` }}
      aria-labelledby="cfc-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-[clamp(2rem,4vw,3rem)] text-center">
          <h2
            id="cfc-heading"
            className="font-bold tracking-tight"
            style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
          >
            {headline}
          </h2>
          {description && (
            <p className="mt-3 text-sm" style={{ color: "var(--muted-foreground)" }}>
              {description}
            </p>
          )}
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* FAQ Column */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-lg font-semibold" style={{ color: "var(--foreground)" }}>
              Frequently Asked Questions
            </h3>
            <div className="space-y-2">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="group rounded-lg border"
                  style={{ borderColor: "var(--border)" }}
                >
                  <summary
                    className={cn(
                      "flex cursor-pointer items-center justify-between px-5 py-4 text-sm font-medium",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg",
                    )}
                    style={{
                      color: "var(--foreground)",
                      ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
                    }}
                  >
                    {faq.question}
                    <svg
                      className="size-4 shrink-0 motion-safe:transition-transform motion-safe:duration-200 group-open:rotate-180"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* Contact Info Column */}
          <div className="lg:col-span-2">
            <div
              className="rounded-xl border p-6"
              style={{ borderColor: "var(--border)", backgroundColor: "var(--card)" }}
            >
              <h3 className="mb-5 text-lg font-semibold" style={{ color: "var(--foreground)" }}>
                Get in Touch
              </h3>
              <ul className="space-y-4" role="list">
                {contactDetails.map((item) => (
                  <li key={item.label}>
                    <span className="block text-xs font-medium uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>
                      {item.label}
                    </span>
                    {item.href ? (
                      <a
                        href={item.href}
                        className={cn(
                          "mt-0.5 inline-block text-sm font-medium underline decoration-1 underline-offset-2",
                          "motion-safe:transition-colors motion-safe:duration-150 hover:opacity-80",
                          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm",
                        )}
                        style={{
                          color: "var(--primary)",
                          ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
                        }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="mt-0.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>
                        {item.value}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
