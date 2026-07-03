import {defineField, defineType} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const ctaType = defineType({
  name: 'cta',
  title: 'Call to action',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'buttonUrl',
      title: 'Button URL',
      type: 'url',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {title: 'title'},
    prepare({title}) {
      return {
        title: title || 'Untitled CTA',
        subtitle: 'Call to action',
      }
    },
  },
})
