import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

const isDev = process.env.NODE_ENV !== 'production'

const previewOrigin = isDev
  ? process.env.SANITY_STUDIO_PREVIEW_ORIGIN_DEV
  : process.env.SANITY_STUDIO_PREVIEW_ORIGIN

export default defineConfig({
  name: 'default',
  title: 'Testing Sanity',

  projectId: '88x0n1z6',
  dataset: 'production',

  plugins: [
    presentationTool({
      previewUrl: {
        origin: previewOrigin,
        preview: '/',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
    structureTool({structure}),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
  
})
