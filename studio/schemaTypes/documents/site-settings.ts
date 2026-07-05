import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  icon: CogIcon,
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Site logo',
      type: 'image',
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'mainNavigation',
      title: 'Main navigation',
      type: 'array',
      of: [{type: 'menuLink'}],
    }),
    defineField({
      name: 'footerNavigation',
      title: 'Footer navigation',
      type: 'array',
      of: [{type: 'menuLink'}],
    }),
    defineField({
      name: 'notFoundPage',
      title: '404 page',
      description: 'Which page to show when a URL is not found',
      type: 'reference',
      to: [{type: 'page'}],
    }),
    defineField({
      name: 'defaultSeo',
      title: 'Default SEO',
      type: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site settings',
      }
    },
  },
})
