import {defineField, defineType} from 'sanity'
import {DocumentsIcon} from '@sanity/icons'

export const blogPostsType = defineType({
  name: 'blogPosts',
  title: 'Blog posts',
  type: 'object',
  icon: DocumentsIcon,
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      initialValue: 'Latest posts',
    }),
    defineField({
      name: 'limit',
      title: 'Number of posts',
      type: 'number',
      initialValue: 6,
      validation: (rule) => rule.required().min(1).max(12),
    }),
  ],
  preview: {
    select: {title: 'heading', limit: 'limit'},
    prepare({title, limit}) {
      return {
        title: title || 'Blog posts',
        subtitle: `Blog posts · showing ${limit ?? 6}`,
      }
    },
  },
})
