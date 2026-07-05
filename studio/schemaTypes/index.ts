import {button} from './objects/button'
import {link} from './objects/link'
import {menuLink} from './objects/menu-link'
import {seo} from './objects/seo'
import {hero} from './blocks/hero'
import {richText} from './blocks/rich-text'
import {textImage} from './blocks/text-image'
import {pageBuilderType} from './shared/page-builder-type'
import {page} from './documents/page'
import {post} from './documents/post'
import {siteSettings} from './documents/site-settings'

export const schemaTypes = [
  link,
  button,
  seo,
  menuLink,
  hero,
  richText,
  textImage,
  pageBuilderType,
  page,
  post,
  siteSettings,
]
