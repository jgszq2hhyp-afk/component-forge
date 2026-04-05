// @source 21st.dev/r/hextaui/file-upload

"use client";

import { useState, useRef, type DragEvent, type ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// SVG Icons (inline, no lucide dependency)
// ---------------------------------------------------------------------------

function UploadCloudIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}

function FileIconSvg({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}

function Trash2Icon({ className, onClick, ariaLabel }: { className?: string; onClick?: (e: React.MouseEvent) => void; ariaLabel?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      role="button"
      tabIndex={0}
    >
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
      <line x1="10" x2="10" y1="11" y2="17" />
      <line x1="14" x2="14" y1="11" y2="17" />
    </svg>
  );
}

function LoaderIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="12" x2="12" y1="2" y2="6" />
      <line x1="12" x2="12" y1="18" y2="22" />
      <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
      <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
      <line x1="2" x2="6" y1="12" y2="12" />
      <line x1="18" x2="22" y1="12" y2="12" />
      <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
      <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <path d="m9 11 3 3L22 4" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FileWithPreview {
  id: string;
  preview: string;
  progress: number;
  name: string;
  size: number;
  type: string;
  lastModified?: number;
  file?: File;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FormsFileUpload() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      id: `${URL.createObjectURL(file)}-${Date.now()}`,
      preview: URL.createObjectURL(file),
      progress: 0,
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      file,
    }));
    setFiles((prev) => [...prev, ...newFiles]);
    newFiles.forEach((f) => simulateUpload(f.id));
  };

  const simulateUpload = (id: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      setFiles((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, progress: Math.min(progress, 100) } : f
        )
      );
      if (progress >= 100) {
        clearInterval(interval);
        if (navigator.vibrate) navigator.vibrate(100);
      }
    }, 300);
  };

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const onDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) handleFiles(e.target.files);
  };

  const formatFileSize = (bytes: number): string => {
    if (!bytes) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6">
      <motion.div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => inputRef.current?.click()}
        initial={false}
        animate={{
          borderColor: isDragging ? "var(--primary)" : "var(--border)",
          scale: isDragging ? 1.02 : 1,
        }}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "relative rounded-2xl p-8 md:p-12 text-center cursor-pointer border shadow-sm hover:shadow-md backdrop-blur group motion-reduce:transition-none",
          "bg-[var(--card)] border-[var(--border)]",
          isDragging && "ring-4 ring-[var(--ring)]/30 border-[var(--primary)]"
        )}
      >
        <div className="flex flex-col items-center gap-5">
          <motion.div
            animate={{ y: isDragging ? [-5, 0, -5] : 0 }}
            transition={{
              duration: 1.5,
              repeat: isDragging ? Infinity : 0,
              ease: "easeInOut" as const,
            }}
            className="relative motion-reduce:animate-none"
          >
            <motion.div
              animate={{
                opacity: isDragging ? [0.5, 1, 0.5] : 1,
                scale: isDragging ? [0.95, 1.05, 0.95] : 1,
              }}
              transition={{
                duration: 2,
                repeat: isDragging ? Infinity : 0,
                ease: "easeInOut" as const,
              }}
              className="absolute -inset-4 bg-[var(--primary)]/10 rounded-full blur-md motion-reduce:hidden"
              style={{ display: isDragging ? "block" : "none" }}
            />
            <UploadCloudIcon
              className={cn(
                "w-16 h-16 md:w-20 md:h-20 drop-shadow-sm transition-colors duration-300",
                isDragging
                  ? "text-[var(--primary)]"
                  : "text-[var(--muted-foreground)] group-hover:text-[var(--primary)]"
              )}
            />
          </motion.div>

          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-semibold text-[var(--foreground)]">
              {isDragging
                ? "Drop files here"
                : files.length
                  ? "Add more files"
                  : "Upload your files"}
            </h3>
            <p className="text-[var(--muted-foreground)] md:text-lg max-w-md mx-auto">
              {isDragging ? (
                <span className="font-medium text-[var(--primary)]">
                  Release to upload
                </span>
              ) : (
                <>
                  Drag & drop files here, or{" "}
                  <span className="text-[var(--primary)] font-medium">browse</span>
                </>
              )}
            </p>
            <p className="text-sm text-[var(--muted-foreground)]">
              Supports images, documents, videos, and more
            </p>
          </div>

          <input
            ref={inputRef}
            type="file"
            multiple
            hidden
            onChange={onSelect}
            accept="image/*,application/pdf,video/*,audio/*,text/*,application/zip"
          />
        </div>
      </motion.div>

      <div className="mt-8">
        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-between items-center mb-3 px-2"
            >
              <h3 className="font-semibold text-lg md:text-xl text-[var(--foreground)]">
                Uploaded files ({files.length})
              </h3>
              {files.length > 1 && (
                <button
                  onClick={() => setFiles([])}
                  className="text-sm font-medium px-3 py-1 rounded-md transition-colors duration-200 bg-[var(--muted)] text-[var(--muted-foreground)] hover:text-[var(--destructive)]"
                >
                  Clear all
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div
          className={cn(
            "flex flex-col gap-3 overflow-y-auto pr-2",
            files.length > 3 && "max-h-96"
          )}
        >
          <AnimatePresence>
            {files.map((file) => (
              <motion.div
                key={file.id}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring" as const, stiffness: 300, damping: 24 }}
                className="px-4 py-4 flex items-start gap-4 rounded-xl shadow hover:shadow-md transition-all duration-200 motion-reduce:transition-none bg-[var(--card)] border border-[var(--border)]"
              >
                <div className="relative flex-shrink-0">
                  {file.type.startsWith("image/") ? (
                    <img
                      src={file.preview}
                      alt={file.name}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover border border-[var(--border)] shadow-sm"
                    />
                  ) : file.type.startsWith("video/") ? (
                    <video
                      src={file.preview}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-lg object-cover border border-[var(--border)] shadow-sm"
                      controls={false}
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      poster=""
                    />
                  ) : (
                    <FileIconSvg className="w-16 h-16 md:w-20 md:h-20 text-[var(--muted-foreground)]" />
                  )}
                  {file.progress === 100 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute -right-2 -bottom-2 bg-[var(--background)] rounded-full shadow-sm"
                    >
                      <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                    </motion.div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center gap-2 min-w-0">
                      <FileIconSvg className="w-5 h-5 flex-shrink-0 text-[var(--primary)]" />
                      <h4
                        className="font-medium text-base md:text-lg truncate text-[var(--foreground)]"
                        title={file.name}
                      >
                        {file.name}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm text-[var(--muted-foreground)]">
                      <span className="text-xs md:text-sm">
                        {formatFileSize(file.size)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="font-medium">
                          {Math.round(file.progress)}%
                        </span>
                        {file.progress < 100 ? (
                          <LoaderIcon className="w-4 h-4 animate-spin text-[var(--primary)] motion-reduce:animate-none" />
                        ) : (
                          <Trash2Icon
                            className="w-4 h-4 cursor-pointer text-[var(--muted-foreground)] hover:text-[var(--destructive)] transition-colors duration-200"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFiles((prev) =>
                                prev.filter((f) => f.id !== file.id)
                              );
                            }}
                            ariaLabel="Remove file"
                          />
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="w-full h-2 bg-[var(--muted)] rounded-full overflow-hidden mt-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${file.progress}%` }}
                      transition={{
                        duration: 0.4,
                        type: "spring" as const,
                        stiffness: 100,
                      }}
                      className={cn(
                        "h-full rounded-full shadow-inner motion-reduce:transition-none",
                        file.progress < 100 ? "bg-[var(--primary)]" : "bg-emerald-500"
                      )}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
