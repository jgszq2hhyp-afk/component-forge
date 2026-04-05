// @version 1.0.0
// @category ecommerce
// @name ecommerce-product-detail
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useState, useCallback } from "react";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_CONTENT_WIDTH = "72rem";
const SECTION_PADDING_Y = "clamp(2.5rem, 5vw, 5rem)";
const SECTION_PADDING_X = "clamp(1rem, 4vw, 2rem)";
const HEADING_FONT_SIZE = "clamp(1.5rem, 3vw, 2.25rem)";
const PRICE_FONT_SIZE = "clamp(1.25rem, 2.5vw, 1.75rem)";
const THUMBNAIL_SIZE = "4rem";
const MAIN_IMAGE_ASPECT_RATIO = "3 / 4";
const MIN_QUANTITY = 1;
const MAX_QUANTITY = 99;
const BUTTON_RADIUS = "0.5rem";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ProductImage {
  src: string;
  alt: string;
}

interface ProductVariant {
  label: string;
  options: string[];
}

interface ProductDetail {
  title: string;
  price: number;
  salePrice?: number;
  description: string;
  images: ProductImage[];
  variants?: ProductVariant[];
}

interface EcommerceProductDetailProps {
  product: ProductDetail;
  className?: string;
}

// ---------------------------------------------------------------------------
// Focus styles
// ---------------------------------------------------------------------------

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatPrice(amount: number): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(amount);
}

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------

function MinusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
      aria-hidden="true"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 002 1.58h9.78a2 2 0 001.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Image Gallery
// ---------------------------------------------------------------------------

