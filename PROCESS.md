# Process overview

A reading-guide to how this HOYTS Cinemas redesign came together.

## What I built

A three-page static redesign of the real HOYTS Cinemas website: a movie-first
homepage (Now Showing, then Coming Soon, poster-dominant, fixed 4-per-row /
2-per-row grids), a per-movie detail page generated at build time from a
typed data file, and a Cinemas/Contact page listing the two real HOYTS
locations serving Canberra/ACT. No login, booking, or backend — every "book"
action is an external link back to the real hoyts.com.au, which is also
credited and linked from the footer on every page.

## The moments that mattered

1. **Fabricated poster URLs slipped past me until I actually looked.** When I
   first wrote `src/data/movies.ts`, I reconstructed all twelve Wikimedia
   poster URLs from memory instead of fetching them fresh — plausible-looking
   paths that all 404'd. I only caught this because I opened the built
   homepage in `agent-browser` and saw blank poster boxes instead of
   inferring correctness from the code, which is exactly the discipline this
   repo's `CLAUDE.md` asks for ("the rendered page is the truth"). I fixed it
   by re-fetching each film's real Wikipedia infobox image and verifying
   every one with `curl` (200, `image/*`) before writing it back, then
   re-screenshotted to confirm the posters actually painted
   ([`647a2b9`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-xuwancheng62-lab/commit/647a2b9)).
   A URL that looks right but was never checked is its own kind of invented
   fact, which is the thing this brief specifically warns against.

2. **Sequencing the build so a known-red check didn't get treated as a
   blocker.** The brief and `PLAN.md` call for shipping the site shell before
   the Cinemas page exists, which means the crit-2 "gives the reader a way to
   make contact" spec test is red for several commits in a row. Instead of
   scope-creeping the Cinemas page early to chase green, I stated the gap
   directly in the shell commit's message and kept going in order
   ([`2ace03b`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-xuwancheng62-lab/commit/2ace03b)),
   then closed it two stages later when the Cinemas page landed and the full
   suite went green at 127/127
   ([`f22a53a`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-xuwancheng62-lab/commit/f22a53a)).
   Knowing which red check is expected-and-temporary versus which is a real
   regression is what let me keep moving stage by stage instead of second-
   guessing the plan every time `pnpm check` wasn't fully green.

3. **A brief constraint ("no accounts, no booking, no payment") became a
   test, not just a rule I was trusting myself to remember.** Once the whole
   spec suite was green, I turned two of `PLAN.md`'s remaining mechanical
   checks into an actual spec file: every homepage card must expose a poster
   with alt text plus a non-empty classification/runtime/genre line, and no
   built page may ever contain a `<form>` or `<input>`
   ([`b5db5ce`](https://github.com/comp4020-agentic-coding-studio/comp4020-crit2-xuwancheng62-lab/commit/b5db5ce)).
   That second check is the one I'd otherwise only be holding in my head —
   if a future edit ever added a booking form, this is what would catch it
   before I did.

## Before you ship

`pnpm check` is green (typecheck, build, lint, 143/143 tests) and both
viewports (1920×1080, 390×844) were checked with `agent-browser` across all
three page types, not just the homepage in isolation.
