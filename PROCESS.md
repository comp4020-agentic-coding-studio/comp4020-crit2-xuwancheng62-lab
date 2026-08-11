# Process overview

A reading-guide to how this HOYTS Cinemas redesign came together.

## What I built

A three-page static redesign of the real HOYTS Cinemas website: a movie-first
homepage (Now Showing, then Coming Soon, poster-dominant, fixed 4-per-row on
desktop and 2-per-row on a phone), a per-movie detail page generated at build
time from a typed data file, and a Cinemas/Contact page listing the two real
HOYTS locations serving Canberra/ACT. No login, booking, or backend — every
"book" action is an external link back to the real hoyts.com.au, which is also
credited and linked from the footer on every page.

## The moments that mattered

1. **I made the agent plan before it wrote any code — then corrected the
   plan.** My starting idea was thin: make movies easier to discover, four
   cards per row on desktop. The obvious next move was to hand that to the
   agent and judge the result. Instead I asked it to read the spec and repo
   and produce a `PLAN.md` first
   ([`ce0831c`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-xuwancheng62-lab/commit/ce0831c)).
   That surfaced decisions I hadn't made yet — how many titles, which
   cinemas, whether trailers embed, where discovery stops and booking starts
   — and several of the agent's defaults were reasonable but wrong for this
   brief. I overrode them before any code existed: Canberra/ACT cinemas
   rather than arbitrary flagship sites, a fixed 4-per-row desktop grid,
   navigation limited to Movies and Cinemas, and real booking kept outside
   the redesign entirely. Everything from
   [`ce0831c...b5db5ce`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-xuwancheng62-lab/compare/ce0831c...b5db5ce)
   implements that corrected plan, which is why the stages read as
   deliberate rather than improvised.

2. **The agent invented twelve plausible poster URLs, and only the rendered
   page caught it.** Writing `src/data/movies.ts`, the agent reconstructed
   all twelve Wikimedia poster paths from memory instead of fetching them —
   URLs that looked entirely correct and all returned 404. Nothing in the
   type system, the build, or the test suite noticed, because a broken
   external image isn't a broken build. What caught it was this repo's
   standing rule to open the page instead of trusting the code: a screenshot
   at 1920×1080 showed blank boxes where posters should have been. The fix
   was to re-fetch every URL from the live Wikipedia article and verify each
   one with `curl` (200, `image/*`) before using it
   ([`647a2b9`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-xuwancheng62-lab/commit/647a2b9)).
   The lesson I'm keeping: confidently-generated data is a claim, not a fact,
   and plausibility is not evidence.

3. **A constraint I was holding in prose became a check instead.** The brief
   forbids accounts, booking, seat selection and payment — a rule that lived
   only in `PLAN.md` and my own memory, which is exactly the kind of rule
   that erodes as a site grows. So it became a spec test asserting no built
   page contains a `<form>` or `<input>`, alongside one asserting every
   homepage card exposes a poster with alt text and a non-empty
   classification/runtime/genre line
   ([`b5db5ce`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-xuwancheng62-lab/commit/b5db5ce)).
   If a future change ever adds a booking form, the suite fails before I have
   to notice.

## Before you ship

`pnpm check` is green (typecheck, build, lint, 143/143 tests). Both marked
viewports — 1920×1080 and 390×844 — were checked with `agent-browser` across
all three page types rather than the homepage alone, watching specifically
that the shared nav holds the same position as titles change length.
