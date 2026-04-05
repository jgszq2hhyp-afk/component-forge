import fs from "fs";
import path from "path";
import Link from "next/link";
import { notFound } from "next/navigation";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const COMPONENTS_DIR = path.join(process.cwd(), "src/components");
const ANIMATIONS_DIR = path.join(process.cwd(), "src/animations");

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

interface ComponentFile {
  name: string;
  fileName: string;
  isClient: boolean;
  lineCount: number;
}

function getComponentFiles(category: string): ComponentFile[] {
  // Handle animations-lib special case
  if (category === "animations-lib") {
    const files: ComponentFile[] = [];
    if (!fs.existsSync(ANIMATIONS_DIR)) return files;
    const subdirs = fs.readdirSync(ANIMATIONS_DIR, { withFileTypes: true });
    for (const subdir of subdirs) {
      if (!subdir.isDirectory()) continue;
      const dirPath = path.join(ANIMATIONS_DIR, subdir.name);
      const tsxFiles = fs.readdirSync(dirPath).filter(f => f.endsWith(".tsx"));
      for (const file of tsxFiles) {
        const content = fs.readFileSync(path.join(dirPath, file), "utf-8");
        const lines = content.split("\n").length;
        files.push({
          name: file.replace(".tsx", ""),
          fileName: `${subdir.name}/${file}`,
          isClient: content.includes('"use client"') || content.includes("'use client'"),
          lineCount: lines,
        });
      }
    }
    return files.sort((a, b) => a.name.localeCompare(b.name));
  }

  const dirPath = path.join(COMPONENTS_DIR, category);
  if (!fs.existsSync(dirPath)) return [];

  const tsxFiles = fs.readdirSync(dirPath).filter(f => f.endsWith(".tsx"));
  return tsxFiles.map((file) => {
    const content = fs.readFileSync(path.join(dirPath, file), "utf-8");
    const lines = content.split("\n").length;
    return {
      name: file.replace(".tsx", ""),
      fileName: file,
      isClient: content.includes('"use client"') || content.includes("'use client'"),
      lineCount: lines,
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

function getAllCategories(): string[] {
  const cats: string[] = [];
  if (fs.existsSync(COMPONENTS_DIR)) {
    const dirs = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });
    for (const dir of dirs) {
      if (dir.isDirectory() && !dir.name.startsWith("_")) {
        cats.push(dir.name);
      }
    }
  }
  if (fs.existsSync(ANIMATIONS_DIR)) {
    cats.push("animations-lib");
  }
  return cats.sort();
}

/* ------------------------------------------------------------------ */
/*  Static Params                                                      */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category }));
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const files = getComponentFiles(category);

  if (files.length === 0) {
    notFound();
  }

  const totalLines = files.reduce((sum, f) => sum + f.lineCount, 0);
  const clientCount = files.filter(f => f.isClient).length;
  const serverCount = files.length - clientCount;

  return (
    <>
      {/* -- Nav -- */}
      <nav
        className="sticky top-0 z-50 border-b backdrop-blur-xl"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "color-mix(in srgb, var(--background) 80%, transparent)",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-sm font-medium transition-colors hover:opacity-80"
              style={{ color: "var(--muted-foreground)" }}
            >
              ← All Categories
            </Link>
            <span style={{ color: "var(--border)" }}>/</span>
            <span className="text-sm font-semibold capitalize" style={{ color: "var(--foreground)" }}>
              {category.replace(/-/g, " ")}
            </span>
          </div>
          <span
            className="rounded-full px-3 py-1 text-xs font-medium"
            style={{
              backgroundColor: "color-mix(in srgb, var(--primary) 10%, transparent)",
              color: "var(--primary)",
            }}
          >
            {files.length} components
          </span>
        </div>
      </nav>

      {/* -- Header -- */}
      <section className="py-[clamp(2rem,5vw,4rem)]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1
            className="text-[clamp(1.5rem,3vw,2.5rem)] font-bold capitalize tracking-tight"
            style={{ color: "var(--foreground)" }}
          >
            {category.replace(/-/g, " ")}
          </h1>
          <p
            className="mt-2 text-[clamp(0.875rem,1.5vw,1rem)]"
            style={{ color: "var(--muted-foreground)" }}
          >
            {files.length} components &middot; {totalLines.toLocaleString("de-DE")} lines of code &middot;{" "}
            {serverCount} Server + {clientCount} Client Components
          </p>

          {/* -- Stats -- */}
          <div className="mt-6 flex flex-wrap gap-3">
            <span
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            >
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: "var(--primary)" }}
              />
              {serverCount} Server
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            >
              <span
                className="size-2 rounded-full"
                style={{ backgroundColor: "var(--accent, var(--muted-foreground))" }}
              />
              {clientCount} Client
            </span>
            <span
              className="inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium"
              style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
            >
              91+ Score
            </span>
          </div>
        </div>
      </section>

      {/* -- Component List -- */}
      <section
        className="border-t py-[clamp(1.5rem,4vw,3rem)]"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2">
            {files.map((file) => (
              <article
                key={file.name}
                className="flex flex-col overflow-hidden rounded-xl border transition-all duration-200 hover:shadow-md motion-reduce:transition-none"
                style={{
                  borderColor: "var(--border)",
                  backgroundColor: "var(--card)",
                }}
              >
                {/* Preview */}
                <div
                  className="relative overflow-hidden border-b"
                  style={{
                    borderColor: "var(--border)",
                    aspectRatio: "16/10",
                    backgroundColor: "var(--background)",
                  }}
                >
                  <iframe
                    src={`/preview/${category}/${file.name}`}
                    loading="lazy"
                    className="pointer-events-none absolute left-0 top-0 origin-top-left"
                    style={{ width: "200%", height: "200%", transform: "scale(0.5)" }}
                    title={`Preview of ${file.name}`}
                    tabIndex={-1}
                  />
                </div>
                {/* Meta */}
                <div className="flex flex-col gap-2 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3
                      className="font-mono text-sm font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {file.name}
                    </h3>
                    <span
                      className="shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider"
                      style={{
                        backgroundColor: file.isClient
                          ? "color-mix(in srgb, var(--accent, var(--muted-foreground)) 10%, transparent)"
                          : "color-mix(in srgb, var(--primary) 10%, transparent)",
                        color: file.isClient
                          ? "var(--accent, var(--muted-foreground))"
                          : "var(--primary)",
                      }}
                    >
                      {file.isClient ? "Client" : "Server"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {file.lineCount} lines
                    </span>
                    <a
                      href={`/preview/${category}/${file.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-auto text-xs font-medium hover:underline"
                      style={{ color: "var(--primary)" }}
                    >
                      Open Preview →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* -- Back -- */}
      <section className="border-t py-8" style={{ borderColor: "var(--border)" }}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-[color-mix(in_srgb,var(--foreground)_5%,transparent)]"
            style={{ borderColor: "var(--border)", color: "var(--foreground)" }}
          >
            ← Back to all categories
          </Link>
        </div>
      </section>
    </>
  );
}
