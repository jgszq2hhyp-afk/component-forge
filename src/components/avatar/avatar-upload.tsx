// @version 1.0.0
// @category avatar
// @name avatar-upload
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Constants                                                         */
/* ------------------------------------------------------------------ */

const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif"] as const;

const MAX_FILE_SIZE_MB = 5;

const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

const PREVIEW_SIZE = "h-28 w-28" as const;

const DROP_ZONE_MIN_HEIGHT = "min-h-[12rem]" as const;

/* ------------------------------------------------------------------ */
/*  Types                                                             */
/* ------------------------------------------------------------------ */

interface AvatarUploadProps {
  currentSrc?: string;
  onUpload?: (file: File) => void;
  className?: string;
}

/* ------------------------------------------------------------------ */
/*  Upload Icon (inline SVG)                                          */
/* ------------------------------------------------------------------ */

function UploadIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export default function AvatarUpload({
  currentSrc,
  onUpload,
  className,
}: AvatarUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentSrc ?? null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);

      if (!ACCEPTED_TYPES.includes(file.type as typeof ACCEPTED_TYPES[number])) {
        setError("Only PNG, JPEG, WebP and GIF are allowed.");
        return;
      }

      if (file.size > MAX_FILE_SIZE_BYTES) {
        setError(`File must be under ${MAX_FILE_SIZE_MB} MB.`);
        return;
      }

      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onUpload?.(file);
    },
    [onUpload],
  );

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleClick = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        inputRef.current?.click();
      }
    },
    [],
  );

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Drop zone */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Upload avatar image. Click or drag and drop."
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed px-4 py-8",
          DROP_ZONE_MIN_HEIGHT,
          "motion-safe:transition-colors motion-safe:duration-200",
          "motion-reduce:transition-none",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          isDragging && "border-solid",
        )}
        style={{
          borderColor: isDragging
            ? "var(--primary)"
            : "var(--border, hsl(0 0% 85%))",
          backgroundColor: isDragging
            ? "var(--muted, hsl(0 0% 96%))"
            : "transparent",
          color: "var(--muted-foreground)",
          // @ts-expect-error -- CSS custom property
          "--tw-ring-color": "var(--ring, var(--primary))",
          "--tw-ring-offset-color": "var(--background)",
        }}
      >
        {preview ? (
          <div
            className={cn(
              "overflow-hidden rounded-full border-2",
              PREVIEW_SIZE,
            )}
            style={{ borderColor: "var(--border, hsl(0 0% 90%))" }}
          >
            <img
              src={preview}
              alt="Avatar preview"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <UploadIcon className="h-8 w-8" />
        )}

        <p className="text-center text-sm">
          <span className="font-medium" style={{ color: "var(--primary)" }}>
            Click to upload
          </span>{" "}
          or drag and drop
        </p>
        <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          PNG, JPG, WebP or GIF (max {MAX_FILE_SIZE_MB} MB)
        </p>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleChange}
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
      />

      {/* Error message */}
      {error && (
        <p
          className="text-sm font-medium"
          role="alert"
          style={{ color: "var(--destructive, hsl(0 84% 60%))" }}
        >
          {error}
        </p>
      )}
    </div>
  );
}
