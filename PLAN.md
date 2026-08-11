# PLAN: HOYTS Cinemas — Unsolicited Redesign

Status: planning only, nothing below is implemented yet.

## 0. Subject

- Organisation: **HOYTS Cinemas**
- Original site: `https://www.hoyts.com.au/`
- Why (to confirm/refine with you before the crit, not testable by machine):
  HOYTS runs real cinemas people actually go to, but the homepage buries "what's
  showing" under a promo carousel, an experiences carousel, an events carousel,
  a special-interest section, and an offers grid — confirmed by inspecting the
  live homepage just now. Someone who wants "what can I watch this week" has to
  scroll past five other concerns first.

## 1. Repo state found on inspection

- Stack is already Astro (`astro.config.mjs` sets `site` + `base` for
  `…github.io/comp4020-crit2-xuwancheng62-lab/`, `build.format: "directory"`).
- Only scaffolding exists: `src/layouts/Base.astro` (empty `<nav>`, a `<slot />`,
  no footer), `src/pages/index.astro` (placeholder heading), `src/styles/` is an
  empty directory. Nothing else under `src/`.
- `spec/subject.json` has `organisation: null`, `originalSiteUrl: null` — the
  crit-2 tests currently fail on this.
- `spec/crit-2.test.ts` already encodes the mechanical parts of the brief (see
  §7 below) and runs against **built** output (`dist/`), driven by
  `spec/subject.json`.
- `spec/invariants.test.ts` runs against every built page: `lang`, real
  `<title>`, viewport meta, a `<nav>`, exactly one `<h1>`, `alt` on every `<img>`.
- `PROCESS.md` and `reflections/README.md` are template/placeholder — both need
  real content before shipping, but that's a later stage, not this plan.
- No CSS, no components, no data files yet — this is a green field, which
  matches "smallest sensible implementation" below; there's no existing
  structure to work around.

## 2. Conflicts with the Crit 2 spec — none found, one tension to manage

- No hard conflict between your brief and the fixed contract (static-only,
  named real org + link, contact/find, restructured content, shared nav,
  invariants, process evidence) — your brief is a stricter subset of what the
  spec requires, not a deviation from it.
- The one tension: the spec's "exactly 4 per row desktop / 2 per row mobile"
  requirement is **not mechanically checkable**. `spec/crit-2.test.ts` runs
  JSDOM against static HTML — JSDOM does not run layout, so it cannot count
  rendered grid columns. This has to be a CSS decision verified by looking at
  the rendered page (`agent-browser`) at both marking viewports, the same way
  CLAUDE.md already asks you to verify the nav doesn't jump between pages. I've
  written the grid CSS to make 4-and-2 the deterministic, un-ambiguous outcome
  (fixed `grid-template-columns`, not `auto-fit`/`minmax`) so there's nothing
  content-dependent for a visual check to catch — but the check itself stays
  manual.

## 3. Assumptions and decisions I'm making now — flag anything you want changed

1. **Posters**: I'll use real official poster art (linked from a public
   source, e.g. TMDB or the studio's press assets), not stylised placeholders —
   "poster-focused cards" reads as wanting the real image. This is an academic,
   non-commercial studio exercise commenting on HOYTS's own site, which weighs
   in favour of fair dealing, but I'm not a lawyer — **confirm you're OK with
   this**, or tell me to use plain placeholder blocks with title text instead.
2. **Scope of "Now Showing"**: 8 movies (fills exactly two full rows of 4 on
   desktop, four rows of 2 on mobile) rather than trying to mirror HOYTS's full
   catalogue. "Coming Soon" gets 4 (one row of 4 / two rows of 2).
3. **Cinemas page scope**: a short curated list (3–4 cinemas, e.g. a couple of
   metro flagships) with real address + a real map link each, not the full
   national directory — matches "keep scope small" and the spec only requires
   *a* way to find them, not all of them.
4. **Trailers**: a plain external `<a>` link to the film's official trailer
   (YouTube), not an embedded player — keeps the site static with zero
   third-party embed/script surface, consistent with "no backend."
5. **Nav items**: `Movies` (home) and `Cinemas` only. No `Offers`/`About` — I
   don't have enough real, non-promotional content to justify a third page,
   and the brief explicitly says not to add pages just to look bigger.
6. **Visual direction**: dark, cinematic theme (dark background, poster art
   supplies the colour) rather than a light theme — reads more "movie
   discovery app," less "corporate promo site." Flag if you'd rather go light.
