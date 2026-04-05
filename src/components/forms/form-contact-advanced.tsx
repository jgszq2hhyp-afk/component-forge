// @version 1.0.0
// @category forms
// @name Form Contact Advanced
// @source custom

"use client";

import { useState, useCallback, useRef, type DragEvent, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ACCEPTED_FILE_TYPES = ".pdf,.doc,.docx,.png,.jpg,.jpeg,.webp";
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 2000;

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Project Request",
  "Support",
  "Partnership",
  "Other",
] as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormContactAdvancedProps {
  headline?: string;
  description?: string;
  submitLabel?: string;
  onSubmit?: (data: FormData) => void;
  className?: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  file?: string;
}

// ---------------------------------------------------------------------------
// Focus ring helper
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const ringStyle = {
  ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
};

// ---------------------------------------------------------------------------
// Floating Label Input
// ---------------------------------------------------------------------------

function FloatingInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  error,
  required = false,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  error?: string;
  required?: boolean;
}) {
  const errorId = `${id}-error`;
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        placeholder=" "
        style={ringStyle}
        className={cn(
          "peer w-full rounded-md border bg-[var(--background)] px-4 pb-2 pt-5",
          "text-sm text-[var(--foreground)] placeholder-transparent",
          "motion-safe:transition-colors motion-safe:duration-200",
          error
            ? "border-red-500"
            : hasValue
              ? "border-green-500"
              : "border-[var(--border)]",
          "hover:border-[var(--primary)]",
          focusRing
        )}
      />
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 top-1/2 -translate-y-1/2",
          "text-sm text-[var(--muted-foreground)]",
          "motion-safe:transition-all motion-safe:duration-200",
          "peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm",
          "peer-focus:top-2 peer-focus:text-xs peer-focus:text-[var(--primary)]",
          hasValue && "top-2 text-xs"
        )}
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Floating Select
// ---------------------------------------------------------------------------

