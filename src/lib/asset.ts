/** Prefixes a public-folder path ("/projects/x.webp") with the build's base path. */
export function asset(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '')
  return base + path
}
