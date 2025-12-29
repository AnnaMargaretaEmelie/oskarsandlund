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
    appId: 'w00xt5t3dmzfkrfh15isg8i6',
    autoUpdates: true,
  }
})
