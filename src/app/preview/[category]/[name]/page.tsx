import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { getPreviewProps, hasPreview } from "@/lib/preview-data";

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
    if (!cat.isDirectory() || cat.name.startsWith("_") || cat.name === "ui") continue;
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

  if (!hasPreview(category, name)) {
    return (
      <div
        className="flex min-h-screen items-center justify-center"
        style={{ backgroundColor: "var(--background)" }}
      >
        <div className="text-center">
          <p className="text-sm font-medium" style={{ color: "var(--muted-foreground)" }}>
            Preview coming soon
          </p>
          <p className="mt-1 font-mono text-xs" style={{ color: "var(--muted-foreground)" }}>
            {category}/{name}
          </p>
        </div>
      </div>
    );
  }

  const props = getPreviewProps(category, name);

  try {
    const mod = await import(`../../../../components/${category}/${name}`);
    const Component = mod.default;
    return (
      <div style={{ backgroundColor: "var(--background)", minHeight: "100vh" }}>
        <Component {...props} />
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