7. **Data currency risk**: "Now Showing" titles will be real films showing
   around build time, but HOYTS's actual lineup will have moved on by the time
   this is marked. I'll note in the content that this is a snapshot, not
   live data — a static site can't do otherwise, and that's worth being able
   to say out loud at the crit if asked.

## 4. Smallest sensible implementation

Astro, no content collections (a plain typed data module is enough for a
handful of movies and cinemas — collections would be structure the project
doesn't need yet), no client-side JS beyond what Astro emits by default (none,
for static markup), no CSS framework (plain CSS with custom properties for the
design tokens).

```
src/
  data/
    movies.ts       # typed array: now-showing + coming-soon, one shape
    cinemas.ts       # typed array: name, address, mapUrl, phone?
  lib/
    url.ts           # href(path) => `${import.meta.env.BASE_URL}${path}`
  layouts/
    Base.astro        # <html> shell + Nav + Footer + <slot/>
  components/
    Nav.astro
    Footer.astro
    MovieCard.astro    # poster, title, classification, runtime, genre
  pages/
    index.astro                # Now Showing + Coming Soon
    movies/[slug]/index.astro  # detail page, getStaticPaths from data/movies.ts
    cinemas/index.astro        # Cinemas / Contact
  styles/
    tokens.css         # colour, spacing, type scale
    global.css
```

`lib/url.ts` exists because CLAUDE.md and `spec/crit-2.test.ts` both flag the
same failure mode — a bare `/path` href works on localhost and 404s on the
deployed `…/comp4020-crit2-xuwancheng62-lab/` path. One helper, used
everywhere a link or image `src` is built, removes the chance of forgetting it
on any one page.

## 5. Page structure and reusable components

- **Base.astro** — `<html>`, head, `<Nav>`, `<main><slot/></main>`, `<Footer>`.
  Anything shared lives here once, so "shared furniture holds still" is
  structural, not a discipline to remember.
- **Nav.astro** — logo/site name, `Movies`, `Cinemas`. Same markup, same order,
  every page — the thing CLAUDE.md's crit-1 lesson is about.
- **Footer.astro** — one line linking back to the real HOYTS site by name (this
  is also where "names the organisation" and "links to the real site" get
  satisfied structurally on every page, not just the ones that happen to
  mention HOYTS in body copy).
- **MovieCard.astro** — props: `slug, title, posterUrl, classification,
  runtimeMinutes, genre`. Renders poster + title + a compact meta line
  (classification · runtime · genre). No synopsis, no CTA — matches "don't
  overload the card." Used identically in Now Showing and Coming Soon, so
  there's one visual system, not two.
- **index.astro** — `<h1>` (the page's one required heading), a "Now Showing"
  `<section>` with a card grid, a "Coming Soon" `<section>` below it with the
  same grid using the same `MovieCard`.
- **movies/[slug]/index.astro** — poster, title, classification, runtime,
  genre, rewritten synopsis, optional trailer link, a clearly-labelled external
  link to the real HOYTS site for sessions/booking (e.g. "Book at HOYTS →",
  `target="_blank" rel="noopener"`, pointed at the real domain).
- **cinemas/index.astro** — one `<section>` per cinema: name, `<address>`
  (satisfies the crit-2 "gives the reader a way to make contact" test, which
  specifically looks for `<address>`, `mailto:`, `tel:`, or a `maps.` link),
  and a real map link.

## 6. Responsive behaviour

- Card grid: `display: grid; grid-template-columns: repeat(4, 1fr); gap: …`
  as the base (desktop) rule — fixed count, not `auto-fit`/`minmax`, so 4-per-row
  is guaranteed regardless of how many cards or how long a title is.
- At a mobile breakpoint (e.g. `max-width: 480px`, comfortably covering the
  390px marking viewport) it becomes `grid-template-columns: repeat(2, 1fr)`.
- Poster images use a fixed `aspect-ratio` (e.g. `2/3`) with `object-fit: cover`
  so card height doesn't drift with image dimensions — this is what keeps the
  grid looking even at both counts without per-card tuning.
- Verification is manual, per §2: `agent-browser` at exactly 1920×1080 and
  390×844, on the home page (both sections) and on a movie detail page and the
  cinemas page, checked after every stage that touches layout — not just once
  at the end. This also covers the CLAUDE.md nav-jump lesson: watch the nav's
  vertical position across all pages at 390×844.
- Typography and spacing scale down at the mobile breakpoint enough that a
  classification/runtime/genre meta line doesn't wrap awkwardly in a
  narrower card — check this specifically for the longest genre string in the
  dataset (e.g. "Action/Adventure" vs "Drama").

## 7. Real HOYTS content to collect (before writing any page)

For each of the 8 Now Showing + 4 Coming Soon movies:

- Title, real Australian classification (G/PG/M/MA15+/R18+), runtime, genre —
  from HOYTS's own now-showing listing.
- A **rewritten** short synopsis based on real plot information (studio
  synopsis or a reputable source), reworded and restructured in your own
  words — not copied from HOYTS or pasted from IMDb, per the spec's explicit
  "restructured and rewritten" requirement.
- A real official trailer URL (YouTube), where one exists and is easy to find
  confidently — optional per movie, not mandatory.
- A poster image (see assumption §3.1).

For Cinemas: 3–4 real HOYTS locations — the site's own `/cinemas` directory
lists name, address, and format amenities (LUX, IMAX, etc.) per location, but
not phone numbers or map links on the directory page itself — plan to pull a
real Google Maps link per address rather than expecting one from HOYTS's page.

I have **not** collected this content yet — that's Stage 1 below, and it's the
one stage where you may want to review the specific titles/cinemas chosen
before I write copy against them.

## 8. Machine-checked vs. manually reviewed

**Extend `spec/` with (mechanical):**
- Fill `spec/subject.json` → unblocks the four existing "real organisation,
  named" tests in `spec/crit-2.test.ts`.
- A new assertion that each Now Showing / Coming Soon card exposes poster,
  title, classification, runtime, genre in the built DOM (a `MovieCard` with a
  missing field is a regression a person might not notice on a quick scan).
- A guard that no page contains a `<form>`, `input[type=password]`, or any
  markup implying login/booking/payment — turns "do not implement
  login/booking/payment" from something held in your head (CLAUDE.md's own
  stated failure mode from crit 1) into a red test if the agent ever adds one.
