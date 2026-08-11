// The deployed site lives under /comp4020-crit2-xuwancheng62-lab/, not at the
// domain root, so a bare "/path" 404s live while working fine on localhost.
// Every internal link must go through this helper instead.
//
// It returns a *relative* link rather than an absolute "/base/path" one, and
// that choice is deliberate: CI runs `linkinator ./dist`, which serves dist at
// the root, so an absolute base-prefixed link resolves to
// dist/comp4020-crit2-xuwancheng62-lab/... and 404s the whole links check even
// though that same link is correct on GitHub Pages. A relative link is right in
// both places, because it resolves against whatever directory the page is
// actually served from.
//
// `from` is the current page's pathname — pass `Astro.url.pathname`. Every
// built URL is a directory (astro.config.mjs sets build.format: "directory"),
// so the number of path segments below the base is the number of "../" hops.
export function href(path: string, from: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const here = from.startsWith(base) ? from.slice(base.length) : from;
  const depth = here.split("/").filter(Boolean).length;
  const up = depth === 0 ? "./" : "../".repeat(depth);
  const target = path.replace(/^\//, "");
  return `${up}${target}`;
}
