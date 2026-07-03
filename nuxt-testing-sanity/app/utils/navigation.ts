type NavMenuItem = {
  title?: string
  linkType?: string
  href?: string | null
  openInNewTab?: boolean | null
  page?: {
    slug?: {
      current?: string
    } | null
  } | null
}

export function getNavigationHref(item: NavMenuItem) {
  if (item.linkType === "external" && item.href) {
    return item.href;
  }

  const slug = item.page?.slug?.current;
  if (!slug || slug === "home") {
    return "/";
  }

  return `/${slug}`;
}

export function isExternalNavigationItem(item: NavMenuItem) {
  return item.linkType === "external";
}