function FloatingSelect({
  id,
  label,
  value,
  onChange,
  options,
  error,
  required = false,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (val: string) => void;
  options: readonly string[];
  error?: string;
  required?: boolean;
}) {
  const errorId = `${id}-error`;

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? errorId : undefined}
        style={ringStyle}
        className={cn(
          "peer w-full appearance-none rounded-md border bg-[var(--background)]",
          "px-4 pb-2 pt-5 text-sm text-[var(--foreground)]",
          "motion-safe:transition-colors motion-safe:duration-200",
          error
            ? "border-red-500"
            : value
              ? "border-green-500"
              : "border-[var(--border)]",
          "hover:border-[var(--primary)]",
          focusRing
        )}
      >
        <option value="" disabled>
          --
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-4 top-2 text-xs",
          "text-[var(--muted-foreground)]",
          "motion-safe:transition-all motion-safe:duration-200",
          "peer-focus:text-[var(--primary)]"
        )}
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {/* Dropdown chevron */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)]"
        aria-hidden="true"
      >
        <polyline points="6 9 12 15 18 9" />
      </svg>
      {error && (
        <p id={errorId} className="mt-1 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function FormContactAdvanced({
  headline = "Get in Touch",
  description,
  submitLabel = "Send Message",
  onSubmit,
  className,
}: FormContactAdvancedProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // -----------------------------------------------------------------------
  // Validation
  // -----------------------------------------------------------------------

  const validate = useCallback((): boolean => {
    const newErrors: FieldErrors = {};

    if (!name.trim()) newErrors.name = "Name is required.";
    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!EMAIL_REGEX.test(email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!subject) newErrors.subject = "Please select a subject.";
    if (!message.trim()) {
      newErrors.message = "Message is required.";
    } else if (message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message must be under ${MAX_MESSAGE_LENGTH} characters.`;
    }
    if (file && file.size > MAX_FILE_SIZE_BYTES) {
      newErrors.file = `File must be smaller than ${MAX_FILE_SIZE_MB} MB.`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [name, email, subject, message, file]);

  // -----------------------------------------------------------------------
  // File handling
  // -----------------------------------------------------------------------

  const handleFileSelect = useCallback((selectedFile: File | null) => {
    if (selectedFile && selectedFile.size > MAX_FILE_SIZE_BYTES) {
      setErrors((prev) => ({
        ...prev,
        file: `File must be smaller than ${MAX_FILE_SIZE_MB} MB.`,
      }));
      return;
    }
    setFile(selectedFile);
    setErrors((prev) => ({ ...prev, file: undefined }));
  }, []);

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const droppedFile = e.dataTransfer.files[0] ?? null;
      handleFileSelect(droppedFile);
    },
    [handleFileSelect]
  );

  const handleFileInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(e.target.files?.[0] ?? null);
    },
    [handleFileSelect]
  );

  // -----------------------------------------------------------------------
  // Submit
  // -----------------------------------------------------------------------

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!validate()) return;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("subject", subject);
      formData.append("message", message);
      if (file) formData.append("file", file);

      onSubmit?.(formData);
      setIsSubmitted(true);
    },
    [name, email, subject, message, file, validate, onSubmit]
  );

  // -----------------------------------------------------------------------
  // Success state
  // -----------------------------------------------------------------------

  if (isSubmitted) {
    return (
      <section
        className={cn(
          "w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]",
          className
        )}
        aria-label="Form submitted"
      >
        <div className="mx-auto max-w-lg text-center">
          <div
            className={cn(
              "mx-auto mb-4 flex h-16 w-16 items-center justify-center",
              "rounded-full bg-[var(--primary)]"
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--primary-foreground)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-bold text-[var(--foreground)]">
            Thank you!
          </h2>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Your message has been sent. We will get back to you soon.
          </p>
        </div>
      </section>
    );
  }

  // -----------------------------------------------------------------------
  // Render
  // -----------------------------------------------------------------------

  return (
    <section
      className={cn(
        "w-full py-[clamp(3rem,8vw,6rem)] px-[clamp(1rem,4vw,2rem)]",
        className
      )}
      aria-label="Contact form"
    >
      <div className="mx-auto max-w-lg">
        {/* ----- Header ----- */}
        <header className="mb-8 text-center">
          <h2 className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold text-[var(--foreground)]">
            {headline}
          </h2>
          {description && (
            <p className="mt-2 text-sm text-[var(--muted-foreground)]">
              {description}
            </p>
          )}
        </header>

        {/* ----- Form ----- */}
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Name & Email Row */}
          <div className="grid gap-5 sm:grid-cols-2">
            <FloatingInput
              id="contact-name"
              label="Name"
              value={name}
              onChange={setName}
              error={errors.name}
              required
            />
            <FloatingInput
              id="contact-email"
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              error={errors.email}
              required
            />
          </div>

          {/* Subject */}
          <FloatingSelect
            id="contact-subject"
            label="Subject"
            value={subject}
            onChange={setSubject}
            options={SUBJECT_OPTIONS}
            error={errors.subject}
            required
          />

          {/* Message */}
          <div className="relative">
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder=" "
              aria-invalid={errors.message ? "true" : undefined}
              aria-describedby={
                errors.message ? "contact-message-error" : "contact-message-count"
              }
              style={ringStyle}
              className={cn(
                "peer w-full resize-none rounded-md border bg-[var(--background)]",
                "px-4 pb-2 pt-6 text-sm text-[var(--foreground)] placeholder-transparent",
                "motion-safe:transition-colors motion-safe:duration-200",
                errors.message
                  ? "border-red-500"
                  : message.trim()
                    ? "border-green-500"
                    : "border-[var(--border)]",
                "hover:border-[var(--primary)]",
                focusRing
              )}
            />
            <label
              htmlFor="contact-message"
              className={cn(
                "pointer-events-none absolute left-4 top-2 text-xs",
                "text-[var(--muted-foreground)]",
                "motion-safe:transition-all motion-safe:duration-200",
                "peer-focus:text-[var(--primary)]"
              )}
            >
              Message *
            </label>
            <span
              id="contact-message-count"
              className="mt-1 block text-right text-xs text-[var(--muted-foreground)]"
            >
              {message.length}/{MAX_MESSAGE_LENGTH}
            </span>
            {errors.message && (
              <p
                id="contact-message-error"
                className="mt-1 text-xs text-red-500"
                role="alert"
              >
                {errors.message}
              </p>
            )}
          </div>

          {/* File Upload */}
          <div>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  fileInputRef.current?.click();
                }
              }}
              role="button"
              tabIndex={0}
              aria-label="Upload a file by dragging or clicking"
              style={ringStyle}
              className={cn(
                "cursor-pointer rounded-md border-2 border-dashed p-6 text-center",
                "motion-safe:transition-colors motion-safe:duration-200",
                isDragging
                  ? "border-[var(--primary)] bg-[var(--accent)]"
                  : errors.file
                    ? "border-red-500 bg-[var(--background)]"
                    : "border-[var(--border)] bg-[var(--background)]",
                "hover:border-[var(--primary)]",
                focusRing
              )}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-2 text-[var(--muted-foreground)]"
                aria-hidden="true"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="17 8 12 3 7 8" />
                <line x1="12" y1="3" x2="12" y2="15" />
              </svg>
              {file ? (
                <p className="text-sm text-[var(--foreground)]">
                  {file.name}{" "}
                  <span className="text-[var(--muted-foreground)]">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </p>
              ) : (
                <p className="text-sm text-[var(--muted-foreground)]">
                  Drag & drop a file or{" "}
                  <span className="font-medium text-[var(--primary)] underline">
                    browse
                  </span>
                </p>
              )}
              <p className="mt-1 text-xs text-[var(--muted-foreground)]">
                Max {MAX_FILE_SIZE_MB} MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept={ACCEPTED_FILE_TYPES}
                onChange={handleFileInputChange}
                className="sr-only"
                tabIndex={-1}
                aria-hidden="true"
              />
            </div>
            {errors.file && (
              <p className="mt-1 text-xs text-red-500" role="alert">
                {errors.file}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            style={ringStyle}
            className={cn(
              "w-full rounded-md bg-[var(--primary)] py-3 text-sm font-semibold",
              "text-[var(--primary-foreground)]",
              "motion-safe:transition-opacity motion-safe:duration-200",
              "hover:opacity-90",
              focusRing
            )}
          >
            {submitLabel}
          </button>
        </form>
      </div>
    </section>
  );
}
