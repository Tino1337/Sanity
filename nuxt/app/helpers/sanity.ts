type SlugValue = {
  current?: string
}

type PageReference = {
  slug?: SlugValue | null
} | null

export type MenuLink = {
  label?: string
  linkType?: string | null
  href?: string | null
  openInNewTab?: boolean | null
  page?: PageReference
}

export function resolveMenuHref(item: MenuLink) {
  if (item.linkType === 'external' && item.href) {
    return item.href
  }

  const slug = item.page?.slug?.current
  if (!slug || slug === 'home') {
    return '/'
  }

  return `/${slug}`
}

export function isExternalMenuLink(item: MenuLink) {
  return item.linkType === 'external'
}

export function getDocumentTitle(doc?: {title?: string | null}) {
  return doc?.title ?? ''
}
