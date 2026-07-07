/** Путь к статике из public/ с учётом base URL (GitHub Pages). */
export function assetUrl(path: string): string {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${normalized}`;
}
