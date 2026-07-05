/**
 * One-time migration: old schema → template schema.
 * Run: cd studio && npm run migrate
 */
import {getCliClient} from 'sanity/cli'

const client = getCliClient({apiVersion: '2026-05-15'})

type MenuItem = {
  _key: string
  _type: string
  title?: string
  label?: string
  linkType?: string
  href?: string
  openInNewTab?: boolean
  page?: {_ref: string}
}

type Block = {
  _key: string
  _type: string
  title?: string
  subtitle?: string
  text?: string
  heading?: string
  headline?: string
  body?: unknown
  image?: unknown
  [key: string]: unknown
}

function transformMenuItem(item: MenuItem) {
  return {
    _key: item._key,
    _type: 'menuLink',
    label: item.label ?? item.title,
    linkType: item.linkType,
    href: item.href,
    openInNewTab: item.openInNewTab,
    page: item.page,
  }
}

function transformBlock(block: Block): Block | null {
  if (block._type === 'cta' || block._type === 'blogPosts') {
    return null
  }

  if (block._type === 'textBlock') {
    return {
      ...block,
      _type: 'richText',
      headline: block.heading ?? block.headline,
    }
  }

  if (block._type === 'hero') {
    return {
      ...block,
      _type: 'hero',
      headline: block.headline ?? block.title,
      text: block.text ?? block.subtitle,
    }
  }

  return block
}

async function migrateSettings() {
  const old = await client.fetch(`*[_id == "settings"][0]`)

  if (!old) {
    console.log('No settings document found — skipping')
    return
  }

  const doc = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteName: old.siteName,
    logo: old.siteLogo,
    copyright: old.copyright,
    notFoundPage: old.notFoundPage,
    mainNavigation: old.mainMenu?.map(transformMenuItem) ?? [],
    footerNavigation: old.footerMenu?.map(transformMenuItem) ?? [],
  }

  await client.createOrReplace(doc)
  await client.delete('settings')
  console.log('Migrated settings → siteSettings')
}

async function migratePages() {
  const pages = await client.fetch<
    Array<{_id: string; content?: Block[]; pageBuilder?: Block[]}>
  >(`*[_type == "page"]{_id, content, pageBuilder}`)

  for (const page of pages) {
    const source = page.pageBuilder ?? page.content ?? []
    const pageBuilder = source
      .map(transformBlock)
      .filter((block): block is Block => block !== null)

    await client
      .patch(page._id)
      .set({pageBuilder})
      .unset(['content'])
      .commit()

    console.log(`Migrated page ${page._id}`)
  }
}

async function main() {
  await migrateSettings()
  await migratePages()
  console.log('Migration complete')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
