/**
 * generate-index.ts
 *
 * Scans src/components/ and tracking/component-registry.csv to produce
 * public/components.json — a complete, searchable index of every component
 * in the forge.
 *
 * Run: npx tsx scripts/generate-index.ts
 */

import fs from 'node:fs';
import path from 'node:path';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ComponentEntry {
  name: string;
  file: string;
  tags: string[];
  bestFor: string[];
  description: string;
  score: number | null;
  isClient: boolean;
  lines: number;
  source: string | null;
  version: string | null;
  status: string | null;
}

interface CategoryBlock {
  count: number;
  components: ComponentEntry[];
}

interface OutputJson {
  version: string;
  total: number;
  categories: Record<string, CategoryBlock>;
}

interface RegistryMeta {
  tags: string[];
  bestFor: string[];
  description: string;
}

interface CsvRow {
  id: string;
  category: string;
  name: string;
  version: string;
  score: string;
  status: string;
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const ROOT = path.resolve(__dirname, '..');
const COMPONENTS_DIR = path.join(ROOT, 'src', 'components');
const CSV_PATH = path.join(ROOT, 'tracking', 'component-registry.csv');
const OUTPUT_PATH = path.join(ROOT, 'public', 'components.json');

const STYLE_WORDS = new Set([
  'glass', 'dark', 'minimal', 'animated', 'gradient', '3d', 'parallax',
  'brutalist', 'neon', 'retro', 'split', 'fullscreen', 'video', 'carousel',
  'accordion', 'tabs', 'grid', 'masonry', 'bento', 'sticky', 'floating',
  'slide', 'gooey', 'morphing', 'typewriter', 'spiral', 'marquee', 'gravity',
  'shuffle', 'liquid', 'silk', 'sparkles', 'aurora', 'lamp', 'ascii',
  'cinematic', 'orbital', 'radial',
]);

const CATEGORY_DEFAULTS: Record<string, { tags: string[]; bestFor: string[] }> = {
  heroes:          { tags: ['hero', 'above-fold', 'landing'],                bestFor: ['landing page hero section'] },
  navigation:      { tags: ['nav', 'header', 'menu'],                       bestFor: ['site navigation'] },
  footers:         { tags: ['footer', 'bottom-section'],                     bestFor: ['site footer'] },
  testimonials:    { tags: ['testimonial', 'social-proof', 'reviews'],       bestFor: ['trust building'] },
  pricing:         { tags: ['pricing', 'plans', 'subscription'],             bestFor: ['pricing page'] },
  features:        { tags: ['features', 'capabilities'],                     bestFor: ['feature showcase'] },
  backgrounds:     { tags: ['background', 'decorative'],                     bestFor: ['page background effect'] },
  animations:      { tags: ['animation', 'motion', 'effect'],               bestFor: ['micro-interaction', 'visual effect'] },
  forms:           { tags: ['form', 'input', 'interactive'],                 bestFor: ['user input', 'data collection'] },
  gallery:         { tags: ['gallery', 'images', 'showcase'],                bestFor: ['image gallery', 'portfolio'] },
  cta:             { tags: ['cta', 'call-to-action', 'conversion'],          bestFor: ['conversion section'] },
  blog:            { tags: ['blog', 'article', 'content'],                   bestFor: ['blog section'] },
  contact:         { tags: ['contact', 'form', 'communication'],             bestFor: ['contact page'] },
  faq:             { tags: ['faq', 'questions', 'accordion'],                bestFor: ['FAQ section'] },
  stats:           { tags: ['stats', 'numbers', 'metrics'],                  bestFor: ['social proof', 'achievements'] },
  team:            { tags: ['team', 'people', 'members'],                    bestFor: ['about page', 'team section'] },
  'social-proof':  { tags: ['social-proof', 'trust', 'logos'],               bestFor: ['trust building'] },
  about:           { tags: ['about', 'company', 'story'],                    bestFor: ['about page'] },
  comparison:      { tags: ['comparison', 'versus', 'table'],                bestFor: ['product comparison'] },
  content:         { tags: ['content', 'text', 'article'],                   bestFor: ['content section'] },
  'cookie-consent':{ tags: ['cookie', 'gdpr', 'consent'],                   bestFor: ['GDPR compliance'] },
  countdown:       { tags: ['countdown', 'timer', 'launch'],                 bestFor: ['coming soon page'] },
  dashboard:       { tags: ['dashboard', 'admin', 'data'],                   bestFor: ['admin panel'] },
  dividers:        { tags: ['divider', 'separator', 'decoration'],           bestFor: ['section separator'] },
  ecommerce:       { tags: ['ecommerce', 'shop', 'product'],                bestFor: ['online shop'] },
  'empty-state':   { tags: ['empty-state', 'placeholder'],                   bestFor: ['empty page state'] },
  error:           { tags: ['error', '404', 'not-found'],                    bestFor: ['error page'] },
  integrations:    { tags: ['integrations', 'api', 'connect'],               bestFor: ['integrations page'] },
  loading:         { tags: ['loading', 'skeleton', 'spinner'],               bestFor: ['loading state'] },
  login:           { tags: ['login', 'auth', 'register'],                    bestFor: ['authentication'] },
  'logo-cloud':    { tags: ['logo-cloud', 'partners', 'clients'],            bestFor: ['partner logos'] },
  map:             { tags: ['map', 'location', 'geography'],                 bestFor: ['location display'] },
  'mobile-menu':   { tags: ['mobile-menu', 'hamburger', 'responsive'],       bestFor: ['mobile navigation'] },
  modal:           { tags: ['modal', 'dialog', 'popup'],                     bestFor: ['popup content'] },
  newsletter:      { tags: ['newsletter', 'email', 'signup'],                bestFor: ['email capture'] },
  notification:    { tags: ['notification', 'toast', 'alert'],               bestFor: ['user notifications'] },
  onboarding:      { tags: ['onboarding', 'wizard', 'steps'],                bestFor: ['user onboarding'] },
  pagination:      { tags: ['pagination', 'pages', 'navigation'],            bestFor: ['list pagination'] },
  portfolio:       { tags: ['portfolio', 'projects', 'showcase'],             bestFor: ['portfolio page'] },
  process:         { tags: ['process', 'steps', 'timeline'],                 bestFor: ['how it works section'] },
  ratings:         { tags: ['ratings', 'stars', 'reviews'],                  bestFor: ['review display'] },
  search:          { tags: ['search', 'filter', 'find'],                     bestFor: ['search functionality'] },
  services:        { tags: ['services', 'offerings'],                        bestFor: ['services page'] },
  sidebar:         { tags: ['sidebar', 'panel', 'navigation'],               bestFor: ['side navigation'] },
  tables:          { tags: ['table', 'data', 'grid'],                        bestFor: ['data display'] },
  tabs:            { tags: ['tabs', 'panels', 'sections'],                   bestFor: ['tabbed content'] },
  video:           { tags: ['video', 'player', 'media'],                     bestFor: ['video section'] },
  cards:           { tags: ['cards', 'grid', 'layout'],                      bestFor: ['card layout'] },
  careers:         { tags: ['careers', 'jobs', 'hiring'],                     bestFor: ['careers page'] },
  breadcrumbs:     { tags: ['breadcrumbs', 'navigation', 'path'],             bestFor: ['page navigation'] },
  avatar:          { tags: ['avatar', 'profile', 'user'],                    bestFor: ['user profiles'] },
  banners:         { tags: ['banner', 'announcement', 'notice'],             bestFor: ['site announcements'] },
  ui:              { tags: ['ui', 'interactive', 'primitive'],               bestFor: ['UI building blocks'] },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function parseCsv(csvPath: string): Map<string, CsvRow> {
  const map = new Map<string, CsvRow>();
  if (!fs.existsSync(csvPath)) return map;

  const lines = fs.readFileSync(csvPath, 'utf-8').split('\n');
  if (lines.length < 2) return map;

  // header: id,category,name,version,score,...,status
  for (let i = 1; i < lines.length; i++) {
    const cols = lines[i].trim().split(',');
    if (cols.length < 6) continue;
    const row: CsvRow = {
      id: cols[0],
      category: cols[1],
      name: cols[2],
      version: cols[3],
      score: cols[4],
      status: cols[cols.length - 1], // last column before dates might shift
    };
    // Find status column — it's the one after 'docs' (index 11 in the known layout)
    // But we already read it from the CSV header mapping below
    // For safety: status is the column at index 11 based on known header
    if (cols.length >= 12) {
      row.status = cols[11];
    }
    map.set(row.name, row);
  }
  return map;
}

function extractHeaderMeta(filePath: string): {
  version: string | null;
  source: string | null;
  isClient: boolean;
} {
  const content = fs.readFileSync(filePath, 'utf-8');
  const first15 = content.split('\n').slice(0, 15).join('\n');

  const versionMatch = first15.match(/@version\s+(\S+)/);
  const sourceMatch = first15.match(/@source\s+(\S+)/);
  const isClient =
    first15.includes('"use client"') || first15.includes("'use client'");

  return {
    version: versionMatch ? versionMatch[1] : null,
    source: sourceMatch ? sourceMatch[1] : null,
    isClient,
  };
}

function countLines(filePath: string): number {
  const content = fs.readFileSync(filePath, 'utf-8');
  return content.split('\n').length;
}

function detectStyleTags(fileName: string, filePath: string): string[] {
  const tags: string[] = [];

  // From filename segments
  const baseName = path.basename(fileName, '.tsx');
  const segments = baseName.split('-');
  for (const seg of segments) {
    if (STYLE_WORDS.has(seg.toLowerCase())) {
      tags.push(seg.toLowerCase());
    }
  }

  // From file content — check imports
  const content = fs.readFileSync(filePath, 'utf-8');
  if (content.includes('framer-motion') && !tags.includes('animated')) {
    tags.push('animated');
  }
  if (content.includes('gsap') && !tags.includes('animated')) {
    tags.push('animated');
  }

  return tags;
}

function dedupe(arr: string[]): string[] {
  return [...new Set(arr)];
}

function todayIso(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

// ---------------------------------------------------------------------------
// Registry loader (best-effort dynamic import)
// ---------------------------------------------------------------------------

interface RegistryModule {
  registry: Record<string, RegistryMeta & Record<string, unknown>>;
}

async function loadRegistry(): Promise<Map<string, RegistryMeta>> {
  const map = new Map<string, RegistryMeta>();
  try {
    const registryPath = path.join(COMPONENTS_DIR, '_registry.ts');
    // Dynamic import — works when executed via tsx/ts-node
    const mod = (await import(registryPath)) as RegistryModule;
    if (mod.registry && typeof mod.registry === 'object') {
      for (const [key, val] of Object.entries(mod.registry)) {
        map.set(key, {
          tags: Array.isArray(val.tags) ? val.tags : [],
          bestFor: Array.isArray(val.bestFor) ? val.bestFor : [],
          description: typeof val.description === 'string' ? val.description : '',
        });
      }
    }
  } catch {
    // Registry unavailable — continue with empty defaults
    console.warn('[generate-index] _registry.ts import failed — using empty defaults');
  }
  return map;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const csvScores = parseCsv(CSV_PATH);
  const registryMap = await loadRegistry();

  const categories: Record<string, CategoryBlock> = {};
  let total = 0;

  // Scan category directories
  const entries = fs.readdirSync(COMPONENTS_DIR, { withFileTypes: true });

  for (const entry of entries) {
    // Skip non-directories and dirs starting with _
    if (!entry.isDirectory()) continue;
    if (entry.name.startsWith('_')) continue;

    const categoryName = entry.name;
    const categoryDir = path.join(COMPONENTS_DIR, categoryName);
    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.tsx'));

    const components: ComponentEntry[] = [];

    for (const file of files) {
      const filePath = path.join(categoryDir, file);
      const baseName = path.basename(file, '.tsx');

      // Header metadata
      const { version: headerVersion, source, isClient } = extractHeaderMeta(filePath);
      const lines = countLines(filePath);

      // Auto-detected style tags
      const styleTags = detectStyleTags(file, filePath);

      // CSV data
      const csvRow = csvScores.get(baseName);
      const score = csvRow ? Number(csvRow.score) : null;
      const csvVersion = csvRow?.version ?? null;
      const status = csvRow?.status ?? null;

      // Registry data
      const regMeta = registryMap.get(baseName);

      // Category defaults
      const catDefaults = CATEGORY_DEFAULTS[categoryName] ?? { tags: [], bestFor: [] };

      // Merge tags: category defaults + registry + auto-detected (deduplicated)
      const mergedTags = dedupe([
        ...catDefaults.tags,
        ...(regMeta?.tags ?? []),
        ...styleTags,
      ]);

      // BestFor: category defaults + registry (deduplicated)
      const mergedBestFor = dedupe([
        ...catDefaults.bestFor,
        ...(regMeta?.bestFor ?? []),
      ]);

      const description = regMeta?.description ?? '';

      components.push({
        name: baseName,
        file: `src/components/${categoryName}/${file}`,
        tags: mergedTags,
        bestFor: mergedBestFor,
        description,
        score,
        isClient,
        lines,
        source,
        version: headerVersion ?? csvVersion,
        status,
      });

      total++;
    }

    if (components.length > 0) {
      categories[categoryName] = {
        count: components.length,
        components,
      };
    }
  }

  const output: OutputJson = {
    version: todayIso(),
    total,
    categories,
  };

  // Ensure public/ exists
  const publicDir = path.join(ROOT, 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`[generate-index] Written ${OUTPUT_PATH} — ${total} components in ${Object.keys(categories).length} categories`);
}

main().catch((err) => {
  console.error('[generate-index] Fatal error:', err);
  process.exit(1);
});
