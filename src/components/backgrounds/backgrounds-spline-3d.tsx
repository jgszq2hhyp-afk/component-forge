// @source 21st.dev/r/serafim/splite
"use client";

import { Suspense, lazy } from "react";
import { cn } from "@/lib/utils";

const Spline = lazy(() => import("@splinetool/react-spline"));

interface BackgroundsSpline3dProps {
  /** Spline scene URL. Replace with your own Spline scene */
  sceneUrl?: string;
  className?: string;
  fallback?: React.ReactNode;
}

// Replace sceneUrl with your own Spline scene
const DEFAULT_SCENE_URL =
  "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode";

export default function BackgroundsSpline3d({
  sceneUrl = DEFAULT_SCENE_URL,
  className,
  fallback,
}: BackgroundsSpline3dProps) {
  return (
    <div className={cn("relative w-full h-full", className)}>
      <Suspense
        fallback={
          fallback ?? (
            <div className="w-full h-full flex items-center justify-center bg-black/5 dark:bg-white/5 rounded-xl">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin motion-reduce:animate-none" />
                <span className="text-sm text-muted-foreground">
                  Loading 3D scene...
                </span>
              </div>
            </div>
          )
        }
      >
        <Spline scene={sceneUrl} className="w-full h-full" />
      </Suspense>
    </div>
  );
}
