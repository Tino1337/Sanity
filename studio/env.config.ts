export type AppEnvironment = 'local' | 'development' | 'production'

export function getAppEnvironment(): AppEnvironment {
  // sanity dev always previews the local Nuxt server
  if (process.env.NODE_ENV !== 'production') {
    return 'local'
  }

  const explicit = process.env.SANITY_STUDIO_APP_ENV
  if (
    explicit === 'local'
    || explicit === 'development'
    || explicit === 'production'
  ) {
    return explicit
  }

  return 'development'
}

export function getPreviewOrigin(): string {
  const origins: Record<AppEnvironment, string> = {
    local:
      process.env.SANITY_STUDIO_PREVIEW_ORIGIN_LOCAL ?? 'http://localhost:3000',
    development:
      process.env.SANITY_STUDIO_PREVIEW_ORIGIN_DEV
      ?? 'https://sanity-dun-seven.vercel.app',
    production:
      process.env.SANITY_STUDIO_PREVIEW_ORIGIN_PROD ?? 'https://tinoschlenker.de',
  }

  return origins[getAppEnvironment()].replace(/\/$/, '')
}