function ImageGallery({ images }: { images: ProductImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = images[activeIndex] ?? images[0];

  const handleThumbnailClick = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <div className="flex flex-col-reverse gap-4 md:flex-row">
      {/* Thumbnails */}
      {images.length > 1 && (
        <nav
          className="flex gap-2 md:flex-col"
          aria-label="Produktbilder"
        >
          {images.map((image, index) => (
            <button
              key={`thumb-${index}`}
              type="button"
              onClick={() => handleThumbnailClick(index)}
              className={cn(
                "relative overflow-hidden rounded-lg border-2",
                "motion-safe:transition-all motion-safe:duration-200",
                "motion-reduce:transition-none",
                focusRing,
                index === activeIndex
                  ? "border-[var(--primary)] opacity-100"
                  : "border-[var(--border)] opacity-60 hover:opacity-100"
              )}
              style={{
                width: THUMBNAIL_SIZE,
                height: THUMBNAIL_SIZE,
                flexShrink: 0,
                ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
              }}
              aria-label={`Bild ${index + 1}: ${image.alt}`}
              aria-current={index === activeIndex ? "true" : undefined}
            >
              <img
                src={image.src}
                alt=""
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </nav>
      )}

      {/* Main Image */}
      <figure
        className="relative flex-1 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)]"
        style={{ aspectRatio: MAIN_IMAGE_ASPECT_RATIO }}
      >
        <img
          src={activeImage.src}
          alt={activeImage.alt}
          className={cn(
            "h-full w-full object-cover",
            "motion-safe:transition-opacity motion-safe:duration-300",
            "motion-reduce:transition-none"
          )}
          key={activeIndex}
        />
      </figure>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Variant Selector
// ---------------------------------------------------------------------------

function VariantSelector({
  variant,
  selected,
  onSelect,
}: {
  variant: ProductVariant;
  selected: string;
  onSelect: (option: string) => void;
}) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-sm font-medium text-[var(--foreground)]">
        {variant.label}
      </legend>
      <div className="flex flex-wrap gap-2" role="radiogroup">
        {variant.options.map((option) => {
          const isSelected = option === selected;
          return (
            <button
              key={option}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => onSelect(option)}
              className={cn(
                "inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium",
                "motion-safe:transition-all motion-safe:duration-200",
                "motion-reduce:transition-none",
                focusRing,
                isSelected
                  ? "border-[var(--primary)] bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:bg-[var(--accent)]"
              )}
              style={{
                ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
              }}
            >
              {option}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

// ---------------------------------------------------------------------------
// Quantity Selector
// ---------------------------------------------------------------------------

function QuantitySelector({
  quantity,
  onChange,
}: {
  quantity: number;
  onChange: (newQty: number) => void;
}) {
  const decrement = useCallback(() => {
    onChange(Math.max(MIN_QUANTITY, quantity - 1));
  }, [quantity, onChange]);

  const increment = useCallback(() => {
    onChange(Math.min(MAX_QUANTITY, quantity + 1));
  }, [quantity, onChange]);

  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-[var(--foreground)]">
        Anzahl
      </span>
      <div className="inline-flex items-center rounded-md border border-[var(--border)]">
        <button
          type="button"
          onClick={decrement}
          disabled={quantity <= MIN_QUANTITY}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-l-md",
            "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]",
            "disabled:pointer-events-none disabled:opacity-40",
            "motion-safe:transition-colors motion-safe:duration-150",
            "motion-reduce:transition-none",
            focusRing
          )}
          style={{
            ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
          }}
          aria-label="Anzahl verringern"
        >
          <MinusIcon />
        </button>

        <output
          className="flex h-10 min-w-[3rem] items-center justify-center border-x border-[var(--border)] text-sm font-medium text-[var(--foreground)] tabular-nums"
          aria-live="polite"
          aria-label={`Aktuelle Anzahl: ${quantity}`}
        >
          {quantity}
        </output>

        <button
          type="button"
          onClick={increment}
          disabled={quantity >= MAX_QUANTITY}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-r-md",
            "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]",
            "disabled:pointer-events-none disabled:opacity-40",
            "motion-safe:transition-colors motion-safe:duration-150",
            "motion-reduce:transition-none",
            focusRing
          )}
          style={{
            ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
          }}
          aria-label="Anzahl erhöhen"
        >
          <PlusIcon />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function EcommerceProductDetail({
  product,
  className,
}: EcommerceProductDetailProps) {
  const [quantity, setQuantity] = useState(MIN_QUANTITY);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >(() => {
    const defaults: Record<string, string> = {};
    product.variants?.forEach((v) => {
      if (v.options.length > 0) {
        defaults[v.label] = v.options[0];
      }
    });
    return defaults;
  });

  const handleVariantChange = useCallback(
    (label: string, option: string) => {
      setSelectedVariants((prev) => ({ ...prev, [label]: option }));
    },
    []
  );

  const hasSale =
    product.salePrice !== undefined && product.salePrice < product.price;

  const savingsPercent = hasSale
    ? Math.round(((product.price - product.salePrice!) / product.price) * 100)
    : 0;

  return (
    <section
      className={cn("w-full", className)}
      style={{
        paddingBlock: SECTION_PADDING_Y,
        paddingInline: SECTION_PADDING_X,
      }}
      aria-label={`Produktdetails: ${product.title}`}
    >
      <div
        className="mx-auto grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16"
        style={{ maxWidth: MAX_CONTENT_WIDTH }}
      >
        {/* Left: Image Gallery */}
        <ImageGallery images={product.images} />

        {/* Right: Product Info */}
        <div className="flex flex-col gap-6">
          <header>
            <h1
              className="font-bold tracking-tight text-[var(--foreground)]"
              style={{ fontSize: HEADING_FONT_SIZE }}
            >
              {product.title}
            </h1>

            {/* Price */}
            <div className="mt-3 flex items-baseline gap-3">
              {hasSale ? (
                <>
                  <span
                    className="font-bold"
                    style={{
                      fontSize: PRICE_FONT_SIZE,
                      color: "var(--destructive)",
                    }}
                  >
                    {formatPrice(product.salePrice!)}
                  </span>
                  <span
                    className="text-base line-through"
                    style={{ color: "var(--muted-foreground)" }}
                  >
                    {formatPrice(product.price)}
                  </span>
                  <span
                    className="inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold text-[var(--primary-foreground)]"
                    style={{ backgroundColor: "var(--destructive)" }}
                  >
                    -{savingsPercent}%
                  </span>
                </>
              ) : (
                <span
                  className="font-bold text-[var(--foreground)]"
                  style={{ fontSize: PRICE_FONT_SIZE }}
                >
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
          </header>

          {/* Description */}
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--muted-foreground)" }}
          >
            {product.description}
          </p>

          {/* Divider */}
          <hr
            className="border-[var(--border)]"
            aria-hidden="true"
          />

          {/* Variant Selectors */}
          {product.variants && product.variants.length > 0 && (
            <div className="flex flex-col gap-4">
              {product.variants.map((variant) => (
                <VariantSelector
                  key={variant.label}
                  variant={variant}
                  selected={selectedVariants[variant.label] ?? ""}
                  onSelect={(option) =>
                    handleVariantChange(variant.label, option)
                  }
                />
              ))}
            </div>
          )}

          {/* Quantity */}
          <QuantitySelector quantity={quantity} onChange={setQuantity} />

          {/* Add to Cart */}
          <button
            type="button"
            className={cn(
              "inline-flex w-full items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold",
              "bg-[var(--primary)] text-[var(--primary-foreground)]",
              "hover:opacity-90",
              "motion-safe:transition-opacity motion-safe:duration-200",
              "motion-reduce:transition-none",
              "disabled:pointer-events-none disabled:opacity-50",
              focusRing
            )}
            style={{
              borderRadius: BUTTON_RADIUS,
              ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
            }}
            aria-label={`${product.title} in den Warenkorb legen, Anzahl: ${quantity}`}
          >
            <CartIcon />
            In den Warenkorb
          </button>
        </div>
      </div>
    </section>
  );
}