- Existing invariants + crit-2 tests (nav on every page, contact info present,
  base-path-prefixed links, one `<h1>`, alt text, no server bundle) all apply
  unchanged to the new pages once built.

**Manual / human judgement (yours to answer at the crit, not testable):**
- Why HOYTS, what's wrong with their site, whether the redesign is
  demonstrably better — the three "judged-by-a-person" criteria from the spec.
- 4-per-row / 2-per-row actually holding at the two marking viewports (§2, §6).
- Visual tone — "cinematic," "not excessive gradients/animation," restraint on
  promo elements — a style read, not a rule a linter enforces.
- Whether the rewritten synopses are genuinely restructured rather than
  lightly reworded — worth a quick side-by-side re-read against the source
  before shipping, since this is one of the spec's named requirements and
  nothing catches a too-close paraphrase automatically.

## 9. Implementation stages (small, committable)

1. **Subject** — fill `spec/subject.json`; confirm §3 assumptions land as
   comments/notes where relevant. *Unblocks the crit-2 subject tests.*
2. **Content** — write `src/data/movies.ts` and `src/data/cinemas.ts` with real,
   rewritten content per §7. No UI yet — this is where the "restructured, not
   pasted" work actually happens, reviewable on its own before any styling.
3. **Shell** — `lib/url.ts`, `Nav.astro`, `Footer.astro`, `tokens.css`,
   wire into `Base.astro`. Verify the nav/footer render identically on the one
   existing page.
4. **MovieCard + Now Showing** — build the card component and the home page's
   first section against real data. Check the grid at both viewports (§6)
   before moving on — catch a wrong grid decision while only one section
   exists, not after three.
5. **Coming Soon** — second home section, same component, confirms the
   "same visual system" requirement by construction.
6. **Movie detail route** — `movies/[slug]/index.astro` with
   `getStaticPaths`, full field set, trailer link, external booking link.
7. **Cinemas / Contact page** — addresses, map links; confirms the
   "gives the reader a way to make contact" test passes for real (not just
   structurally).
8. **Spec tests** — add the mechanical checks from §8; get `pnpm check` green.
9. **Responsive + accessibility pass** — re-check both viewports across all
   three pages together (not just in isolation), alt text audit, contrast
   check on the dark theme.
10. **Process evidence** — real `PROCESS.md` (cited moments, not the
    template), `reflections/crit-2.md`. Do this alongside the stages above as
    moments happen, not as one pass at the end — CLAUDE.md's own standing
    advice, and the thing the template README warns is weaker as a last-night
    dump.

Each numbered stage above is one commit (or a small handful, if a stage
naturally splits) — small enough that the diff itself is legible evidence of
what changed and why.
