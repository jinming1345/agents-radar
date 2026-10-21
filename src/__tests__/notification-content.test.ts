import { describe, expect, it } from "vitest";
import { hasNotificationContent } from "../notification-content.ts";

describe("hasNotificationContent", () => {
  it("accepts top picks", () => {
    expect(hasNotificationContent([{ title: "News" }], null)).toBe(true);
  });

  it("accepts highlights when top picks are empty", () => {
    expect(hasNotificationContent([], { zh: { "ai-cli": ["News"] }, en: {} })).toBe(true);
  });

  it("rejects an empty notification", () => {
    expect(hasNotificationContent([], { zh: {}, en: {} })).toBe(false);
  });
});
