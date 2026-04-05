// @version 1.0.0
// @category backgrounds
// @name background-gradient-mesh
// @source aura-inspired

import { cn } from '@/lib/utils';

interface BackgroundGradientMeshProps {
  children: React.ReactNode;
  intensity?: 'subtle' | 'medium' | 'vivid';
  className?: string;
}

const opacityMap = {
  subtle:  { blob1: 0.15, blob2: 0.18, blob3: 0.15, blob4: 0.20 },
  medium:  { blob1: 0.30, blob2: 0.25, blob3: 0.20, blob4: 0.35 },
  vivid:   { blob1: 0.45, blob2: 0.40, blob3: 0.45, blob4: 0.55 },
} as const;

const blobs = [
  { cx: '15%', cy: '20%', size: '45%', blur: 100, dur: '10s', dx: 60,  dy: 40,  varName: '--primary',  key: 'blob1' },
  { cx: '75%', cy: '15%', size: '38%', blur: 90,  dur: '13s', dx: -50, dy: 55,  varName: '--accent',   key: 'blob2' },
  { cx: '60%', cy: '70%', size: '42%', blur: 110, dur: '15s', dx: -40, dy: -50, varName: '--primary',  key: 'blob3' },
  { cx: '25%', cy: '75%', size: '35%', blur: 80,  dur: '8s',  dx: 55,  dy: -35, varName: '--muted',    key: 'blob4' },
] as const;

export function BackgroundGradientMesh({
  children,
  intensity = 'medium',
  className,
}: BackgroundGradientMeshProps) {
  const opacities = opacityMap[intensity];

  const blobOpacity = (key: keyof typeof opacities) => opacities[key];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes mesh-float-1 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(${blobs[0].dx}px, ${blobs[0].dy}px); }
          66% { transform: translate(-${blobs[0].dx * 0.6}px, ${blobs[0].dy * 0.8}px); }
        }
        @keyframes mesh-float-2 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(${blobs[1].dx}px, ${blobs[1].dy}px); }
          66% { transform: translate(${blobs[1].dx * 0.7}px, -${Math.abs(blobs[1].dy) * 0.5}px); }
        }
        @keyframes mesh-float-3 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(${blobs[2].dx}px, ${blobs[2].dy}px); }
          66% { transform: translate(${blobs[2].dx * 0.4}px, ${blobs[2].dy * 0.6}px); }
        }
        @keyframes mesh-float-4 {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(${blobs[3].dx}px, ${blobs[3].dy}px); }
          66% { transform: translate(-${blobs[3].dx * 0.5}px, ${blobs[3].dy * 0.7}px); }
        }
        .mesh-blob-1 { animation: mesh-float-1 ${blobs[0].dur} ease-in-out infinite; }
        .mesh-blob-2 { animation: mesh-float-2 ${blobs[1].dur} ease-in-out infinite; }
        .mesh-blob-3 { animation: mesh-float-3 ${blobs[2].dur} ease-in-out infinite; }
        .mesh-blob-4 { animation: mesh-float-4 ${blobs[3].dur} ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .mesh-blob-1, .mesh-blob-2, .mesh-blob-3, .mesh-blob-4 {
            animation: none;
          }
        }
      `}} />
      <div className={cn('relative overflow-hidden', className)}>
        {/* Gradient blobs */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
          {blobs.map((blob, i) => (
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
          <svg className="absolute inset-0 h-full w-full opacity-[0.035]" aria-hidden="true">
            <filter id="mesh-noise">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.65"
                numOctaves="3"
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
