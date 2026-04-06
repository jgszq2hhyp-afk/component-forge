/**
 * generate-dep-map.ts
 *
 * Scans every component in src/components/ and extracts:
 * - External npm dependencies (with versions from package.json)
 * - Internal file dependencies (@/lib/*, @/components/ui/*)
 *
 * Output: public/dependency-map.json
 *
 * Run: npx tsx scripts/generate-dep-map.ts
 */

import fs from "node:fs";
import path from "node:path";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DepEntry {
  npm: Record<string, string>;
  internal: string[];
}

interface OutputJson {
  version: string;
  total: number;
  components: Record<string, DepEntry>;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ROOT = path.resolve(__dirname, "..");
const COMPONENTS_DIR = path.join(ROOT, "src", "components");
const PKG_PATH = path.join(ROOT, "package.json");
const OUTPUT_PATH = path.join(ROOT, "public", "dependency-map.json");

// Packages that are always available in a Next.js project — skip these
const BUILTIN_PACKAGES = new Set([
  "react",
  "react-dom",
  "next",
  "next/image",
  "next/link",
  "next/font",
  "next/font/google",
  "next/font/local",
  "next/navigation",
  "next/dynamic",
  "next/headers",
  "next/server",
]);

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadPackageVersions(): Record<string, string> {
  const pkg = JSON.parse(fs.readFileSync(PKG_PATH, "utf-8"));
  return {
    ...(pkg.dependencies ?? {}),
    ...(pkg.devDependencies ?? {}),
  };
}

/**
 * Extract all import sources from a TypeScript/TSX file.
 * Handles: import X from "pkg", import { X } from "pkg", import "pkg"
 */
function extractImports(filePath: string): string[] {
  const content = fs.readFileSync(filePath, "utf-8");
  const imports: string[] = [];

  // Match: import ... from "source" / import ... from 'source'
  const fromRegex = /import\s+[\s\S]*?\s+from\s+["']([^"']+)["']/g;
  let match: RegExpExecArray | null;
  while ((match = fromRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  // Match: import "source" / import 'source' (side-effect imports)
  const sideEffectRegex = /import\s+["']([^"']+)["']/g;
  while ((match = sideEffectRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  // Match: dynamic imports: await import("source")
  const dynamicRegex = /import\(\s*["']([^"']+)["']\s*\)/g;
  while ((match = dynamicRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  return [...new Set(imports)];
}

/**
 * Resolve an npm package name from an import source.
 * "framer-motion" → "framer-motion"
 * "@radix-ui/react-hover-card" → "@radix-ui/react-hover-card"
 * "lucide-react" → "lucide-react"
 * "lenis/react" → "lenis"
 */
function resolvePackageName(importSource: string): string {
  if (importSource.startsWith("@")) {
    // Scoped package: @scope/name
    const parts = importSource.split("/");
    return parts.slice(0, 2).join("/");
  }
  // Regular package
  return importSource.split("/")[0];
}

function todayIso(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main(): void {
  const pkgVersions = loadPackageVersions();
  const components: Record<string, DepEntry> = {};
  let total = 0;

  const categories = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });

  for (const cat of categories) {
    if (!cat.isDirectory() || cat.name.startsWith("_")) continue;

    const categoryDir = path.join(COMPONENTS_DIR, cat.name);
    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith(".tsx"));

    for (const file of files) {
      const filePath = path.join(categoryDir, file);
      const baseName = path.basename(file, ".tsx");
      const key = `${cat.name}/${baseName}`;

      const imports = extractImports(filePath);
      const npm: Record<string, string> = {};
      const internal: string[] = [];

      for (const imp of imports) {
        if (imp.startsWith("@/") || imp.startsWith("./") || imp.startsWith("../")) {
          // Internal import
          if (imp.startsWith("@/")) {
            internal.push(imp);
          }
          // Skip relative imports (same-dir helpers) — they're part of the component
        } else if (imp.startsWith(".")) {
          // Relative — skip
        } else {
          // External npm package
          const pkgName = resolvePackageName(imp);

          // Skip builtins
          if (BUILTIN_PACKAGES.has(imp) || BUILTIN_PACKAGES.has(pkgName)) continue;

          // Look up version from package.json
          const version = pkgVersions[pkgName];
          if (version) {
            npm[pkgName] = version;
          } else {
            // Package used but not in package.json — flag it
            npm[pkgName] = "unknown";
          }
        }
      }

      components[key] = { npm, internal };
      total++;
    }
  }

  const output: OutputJson = {
    version: todayIso(),
    total,
    components,
  };

  const publicDir = path.join(ROOT, "public");
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), "utf-8");
  console.log(
    `[generate-dep-map] Written ${OUTPUT_PATH} — ${total} components analyzed`
  );
}

main();
