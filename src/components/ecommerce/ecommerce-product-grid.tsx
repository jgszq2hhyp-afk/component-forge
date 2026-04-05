// @version 1.0.0
// @category ecommerce
// @name ecommerce-product-grid
// @source custom

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_CONTENT_WIDTH = "80rem";
const SECTION_PADDING_Y = "clamp(3rem, 6vw, 6rem)";
const SECTION_PADDING_X = "clamp(1rem, 4vw, 2rem)";
const HEADING_FONT_SIZE = "clamp(1.75rem, 3vw, 2.5rem)";
const CARD_BORDER_RADIUS = "0.75rem";
const BADGE_FONT_SIZE = "0.75rem";
const IMAGE_ASPECT_RATIO = "4 / 5";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface Product {
  title: string;
  price: number;
  salePrice?: number;
  image: string;
  badge?: "new" | "sale";
  href: string;
}

interface EcommerceProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
  headline?: string;
  currency?: string;
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

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

function getColumnsClass(columns: 2 | 3 | 4): string {
  const map: Record<2 | 3 | 4, string> = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };
  return map[columns];
}

// ---------------------------------------------------------------------------
// Badge Component
// ---------------------------------------------------------------------------

function ProductBadge({ type }: { type: "new" | "sale" }) {
  const isNew = type === "new";

  return (
    <span
      className={cn(
        "absolute top-3 left-3 z-10 inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold uppercase tracking-wide",
        isNew
          ? "text-[var(--primary-foreground)]"
          : "text-[var(--primary-foreground)]"
      )}
      style={{
        fontSize: BADGE_FONT_SIZE,
        backgroundColor: isNew ? "var(--primary)" : "var(--destructive)",
      }}
      aria-label={isNew ? "Neues Produkt" : "Im Angebot"}
    >
      {isNew ? "New" : "Sale"}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Product Card
// ---------------------------------------------------------------------------

function ProductCard({
  product,
  currency,
}: {
  product: Product;
  currency: string;
}) {
  const hasSale =
    product.salePrice !== undefined && product.salePrice < product.price;

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-[var(--card-radius)] border border-[var(--border)] bg-[var(--card)]"
      style={{
        ["--card-radius" as string]: CARD_BORDER_RADIUS,
      }}
    >
      {/* Image Container */}
      <a
        href={product.href}
        className={cn(
          "relative block overflow-hidden",
          focusRing
        )}
        style={{
          ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
        }}
        aria-label={`${product.title} ansehen`}
      >
        {product.badge && <ProductBadge type={product.badge} />}

        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: IMAGE_ASPECT_RATIO }}
        >
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className={cn(
              "h-full w-full object-cover",
              "motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out",
              "group-hover:scale-105",
              "motion-reduce:transition-none"
            )}
          />
        </div>
      </a>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h3 className="text-sm font-medium leading-snug text-[var(--foreground)] line-clamp-2">
          <a
            href={product.href}
            className={cn(
              "after:absolute after:inset-0",
              focusRing,
              "rounded-sm"
            )}
            style={{
              ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
            }}
          >
            {product.title}
          </a>
        </h3>

        <div className="mt-auto flex items-center gap-2 pt-1">
          {hasSale ? (
            <>
              <span
                className="text-base font-bold"
                style={{ color: "var(--destructive)" }}
                aria-label={`Angebotspreis: ${formatPrice(product.salePrice!, currency)}`}
              >
                {formatPrice(product.salePrice!, currency)}
              </span>
              <span
                className="text-sm line-through"
                style={{ color: "var(--muted-foreground)" }}
                aria-label={`Originalpreis: ${formatPrice(product.price, currency)}`}
              >
                {formatPrice(product.price, currency)}
              </span>
            </>
          ) : (
            <span
              className="text-base font-bold text-[var(--foreground)]"
              aria-label={`Preis: ${formatPrice(product.price, currency)}`}
            >
              {formatPrice(product.price, currency)}
            </span>
          )}
        </div>
      </div>

      {/* Hover shadow overlay */}
      <div
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[var(--card-radius)] opacity-0",
          "motion-safe:transition-opacity motion-safe:duration-300",
          "group-hover:opacity-100",
          "motion-reduce:transition-none"
        )}
        style={{
          ["--card-radius" as string]: CARD_BORDER_RADIUS,
          boxShadow:
            "0 8px 30px -8px rgba(0, 0, 0, 0.12), 0 2px 8px -2px rgba(0, 0, 0, 0.06)",
        }}
        aria-hidden="true"
      />
    </article>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function EcommerceProductGrid({
  products,
  columns = 3,
  headline,
  currency = "EUR",
  className,
}: EcommerceProductGridProps) {
  if (products.length === 0) return null;

  return (
    <section
      className={cn("w-full", className)}
      style={{
        paddingBlock: SECTION_PADDING_Y,
        paddingInline: SECTION_PADDING_X,
      }}
      aria-label={headline ?? "Produkte"}
    >
      <div className="mx-auto" style={{ maxWidth: MAX_CONTENT_WIDTH }}>
        {headline && (
          <header className="mb-8 text-center md:mb-12">
            <h2
              className="font-bold tracking-tight text-[var(--foreground)]"
              style={{ fontSize: HEADING_FONT_SIZE }}
            >
              {headline}
            </h2>
          </header>
        )}

        <div
          className={cn("grid gap-6", getColumnsClass(columns))}
          role="list"
          aria-label="Produktliste"
        >
          {products.map((product, index) => (
            <div role="listitem" key={`${product.href}-${index}`}>
              <ProductCard product={product} currency={currency} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
