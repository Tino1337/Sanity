import {defineField} from 'sanity'

export function headlineFields(options?: {group?: string}) {
  const group = options?.group

  return [
    defineField({name: 'eyebrow', title: 'Eyebrow', type: 'string', group}),
    defineField({name: 'headline', title: 'Headline', type: 'string', group}),
    defineField({
      name: 'headlineLevel',
      title: 'Heading level',
      type: 'string',
      group,
      options: {list: ['h1', 'h2', 'h3', 'h4']},
      initialValue: 'h2',
    }),
  ]
}
