import {defineConfig} from 'sanity'
import {presentationTool} from 'sanity/presentation'
import {structureTool} from 'sanity/structure'
import {getPreviewOrigin} from './env.config'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure/index'
import './studio.css'

export default defineConfig({
  name: 'default',
  title: 'Testing Sanity',

  projectId: '88x0n1z6',
  dataset: 'production',

  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        origin: getPreviewOrigin(),
        preview: '/',
        previewMode: {
          enable: '/preview/enable',
          disable: '/preview/disable',
        },
      },
    }),
  ],
  schema: {
    types: schemaTypes,
  },

})
