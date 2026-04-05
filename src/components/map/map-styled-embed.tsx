// @source 21st.dev/r/reapollo/map
// NOTE: The original uses maplibre-gl with full interactive map features.
// This adaptation provides a styled map embed using OpenStreetMap iframe
// to avoid requiring API keys, while preserving the visual design and controls UI.

"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface MapContextValue {
  zoom: number;
  setZoom: (z: number) => void;
  center: [number, number];
  setCenter: (c: [number, number]) => void;
  isLoaded: boolean;
}

interface MapProps {
  children?: ReactNode;
  center?: [number, number];
  zoom?: number;
  className?: string;
}

interface MapMarkerProps {
  longitude: number;
  latitude: number;
  label?: string;
  children?: ReactNode;
}

interface MapControlsProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showZoom?: boolean;
  showLocate?: boolean;
  showFullscreen?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const MapContext = createContext<MapContextValue | null>(null);

function useMapContext() {
  const ctx = useContext(MapContext);
  if (!ctx) throw new Error("useMapContext must be used within MapStyledEmbed");
  return ctx;
}

// ---------------------------------------------------------------------------
// Position classes
// ---------------------------------------------------------------------------

const POSITION_CLASSES: Record<string, string> = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-10 right-2",
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ControlButton({
  onClick,
  label,
  children,
  disabled = false,
}: {
  onClick: () => void;
  label: string;
  children: ReactNode;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      type="button"
      disabled={disabled}
      className={cn(
        "flex items-center justify-center h-8 w-8",
        "transition-colors motion-reduce:transition-none",
        disabled && "opacity-50 pointer-events-none cursor-not-allowed"
      )}
      style={{
        color: "var(--foreground)",
      }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor =
          "color-mix(in oklch, var(--foreground) 10%, transparent)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      {children}
    </button>
  );
}

function MapControlsComponent({
  position = "bottom-right",
  showZoom = true,
  showLocate = false,
  showFullscreen = false,
  className,
}: MapControlsProps) {
  const { zoom, setZoom } = useMapContext();
  const [waitingForLocation, setWaitingForLocation] = useState(false);

  const handleZoomIn = useCallback(() => setZoom(Math.min(zoom + 1, 18)), [zoom, setZoom]);
  const handleZoomOut = useCallback(() => setZoom(Math.max(zoom - 1, 1)), [zoom, setZoom]);

  const handleLocate = useCallback(() => {
    if (!("geolocation" in navigator)) return;
    setWaitingForLocation(true);
    navigator.geolocation.getCurrentPosition(
      () => setWaitingForLocation(false),
      () => setWaitingForLocation(false)
    );
  }, []);

  const handleFullscreen = useCallback(() => {
    const container = document.querySelector("[data-map-container]");
    if (!container) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      container.requestFullscreen();
    }
  }, []);

  return (
    <div
      className={cn(
        "absolute z-10 flex flex-col gap-1.5",
        POSITION_CLASSES[position],
        className
      )}
    >
      {showZoom && (
        <div
          className="flex flex-col overflow-hidden rounded-md border shadow-sm"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--background)",
          }}
        >
          <ControlButton onClick={handleZoomIn} label="Zoom in">
            <PlusIcon />
          </ControlButton>
          <div style={{ borderTop: "1px solid var(--border)" }} />
          <ControlButton onClick={handleZoomOut} label="Zoom out">
            <MinusIcon />
          </ControlButton>
        </div>
      )}
      {showLocate && (
        <div
          className="flex flex-col overflow-hidden rounded-md border shadow-sm"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--background)",
          }}
        >
          <ControlButton
            onClick={handleLocate}
            label="Find my location"
            disabled={waitingForLocation}
          >
            <LocateIcon />
          </ControlButton>
        </div>
      )}
      {showFullscreen && (
        <div
          className="flex flex-col overflow-hidden rounded-md border shadow-sm"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--background)",
          }}
        >
          <ControlButton onClick={handleFullscreen} label="Toggle fullscreen">
            <MaximizeIcon />
          </ControlButton>
        </div>
      )}
    </div>
  );
}

