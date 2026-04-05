// @source 21st.dev/r/Kain0127/liquid-radio
"use client";

import { useId, useState } from "react";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------
 * Types
 * ----------------------------------------------------------------*/

interface RadioOption {
  value: string;
  label: string;
  description?: string;
}

interface FormsLiquidRadioProps {
  options?: RadioOption[];
  defaultValue?: string;
  name?: string;
  onChange?: (value: string) => void;
  className?: string;
}

/* ------------------------------------------------------------------
 * SVG Glass Filter
 * ----------------------------------------------------------------*/

function GlassFilter({ filterId }: { filterId: string }) {
  return (
    <svg className="hidden" aria-hidden="true">
      <defs>
        <filter
          id={filterId}
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves={1}
            seed={1}
            result="turbulence"
          />
          <feGaussianBlur
            in="turbulence"
            stdDeviation={2}
            result="blurredNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale={30}
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur
            in="displaced"
            stdDeviation={2}
            result="finalBlur"
          />
          <feComposite
            in="finalBlur"
            in2="finalBlur"
            operator="over"
          />
        </filter>
      </defs>
    </svg>
  );
}

/* ------------------------------------------------------------------
 * RadioItem
 * ----------------------------------------------------------------*/

interface RadioItemProps {
  option: RadioOption;
  isSelected: boolean;
  name: string;
  filterId: string;
  onSelect: (value: string) => void;
}

function RadioItem({
  option,
  isSelected,
  name,
  filterId,
  onSelect,
}: RadioItemProps) {
  const itemId = useId();

  return (
    <label
      htmlFor={itemId}
      className={cn(
        "relative flex items-center gap-4 p-4 rounded-2xl cursor-pointer",
        "transition-all duration-500 motion-reduce:transition-none",
        "group"
      )}
      style={{
        backgroundColor: isSelected
          ? "color-mix(in srgb, var(--primary, #3b82f6) 8%, var(--background, #fff))"
          : "var(--background, #fff)",
        border: `2px solid ${
          isSelected
            ? "var(--primary, #3b82f6)"
            : "var(--border, #e5e7eb)"
        }`,
        boxShadow: isSelected
          ? "0 4px 20px color-mix(in srgb, var(--primary, #3b82f6) 15%, transparent)"
          : "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <input
        type="radio"
        id={itemId}
        name={name}
        value={option.value}
        checked={isSelected}
        onChange={() => onSelect(option.value)}
        className="sr-only"
      />

      {/* Liquid glass radio indicator */}
      <div className="relative flex-shrink-0">
        <div
          className={cn(
            "w-6 h-6 rounded-full border-2 transition-all duration-500 motion-reduce:transition-none",
            "flex items-center justify-center"
          )}
          style={{
            borderColor: isSelected
              ? "var(--primary, #3b82f6)"
              : "var(--border, #d1d5db)",
            backgroundColor: isSelected
              ? "color-mix(in srgb, var(--primary, #3b82f6) 10%, transparent)"
              : "transparent",
          }}
        >
          {/* Inner liquid blob */}
          <div
            className={cn(
              "rounded-full transition-all duration-500 motion-reduce:transition-none",
              isSelected ? "w-3.5 h-3.5" : "w-0 h-0"
            )}
            style={{
              backgroundColor: "var(--primary, #3b82f6)",
              filter: isSelected ? `url(#${filterId})` : "none",
              transform: isSelected ? "scale(1)" : "scale(0)",
              opacity: isSelected ? 1 : 0,
            }}
          />
        </div>

        {/* Liquid ripple effect on select */}
        <div
          className={cn(
            "absolute inset-0 rounded-full transition-all duration-700 motion-reduce:transition-none",
            isSelected ? "scale-[2] opacity-0" : "scale-100 opacity-0"
          )}
          style={{
            border: "1px solid var(--primary, #3b82f6)",
          }}
        />
      </div>

      {/* Label content */}
      <div className="flex-1 min-w-0">
        <div
          className={cn(
            "font-medium transition-colors duration-300 motion-reduce:transition-none"
          )}
          style={{
            color: isSelected
              ? "var(--foreground, #111)"
              : "var(--foreground, #374151)",
          }}
        >
          {option.label}
        </div>
        {option.description && (
          <div
            className="text-sm mt-0.5"
            style={{
              color: "var(--muted-foreground, #6b7280)",
            }}
          >
            {option.description}
          </div>
        )}
      </div>

      {/* Selected check indicator */}
      <div
        className={cn(
          "flex-shrink-0 transition-all duration-500 motion-reduce:transition-none",
          isSelected
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-2"
        )}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ color: "var(--primary, #3b82f6)" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    </label>
  );
}

/* ------------------------------------------------------------------
 * Default Options
 * ----------------------------------------------------------------*/

const DEFAULT_OPTIONS: RadioOption[] = [
  {
    value: "startup",
    label: "Startup",
    description: "Perfect for small teams and MVPs",
  },
  {
    value: "business",
    label: "Business",
    description: "For growing companies with scaling needs",
  },
  {
    value: "enterprise",
    label: "Enterprise",
    description: "Custom solutions for large organizations",
  },
];

/* ------------------------------------------------------------------
 * Main Component
 * ----------------------------------------------------------------*/

export default function FormsLiquidRadio({
  options = DEFAULT_OPTIONS,
  defaultValue,
  name,
  onChange,
  className,
}: FormsLiquidRadioProps) {
  const generatedName = useId();
  const filterId = useId().replace(/:/g, "-");
  const radioName = name ?? generatedName;

  const [selected, setSelected] = useState<string>(
    defaultValue ?? options[0]?.value ?? ""
  );

  const handleSelect = (value: string) => {
    setSelected(value);
    onChange?.(value);
  };

  return (
    <div className={cn("w-full max-w-md", className)}>
      <GlassFilter filterId={`radio-glass${filterId}`} />

      <fieldset className="space-y-3">
        <legend className="sr-only">Select an option</legend>
        {options.map((option) => (
          <RadioItem
            key={option.value}
            option={option}
            isSelected={selected === option.value}
            name={radioName}
            filterId={`radio-glass${filterId}`}
            onSelect={handleSelect}
          />
        ))}
      </fieldset>
    </div>
  );
}
