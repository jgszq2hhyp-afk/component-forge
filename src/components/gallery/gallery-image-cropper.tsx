// @source 21st.dev/r/ruixenui/image-cropper

"use client";

import * as React from "react";
import Cropper from "react-easy-crop";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface AspectOption {
  label: string;
  value: number | undefined;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ASPECT_OPTIONS: AspectOption[] = [
  { label: "1:1 (Square)", value: 1 },
  { label: "4:3", value: 4 / 3 },
  { label: "16:9", value: 16 / 9 },
  { label: "Free", value: undefined },
];

// ---------------------------------------------------------------------------
// Crop Utility
// ---------------------------------------------------------------------------

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: CropArea
): Promise<string> {
  const image = new Image();
  image.src = imageSrc;
  await new Promise<void>((resolve) => {
    image.onload = () => resolve();
  });

  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  ctx!.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob!);
      resolve(url);
    }, "image/png");
  });
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function GalleryImageCropper() {
  const [imageSrc, setImageSrc] = React.useState<string | null>(null);
  const [crop, setCrop] = React.useState({ x: 0, y: 0 });
  const [zoom, setZoom] = React.useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] =
    React.useState<CropArea | null>(null);
  const [aspect, setAspect] = React.useState<number | undefined>(1);
  const [croppedImage, setCroppedImage] = React.useState<string | null>(null);

  const onCropComplete = React.useCallback(
    (_: CropArea, croppedPixels: CropArea) => {
      setCroppedAreaPixels(croppedPixels);
    },
    []
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setCroppedImage(null);
      };
    }
  };

  const handleCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels);
    setCroppedImage(cropped);
  };

  return (
    <div
      className={cn(
        "mx-auto w-full max-w-xl rounded-xl border p-3",
        "border-[var(--border)] bg-[var(--card)]"
      )}
    >
      {/* Header */}
      <div className="p-2">
        <h3
          className="text-lg font-semibold"
          style={{ color: "var(--foreground)" }}
        >
          Image Cropper
        </h3>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-4 p-2">
        {/* File input */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={cn(
            "block w-full rounded-md border px-3 py-2 text-sm",
            "border-[var(--border)] bg-[var(--background)]",
            "text-[var(--foreground)]",
            "file:mr-4 file:rounded-md file:border-0 file:px-4 file:py-2",
            "file:bg-[var(--primary)] file:text-sm file:font-medium",
            "file:text-[var(--background)]"
          )}
        />

        {/* Cropper area */}
        {imageSrc && (
          <div
            className="relative h-[400px] w-full rounded-lg"
            style={{ backgroundColor: "var(--muted-foreground)", opacity: 0.1 }}
          >
            <div className="absolute inset-0" style={{ opacity: 1 }}>
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={aspect}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
          </div>
        )}

        {/* Controls */}
        {imageSrc && (
          <div className="mt-2 flex flex-col gap-3">
            {/* Zoom slider */}
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--foreground)" }}
              >
                Zoom:
              </span>
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg"
                style={{ accentColor: "var(--primary)" }}
              />
              <span
                className="min-w-[3ch] text-right text-sm tabular-nums"
                style={{ color: "var(--muted-foreground)" }}
              >
                {zoom.toFixed(1)}x
              </span>
            </div>

            {/* Aspect ratio select */}
            <div className="flex items-center gap-3">
              <span
                className="text-sm font-medium"
                style={{ color: "var(--foreground)" }}
              >
                Aspect:
              </span>
              <select
                value={aspect?.toString() ?? "free"}
                onChange={(e) => {
                  const val = e.target.value;
                  setAspect(val === "free" ? undefined : Number(val));
                }}
                className={cn(
                  "rounded-md border px-3 py-1.5 text-sm",
                  "border-[var(--border)] bg-[var(--background)]",
                  "text-[var(--foreground)]"
                )}
              >
                {ASPECT_OPTIONS.map((opt) => (
                  <option
                    key={opt.label}
                    value={opt.value?.toString() ?? "free"}
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Crop button */}
            <button
              onClick={handleCrop}
              className={cn(
                "mt-2 rounded-md px-4 py-2 text-sm font-medium",
                "motion-reduce:transition-none",
                "bg-[var(--primary)] text-[var(--background)]",
                "hover:opacity-90 transition-opacity"
              )}
            >
              Crop Image
            </button>
          </div>
        )}

        {/* Preview */}
        {croppedImage && (
          <div className="mt-4 flex flex-col gap-2">
            <h4
              className="text-sm font-medium"
              style={{ color: "var(--foreground)" }}
            >
              Cropped Image Preview:
            </h4>
            <img
              src={croppedImage}
              alt="Cropped"
              className="max-w-full rounded-md border"
              style={{ borderColor: "var(--border)" }}
            />
            <a
              href={croppedImage}
              download="cropped.png"
              className={cn(
                "mt-2 inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium",
                "motion-reduce:transition-none",
                "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)]",
                "hover:bg-[var(--muted-foreground)]/10 transition-colors"
              )}
            >
              Download
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