function MapMarkerOverlay({ longitude, latitude, label }: MapMarkerProps) {
  // Marker is purely visual -- rendered as a pin centered on the map
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <div className="relative flex flex-col items-center">
        {/* Pin */}
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          className="drop-shadow-lg"
        >
          <path
            d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
            fill="var(--primary)"
          />
          <circle cx="12" cy="9" r="2.5" fill="var(--background)" />
        </svg>
        {label && (
          <span
            className="mt-1 whitespace-nowrap rounded-md px-2 py-0.5 text-xs font-medium shadow-sm"
            style={{
              backgroundColor: "var(--background)",
              color: "var(--foreground)",
              border: "1px solid var(--border)",
            }}
          >
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inline Icons (avoid lucide dependency)
// ---------------------------------------------------------------------------

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" x2="12" y1="5" y2="19" />
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" x2="19" y1="12" y2="12" />
    </svg>
  );
}

function LocateIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function MaximizeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 3H5a2 2 0 0 0-2 2v3" />
      <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
      <path d="M3 16v3a2 2 0 0 0 2 2h3" />
      <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Loading state
// ---------------------------------------------------------------------------

function MapLoader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex gap-1">
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full motion-reduce:animate-none"
          style={{ backgroundColor: "var(--muted-foreground)", opacity: 0.6 }}
        />
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:150ms] motion-reduce:animate-none"
          style={{ backgroundColor: "var(--muted-foreground)", opacity: 0.6 }}
        />
        <span
          className="h-1.5 w-1.5 animate-pulse rounded-full [animation-delay:300ms] motion-reduce:animate-none"
          style={{ backgroundColor: "var(--muted-foreground)", opacity: 0.6 }}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function MapStyledEmbed({
  center: initialCenter = [9.9937, 53.5511], // Hamburg
  zoom: initialZoom = 13,
  className,
  markerLabel = "Hamburg, Germany",
  showControls = true,
}: {
  center?: [number, number];
  zoom?: number;
  className?: string;
  markerLabel?: string;
  showControls?: boolean;
}) {
  const [zoom, setZoom] = useState(initialZoom);
  const [center] = useState<[number, number]>(initialCenter);
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const iframeSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${center[0] - 0.02},${center[1] - 0.01},${center[0] + 0.02},${center[1] + 0.01}&layer=mapnik&marker=${center[1]},${center[0]}`;

  useEffect(() => {
    // Simulate load event
    const timer = setTimeout(() => setIsLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <MapContext.Provider value={{ zoom, setZoom, center, setCenter: () => {}, isLoaded }}>
      <div
        data-map-container
        className={cn("relative h-[500px] w-full overflow-hidden rounded-xl border", className)}
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--card)",
        }}
      >
        {/* Loading state */}
        {!isLoaded && <MapLoader />}

        {/* OpenStreetMap iframe embed */}
        <iframe
          ref={iframeRef}
          src={iframeSrc}
          className={cn(
            "h-full w-full border-0 transition-opacity duration-500 motion-reduce:transition-none",
            isLoaded ? "opacity-100" : "opacity-0"
          )}
          loading="lazy"
          title="Map"
          onLoad={() => setIsLoaded(true)}
        />

        {/* Marker overlay */}
        {markerLabel && (
          <MapMarkerOverlay
            longitude={center[0]}
            latitude={center[1]}
            label={markerLabel}
          />
        )}

        {/* Controls */}
        {showControls && (
          <MapControlsComponent
            showZoom
            showFullscreen
            showLocate
          />
        )}

        {/* Attribution */}
        <div
          className="absolute bottom-1 right-1 z-10 rounded px-1 text-[10px] opacity-70"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--muted-foreground)",
          }}
        >
          &copy; OpenStreetMap contributors
        </div>
      </div>
    </MapContext.Provider>
  );
}

// Named exports for composability
export {
  MapControlsComponent as MapControls,
  MapMarkerOverlay as MapMarker,
  MapLoader,
};
