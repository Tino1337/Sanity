import {defineField, defineType} from 'sanity'
import {BlockElementIcon} from '@sanity/icons'
import {defaultBlockSettings} from '../shared/default-block-settings'
import {headlineFields} from '../shared/headline-fields'

export const hero = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: BlockElementIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'design', title: 'Design'},
  ],
  fields: [
    ...headlineFields({group: 'content'}),
    defineField({name: 'text', title: 'Text', type: 'text', rows: 3, group: 'content'}),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      group: 'content',
    }),
    defineField({name: 'cta', title: 'Call to action', type: 'button', group: 'content'}),
    ...defaultBlockSettings,
  ],
  preview: {
    select: {title: 'headline', media: 'image'},
    prepare({title, media}) {
      return {
        title: title || 'Hero',
        subtitle: 'Hero',
        media,
      }
    },
  },
})
