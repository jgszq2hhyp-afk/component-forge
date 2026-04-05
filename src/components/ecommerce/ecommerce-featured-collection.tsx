// @version 1.0.0
// @category ecommerce
// @name ecommerce-featured-collection
// @source custom

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const MAX_CONTENT_WIDTH = "80rem";
const SECTION_PADDING_Y = "clamp(3rem, 6vw, 6rem)";
const SECTION_PADDING_X = "clamp(1rem, 4vw, 2rem)";
const HEADING_FONT_SIZE = "clamp(1.75rem, 3.5vw, 2.75rem)";
const CARD_HEADING_FONT_SIZE = "clamp(1rem, 1.5vw, 1.25rem)";
const HERO_HEADING_FONT_SIZE = "clamp(1.25rem, 2vw, 1.75rem)";
const CARD_BORDER_RADIUS = "0.75rem";
const HERO_IMAGE_ASPECT_RATIO = "3 / 4";
const CARD_IMAGE_ASPECT_RATIO = "4 / 5";
const MAX_DESCRIPTION_WIDTH = "40rem";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface CollectionProduct {
  title: string;
  price: number;
  image: string;
  href: string;
}

interface Collection {
  title: string;
  description: string;
  products: CollectionProduct[];
}

interface EcommerceFeaturedCollectionProps {
  collection: Collection;
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
// Arrow Icon
// ---------------------------------------------------------------------------

function ArrowRightIcon() {
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
        d="M3 10a.75.75 0 01.75-.75h10.19l-2.47-2.47a.75.75 0 011.06-1.06l3.75 3.75a.75.75 0 010 1.06l-3.75 3.75a.75.75 0 11-1.06-1.06l2.47-2.47H3.75A.75.75 0 013 10z"
        clipRule="evenodd"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Hero Card (large, spans 2 columns)
// ---------------------------------------------------------------------------

function HeroProductCard({ product }: { product: CollectionProduct }) {
  return (
    <article className="group relative col-span-1 row-span-2 overflow-hidden rounded-[var(--card-radius)] border border-[var(--border)] bg-[var(--card)] md:col-span-2">
      <a
        href={product.href}
        className={cn("block h-full", focusRing)}
        style={{
          ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
          ["--card-radius" as string]: CARD_BORDER_RADIUS,
        }}
        aria-label={`${product.title} ansehen`}
      >
        <div
          className="relative h-full overflow-hidden"
          style={{ aspectRatio: HERO_IMAGE_ASPECT_RATIO }}
        >
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            decoding="async"
            className={cn(
              "h-full w-full object-cover",
              "motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out",
              "group-hover:scale-105",
              "motion-reduce:transition-none"
            )}
          />

          {/* Gradient Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.15) 40%, transparent 70%)",
            }}
            aria-hidden="true"
          />

          {/* Content Overlay */}
          <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-6 md:p-8">
            <span
              className="inline-flex w-fit items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider"
              style={{
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              }}
            >
              Featured
            </span>

            <h3
              className="font-bold text-white"
              style={{ fontSize: HERO_HEADING_FONT_SIZE }}
            >
              {product.title}
            </h3>

            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-white">
                {formatPrice(product.price)}
              </span>

              <span
                className={cn(
                  "inline-flex items-center gap-1 text-sm font-medium text-white/90",
                  "motion-safe:transition-transform motion-safe:duration-300",
                  "group-hover:translate-x-1",
                  "motion-reduce:transition-none"
                )}
              >
                Ansehen
                <ArrowRightIcon />
              </span>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Small Product Card
// ---------------------------------------------------------------------------

function SmallProductCard({ product }: { product: CollectionProduct }) {
  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-[var(--card-radius)] border border-[var(--border)] bg-[var(--card)]"
      style={{
        ["--card-radius" as string]: CARD_BORDER_RADIUS,
      }}
    >
      <a
        href={product.href}
        className={cn("block overflow-hidden", focusRing)}
        style={{
          ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
        }}
        aria-label={`${product.title} ansehen`}
      >
        <div
          className="relative overflow-hidden"
          style={{ aspectRatio: CARD_IMAGE_ASPECT_RATIO }}
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

      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3
          className="font-medium leading-snug text-[var(--foreground)] line-clamp-2"
          style={{ fontSize: CARD_HEADING_FONT_SIZE }}
        >
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

        <span className="mt-auto pt-1 text-base font-bold text-[var(--foreground)]">
          {formatPrice(product.price)}
        </span>
      </div>

      {/* Hover shadow */}
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

export default function EcommerceFeaturedCollection({
  collection,
  className,
}: EcommerceFeaturedCollectionProps) {
  const { title, description, products } = collection;

  if (products.length === 0) return null;

  const heroProduct = products[0];
  const sideProducts = products.slice(1, 5);

  return (
    <section
      className={cn("w-full", className)}
      style={{
        paddingBlock: SECTION_PADDING_Y,
        paddingInline: SECTION_PADDING_X,
      }}
      aria-labelledby="featured-collection-heading"
    >
      <div className="mx-auto" style={{ maxWidth: MAX_CONTENT_WIDTH }}>
        {/* Section Header */}
        <header className="mb-8 text-center md:mb-12">
          <h2
            id="featured-collection-heading"
            className="font-bold tracking-tight text-[var(--foreground)]"
            style={{ fontSize: HEADING_FONT_SIZE }}
          >
            {title}
          </h2>

          {description && (
            <p
              className="mx-auto mt-3 text-base leading-relaxed md:text-lg"
              style={{
                color: "var(--muted-foreground)",
                maxWidth: MAX_DESCRIPTION_WIDTH,
              }}
            >
              {description}
            </p>
          )}
        </header>

        {/* Asymmetric Grid */}
        <div className="grid gap-4 md:grid-cols-4 md:gap-5 lg:gap-6">
          {/* Hero card: spans 2 cols and 2 rows */}
          <HeroProductCard product={heroProduct} />

          {/* Side cards */}
          {sideProducts.map((product, index) => (
            <SmallProductCard
              key={`${product.href}-${index}`}
              product={product}
            />
          ))}
        </div>

        {/* Extra products below if more than 5 */}
        {products.length > 5 && (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 md:mt-5 md:grid-cols-4 md:gap-5 lg:mt-6 lg:gap-6">
            {products.slice(5).map((product, index) => (
              <SmallProductCard
                key={`extra-${product.href}-${index}`}
                product={product}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
