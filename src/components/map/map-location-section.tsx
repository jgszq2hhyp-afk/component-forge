// @version 1.0.0
// @category map
// @name MapLocationSection
// @source custom

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/* ─── Named Constants ─── */
const HEADING_FONT_SIZE = "clamp(1.5rem, 3vw, 2.25rem)";
const BODY_FONT_SIZE = "clamp(0.875rem, 1.2vw, 1rem)";
const LABEL_FONT_SIZE = "clamp(0.75rem, 1vw, 0.875rem)";
const SECTION_PADDING_Y = "clamp(3rem, 8vh, 6rem)";
const SECTION_PADDING_X = "clamp(1rem, 5vw, 3rem)";
const MAP_MIN_HEIGHT = "24rem";
const MAP_BORDER_RADIUS = "0.75rem";
const CARD_BORDER_RADIUS = "0.75rem";
const CARD_PADDING = "clamp(1.25rem, 3vw, 2rem)";
const INFO_GAP = "1.5rem";
const ICON_SIZE = "1.25rem";

/* ─── Props ─── */
interface OpeningHours {
  day: string;
  time: string;
}

interface MapLocationSectionProps {
  address: string;
  mapEmbedUrl?: string;
  phone?: string;
  email?: string;
  hours?: OpeningHours[];
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
export default function MapLocationSection({
  address,
  mapEmbedUrl,
  phone,
  email,
  hours,
  headline = "Our Location",
  className,
}: MapLocationSectionProps): ReactNode {
  return (
    <section
      className={cn("w-full", className)}
      style={{
        paddingBlock: SECTION_PADDING_Y,
        paddingInline: SECTION_PADDING_X,
        backgroundColor: "var(--background)",
        color: "var(--foreground)",
      }}
      aria-labelledby="map-location-heading"
    >
      <div className="mx-auto max-w-7xl">
        {/* ── Heading ── */}
        <h2
          id="map-location-heading"
          className="mb-8 font-bold tracking-tight lg:mb-12"
          style={{ fontSize: HEADING_FONT_SIZE }}
        >
          {headline}
        </h2>

        {/* ── Split Layout ── */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* ── Map Embed ── */}
          <div
            className="relative overflow-hidden"
            style={{ borderRadius: MAP_BORDER_RADIUS, minHeight: MAP_MIN_HEIGHT }}
          >
            {mapEmbedUrl ? (
              <iframe
                src={mapEmbedUrl}
                title={`Map showing location: ${address}`}
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
                  <MapPinIcon />
                  <p className="mt-2" style={{ fontSize: BODY_FONT_SIZE }}>
                    Map embed unavailable
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* ── Info Card ── */}
          <div
            className="flex flex-col"
            style={{
              gap: INFO_GAP,
              padding: CARD_PADDING,
              borderRadius: CARD_BORDER_RADIUS,
              backgroundColor: "var(--card)",
              color: "var(--card-foreground)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Address */}
            <div className="flex items-start gap-3">
              <span
                className="mt-0.5 shrink-0"
                style={{ color: "var(--primary)" }}
              >
                <MapPinIcon />
              </span>
              <div>
                <p
                  className="mb-1 font-semibold"
                  style={{ fontSize: LABEL_FONT_SIZE, color: "var(--muted-foreground)" }}
                >
                  Address
                </p>
                <address
                  className="not-italic leading-relaxed"
                  style={{ fontSize: BODY_FONT_SIZE }}
                >
                  {address}
                </address>
              </div>
            </div>

            {/* Phone */}
            {phone ? (
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 shrink-0"
                  style={{ color: "var(--primary)" }}
                >
                  <PhoneIcon />
                </span>
                <div>
                  <p
                    className="mb-1 font-semibold"
                    style={{ fontSize: LABEL_FONT_SIZE, color: "var(--muted-foreground)" }}
                  >
                    Phone
                  </p>
                  <a
                    href={`tel:${phone.replace(/\s/g, "")}`}
                    className="motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{
                      fontSize: BODY_FONT_SIZE,
                      color: "var(--primary)",
                      ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {phone}
                  </a>
                </div>
              </div>
            ) : null}

            {/* Email */}
            {email ? (
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 shrink-0"
                  style={{ color: "var(--primary)" }}
                >
                  <MailIcon />
                </span>
                <div>
                  <p
                    className="mb-1 font-semibold"
                    style={{ fontSize: LABEL_FONT_SIZE, color: "var(--muted-foreground)" }}
                  >
                    Email
                  </p>
                  <a
                    href={`mailto:${email}`}
                    className="motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                    style={{
                      fontSize: BODY_FONT_SIZE,
                      color: "var(--primary)",
                      ["--tw-ring-color" as string]: "var(--ring, hsl(215 20% 65%))",
                      borderRadius: "0.25rem",
                    }}
                  >
                    {email}
                  </a>
                </div>
              </div>
            ) : null}

            {/* Opening Hours */}
            {hours && hours.length > 0 ? (
              <div className="flex items-start gap-3">
                <span
                  className="mt-0.5 shrink-0"
                  style={{ color: "var(--primary)" }}
                >
                  <ClockIcon />
                </span>
                <div className="w-full">
                  <p
                    className="mb-2 font-semibold"
                    style={{ fontSize: LABEL_FONT_SIZE, color: "var(--muted-foreground)" }}
                  >
                    Opening Hours
                  </p>
                  <dl
                    className="grid gap-1"
                    style={{ fontSize: BODY_FONT_SIZE }}
                  >
                    {hours.map((entry) => (
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
    </section>
  );
}
