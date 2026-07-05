import {defineField, defineType} from 'sanity'
import {ImageIcon} from '@sanity/icons'
import {defaultBlockSettings} from '../shared/default-block-settings'
import {headlineFields} from '../shared/headline-fields'

export const textImage = defineType({
  name: 'textImage',
  title: 'Text + image',
  type: 'object',
  icon: ImageIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'design', title: 'Design'},
  ],
  fields: [
    ...headlineFields({group: 'content'}),
    defineField({name: 'text', title: 'Text', type: 'text', rows: 4, group: 'content'}),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      group: 'content',
    }),
    defineField({
      name: 'reverse',
      title: 'Reverse layout',
      type: 'boolean',
      initialValue: false,
      group: 'design',
    }),
    ...defaultBlockSettings,
  ],
  preview: {
    select: {title: 'headline', media: 'image'},
    prepare({title, media}) {
      return {
        title: title || 'Text + image',
        subtitle: 'Text + image',
        media,
      }
    },
  },
})
