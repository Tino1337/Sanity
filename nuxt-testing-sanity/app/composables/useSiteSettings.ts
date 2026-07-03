const SITE_SETTINGS_QUERY = groq`*[_id == "settings"][0]{
  siteName,
  siteLogo{
    asset->{
      url,
      mimeType
    }
  },
  copyright,
  mainMenu[]{
    title,
    linkType,
    href,
    openInNewTab,
    page->{ slug }
  },
  footerMenu[]{
    title,
    linkType,
    href,
    openInNewTab,
    page->{ slug }
  }
}`;

export async function useSiteSettings() {
  return useSanityQuery<SITE_SETTINGS_QUERY_RESULT>(SITE_SETTINGS_QUERY, {}, {
    key: "site-settings",
  });
}
