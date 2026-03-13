export function resolveMediaUrl(path: string | null | undefined, fallback: string): string {
  if (!path) {
    return fallback
  }

  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:') ||
    path.startsWith('/storage/')
  ) {
    return path
  }

  return `/storage/${path.replace(/^\/+/, '')}`
}
