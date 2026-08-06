import { readFileSync, readdirSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

// Turns the mechanically-checkable lines of the Crit 2 ("Unsolicited redesign")
// spec into tests. The judged-by-a-person lines — the organisation is real and I
// can say why I like them, mine is better in ways I can name, I can account for
// how I directed the agent — aren't testable and are mine to answer at the crit.
//
// These run against the BUILT site, so they check what actually ships rather
// than what the source looks like.
const DIST = resolve("dist");

// The deployed URL is https://<org>.github.io/<repo>/, so every absolute path in
// the built output has to carry the repo name or it 404s live while working fine
// on localhost. Derived from the directory name rather than hardcoded, so it
// stays correct if the repo is ever renamed.
const BASE = `/${relative(resolve(".."), resolve("."))}`;

function htmlFiles(dir: string = DIST): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) return htmlFiles(path);
    return entry.name.endsWith(".html") ? [path] : [];
  });
}

const pages = htmlFiles().map((path) => ({
  name: relative(DIST, path),
  raw: readFileSync(path, "utf8"),
  doc: new JSDOM(readFileSync(path, "utf8")).window.document,
}));

interface Subject {
  organisation: string | null;
  originalSiteUrl: string | null;
}

const subject: Subject = JSON.parse(
  readFileSync(resolve("spec/subject.json"), "utf8"),
);

const PICK_ONE =
  "Pick the organisation and record it in spec/subject.json — a real one whose work you rate and whose site you don't.";

// --- the subject is real and named -----------------------------------------

describe("crit 2: a real organisation, named", () => {
  it("records which organisation this redesign is for", () => {
    expect(subject.organisation, PICK_ONE).toBeTruthy();
  });

  it("records the original site, so the comparison is concrete", () => {
    // The crit is "side by side with the original" — that needs a URL to open.
    expect(subject.originalSiteUrl, PICK_ONE).toBeTruthy();
    expect(subject.originalSiteUrl ?? "").toMatch(/^https?:\/\//);
  });

  it("names the organisation on the site itself", () => {
    if (!subject.organisation) return expect.fail(PICK_ONE);
    const named = pages.some(({ doc }) =>
      doc.body?.textContent?.includes(subject.organisation as string),
    );
    expect(named, `No built page mentions "${subject.organisation}".`).toBe(
      true,
    );
  });
});

// --- serves their real information ------------------------------------------

describe("crit 2: who they are, what they do, how to find them", () => {
  it("built at least one page", () => {
    expect(pages.length).toBeGreaterThan(0);
  });

  it("gives the reader a way to make contact", () => {
    // "how to find them" is the one part of that triple a machine can see: a
    // real address, an email, a phone number, or a map link. Which of those it
    // is, is your call — this only asserts that at least one exists.
    const reachable = pages.some(
      ({ doc }) =>
        doc.querySelector("address") ??
        doc.querySelector('a[href^="mailto:"]') ??
        doc.querySelector('a[href^="tel:"]') ??
        doc.querySelector('a[href*="maps."]'),
    );
    expect(
      reachable,
      "No page offers an <address>, mailto:, tel:, or map link. The brief asks for how to find them.",
    ).toBe(true);
  });
});

// --- the shared furniture holds still ---------------------------------------

describe("crit 2: shared furniture is shared", () => {
  for (const { name, doc } of pages) {
    it(`${name} carries the primary nav`, () => {
      // My CLAUDE.md rule: anything on every page sits in the same place on
      // every page. A layout is how Astro guarantees that — this test is what
      // notices when a page stops using it.
      expect(
        doc.querySelector('nav[aria-label="Primary"]'),
        `${name} has no primary nav — is it using the Base layout?`,
      ).toBeTruthy();
    });
  }
});

// --- it will actually work on the deployed URL ------------------------------

describe("crit 2: the built site survives its deployed path", () => {
  const absoluteRefs = (doc: Document): string[] =>
    [...doc.querySelectorAll("[href], [src]")]
      .map((el) => el.getAttribute("href") ?? el.getAttribute("src") ?? "")
      .filter((ref) => ref.startsWith("/"));

  for (const { name, doc } of pages) {
    it(`${name} prefixes every absolute path with the deployed base`, () => {
      const stray = absoluteRefs(doc).filter(
        (ref) => !ref.startsWith(`${BASE}/`) && ref !== BASE,
      );
      expect(
        stray,
        `These skip the base path and will 404 on the deployed URL (expected them to start with "${BASE}/"). Build hrefs from import.meta.env.BASE_URL, not as bare "/path".`,
      ).toEqual([]);
    });
  }

  it("ships a static site with no server entry point", () => {
    // "static, no backend" — a static Astro build emits only assets. An adapter
    // would put a server bundle in here instead.
    const serverish = htmlFiles(DIST).length === 0;
    expect(serverish, "dist has no HTML at all — did the build run?").toBe(
      false,
    );
    const files = readdirSync(DIST, { recursive: true }) as string[];
    const server = files.filter((f) =>
      /(_worker\.js|entry\.mjs|_routes\.json)$/.test(String(f)),
    );
    expect(
      server,
      "Found a server bundle in dist — this week is static only, no backend.",
    ).toEqual([]);
  });
});
