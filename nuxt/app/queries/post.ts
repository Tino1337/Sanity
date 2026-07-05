import {defineQuery} from 'groq'

export const POST_QUERY = defineQuery(`
  *[_type == "post" && slug.current == $slug][0]{
    _id,
    _type,
    title,
    slug,
    publishedAt,
    image,
    body,
    seo
  }
`)
