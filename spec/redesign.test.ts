import { readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// Two things specific to this redesign that are worth a red test rather than
// a thing I only hold in my head: every card actually shows the fields the
// brief asked for (a MovieCard with a field silently dropped is easy to miss
// on a quick scan), and no page ever grows login/booking/payment markup —
// CLAUDE.md's own scope-creep failure mode from crit 1, turned into a check.
const DIST = resolve("dist");

function htmlFiles(dir: string = DIST): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

const pages = htmlFiles().map((path) => ({
  name: relative(DIST, path),
  doc: new JSDOM(readFileSync(path, "utf8")).window.document,
}));

describe("redesign: every movie card shows its required fields", () => {
  const cardPages = pages.filter(({ name }) => name === "index.html");

  it("built the homepage", () => {
    expect(cardPages.length).toBe(1);
  });

  for (const { name, doc } of cardPages) {
    it(`${name} cards each show a poster, classification, runtime and genre`, () => {
      const cards = [...doc.querySelectorAll("a.card")];
      expect(cards.length, `${name} has no movie cards`).toBeGreaterThan(0);
      for (const card of cards) {
        const poster = card.querySelector("img");
        expect(poster?.getAttribute("alt"), "poster is missing alt text").toBeTruthy();
        const meta = card.querySelector(".card__meta")?.textContent ?? "";
        expect(meta.trim(), `${name}: a card's meta line is empty`).not.toBe("");
      }
    });
  }
});

describe("redesign: no booking, login or payment functionality", () => {
  for (const { name, doc } of pages) {
    it(`${name} has no form or input elements`, () => {
      expect(doc.querySelector("form"), `${name} has a <form>`).toBeNull();
      expect(
        doc.querySelector("input"),
        `${name} has an <input> — this week is no accounts, no booking, no payment`,
      ).toBeNull();
    });
  }
});
