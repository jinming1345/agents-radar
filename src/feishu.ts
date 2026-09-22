/**
 * Feishu (Lark) notification — reads manifest.json and sends a card message
 * with links to the latest reports. Skips silently if secrets are not set.
 *
 * Required env vars:
 *   FEISHU_WEBHOOK_URLS — comma-separated list of custom bot webhook URLs
 *                         (also accepts legacy FEISHU_WEBHOOK_URL for one URL)
 * Optional:
 *   PAGES_URL           — GitHub Pages base URL (defaults to the public deployment)
 */

import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { NOTIFY_LABELS } from "./i18n.ts";
import type { Highlights } from "./notify.ts";
import type { TopPick } from "./prompts-data.ts";

const PAGES_URL_DEFAULT = "https://duanyytop.github.io/agents-radar";

function getWebhookUrls(): string[] {
  const raw = process.env["FEISHU_WEBHOOK_URLS"] ?? process.env["FEISHU_WEBHOOK_URL"] ?? "";
  return raw
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
}

type CardElement = Record<string, unknown>;

async function sendToOneWebhook(webhookUrl: string, title: string, elements: CardElement[]): Promise<void> {
  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      msg_type: "interactive",
      card: {
        config: { wide_screen_mode: true },
        header: {
          title: { tag: "plain_text", content: title },
          template: "red",
        },
        elements,
      },
    }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Feishu API ${res.status}: ${body}`);
  }
}

async function sendFeishu(title: string, elements: CardElement[]): Promise<void> {
  const urls = getWebhookUrls();
  const results = await Promise.allSettled(urls.map((url) => sendToOneWebhook(url, title, elements)));
  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length) {
    const msgs = failures.map((r) => (r as PromiseRejectedResult).reason);
    console.error(`[feishu] ${failures.length}/${urls.length} webhook(s) failed:`, msgs);
    if (failures.length === urls.length) throw new Error("All Feishu webhooks failed");
  }
}

export function buildFeishuMessage(
  date: string,
  reports: string[],
  pagesUrl?: string,
  highlights?: Highlights | null,
): string {
  const PAGES_URL = (pagesUrl ?? process.env["PAGES_URL"] ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
  const ordered = reports.filter((r) => !r.endsWith("-en"));
  const lines: string[] = [`📡 **agents-radar · ${date}**`];

  const zhHighlights = highlights?.zh ?? {};
  const enHighlights = highlights?.en ?? {};

  for (const r of ordered) {
    const zhLabel = NOTIFY_LABELS[r]?.zh ?? r;
    const zhUrl = `${PAGES_URL}/#${date}/${r}`;
    const enKey = `${r}-en`;

    lines.push("");
    if (reports.includes(enKey)) {
      const enLabel = NOTIFY_LABELS[r]?.en ?? "EN";
      const enUrl = `${PAGES_URL}/#${date}/${enKey}`;
      lines.push(`• [${zhLabel}](${zhUrl})  ·  [${enLabel}](${enUrl})`);
    } else {
      lines.push(`• [${zhLabel}](${zhUrl})`);
    }

    // Fall back to en when a report's zh highlights are missing so a
    // single-language failure never blanks the message.
    const items = zhHighlights[r] ?? enHighlights[r];
    if (items?.length) {
      for (const h of items) {
        lines.push(`  ◦ ${h}`);
      }
    }
  }

  lines.push(`\n[🌐 Web UI](${PAGES_URL})  ·  [⊕ RSS](${PAGES_URL}/feed.xml)`);
  return lines.join("\n");
}

const FIRE = ["", "🔥", "🔥🔥", "🔥🔥🔥", "🔥🔥🔥🔥", "🔥🔥🔥🔥🔥"];

