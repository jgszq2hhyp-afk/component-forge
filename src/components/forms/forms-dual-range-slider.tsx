// @source 21st.dev/r/originui/slider/dual-range-slider-with-output

"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormsDualRangeSliderProps {
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  label?: string;
  formatValue?: (value: number) => string;
  className?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function FormsDualRangeSlider({
  min = 0,
  max = 100,
  step = 1,
  defaultValue = [25, 75],
  onValueChange,
  label = "Range",
  formatValue = (v) => String(v),
  className,
}: FormsDualRangeSliderProps) {
  const [values, setValues] = useState<[number, number]>(defaultValue);
  const [activeThumb, setActiveThumb] = useState<"min" | "max" | null>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const [minVal, maxVal] = values;
  const minPercent = ((minVal - min) / (max - min)) * 100;
  const maxPercent = ((maxVal - min) / (max - min)) * 100;

  const updateValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current || !activeThumb) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percent = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
      const raw = min + (percent / 100) * (max - min);
      const snapped = Math.round(raw / step) * step;

      setValues((prev) => {
        let newValues: [number, number];
        if (activeThumb === "min") {
          newValues = [Math.min(snapped, prev[1] - step), prev[1]];
        } else {
          newValues = [prev[0], Math.max(snapped, prev[0] + step)];
        }
        return newValues;
      });
    },
    [activeThumb, min, max, step]
  );

  useEffect(() => {
    if (!activeThumb) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateValue(clientX);
    };

    const handleUp = () => setActiveThumb(null);

    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("mouseup", handleUp);
    document.addEventListener("touchend", handleUp);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("mouseup", handleUp);
      document.removeEventListener("touchend", handleUp);
    };
  }, [activeThumb, updateValue]);

  // Notify parent on change
  useEffect(() => {
    onValueChange?.(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, thumb: "min" | "max") => {
    let newMin = minVal;
    let newMax = maxVal;

    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      if (thumb === "min") newMin = Math.max(min, minVal - step);
      else newMax = Math.max(minVal + step, maxVal - step);
    } else if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      if (thumb === "min") newMin = Math.min(maxVal - step, minVal + step);
      else newMax = Math.min(max, maxVal + step);
    } else if (e.key === "Home") {
      e.preventDefault();
      if (thumb === "min") newMin = min;
      else newMax = minVal + step;
    } else if (e.key === "End") {
      e.preventDefault();
      if (thumb === "min") newMin = maxVal - step;
      else newMax = max;
    }

    setValues([newMin, newMax]);
  };

  return (
    <div className={cn("w-full max-w-sm space-y-4", className)}>
      {label && (
        <label className="block text-sm font-medium text-[var(--foreground)]">
          {label}
        </label>
      )}

      {/* Output values */}
      <div className="flex items-center justify-between text-sm">
        <output className="rounded-md border px-3 py-1 text-sm font-medium tabular-nums bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]">
          {formatValue(minVal)}
        </output>
        <span className="text-[var(--muted-foreground)]">&ndash;</span>
        <output className="rounded-md border px-3 py-1 text-sm font-medium tabular-nums bg-[var(--background)] border-[var(--border)] text-[var(--foreground)]">
          {formatValue(maxVal)}
        </output>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-2 w-full rounded-full cursor-pointer bg-[var(--muted)]"
        onMouseDown={(e) => {
          const rect = trackRef.current?.getBoundingClientRect();
          if (!rect) return;
          const percent = ((e.clientX - rect.left) / rect.width) * 100;
          const distToMin = Math.abs(percent - minPercent);
          const distToMax = Math.abs(percent - maxPercent);
          setActiveThumb(distToMin <= distToMax ? "min" : "max");
        }}
      >
        {/* Active range fill */}
        <div
          className="absolute h-full rounded-full bg-[var(--primary)]"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min thumb */}
        <button
          role="slider"
          aria-valuemin={min}
          aria-valuemax={maxVal - step}
          aria-valuenow={minVal}
          aria-label="Minimum value"
          onMouseDown={() => setActiveThumb("min")}
          onTouchStart={() => setActiveThumb("min")}
          onKeyDown={(e) => handleKeyDown(e, "min")}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 shadow-sm cursor-pointer",
            "bg-[var(--background)] border-[var(--primary)]",
            "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] focus-visible:outline-none",
            "transition-shadow motion-reduce:transition-none",
            activeThumb === "min" && "ring-2 ring-[var(--ring)]"
          )}
          style={{ left: `${minPercent}%` }}
        />

        {/* Max thumb */}
        <button
          role="slider"
          aria-valuemin={minVal + step}
          aria-valuemax={max}
          aria-valuenow={maxVal}
          aria-label="Maximum value"
          onMouseDown={() => setActiveThumb("max")}
          onTouchStart={() => setActiveThumb("max")}
          onKeyDown={(e) => handleKeyDown(e, "max")}
          className={cn(
            "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 shadow-sm cursor-pointer",
            "bg-[var(--background)] border-[var(--primary)]",
            "focus-visible:ring-2 focus-visible:ring-[var(--ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] focus-visible:outline-none",
            "transition-shadow motion-reduce:transition-none",
            activeThumb === "max" && "ring-2 ring-[var(--ring)]"
          )}
          style={{ left: `${maxPercent}%` }}
        />
      </div>

      {/* Min/Max labels */}
      <div className="flex items-center justify-between text-xs text-[var(--muted-foreground)]">
        <span>{formatValue(min)}</span>
        <span>{formatValue(max)}</span>
      </div>
    </div>
  );
}
