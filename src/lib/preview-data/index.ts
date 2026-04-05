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

/* ------------------------------------------------------------------ */
/*  Merged preview data from all batches                               */
/* ------------------------------------------------------------------ */

const allData: Record<string, Record<string, PreviewProps>> = {
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
  ...batch5,
  ...batch6,
  ...batch7,
  ...batch8,
  ...batch9,
  ...batch10,
};

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */

export function getPreviewProps(category: string, name: string): PreviewProps {
  return allData[category]?.[name] ?? {};
}

export function hasPreview(category: string, name: string): boolean {
  return !!allData[category]?.[name];
}
