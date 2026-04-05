// @version 1.0.0
// @category careers
// @name careers-application-form
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useId, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const HEADING_CLAMP = "clamp(1.5rem,3vw,2.5rem)";
const SECTION_PADDING_Y = "clamp(3rem,8vw,6rem)";
const SECTION_PADDING_X = "clamp(1rem,4vw,2rem)";
const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_TYPES = ".pdf,.doc,.docx";
const INPUT_CLASSES = "w-full rounded-lg border px-4 py-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface CareersApplicationFormProps {
  jobTitle?: string;
  onSubmit?: (data: FormData) => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function CareersApplicationForm({
  jobTitle,
  onSubmit,
  className,
}: CareersApplicationFormProps) {
  const id = useId();
  const [fileName, setFileName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) { setFileName(null); return; }
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setError(`File must be under ${MAX_FILE_SIZE_MB}MB`);
      setFileName(null);
      return;
    }
    setError(null);
    setFileName(file.name);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    onSubmit?.(data);
    setSubmitted(true);
  }, [onSubmit]);

  if (submitted) {
    return (
      <section
        className={cn("w-full", className)}
        style={{ padding: `${SECTION_PADDING_Y} ${SECTION_PADDING_X}` }}
      >
        <div className="mx-auto max-w-lg text-center">
          <div
            className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full"
            style={{ backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)" }}
          >
            <svg className="size-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--primary)" }}><path d="M20 6L9 17l-5-5" /></svg>
          </div>
          <h2 className="text-xl font-bold" style={{ color: "var(--foreground)" }}>Application Submitted</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--muted-foreground)" }}>Thank you! We&apos;ll be in touch soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={cn("w-full", className)}
      style={{ padding: `${SECTION_PADDING_Y} ${SECTION_PADDING_X}` }}
      aria-labelledby={`${id}-heading`}
    >
      <div className="mx-auto max-w-lg">
        <h2
          id={`${id}-heading`}
          className="mb-2 font-bold tracking-tight"
          style={{ fontSize: HEADING_CLAMP, color: "var(--foreground)" }}
        >
          {jobTitle ? `Apply for ${jobTitle}` : "Submit Your Application"}
        </h2>
        <p className="mb-8 text-sm" style={{ color: "var(--muted-foreground)" }}>
          Fill out the form below and attach your resume.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label htmlFor={`${id}-name`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>Full Name</label>
            <input id={`${id}-name`} name="name" type="text" required className={INPUT_CLASSES} style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} placeholder="Jane Smith" />
          </div>

          {/* Email */}
          <div>
            <label htmlFor={`${id}-email`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>Email</label>
            <input id={`${id}-email`} name="email" type="email" required className={INPUT_CLASSES} style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} placeholder="jane@example.com" />
          </div>

          {/* Resume Upload */}
          <div>
            <label htmlFor={`${id}-resume`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>Resume</label>
            <div
              className="rounded-lg border-2 border-dashed p-6 text-center transition-colors"
              style={{ borderColor: "var(--border)" }}
            >
              <input id={`${id}-resume`} name="resume" type="file" accept={ACCEPTED_TYPES} onChange={handleFileChange} className="sr-only" />
              <label
                htmlFor={`${id}-resume`}
                className="cursor-pointer text-sm"
                style={{ color: "var(--muted-foreground)" }}
              >
                {fileName ? (
                  <span style={{ color: "var(--primary)" }}>{fileName}</span>
                ) : (
                  <>Click to upload or drag & drop<br /><span className="text-xs">PDF, DOC up to {MAX_FILE_SIZE_MB}MB</span></>
                )}
              </label>
            </div>
            {error && <p className="mt-1 text-xs" style={{ color: "var(--destructive, red)" }}>{error}</p>}
          </div>

          {/* Message */}
          <div>
            <label htmlFor={`${id}-message`} className="mb-1.5 block text-sm font-medium" style={{ color: "var(--foreground)" }}>Cover Letter (optional)</label>
            <textarea id={`${id}-message`} name="message" rows={4} className={cn(INPUT_CLASSES, "resize-y")} style={{ borderColor: "var(--border)", backgroundColor: "var(--background)", color: "var(--foreground)", ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))' }} placeholder="Tell us about yourself..." />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={cn(
              "w-full rounded-lg px-6 py-3 text-sm font-semibold",
              "transition-all duration-200",
              "motion-safe:hover:brightness-110 motion-safe:active:scale-[0.98]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
            )}
            style={{
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              ['--tw-ring-color' as string]: 'var(--ring, hsl(215 20% 65%))',
            }}
          >
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
}
