type UnknownRecord = Record<string, unknown>

function extractPath(value: unknown): string | null {
  if (typeof value === 'string') {
    const trimmed = value.trim()
    return trimmed.length > 0 ? trimmed : null
  }

  if (!value || typeof value !== 'object') {
    return null
  }

  const record = value as UnknownRecord

  for (const key of ['url', 'path', 'src', 'image', 'image_url']) {
    const candidate = record[key]

    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return candidate.trim()
    }
  }

  return null
}

export function resolveMediaUrl(path: unknown, fallback: string): string {
  const resolvedPath = extractPath(path)

  if (!resolvedPath) {
    return fallback
  }

  if (
    resolvedPath.startsWith('http://') ||
    resolvedPath.startsWith('https://') ||
    resolvedPath.startsWith('data:') ||
    resolvedPath.startsWith('blob:') ||
    resolvedPath.startsWith('/storage/')
  ) {
    return resolvedPath
  }

  return `/storage/${resolvedPath.replace(/^\/+/, '')}`
}
