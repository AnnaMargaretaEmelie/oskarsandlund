import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'wfjkxauo',
    dataset: 'production'
  },
  typegen: {
    path: '../src/**/*.{ts,tsx,js,jsx}',
    schema: 'schema.json',
    generates: '../src/lib/sanity/sanity.types.ts'

  },

  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/cli#auto-updates
     */
    autoUpdates: true,
  }
})
