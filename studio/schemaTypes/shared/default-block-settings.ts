import {defineField} from 'sanity'

export const defaultBlockSettings = [
  defineField({
    name: 'isHidden',
    title: 'Hide block',
    type: 'boolean',
    group: 'design',
    initialValue: false,
  }),
  defineField({
    name: 'htmlId',
    title: 'HTML ID',
    type: 'string',
    group: 'design',
  }),
  defineField({
    name: 'spacing',
    title: 'Spacing',
    type: 'string',
    group: 'design',
    options: {list: ['normal', 'small', 'none']},
    initialValue: 'normal',
  }),
]
