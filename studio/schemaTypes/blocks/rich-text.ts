import {defineField, defineType} from 'sanity'
import {BlockContentIcon} from '@sanity/icons'
import {defaultBlockSettings} from '../shared/default-block-settings'
import {hiddenAllFieldsGroup} from '../shared/field-groups'
import {headlineFields} from '../shared/headline-fields'

export const richText = defineType({
  name: 'richText',
  title: 'Rich text',
  type: 'object',
  icon: BlockContentIcon,
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'design', title: 'Design'},
    hiddenAllFieldsGroup,
  ],
  fields: [
    ...headlineFields({group: 'content'}),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{type: 'block'}],
      group: 'content',
    }),
    ...defaultBlockSettings,
  ],
  preview: {
    select: {title: 'headline'},
    prepare({title}) {
      return {
        title: title || 'Rich text',
        subtitle: 'Rich text',
      }
    },
  },
})
