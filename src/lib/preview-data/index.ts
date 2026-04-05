import { data as batch1 } from "./batch-1";
import { data as batch2 } from "./batch-2";
import { data as batch3 } from "./batch-3";
import { data as batch4 } from "./batch-4";
import { data as batch5 } from "./batch-5";
import { data as batch6 } from "./batch-6";
import { data as batch7 } from "./batch-7";
import { data as batch8 } from "./batch-8";
import { data as batch9 } from "./batch-9";
import { data as batch10 } from "./batch-10";

type PreviewProps = Record<string, unknown>;
type BatchData = Record<string, Record<string, PreviewProps>>;

/* ------------------------------------------------------------------ */
/*  Deep-merge batches (category-level merge, not shallow spread)      */
/* ------------------------------------------------------------------ */

function mergeBatches(...batches: BatchData[]): Record<string, Record<string, PreviewProps>> {
  const result: Record<string, Record<string, PreviewProps>> = {};
  for (const batch of batches) {
    for (const [category, components] of Object.entries(batch)) {
      result[category] = { ...result[category], ...components };
    }
  }
  return result;
}

const allData = mergeBatches(
  batch1, batch2, batch3, batch4, batch5,
  batch6, batch7, batch8, batch9, batch10,
);

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export function getPreviewProps(category: string, name: string): PreviewProps {
  return allData[category]?.[name] ?? {};
}

export function hasPreview(category: string, name: string): boolean {
  return !!allData[category]?.[name];
}
