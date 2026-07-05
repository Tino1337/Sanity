import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const menuLink = defineType({
  name: 'menuLink',
  title: 'Menu link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
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
    }),
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      hidden: ({parent}) => parent?.linkType !== 'external',
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
    select: {label: 'label', linkType: 'linkType', pageTitle: 'page.title'},
    prepare({label, linkType, pageTitle}) {
      const subtitle =
        linkType === 'page' ? (pageTitle ? `Page · ${pageTitle}` : 'Page') : 'External URL'

      return {
        title: label || 'Untitled link',
        subtitle,
      }
    },
  },
})
