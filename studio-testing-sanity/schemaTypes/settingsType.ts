import {defineField, defineType} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const settingsType = defineType({
  name: 'settings',
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
      name: 'siteLogo',
      title: 'Site logo',
      type: 'image',
    }),
    defineField({
      name: 'notFoundPage',
      title: '404 page',
      description: 'Which page to show when a URL is not found',
      type: 'reference',
      to: [{type: 'page'}],
    }),
    defineField({
      name: 'copyright',
      title: 'Copyright',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'mainMenu',
      title: 'Main menu',
      type: 'array',
      of: [{type: 'navigationItem'}],
    }),
    defineField({
      name: 'footerMenu',
      title: 'Footer menu',
      type: 'array',
      of: [{type: 'navigationItem'}],
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
