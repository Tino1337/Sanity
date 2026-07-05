import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const navigationItemType = defineType({
  name: 'navigationItem',
  title: 'Navigation item',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link type',
      type: 'string',
      options: {
        list: [
          {title: 'Page', value: 'page'},
          {title: 'External URL', value: 'external'},
        ],
        layout: 'radio',
      },
      initialValue: 'page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'page',
      title: 'Page',
      type: 'reference',
      to: [{type: 'page'}],
      hidden: ({parent}) => parent?.linkType !== 'page',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {linkType?: string}
          if (parent?.linkType === 'page' && !value) {
            return 'Required when link type is Page'
          }
          return true
        }),
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
      validation: (rule) =>
        rule.custom((value, context) => {
          const parent = context.parent as {linkType?: string}
          if (parent?.linkType === 'external' && !value) {
            return 'Required when link type is External URL'
          }
          return true
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
      hidden: ({parent}) => parent?.linkType !== 'external',
    }),
  ],
  preview: {
    select: {title: 'title', linkType: 'linkType', pageTitle: 'page.title'},
    prepare({title, linkType, pageTitle}) {
      const subtitle =
        linkType === 'page' ? (pageTitle ? `Page · ${pageTitle}` : 'Page') : 'External URL'
      return {
        title: title || 'Untitled link',
        subtitle,
      }
    },
  },
})