/** "今日头条" section: the day's most impactful items with a 🔥 impact rating. */
export function buildTopPicksMarkdown(date: string, picks: TopPick[], pagesUrl?: string): string {
  const PAGES_URL = (pagesUrl ?? process.env["PAGES_URL"] ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
  const lines = ["**⚡ 今日最值得知道的事**"];
  picks.slice(0, 5).forEach((p, i) => {
    const impact = Math.min(5, Math.max(1, Math.round(p.impact || 1)));
    const link = p.report ? `${PAGES_URL}/#${date}/${p.report}` : "";
    const title = link ? `[${p.title}](${link})` : p.title;
    lines.push(
      "",
      `**${i + 1}. ${title}**  ${FIRE[impact]}`,
      `${p.why}${p.audience ? `  <font color='grey'>· ${p.audience}</font>` : ""}`,
    );
  });
  return lines.join("\n");
}

/** Compact report index: one line per report, zh + en links, no bullets. */
export function buildReportLinksMarkdown(date: string, reports: string[], pagesUrl?: string): string {
  const PAGES_URL = (pagesUrl ?? process.env["PAGES_URL"] ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
  const ordered = reports.filter((r) => !r.endsWith("-en"));
  const parts = ordered.map((r) => {
    const zh = `[${NOTIFY_LABELS[r]?.zh ?? r}](${PAGES_URL}/#${date}/${r})`;
    return reports.includes(`${r}-en`)
      ? `${zh}<font color='grey'>·[EN](${PAGES_URL}/#${date}/${r}-en)</font>`
      : zh;
  });
  return `**📚 完整报告**\n${parts.join("  ｜  ")}`;
}

export function buildFeishuCard(
  date: string,
  reports: string[],
  picks: TopPick[],
  highlights?: Highlights | null,
  pagesUrl?: string,
): CardElement[] {
  const PAGES_URL = (pagesUrl ?? process.env["PAGES_URL"] ?? PAGES_URL_DEFAULT).replace(/\/$/, "");
  const elements: CardElement[] = [];
  if (picks.length) {
    elements.push({ tag: "markdown", content: buildTopPicksMarkdown(date, picks, PAGES_URL) }, { tag: "hr" });
  } else if (highlights) {
    // No top picks (LLM call failed): fall back to the flat highlight list.
    elements.push({ tag: "markdown", content: buildFeishuMessage(date, reports, PAGES_URL, highlights) });
    return elements;
  }
  elements.push(
    { tag: "markdown", content: buildReportLinksMarkdown(date, reports, PAGES_URL) },
    {
      tag: "note",
      elements: [{ tag: "plain_text", content: `🔥 越多影响越大 · 点标题看详情 · Web UI: ${PAGES_URL}` }],
    },
  );
  return elements;
}

async function main(): Promise<void> {
  const urls = getWebhookUrls();
  if (!urls.length) {
    console.log("[feishu] FEISHU_WEBHOOK_URLS not set — skipping.");
    return;
  }

  if (!fs.existsSync("manifest.json")) {
    console.log("[feishu] manifest.json not found — skipping.");
    return;
  }

  const { dates } = JSON.parse(fs.readFileSync("manifest.json", "utf-8")) as {
    dates: { date: string; reports: string[] }[];
  };

  const latest = dates?.[0];
  if (!latest) {
    console.log("[feishu] manifest is empty — skipping.");
    return;
  }
  const { date, reports } = latest;

  let highlights: Highlights | null = null;
  const highlightsPath = path.join("digests", date, "highlights.json");
  if (fs.existsSync(highlightsPath)) {
    try {
      highlights = JSON.parse(fs.readFileSync(highlightsPath, "utf-8")) as Highlights;
    } catch {
      console.log("[feishu] Failed to parse highlights.json — sending without highlights.");
    }
  }

  let picks: TopPick[] = [];
  const topPath = path.join("digests", date, "top.json");
  if (fs.existsSync(topPath)) {
    try {
      picks = JSON.parse(fs.readFileSync(topPath, "utf-8")) as TopPick[];
    } catch {
      console.log("[feishu] Failed to parse top.json — sending without top picks.");
    }
  }

  const title = `📡 AI 雷达 · ${date}`;
  const elements = buildFeishuCard(date, reports, picks, highlights);

  console.log(
    `[feishu] Sending to ${urls.length} webhook(s) for ${date} (${reports.length} reports, ${picks.length} picks)…`,
  );
  await sendFeishu(title, elements);
  console.log("[feishu] Done!");
}

// Only auto-send when run directly (`tsx src/feishu.ts`). Guard prevents an
// accidental send when another module imports from here.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e: unknown) => {
    console.error("[feishu]", e instanceof Error ? e.message : e);
    process.exit(1);
  });
}
