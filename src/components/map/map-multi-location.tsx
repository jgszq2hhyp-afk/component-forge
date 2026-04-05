// @version 1.0.0
// @category map
// @name MapMultiLocation
// @source custom

"use client";

import { cn } from "@/lib/utils";
import { useState, type ReactNode } from "react";

/* ─── Named Constants ─── */
const HEADING_FONT_SIZE = "clamp(1.5rem, 3vw, 2.25rem)";
const CARD_TITLE_FONT_SIZE = "clamp(1rem, 1.5vw, 1.25rem)";
const BODY_FONT_SIZE = "clamp(0.875rem, 1.2vw, 1rem)";
const LABEL_FONT_SIZE = "clamp(0.75rem, 1vw, 0.875rem)";
const SECTION_PADDING_Y = "clamp(3rem, 8vh, 6rem)";
const SECTION_PADDING_X = "clamp(1rem, 5vw, 3rem)";
const CARD_PADDING = "clamp(1rem, 2vw, 1.5rem)";
const CARD_BORDER_RADIUS = "0.75rem";
const MAP_MIN_HEIGHT = "20rem";
const MAP_BORDER_RADIUS = "0.75rem";
const DETAIL_GAP = "1.25rem";
const ICON_SIZE = "1.125rem";

/* ─── Types ─── */
interface OpeningHours {
  day: string;
  time: string;
}

interface Location {
  name: string;
  address: string;
  phone?: string;
  email?: string;
  hours?: OpeningHours[];
  mapEmbedUrl?: string;
}

interface MapMultiLocationProps {
  locations: Location[];
  headline?: string;
  className?: string;
}

/* ─── Icons ─── */
function MapPinIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
    </svg>
  );
}

function MailIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ClockIcon(): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={ICON_SIZE}
      height={ICON_SIZE}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

/* ─── Component ─── */
export default function MapMultiLocation({
  locations,
  headline = "Our Locations",
  className,
}: MapMultiLocationProps): ReactNode {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (locations.length === 0) return null;

  const selected = locations[selectedIndex];

  return (
    <section
      className={cn("w-full", className)}
      style={{
        paddingBlock: SECTION_PADDING_Y,
        paddingInline: SECTION_PADDING_X,
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
      aria-labelledby="multi-location-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Heading ── */}
        <h2
          id="multi-location-heading"
          className="mb-8 font-bold tracking-tight lg:mb-12"
          style={{ fontSize: HEADING_FONT_SIZE }}
        >
          {headline}
        </h2>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-10">
          {/* ── Location List ── */}
          <div
            className="flex flex-col gap-3 lg:max-h-[36rem] lg:overflow-y-auto lg:pr-2"
            role="listbox"
            aria-label="Location list"
          >
            {locations.map((location, index) => {
              const isSelected = index === selectedIndex;
              return (
                <button
                  key={`${location.name}-${index}`}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => setSelectedIndex(index)}
                  className={cn(
                    "w-full text-left motion-safe:transition-all",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  )}
                  style={{
                    padding: CARD_PADDING,
                    borderRadius: CARD_BORDER_RADIUS,
                    backgroundColor: isSelected ? "var(--primary)" : "var(--card)",
                    color: isSelected ? "var(--primary-foreground)" : "var(--card-foreground)",
                    border: isSelected
                      ? "1px solid var(--primary)"
                      : "1px solid var(--border)",
                    ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
                  }}
                >
                  <p
                    className="font-semibold"
                    style={{ fontSize: CARD_TITLE_FONT_SIZE }}
                  >
                    {location.name}
                  </p>
                  <p
                    className="mt-1 flex items-center gap-1.5"
                    style={{
                      fontSize: LABEL_FONT_SIZE,
                      opacity: isSelected ? 0.9 : 0.7,
                    }}
                  >
                    <MapPinIcon />
                    <span>{location.address}</span>
                  </p>
                </button>
              );
            })}
          </div>

          {/* ── Selected Location Details ── */}
          <div className="flex flex-col" style={{ gap: DETAIL_GAP }}>
            {/* Map */}
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: MAP_BORDER_RADIUS,
                minHeight: MAP_MIN_HEIGHT,
              }}
            >
              {selected.mapEmbedUrl ? (
                <iframe
                  src={selected.mapEmbedUrl}
                  title={`Map showing location: ${selected.name}`}
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div
                  className="flex h-full min-h-[inherit] items-center justify-center"
                  style={{
                    backgroundColor: "var(--muted)",
                    color: "var(--muted-foreground)",
                  }}
                  role="img"
                  aria-label="Map placeholder"
                >
                  <div className="text-center">
                    <span className="mx-auto flex w-fit">
                      <MapPinIcon />
                    </span>
                    <p className="mt-2" style={{ fontSize: BODY_FONT_SIZE }}>
                      Map embed unavailable
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Details Card */}
            <div
              style={{
                padding: CARD_PADDING,
                borderRadius: CARD_BORDER_RADIUS,
                backgroundColor: "var(--card)",
                color: "var(--card-foreground)",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                className="mb-4 font-bold"
                style={{ fontSize: CARD_TITLE_FONT_SIZE }}
              >
                {selected.name}
              </h3>

              <div className="grid gap-4 sm:grid-cols-2">
                {/* Address */}
                <div className="flex items-start gap-2.5">
                  <span
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--primary)" }}
                  >
                    <MapPinIcon />
                  </span>
                  <address
                    className="not-italic leading-relaxed"
                    style={{ fontSize: BODY_FONT_SIZE }}
                  >
                    {selected.address}
                  </address>
                </div>

                {/* Phone */}
                {selected.phone ? (
                  <div className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--primary)" }}
                    >
                      <PhoneIcon />
                    </span>
                    <a
                      href={`tel:${selected.phone.replace(/\s/g, "")}`}
                      className="motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{
                        fontSize: BODY_FONT_SIZE,
                        color: "var(--primary)",
                        ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
                        borderRadius: "0.25rem",
                      }}
                    >
                      {selected.phone}
                    </a>
                  </div>
                ) : null}

                {/* Email */}
                {selected.email ? (
                  <div className="flex items-start gap-2.5">
                    <span
                      className="mt-0.5 shrink-0"
                      style={{ color: "var(--primary)" }}
                    >
                      <MailIcon />
                    </span>
                    <a
                      href={`mailto:${selected.email}`}
                      className="motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                      style={{
                        fontSize: BODY_FONT_SIZE,
                        color: "var(--primary)",
                        ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
                        borderRadius: "0.25rem",
                      }}
                    >
                      {selected.email}
                    </a>
                  </div>
                ) : null}
              </div>

              {/* Opening Hours */}
              {selected.hours && selected.hours.length > 0 ? (
                <div className="mt-4 flex items-start gap-2.5">
                  <span
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--primary)" }}
                  >
                    <ClockIcon />
                  </span>
                  <div className="w-full">
                    <p
                      className="mb-2 font-semibold"
                      style={{
                        fontSize: LABEL_FONT_SIZE,
                        color: "var(--muted-foreground)",
                      }}
                    >
                      Opening Hours
                    </p>
                    <dl
                      className="grid gap-1"
                      style={{ fontSize: BODY_FONT_SIZE }}
                    >
                      {selected.hours.map((entry) => (
                        <div
                          key={entry.day}
                          className="flex items-center justify-between gap-4"
                        >
                          <dt className="font-medium">{entry.day}</dt>
                          <dd style={{ color: "var(--muted-foreground)" }}>
                            {entry.time}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
