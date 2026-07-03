import {defineField, defineType} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'

export const textBlockType = defineType({
  name: 'textBlock',
  title: 'Text block',
  type: 'object',
  icon: BlockContentIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
    }),
  ],
  preview: {
    select: {title: 'heading'},
    prepare({title}) {
      return {
        title: title || 'Text block',
        subtitle: 'Text block',
      }
    },
  },
})
