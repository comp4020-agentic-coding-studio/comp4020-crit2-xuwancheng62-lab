// The deployed site lives under /comp4020-crit2-xuwancheng62-lab/, not at the
// domain root, so a bare "/path" 404s live while working fine on localhost.
// Every internal link/asset path must go through this helper instead.
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}
