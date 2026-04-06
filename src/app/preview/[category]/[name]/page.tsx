import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { getPreviewProps } from "@/lib/preview-data";
import { PreviewErrorBoundary } from "@/components/preview-error-boundary";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const COMPONENTS_DIR = path.join(process.cwd(), "src/components");

/* ------------------------------------------------------------------ */
/*  Static Params                                                      */
/* ------------------------------------------------------------------ */

export const dynamicParams = false;

export function generateStaticParams() {
  const params: { category: string; name: string }[] = [];
  if (!fs.existsSync(COMPONENTS_DIR)) return params;
  const cats = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });
  for (const cat of cats) {
    if (!cat.isDirectory() || cat.name.startsWith("_")) continue;
    const files = fs
      .readdirSync(path.join(COMPONENTS_DIR, cat.name))
      .filter((f) => f.endsWith(".tsx"));
    for (const file of files) {
      params.push({ category: cat.name, name: file.replace(".tsx", "") });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; name: string }>;
}) {
  const { category, name } = await params;
  return { title: `${name} — ${category} | Component Forge` };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function PreviewPage({
  params,
}: {
  params: Promise<{ category: string; name: string }>;
}) {
  const { category, name } = await params;
  const filePath = path.join(COMPONENTS_DIR, category, `${name}.tsx`);
  if (!fs.existsSync(filePath)) notFound();

  const props = getPreviewProps(category, name);

  try {
    const mod = await import(`../../../../components/${category}/${name}`);
    const Component = mod.default;
    if (!Component) {
      return (
        <div
          className="flex min-h-screen items-center justify-center"
          style={{ backgroundColor: "var(--background)" }}
        >
          <p className="text-sm" style={{ color: "var(--destructive, #ef4444)" }}>
            No default export found
          </p>
        </div>
      );
    }
    return (
      <div style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>
        <PreviewErrorBoundary name={name} category={category}>
          <Component {...props} />
        </PreviewErrorBoundary>
      </div>
    );
  } catch {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}
      >
        <p className="text-sm" style={{ color: "var(--destructive, #ef4444)" }}>
          Failed to render preview
        </p>
      </div>
    );
  }
}
