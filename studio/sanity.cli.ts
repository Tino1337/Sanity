import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '88x0n1z6',
    dataset: 'production'
  },
  deployment: {
    appId: 'xh3myli7sczeaw4dqqx2iis7',
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  },
})
