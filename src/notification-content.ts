/** Quality gate shared by the generator, Feishu sender, and retry scripts. */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

type Highlights = {
  zh?: Record<string, string[]>;
  en?: Record<string, string[]>;
};

export function hasNotificationContent(picks: unknown, highlights?: Highlights | null): boolean {
  if (Array.isArray(picks) && picks.length > 0) return true;
  return Object.values(highlights?.zh ?? {})
    .concat(Object.values(highlights?.en ?? {}))
    .some((items) => Array.isArray(items) && items.length > 0);
}

function readJson(file: string): unknown {
  try {
    return JSON.parse(fs.readFileSync(file, "utf-8")) as unknown;
  } catch {
    return null;
  }
}

export function notificationContentReady(date: string, baseDir = "digests"): boolean {
  const dir = path.join(baseDir, date);
  const picks = readJson(path.join(dir, "top.json"));
  const highlights = readJson(path.join(dir, "highlights.json")) as Highlights | null;
  return hasNotificationContent(picks, highlights);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const date = process.argv[2];
  if (!date) throw new Error("Usage: pnpm check:notification YYYY-MM-DD");
  if (!notificationContentReady(date)) {
    console.error(`[notification] ${date} has no top picks or highlights; regeneration required.`);
    process.exit(1);
  }
  console.log(`[notification] ${date} content is ready.`);
}
