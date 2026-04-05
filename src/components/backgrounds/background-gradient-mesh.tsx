// @version 2.0.0
// @category backgrounds
// @name background-gradient-mesh
// @source aura-inspired

import { cn } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const NOISE_OPACITY = 0.035;
const NOISE_BASE_FREQUENCY = 0.65;
const NOISE_OCTAVES = 3;

const BLOB_1 = { cx: '15%', cy: '20%', size: '45%', blur: 100, dur: '10s', dx: 60,  dy: 40,  varName: '--primary',  key: 'blob1' } as const;
const BLOB_2 = { cx: '75%', cy: '15%', size: '38%', blur: 90,  dur: '13s', dx: -50, dy: 55,  varName: '--accent',   key: 'blob2' } as const;
const BLOB_3 = { cx: '60%', cy: '70%', size: '42%', blur: 110, dur: '15s', dx: -40, dy: -50, varName: '--primary',  key: 'blob3' } as const;
const BLOB_4 = { cx: '25%', cy: '75%', size: '35%', blur: 80,  dur: '8s',  dx: 55,  dy: -35, varName: '--muted',    key: 'blob4' } as const;

const BLOBS = [BLOB_1, BLOB_2, BLOB_3, BLOB_4] as const;

const FLOAT_1_MID_DX_FACTOR = 0.6;
const FLOAT_1_MID_DY_FACTOR = 0.8;
const FLOAT_2_MID_DX_FACTOR = 0.7;
const FLOAT_2_MID_DY_FACTOR = 0.5;
const FLOAT_3_MID_DX_FACTOR = 0.4;
const FLOAT_3_MID_DY_FACTOR = 0.6;
const FLOAT_4_MID_DX_FACTOR = 0.5;
const FLOAT_4_MID_DY_FACTOR = 0.7;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface BackgroundGradientMeshProps {
  children: React.ReactNode;
  intensity?: 'subtle' | 'medium' | 'vivid';
  className?: string;
}

// ---------------------------------------------------------------------------
// Opacity map
// ---------------------------------------------------------------------------

const OPACITY_SUBTLE  = { blob1: 0.15, blob2: 0.18, blob3: 0.15, blob4: 0.20 } as const;
const OPACITY_MEDIUM  = { blob1: 0.30, blob2: 0.25, blob3: 0.20, blob4: 0.35 } as const;
const OPACITY_VIVID   = { blob1: 0.45, blob2: 0.40, blob3: 0.45, blob4: 0.55 } as const;

const opacityMap = {
  subtle: OPACITY_SUBTLE,
  medium: OPACITY_MEDIUM,
  vivid: OPACITY_VIVID,
} as const;

// ---------------------------------------------------------------------------
// Scoped keyframes builder
// ---------------------------------------------------------------------------

function buildStyles(): string {
  return `
@keyframes mesh-float-1 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(${BLOB_1.dx}px, ${BLOB_1.dy}px); }
  66% { transform: translate(-${BLOB_1.dx * FLOAT_1_MID_DX_FACTOR}px, ${BLOB_1.dy * FLOAT_1_MID_DY_FACTOR}px); }
}
@keyframes mesh-float-2 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(${BLOB_2.dx}px, ${BLOB_2.dy}px); }
  66% { transform: translate(${BLOB_2.dx * FLOAT_2_MID_DX_FACTOR}px, -${Math.abs(BLOB_2.dy) * FLOAT_2_MID_DY_FACTOR}px); }
}
@keyframes mesh-float-3 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(${BLOB_3.dx}px, ${BLOB_3.dy}px); }
  66% { transform: translate(${BLOB_3.dx * FLOAT_3_MID_DX_FACTOR}px, ${BLOB_3.dy * FLOAT_3_MID_DY_FACTOR}px); }
}
@keyframes mesh-float-4 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(${BLOB_4.dx}px, ${BLOB_4.dy}px); }
  66% { transform: translate(-${BLOB_4.dx * FLOAT_4_MID_DX_FACTOR}px, ${BLOB_4.dy * FLOAT_4_MID_DY_FACTOR}px); }
}
.mesh-blob-1 { animation: mesh-float-1 ${BLOB_1.dur} ease-in-out infinite; }
.mesh-blob-2 { animation: mesh-float-2 ${BLOB_2.dur} ease-in-out infinite; }
.mesh-blob-3 { animation: mesh-float-3 ${BLOB_3.dur} ease-in-out infinite; }
.mesh-blob-4 { animation: mesh-float-4 ${BLOB_4.dur} ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  .mesh-blob-1, .mesh-blob-2, .mesh-blob-3, .mesh-blob-4 {
    animation: none !important;
  }
}
`;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function BackgroundGradientMesh({
  children,
  intensity = 'medium',
  className,
}: BackgroundGradientMeshProps) {
  const opacities = opacityMap[intensity];

  const blobOpacity = (key: keyof typeof opacities) => opacities[key];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: buildStyles() }} />
      <div
        className={cn('relative overflow-hidden', className)}
        aria-label="Gradient mesh background"
      >
        {/* Gradient blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          {BLOBS.map((blob, i) => (
            <div
              key={blob.key}
              className={`mesh-blob-${i + 1} absolute rounded-full`}
              style={{
                left: blob.cx,
                top: blob.cy,
                width: blob.size,
                height: blob.size,
                background: `var(${blob.varName})`,
                opacity: blobOpacity(blob.key as keyof typeof opacities),
                filter: `blur(${blob.blur}px)`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}

          {/* SVG noise texture overlay */}
          <svg
            className="absolute inset-0 h-full w-full"
            style={{ opacity: NOISE_OPACITY }}
            aria-hidden="true"
          >
            <filter id="mesh-noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency={NOISE_BASE_FREQUENCY}
                numOctaves={NOISE_OCTAVES}
                stitchTiles="stitch"
              />
            </filter>
            <rect width="100%" height="100%" filter="url(#mesh-noise)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10">{children}</div>
      </div>
    </>
  );
}

export default BackgroundGradientMesh;
