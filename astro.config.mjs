// @ts-check
import { defineConfig } from "astro/config";

// The deployed site lives under a path, not at a domain root:
//   https://comp4020-agentic-coding-studio.github.io/comp4020-crit2-xuwancheng62-lab/
//
// Astro needs `base` set explicitly for that. It does NOT do what the starter's
// Vite config did (`base: "./"`, relative asset URLs), so getting this wrong
// looks perfectly fine on localhost and 404s every asset on the live URL.
// spec/crit-2.test.ts asserts the built output actually carries the base, so
// this can't silently rot.
//
// Writing internal links: use `import.meta.env.BASE_URL` (Astro substitutes the
// value below), never a bare "/about" — a root-relative href skips the base and
// dead-ends on the deployed site while working locally.
export default defineConfig({
  site: "https://comp4020-agentic-coding-studio.github.io",
  base: "/comp4020-crit2-xuwancheng62-lab",
  build: {
    format: "directory",
  },
});
