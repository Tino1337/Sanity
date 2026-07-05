import {defineQuery} from 'groq'

export const SITE_SETTINGS_QUERY = defineQuery(`
  *[_type == "siteSettings" && _id == "siteSettings"][0]{
    siteName,
    logo{
      asset->{
        url,
        mimeType
      }
    },
    copyright,
    mainNavigation[]{
      label,
      linkType,
      href,
      openInNewTab,
      page->{ slug }
    },
    footerNavigation[]{
      label,
      linkType,
      href,
      openInNewTab,
      page->{ slug }
    },
    notFoundPage->{ _id, title, slug },
    defaultSeo
  }
`)
