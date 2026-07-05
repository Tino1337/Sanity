import type {StructureResolver} from 'sanity/structure'
import {CogIcon, DocumentIcon, DocumentTextIcon} from '@sanity/icons'

const SINGLETONS = ['siteSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site settings'),
        ),
      S.divider(),
      S.listItem()
        .title('Pages')
        .icon(DocumentIcon)
        .child(S.documentTypeList('page').title('Pages')),
      S.listItem()
        .title('Posts')
        .icon(DocumentTextIcon)
        .child(S.documentTypeList('post').title('Posts')),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) => !['page', 'post', ...SINGLETONS].includes(item.getId() || ''),
      ),
    ])
