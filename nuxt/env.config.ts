export type AppEnvironment = 'local' | 'development' | 'production'

export function getAppEnvironment(): AppEnvironment {
  const explicit = process.env.SANITY_APP_ENV
  if (
    explicit === 'local'
    || explicit === 'development'
    || explicit === 'production'
  ) {
    return explicit
  }

  // Local Nuxt dev server
  if (!process.env.VERCEL) {
    return 'local'
  }

  // Vercel production deployment (custom domain)
  if (process.env.VERCEL_ENV === 'production') {
    return 'production'
  }

  // Vercel preview deployments
  return 'development'
}

export function getStudioUrl(): string {
  const studioUrls: Record<AppEnvironment, string> = {
    local: process.env.SANITY_STUDIO_URL_LOCAL ?? 'http://localhost:3333',
    development:
      process.env.SANITY_STUDIO_URL_DEV
      ?? 'https://testing-sanity-88x0n1z6.sanity.studio',
    production:
      process.env.SANITY_STUDIO_URL_PROD
      ?? 'https://testing-sanity-88x0n1z6.sanity.studio',
  }

  return studioUrls[getAppEnvironment()].replace(/\/$/, '')
}
