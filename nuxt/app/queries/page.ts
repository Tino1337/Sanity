import {defineQuery} from 'groq'

export const PAGE_QUERY = defineQuery(`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    seo,
    pageBuilder[]{
      _key,
      _type,
      ...
    }
  }
`)

export const HOME_SLUG = 'home'
